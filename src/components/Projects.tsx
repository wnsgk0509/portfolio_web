"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  ChevronRight,
  UserCheck,
  Globe,
  ShieldCheck,
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { renderInlineMarkdown } from "@/components/FormattedText";
import { sampleProjects, Project } from "@/data/projects";
import ProjectModal from "./ProjectModal";

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects = [] }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const displayProjects = projects.length > 0 ? projects : sampleProjects;

  return (
    <section id="projects" className="py-20 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3">
            Projects · Planning → Dev → Verify
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            프로젝트 경험
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mt-3">
            모든 프로젝트를{" "}
            <strong className="font-semibold text-slate-800">
              기획(문제 정의) → 개발(아키텍처·구현) → 검증(성능 실측·트러블슈팅)
            </strong>{" "}
            흐름으로 정리했습니다. 카드를 클릭하면 상세 검증 과정을 확인할 수 있습니다.
          </p>
          <div className="w-12 h-1 bg-emerald-700 rounded mt-4" />
        </div>

        {/* 프로젝트 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm hover:border-emerald-600 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-4">
                {/* 썸네일 이미지 */}
                {project.thumbnail && (
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.categoryBadge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-xs border border-white/15">
                        {project.categoryBadge}
                      </span>
                    )}
                  </div>
                )}

                {/* 상단 메타 */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 group-hover:bg-emerald-100 transition-colors">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                    {project.teamSize && (
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        {project.teamSize}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 shrink-0">
                    {project.period}
                  </span>
                </div>

                {/* 프로젝트 제목 & 한 줄 요약 */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {renderInlineMarkdown(project.title)}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {renderInlineMarkdown(project.summary)}
                  </p>
                </div>

                {/* 담당 역할 */}
                <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-slate-800 font-semibold">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>담당 역할</span>
                    </div>
                    <p className="line-clamp-2 leading-relaxed text-slate-700">
                      {renderInlineMarkdown(project.role)}
                    </p>
                  </div>
                  {project.verificationHighlights &&
                    project.verificationHighlights.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/80">
                        <div className="flex items-center gap-1.5 mb-1 text-emerald-800 font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>핵심 검증 포인트</span>
                        </div>
                        <p className="line-clamp-2 leading-relaxed text-slate-700">
                          {renderInlineMarkdown(project.verificationHighlights[0])}
                        </p>
                      </div>
                    )}
                </div>

                {/* 기술 스택 뱃지 */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 하단 액션 버튼 */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors py-1.5 px-2 rounded-lg hover:bg-slate-100"
                    >
                      <GithubIcon className="w-4 h-4 text-slate-700" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-900 transition-colors py-1.5 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>배포 사이트</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-700 hover:text-white transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <span>기획 · 개발 · 검증 상세</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 프로젝트 상세 모달 */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
