"use client";

import React, { useEffect } from "react";
import { 
  X, 
  ExternalLink, 
  Calendar, 
  UserCheck, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  Layers, 
  ArrowRight
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* 백드롭 오버레이 */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* 모달 컨테이너 */}
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 text-slate-200">
        {/* 상단 헤더 바 */}
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              프로젝트 상세
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 모달 본문 콘텐츠 */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* 1. 메타 정보 (기간, 역할, 인원, 링크) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-400">진행 기간:</span>
                <span className="font-medium text-white">{project.period}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-slate-400">팀 규모:</span>
                <span className="font-medium text-white">{project.teamSize || "개인 프로젝트"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 text-slate-300">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400">담당 역할: </span>
                  <span className="font-medium text-white">{project.role}</span>
                </div>
              </div>

              {project.githubUrl && (
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub 레포지토리 바로가기</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* 2. 기술 스택 태그 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-400" />
              사용 기술 스택
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 border border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 3. 프로젝트 소개 */}
          <div className="space-y-2">
            <h4 className="text-base font-bold text-white">📌 프로젝트 소개</h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800/80">
              {project.description}
            </p>
          </div>

          {/* 4. 핵심 기능 */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white">⚡ 핵심 기능</h4>
            <div className="grid grid-cols-1 gap-2.5">
              {project.coreFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/70 text-sm text-slate-200"
                >
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. 트러블 슈팅 및 해결방안 (가장 중요한 하이라이트) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <h4 className="text-base font-bold text-white">
                💡 트러블 슈팅 및 문제 해결 과정
              </h4>
            </div>

            <div className="space-y-4">
              {project.troubleshooting.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 shadow-inner"
                >
                  {/* 문제 상황 */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      Problem (문제 상황)
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {item.problem}
                    </p>
                  </div>

                  {/* 원인 분석 */}
                  {item.cause && (
                    <div className="space-y-1 pl-3 border-l-2 border-amber-500/40">
                      <span className="text-xs font-semibold text-amber-300">
                        Cause (원인 분석)
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300">
                        {item.cause}
                      </p>
                    </div>
                  )}

                  {/* 해결 방안 */}
                  <div className="space-y-1 pl-3 border-l-2 border-blue-500">
                    <span className="text-xs font-semibold text-blue-400">
                      Solution (해결 방안)
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200">
                      {item.solution}
                    </p>
                  </div>

                  {/* 결과 */}
                  {item.result && (
                    <div className="space-y-1 pl-3 border-l-2 border-emerald-500 bg-emerald-950/20 p-2.5 rounded-r-lg">
                      <span className="text-xs font-semibold text-emerald-400">
                        Result (개선 결과)
                      </span>
                      <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                        {item.result}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 6. 배운 점 및 회고 */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white">📝 배운 점 및 회고</h4>
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
              {project.retrospective.map((retro, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <ArrowRight className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span>{retro}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 모달 하단 닫기 바 */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
