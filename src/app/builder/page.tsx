"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  FolderGit2, 
  Star, 
  GitFork, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  Save, 
  ArrowLeft,
  Key,
  Globe,
  Loader2,
  Calendar,
  Layers,
  Wrench,
  BookOpen
} from "lucide-react";
import { Project } from "@/data/projects";

interface RepoItem {
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  homepage: string | null;
  fork: boolean;
}

export default function BuilderPage() {
  const [username, setUsername] = useState("wnsgk0509");
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 생성 상태
  const [generatingRepo, setGeneratingRepo] = useState<string | null>(null);
  const [resultProject, setResultProject] = useState<Project | null>(null);
  const [resultMarkdown, setResultMarkdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "markdown">("preview");
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // 레포지토리 목록 불러오기
  const handleFetchRepos = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!username.trim()) return;

    setLoadingRepos(true);
    setError(null);
    try {
      const res = await fetch(`/api/repos?username=${encodeURIComponent(username.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "레포지토리 목록을 불러오지 못했습니다.");
      setRepos(data.repos);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingRepos(false);
    }
  };

  // AI 생성 요청
  const handleGenerate = async (repo: RepoItem) => {
    setGeneratingRepo(repo.name);
    setError(null);
    setResultProject(null);
    setResultMarkdown(null);
    setSavedSuccess(false);

    try {
      const [owner, repoName] = repo.fullName.split("/");
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner,
          repo: repoName,
          author: username,
          apiKey: apiKey.trim() || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "포트폴리오 생성에 실패했습니다.");

      setResultProject(data.project);
      setResultMarkdown(data.markdown);
      setActiveTab("preview");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGeneratingRepo(null);
    }
  };

  // 마크다운 클립보드 복사
  const handleCopyMarkdown = () => {
    if (!resultMarkdown) return;
    navigator.clipboard.writeText(resultMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // .md 파일 다운로드
  const handleDownloadMarkdown = () => {
    if (!resultMarkdown || !resultProject) return;
    const blob = new Blob([resultMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resultProject.title || resultProject.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 내 포트폴리오에 자동 저장
  const handleSaveToPortfolio = async () => {
    if (!resultMarkdown || !resultProject) return;
    try {
      const res = await fetch("/api/save-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: `${resultProject.title || resultProject.id}.md`,
          markdown: resultMarkdown
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "저장에 실패했습니다.");
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(`저장 실패: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      {/* 상단 네비게이션 헤더 */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>내 포트폴리오 웹으로 돌아가기</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
              AI Portfolio Builder MVP
            </span>
          </div>
        </div>
      </header>

      {/* 메인 히어로 배너 */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            깃허브 레포로 <span className="text-emerald-700">10초 만에 포트폴리오</span> 자동 완성
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            GitHub 아이디를 입력하고 프로젝트를 선택하세요. AI가 실제 커밋 내역과 작업 코드를 분석하여
            트러블 슈팅, 핵심 기능, 배운 점까지 완벽한 규격으로 정리해 드립니다.
          </p>

          {/* GitHub 유저 검색 폼 */}
          <form onSubmit={handleFetchRepos} className="pt-4 max-w-xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="GitHub 아이디 입력 (예: wnsgk0509)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-sm shadow-xs"
              />
            </div>
            <button
              type="submit"
              disabled={loadingRepos}
              className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-all shadow-xs disabled:opacity-50 flex items-center gap-2 shrink-0 cursor-pointer"
            >
              {loadingRepos ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderGit2 className="w-4 h-4" />}
              <span>저장소 불러오기</span>
            </button>
          </form>

          {/* Gemini API Key 설정 토글 */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="text-xs text-slate-500 hover:text-emerald-700 inline-flex items-center gap-1 underline underline-offset-4 cursor-pointer"
            >
              <Key className="w-3 h-3" />
              <span>{showKeyInput ? "API 설정 닫기" : "Gemini API 키 직접 입력하기 (선택)"}</span>
            </button>
            {showKeyInput && (
              <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-left max-w-md mx-auto">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google AI Studio Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy... (미입력 시 스마트 룰 기반으로 생성)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-emerald-600"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  * API 키를 넣으면 Gemini-2.5-Flash가 정밀 심층 분석을 수행합니다. (무료 키 발급 가능)
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 에러 메시지 알림 */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        </div>
      )}

      {/* 결과 생성 미리보기 & 마크다운 패널 */}
      {resultProject && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-white rounded-2xl border-2 border-emerald-600 shadow-xl overflow-hidden">
            {/* 결과 패널 헤더 바 */}
            <div className="bg-emerald-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-300" />
                <h3 className="font-bold text-lg">AI 포트폴리오 생성 결과</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${activeTab === "preview" ? "bg-white text-emerald-900" : "bg-emerald-800 text-emerald-100 hover:bg-emerald-700"}`}
                >
                  웹 프리뷰
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("markdown")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${activeTab === "markdown" ? "bg-white text-emerald-900" : "bg-emerald-800 text-emerald-100 hover:bg-emerald-700"}`}
                >
                  마크다운 (.md)
                </button>
              </div>
            </div>

            {/* 결과 본문 콘텐츠 */}
            <div className="p-6 sm:p-8">
              {activeTab === "preview" ? (
                <div className="space-y-6">
                  {/* 스크린샷 썸네일 */}
                  {resultProject.thumbnail && (
                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 max-h-72">
                      <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                        <span>실제 배포 화면 자동 캡처</span>
                        {resultProject.liveUrl && (
                          <a href={resultProject.liveUrl} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">
                            사이트 바로가기 &rarr;
                          </a>
                        )}
                      </div>
                      <img src={resultProject.thumbnail} alt={resultProject.title} className="w-full h-auto object-cover object-top" />
                    </div>
                  )}

                  {/* 메타 정보 카드 */}
                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="text-2xl font-bold text-slate-900">{resultProject.title}</h2>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                        {resultProject.period}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{resultProject.summary}</p>
                    
                    <div className="pt-2 flex flex-wrap gap-2 text-xs">
                      <span className="font-semibold text-slate-700">담당 역할:</span>
                      <span className="text-slate-600">{resultProject.role}</span>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {resultProject.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 핵심 기능 목록 */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-700" />
                      핵심 구현 기능
                    </h4>
                    <ul className="space-y-1.5 text-sm text-slate-700">
                      {resultProject.coreFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 트러블 슈팅 */}
                  {resultProject.troubleshooting && resultProject.troubleshooting.length > 0 && (
                    <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-3">
                      <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
                        <Wrench className="w-4 h-4 text-amber-700" />
                        트러블 슈팅 및 해결
                      </h4>
                      {resultProject.troubleshooting.map((t, i) => (
                        <div key={i} className="space-y-1.5 text-xs text-slate-700 bg-white p-4 rounded-lg border border-amber-200/60 shadow-2xs">
                          <p className="font-semibold text-slate-900 text-sm">{t.problem}</p>
                          {t.cause && <p><strong className="text-slate-600">원인:</strong> {t.cause}</p>}
                          <p><strong className="text-emerald-700">해결:</strong> {t.solution}</p>
                          {t.result && <p><strong className="text-blue-700">결과:</strong> {t.result}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 배운 점 및 회고 */}
                  {resultProject.retrospective && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-emerald-700" />
                        배운 점 및 회고
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {resultProject.retrospective.map((r, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">-</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                /* 마크다운 코드 뷰 */
                <div className="relative">
                  <pre className="bg-slate-900 text-slate-100 p-5 rounded-xl text-xs overflow-x-auto font-mono max-h-96">
                    {resultMarkdown}
                  </pre>
                </div>
              )}

              {/* 하단 내보내기 액션 버튼 바 */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyMarkdown}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "복사 완료!" : "마크다운 복사"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadMarkdown}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>.md 파일 다운로드</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSaveToPortfolio}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-sm cursor-pointer"
                >
                  {savedSuccess ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
                  <span>{savedSuccess ? "내 포트폴리오에 저장 완료!" : "내 웹 포트폴리오에 즉시 추가"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 레포지토리 카드 그리드 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-emerald-700" />
            <span>분석 가능한 저장소 목록</span>
            {repos.length > 0 && <span className="text-xs font-normal text-slate-500">({repos.length}개)</span>}
          </h2>
        </div>

        {repos.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
            <FolderGit2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">상단의 [저장소 불러오기] 버튼을 눌러주세요.</p>
            <p className="text-xs text-slate-400 mt-1">공개 레포지토리 목록을 가져와 원클릭으로 분석할 수 있습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <div
                key={repo.name}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-600 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base text-slate-900 hover:text-emerald-700 transition-colors line-clamp-1">
                      {repo.name}
                    </h3>
                    {repo.fork && (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                        Forked
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 min-h-[32px]">
                    {repo.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                    {repo.language && (
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500" />
                      {repo.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-slate-400" />
                      {repo.forks}
                    </span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    disabled={generatingRepo === repo.name}
                    onClick={() => handleGenerate(repo)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-700 hover:text-white transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
                  >
                    {generatingRepo === repo.name ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>AI 분석 중...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                        <span>포트폴리오 생성</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
