import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Project, TroubleshootingItem, FeatureGroup } from "@/data/projects";

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

      // 1. 기본 제목 추출
      const title = data.title || extractHeading(content) || id;

      // 2. 깃허브 URL 정밀 추출
      const githubUrl = data.githubUrl || extractGithubUrl(content);

      // 3. 날짜 / 진행 기간 추출
      const period = data.period || extractField(content, ["날짜", "기간", "일정", "진행 기간", "Period"]) || "진행 기간 미정";

      // 4. 팀 구성 / 역할 추출
      const teamSize = data.teamSize || extractField(content, ["팀구성", "팀 구성", "팀", "인원"]) || undefined;
      const roleSectionText = extractSection(content, ["본인 역할", "역할", "Role"]);
      const rawRole = data.role || extractField(content, ["역할", "Role"]) || (roleSectionText ? extractFirstParagraph(roleSectionText) : "풀스택 / 백엔드 개발");
      const role = rawRole.replace(/\*\*/g, "").trim();

      // 5. 기술 스택 추출
      const techStack: string[] = Array.isArray(data.techStack)
        ? data.techStack
        : (data.techStack ? [String(data.techStack)] : extractTechStack(content));

      // 6. 프로젝트 소개 본문 추출
      const description = data.description || extractSection(content, ["프로젝트 소개", "소개", "Overview"]) || extractFirstParagraph(content) || "";
      const rawSummary = data.summary || extractFirstParagraph(description) || description.slice(0, 100);
      const summary = rawSummary.replace(/\*\*/g, "").replace(/`/g, "").trim();

      // 7. 핵심 기능 계층 구조 파싱 (대분류 & 소분류)
      const featureGroups = extractHierarchicalFeatures(content);
      const flatCoreFeatures = featureGroups.length > 0 
        ? featureGroups.flatMap(g => g.items.length > 0 ? g.items : [g.title])
        : extractListSection(content, ["핵심 기능", "주요 기능"]);

      // 8. 트러블 슈팅 정밀 파싱
      const troubleshooting = extractTroubleshooting(content);

      // 9. 배운 점 및 회고 파싱
      const retrospective = extractListSection(content, ["배운점", "배운 점", "회고", "배운 점 및 회고", "배운점 및 회고"]);

      projects.push({
        id,
        title,
        period,
        summary,
        role,
        teamSize,
        techStack: techStack.length > 0 ? techStack : ["Java", "Spring", "Oracle DB"],
        githubUrl,
        liveUrl: data.liveUrl || undefined,
        description: description || summary,
        coreFeatures: flatCoreFeatures.length > 0 ? flatCoreFeatures : ["핵심 서비스 기능 구현"],
        featureGroups: featureGroups.length > 0 ? featureGroups : undefined,
        troubleshooting: troubleshooting.length > 0 ? troubleshooting : [
          {
            problem: "문제 해결 및 이슈 처리",
            solution: "로직 리팩토링 및 꼼꼼한 테스트를 통한 서비스 안정성 확보"
          }
        ],
        retrospective: retrospective.length > 0 ? retrospective : [
          "실제 서비스 개발 및 운영 관점에서의 테스트와 예외 처리 중요성을 체득했습니다."
        ]
      });
    } catch (e) {
      console.error(`Error parsing markdown project ${fileName}:`, e);
    }
  }

  // 사용자의 실제 프로젝트를 상단에 노출 (sample-project가 있다면 뒤로 정렬)
  return projects.sort((a, b) => {
    if (a.id.includes("sample")) return 1;
    if (b.id.includes("sample")) return -1;
    return 0;
  });
}

// -------------------------------------------------------------
// 정밀 파싱 헬퍼 함수들
// -------------------------------------------------------------

function extractHeading(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function extractFirstParagraph(content: string): string | null {
  const cleaned = content.replace(/^#+.*$/gm, "").trim();
  const paragraphs = cleaned.split(/\r?\n\s*\r?\n/);
  return paragraphs.length > 0 ? paragraphs[0].replace(/^[-*]\s+/gm, "").trim() : null;
}

function extractGithubUrl(content: string): string | undefined {
  // 1) 상단 메타데이터 `URL: https://github.com/...` 패턴 우선 탐색
  const urlLineMatch = content.match(/^(?:URL|Github|깃허브)\s*:\s*(https:\/\/github\.com\/[^\s\r\n]+)/im);
  if (urlLineMatch) {
    return urlLineMatch[1].trim();
  }

  // 2) 전체 본문에서 첫 번째 등장하는 github 레포지토리 URL 탐색
  const generalMatch = content.match(/https:\/\/github\.com\/([a-zA-Z0-9_\-\.\/]+)/i);
  if (generalMatch) {
    const url = generalMatch[0].trim().replace(/[\),\]]$/, "");
    return url;
  }

  return undefined;
}

function extractField(content: string, fieldNames: string[]): string | null {
  for (const name of fieldNames) {
    // 예: `날짜: 2026년 8월 20일 → 2026년 9월 8일`
    const regex = new RegExp(`^[\\t ]*[-*]?[\\t ]*(?:\\[[\\t ]*)?${name}[^\\r\\n:]*:[\\t ]*([^\\r\\n]+)`, "im");
    const match = content.match(regex);
    if (match && match[1].trim()) {
      return match[1].trim();
    }
  }
  return null;
}

function extractTechStack(content: string): string[] {
  const techLine = extractField(content, ["기술", "스택", "기술 스택", "Tech", "Tech Stack"]);
  if (!techLine) return [];
  return techLine.split(/[,/|]/).map(t => t.trim()).filter(Boolean);
}

function extractSection(content: string, sectionNames: string[]): string {
  for (const name of sectionNames) {
    // `## 섹션이름` 으로 시작하여, 다음 `## ` (레벨 2 헤더)가 나오기 전까지 캡처
    // lookahead: `(?=\r?\n##\s+[^#]|$)` -> 하위 헤더 `###`는 섹션 종료로 보지 않음!
    const regex = new RegExp(`##[\\t ]*${name}[^\\r\\n]*\\r?\\n([\\s\\S]*?)(?=\\r?\\n##[\\t ]+[^#]|$)`, "i");
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

  const lines = text.split(/\r?\n/);
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

function extractHierarchicalFeatures(content: string): FeatureGroup[] {
  const text = extractSection(content, ["핵심 기능", "주요 기능", "Core Features"]);
  if (!text) return [];

  const lines = text.split(/\r?\n/);
  const groups: FeatureGroup[] = [];
  let currentGroup: FeatureGroup | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;

    // 대분류 체크:
    // 1) `### 대분류`
    // 2) 들여쓰기 없는 `- **대분류명**` 또는 `* **대분류명**`
    const isHeader3 = line.trim().startsWith("### ");
    const isLevel1Bullet = !line.startsWith(" ") && !line.startsWith("\t") && /^[*-]\s+\*\*(.+?)\*\*/.test(line.trim());

    if (isHeader3) {
      const title = line.trim().replace(/^###\s+/, "").trim();
      currentGroup = { title, items: [] };
      groups.push(currentGroup);
    } else if (isLevel1Bullet) {
      const match = line.trim().match(/^[*-]\s+\*\*(.+?)\*\*/);
      const title = match ? match[1].trim() : line.trim().replace(/^[*-]\s+/, "");
      currentGroup = { title, items: [] };
      groups.push(currentGroup);
    } else {
      // 소분류 체크 (들여쓰기된 `- 세부 내용` 또는 `* 세부 내용`)
      const trimmed = line.trim();
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const itemText = trimmed.substring(2).trim();
        if (currentGroup) {
          currentGroup.items.push(itemText);
        } else {
          // 아직 그룹이 없으면 기본 그룹 생성
          currentGroup = { title: "기본 기능", items: [itemText] };
          groups.push(currentGroup);
        }
      }
    }
  }

  return groups;
}

function extractTroubleshooting(content: string): TroubleshootingItem[] {
  // `## 트러블 슈팅` 으로 시작하여 다음 `## ` 전까지 캡처
  const sectionText = extractSection(content, ["트러블 슈팅 및 해결", "트러블 슈팅", "트러블슈팅", "문제 해결"]);
  if (!sectionText) return [];

  const items: TroubleshootingItem[] = [];
  // `### ` 소제목 단위로 분할
  const blocks = sectionText.split(/(?=\r?\n###\s+)/);

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // 1) 제목 추출: `### 1. 동일 브라우저 내 계정 전환 시 게시글 조회수 카운팅 오류`
    const titleMatch = trimmed.match(/^###\s+(?:(?:\d+[\.\)])\s*)?([^\r\n]+)/m);
    const title = titleMatch ? titleMatch[1].trim() : undefined;

    // 2) 문제 (Problem)
    const problemMatch = trimmed.match(/[-*]?\s*\*\*(?:문제|문제 상황|Problem)\*\*\s*:\s*([^\r\n]+(?:\r?\n(?![*-]\s*\*\*)[^\r\n]+)*)/i);
    // 3) 원인 (Cause)
    const causeMatch = trimmed.match(/[-*]?\s*\*\*(?:원인|원인 분석|Cause)\*\*\s*:\s*([^\r\n]+(?:\r?\n(?![*-]\s*\*\*)[^\r\n]+)*)/i);
    // 4) 해결 (Solution)
    const solutionMatch = trimmed.match(/[-*]?\s*\*\*(?:해결|해결 방안|해결책|Solution)\*\*\s*:\s*([^\r\n]+(?:\r?\n(?![*-]\s*\*\*)[^\r\n]+)*)/i);
    // 5) 결과 (Result)
    const resultMatch = trimmed.match(/[-*]?\s*\*\*(?:결과|개선 결과|성과|Result)\*\*\s*:\s*([^\r\n]+(?:\r?\n(?![*-]\s*\*\*)[^\r\n]+)*)/i);

    if (problemMatch || solutionMatch || title) {
      items.push({
        title,
        problem: problemMatch ? problemMatch[1].trim() : (title || "문제 상황 분석"),
        cause: causeMatch ? causeMatch[1].trim() : undefined,
        solution: solutionMatch ? solutionMatch[1].trim() : "로직 검증 및 리팩토링을 통해 이슈 해결",
        result: resultMatch ? resultMatch[1].trim() : undefined,
      });
    }
  }

  return items;
}
