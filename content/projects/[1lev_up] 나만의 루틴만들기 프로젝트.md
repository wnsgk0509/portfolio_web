---
published: true
order: 3
categoryBadge: "기획·개발·앱출시·성능검증 E2E"
summary: "컨디션이 낮은 날에도 유지할 수 있는 최소 루틴(MVR) 기반 하이브리드 앱. PWA에서 Capacitor Android 앱으로 확장하고, AI 주간 코칭 리포트·AdMob 수익화 모델 구축, 그리고 초기 번들 93.5% 감축 및 Android WebView GPU 백화 충돌을 실측 해결했습니다."
thumbnail: "/projects/1lev_up.png"
liveUrl: "https://1lev-up.vercel.app/"
---

# 1lev_up — 최소 습관 & 루틴 관리 시스템 (Web & Android)

URL: https://github.com/wnsgk0509/1lev_up
도메인: https://1lev-up.vercel.app/
기술: React 19, TypeScript, Tailwind CSS, Supabase, Capacitor (Android), Google AdMob, Vite, PWA, Workbox, Canvas-Confetti, HTML5 Canvas
날짜: 2026년 11월
팀구성: 개인 프로젝트 (1인 개발)
역할: 문제 정의·UX 기획, AI 활용 고속 MVP 구현, PWA → Capacitor Android 네이티브 앱 확장, AdMob 광고 수익화 모델, AI 주간 코칭 엔진, 오프라인 멱등성 큐 및 WebView GPU 크래시 해결

## 프로젝트 소개

**1lev_up**은 《아주 작은 습관의 힘》과 《원씽(The ONE Thing)》의 핵심 원리를 서비스 UX에 녹여, 컨디션이 저하된 날에도 포기하지 않고 이어갈 수 있는 **'최소 실행 가능 루틴(Minimum Viable Routine)'** 관리 하이브리드 애플리케이션입니다.

웹(PWA) MVP로 핵심 가설을 먼저 검증한 뒤, **Capacitor를 도입해 Android 네이티브 앱(APK) 패키징 및 Google AdMob 광고 수익화, Google Play Store 출시 파이프라인**까지 확장했습니다. 또한 최근 7일 행동 데이터를 분석해 주는 **AI 주간 코칭 리포트**, 순수 Canvas 기반 **성장 영수증**, 5분 명상 앰비언트 오디오 등 완성도 높은 프로덕트 기능을 구현했습니다.

- **Frontend & App**: React 19, TypeScript, Tailwind CSS, Vite
- **Mobile & Native**: Capacitor 8 (Android SDK), `@capacitor-community/admob` (배너·전면·보상형 광고), `@capacitor/haptics` (햅틱 진동 피드백), `@capacitor/status-bar`
- **Offline & Cloud**: Vite PWA Plugin, Workbox Service Worker, 멱등성 기반 Offline Queue (`offlineQueue.ts`), Supabase (PostgreSQL, Row Level Security, Auth)
- **AI & Data Engine**: 클라이언트 AI 주간 행동 코칭 엔진 (`aiCoach.ts`), 순수 HTML5 Canvas 2D 성장 영수증 (`GrowthReceiptModal.tsx`), 5분 마음 멈춤 앰비언트 오디오 (`audio.ts`)

## 기획 및 문제 정의

- **해결하려는 문제**: 기존 습관 관리 앱은 의욕이 넘칠 때 과도한 목표를 세웠다가 하루만 실패해도 전체 루틴을 포기하게 되는 구조적 한계가 있으며, 오프라인 환경에서의 데이터 유실과 단순 웹 환경의 스토어 접근성 및 수익화 부재 문제가 있었습니다.
- **설계 전략**: 전날 밤 지정한 최우선 과업(`The ONE Thing`)을 아침에 자동 연동해 의사결정 피로를 줄이고, 컨디션이 나쁜 날엔 원클릭 **'독서 15분' 대체 루틴**으로 연속 달성(Streak)을 지키는 행동 설계를 적용했습니다. 이후 웹에 머무르지 않고 **Capacitor Android 앱 패키징 및 AdMob/Pro 구독 수익화 모델**을 구축해 실제 비즈니스 관점의 제품으로 발전시켰습니다.

## 본인 역할

문제 정의와 UX 기획부터 프론트엔드 전 기능, Capacitor Android 네이티브 앱 빌드, AdMob 광고 수익화 파이프라인, AI 행동 코칭 엔진, 멱등성 오프라인 동기화 큐, 번들 최적화 및 WebView GPU 충돌 해결까지 **전 과정을 1인 주도 개발**했습니다.

- **기획 & 프론트엔드 E2E 완주**: React 19 + TypeScript 기반 대시보드, The ONE Thing 카드, 독서 서재/회고 피드, 성장 영수증 Canvas, 5분 마인드 타이머 전 화면 직접 설계 및 구현
- **Capacitor 기반 Android 네이티브 앱 빌드 & 배포 환경 구축**: 웹 코드를 기반으로 Capacitor Android 프로젝트를 세팅하고, 빌드 자동화 스크립트(`npm run cap:build`, `npx cap sync`) 구축 및 실기기 릴리즈 환경 검증
- **Google AdMob 광고 연동 & 비즈니스 모델(BM) 구축**: 하단 배너 광고, 전면(Interstitial) 광고, 보상형(Rewarded) 광고 파이프라인 연동 및 Pro 멤버십 분기(`PricingModal.tsx`)와 Play Store 개인정보처리방침 구비
- **AI 주간 행동 코칭 리포트 엔진 설계**: 최근 7일간의 루틴 수행률, 감정(기분 추이), One Thing 완수율, 독서 시간을 분석해 취약 시간대와 골든 타임을 진단하고 맞춤 행동 처방전을 발행하는 클라이언트 AI 엔진(`aiCoach.ts`) 구현
- **오프라인-퍼스트(Offline-First) 동기화 아키텍처 구축**: 네트워크 단절 시 변경 작업을 로컬에 적재하고 재연결(`window.online`) 시 자동 일괄 반영하는 멱등성 큐(`offlineQueue.ts`) 설계
- **정량적 기술 검증 및 실기기 디버깅**: 초기 번들 용량 **93.5% 감축(537kB → 34kB)** 실측 및 Android WebView GPU 충돌로 인한 백화(White Screen) 현상 원천 해결

## 핵심 기능

- **오늘의 The ONE Thing & 대체 루틴**:
  - 전날 밤 설정한 최우선 목표를 다음 날 아침 자동 연동해 의사결정 부담 제거
  - 컨디션 저하 시 원클릭 '독서 15분' 대체 루틴 전환 및 달성 시 기기 햅틱 진동과 콘페티 피드백 제공
- **AI 주간 행동 코칭 리포트 (`aiCoach.ts`, `AiReportModal`)**:
  - 최근 7일간의 루틴·감정·독서 이행 데이터를 종합 집계하여 루틴 수행 점수, 취약 시간대, 행동 처방전 맞춤 생성
  - 무료 1회 체험 및 Pro 멤버십 연동 비즈니스 로직 적용
- **5분 마음 멈춤 (Mindfulness) & 앰비언트 오디오 (`MindPauseModal`)**:
  - 번아웃과 집중력 저하 방지를 위한 5분 몰입/호흡 일시정지 모달
  - 백그라운드 명상 앰비언트 오디오 연동, 안드로이드 물리 뒤로가기 제어 및 Safe-Area Insets 지원
- **순수 HTML5 Canvas 기반 '성장 영수증' 시각화 (`GrowthReceiptModal`)**:
  - 무거운 외부 차트 라이브러리 없이 순수 Canvas 2D API로 사용자의 주간 루틴 이행 내역을 실제 종이 영수증 그래픽으로 렌더링하고 이미지 다운로드/공유 제공
- **회고 & 서재 통합 피드 및 데이터 무결성 정책 (`BooksView`)**:
  - 일일 회고와 독서 노트를 하나의 통합 피드로 개편
  - 과거 기록 변조 방지 정책 적용: 오늘 날짜만 수정 가능하며, 과거 기록은 Read-only 뷰어 모드로 자동 전환되어 데이터 무결성 보장
- **Capacitor Android 앱 & Google AdMob 수익화 모델**:
  - 하단 배너 광고 상시 노출 및 루틴 완수/리포트 확인 시 전면·보상형 광고 트리거 연동
  - 광고 제거 및 무제한 AI 리포트를 제공하는 Pro 구독 요금제 모달(`PricingModal`) 구현
- **오프라인-퍼스트 PWA & 클라우드 스마트 마이그레이션**:
  - 홈화면 앱 설치(A2HS) 및 네트워크 단절 시 멱등성 로컬 큐 적재 후 재연결 시 Supabase 자동 동기화(Auto-flush)
  - 비회원 로컬 스토리지 데이터를 로그인 시 클라우드로 안전 병합

## 기술 검증 요약

- **Android WebView GPU 백화(White Screen) 크래시 원천 해결**: `canvas-confetti`의 Web Worker / `OffscreenCanvas`가 안드로이드 WebView의 GPU Compositor Context와 충돌하는 원인을 규명하고, 메인 스레드 2D 전환 및 전용 캔버스 사전 마운트로 크래시 해결
- **번들 성능 정량 검증**: Vite 빌드 리포트 실측 기준 메인 엔트리 번들을 **537.10kB → 34.79kB (약 93.5% 감축)**으로 줄여 모바일 초기 로딩 지연 및 청크 경고 완전 해소
- **오프라인 복구 시나리오 검증**: 브라우저/기기 네트워크 단절 상태에서 루틴 수정·체크 후 온라인 복귀 시 `offlineQueue.ts`의 자동 플러시 및 상단 동기화 배지 상태 전환 검증
- **과거 데이터 무결성 정책 검증**: 날짜 변경 시 이전 일자의 수정 폼이 자동으로 읽기 전용 뷰어 모드로 전환되는 정책 검증 완료

## 기술 검증 및 트러블 슈팅

### 1. Android Chromium WebView에서 첫 축하 애니메이션 실행 시 화면 백화(White Screen) 크래시 해결

- **문제**: Capacitor로 패키징된 안드로이드 WebView 환경에서 루틴 완료 시 축하 애니메이션(Confetti)이 실행되는 순간, 화면 전체가 하얗게 멈추며 렌더링이 먹통이 되는 치명적인 버그가 발생했습니다.
- **원인**: `canvas-confetti`의 기본 인스턴스가 `useWorker: true`로 동작하여 백그라운드 Web Worker와 `OffscreenCanvas.transferControlToOffscreen()`을 사용하는데, Android Chromium WebView 환경에서 첫 실행 시 동적 캔버스를 DOM에 붙이고 즉시 Worker로 제어권을 넘기면 GPU Compositor Context 충돌(Surface crash / invalidation)이 발생함을 규명했습니다.
- **해결**: `utils/confetti.ts` 컨트롤러를 신설해 `useWorker: false`를 강제 지정하여 검증된 메인 스레드 2D Context를 직접 사용하도록 변경하고, `index.html`에 `#global-confetti-canvas`를 미리 정적으로 마운트하여 동적 DOM 추가/제거 및 레이어 재생성 오버헤드를 원천 제거했습니다.
- **결과**: 안드로이드 저사양 실기기 및 WebView 환경에서도 화면 멈춤 없이 60fps의 부드러운 애니메이션이 안정적으로 렌더링됨을 검증했습니다.

### 2. 단일 번들 크기 과다(537kB)로 인한 초기 로딩 지연 및 빌드 경고 해결

- **문제**: 초기 빌드 시 모든 화면과 외부 라이브러리가 단일 엔트리에 포함되어 번들 크기가 **537.10kB(gzip 153kB)**를 초과했고, 모바일 환경 초기 로딩 지연 및 Vite 청크 크기 경고가 발생했습니다.
- **원인**: 초기 진입에 불필요한 통계 뷰·독서 서재·모달 컴포넌트(`AuthModal`, `AiReportModal`, `GrowthReceiptModal`)와 대형 벤더 라이브러리가 지연 로딩 없이 일괄 번들링되었습니다.
- **해결**: `vite.config.ts`의 `manualChunks`로 벤더 번들(`react-vendor`, `supabase-vendor`, `ui-vendor`)을 분리하고, 비초기 화면 및 모달에 `React.lazy`와 `Suspense` 코드 분할을 적용했습니다.
- **결과**: 메인 엔트리 번들 크기를 **537.10kB → 34.79kB로 약 93.5% 감축**했으며, 빌드 경고 제거 및 모바일 초기 렌더링 체감 속도를 크게 개선했습니다.

### 3. 오프라인 상태에서 루틴 변경 시 데이터 유실 및 상태 불일치 문제

- **문제**: 지하철 등 네트워크 단절 환경에서 루틴을 체크·수정할 경우 Supabase 요청이 실패해 변경 데이터가 유실되거나 로컬/서버 상태가 어긋났습니다.
- **원인**: 온라인 연결만 가정한 동기식 API 호출 구조로 인해 실패 요청의 재시도·복구 메커니즘이 부재했습니다.
- **해결**: 멱등성(Idempotency)을 보장하는 로컬 큐(`offlineQueue.ts`)를 설계해 미전송 작업을 저장하고, `window.online` 이벤트 감지 시 `flushOfflineQueue`로 일괄 동기화하며 헤더에 펜딩 상태 배지를 표시했습니다.
- **결과**: 오프라인 전환/복구 반복 테스트에서도 데이터 유실 없이 상태 일관성이 유지됨을 검증했습니다.

### 4. 미활성화 OAuth 로그인 시도 시 로우 레벨 API 에러 직접 노출 방지

- **문제**: OAuth 프로바이더가 비활성화된 환경에서 소셜 로그인 클릭 시 `provider is not enabled` 원문 에러가 그대로 노출되어 사용자 이탈 우려가 있었습니다.
- **원인**: Supabase Auth 응답 에러가 UI 친화적 매핑 없이 컴포넌트에 직노출되었습니다.
- **해결**: `AuthModal.tsx`에 에러 파싱 체인을 구축해 미활성화 오류 감지 시 즉시 이용 가능한 '이메일 간편 로그인' 우회 안내로 자동 변환했습니다.
- **결과**: 예외 상황에서도 사용자가 막히지 않고 즉시 서비스를 체험할 수 있는 안전한 인증 UX를 확보했습니다.

## 배운 점 및 회고

- **모바일 하이브리드 앱과 GPU 렌더링 메커니즘 체득**: 단순히 웹을 래핑하는 수준을 넘어, Web Worker와 OffscreenCanvas가 Android Chromium WebView GPU 파이프라인에 미치는 영향을 직접 추적하고 디버깅하며 실무 모바일 브라우저 렌더링에 대한 깊은 이해를 얻었습니다.
- **비즈니스 모델(BM)과 상용화 관점의 제품 개발**: 서비스 개발이 기능 구현에서 끝나는 것이 아니라 Google AdMob 광고 연동, Pro 구독 모델 설계, 플레이스토어 심사 기준 정책까지 고려해야 지속 가능한 제품이 된다는 점을 체득했습니다.
- **AI 고속 개발과 엔지니어링 검증의 균형**: AI 도구를 활용해 프로토타입과 UI를 빠르게 구현할 수 있었지만, 오프라인 멱등성 큐 설계, 번들 93.5% 감축, 순수 Canvas 영수증 드로잉 같은 핵심 품질 검증은 직접 병목을 계측하고 구조를 설계할 때 비로소 완성된다는 점을 실감했습니다.
