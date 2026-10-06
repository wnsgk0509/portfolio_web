import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "신입 개발자 이준하의 포트폴리오",
  description: "8개월 실무 인턴 경험을 가진 신입 백엔드 개발자 이준하의 포트폴리오입니다. 서비스 유지보수, 안정적인 배포, CS 대응 및 트러블 슈팅 경험을 소개합니다.",
  keywords: ["이준하", "백엔드 개발자", "신입 개발자", "포트폴리오", "Java", "Spring", "React", "MyBatis", "OracleDB"],
  authors: [{ name: "이준하", url: "https://github.com/wnsgk0509" }],
  openGraph: {
    title: "신입 개발자 이준하의 포트폴리오",
    description: "8개월 실무 인턴 경험을 가진 신입 백엔드 개발자 이준하의 포트폴리오",
    type: "website",
    url: "https://github.com/wnsgk0509",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
