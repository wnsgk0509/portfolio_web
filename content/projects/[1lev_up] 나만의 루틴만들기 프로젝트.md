---
title: "1lev_up - 나만의 최소 루틴 & 습관 관리 시스템"
period: "2026.11"
role: "프론트엔드 UI 및 오프라인 아키텍처 1인 개발 (기여도 100%)"
techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Vite", "PWA"]
githubUrl: "https://github.com/wnsgk0509/1lev_up"
published: true
order: 1
---

# 1lev_up - 나만의 최소 루틴 & 습관 관리 시스템

URL: https://github.com/wnsgk0509/1lev_up
기술: React, TypeScript, Tailwind CSS, Supabase, Vite, PWA
날짜: 2026년 11월
팀구성: 개인 프로젝트
역할: 프론트엔드 UI 및 오프라인 아키텍처 1인 개발 (기여도 100%)

## 프로젝트 소개

* **서비스명**: 1lev_up (하루 1레벨 업 최소 습관 & 루틴 시스템)
* **개요**: 《아주 작은 습관의 힘》과 《원씽(The ONE Thing)》의 핵심 원리를 적용하여, 컨디션이 좋지 않은 날에도 무너지지 않고 지킬 수 있는 '최소 실행 가능 루틴(Minimum Viable Routine)'을 세우고 관리할 수 있도록 돕는 서비스입니다.
* **주요 목표**: 의사결정 피로를 줄이기 위해 전날 밤 지정한 목표(One Thing)를 다음 날 자동으로 연동하고, 오프라인 환경에서도 안정적으로 실행되는 PWA 기반 습관 관리 환경을 제공합니다.

---

## 본인 역할

* **개발자**: `wnsgk0509` (단독 기여)
* **프론트엔드 및 UI 개발**: React, TypeScript, Tailwind CSS 기반 메인 대시보드, 타임라인 루틴 체크리스트, 독서 서재, 통계 뷰 및 모달 컴포넌트 전체 구현
* **클라우드 연동 및 데이터 마이그레이션**: Supabase 연동, 이메일/OAuth 인증 구조 구현, 로컬스토리지 데이터를 클라우드로 스마트 병합하는 마이그레이션 모듈 구축
* **오프라인 퍼스트 동기화 시스템**: 네트워크 단절 시 데이터 유실을 방지하는 멱등성(Idempotent) 기반 오프라인 큐(`offlineQueue.ts`) 및 자동 플러시(Auto-flush) 로직 작성
* **PWA 및 빌드 최적화**: `vite-plugin-pwa` 및 Workbox 기반 오프라인 캐싱, 서비스 워커 업데이트 토스트(`ReloadPrompt`) 구현, `React.lazy` 및 `manualChunks` 설정을 통한 코드 분할(Code Splitting) 적용

---

## 핵심 기능

* **오늘의 The ONE Thing**: 전날 밤 작성한 내일의 우선 과업 자동 연동, 컨디션 저하 시 원클릭 '독서 15분' 대체 기능, 달성 시 콘페티 애니메이션 제공
* **타임라인 기반 최소 루틴 체크리스트**: 기상, 산책, 몰입 타이머 등 기본 추천 루틴 제공 및 인라인 수정, 순서 변경, 커스텀 루틴 추가/삭제 관리
* **독서 서재 & 하루 회고**: 읽은 책 문장과 인사이트 기록/검색, 기분 상태 체크 및 하루 일기 작성, 취침 전 내일의 One Thing 사전 설정
* **동기부여 및 통계**: 연속 달성 스트릭(Streak) 카운터, 월간 캘린더 달성 현황 시각화, JSON 파일 기반 데이터 내보내기/가져오기 백업 지원
* **PWA & 클라우드 데이터 동기화**: 브라우저 로컬 저장 기능 외 Supabase 연동 지원, 서비스 워커 오프라인 실행 및 설치(A2HS), 오프라인 큐 기반 네트워크 재연결 시 자동 클라우드 동기화

---

## 트러블 슈팅 및 해결

### 1. 단일 번들 크기 과다로 인한 초기 로딩 지연 및 빌드 경고 해결

* **문제 원인**: 초기 개발 진행 과정에서 비초기 진입 컴포넌트와 외부 라이브러리가 단일 메인 엔트리로 포함되어 빌드 청크 크기가 537kB(gzip 153kB)를 초과하였고, Vite 빌드 시 청크 크기 경고 발생 및 모바일 환경에서의 초기 로딩 지연이 발생함.
* **해결 방법**:
  1. `vite.config.ts`의 `build.rollupOptions.output.manualChunks` 설정을 적용하여 `react-vendor`, `supabase-vendor`, `ui-vendor` 등으로 청크 분리.
  2. `App.tsx`에서 초기 화면에 즉시 필요하지 않은 탭(`StatsView`, `BooksView`)과 모달 컴포넌트(`RecordModal`, `EveningTimerModal`, `AuthModal` 등)를 `React.lazy` 및 `Suspense` 기반 지연 로딩으로 전환.
* **수정 코드 로직 (`vite.config.ts` / `App.tsx`)**:
  ```typescript
  // vite.config.ts
  manualChunks: {
    'react-vendor': ['react', 'react-dom'],
    'supabase-vendor': ['@supabase/supabase-js'],
    'ui-vendor': ['lucide-react', 'canvas-confetti'],
  }

  // App.tsx
  const StatsView = lazy(() => import('./components/StatsView').then(m => ({ default: m.StatsView })));
  const BooksView = lazy(() => import('./components/BooksView').then(m => ({ default: m.BooksView })));
  ```
* **결과**: 메인 엔트리 번들 크기가 **537.10kB에서 34.79kB(약 93.5% 감소)**로 대폭 줄어들었으며, 빌드 경고 해소 및 초기 로딩 속도 개선.

### 2. 오프라인 상태에서 루틴 변경 시 데이터 유실 및 클라우드 동기화 실패 문제

* **문제 원인**: 지하철 등 네트워크 미연결 환경에서 루틴 상태를 토글할 경우, Supabase 클라우드 동기화 요청이 실패하여 변경 사항이 유실되거나 서버와 클라이언트 간 상태 불일치 발생.
* **해결 방법**:
  1. 멱등성(Idempotency)을 보장하는 오프라인 동기화 큐 서비스(`offlineQueue.ts`)를 신설하여 날짜 및 루틴 단위의 펜딩 변경 사항을 로컬 큐에 저장.
  2. `window`의 `online` 이벤트를 감지하여 네트워크 재연결 시 `flushOfflineQueue` 함수가 큐에 쌓인 요청을 자동으로 일괄 반영(auto-flush)하도록 구축.
  3. UI 상단(`Header.tsx`)에 네트워크 상태 및 미동기화 펜딩 개수 배지를 노출하여 사용자에게 상태 안내.
* **수정 코드 로직 (`src/App.tsx`, `src/services/cloudSync.ts`)**:
  ```typescript
  // App.tsx
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (user) {
        setIsSyncing(true);
        flushOfflineQueue(user.id).then((remaining) => {
          setPendingSyncCount(remaining);
          setIsSyncing(false);
        });
      }
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [user]);
  ```
* **결과**: 오프라인 상태에서 수행한 변경 사항이 네트워크 재연결 시 자동으로 동기화되어 데이터 유실 제로 보장 및 최종 일관성(Eventual Consistency) 확보.

### 3. 미활성화된 OAuth 로그인 시도 시 사용자 친화적이지 않은 오류 노출

* **문제 원인**: Supabase 대시보드에서 소셜 로그인 프로바이더가 활성화되지 않은 상태에서 사용자가 구글/카카오 로그인 클릭 시 `provider is not enabled` 등의 로우 레벨 API 에러 문구가 그대로 노출됨.
* **해결 방법**: `AuthModal.tsx` 내 예외 처리 로직에 에러 메세지 파싱 체인을 추가하여, 프로바이더 미활성화 오류 감지 시 설정 없이 즉시 이용 가능한 '이메일 간편 로그인'으로 안내하는 명확한 안내 문구로 변환.
* **수정 코드 로직 (`src/components/AuthModal.tsx`)**:
  ```typescript
  catch (err: any) {
    const errMsg = err?.message || err?.msg || '';
    if (errMsg.includes('provider is not enabled') || errMsg.includes('validation_failed')) {
      setMessage({
        type: 'error',
        text: `선택하신 ${provider === 'google' ? 'Google' : '카카오'} 로그인이 아직 활성화되지 않았습니다. 지금 바로 테스트하시려면 아래의 '이메일 간편 로그인'을 이용해주세요!`,
      });
    } else {
      setMessage({ type: 'error', text: errMsg || '로그인 중 오류가 발생했습니다.' });
    }
  }
  ```
* **결과**: 예외 상황 발생 시 사용자 혼란 방지 및 서비스 이탈 완화.

---

## 배운 점 및 회고

* **오프라인 퍼스트(Offline-First) 설계 역량 강화**: 모바일 웹 서비스에서 오프라인 큐와 재연결 이벤트를 다루면서 오프라인 환경에서도 끊김 없는 UX를 제공하고 데이터 정합성을 유지하는 설계를 경험했습니다.
* **성능 최적화 기법 습득**: `manualChunks`와 `React.lazy`를 조합한 하이브리드 코드 분할을 적용하며 메인 번들 크기를 90% 이상 감축하는 경험을 통해, 번들링 최적화가 초기 로딩 UX에 미치는 영향을 체감했습니다.
* **엔지니어링 문서화 및 자산화**: 프로젝트 지침 문서(`agent.md`)에 커밋 컨벤션(1 Feature = 1 Commit, Problem-Solution-Impact 구조)을 정립하여, 개발 과정의 기술적 결정과 트러블 슈팅 내역이 지속 가능한 개발 기록으로 남을 수 있도록 관리했습니다.
