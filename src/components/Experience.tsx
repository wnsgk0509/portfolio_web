import React from "react";
import { 
  Building2, 
  GraduationCap, 
  Award, 
  Calendar, 
  Check
} from "lucide-react";
import { profileData } from "@/data/profile";

export default function Experience() {
  return (
    <section id="experience" className="py-20 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3">
            Career & Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            경력 · 학력 · 자격증
          </h2>
          <div className="w-12 h-1 bg-emerald-700 rounded mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 1. 실무 경력 (Career) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5 text-lg font-bold text-slate-900">
              <span className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Building2 className="w-5 h-5" />
              </span>
              <span>실무 경력 (Work Experience)</span>
            </div>

            {profileData.career.map((job, idx) => (
              <div
                key={idx}
                className="relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4 hover:border-emerald-600 transition-all"
              >
                {/* 상단 메타 */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        {job.company}
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {job.duration}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 mt-1">
                      {job.position} · {job.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{job.period}</span>
                  </div>
                </div>

                {/* 주요 업무 및 성과 목록 */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    주요 담당 업무 및 성과
                  </h4>
                  <ul className="space-y-2.5">
                    {job.achievements.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* 2. 학력 & 자격증 (Education & Certificate) */}
          <div className="space-y-8">
            {/* 학력 카드 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-lg font-bold text-slate-900">
                <span className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <span>학력 (Education)</span>
              </div>

              {profileData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 hover:border-emerald-600 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">
                      {edu.institution}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {edu.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    {edu.major}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 자격증 카드 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-lg font-bold text-slate-900">
                <span className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <Award className="w-5 h-5" />
                </span>
                <span>자격증 (Certificate)</span>
              </div>

              {profileData.certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 hover:border-emerald-600 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">
                      {cert.name}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {cert.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>취득 목표/예정: {cert.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
