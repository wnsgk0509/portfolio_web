"use client";

import React, { useState } from "react";
import { 
  FolderGit2, 
  ChevronRight, 
  FileText,
  FolderOpen
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { sampleProjects, Project } from "@/data/projects";
import ProjectModal from "./ProjectModal";

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects = [] }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const displayProjects = projects.length > 0 ? projects : sampleProjects;

  return (
    <section id="projects" className="py-20 border-t border-slate-800/60 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-3">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            프로젝트 경험
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mt-3">
            실제 서비스의 트러블 슈팅과 문제 해결, 아키텍처 개선에 집중한 프로젝트 목록입니다.
          </p>
          <div className="w-12 h-1 bg-blue-500 rounded mt-4" />
        </div>

        {/* 연동 상태 배너 */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-900/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-xl bg-blue-600/20 text-blue-400 shrink-0 mt-0.5 sm:mt-0">
              <FolderOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">
                  Markdown 자동 연동 시스템 가동 중
                </h4>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {displayProjects.length}개 프로젝트 로드됨
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                노션에서 내보낸 <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">.md</code> 파일을 프로젝트 폴더의 <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300">content/projects/</code> 안에 넣으면 자동으로 이 목록에 반영됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 프로젝트 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 상단 메타 */}
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-600/20 transition-colors">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700/60">
                    {project.period}
                  </span>
                </div>

                {/* 프로젝트 제목 & 한 줄 요약 */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                {/* 담당 역할 */}
                <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <strong className="text-slate-300 block mb-0.5">역할 & 기여:</strong>
                  {project.role}
                </div>

                {/* 기술 스택 뱃지 */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 하단 액션 버튼 */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <div />
                )}

                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all group-hover:shadow-md"
                >
                  <span>트러블 슈팅 & 상세 보기</span>
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
