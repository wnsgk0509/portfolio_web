import React from "react";
import { 
  Server, 
  Layout, 
  Database, 
  Wrench, 
  Code2, 
  Cpu, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { profileData } from "@/data/profile";

export default function Skills() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Backend":
        return <Server className="w-5 h-5 text-blue-400" />;
      case "Frontend":
        return <Layout className="w-5 h-5 text-indigo-400" />;
      case "Database":
        return <Database className="w-5 h-5 text-emerald-400" />;
      case "DevOps & Tools":
        return <Wrench className="w-5 h-5 text-amber-400" />;
      default:
        return <Code2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 border-t border-slate-800/60 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-3">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            보유 기술 스택
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mt-3">
            실무 유지보수 및 풀스택 과정을 통해 직접 설계하고 운영해 본 기술들입니다.
          </p>
          <div className="w-12 h-1 bg-blue-500 rounded mt-4" />
        </div>

        {/* 카테고리별 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileData.skills.map((cat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-800">
                  <div className="p-2 rounded-xl bg-slate-800/80">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {cat.category === "Backend" && "서버 아키텍처 및 데이터 처리"}
                      {cat.category === "Frontend" && "반응형 웹 UI 및 사용자 경험 연동"}
                      {cat.category === "Database" && "데이터 모델링 및 쿼리 최적화"}
                      {cat.category === "DevOps & Tools" && "형상 관리 및 개발 생산성 도구"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {cat.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 hover:border-slate-700/80 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-slate-100 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                          {item.name}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-slate-400 pl-5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 기술 스택 추가 안내 팁 박스 */}
        <div className="mt-8 p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 text-center text-xs text-slate-300">
          💡 노션의 <strong>SKILL</strong> 페이지에 있는 세부 기술 스택(Spring Boot, Docker, AWS 등)도 언제든지 자유롭게 추가/업데이트할 수 있도록 모듈화되어 있습니다.
        </div>
      </div>
    </section>
  );
}
