import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Project, TroubleshootingItem, FeatureGroup } from "@/data/projects";

const POSSIBLE_DIRECTORIES = [
  path.join(process.cwd(), "content", "projects"),
  path.join(process.cwd(), "contents", "projects"),
];

export function getAllMarkdownProjects(): Project[] {
  const projectsDirectory = POSSIBLE_DIRECTORIES.find((dir) =>
    fs.existsSync(dir)
  );
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
    if (!fs.statSync(fullPath).isFile()) {
      continue;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");

    try {
      const { data, content } = matter(fileContents);
      if (data.published === false) {
        continue;
      }
      const id = fileName.replace(/\.md$/, "");

      // 1. 기본 제목 추출
      const title = data.title || extractHeading(content) || id;

      // 2. 깃허브 URL 정밀 추출
      const githubUrl = data.githubUrl || extractGithubUrl(content);

      // 3. 날짜 / 진행 기간 추출
      const period =
        data.period ||
        extractField(content, ["날짜", "기간", "일정", "진행 기간", "Period"]) ||
        "진행 기간 미정";

      // 4. 팀 구성 / 역할 추출
      const teamSize =
        data.teamSize ||
        extractField(content, ["팀구성", "팀 구성", "팀", "인원"]) ||
        undefined;
      const roleSectionText = extractSection(content, [
        "본인 역할",
        "역할",
        "Role",
        "담당 역할",
      ]);
      const roleFromMeta =
        data.role ||
        extractField(content, ["역할", "Role", "담당 역할", "담당역할"]);
      const roleFromLead = roleSectionText
        ? extractFirstParagraph(roleSectionText)
        : null;
      const rawRole = roleFromMeta || roleFromLead || "풀스택 개발";
      const role = rawRole.replace(/\*\*/g, "").replace(/`/g, "").trim();
      const roleDetails = extractListSection(content, [
        "본인 역할",
        "담당 역할",
        "역할",
        "Role",
      ]);

      // 5. 기술 스택 추출
      const techStack: string[] = Array.isArray(data.techStack)
        ? data.techStack
        : data.techStack
          ? [String(data.techStack)]
          : extractTechStack(content);

      // 6. 프로젝트 소개 및 기획/검증 본문 추출
      const description =
        data.description ||
        extractSection(content, [
          "프로젝트 소개",
          "기획 및 문제 정의",
          "소개",
          "Overview",
        ]) ||
        extractFirstParagraph(content) ||
        "";
      const planning =
        data.planning ||
        extractSection(content, ["기획 및 문제 정의", "기획 배경", "Planning"]) ||
        undefined;
      const verificationHighlights = Array.isArray(data.verificationHighlights)
        ? data.verificationHighlights.map(String)
        : extractListSection(content, [
            "기술 검증 요약",
            "검증 및 성과",
            "Verification",
          ]);

      const rawSummary =
        data.summary ||
        extractFirstParagraph(description) ||
        description.slice(0, 120);
      const summary = rawSummary.replace(/\*\*/g, "").replace(/`/g, "").trim();

      // 7. 핵심 기능 계층 구조 파싱 (대분류 & 소분류)
      const featureGroups = extractHierarchicalFeatures(content);
      const flatCoreFeatures =
        featureGroups.length > 0
          ? featureGroups.flatMap((g) =>
              g.items.length > 0 ? g.items : [g.title]
            )
          : extractListSection(content, ["핵심 기능", "주요 기능"]);

      // 8. 트러블 슈팅 정밀 파싱
      const troubleshooting = extractTroubleshooting(content);

      // 9. 배운 점 및 회고 파싱
      const retrospective = extractListSection(content, [
        "배운점",
        "배운 점",
        "회고",
        "배운 점 및 회고",
        "배운점 및 회고",
      ]);

      // 썸네일 이미지 자동 매핑
      let thumbnail = data.thumbnail || data.image || undefined;
      if (!thumbnail) {
        const lowerId = id.toLowerCase();
        const lowerTitle = title.toLowerCase();
        if (lowerId.includes("provit") || lowerTitle.includes("provit")) {
          thumbnail = "/projects/provit.png";
        } else if (
          lowerId.includes("gitfolio") ||
          lowerTitle.includes("gitfolio") ||
          lowerTitle.includes("포트폴리오")
        ) {
          thumbnail = "/projects/gitfolio.png";
        } else if (
          lowerId.includes("jamkkan") ||
          lowerTitle.includes("jamkkan") ||
          lowerTitle.includes("잠깐")
        ) {
          thumbnail = "/projects/jamkkan.png";
        } else if (
          lowerId.includes("1lev") ||
          lowerTitle.includes("1lev") ||
          lowerTitle.includes("루틴")
        ) {
          thumbnail = "/projects/1lev_up.png";
        }
      }

      projects.push({
        id,
        title,
        period,
        summary,
        categoryBadge: data.categoryBadge ? String(data.categoryBadge) : undefined,
        role,
        roleDetails: roleDetails.length > 0 ? roleDetails : undefined,
        teamSize,
        techStack:
          techStack.length > 0 ? techStack : ["Java", "Spring", "React"],
        githubUrl,
        liveUrl: extractLiveUrl(content, data.liveUrl),
        description: description || summary,
        planning,
        verificationHighlights:
          verificationHighlights.length > 0
            ? verificationHighlights
            : undefined,
        coreFeatures:
          flatCoreFeatures.length > 0
            ? flatCoreFeatures
            : ["핵심 서비스 기능 구현"],
        featureGroups: featureGroups.length > 0 ? featureGroups : undefined,
        troubleshooting:
          troubleshooting.length > 0
            ? troubleshooting
            : [
                {
                  problem: "문제 해결 및 이슈 처리",
                  solution:
                    "로직 리팩토링 및 꼼꼼한 테스트를 통한 서비스 안정성 확보",
                },
              ],
        retrospective:
          retrospective.length > 0
            ? retrospective
            : [
                "실제 서비스 개발 및 운영 관점에서의 테스트와 예외 처리 중요성을 체득했습니다.",
              ],
        published: data.published !== false,
        order: data.order !== undefined ? Number(data.order) : 999,
        thumbnail: thumbnail || undefined,
      });
    } catch (e) {
      console.error(`Error parsing markdown project ${fileName}:`, e);
    }
  }

  // frontmatter의 order 오름차순으로 정렬 (sample은 항상 맨 뒤)
  return projects.sort((a, b) => {
    if (a.id.includes("sample")) return 1;
    if (b.id.includes("sample")) return -1;
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title, "ko");
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
  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (
      trimmed &&
      !trimmed.startsWith("- ") &&
      !trimmed.startsWith("* ") &&
      !/^\d+\.\s+/.test(trimmed)
    ) {
      return trimmed.replace(/\*\*/g, "").replace(/`/g, "").trim();
    }
  }
  return paragraphs.length > 0
    ? paragraphs[0].replace(/^[-*]\s+/gm, "").replace(/\*\*/g, "").trim()
    : null;
}

function extractGithubUrl(content: string): string | undefined {
  const urlLineMatch = content.match(
    /^(?:URL|Github|깃허브)\s*:\s*(https:\/\/github\.com\/[^\s\r\n]+)/im
  );
  if (urlLineMatch) {
    return urlLineMatch[1].trim();
  }

  const generalMatch = content.match(
    /https:\/\/github\.com\/([a-zA-Z0-9_\-\.\/]+)/i
  );
  if (generalMatch) {
    return generalMatch[0].trim().replace(/[\),\]]$/, "");
  }

  return undefined;
}

function extractField(content: string, fieldNames: string[]): string | null {
  for (const name of fieldNames) {
    const regex = new RegExp(
      `^[\\t ]*[-*]?[\\t ]*(?:\\[[\\t ]*)?${name}[^\\r\\n:]*:[\\t ]*([^\\r\\n]+)`,
      "im"
    );
    const match = content.match(regex);
    if (match && match[1].trim()) {
      return match[1].trim();
    }
  }
  return null;
}

function extractTechStack(content: string): string[] {
  const techLine = extractField(content, [
    "기술",
    "스택",
    "기술 스택",
    "Tech",
    "Tech Stack",
  ]);
  if (!techLine) return [];
  return techLine
    .split(/[,/|]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function extractSection(content: string, sectionNames: string[]): string {
  for (const name of sectionNames) {
    const regex = new RegExp(
      `##[\\t ]*${name}[^\\r\\n]*\\r?\\n([\\s\\S]*?)(?=\\r?\\n##[\\t ]+[^#]|$)`,
      "i"
    );
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

  return results.length > 0 ? results : text ? [text] : [];
}

function extractHierarchicalFeatures(content: string): FeatureGroup[] {
  const text = extractSection(content, ["핵심 기능", "주요 기능", "Core Features"]);
  if (!text) return [];

  const lines = text.split(/\r?\n/);
  const groups: FeatureGroup[] = [];
  let currentGroup: FeatureGroup | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;

    const isHeader3 = line.trim().startsWith("### ");
    const isLevel1Bullet =
      !line.startsWith(" ") &&
      !line.startsWith("\t") &&
      /^[*-]\s+\*\*(.+?)\*\*/.test(line.trim());

    if (isHeader3) {
      const title = line.trim().replace(/^###\s+/, "").trim();
      currentGroup = { title, items: [] };
      groups.push(currentGroup);
    } else if (isLevel1Bullet) {
      // `- **대분류**: 인라인 설명` 형태인 경우 인라인 설명까지 items에 보존
      const match = line.trim().match(/^[*-]\s+\*\*(.+?)\*\*\s*:?\s*(.*)$/);
      const title = match
        ? match[1].trim()
        : line.trim().replace(/^[*-]\s+/, "");
      const inlineDesc = match && match[2] ? match[2].trim() : "";
      currentGroup = {
        title,
        items: inlineDesc ? [inlineDesc] : [],
      };
      groups.push(currentGroup);
    } else {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const itemText = trimmed.substring(2).trim();
        if (currentGroup) {
          currentGroup.items.push(itemText);
        } else {
          currentGroup = { title: "기본 기능", items: [itemText] };
          groups.push(currentGroup);
        }
      }
    }
  }

  return groups;
}

function extractTroubleshooting(content: string): TroubleshootingItem[] {
  const sectionText = extractSection(content, [
    "트러블 슈팅 및 해결",
    "기술 검증 및 트러블 슈팅",
    "트러블 슈팅",
    "트러블슈팅",
    "문제 해결",
  ]);
  if (!sectionText) return [];

  const items: TroubleshootingItem[] = [];

  if (/###\s+/m.test(sectionText)) {
    const blocks = sectionText.split(/(?=\r?\n###\s+)/);

    for (const block of blocks) {
      const trimmed = block.trim();
      if (!trimmed) continue;

      const titleMatch = trimmed.match(/^###\s+(?:(?:\d+[\.\)])\s*)?([^\r\n]+)/m);
      const title = titleMatch ? titleMatch[1].trim() : undefined;

      const problemMatch = trimmed.match(
        /[-*]?\s*\*\*(?:문제|문제 상황|문제 원인|Problem)\*\*\s*:\s*([^\r\n]+(?:\r?\n(?![*-]\s*\*\*)[^\r\n]+)*)/i
      );
      const causeMatch = trimmed.match(
        /[-*]?\s*\*\*(?:원인|원인 분석|Cause)\*\*\s*:\s*([^\r\n]+(?:\r?\n(?![*-]\s*\*\*)[^\r\n]+)*)/i
      );
      const solutionMatch = trimmed.match(
        /[-*]?\s*\*\*(?:해결|해결 방안|해결책|Solution)\*\*\s*:\s*([^\r\n]+(?:\r?\n(?![*-]\s*\*\*)[^\r\n]+)*)/i
      );
      const resultMatch = trimmed.match(
        /[-*]?\s*\*\*(?:결과|검증 결과|개선 결과|성과|Result)\*\*\s*:\s*([^\r\n]+(?:\r?\n(?![*-]\s*\*\*)[^\r\n]+)*)/i
      );

      if (problemMatch || solutionMatch || title) {
        items.push({
          title,
          problem: problemMatch
            ? problemMatch[1].trim()
            : title || "문제 상황 분석",
          cause: causeMatch ? causeMatch[1].trim() : undefined,
          solution: solutionMatch
            ? solutionMatch[1].trim()
            : "로직 검증 및 리팩토링을 통해 이슈 해결",
          result: resultMatch ? resultMatch[1].trim() : undefined,
        });
      }
    }
  } else {
    const blocks = sectionText.split(/(?=\r?\n[-*]\s+\*\*)/);

    for (const block of blocks) {
      const trimmed = block.trim();
      if (!trimmed) continue;

      const titleMatch = trimmed.match(/^[-*]\s+\*\*([^\*:]+)\*\*/m);
      const title = titleMatch ? titleMatch[1].trim() : undefined;

      const problemMatch = trimmed.match(
        /(?:[-*]\s*)?[_\*]*(?:문제|문제 원인|Problem)[_\*]*\s*:\s*([^\r\n]+(?:\r?\n(?![*-]\s*[_\*]*)[^\r\n]+)*)/i
      );
      const solutionMatch = trimmed.match(
        /(?:[-*]\s*)?[_\*]*(?:해결|해결 로직|해결 방안|Solution)[_\*]*\s*:\s*([^\r\n]+(?:\r?\n(?![*-]\s*[_\*]*)[^\r\n]+)*)/i
      );

      if (problemMatch || solutionMatch || title) {
        items.push({
          title,
          problem: problemMatch
            ? problemMatch[1].trim()
            : title || "문제 상황 분석",
          solution: solutionMatch
            ? solutionMatch[1].trim()
            : "로직 검증 및 리팩토링을 통해 이슈 해결",
        });
      }
    }
  }

  return items;
}

function extractLiveUrl(content: string, metaUrl?: string): string | undefined {
  if (metaUrl && typeof metaUrl === "string" && metaUrl.trim())
    return metaUrl.trim();

  const fieldNames = [
    "도메인",
    "배포",
    "배포 URL",
    "서비스 URL",
    "Live",
    "Live URL",
    "사이트",
    "웹사이트",
    "데모",
    "Demo",
  ];
  for (const name of fieldNames) {
    const regex = new RegExp(
      `^[\\t ]*[-*]?[\\t ]*(?:\\[[\\t ]*)?${name}[^\\r\\n:]*:[\\t ]*([^\\r\\n]+)`,
      "im"
    );
    const match = content.match(regex);
    if (match && match[1].trim()) {
      const urlMatch = match[1].match(/https?:\/\/[^\s\)\"\'`>]+/i);
      if (urlMatch) return urlMatch[0].trim();
      return match[1].trim();
    }
  }

  const linkMatch = content.match(
    /\[(?:[^\n\]]*(?:바로가기|배포|서비스|웹사이트|데모|Live|Site|Demo|PWA)[^\n\]]*)\]\((https?:\/\/(?!github\.com)[^\s\)\"\']+)\)/i
  );
  if (linkMatch) {
    return linkMatch[1].trim();
  }

  return undefined;
}
