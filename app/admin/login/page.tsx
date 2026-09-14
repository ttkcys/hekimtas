export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string; error?: string }>;
}) {
  const params = await searchParams;
  const returnTo = params.return_to?.startsWith("/") ? params.return_to : "/admin";
  const hasError = params.error === "1";

  return (
    <main className="grid min-h-svh place-items-center bg-slate-950 p-6 text-white">
      <form
        action="/api/admin/login"
        method="POST"
        className="w-full max-w-sm border border-white/10 bg-slate-900 p-8"
      >
        <h1 className="text-2xl font-semibold">Yönetici Girişi</h1>
        <p className="mt-2 text-sm text-slate-400">
          Hekimtaş site yönetim paneline erişmek için şifreyi girin.
        </p>
        {hasError && (
          <p className="mt-4 border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
            Şifre hatalı. Lütfen tekrar deneyin.
          </p>
        )}
        <input type="hidden" name="return_to" value={returnTo} />
        <label className="mt-6 block text-sm">
          Şifre
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="mt-2 w-full border border-white/20 bg-slate-950 px-3 py-2 text-white"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20"
        >
          Giriş yap
        </button>
      </form>
    </main>
  );
}
