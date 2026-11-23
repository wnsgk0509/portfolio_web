export interface ProfileData {
  name: string;
  role: string;
  subRole: string;
  headerBadge: string;
  experience: string;
  availability: string;
  email: string;
  phone: string;
  github: string;
  portfolioUrl: string;
  bioHeadline: string;
  bioParagraphs: string[];
  strengths: {
    title: string;
    description: string;
    icon: string;
  }[];
  education: {
    period: string;
    institution: string;
    major: string;
    status: string;
  }[];
  career: {
    period: string;
    company: string;
    position: string;
    role: string;
    duration: string;
    techStack?: string[];
    achievements: string[];
  }[];
  training: {
    period: string;
    title: string;
    institution: string;
    status: string;
    statusNote?: string;
    durationDays?: string;
    description: string;
    skills?: string[];
  }[];
  certificates: {
    period: string;
    name: string;
    status: string;
  }[];
  skills: {
    category: string;
    subtitle: string;
    items: {
      name: string;
      level?: string;
      description?: string;
    }[];
  }[];
}

export const profileData: ProfileData = {
  name: "이준하",
  role: "AI 서비스 풀스택 개발자",
  subRole: "AI-Native Full-Stack Developer (Planning · Dev · Verification · Ops)",
  headerBadge: "AI · Full-Stack",
  experience: "신입 (실무 인턴 7개월 · 즉시 입사 가능)",
  availability: "합격 시 즉시 입사 가능 (조기 취업 가능)",
  email: "rndrnd7qkd@gmail.com",
  phone: "010-4611-1339",
  github: "https://github.com/wnsgk0509",
  portfolioUrl: "https://portfolio-web-iota-fawn.vercel.app/",
  bioHeadline:
    "기획부터 개발·기술 검증·운영까지 서비스의 전 과정을 완주하는 AI 서비스 풀스택 개발자 이준하입니다.",
  bioParagraphs: [
    "(주)이지닉스에서 7개월간 개발팀 인턴으로 근무하며 B2B 사내 메신저 솔루션의 실제 운영 생애주기를 경험했습니다. 고객 CS 이슈를 재현·분석해 Java와 Delphi 코드 레벨로 기능을 수정하고, MySQL 데이터 정합성 점검, Linux 고객사 서버 성능 정기점검, 릴리즈 전 QA 시나리오 검증 및 매뉴얼 문서화까지 '운영되는 서비스의 안정성'을 지키는 실무를 수행했습니다.",
    "이후 Java/Spring·React·TypeScript 기반 웹 풀스택 역량에 AI 활용 능력을 결합해, 아이디어를 빠르게 제품화하고 검증하는 엔드투엔드(E2E) 개발에 집중해 왔습니다. GitHub 커밋/PR 데이터를 Gemini API Map-Reduce 파이프라인으로 분석하는 AI 서비스(GitFolio Generator)를 직접 설계했으며, AI 개발 도구를 적극 활용해 기획·구현 속도를 높이되 아키텍처 설계와 품질 검증에 핵심 역량을 투입하고 있습니다.",
    "단순히 AI로 코드를 빠르게 생성하는 데 그치지 않고, 오프라인 단절/재연결 멱등성 큐 검증, Android WebView GPU 백화 크래시 원천 해결, 외부 API 장애 시 로컬 엔진 Fallback, 실기기 Android 릴리즈 빌드 바이너리 디버깅 등 수치와 동작으로 증명하는 검증 습관을 갖추고 있습니다.",
    "현재는 휴먼AI교육센터 심화 과정을 통해 데이터 분석·AI 모델 연동 역량을 확장하고 있으며(합격 시 즉시 입사 가능), 기획 의도를 정확히 이해하고 AI와 풀스택 기술로 끝까지 검증된 서비스를 만들어내는 개발자로 기여하겠습니다.",
  ],
  strengths: [
    {
      title: "기획 → 개발 → 검증 E2E 완주 역량",
      description:
        "사용자 문제 정의와 UX 기획부터 풀스택 구현, 성능 최적화 및 엣지케이스 검증까지 서비스 전 과정을 주도적으로 완주",
      icon: "Compass",
    },
    {
      title: "AI 서비스 설계 & AI 활용 개발 생산성",
      description:
        "Gemini API 기반 Map-Reduce LLM 파이프라인을 직접 설계하고, AI 개발 워크플로우를 접목해 체계적인 서비스 기획과 품질 검증을 병행",
      icon: "Sparkles",
    },
    {
      title: "7개월 실무 운영 · Linux/MySQL 점검",
      description:
        "사내 메신저 Java/Delphi 기능 수정, MySQL 정합성 점검, Linux 고객사 서버 성능 정기점검 및 릴리즈 전 QA·매뉴얼 문서화 수행",
      icon: "ShieldCheck",
    },
    {
      title: "Java/Spring · React/TS 풀스택 확장성",
      description:
        "Spring MVC·REST API·RDBMS 협업 경험부터 React 19·TypeScript·Supabase·React Native(Kotlin 브릿지)까지 요구사항에 맞는 최적 스택 적용",
      icon: "Layers",
    },
  ],
  education: [
    {
      period: "2020.03 ~ 2026.02",
      institution: "배재대학교",
      major: "컴퓨터공학과",
      status: "졸업",
    },
  ],
  career: [
    {
      period: "2025.08 ~ 2026.02",
      company: "(주)이지닉스",
      position: "개발팀 인턴",
      role: "B2B 사내 메신저 솔루션 기능 유지보수 · MySQL 점검 · Linux 정기점검 · QA",
      duration: "7개월",
      techStack: ["Java", "Delphi", "MySQL", "Linux", "QA & 문서화"],
      achievements: [
        "기능 수정 및 CS 원인 분석 (월 평균 15건 대응): 고객 CS 인입 이슈를 재현·진단하고 Java·Delphi 기반 사내 메신저 기능 수정 및 버그 픽스 수행",
        "MySQL 데이터 정합성 점검: 운영 DB의 데이터 정합성 확인을 위한 MySQL 쿼리 조회·분석 및 테이블/쿼리 수정 작업 지원",
        "Linux 고객사 서버 성능 정기점검: 고객사 납품 Linux 환경에서 CPU·메모리·디스크·프로세스 상태 및 서비스 로그를 정기 점검하고 성능 점검 리포트 작성",
        "릴리즈 전 QA 검증 및 문서화: 배포 전 체크리스트·테스트 시나리오 수행과 운영·사용자 매뉴얼 문서화로 배포 안정성 확보 (배재대 IPP 장기현장실습 연계)",
      ],
    },
  ],
  training: [
    {
      period: "2026.11.09 ~ 2027.01.11",
      title: "심화_심층 데이터 분석을 통한 서비스 솔루션 개발자 과정",
      institution: "휴먼AI교육센터 (국비지원교육)",
      status: "진행 중",
      statusNote: "조기 취업 · 즉시 입사 가능",
      durationDays: "44일",
      description:
        "기존 웹 풀스택 역량에 데이터 분석·머신러닝 모델링 및 AI 기반 서비스 솔루션 아키텍처를 결합하기 위해 심화 수강 중입니다. (채용 합격 시 조기 취업 및 즉시 입사 가능)",
      skills: ["Python", "AI/ML", "Data Analysis", "LLM Service"],
    },
    {
      period: "2026.04.20 ~ 2026.10.15",
      title: "Java(자바) Spring(스프링) 기반 스마트웹&콘텐츠 풀스택 개발자 양성과정",
      institution: "(주)휴먼교육센터",
      status: "수료",
      durationDays: "119일",
      description:
        "Java 17, Spring MVC, MyBatis, OracleDB, React 19 기반 풀스택 웹 개발 과정 수료. 1·2차 팀장 및 3차 기술팀장을 맡아 ERD 설계·Git-Flow·PR 코드 리뷰를 주도하며 AI 취업 지원 플랫폼(Provit) 완성",
      skills: ["Java 17", "Spring MVC", "MyBatis", "OracleDB", "React 19", "REST API"],
    },
    {
      period: "2025.03.04 ~ 2026.02.28",
      title: "2025년 IPP(PBL) SW개발 L5 과정",
      institution: "배재대학교 · (주)이지닉스",
      status: "이수",
      durationDays: "1년",
      description:
        "4학년 교내 실무 중심 PBL 소프트웨어 개발 교육(3~7월) 이수 후, (주)이지닉스 기업연계 장기현장실습(8~2월)으로 메신저 솔루션 유지보수 및 Linux 정기점검 실무 수행",
      skills: ["Java", "Delphi", "MySQL", "Linux 정기점검", "QA"],
    },
  ],
  certificates: [
    {
      period: "2026",
      name: "정보처리기사",
      status: "필기 합격 (실기 준비 중)",
    },
  ],
  skills: [
    {
      category: "Frontend & App",
      subtitle: "React · TypeScript 기반 웹/앱 UI 및 성능 최적화",
      items: [
        {
          name: "React 19 / TypeScript / Next.js",
          description:
            "컴포넌트 기반 SPA/SSR 설계, 정적 타입 기반 오프라인 큐 구현, React.lazy·manualChunks 코드 분할을 통한 성능 최적화",
        },
        {
          name: "Tailwind CSS / Vite / PWA (Workbox)",
          description:
            "반응형 UI 구현, Service Worker 오프라인 캐싱 및 A2HS(홈화면 앱 설치) 오프라인-퍼스트 아키텍처 구축",
        },
        {
          name: "React Native / Capacitor / Android",
          description:
            "크로스플랫폼 모바일 앱 개발, Capacitor Android 앱 빌드 및 WebView GPU 백화 크래시 해결, Kotlin 위젯(AppWidgetProvider)·알람 브릿지 및 AdMob 광고 연동",
        },
      ],
    },
    {
      category: "Backend & Database",
      subtitle: "Java/Spring · RDBMS 기반 API 설계 및 실무 데이터 운영",
      items: [
        {
          name: "Java (JDK 17) / Spring Framework (MVC)",
          description:
            "계층형 REST API 설계, CompletableFuture·@Scheduled 비동기 배치 스케줄링, CORS·리버스 프록시 제어 및 실무 기능 유지보수",
        },
        {
          name: "MySQL / PostgreSQL (Supabase) / OracleDB",
          description:
            "관계형 스키마 설계, 실무 MySQL 데이터 정합성 점검·쿼리 수정, Oracle MERGE INTO 동시성 제어, Supabase RLS 보안 정책 적용",
        },
        {
          name: "MyBatis / Legacy Maintenance (Delphi · JSP)",
          description:
            "MyBatis 동적 SQL 매퍼·복합 검색 최적화, (주)이지닉스 실무 Delphi 사내 메신저 유지보수 및 MVC 웹 유지보수 경험",
        },
      ],
    },
    {
      category: "AI & Data Pipeline",
      subtitle: "LLM 서비스 파이프라인 설계 및 AI 활용 고속 프로덕트 개발",
      items: [
        {
          name: "Python / Google Gemini API (google-genai)",
          description:
            "대용량 커밋·Diff 분석 시 컨텍스트 한계를 극복하는 40개 단위 Map-Reduce 청킹 파이프라인 및 하이브리드 LLM 분석 모드 구현",
        },
        {
          name: "AI-Assisted E2E Development",
          description:
            "AI 개발 도구를 활용해 MVP 기획·프로토타이핑 속도를 높이고, 아키텍처 설계·예외 처리·정량 검증에 집중하는 개발 워크플로우 운영",
        },
        {
          name: "Streamlit / External APIs (PyGithub · Notion)",
          description:
            "GitHub·Notion·Gist 다중 API 연동 및 내보내기 파이프라인 구축, Python 기반 데이터 분석·AI 모델링 심화 과정 진행 중",
        },
      ],
    },
    {
      category: "Ops, Verification & Tools",
      subtitle: "실무 Linux 운영 점검, 배포 파이프라인 및 기술 검증",
      items: [
        {
          name: "Linux Server Operations (정기점검)",
          description:
            "고객사 납품 Linux 서버의 CPU·메모리·디스크·프로세스·로그 정기점검 및 성능 점검 리포트 작성 실무 수행",
        },
        {
          name: "Vercel / Reverse Proxy / CI·CD",
          description:
            "클라우드 프론트엔드 자동 배포 파이프라인 운영, vercel.json Rewrites 기반 SPA 라우팅 및 API 리버스 프록시 구성",
        },
        {
          name: "Git / GitHub · Postman · DBeaver · QA",
          description:
            "Git-Flow 협업 및 대소문자 충돌 해결, API·SQL 검증, 릴리즈 전 QA 테스트 시나리오 설계 및 운영 매뉴얼 문서화",
        },
      ],
    },
  ],
};
