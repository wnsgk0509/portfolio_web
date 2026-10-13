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
  title: "신입 풀스택 개발자 이준하의 포트폴리오",
  description: "Spring Framework 백엔드와 React 프론트엔드를 아우르는 8개월 실무 인턴 경험의 신입 풀스택 개발자 이준하의 포트폴리오입니다.",
  keywords: ["이준하", "풀스택 개발자", "신입 개발자", "포트폴리오", "Java", "Spring", "React", "MyBatis", "OracleDB", "Full Stack Developer"],
  authors: [{ name: "이준하", url: "https://github.com/wnsgk0509" }],
  openGraph: {
    title: "신입 풀스택 개발자 이준하의 포트폴리오",
    description: "Spring Framework 백엔드와 React 프론트엔드를 아우르는 신입 풀스택 개발자 이준하의 포트폴리오",
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
      <body className="min-h-full flex flex-col bg-white text-slate-800">{children}</body>
    </html>
  );
}
