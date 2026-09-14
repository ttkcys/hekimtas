# Hekimtaş — bağımsız Next.js sitesi

Bu proje standart bir Next.js (App Router) uygulamasıdır. Veritabanı olarak **Turso**
(SQLite uyumlu, ücretsiz, bulut tabanlı) kullanır; yüklenen görseller de aynı veritabanında
saklanır. Kalıcı disk gerekmez — bu yüzden Render, Vercel, Railway gibi platformların
**ücretsiz** planlarında bile çalışır.

Herhangi bir Cloudflare/Sites bağımlılığı yoktur.

## Yerel geliştirme

```sh
npm install
cp .env.example .env.local   # değerleri doldurun
npm run dev
```

Yerel geliştirmede `DATABASE_URL` boş bırakılırsa proje otomatik olarak `./data/hekimtas.db`
adında yerel bir dosya kullanır (Turso hesabı gerekmez). Veritabanı dosyası ilk kullanımda
otomatik oluşur; migrasyonları elle uygulamak isterseniz:

```sh
npm run db:migrate
```

## Turso veritabanı kurulumu (ücretsiz)

1. https://turso.tech adresinden ücretsiz hesap açın (kredi kartı istemez).
2. Turso CLI ile veya web arayüzünden yeni bir veritabanı oluşturun:
   ```sh
   turso db create hekimtas
   turso db show hekimtas --url
   turso db tokens create hekimtas
   ```
3. Çıkan `libsql://...` adresini `DATABASE_URL`, üretilen token'ı `DATABASE_AUTH_TOKEN` olarak
   ortam değişkenlerine ekleyin.
4. Turso'nun ücretsiz planı bu proje için fazlasıyla yeterlidir (9 GB depolama, aylık 1 milyar
   okuma / 25 milyon yazma).

## Ortam değişkenleri

| Değişken | Zorunlu | Açıklama |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Evet | `/admin` paneline giriş şifresi. |
| `SESSION_SECRET` | Evet | Oturum çerezini imzalamak için rastgele, uzun bir metin. |
| `DATABASE_URL` | Production'da evet | Turso veritabanı adresi (`libsql://...`). Boşsa yerel dosya kullanılır. |
| `DATABASE_AUTH_TOKEN` | Production'da evet | Turso erişim token'ı. |
| `ADMIN_EMAIL` | Hayır | İçerik kayıtlarında görünecek e-posta (varsayılan `admin@hekimtas.com`). |
| `ADMIN_NAME` | Hayır | Panelde görünecek isim (varsayılan `Yönetici`). |

`SESSION_SECRET` üretmek için: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## Render'a deploy (ücretsiz plan)

1. Render Dashboard'da **New → Web Service** oluşturun, bu repoyu bağlayın.
2. **Instance Type:** Free (disk eklemenize gerek yok).
3. **Build Command:** `npm install && npm run build`
4. **Start Command:** `npm start` (bu komut önce veritabanı migrasyonlarını uygular, sonra sunucuyu başlatır)
5. **Environment** sekmesinden `ADMIN_PASSWORD`, `SESSION_SECRET`, `DATABASE_URL`,
   `DATABASE_AUTH_TOKEN` değişkenlerini ekleyin.

Not: Render'ın ücretsiz planında servis ~15 dakika kullanılmayınca uykuya dalar; bir sonraki
istekte birkaç saniye "uyanma" gecikmesi olur. Veri kaybı olmaz, sadece ilk açılış yavaştır.

## Yönetim paneli

`/admin` adresine gidip `ADMIN_PASSWORD` ile giriş yapın. Site içeriği, gelen talepler ve medya
kütüphanesi buradan yönetilir.

## Diğer komutlar

- `npm run build`: Üretim derlemesi.
- `npm start`: Migrasyonları uygulayıp üretim sunucusunu başlatır.
- `npm run db:generate`: `db/schema.ts` değiştiğinde yeni SQL migrasyonu üretir.
- `npm run db:migrate`: Bekleyen migrasyonları veritabanına uygular.
- `npm run lint`: ESLint kontrolü.
