"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { 
  X, 
  ExternalLink, 
  Calendar, 
  UserCheck, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Layers, 
  ArrowRight
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import FormattedText, { renderInlineMarkdown } from "@/components/FormattedText";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!mounted || !project) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* 중앙 정렬 래퍼 */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        {/* 모달 컨테이너 (클릭 시 닫힘 방지) */}
        <div 
          className="relative w-full max-w-4xl transform rounded-2xl bg-white border border-slate-200 text-left shadow-2xl transition-all z-10 text-slate-800 my-6 sm:my-8 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 상단 헤더 바 */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                프로젝트 상세
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {renderInlineMarkdown(project.title)}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 모달 본문 콘텐츠 */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[calc(85vh-130px)] overflow-y-auto">
            {/* 1. 메타 정보 (기간, 역할, 인원, 링크) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200 text-sm">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-slate-500">진행 기간:</span>
                  <span className="font-semibold text-slate-800">{project.period}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-slate-500">팀 규모:</span>
                  <span className="font-semibold text-slate-800">{project.teamSize || "협업"}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-slate-600">
                  <UserCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500">담당 역할: </span>
                    <span className="font-semibold text-slate-800">{renderInlineMarkdown(project.role)}</span>
                  </div>
                </div>

                {project.githubUrl && (
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-xs"
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
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-700" />
                사용 기술 스택
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. 프로젝트 소개 (줄바꿈 및 마크다운 포맷 지원) */}
            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900">📌 프로젝트 소개</h4>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-xs">
                <FormattedText content={project.description} />
              </div>
            </div>

            {/* 3-1. 담당 역할 및 상세 기여 */}
            {project.roleDetails && project.roleDetails.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>🎯 담당 역할 및 상세 기여</span>
                  <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    {project.roleDetails.length}개 주요 기여 항목
                  </span>
                </h4>
                <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {project.roleDetails.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                        <span className="flex-1">{renderInlineMarkdown(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 4. 핵심 기능 (대분류 & 소분류 계층형 지원) */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>⚡ 핵심 기능</span>
                {project.featureGroups && (
                  <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    대분류 {project.featureGroups.length}개 영역
                  </span>
                )}
              </h4>

              {project.featureGroups && project.featureGroups.length > 0 ? (
                <div className="grid grid-cols-1 gap-3.5">
                  {project.featureGroups.map((group, groupIdx) => (
                    <div
                      key={groupIdx}
                      className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5"
                    >
                      <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-emerald-800">
                        <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                        <h5>{renderInlineMarkdown(group.title)}</h5>
                      </div>
                      {group.items.length > 0 && (
                        <ul className="pl-6 space-y-1.5 list-disc list-outside text-xs sm:text-sm text-slate-600">
                          {group.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="leading-relaxed">
                              {renderInlineMarkdown(item)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5">
                  {project.coreFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                      <span>{renderInlineMarkdown(feature)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 5. 트러블 슈팅 및 해결방안 (가장 중요한 하이라이트) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  💡 트러블 슈팅 및 문제 해결 과정
                </h4>
              </div>

              <div className="space-y-4">
                {project.troubleshooting.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white border border-slate-200 space-y-3.5 shadow-xs"
                  >
                    {/* 트러블슈팅 제목 */}
                    {item.title && (
                      <div className="pb-2.5 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Issue #{idx + 1}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-slate-900">
                          {renderInlineMarkdown(item.title)}
                        </span>
                      </div>
                    )}

                    {/* 문제 상황 */}
                    <div className="space-y-1 p-3 rounded-lg bg-rose-50/50 border-l-3 border-rose-500">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                        Problem (문제 상황)
                      </span>
                      <p className="text-sm text-slate-800 leading-relaxed font-medium">
                        {renderInlineMarkdown(item.problem)}
                      </p>
                    </div>

                    {/* 원인 분석 */}
                    {item.cause && (
                      <div className="space-y-1 p-3 rounded-lg bg-amber-50/50 border-l-3 border-amber-500">
                        <span className="text-xs font-semibold text-amber-800">
                          Cause (원인 분석)
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {renderInlineMarkdown(item.cause)}
                        </p>
                      </div>
                    )}

                    {/* 해결 방안 */}
                    <div className="space-y-1 p-3 rounded-lg bg-emerald-50/50 border-l-3 border-emerald-600">
                      <span className="text-xs font-semibold text-emerald-800">
                        Solution (해결 방안)
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {renderInlineMarkdown(item.solution)}
                      </p>
                    </div>

                    {/* 결과 */}
                    {item.result && (
                      <div className="space-y-1 p-3 rounded-lg bg-teal-50 border-l-3 border-teal-600">
                        <span className="text-xs font-semibold text-teal-800">
                          Result (개선 결과)
                        </span>
                        <p className="text-xs sm:text-sm text-teal-900 font-semibold leading-relaxed">
                          {renderInlineMarkdown(item.result)}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 6. 배운 점 및 회고 */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-slate-900">📝 배운 점 및 회고</h4>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                {project.retrospective.map((retro, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <ArrowRight className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{renderInlineMarkdown(retro)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 모달 하단 닫기 바 */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
