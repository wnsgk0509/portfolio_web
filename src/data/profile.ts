export interface ProfileData {
  name: string;
  role: string;
  subRole: string;
  experience: string;
  email: string;
  phone: string;
  github: string;
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
    achievements: string[];
  }[];
  certificates: {
    period: string;
    name: string;
    status: string;
  }[];
  skills: {
    category: string;
    items: {
      name: string;
      level?: string;
      description?: string;
    }[];
  }[];
}

export const profileData: ProfileData = {
  name: "이준하",
  role: "신입 풀스택 개발자",
  subRole: "Full-Stack Developer (Spring & React)",
  experience: "신입 풀스택 개발자 (인턴 8개월)",
  email: "rndrnd7qkd@gmail.com",
  phone: "010-4611-1339",
  github: "https://github.com/wnsgk0509",
  bioHeadline: "Spring Framework 백엔드와 React 프론트엔드를 아우르며, 8개월의 실무 운영 경험으로 서비스 완성도를 높이는 풀스택 개발자 이준하입니다.",
  bioParagraphs: [
    "8개월간의 실무 경력을 바탕으로 다양한 프로젝트에서 실질적인 문제 해결 경험을 쌓아왔습니다. 실제 업무에서 서비스 로직 및 UI 디자인 수정, 배포 전 테스트, 매뉴얼 문서화 등 유지보수 전반을 담당하며 서비스 품질 향상에 힘썼습니다.",
    "특히 CS 대응 경험을 통해 고객 요구 사항을 신속하게 파악하고, 예기치 못한 이슈 발생 시 원인을 빠르게 진단하고 해결하는 역량을 키웠습니다. 실무에서의 꼼꼼한 테스트와 체계적인 문서화로 배포 안정성을 높였으며, 원활한 팀 커뮤니케이션 능력을 발휘했습니다.",
    "이후 Java와 Spring Framework, React 기반의 풀스택 6개월 과정을 수료하며, Spring MVC 기반 REST API 설계부터 MyBatis·OracleDB 데이터 모델링, React·Redux 기반 반응형 웹 UI 구현까지 풀스택 웹 애플리케이션을 성공적으로 구축했습니다.",
    "프론트엔드와 백엔드의 유기적인 데이터 통신과 비즈니스 로직을 모두 이해하는 풀스택 시야를 바탕으로, 단순한 기능 구현을 넘어 사용자 관점에서 신뢰할 수 있는 서비스를 개발해 나가겠습니다."
  ],
  strengths: [
    {
      title: "8개월 실무 유지보수 & 배포 안정성",
      description: "로직 및 디자인 수정, 배포 전 꼼꼼한 테스트, 체계적 문서 작성으로 무중단 및 서비스 품질 향상에 기여",
      icon: "ShieldCheck"
    },
    {
      title: "신속한 CS 대응 및 문제 해결",
      description: "고객 및 실사용자의 요구사항을 빠르게 파악하고 예기치 못한 이슈 발생 시 원인 분석 및 신속 대응",
      icon: "Headphones"
    },
    {
      title: "Spring & React 기반 풀스택 개발 역량",
      description: "Spring MVC 기반 견고한 RESTful API 구축과 React/Redux 기반 반응형 SPA 연동을 아우르는 엔드투엔드 개발 역량",
      icon: "Layers"
    },
    {
      title: "신뢰와 원활한 팀 커뮤니케이션",
      description: "문서화 기반의 개발과 동료 개발자 및 유관 부서와의 적극적 소통으로 협업 시너지 창출",
      icon: "Users"
    }
  ],
  education: [
    {
      period: "2020.03 ~ 2026.02",
      institution: "배재대학교",
      major: "컴퓨터공학과",
      status: "졸업"
    }
  ],
  career: [
    {
      period: "2025.07 ~ 2026.02",
      company: "(주)이지닉스",
      position: "개발팀 인턴",
      role: "서비스 유지보수, 로직/디자인 수정, 배포 전 테스트 및 CS 대응",
      duration: "8개월",
      achievements: [
        "서비스 로직 및 UI/UX 수정 전반 담당",
        "배포 전 테스트 시나리오 수행 및 문서 작성으로 배포 안정성 확보",
        "고객 CS 인입 대응 및 실시간 이슈 트러블 슈팅"
      ]
    }
  ],
  certificates: [
    {
      period: "2026",
      name: "정보처리기사",
      status: "필기 합격 (실기 준비 중)"
    }
  ],
  skills: [
    {
      category: "Backend",
      items: [
        { name: "Spring Framework / MVC", description: "Spring MVC 기반 RESTful API 설계, 계층형 아키텍처(Controller-Service-DAO) 및 의존성 주입(DI/IoC) 활용" },
        { name: "Java (JDK 17)", description: "객체지향 설계(OOP), 컬렉션 프레임워크 및 견고한 비즈니스 로직 구현" },
        { name: "MyBatis", description: "SQL 매퍼 기반 동적 쿼리 작성, 페이징 처리 및 데이터 영속화 최적화" },
        { name: "RESTful API", description: "표준 규약(HTTP Status, JSON Wrapper)에 따른 효율적인 엔드포인트 설계" },
        { name: "JSP / Servlet", description: "MVC 패턴 기반 웹 애플리케이션 개발 및 세션/쿠키 기반 권한 제어" }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "React 19", description: "컴포넌트 기반 SPA UI 개발 및 React Router 라우팅 연동" },
        { name: "Redux & Axios", description: "Redux 전역 상태 관리 및 Axios 기반 백엔드 REST API 비동기 통신" },
        { name: "JavaScript (ES6+) / HTML / CSS", description: "모던 자바스크립트 문법, 비동기(Promise/Async), 웹 표준 및 반응형 레이아웃 구현" }
      ]
    },
    {
      category: "Database",
      items: [
        { name: "OracleDB", description: "관계형 데이터베이스 모델링, 조인 및 복잡한 SQL 작성, 동시성 제어(MERGE INTO)" }
      ]
    },
    {
      category: "DevOps & Tools",
      items: [
        { name: "Git / GitHub", description: "버전 관리 및 코드 협업, Git-Flow 브랜치 전략 활용" },
        { name: "Postman & DBeaver", description: "API 엔드포인트 기능 테스트 및 데이터베이스 쿼리 분석/관리" },
        { name: "Vercel", description: "클라우드 기반 프론트엔드 CI/CD 자동화 배포 파이프라인 운영" }
      ]
    }
  ]
};
