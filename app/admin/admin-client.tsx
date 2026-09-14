"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Activity, ArrowDown, ArrowUp, BarChart3, BriefcaseBusiness, Building2, Check, ChevronRight, CircleUserRound, Clock3, Contact, ExternalLink, FileText, Gauge, Globe2, ImageIcon, Inbox, LayoutDashboard, Loader2, Menu, Plus, Save, Search, Settings2, Share2, Trash2, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { DetailBlock, SectorItem, ServiceItem, SiteContent } from "@/lib/site-content";

type View = "overview" | "brand" | "homepage" | "services" | "sectors" | "process" | "contact" | "social" | "seo" | "media" | "inquiries" | "history";
type Revision = { id: number; author: string; createdAt: string };
type Inquiry = { id: number; name: string; company: string; phone: string; email: string; service: string; message: string; status: string; createdAt: string };
type MediaAsset = { id: number; key: string; filename: string; contentType: string; size: number; createdAt: string };

const navigation: Array<{ label: string; items: Array<{ id: View; label: string; icon: React.ComponentType<{ className?: string }> }> }> = [
  { label: "Yönetim", items: [{ id: "overview", label: "Genel Bakış", icon: LayoutDashboard }, { id: "inquiries", label: "Gelen Talepler", icon: Inbox }] },
  { label: "Site İçeriği", items: [{ id: "brand", label: "Marka ve Logo", icon: Building2 }, { id: "homepage", label: "Ana Sayfa", icon: Gauge }, { id: "services", label: "Hizmetler", icon: BriefcaseBusiness }, { id: "sectors", label: "Sektörler", icon: BarChart3 }, { id: "process", label: "Süreç ve Yaklaşım", icon: Activity }, { id: "contact", label: "İletişim", icon: Contact }] },
  { label: "Dijital Varlık", items: [{ id: "social", label: "Sosyal Medya", icon: Share2 }, { id: "seo", label: "SEO Ayarları", icon: Search }, { id: "media", label: "Medya Kütüphanesi", icon: ImageIcon }, { id: "history", label: "Değişiklik Geçmişi", icon: Clock3 }] },
];

const viewTitles: Record<View, [string, string]> = {
  overview: ["Genel Bakış", "Sitenizin içeriği, talepleri ve yayın hazırlığı tek ekranda."],
  brand: ["Marka ve Logo", "Marka adı, alt tanım, alan adı, renkler ve logo kullanımı."],
  homepage: ["Ana Sayfa", "Üst bant, açılış alanı, güven göstergeleri ve ana mesajlar."],
  services: ["Hizmet Yönetimi", "Hizmetleri ekleyin, sıralayın, gizleyin ve ayrıntılarını yönetin."],
  sectors: ["Sektör Yönetimi", "Sektörleri ve açılır detay içeriklerini tek tek düzenleyin."],
  process: ["Süreç ve Yaklaşım", "Çalışma modelini, aşamaları ve kurumsal açıklamayı yönetin."],
  contact: ["İletişim Bilgileri", "Telefon, WhatsApp, yetkili, adres ve form başlıkları."],
  social: ["Sosyal Medya", "Bağlantıları girin ve sitede görünmesini istediğiniz kanalları açın."],
  seo: ["SEO Ayarları", "Arama sonucu başlığı, açıklaması ve hedef anahtar kelimeler."],
  media: ["Medya Kütüphanesi", "Logo ve hero görsellerini yükleyin; sitede kullanın."],
  inquiries: ["Gelen Talepler", "Web sitesinden gönderilen görüşme taleplerini takip edin."],
  history: ["Değişiklik Geçmişi", "Kaydedilen içerik sürümlerinin zaman ve kullanıcı kaydı."],
};

export function AdminClient({ initialContent, initialRevisions, user, signOutPath }: { initialContent: SiteContent; initialRevisions: Revision[]; user: { name: string; email: string }; signOutPath: string }) {
  const [content, setContent] = useState(initialContent);
  const [view, setView] = useState<View>("overview");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [dirty, setDirty] = useState(false);
  const [revisions, setRevisions] = useState(initialRevisions);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [deleteAction, setDeleteAction] = useState<null | { title: string; description: string; run: () => void }>(null);
  const [mobileSearch, setMobileSearch] = useState("");

  const completeness = useMemo(() => {
    const checks = [content.brand.name, content.brand.descriptor, content.brand.domain, content.hero.title, content.hero.lead, content.contact.phone, content.contact.address, content.seo.title, content.seo.description];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [content]);

  const mutate = (next: SiteContent) => { setContent(next); setDirty(true); setSaveState("idle"); };
  const patchSection = <K extends keyof SiteContent>(key: K, patch: Partial<SiteContent[K]>) => mutate({ ...content, [key]: { ...(content[key] as object), ...patch } });

  useEffect(() => {
    if (view !== "inquiries" && view !== "media") return;
    setLoadingData(true);
    fetch(view === "inquiries" ? "/api/inquiries" : "/api/media")
      .then((response) => response.json())
      .then((data) => view === "inquiries" ? setInquiries(data.inquiries ?? []) : setAssets(data.assets ?? []))
      .finally(() => setLoadingData(false));
  }, [view]);

  async function save() {
    setSaveState("saving");
    const response = await fetch("/api/content", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(content) });
    if (response.ok) {
      setSaveState("saved"); setDirty(false);
      const refreshed = await fetch("/api/content").then((item) => item.json());
      setRevisions(refreshed.revisions ?? revisions);
    } else setSaveState("error");
  }

  function navigate(next: View) { setView(next); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return (
    <SidebarProvider className="admin-shell">
      <Sidebar collapsible="offcanvas" className="border-r-0">
        <SidebarHeader className="border-b border-white/10 p-5">
          <BrandLogo name={content.brand.name} descriptor="YÖNETİM PANELİ" primary="#ffffff" accent={content.brand.accentColor} compact />
        </SidebarHeader>
        <SidebarContent className="px-2 py-4">
          {navigation.map((group) => <SidebarGroup key={group.label}><SidebarGroupLabel className="text-[10px] tracking-[.16em] text-slate-500 uppercase">{group.label}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{group.items.map((item) => <SidebarMenuItem key={item.id}><SidebarMenuButton isActive={view === item.id} onClick={() => navigate(item.id)} tooltip={item.label}><item.icon /><span>{item.label}</span>{item.id === "inquiries" && inquiries.filter((entry) => entry.status === "new").length > 0 && <span className="ml-auto rounded-full bg-cyan-500 px-2 py-0.5 text-[10px] text-white">{inquiries.filter((entry) => entry.status === "new").length}</span>}</SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroupContent></SidebarGroup>)}
        </SidebarContent>
        <SidebarFooter className="border-t border-white/10 p-4"><div className="flex items-center gap-3"><CircleUserRound className="size-8 text-cyan-400" /><div className="min-w-0"><strong className="block truncate text-xs text-white">{user.name}</strong><span className="block truncate text-[10px] text-slate-400">{user.email}</span></div></div><a href={signOutPath} className="mt-3 block text-[11px] text-slate-400 hover:text-white">Güvenli çıkış</a></SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-20 flex min-h-17 items-center gap-3 border-b border-slate-200 bg-white/92 px-4 backdrop-blur-xl md:px-8"><SidebarTrigger className="size-9" /><div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex"><span>Hekimtaş</span><ChevronRight className="size-3" /><strong className="text-slate-800">{viewTitles[view][0]}</strong></div><div className="ml-auto flex items-center gap-2"><a href="/" target="_blank" className="hidden h-10 items-center gap-2 border border-slate-200 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:flex">Siteyi Gör <ExternalLink className="size-3.5" /></a><Button onClick={save} disabled={!dirty || saveState === "saving"} className="h-10 rounded-none bg-[#0a2037] px-4 hover:bg-[#14314d]"><Save />{saveState === "saving" ? "Kaydediliyor" : saveState === "saved" ? "Kaydedildi" : "Değişiklikleri Kaydet"}</Button></div></header>

        <div className="mx-auto w-full max-w-[1500px] p-4 md:p-8 lg:p-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-2 text-[11px] font-bold tracking-[.14em] text-cyan-700 uppercase">Hekimtaş CMS</p><h1 className="text-3xl font-bold tracking-[-.035em] text-[#0a2037] md:text-4xl">{viewTitles[view][0]}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{viewTitles[view][1]}</p></div>{dirty && <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-700">Kaydedilmemiş değişiklik var</Badge>}</div>
          {saveState === "error" && <div className="mb-5 border border-red-200 bg-red-50 p-4 text-sm text-red-700">Değişiklik kaydedilemedi. Lütfen tekrar deneyin.</div>}
          {view === "overview" && <Overview content={content} completeness={completeness} inquiries={inquiries} navigate={navigate} />}
          {view === "brand" && <BrandEditor content={content} mutate={mutate} patchSection={patchSection} />}
          {view === "homepage" && <HomepageEditor content={content} mutate={mutate} patchSection={patchSection} />}
          {view === "services" && <CollectionEditor kind="services" content={content} mutate={mutate} requestDelete={setDeleteAction} />}
          {view === "sectors" && <CollectionEditor kind="sectors" content={content} mutate={mutate} requestDelete={setDeleteAction} />}
          {view === "process" && <ProcessEditor content={content} mutate={mutate} patchSection={patchSection} />}
          {view === "contact" && <ContactEditor content={content} patchSection={patchSection} />}
          {view === "social" && <SocialEditor content={content} mutate={mutate} />}
          {view === "seo" && <SeoEditor content={content} patchSection={patchSection} completeness={completeness} />}
          {view === "media" && <MediaManager content={content} mutate={mutate} assets={assets} setAssets={setAssets} loading={loadingData} requestDelete={setDeleteAction} />}
          {view === "inquiries" && <InquiryManager inquiries={inquiries} setInquiries={setInquiries} loading={loadingData} search={mobileSearch} setSearch={setMobileSearch} />}
          {view === "history" && <History revisions={revisions} />}
        </div>
      </SidebarInset>
      <AlertDialog open={Boolean(deleteAction)} onOpenChange={(open) => !open && setDeleteAction(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{deleteAction?.title}</AlertDialogTitle><AlertDialogDescription>{deleteAction?.description}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Vazgeç</AlertDialogCancel><AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => { deleteAction?.run(); setDeleteAction(null); }}>Sil</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </SidebarProvider>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <section className={`admin-panel-card p-5 md:p-7 ${className}`}>{children}</section>; }
function Title({ children, help }: { children: React.ReactNode; help?: string }) { return <div className="mb-6"><h2 className="admin-section-title">{children}</h2>{help && <p className="admin-help">{help}</p>}</div>; }
function Field({ label, value, onChange, area = false, type = "text", placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; area?: boolean; type?: string; placeholder?: string }) { return <label className="admin-label">{label}{area ? <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /> : <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />}</label>; }

function Overview({ content, completeness, inquiries, navigate }: { content: SiteContent; completeness: number; inquiries: Inquiry[]; navigate: (view: View) => void }) {
  const activeServices = content.services.filter((item) => item.active).length;
  const activeSectors = content.sectors.filter((item) => item.active).length;
  const stats: Array<{ label: string; value: string; icon: React.ComponentType<{ className?: string }> }> = [
    { label: "Yayın hazırlığı", value: `${completeness}%`, icon: Gauge },
    { label: "Aktif hizmet", value: String(activeServices), icon: BriefcaseBusiness },
    { label: "Aktif sektör", value: String(activeSectors), icon: BarChart3 },
    { label: "Yeni talep", value: String(inquiries.filter((item) => item.status === "new").length), icon: Inbox },
  ];
  const readinessStats: Array<{ label: string; value: string; icon: React.ComponentType<{ className?: string }> }> = [
    { value: content.brand.domain, label: "Alan adı", icon: Globe2 },
    { value: content.services.length + " hizmet", label: "Hizmet kataloğu", icon: BriefcaseBusiness },
    { value: content.sectors.length + " sektör", label: "Sektör kataloğu", icon: BarChart3 },
    { value: content.socials.filter((item) => item.active).length + " kanal", label: "Aktif sosyal medya", icon: Share2 },
  ];
  return <div className="grid gap-5"><div className="grid gap-4 md:grid-cols-4">{stats.map(({ label, value, icon: Icon }) => <Panel key={label} className="min-h-36"><div className="flex items-center justify-between"><Icon className="size-5 text-cyan-600" /><span className="admin-status-dot" /></div><strong className="mt-7 block text-3xl tracking-tight text-[#0a2037]">{value}</strong><span className="mt-1 block text-xs text-slate-500">{label}</span></Panel>)}</div><div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]"><Panel><Title help="Temel alanların doldurulma oranı">Site hazırlık durumu</Title><div className="flex items-center gap-5"><Progress value={completeness} className="h-2" /><strong className="text-sm">%{completeness}</strong></div><div className="mt-7 grid gap-2 sm:grid-cols-2">{readinessStats.map(({ value, label, icon: Icon }) => <div key={label} className="flex items-center gap-3 border border-slate-200 p-4"><Icon className="size-4 text-cyan-600"/><div><strong className="block text-sm text-slate-800">{value}</strong><span className="text-[11px] text-slate-500">{label}</span></div></div>)}</div></Panel><Panel><Title>Hızlı işlemler</Title><div className="grid gap-2">{[["Ana başlığı düzenle","homepage"],["Yeni hizmet ekle","services"],["Sosyal medya bağla","social"],["Gelen talepleri aç","inquiries"]].map(([label,target])=><button key={label} onClick={()=>navigate(target as View)} className="flex items-center justify-between border-b border-slate-200 py-3 text-left text-sm font-semibold text-slate-700 hover:text-cyan-700"><span>{label}</span><ChevronRight className="size-4"/></button>)}</div></Panel></div></div>;
}

function BrandEditor({ content, mutate, patchSection }: { content: SiteContent; mutate: (c: SiteContent) => void; patchSection: <K extends keyof SiteContent>(key: K, patch: Partial<SiteContent[K]>) => void }) {
  return <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><Panel><Title help="Logo yazısı bu alanlardan otomatik oluşur. İsterseniz medya bölümünden ayrı bir logo da yükleyebilirsiniz.">Kurumsal kimlik</Title><div className="admin-field-grid"><Field label="Marka adı" value={content.brand.name} onChange={(v)=>patchSection("brand",{name:v})}/><Field label="Alt tanım" value={content.brand.descriptor} onChange={(v)=>patchSection("brand",{descriptor:v})}/><Field label="Alan adı" value={content.brand.domain} onChange={(v)=>patchSection("brand",{domain:v})}/><Field label="Özel logo adresi" value={content.brand.logoUrl} placeholder="Boşsa kurumsal logo kullanılır" onChange={(v)=>patchSection("brand",{logoUrl:v})}/><Field label="Ana renk" type="color" value={content.brand.primaryColor} onChange={(v)=>patchSection("brand",{primaryColor:v})}/><Field label="Vurgu rengi" type="color" value={content.brand.accentColor} onChange={(v)=>patchSection("brand",{accentColor:v})}/></div></Panel><Panel><Title>Canlı logo önizlemesi</Title><div className="grid min-h-56 place-items-center border border-slate-200 bg-slate-50 p-6">{content.brand.logoUrl?<img src={content.brand.logoUrl} className="max-h-24 max-w-full" alt="Logo önizleme"/>:<BrandLogo {...content.brand}/>}</div><button className="mt-4 text-xs font-semibold text-cyan-700" onClick={()=>mutate({...content,brand:{...content.brand,logoUrl:""}})}>Kurumsal logoya dön</button></Panel></div>;
}

function HomepageEditor({ content, mutate, patchSection }: { content: SiteContent; mutate: (c: SiteContent) => void; patchSection: <K extends keyof SiteContent>(key: K, patch: Partial<SiteContent[K]>) => void }) {
  return <div className="grid gap-5"><Panel><Title>Üst bilgi bandı</Title><div className="admin-field-grid"><Field label="Kısa açıklama" value={content.topbar.text} onChange={(v)=>patchSection("topbar",{text:v})}/><Field label="Konum" value={content.topbar.location} onChange={(v)=>patchSection("topbar",{location:v})}/></div></Panel><Panel><Title help="Ana ekranın ilk görünen mesajı. Kısa, net ve karar vericiye yönelik tutun.">Hero / Açılış alanı</Title><div className="admin-field-grid"><Field label="Üst başlık" value={content.hero.eyebrow} onChange={(v)=>patchSection("hero",{eyebrow:v})}/><Field label="Ana başlık" value={content.hero.title} onChange={(v)=>patchSection("hero",{title:v})}/><Field label="Vurgulu ifade" value={content.hero.accent} onChange={(v)=>patchSection("hero",{accent:v})}/><Field label="Ana buton" value={content.hero.primaryCta} onChange={(v)=>patchSection("hero",{primaryCta:v})}/><Field label="İkinci buton" value={content.hero.secondaryCta} onChange={(v)=>patchSection("hero",{secondaryCta:v})}/><Field label="Hero görsel adresi" value={content.hero.imageUrl} onChange={(v)=>patchSection("hero",{imageUrl:v})}/><div className="md:col-span-2"><Field label="Açıklama" area value={content.hero.lead} onChange={(v)=>patchSection("hero",{lead:v})}/></div></div></Panel><Panel><Title>Güven göstergeleri</Title><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{content.proof.map((item,index)=><div className="admin-item-card p-4" key={index}><Field label="Değer" value={item.value} onChange={(v)=>{const proof=[...content.proof];proof[index]={...item,value:v};mutate({...content,proof})}}/><div className="mt-3"><Field label="Açıklama" value={item.label} onChange={(v)=>{const proof=[...content.proof];proof[index]={...item,label:v};mutate({...content,proof})}}/></div></div>)}</div></Panel><Panel><Title>Kurumsal yaklaşım mesajı</Title><div className="admin-field-grid"><Field label="Etiket" value={content.statement.label} onChange={(v)=>patchSection("statement",{label:v})}/><Field label="Ana mesaj" area value={content.statement.quote} onChange={(v)=>patchSection("statement",{quote:v})}/></div></Panel></div>;
}

function CollectionEditor({ kind, content, mutate, requestDelete }: { kind: "services"|"sectors"; content: SiteContent; mutate: (c:SiteContent)=>void; requestDelete:(value:{title:string;description:string;run:()=>void})=>void }) {
  const list = content[kind] as Array<ServiceItem|SectorItem>;
  const introKey = kind === "services" ? "servicesIntro" : "sectorsIntro";
  const intro = content[introKey];
  const update = (index:number, patch:Partial<ServiceItem|SectorItem>) => { const next=[...list]; next[index]={...next[index],...patch}; mutate({...content,[kind]:next}); };
  const move = (index:number,direction:-1|1) => { const target=index+direction;if(target<0||target>=list.length)return;const next=[...list];[next[index],next[target]]=[next[target],next[index]];mutate({...content,[kind]:next.map((item,i)=>({...item,number:String(i+1).padStart(2,"0")}))}); };
  const add = () => { const number=String(list.length+1).padStart(2,"0"); const base={id:`${kind}-${Date.now()}`,number,title:kind==="services"?"Yeni Hizmet":"Yeni Sektör",short:"Kısa açıklama",intro:"Detay açıklaması",active:true,blocks:[{title:"Çalışma alanları",items:["Yeni madde"]}]};mutate({...content,[kind]:[...list,base]}); };
  return <div className="grid gap-5"><Panel><Title>Sayfa başlığı</Title><div className="admin-field-grid"><Field label="Etiket" value={intro.eyebrow} onChange={(v)=>mutate({...content,[introKey]:{...intro,eyebrow:v}})}/><Field label="Başlık" value={intro.title} onChange={(v)=>mutate({...content,[introKey]:{...intro,title:v}})}/><div className="md:col-span-2"><Field label="Açıklama" area value={intro.text} onChange={(v)=>mutate({...content,[introKey]:{...intro,text:v}})}/></div></div></Panel><div className="flex items-center justify-between"><strong className="text-sm text-slate-700">{list.length} kayıt</strong><Button onClick={add} variant="outline"><Plus/>Yeni ekle</Button></div>{list.map((item,index)=><Panel key={item.id}><div className="mb-6 flex flex-wrap items-center gap-3"><span className="grid size-9 place-items-center bg-[#0a2037] text-xs font-bold text-white">{item.number}</span><strong className="mr-auto text-lg text-[#0a2037]">{item.title}</strong><div className="flex items-center gap-2"><span className="text-xs text-slate-500">Sitede göster</span><Switch checked={item.active} onCheckedChange={(active)=>update(index,{active})}/></div><Button size="icon" variant="ghost" onClick={()=>move(index,-1)} disabled={index===0}><ArrowUp/></Button><Button size="icon" variant="ghost" onClick={()=>move(index,1)} disabled={index===list.length-1}><ArrowDown/></Button><Button size="icon" variant="ghost" className="text-red-600" onClick={()=>requestDelete({title:`${item.title} silinsin mi?`,description:"Bu kayıt ve açılır pencere içeriği kaldırılacaktır.",run:()=>mutate({...content,[kind]:list.filter((_,i)=>i!==index)})})}><Trash2/></Button></div><div className="admin-field-grid"><Field label="Başlık" value={item.title} onChange={(v)=>update(index,{title:v})}/><Field label="Kısa açıklama" value={item.short} onChange={(v)=>update(index,{short:v})}/><div className="md:col-span-2"><Field label="Detay giriş metni" area value={item.intro} onChange={(v)=>update(index,{intro:v})}/></div></div><div className="mt-6 border-t border-slate-200 pt-5"><div className="mb-4 flex items-center justify-between"><strong className="text-xs tracking-wide text-slate-600 uppercase">Açılır pencere bölümleri</strong><button className="text-xs font-semibold text-cyan-700" onClick={()=>update(index,{blocks:[...item.blocks,{title:"Yeni bölüm",items:["Yeni madde"]}]})}>+ Bölüm ekle</button></div><div className="grid gap-4 lg:grid-cols-3">{item.blocks.map((block,blockIndex)=><div className="admin-item-card p-4" key={blockIndex}><Field label="Bölüm başlığı" value={block.title} onChange={(v)=>{const blocks=[...item.blocks];blocks[blockIndex]={...block,title:v};update(index,{blocks})}}/><div className="mt-3"><Field label="Maddeler (her satır ayrı)" area value={block.items.join("\n")} onChange={(v)=>{const blocks=[...item.blocks];blocks[blockIndex]={...block,items:v.split("\n").filter(Boolean)};update(index,{blocks})}}/></div><button className="mt-3 text-[11px] font-semibold text-red-600" onClick={()=>update(index,{blocks:item.blocks.filter((_,i)=>i!==blockIndex)})}>Bölümü kaldır</button></div>)}</div></div></Panel>)}</div>;
}

function ProcessEditor({content,mutate,patchSection}:{content:SiteContent;mutate:(c:SiteContent)=>void;patchSection:<K extends keyof SiteContent>(key:K,patch:Partial<SiteContent[K]>)=>void}) { return <div className="grid gap-5"><Panel><Title>Yaklaşım bölümü</Title><div className="admin-field-grid"><Field label="Etiket" value={content.processIntro.eyebrow} onChange={(v)=>patchSection("processIntro",{eyebrow:v})}/><Field label="Başlık" value={content.processIntro.title} onChange={(v)=>patchSection("processIntro",{title:v})}/><div className="md:col-span-2"><Field label="Açıklama" area value={content.processIntro.text} onChange={(v)=>patchSection("processIntro",{text:v})}/></div></div></Panel><Panel><Title>Çalışma adımları</Title><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{content.process.map((step,index)=><div className="admin-item-card p-4" key={index}><Field label="Sıra" value={step.number} onChange={(v)=>{const process=[...content.process];process[index]={...step,number:v};mutate({...content,process})}}/><div className="mt-3"><Field label="Başlık" value={step.title} onChange={(v)=>{const process=[...content.process];process[index]={...step,title:v};mutate({...content,process})}}/></div><div className="mt-3"><Field label="Açıklama" area value={step.text} onChange={(v)=>{const process=[...content.process];process[index]={...step,text:v};mutate({...content,process})}}/></div></div>)}</div></Panel><Panel><Title>Yasal açıklama</Title><Field label="Feragat ve bilgilendirme metni" area value={content.footer.disclaimer} onChange={(v)=>patchSection("footer",{disclaimer:v})}/></Panel></div>; }

function ContactEditor({content,patchSection}:{content:SiteContent;patchSection:<K extends keyof SiteContent>(key:K,patch:Partial<SiteContent[K]>)=>void}) { return <Panel><Title help="Bu bilgiler sitenin iletişim alanında ve arama butonlarında kullanılır.">İletişim ve form ayarları</Title><div className="admin-field-grid"><Field label="Bölüm etiketi" value={content.contact.eyebrow} onChange={(v)=>patchSection("contact",{eyebrow:v})}/><Field label="Başlık" value={content.contact.title} onChange={(v)=>patchSection("contact",{title:v})}/><Field label="Telefon" value={content.contact.phone} onChange={(v)=>patchSection("contact",{phone:v})}/><Field label="WhatsApp numarası" value={content.contact.whatsapp} onChange={(v)=>patchSection("contact",{whatsapp:v})}/><Field label="E-posta" type="email" value={content.contact.email} onChange={(v)=>patchSection("contact",{email:v})}/><Field label="Yetkili kişi" value={content.contact.official} onChange={(v)=>patchSection("contact",{official:v})}/><Field label="Görev / unvan" value={content.contact.officialTitle} onChange={(v)=>patchSection("contact",{officialTitle:v})}/><div className="md:col-span-2"><Field label="Bölüm açıklaması" area value={content.contact.lead} onChange={(v)=>patchSection("contact",{lead:v})}/></div><div className="md:col-span-2"><Field label="Adres" area value={content.contact.address} onChange={(v)=>patchSection("contact",{address:v})}/></div></div></Panel>; }

function SocialEditor({content,mutate}:{content:SiteContent;mutate:(c:SiteContent)=>void}) { return <div className="grid gap-5"><Panel><Title help="Bağlantısı boş veya kapalı olan sosyal medya kanalı sitede görünmez.">Sosyal medya hesapları</Title><div className="grid gap-3">{content.socials.map((social,index)=><div key={social.id} className="grid items-center gap-4 border border-slate-200 p-4 md:grid-cols-[150px_1fr_auto]"><strong className="text-sm text-slate-700">{social.platform}</strong><Input value={social.url} placeholder={`${social.platform} profil bağlantısı`} onChange={(e)=>{const socials=[...content.socials];socials[index]={...social,url:e.target.value};mutate({...content,socials})}}/><div className="flex items-center gap-2"><span className="text-xs text-slate-500">Yayında</span><Switch checked={social.active} onCheckedChange={(active)=>{const socials=[...content.socials];socials[index]={...social,active};mutate({...content,socials})}}/></div></div>)}</div></Panel><Panel><Title>Alt bilgi metni</Title><Field label="Kısa kurumsal açıklama" area value={content.footer.summary} onChange={(v)=>mutate({...content,footer:{...content.footer,summary:v}})}/></Panel></div>; }

function SeoEditor({content,patchSection,completeness}:{content:SiteContent;patchSection:<K extends keyof SiteContent>(key:K,patch:Partial<SiteContent[K]>)=>void;completeness:number}) { return <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><Panel><Title>Arama motoru bilgileri</Title><div className="grid gap-5"><Field label="Sayfa başlığı" value={content.seo.title} onChange={(v)=>patchSection("seo",{title:v})}/><Field label="Meta açıklaması" area value={content.seo.description} onChange={(v)=>patchSection("seo",{description:v})}/><Field label="Anahtar kelimeler (virgülle ayırın)" area value={content.seo.keywords} onChange={(v)=>patchSection("seo",{keywords:v})}/></div></Panel><Panel><Title>Google önizlemesi</Title><div className="rounded-lg border border-slate-200 p-5"><span className="text-xs text-emerald-700">https://{content.brand.domain}</span><h3 className="mt-2 text-xl text-blue-800">{content.seo.title}</h3><p className="mt-2 text-sm leading-5 text-slate-600">{content.seo.description}</p></div><div className="mt-6"><div className="mb-2 flex justify-between text-xs"><span>İçerik hazırlığı</span><strong>%{completeness}</strong></div><Progress value={completeness}/></div></Panel></div>; }

function MediaManager({content,mutate,assets,setAssets,loading,requestDelete}:{content:SiteContent;mutate:(c:SiteContent)=>void;assets:MediaAsset[];setAssets:React.Dispatch<React.SetStateAction<MediaAsset[]>>;loading:boolean;requestDelete:(v:{title:string;description:string;run:()=>void})=>void}) {
  const [uploading,setUploading]=useState(false); async function upload(event:ChangeEvent<HTMLInputElement>){const file=event.target.files?.[0];if(!file)return;setUploading(true);const data=new FormData();data.append("file",file);const response=await fetch("/api/media",{method:"POST",body:data});const body=await response.json();if(response.ok)setAssets((current)=>[body.asset,...current]);setUploading(false);event.target.value=""}
  async function remove(asset:MediaAsset){await fetch(`/api/media?id=${asset.id}`,{method:"DELETE"});setAssets((items)=>items.filter((item)=>item.id!==asset.id));}
  return <div className="grid gap-5"><Panel><Title help="PNG, JPG, WebP veya SVG; en fazla 8 MB.">Yeni görsel yükle</Title><label className="flex min-h-40 cursor-pointer flex-col items-center justify-center border border-dashed border-slate-300 bg-slate-50 text-center hover:border-cyan-500 hover:bg-cyan-50/30">{uploading?<Loader2 className="mb-3 size-7 animate-spin text-cyan-600"/>:<ImageIcon className="mb-3 size-7 text-cyan-600"/>}<strong className="text-sm text-slate-700">{uploading?"Yükleniyor…":"Dosya seç veya buraya bırak"}</strong><span className="mt-1 text-xs text-slate-500">Logo ve hero görselleri burada saklanır.</span><input type="file" accept="image/*" className="sr-only" onChange={upload}/></label></Panel><Panel><Title>Yüklü görseller</Title>{loading?<div className="grid min-h-40 place-items-center"><Loader2 className="animate-spin"/></div>:assets.length===0?<p className="text-sm text-slate-500">Henüz görsel yüklenmedi.</p>:<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{assets.map((asset)=>{const url=`/api/media/file?key=${encodeURIComponent(asset.key)}`;return <div className="admin-item-card overflow-hidden" key={asset.id}><div className="grid h-44 place-items-center bg-slate-100"><img src={url} className="h-full w-full object-contain" alt={asset.filename}/></div><div className="p-4"><strong className="block truncate text-xs text-slate-700">{asset.filename}</strong><span className="mt-1 block text-[10px] text-slate-400">{(asset.size/1024).toFixed(0)} KB</span><div className="mt-4 flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={()=>mutate({...content,brand:{...content.brand,logoUrl:url}})}>Logo yap</Button><Button size="sm" variant="outline" onClick={()=>mutate({...content,hero:{...content.hero,imageUrl:url}})}>Hero yap</Button><Button size="icon" variant="ghost" className="ml-auto text-red-600" onClick={()=>requestDelete({title:"Görsel silinsin mi?",description:"Bu dosya medya kütüphanesinden kalıcı olarak kaldırılır.",run:()=>void remove(asset)})}><Trash2/></Button></div></div></div>})}</div>}</Panel></div>;
}

function InquiryManager({inquiries,setInquiries,loading,search,setSearch}:{inquiries:Inquiry[];setInquiries:React.Dispatch<React.SetStateAction<Inquiry[]>>;loading:boolean;search:string;setSearch:(v:string)=>void}) {
  const filtered=inquiries.filter((item)=>`${item.name} ${item.company} ${item.service}`.toLocaleLowerCase("tr-TR").includes(search.toLocaleLowerCase("tr-TR"))); async function setStatus(id:number,status:string){await fetch("/api/inquiries",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({id,status})});setInquiries((items)=>items.map((item)=>item.id===id?{...item,status}:item));}
  return <Panel><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><Title>Talep listesi</Title><div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"/><Input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Ad, firma veya konu ara" className="w-72 pl-9"/></div></div>{loading?<div className="grid min-h-48 place-items-center"><Loader2 className="animate-spin"/></div>:filtered.length===0?<div className="grid min-h-48 place-items-center text-sm text-slate-500">Henüz talep bulunmuyor.</div>:<div className="grid gap-3">{filtered.map((item)=><article key={item.id} className="border border-slate-200 p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2"><strong className="text-base text-[#0a2037]">{item.name}</strong><Badge variant={item.status==="new"?"default":"outline"}>{item.status==="new"?"Yeni":item.status==="contacted"?"Görüşüldü":"Kapandı"}</Badge></div><p className="mt-1 text-xs text-slate-500">{item.company||"Firma belirtilmedi"} · {item.service}</p></div><span className="text-[11px] text-slate-400">{new Date(item.createdAt).toLocaleString("tr-TR")}</span></div><p className="mt-4 border-l-2 border-cyan-500 pl-4 text-sm leading-6 text-slate-600">{item.message}</p><div className="mt-4 flex flex-wrap items-center gap-3 text-xs"><a href={`tel:${item.phone.replace(/\D/g,"")}`} className="font-semibold text-cyan-700">{item.phone||"Telefon yok"}</a>{item.email&&<a href={`mailto:${item.email}`} className="text-slate-600">{item.email}</a>}<div className="ml-auto flex gap-2"><Button size="sm" variant="outline" onClick={()=>setStatus(item.id,"contacted")}>Görüşüldü</Button><Button size="sm" variant="outline" onClick={()=>setStatus(item.id,"closed")}>Kapat</Button></div></div></article>)}</div>}</Panel>;
}

function History({revisions}:{revisions:Revision[]}) { return <Panel><Title help="Her içerik kaydı ayrı bir sürüm olarak izlenir.">Son kayıtlar</Title>{revisions.length===0?<p className="text-sm text-slate-500">Henüz kaydedilmiş sürüm yok.</p>:<div className="grid gap-0 border-t border-slate-200">{revisions.map((item)=><div key={item.id} className="grid grid-cols-[40px_1fr_auto] items-center gap-4 border-b border-slate-200 py-4"><span className="grid size-8 place-items-center bg-slate-100 text-xs font-bold text-slate-600">#{item.id}</span><div><strong className="block text-sm text-slate-700">İçerik güncellendi</strong><span className="text-[11px] text-slate-500">{item.author}</span></div><time className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString("tr-TR")}</time></div>)}</div>}</Panel>; }
