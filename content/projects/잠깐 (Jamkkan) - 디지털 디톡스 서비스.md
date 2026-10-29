# 잠깐 (Jamkkan) - 디지털 디톡스 서비스

URL: https://github.com/wnsgk0509/first_button
기술: React Native, TypeScript, Android Kotlin, Supabase, PWA
날짜: 2026년 10월 21일 → 2026년 10월 29일
팀구성: 개인 프로젝트
역할: 전 기능 1인 개발 (기획/설계, RN 앱 & PWA 개발, Android 네이티브 브릿지 및 위젯 구현, Supabase BaaS 구축)

## 프로젝트 소개

**잠깐 (Jamkkan)**은 지루함을 견디지 못해 무의식적으로 스마트폰을 켜는 현대인을 위해, 스마트폰 켜는 순간 3초의 쉼표를 건네고 하루 1개의 성찰 질문을 마주하게 하는 **디지털 디톡스 & 생각 기록 서비스**입니다.

웹(PWA)으로 시작하여 안드로이드 홈화면 위젯, 잠금화면 알림, 실시간 익명 커뮤니티(BaaS)까지 확장한 모바일 풀스택 프로젝트입니다.

- **Frontend & App**: React Native 0.88, React 19, TypeScript
- **Native Android**: Kotlin, Android SDK (AppWidgetProvider, AlarmManager, WindowInsetsControllerCompat)
- **Backend / Database**: Supabase (PostgreSQL, Row Level Security, REST API)
- **Web & Deploy**: Vanilla JS, Service Worker (PWA), GitHub Pages

## 본인 역할

기획부터 디자인, 프론트엔드, 안드로이드 네이티브 모듈, 클라우드 BaaS 구축까지 전 과정을 1인 주도 개발하였습니다.

- **디지털 디톡스 UX 기획 및 PWA 개발**: 무의식 스크롤을 막는 3초 멈춤 게이트 및 오프라인 캐싱 지원 PWA 웹서비스 구축 및 배포
- **React Native 네이티브 앱 전환 및 최적화**: 4개 탭 구조(오늘, 기록, 광장, 설정) 구현 및 Edge-to-Edge 전면 화면 SafeArea 동적 대응, 키보드 인터랙션 최적화
- **안드로이드 네이티브(Kotlin) 브릿지 개발**: 홈화면 상시 질문 노출 위젯(`AppWidgetProvider`), 설정 시간 자동 알림 푸시(`AlarmManager`), 몰입 모드(하단 소프트키 자동 숨김) 구현
- **클라우드 BaaS(Supabase) 실시간 광장 구축**: 서버리스 아키텍처 기반의 실시간 익명 성찰 피드 연동, RLS 보안 정책 및 오프라인-퍼스트 캐싱 설계
- **텍스트 마이닝 기반 주간 리포트 개발**: 불용어 필터링 및 단어 빈도 분석 알고리즘을 통한 사용자 성찰 키워드 TOP 5 자동 추출

## 핵심 기능

- **행동 인터셉트 및 성찰 일기**:
  - 3초 멈춤 게이트: 앱 실행 시 3초간 서클 애니메이션과 함께 도파민 습관 행동을 일시 중단시키는 인터셉터
  - 하루 한 질문 & 성찰 일기: 매일 날짜 시드 기반의 새로운 성찰 질문 출제, 답변 기록 및 연속 기록(Streak) 로컬 영속화
  - 4-4-4-2 호흡 가이드: 기록 전 차분하게 심신을 안정시키는 박스 브리딩 가이드
  - 감성 질문 공유: '오늘의 질문'을 네이티브 공유 API를 통해 카카오톡/인스타그램으로 즉시 공유
- **안드로이드 시스템 네이티브 연동**:
  - 홈화면 위젯: 폰을 켜면 홈화면에서 오늘의 질문을 바로 확인하고 터치 시 앱으로 딥링크 연결
  - 잠금화면 기상 알림: 사용자가 지정한 시간(예: 오전 7시)에 알림바 및 잠금화면에 오늘의 질문 푸시
  - 몰입 모드(Immersive Mode): 하단 3버튼 소프트키 자동 숨김 및 제스처 시 일시 노출
- **데이터 분석 및 실시간 광장**:
  - 주간 성찰 리포트: 최근 7일 요일별 성찰 달성률 시각화 및 자주 사용된 생각 단어 빈도 분석(키워드 TOP 5)
  - 실시간 익명 광장: Supabase PostgreSQL을 연동하여 같은 질문에 대한 다른 유저들의 생각을 실시간 조회하고, 내 답변을 익명으로 나누며 '🌿 공감해요' 반응 인터랙션 지원

## 트러블 슈팅 및 해결

### 1. 최신 안드로이드 Edge-to-Edge 전면 화면 오버랩 현상

- **문제**: 안드로이드 15+ 전면 화면(Edge-to-Edge) 적용으로 인해 상단 시스템 상태바(시계/배터리)와 하단 3버튼 소프트키가 앱의 헤더 및 탭바 버튼을 가려 터치가 불가능한 UI 오버랩 발생
- **해결**: `react-native-safe-area-context`의 `SafeAreaProvider` 및 `useSafeAreaInsets`를 도입하여 디바이스별 상하단 시스템 영역 높이를 픽셀 단위로 동적 계산하고, 상단 헤더 패딩 및 하단 탭바 패딩에 반영하여 다양한 스마트폰 해상도에서도 완벽하게 분리된 뷰포트 확보

### 2. 가상 키패드 활성화 시 입력창 가림 및 시인성 저하

- **문제**: 일기 작성 시 가상 키보드가 올라오면 입력창이 키보드 뒤에 가려져 사용자가 자신이 작성 중인 내용을 보려면 수동으로 스크롤을 내려야 하는 불편함 발생
- **해결**: `Keyboard.addListener`로 키패드 오픈/닫힘 이벤트를 감지하여 스크롤뷰의 하단 여백을 키패드 높이만큼 동적으로 확장하고, `scrollToEnd({ animated: true })`를 적용하여 텍스트 입력창과 저장 버튼이 키보드 바로 위로 자동 스크롤되도록 개선. 또한 입력 중에는 하단 탭바를 자동 숨김 처리하여 타이핑 영역을 극대화

### 3. AAPT2 이미지 바이너리 헤더 불일치로 인한 리소스 컴파일 에러

- **문제**: 릴리즈 APK 빌드(`assembleRelease`) 도중 `Android resource compilation failed (AAPT: error: file failed to compile)` 발생하며 빌드 실패
- **해결**: 원본 아이콘 파일이 확장자만 `.png`이고 실제 헤더는 JPEG(`0xFF 0xD8 ... JFIF`) 규격이었음을 바이너리 레벨에서 파악. C#/.NET `System.Drawing` 파이프라인을 구축해 실제 PNG 포맷(`\x89PNG`)으로 리인코딩하고, 안드로이드 5대 밀도별(`mdpi`~`xxxhdpi`)로 자동 변환 배치하여 리소스 컴파일을 100% 정상화

## 배운 점 및 회고

- **기획 중심의 기술 선정**: 단순 클론 코딩이 아닌 "스마트폰 무의식 스크롤 차단"이라는 명확한 문제를 해결하기 위해, 웹(PWA)에서 Android Native(위젯, AlarmManager)로 확장해 나가는 제품 개발 라이프사이클 체득
- **네이티브 브릿지 개발 역량**: React Native 환경에서 외부 라이브러리에만 의존하지 않고, Kotlin으로 Android Native Module(`AppWidgetProvider`, `BroadcastReceiver`, `WindowInsetsControllerCompat`)을 직접 작성하고 브릿지로 연결하는 풀스택 모바일 구현 역량 확보
- **BaaS 클라우드 아키텍처 이해**: 서버 구축 없이도 Supabase와 RLS(Row Level Security) 정책을 활용하여 안전하고 빠른 실시간 커뮤니티 기능을 완성하는 클라우드 네이티브 개발 생산성 경험
