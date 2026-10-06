# 프로젝트 마크다운(.md) 추가 가이드

이 폴더(`content/projects/`)에 새로운 `.md` 파일을 넣으면 포트폴리오 웹사이트에 프로젝트 카드가 자동으로 생성됩니다.

### 작성 형식 (예: `my-project.md`)

```markdown
---
title: 프로젝트 이름
period: 2025.07 ~ 2026.02
summary: 프로젝트 한 줄 요약
role: 백엔드 API 개발 및 배포 (기여도 80%)
teamSize: 3명
techStack: ["Java", "Spring Boot", "MyBatis", "Oracle DB"]
githubUrl: https://github.com/wnsgk0509/your-repo
---

## 📌 프로젝트 소개
프로젝트에 대한 상세 소개글을 작성합니다.

## ⚡ 핵심 기능
- 핵심 기능 1
- 핵심 기능 2

## 💡 트러블 슈팅 및 해결방안
### 1. 트러블 슈팅 제목
- **문제 상황 (Problem)**: 문제 설명
- **원인 분석 (Cause)**: 원인 분석
- **해결 방안 (Solution)**: 해결 방법
- **개선 결과 (Result)**: 수치나 성과 결과

## 📝 배운점 및 회고
- 프로젝트를 통해 배우고 느낀 점
```

> [!TIP]
> 노션에서 내보낸 마크다운 파일 내용에 상단 `---` (frontmatter) 부분이 없더라도 파일 첫 줄의 제목과 헤더를 자동으로 인식하여 표시합니다!
