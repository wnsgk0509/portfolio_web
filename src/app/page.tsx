import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { getAllMarkdownProjects } from "@/lib/markdownProjects";

export default function Home() {
  const markdownProjects = getAllMarkdownProjects();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 헤더 네비게이션 */}
      <Header />

      {/* 메인 섹션들 */}
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects projects={markdownProjects} />
      </main>

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
}
