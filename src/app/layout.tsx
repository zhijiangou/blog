import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "我的个人网站",
  description: "记录生活与分享",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} relative min-h-screen`}>
        <div className="fixed inset-0 -z-20 bg-peony-pattern" />
        <div className="fixed inset-0 -z-10 bg-white/88 backdrop-blur-[2px]" />
        {children}
      </body>
    </html>
  );
}
