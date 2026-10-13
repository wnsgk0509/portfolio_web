"use client";

import React, { useState, useEffect } from "react";
import { Mail, Menu, X, Terminal } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { profileData } from "@/data/profile";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "소개", href: "#about" },
    { name: "경력 · 학력", href: "#experience" },
    { name: "기술 스택", href: "#skills" },
    { name: "프로젝트", href: "#projects" },
    { name: "연락처", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-slate-900 group"
        >
          <span className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 group-hover:bg-emerald-100 transition-colors">
            <Terminal className="w-5 h-5" />
          </span>
          <span>
            {profileData.name}
            <span className="text-emerald-800 font-semibold ml-1.5 text-xs bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Full-Stack Developer
            </span>
          </span>
        </a>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* 데스크톱 우측 액션 */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="GitHub 방문"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${profileData.email}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>이메일 문의</span>
          </a>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-1 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3">
            <a
              href={`mailto:${profileData.email}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>{profileData.email}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
