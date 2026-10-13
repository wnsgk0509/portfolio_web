# 💼 신입 풀스택 개발자 이준하 포트폴리오 웹사이트

> **Spring Framework 백엔드와 React 프론트엔드 역량, 실무 8개월 인턴 경험을 보유한 신입 풀스택 개발자 이준하**의 개인 포트폴리오 웹사이트입니다.  
> 실제 프로젝트의 트러블 슈팅, 문제 해결 과정, 아키텍처 개선에 집중하여 제작되었습니다.

---

## 🌟 주요 특징

- **Notion 마크다운 자동 연동 시스템**: `content/projects/`에 마크다운(`.md`) 파일만 추가하면 프로젝트 카드 및 상세 모달이 자동 생성됩니다.
- **체계적인 트러블 슈팅 시각화**: Problem → Cause → Solution → Result 구조의 문제 해결 과정을 한눈에 확인할 수 있습니다.
- **반응형 & 모던 UI 디자인**: White / Charcoal / Deep Green 컬러 테마 및 모바일 친화적인 반응형 레이아웃을 제공합니다.
- **Vercel 자동 배포 (CI/CD)**: `main` 브랜치에 Push 시 Vercel을 통해 실시간 무중단 자동 배포됩니다.

---

## 🛠 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Icons**: Lucide Icons
- **Content Parsing**: Gray-Matter, 정규식 기반 계층형 마크다운 파서
- **Deployment**: Vercel

---

## 📁 프로젝트 구조

```text
portfolio_web/
├── content/
│   └── projects/               # 📌 프로젝트 마크다운(.md) 저장 폴더
│       ├── [Provit] ... .md    # 채용공고 & 모의면접 프로젝트
│       ├── 가상 주식 거래 ... .md # 모의주식 & 커뮤니티 프로젝트
│       └── README.md           # 마크다운 작성 양식 가이드
├── src/
│   ├── app/                    # Next.js App Router (layout, page)
│   ├── components/             # UI 컴포넌트 (Hero, About, Projects, Modal 등)
│   ├── data/                   # 정적 데이터 (profile, skills 등)
│   └── lib/                    # 마크다운 자동 파싱 유틸리티 (markdownProjects.ts)
└── next.config.ts              # Next.js 설정
```

---

## 🚀 로컬 실행 방법

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 확인할 수 있습니다.

---

## 📝 프로젝트 추가 방법

1. `content/projects/` 폴더에 새로운 마크다운 파일(예: `my-project.md`)을 생성합니다.
2. [마크다운 작성 가이드](content/projects/README.md)의 템플릿 양식에 맞춰 작성합니다.
3. GitHub에 Push하면 Vercel을 통해 자동으로 웹사이트에 즉시 반영됩니다:
   ```bash
   git add .
   git commit -m "feat: 새 프로젝트 추가"
   git push origin main
   ```
