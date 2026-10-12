"use client";

import React from "react";
import { Mail, Phone, ArrowUp, Terminal } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { profileData } from "@/data/profile";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="border-t border-slate-800 bg-slate-900 py-16 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-800">
          {/* 좌측: 개발자 타이틀 */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-lg">
              <span className="p-1 rounded bg-emerald-900/50 text-emerald-400 border border-emerald-700/40">
                <Terminal className="w-5 h-5" />
              </span>
              <span>신입 개발자 {profileData.name}</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              신뢰할 수 있는 백엔드 엔지니어링과 꼼꼼한 테스트로 서비스 안정성에 기여하겠습니다.
            </p>
          </div>

          {/* 중앙/우측: 연락처 바로가기 */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a
              href={`mailto:${profileData.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>{profileData.email}</span>
            </a>
            <a
              href={`tel:${profileData.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{profileData.phone}</span>
            </a>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-slate-400" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* 카피라이트 및 상단 이동 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>맨 위로 이동</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
