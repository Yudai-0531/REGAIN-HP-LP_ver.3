import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REGAIN -Homepage- | Webの所有権を取り戻せ",
  description:
    "スポーツチーム・ジム向けのAI活用HP制作コーチング＆制作代行。月額管理費ゼロ、売り切り型でプロレベルのWebサイトを。",
  openGraph: {
    title: "REGAIN -Homepage- | Webの所有権を取り戻せ",
    description:
      "スポーツチーム・ジム向けのAI活用HP制作コーチング＆制作代行。月額管理費ゼロ、売り切り型でプロレベルのWebサイトを。",
    siteName: "REGAIN -Homepage-",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REGAIN -Homepage- | Webの所有権を取り戻せ",
    description:
      "スポーツチーム・ジム向けのAI活用HP制作コーチング＆制作代行。月額管理費ゼロ、売り切り型でプロレベルのWebサイトを。",
  },
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
