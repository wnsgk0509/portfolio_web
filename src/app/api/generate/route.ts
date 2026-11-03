import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { owner, repo, author = owner, apiKey, customRole, customPeriod } = body;

    if (!owner || !repo) {
      return NextResponse.json({ error: "owner와 repo 정보가 필요합니다." }, { status: 400 });
    }

    const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY;

    // 1. 레포 메타데이터 조회
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { "User-Agent": "Portfolio-Builder-Agent", "Accept": "application/vnd.github.v3+json" }
    });
    if (!repoRes.ok) {
      return NextResponse.json({ error: `GitHub 저장소를 찾을 수 없습니다: ${owner}/${repo}` }, { status: 404 });
    }
    const repoData = await repoRes.json();

    // 2. 작성자 커밋 내역 조회
    const commitsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?author=${encodeURIComponent(author)}&per_page=60`, {
      headers: { "User-Agent": "Portfolio-Builder-Agent", "Accept": "application/vnd.github.v3+json" }
    });
    const commitsData = commitsRes.ok ? await commitsRes.json() : [];
    const commitMessages = Array.isArray(commitsData) 
      ? commitsData.map((c: any) => c.commit?.message?.trim()).filter(Boolean).slice(0, 30)
      : [];

    // 3. README 수집
    let readmeText = "";
    try {
      const readmeRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`);
      if (readmeRes.ok) {
        readmeText = await readmeRes.text();
      } else {
        const masterRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`);
        if (masterRes.ok) readmeText = await masterRes.text();
      }
    } catch (e) {}

    // 4. 기술 스택 추론
    let techStack: string[] = [];
    if (repoData.language) techStack.push(repoData.language);

    try {
      const pkgRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/package.json`);
      if (pkgRes.ok) {
        const pkg = await pkgRes.json();
        const deps = Object.keys({ ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) });
        const popular = ["react", "next", "typescript", "tailwindcss", "vue", "express", "zustand", "redux", "prisma"];
        techStack.push(...deps.filter(d => popular.includes(d.toLowerCase())));
      }
    } catch (e) {}

    techStack = [...new Set(techStack)];
    if (techStack.length === 0) techStack = ["Full-Stack", "JavaScript"];

    // 5. 배포 URL 및 스크린샷 썸네일 탐색
    let liveUrl = repoData.homepage || "";
    if (!liveUrl && readmeText) {
      const linkMatch = readmeText.match(/\[(?:[^\n\]]*(?:바로가기|배포|서비스|웹사이트|데모|Live|Site|Demo|PWA)[^\n\]]*)\]\((https?:\/\/(?!github\.com)[^\s\)\"\']+)\)/i);
      if (linkMatch) liveUrl = linkMatch[1];
    }

    let thumbnail = "";
    if (liveUrl) {
      // 무료 고품질 스크린샷 서비스 Microlink 활용
      thumbnail = `https://api.microlink.io?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
    }

    // 6. LLM 생성 또는 룰 기반 스마트 폴백
    let projectTitle = repoData.name;
    let summary = repoData.description || `${repoData.name} 서비스 개발 프로젝트`;
    let role = customRole || (repoData.fork ? "기능 개발 및 기여" : "전 기능 설계 및 풀스택 개발");
    let period = customPeriod || `${repoData.created_at?.slice(0, 7).replace("-", ".")} ~ ${repoData.updated_at?.slice(0, 7).replace("-", ".")}`;
    let coreFeatures: string[] = [];
    let troubleshooting: { problem: string; solution: string; cause?: string; result?: string }[] = [];
    let retrospective: string[] = [];

    if (effectiveApiKey) {
      try {
        const prompt = `
당신은 대한민국 최고 수준의 개발자 포트폴리오 컨설턴트입니다.
아래 제공된 GitHub 저장소 정보, README, 그리고 작업자("${author}")의 커밋 기록을 심층 분석하여,
취업/이직 면접관이 매력적으로 평가할 수 있는 전문적인 포트폴리오 프로젝트 데이터를 JSON 형태로 작성해주세요.

### 저장소 정보:
- 프로젝트 이름: ${repoData.name}
- 저장소 설명: ${repoData.description || "없음"}
- 주요 언어 및 감지된 기술: ${techStack.join(", ")}
- 배포 주소: ${liveUrl || "없음"}

### 작업자("${author}") 커밋 메시지 목록 (${commitMessages.length}개):
${commitMessages.slice(0, 25).map((m: string, i: number) => `${i + 1}. ${m}`).join("\n")}

### README 일부 요약:
${readmeText.slice(0, 1500)}

### 출력 포맷 (반드시 유효한 JSON만 반환):
{
  "title": "한눈에 들어오는 직관적인 프로젝트 한글 제목 (영문명 병기 가능)",
  "summary": "1~2문장의 핵심 가치 요약",
  "role": "${customRole || '담당 역할 및 기여도 (예: 백엔드 API 설계 및 DB 최적화, 기여도 100%)'}",
  "period": "${period}",
  "techStack": ["주요기술1", "주요기술2", ...],
  "coreFeatures": [
    "핵심 기능 1 (구체적인 동작 및 비즈니스 가치 포함)",
    "핵심 기능 2",
    "핵심 기능 3",
    "핵심 기능 4"
  ],
  "troubleshooting": [
    {
      "problem": "발생했던 기술적 병목 또는 문제 상황",
      "cause": "원인 분석",
      "solution": "적용한 해결 방법 및 기술적 접근",
      "result": "개선된 결과나 성능 수치 또는 안정성 효과"
    }
  ],
  "retrospective": [
    "기술적으로 체득한 점 및 배운 점 1",
    "협업 또는 사용자 관점에서의 성장 포인트 2"
  ]
}
`;

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${effectiveApiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
          })
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            if (parsed.title) projectTitle = parsed.title;
            if (parsed.summary) summary = parsed.summary;
            if (parsed.role) role = parsed.role;
            if (parsed.period) period = parsed.period;
            if (Array.isArray(parsed.techStack) && parsed.techStack.length > 0) techStack = parsed.techStack;
            if (Array.isArray(parsed.coreFeatures)) coreFeatures = parsed.coreFeatures;
            if (Array.isArray(parsed.troubleshooting)) troubleshooting = parsed.troubleshooting;
            if (Array.isArray(parsed.retrospective)) retrospective = parsed.retrospective;
          }
        }
      } catch (aiErr) {
        console.warn("Gemini 생성 실패, 룰 기반 생성으로 전환:", aiErr);
      }
    }

    // AI 미사용 시 또는 폴백 기본값 채우기
    if (coreFeatures.length === 0) {
      coreFeatures = commitMessages.length > 0
        ? commitMessages.slice(0, 4).map((msg: string) => msg.replace(/^[a-z]+(\([a-z0-9_-]+\))?:\s*/i, ""))
        : ["사용자 친화적인 인터페이스 구현", "안정적인 데이터 처리 및 API 연동", "컴포넌트 모듈화 및 재사용성 강화"];
    }

    if (troubleshooting.length === 0) {
      troubleshooting = [
        {
          problem: "대용량 데이터 처리 및 비동기 상태 동기화 이슈",
          cause: "컴포넌트 렌더링 주기와 비동기 응답 타이밍 불일치로 인한 상태 불일치",
          solution: "상태 관리 라이브러리 도입 및 데이터 캐싱 레이어 구축으로 렌더링 최적화",
          result: "불필요한 재렌더링 50% 감소 및 응답 반응 속도 대폭 개선"
        }
      ];
    }

    if (retrospective.length === 0) {
      retrospective = [
        "Git 기반의 체계적인 버전 관리와 커밋 컨벤션의 중요성을 체득했습니다.",
        "실제 사용자 관점에서의 UX 개선과 안정적인 예외 처리 구조를 설계하는 경험을 쌓았습니다."
      ];
    }

    // 마크다운 문서 포맷 생성
    const markdownContent = `---
published: true
---
# ${projectTitle}

URL: https://github.com/${owner}/${repo}
${liveUrl ? `도메인: ${liveUrl}\n` : ""}기술: ${techStack.join(", ")}
날짜: ${period}
팀구성: ${repoData.fork ? "협업" : "개인 프로젝트"}
역할: ${role}

## 프로젝트 소개

${summary}

- **주요 기술 스택**: ${techStack.join(", ")}
- **주요 기능**: ${coreFeatures.slice(0, 3).join(", ")}

## 본인 역할

${role}로서 핵심 비즈니스 로직과 시스템 안정화 작업을 전담했습니다.

${coreFeatures.map(f => `- **${f}**`).join("\n")}

## 핵심 기능

${coreFeatures.map(f => `- ${f}`).join("\n")}

## 트러블 슈팅 및 해결

${troubleshooting.map(t => `### ${t.problem}

- **문제 원인**: ${t.cause || "원인 분석 진행"}
- **해결 방안**: ${t.solution}
- **결과**: ${t.result || "안정적인 서비스 동작 보장"}`).join("\n\n")}

## 배운 점 및 회고

${retrospective.map(r => `- ${r}`).join("\n")}
`;

    return NextResponse.json({
      project: {
        id: repoData.name.toLowerCase(),
        title: projectTitle,
        period,
        summary,
        role,
        teamSize: repoData.fork ? "협업 프로젝트" : "1인 개발",
        techStack,
        githubUrl: repoData.html_url,
        liveUrl: liveUrl || undefined,
        thumbnail: thumbnail || undefined,
        description: summary,
        coreFeatures,
        troubleshooting,
        retrospective,
        published: true
      },
      markdown: markdownContent
    });
  } catch (err: any) {
    console.error("Generate API Error:", err);
    return NextResponse.json({ error: err.message || "포트폴리오 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}
