import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REGAIN -Homepage- | AIを活用したHP制作コーチング＆制作代行",
  description:
    "スポーツ・フィットネス事業者様向けのAIを活用したHP制作コーチング＆制作代行サービス。新時代に、新しい力を、再インストールせよ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
