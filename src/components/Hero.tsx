"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  ArrowDown, 
  Server,
  FileCheck2,
  CalendarCheck
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { profileData } from "@/data/profile";

export default function Hero() {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      {/* 배경 은은한 딥그린 그라디언트 효과 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-teal-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* 상단 뱃지 */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>실무 인턴 8개월 경험 보유 & 풀스택 수료</span>
          </div>

          {/* 메인 타이틀: 사용자 요청 문구 반영 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            신입 개발자 <span className="text-emerald-800">이준하</span>의
            <br />
            포트폴리오
          </h1>

          {/* 한 줄 소개 */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
            안정적인 시스템 운영과 꼼꼼한 테스트, 그리고 CS 이슈 대응을 통해
            <br className="hidden sm:inline" />
            실제 서비스의 품질을 높이는 <strong className="text-slate-800 font-semibold">{profileData.experience}</strong>입니다.
          </p>

          {/* 핵심 포인트 키워드 카드 3개 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 pb-4 text-left">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-600 transition-all">
              <div className="flex items-center gap-2.5 text-emerald-700 mb-1.5">
                <CalendarCheck className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Experience</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">인턴 8개월 실무 유지보수</p>
              <p className="text-xs text-slate-500 mt-0.5">로직/디자인 수정 및 CS 대응</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-600 transition-all">
              <div className="flex items-center gap-2.5 text-emerald-700 mb-1.5">
                <Server className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Backend Focus</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">Java · MyBatis · Oracle DB</p>
              <p className="text-xs text-slate-500 mt-0.5">Rest API 설계 & 데이터 영속화</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-600 transition-all">
              <div className="flex items-center gap-2.5 text-emerald-700 mb-1.5">
                <FileCheck2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Reliability</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">철저한 사전 테스트 & 문서화</p>
              <p className="text-xs text-slate-500 mt-0.5">배포 안정성 및 무중단 지향</p>
            </div>
          </div>

          {/* 연락처 및 바로가기 액션 바 */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {/* GitHub 링크 */}
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm transition-all border border-slate-200 shadow-xs"
            >
              <GithubIcon className="w-4 h-4 text-slate-700" />
              <span>GitHub 바로가기</span>
            </a>

            {/* 메일 복사 버튼 */}
            <button
              onClick={() => handleCopy(profileData.email, "email")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-all shadow-sm"
            >
              {copiedType === "email" ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>이메일 주소 복사됨!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>{profileData.email}</span>
                  <Copy className="w-3.5 h-3.5 opacity-80 ml-0.5" />
                </>
              )}
            </button>

            {/* 전화번호 버튼 */}
            <button
              onClick={() => handleCopy(profileData.phone, "phone")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium text-sm transition-all border border-slate-300 shadow-xs"
            >
              {copiedType === "phone" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>전화번호 복사됨!</span>
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>{profileData.phone}</span>
                </>
              )}
            </button>
          </div>

          {/* 스크롤 다운 유도 */}
          <div className="pt-8">
            <a
              href="#about"
              className="inline-flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span>자세한 이력 및 소개 보기</span>
              <ArrowDown className="w-4 h-4 animate-bounce text-emerald-700" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
