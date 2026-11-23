---
published: true
order: 4
categoryBadge: "모바일 · 네이티브 확장"
summary: "무의식적 스마트폰 스크롤을 끊어주는 3초 멈춤 디지털 디톡스 앱. 웹(PWA)에서 출발해 React Native + Android Kotlin 네이티브 위젯·알람 브릿지까지 확장하고, Android 15 실기기 UI 및 AAPT2 릴리즈 빌드를 검증했습니다."
thumbnail: "/projects/jamkkan.png"
---

# 잠깐 (Jamkkan) — 디지털 디톡스 & 성찰 기록 앱

URL: https://github.com/wnsgk0509/first_button
기술: React Native, TypeScript, Android Kotlin, Supabase, PWA
날짜: 2026년 10월 21일 → 2026년 11월 03일
팀구성: 개인 프로젝트 (1인 개발)
역할: 문제 정의·기획, PWA → React Native 확장, Android Kotlin 네이티브 위젯/알람 브릿지 구현, Supabase 익명 광장 클린 정책 및 실기기 릴리즈 빌드 검증

## 프로젝트 소개

**잠깐 (Jamkkan)**은 지루함을 견디지 못해 무의식적으로 스마트폰을 켜는 습관을 끊어주기 위해, 앱 실행 시 **3초의 멈춤 게이트**를 건네고 하루 1개의 성찰 질문을 마주하게 하는 **디지털 디톡스 & 생각 기록 서비스**입니다.

웹(PWA) MVP로 핵심 가설을 먼저 구현한 뒤, 스마트폰 습관에 실제로 개입하기 위해 **React Native + Android Kotlin 네이티브 모듈(홈화면 위젯, 잠금화면 알림, 몰입 모드)**과 **Supabase 실시간 익명 광장(신고/차단 클린 정책)**까지 확장한 모바일 풀스택 프로젝트입니다.

- **Frontend & Mobile**: React Native 0.88, React 19, TypeScript
- **Native Android**: Kotlin, Android SDK (`AppWidgetProvider`, `AlarmManager`, `WindowInsetsControllerCompat`)
- **Backend / Database**: Supabase (PostgreSQL, Row Level Security, REST API)
- **Initial MVP & Web**: Vanilla JS, Service Worker (PWA), GitHub Pages

## 기획 및 문제 정의

- **해결하려는 문제**: 웹(PWA)만으로는 사용자가 스마트폰을 켜는 순간에 직접 개입할 수 없어 디지털 디톡스 효과가 제한적이었습니다.
- **설계 전략**: 웹 MVP로 핵심 인터랙션(3초 멈춤 + 하루 1질문)을 먼저 검증한 뒤, OS 레벨 개입이 가능한 **홈화면 상시 위젯과 지정 시간 알림**을 제공하기 위해 React Native + Kotlin 네이티브 브릿지로 아키텍처를 확장했습니다.

## 본인 역할

기획·UX 설계부터 PWA 프로토타입, React Native 앱 전환, Kotlin 네이티브 브릿지, Supabase 실시간 커뮤니티 안전 정책 및 Android 릴리즈 빌드 검증까지 **전 과정을 1인 주도 개발**했습니다.

- **PWA MVP 기획·구현 및 React Native 네이티브 앱 전환**: 3초 멈춤 게이트 PWA 구축 후, 4개 탭 구조(오늘·기록·광장·설정)의 React Native 앱으로 전환
- **Android Kotlin 네이티브 브릿지 구현**: 홈화면 질문 위젯(`AppWidgetProvider`), 지정 시간 알림(`AlarmManager`), 몰입 모드(`WindowInsetsControllerCompat`) 직접 구현 및 RN 연동
- **Supabase 실시간 익명 광장 & 스토어 심사 대응 클린 정책**: 비속어 자동 필터링 및 부적절 게시글 즉시 신고/차단(Report/Block) 기능 설계
- **데이터 주권 보호 백업 및 텍스트 마이닝 리포트**: 계정 없는 JSON 로컬 백업/복원 파이프라인과 불용어 제거 기반 주간 성찰 키워드 TOP 5 추출 구현

## 핵심 기능

- **행동 인터셉트 및 성찰 일기**:
  - **3초 멈춤 게이트**: 앱 실행 시 3초 서클 애니메이션으로 무의식적 스크롤을 차단하고 환기 유도
  - **하루 한 질문 & 4-4-4-2 호흡 가이드**: 날짜 시드 기반 매일 새로운 질문 출제, 연속 달성(Streak) 로컬 저장, 박스 브리딩 가이드 및 네이티브 SNS 공유
- **안드로이드 시스템 네이티브 연동 (Kotlin)**:
  - **홈화면 위젯 & 딥링크**: 홈화면에서 오늘의 질문을 상시 확인하고 터치 시 앱으로 바로 진입
  - **잠금화면 기상 알림 & 몰입 모드**: 설정 시간 자동 푸시 알림 및 하단 3버튼 소프트키 자동 숨김
- **데이터 분석 및 실시간 익명 광장 (UGC)**:
  - **주간 성찰 리포트**: 최근 7일 요일별 달성률 시각화 및 단어 빈도 분석(키워드 TOP 5)
  - **실시간 광장 클린 정책 & 로컬 백업**: Supabase PostgreSQL 실시간 피드, 비속어 마스킹·신고/차단 기능 및 JSON 백업/복원 지원

## 기술 검증 요약

- **Android 15 실기기 뷰포트 검증**: Edge-to-Edge 전면 화면에서 발생하던 상태바/소프트키 UI 겹침을 `SafeAreaInsets` 픽셀 단위 동적 패딩으로 해소 검증
- **입력 UX 검증**: 가상 키보드 활성화 시 입력창 가림 문제를 `Keyboard.addListener` 동적 여백 확장 + 자동 스크롤 + 하단 탭바 숨김으로 해결 검증
- **릴리즈 APK 빌드 파이프라인 검증**: `assembleRelease` 시 실패한 AAPT2 리소스 컴파일 에러를 바이너리 헤더(`0xFF 0xD8` JPEG vs `\x89PNG`) 분석으로 원인 규명하고 5대 밀도(`mdpi`~`xxxhdpi`) 자동 변환으로 빌드 통과 검증

## 기술 검증 및 트러블 슈팅

### 1. Android 15+ Edge-to-Edge 전면 화면 UI 오버랩 해결

- **문제**: Android 15 이상 전면 화면(Edge-to-Edge) 정책으로 상단 상태바와 하단 3버튼 소프트키가 앱 헤더 및 탭바를 가려 터치가 불가능한 현상이 발생했습니다.
- **원인**: 고정 패딩 레이아웃이 디바이스별 동적 시스템 인셋(System Window Insets) 영역을 반영하지 못했습니다.
- **해결**: `react-native-safe-area-context`의 `SafeAreaProvider`와 `useSafeAreaInsets`를 도입해 상하단 시스템 영역 높이를 픽셀 단위로 동적 계산해 반영했습니다.
- **결과**: 다양한 해상도 및 Android 15 실기기 환경에서 헤더·탭바 겹침 없이 안정적인 터치 영역을 확보했습니다.

### 2. 가상 키패드 활성화 시 입력창 가림 및 타이핑 시인성 저하

- **문제**: 성찰 일기 작성 시 가상 키보드가 올라오면 입력창과 저장 버튼이 가려져 수동 스크롤이 필요했습니다.
- **원인**: 스크롤 뷰의 하단 패딩이 키보드 높이에 동적으로 반응하지 않았고 하단 탭바가 화면 공간을 계속 점유했습니다.
- **해결**: `Keyboard.addListener`로 키보드 높이를 감지해 하단 여백을 동적 확장하고, `scrollToEnd({ animated: true })` 자동 스크롤 및 입력 중 하단 탭바 자동 숨김을 적용했습니다.
- **결과**: 키패드 활성화 즉시 작성 중인 문장과 저장 버튼이 가시 영역에 유지되는 매끄러운 입력 UX를 구현했습니다.

### 3. AAPT2 이미지 바이너리 헤더 불일치로 인한 릴리즈 APK 빌드 실패

- **문제**: `assembleRelease` 실행 시 `Android resource compilation failed (AAPT: error: file failed to compile)` 에러로 릴리즈 빌드가 중단되었습니다.
- **원인**: 리소스 아이콘 파일의 확장자만 `.png`였을 뿐 실제 파일 시그니처(매직 넘버)가 JPEG(`0xFF 0xD8 ... JFIF`) 규격임을 바이너리 레벨 검사로 파악했습니다.
- **해결**: C#/.NET `System.Drawing` 변환 스크립트를 작성해 실제 PNG 포맷(`\x89PNG`)으로 리인코딩하고 안드로이드 5대 밀도(`mdpi`~`xxxhdpi`) 폴더에 자동 배치했습니다.
- **결과**: AAPT2 리소스 컴파일 에러를 완전히 해소하고 정상적인 릴리즈 APK 빌드를 완료했습니다.

## 배운 점 및 회고

- **문제가 기술을 결정하는 제품 중심 사고**: "스마트폰을 켜는 순간에 개입한다"는 기획 목표를 달성하기 위해 웹(PWA)에 안주하지 않고 React Native와 Kotlin 네이티브 브릿지까지 기술 경계를 확장한 경험이었습니다.
- **상용 배포 기준을 고려한 검증 습관**: UGC 익명 광장의 악성 콘텐츠 대응(비속어 필터·신고/차단), 로그인 없는 데이터 백업, 바이너리 레벨 릴리즈 빌드 디버깅까지 실제 출시 관점의 완성도를 고민했습니다.
