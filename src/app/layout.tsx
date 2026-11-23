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
  title: "AI 서비스 풀스택 개발자 이준하 | 포트폴리오",
  description:
    "기획부터 개발·기술 검증·운영까지 완주하는 AI 서비스 풀스택 개발자 이준하의 포트폴리오입니다. 7개월 실무 운영(Java·MySQL·Linux)과 React·TypeScript·Spring·Gemini LLM 파이프라인 경험을 확인하세요.",
  keywords: [
    "이준하",
    "AI 서비스 개발자",
    "풀스택 개발자",
    "신입 개발자",
    "포트폴리오",
    "Java",
    "Spring",
    "React",
    "TypeScript",
    "MySQL",
    "Supabase",
    "Python",
    "LLM",
    "Gemini API",
  ],
  authors: [{ name: "이준하", url: "https://github.com/wnsgk0509" }],
  openGraph: {
    title: "AI 서비스 풀스택 개발자 이준하 | 포트폴리오",
    description:
      "기획·개발·기술 검증·운영(E2E)을 완주하는 AI 서비스 풀스택 개발자 이준하의 포트폴리오",
    type: "website",
    url: "https://portfolio-web-iota-fawn.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
