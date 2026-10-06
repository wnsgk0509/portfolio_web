import React from "react";
import { 
  ShieldCheck, 
  Headphones, 
  Layers, 
  Users, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  CheckCircle2
} from "lucide-react";
import { profileData } from "@/data/profile";

export default function About() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-blue-400" />;
      case "Headphones":
        return <Headphones className="w-6 h-6 text-emerald-400" />;
      case "Layers":
        return <Layers className="w-6 h-6 text-indigo-400" />;
      case "Users":
        return <Users className="w-6 h-6 text-purple-400" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="about" className="py-20 border-t border-slate-800/60 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-3">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            자기소개 & 핵심 역량
          </h2>
          <div className="w-12 h-1 bg-blue-500 rounded mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* 좌측: 인적사항 프로필 카드 (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" />
                인적사항 (Profile)
              </h3>
              <p className="text-xs text-slate-400 mt-1">기본 정보 및 연락처</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start justify-between">
                <span className="text-slate-400">성명</span>
                <span className="font-semibold text-slate-200">{profileData.name}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-400">구분</span>
                <span className="font-medium text-blue-400 text-right">{profileData.experience}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> 이메일
                </span>
                <a 
                  href={`mailto:${profileData.email}`} 
                  className="font-medium text-slate-200 hover:text-blue-400 transition-colors text-right break-all"
                >
                  {profileData.email}
                </a>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> 연락처
                </span>
                <a 
                  href={`tel:${profileData.phone}`} 
                  className="font-medium text-slate-200 hover:text-blue-400 transition-colors text-right"
                >
                  {profileData.phone}
                </a>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> 희망 직무
                </span>
                <span className="font-medium text-slate-200 text-right">백엔드 / 서버 개발자</span>
              </div>
            </div>

            {/* GitHub 배너 */}
            <div className="pt-2">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors border border-slate-700"
              >
                <span>GitHub: wnsgk0509</span>
              </a>
            </div>
          </div>

          {/* 우측: 자기소개 본문 & 핵심 강점 카드 (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 자기소개 텍스트 블록 */}
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                "{profileData.bioHeadline}"
              </h3>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                {profileData.bioParagraphs.map((para, idx) => (
                  <p key={idx} className="text-justify">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* 실무 기반 4대 강점 카드 */}
            <div>
              <h4 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
                <span>핵심 실무 역량 키워드</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileData.strengths.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-800 group-hover:scale-105 transition-transform">
                        {getIcon(item.icon)}
                      </div>
                      <h5 className="font-semibold text-slate-100 text-sm sm:text-base">
                        {item.title}
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
