import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hekimtaş Yatırım Danışmanlık",
  description: "Yatırım, finansman ve dış ticaret danışmanlığı.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
