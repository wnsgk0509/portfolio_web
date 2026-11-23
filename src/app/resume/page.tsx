"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Mail, Phone, Globe } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { profileData } from "@/data/profile";

const resumeProjects = [
  {
    name: "Provit — AI 기반 모의면접 및 채용공고 추천 플랫폼",
    meta: "2026.09.15 ~ 2026.10.08 | 협업 4명 (기술팀장) | Java 17 · Spring MVC · MyBatis · OracleDB · React 19 · Vercel",
    github: "https://github.com/wnsgk0509/provit",
    live: "https://provit-sigma.vercel.app/",
    bullets: [
      {
        stage: "기획 · 설계",
        text: "기술팀장으로서 초기 개발 환경·Git-Flow·PR 코드 리뷰를 주도하고, 전체 DB 스키마(2,178개 표준 직무 시드)와 다단계 Fallback 추천(대표 이력서 → 기본 직무 → 인기 공고) 구조 설계",
      },
      {
        stage: "핵심 구현",
        text: "Jsoup 채용공고 크롤러·@Scheduled 자동 정리 배치(180일 미스크랩 공고 Purge), EXISTS 하위 직무 검색 API, 외부 사주 API 장애 대비 로컬 엔진(LocalSazuEngine) Fallback, 카테고리별 파일 업로드 모듈 풀스택 구현",
      },
      {
        stage: "기술 검증",
        text: "기동 시 동기 크롤링 부팅 지연을 CompletableFuture.runAsync()로 해소, 동시 스크랩 PK 충돌을 Oracle MERGE INTO로 차단, Vercel Rewrites + Spring 5.3 CORS 설정으로 배포 POST 403 및 SPA 404 완전 해결",
      },
    ],
  },
  {
    name: "GitFolio Generator — GitHub 커밋/PR 기반 AI 기술 포트폴리오 생성기",
    meta: "2026.09.23 ~ 2026.10.12 | 개인 1인 | Python · Streamlit · PyGithub · Google Gemini API · Notion API",
    github: "https://github.com/wnsgk0509/GitFolio_Generator",
    live: "https://gitfoliogenerator-8prcmeheyqi4bt9u9ef4nk.streamlit.app/",
    bullets: [
      {
        stage: "기획 · 설계",
        text: "대규모 저장소 커밋/Diff 분석 시 단일 프롬프트 컨텍스트 한계와 세부 내역 유실 문제를 해결하기 위해 노이즈 커밋 필터링 + 하이브리드 LLM 분석 아키텍처 설계",
      },
      {
        stage: "핵심 구현",
        text: "PyGithub 기반 README·커밋·PR Diff 추출, 표준 고속 모드(80커밋) / Map-Reduce 정밀 모드(200커밋, 40개 단위 청크 요약 후 5개 섹션 종합) 구현, Markdown·PDF용 HTML·GitHub Gist·Notion 네이티브 블록 4종 Export 구축",
      },
      {
        stage: "기술 검증",
        text: "실제 협업 저장소 테스트로 표준 모드(~15초) 대비 Map-Reduce 모드(~40초)의 초기 설계·트러블슈팅 누락 방지 효과를 비교 검증하고 4개 외부 채널 포맷 호환성 검증 완료",
      },
    ],
  },
  {
    name: "1lev_up — 최소 습관 & 루틴 관리 하이브리드 앱 (Web & Android)",
    meta: "2026.11 | 개인 1인 | React 19 · TypeScript · Capacitor (Android) · Supabase · AdMob · Vite PWA",
    github: "https://github.com/wnsgk0509/1lev_up",
    live: "https://1lev-up.vercel.app/",
    bullets: [
      {
        stage: "기획 · 설계",
        text: "컨디션 저하 시 루틴 포기 문제를 해결하는 최소 루틴(MVR)·The ONE Thing 자동 연동 UX를 기획하고, PWA 검증 후 Capacitor Android 앱 확장 및 Google AdMob/Pro 구독 수익화 모델 설계",
      },
      {
        stage: "핵심 구현",
        text: "Capacitor 기반 Android 네이티브 앱 빌드, Google AdMob(배너/전면/보상형) 연동, 7일 루틴 기반 AI 주간 코칭 리포트(aiCoach.ts), 5분 마음 멈춤 앰비언트 오디오, 순수 Canvas 성장 영수증 및 멱등성 오프라인 큐 구현",
      },
      {
        stage: "기술 검증",
        text: "canvas-confetti Web Worker가 Android WebView GPU와 충돌해 화면이 백화(White Screen)되는 버그를 규명해 메인 스레드 2D 전환 및 사전 마운트로 해결, Vite 번들 93.5% 감축(537.10kB → 34.79kB) 실측 완료",
      },
    ],
  },
  {
    name: "잠깐 (Jamkkan) — 3초 멈춤 디지털 디톡스 & 성찰 기록 앱",
    meta: "2026.10.21 ~ 2026.11.03 | 개인 1인 | React Native · TypeScript · Android Kotlin · Supabase · PWA",
    github: "https://github.com/wnsgk0509/first_button",
    bullets: [
      {
        stage: "기획 · 설계",
        text: "무의식적 스마트폰 스크롤 차단을 위해 웹(PWA) MVP에서 시작해 OS 레벨 개입이 가능한 React Native + Android Kotlin 네이티브 브릿지로 제품 아키텍처 확장",
      },
      {
        stage: "핵심 구현",
        text: "Kotlin 네이티브 홈화면 위젯(AppWidgetProvider)·지정 시간 알림(AlarmManager)·몰입 모드 구현, Supabase 실시간 익명 광장(비속어 마스킹·신고/차단 클린 정책) 및 JSON 로컬 백업/텍스트 마이닝 키워드 TOP 5 구현",
      },
      {
        stage: "기술 검증",
        text: "Android 15 Edge-to-Edge SafeArea 실기기 오버랩 해결, 키보드 동적 패딩·자동 스크롤 검증, 릴리즈 빌드 AAPT2 오류의 JPEG 바이너리 헤더 불일치를 규명해 실제 PNG 리인코딩 및 5대 밀도 변환으로 해결",
      },
    ],
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 print:bg-white print:p-0">
      {/* 상단 액션 바 (인쇄 시 숨김) */}
      <div className="no-print max-w-[820px] mx-auto mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium border border-slate-200 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>포트폴리오로 돌아가기</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:inline">
            인쇄 설정에서 &apos;PDF로 저장&apos;을 선택하세요
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>이력서 PDF 저장 / 인쇄</span>
          </button>
        </div>
      </div>

      {/* A4 이력서 본문 시트 */}
      <article className="max-w-[820px] mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-8 sm:p-11 print:max-w-none print:border-0 print:rounded-none print:shadow-none print:p-0 text-slate-800 space-y-7">
        {/* 1. 헤더 */}
        <header className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {profileData.name}
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                즉시 입사 가능
              </span>
            </div>
            <p className="text-base font-bold text-emerald-800 mt-1">
              {profileData.role} · 기획 · 개발 · 기술 검증 · 운영(E2E)
            </p>
            <p className="text-xs text-slate-600 mt-1">
              신입 (B2B 사내 메신저 실무 인턴 7개월) · 배재대학교 컴퓨터공학과 졸업
            </p>
          </div>

          <div className="text-xs text-slate-600 space-y-1 sm:text-right">
            <div className="flex items-center sm:justify-end gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-700" />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{profileData.phone}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <GithubIcon className="w-3.5 h-3.5 text-slate-700" />
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                github.com/wnsgk0509
              </a>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <a
                href={profileData.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                portfolio-web-iota-fawn.vercel.app
              </a>
            </div>
          </div>
        </header>

        {/* 2. 핵심 요약 (Summary) */}
        <section className="space-y-2.5 print-avoid-break">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-1">
            Summary · 핵심 역량 요약
          </h2>
          <p className="text-[13px] leading-relaxed text-slate-700">
            <strong className="text-slate-900">
              기획(문제 정의) → AI·풀스택 개발 → 정량 검증 → 실무 운영
            </strong>
            까지 서비스 전 과정을 완주하는 신입 AI 서비스 풀스택 개발자입니다. (주)이지닉스에서 7개월간
            B2B 사내 메신저 솔루션의 Java/Delphi 기능 수정, MySQL 정합성 점검, Linux 고객사 서버
            정기점검 및 QA·문서화 실무를 경험했습니다. 이후 Java/Spring·React·TypeScript 기반 풀스택
            역량에 Gemini API Map-Reduce 파이프라인과 AI 개발 워크플로우를 결합해 고속 구현과 정량
            검증(번들 93.5% 감축, 오프라인 멱등성 큐, 실기기 빌드 디버깅)을 병행하고 있습니다.
          </p>
        </section>

        {/* 3. 실무 경력 (Work Experience) */}
        <section className="space-y-3 print-avoid-break">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-1">
            Work Experience · 실무 경력
          </h2>
          {profileData.career.map((job, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-[15px] font-bold text-slate-900">
                    {job.company}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 ml-2">
                    {job.position} ({job.duration})
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {job.period}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                <strong className="text-slate-700">실무 환경:</strong>{" "}
                {(job.techStack || []).join(" · ")}
              </p>
              <ul className="space-y-1.5 text-[12.5px] leading-relaxed text-slate-700 list-disc pl-5">
                {job.achievements.map((ach, aIdx) => {
                  const [label, ...rest] = ach.split(":");
                  return (
                    <li key={aIdx}>
                      {rest.length > 0 ? (
                        <>
                          <strong className="text-slate-900">{label}:</strong>{" "}
                          {rest.join(":").trim()}
                        </>
                      ) : (
                        ach
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>

        {/* 4. 주요 프로젝트 (Projects) */}
        <section className="space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-1">
            Projects · 주요 프로젝트 (기획 → 개발 → 검증)
          </h2>
          <div className="space-y-4">
            {resumeProjects.map((proj, idx) => (
              <div
                key={idx}
                className="space-y-1.5 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0 print-avoid-break"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[14px] font-bold text-slate-900">
                    {proj.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-medium">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      GitHub
                    </a>
                    {proj.live && (
                      <>
                        <span className="text-slate-300">|</span>
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Live Demo
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-[11.5px] text-slate-500 font-medium">
                  {proj.meta}
                </p>
                <ul className="space-y-1 text-[12.5px] leading-relaxed text-slate-700 pl-0.5">
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0 mt-0.5">
                        {b.stage}
                      </span>
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 5. 기술 스택 (Tech Stack) */}
        <section className="space-y-2.5 print-avoid-break">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-1">
            Skills · 보유 기술 스택
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
            {profileData.skills.map((cat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1"
              >
                <div className="font-bold text-slate-900">{cat.category}</div>
                <div className="text-slate-700 leading-relaxed">
                  {cat.items.map((i) => i.name).join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 학력 · 교육 · 자격증 */}
        <section className="space-y-3 print-avoid-break">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-1">
            Education · Training · Certificate
          </h2>
          <div className="space-y-2 text-[12.5px]">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <strong className="text-slate-900">배재대학교 컴퓨터공학과</strong>{" "}
                <span className="text-slate-600">(졸업)</span>
              </div>
              <span className="text-xs text-slate-500">2020.03 ~ 2026.02</span>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <strong className="text-slate-900">정보처리기사</strong>{" "}
                <span className="text-slate-600">필기 합격 (실기 준비 중, 2026 취득 목표)</span>
              </div>
              <span className="text-xs text-slate-500">2026</span>
            </div>
            {profileData.training.map((t, idx) => (
              <div key={idx} className="flex flex-wrap justify-between gap-2">
                <div>
                  <strong className="text-slate-900">{t.title}</strong>{" "}
                  <span className="text-slate-600">
                    — {t.institution} ({t.status}
                    {t.statusNote ? ` · ${t.statusNote}` : ""})
                  </span>
                </div>
                <span className="text-xs text-slate-500 shrink-0">{t.period}</span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
