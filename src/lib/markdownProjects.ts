import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Project, TroubleshootingItem } from "@/data/projects";

const POSSIBLE_DIRECTORIES = [
  path.join(process.cwd(), "content", "projects"),
  path.join(process.cwd(), "contents", "projects"),
];

export function getAllMarkdownProjects(): Project[] {
  let projectsDirectory = POSSIBLE_DIRECTORIES.find(dir => fs.existsSync(dir));
  if (!projectsDirectory) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const projects: Project[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".md") || fileName.toLowerCase() === "readme.md") {
      continue;
    }

    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    try {
      const { data, content } = matter(fileContents);
      const id = fileName.replace(/\.md$/, "");

      // 1. 프론트매터 또는 본문에서 메타데이터 추출
      const title = data.title || extractHeading(content) || id;
      const period = data.period || extractField(content, "기간") || "진행 기간 미정";
      const summary = data.summary || extractFirstParagraph(content) || "";
      const role = data.role || extractField(content, "역할") || "백엔드 개발";
      const teamSize = data.teamSize || extractField(content, "팀") || undefined;
      const techStack: string[] = Array.isArray(data.techStack)
        ? data.techStack
        : (data.techStack ? [String(data.techStack)] : extractTechStack(content));
      const githubUrl = data.githubUrl || extractField(content, "GitHub") || extractField(content, "깃허브") || undefined;

      // 2. 섹션별 본문 파싱 (소개, 핵심 기능, 트러블 슈팅, 회고)
      const description = data.description || extractSection(content, ["프로젝트 소개", "소개"]) || summary;
      const coreFeatures = extractListSection(content, ["핵심 기능", "주요 기능"]);
      const troubleshooting = extractTroubleshooting(content);
      const retrospective = extractListSection(content, ["배운점", "배운 점", "회고", "배운점 및 회고"]);

      projects.push({
        id,
        title,
        period,
        summary,
        role,
        teamSize,
        techStack: techStack.length > 0 ? techStack : ["Java", "Backend"],
        githubUrl,
        liveUrl: data.liveUrl || undefined,
        description,
        coreFeatures: coreFeatures.length > 0 ? coreFeatures : ["서비스 로직 구현 및 데이터 연동"],
        troubleshooting: troubleshooting.length > 0 ? troubleshooting : [
          {
            problem: "문제 해결 및 이슈 처리",
            solution: "로직 리팩토링 및 테스트를 통한 안정성 확보"
          }
        ],
        retrospective: retrospective.length > 0 ? retrospective : [
          "지속적인 테스트와 안정적인 시스템 운영의 중요성을 체득했습니다."
        ]
      });
    } catch (e) {
      console.error(`Error parsing markdown project ${fileName}:`, e);
    }
  }

  return projects;
}

// 헬퍼 함수들
function extractHeading(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function extractFirstParagraph(content: string): string | null {
  const cleaned = content.replace(/^#+.*$/gm, "").trim();
  const paragraphs = cleaned.split(/\n\s*\n/);
  return paragraphs.length > 0 ? paragraphs[0].replace(/[-*]\s+/g, "").trim() : null;
}

function extractField(content: string, fieldName: string): string | null {
  const regex = new RegExp(`[-*]?\\s*(?:\\[\\s*)?(?:${fieldName})[^\n:]*:\\s*([^\n\r]+)`, "i");
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

function extractTechStack(content: string): string[] {
  const techLine = extractField(content, "기술") || extractField(content, "스택") || extractField(content, "Tech");
  if (!techLine) return [];
  return techLine.split(/[,/|]/).map(t => t.trim()).filter(Boolean);
}

function extractSection(content: string, sectionNames: string[]): string {
  for (const name of sectionNames) {
    const regex = new RegExp(`##+[^\\n]*${name}[^\\n]*\\n([\\s\\S]*?)(?=\\n##+|$)`, "i");
    const match = content.match(regex);
    if (match && match[1].trim()) {
      return match[1].trim();
    }
  }
  return "";
}

function extractListSection(content: string, sectionNames: string[]): string[] {
  const text = extractSection(content, sectionNames);
  if (!text) return [];

  const lines = text.split("\n");
  const results: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      results.push(trimmed.substring(2).trim());
    } else if (/^\d+\.\s+/.test(trimmed)) {
      results.push(trimmed.replace(/^\d+\.\s+/, "").trim());
    }
  }

  return results.length > 0 ? results : (text ? [text] : []);
}

function extractTroubleshooting(content: string): TroubleshootingItem[] {
  const sectionText = extractSection(content, ["트러블 슈팅", "트러블슈팅", "문제 해결"]);
  if (!sectionText) return [];

  const items: TroubleshootingItem[] = [];
  // `### 1. 제목` 형태나 각 문제 블록 나누기
  const blocks = sectionText.split(/(?=\n###|\n\*\*문제|\n-\s*\*\*문제)/);

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const problemMatch = trimmed.match(/(?:문제|Problem)[^\n:]*:\s*([^\n]+)/i);
    const causeMatch = trimmed.match(/(?:원인|Cause)[^\n:]*:\s*([^\n]+)/i);
    const solutionMatch = trimmed.match(/(?:해결|방안|Solution)[^\n:]*:\s*([^\n]+)/i);
    const resultMatch = trimmed.match(/(?:결과|성과|Result)[^\n:]*:\s*([^\n]+)/i);

    if (problemMatch || solutionMatch) {
      items.push({
        problem: problemMatch ? problemMatch[1].trim() : trimmed.split("\n")[0].replace(/^###+\s*/, "").trim(),
        cause: causeMatch ? causeMatch[1].trim() : undefined,
        solution: solutionMatch ? solutionMatch[1].trim() : "로직 검증 및 리팩토링을 통해 해결",
        result: resultMatch ? resultMatch[1].trim() : undefined
      });
    }
  }

  return items;
}
