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
  role: "신입 백엔드 개발자",
  subRole: "Backend & Full-stack Developer",
  experience: "신입 백엔드 개발자 (인턴 8개월)",
  email: "rndrnd7qkd@gmail.com",
  phone: "010-4611-1339",
  github: "https://github.com/wnsgk0509",
  bioHeadline: "안정적인 시스템 운영과 꼼꼼한 문제 해결을 지향하는 신입 개발자 이준하입니다.",
  bioParagraphs: [
    "8개월간의 실무 경력을 바탕으로 다양한 프로젝트에서 실질적인 문제 해결 경험을 쌓아왔습니다. 실제 업무에서 로직 및 디자인 수정, 배포 전 테스트, 문서 작성 등 유지보수 전반을 담당하며 서비스 품질 향상에 힘썼습니다.",
    "특히 CS 대응 경험을 통해 고객 요구 사항을 신속하게 파악하고, 문제 발생 시 효과적으로 대처하는 역량을 키웠습니다. 실무에서의 꼼꼼한 테스트와 체계적인 문서화로 배포 안정성을 높였으며, 팀 내 협업 과정에서도 원활한 커뮤니케이션 능력을 발휘했습니다.",
    "이후 Java와 React 기반의 풀스택 6개월 과정을 수료했으며 백엔드 및 서버 개발을 중심으로 RestAPI 설계와 MyBatis, JSP, JavaScript, OracleDB 등 폭넓은 기술 스택을 활용하여 안정적인 시스템 운영에 기여했습니다.",
    "이러한 경험은 풀스택 개발자로서의 든든한 성장 기반이 되고 있으며, 앞으로도 다양한 기술을 적극적으로 습득하며 효율적이고 신뢰할 수 있는 시스템을 구축해 나가겠습니다."
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
      title: "Java & React 풀스택 기초 역량",
      description: "Java/Spring 기반 백엔드 아키텍처와 React 기반 현대적 웹 프론트엔드 연동을 아우르는 풀스택 시야 보유",
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
        { name: "Java", description: "객체지향 설계 및 핵심 비즈니스 로직 구현" },
        { name: "Rest API", description: "RESTful 규약에 따른 효율적인 엔드포인트 설계 및 명세" },
        { name: "MyBatis", description: "SQL 매퍼 기반 쿼리 작성 및 데이터 영속화 처리" },
        { name: "JSP / Servlet", description: "MVC 패턴 기반 웹 애플리케이션 개발" }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "React", description: "컴포넌트 기반 UI 개발 및 상태 관리, API 연동" },
        { name: "JavaScript (ES6+)", description: "비동기 통신(Fetch/Axios), DOM 조작 및 모던 문법 활용" },
        { name: "HTML5 / CSS3", description: "웹 표준 준수 및 반응형 웹 레이아웃 구현" }
      ]
    },
    {
      category: "Database",
      items: [
        { name: "Oracle DB", description: "관계형 데이터베이스 모델링, 조인 및 복잡한 SQL 작성" }
      ]
    },
    {
      category: "DevOps & Tools",
      items: [
        { name: "Git / GitHub", description: "버전 관리 및 코드 협업, 브랜치 전략 활용" },
        { name: "바이브코딩 (AI 어시스턴트)", description: "생성형 AI 도구를 활용한 신속한 문제 해결 및 생산성 극대화" }
      ]
    }
  ]
};
