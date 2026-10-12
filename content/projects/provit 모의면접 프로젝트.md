## 프로젝트 소개

* **프로젝트명**: Provit (프로빗)
* **개요**: Spring Framework (MVC) 및 React 19 기반 풀스택 취업 지원 웹 플랫폼. AI 모의면접, 서류(자소서/포트폴리오) 첨삭, 채용공고 수집 및 맞춤 추천, 운세(사주) 기반 직무 추천, 커뮤니티 및 스터디 모집 기능을 제공.
* **기술 스택**:
  * **Backend**: Spring Framework (MVC) 5.3.39 (JDK 17), Apache Tomcat 9.0.x, MyBatis, HikariCP, Jsoup
  * **Database**: Oracle Database 19c
  * **Frontend**: React 19, Vite, Axios, React Router, Lucide Icons, Bootstrap
  * **협업 & 형상관리**: Git, GitHub (Git-Flow 전략)

## 본인 역할

* **담당자**: `wnsgk0509` (프로젝트 리포지토리 소유자 및 핵심 개발자)
* **DB 스키마 설계 및 형상 관리**:
  * 전체 테이블, 시퀀스, 제약조건 설계 (`schema.sql`, `drop.sql`).
  * 사람인 표준 직군 21개 및 세부 직무 2,178개 시드 데이터 구성 (`seed_saramin_jobs.sql`).
* **채용공고 도메인 풀스택 개발**:
  * Jsoup 기반 사람인 채용공고 웹 크롤러 (`SaraminCrawler`) 및 수집/정리 스케줄러 (`RecruitmentScheduler`) 구현.
  * 채용공고 목록 조회, 검색, 필터링 REST API 및 UI (`JobList`) 구현.
  * 채용공고 스크랩(북마크) 토글 및 모아보기 기능 구현.
* **사용자 맞춤형 채용공고 추천 시스템**:
  * 회원 선호 직무 및 대표 이력서 기반 채용공고 매칭 추천 로직 구현 (`RecruitmentServiceImpl`).
* **운세(사주) 도메인 및 자체 만세력 엔진 구축**:
  * 외부 `sazu.app` REST API 연동 (`SazuApiClient`) 및 운세 기반 맞춤 직무/채용공고 추천.
  * API 키 유무 및 무료/유료 요금제 조건에 따른 분기 처리 logic 및 자체 로컬 만세력 엔진 (`LocalSazuEngine`) 개발.
* **공통 파일 업로드 시스템 구축**:
  * 카테고리별(`PORTFOLIO`, `POST`, `PROFILE`) 허용 확장자, 최대 용량, 저장 경로를 관리하는 `FileCategory` 및 파일 업로드 모듈 개발.
* **프로젝트 환경 안정화 및 refactoring**:
  * OS(Windows) 환경의 Git 대소문자 중복 파일 표준화 및 빌드 의존성 오류 핫픽스 진행.

## 핵심 기능

* **채용공고 웹 크롤링 및 자동 스케줄링**:
  * `SaraminCrawler`를 활용해 사람인 채용 공고 데이터를 실시간 크롤링하여 `T_RECRUITMENT` 테이블에 동기화.
  * `@Scheduled` 및 `ContextRefreshedEvent` 기반 비동기 스레드 실행으로 매일 자정/새벽 마감 공고 비활성화 및 180일 이상 지난 미스크랩 공고 영구 삭제(Purge) 처리.
* **조건별 채용공고 검색 및 맞춤 추천**:
  * 대표 이력서 직무 정보를 우선 적용하고, 이력서가 없을 경우 회원 기본 설정 직무 및 인기 공고로 자동 Fallback 처리.
  * 대분류 직군 선택 시 하위 세부 직무 매칭(`EXISTS` 서브쿼리) 및 최신순/마감임박순 정렬 탭 제공.
* **운세(사주) 기반 직무 및 공고 추천**:
  * 외부 만세력 API와 자체 개발 로컬 엔진(`LocalSazuEngine`)을 조합한 분기형 운세 서비스 제공.
  * 생년월일시 입력 기반 운세 해석 결과와 연계된 직무 조언 및 맞춤 공고 추천 카드 제공.
* **공고 스크랩 및 관리자 권한 제어**:
  * 유저별 공고 북마크 기능(`T_JOB_SCRAP`) 제공.
  * 관리자(ADMIN) 권한 검증을 거친 수동 동기화 및 마감 처리 API 보안 적용.
* **카테고리 기반 공통 파일 업로드**:
  * `FileCategory` Enum을 통해 업로드 목적별(PDF 포트폴리오, 게시글 이미지 등) 확장자 검증, 용량 제한, 저장 디렉토리 분리 적용.

## 트러블 슈팅 및 해결

* **외부 운세 API 미설정 및 무료 키 제한에 따른 서비스 중단 방지**:
  * *문제 원인*: 외부 사주 API 키가 설정되어 있지 않거나 무료 샌드박스 키(`sazu_free_`)일 경우 외부 호출 실패로 오류가 발생할 수 있음.
  * *해결 로직*: `SazuApiClient`에 `isConfigured()` 및 `isFreeTier()` 검증을 추가하여 API 키 상태를 엄격히 판별함. 외부 API 키가 없거나 무료 플랜일 경우, 직접 구현한 `LocalSazuEngine`을 호출하도록 `FortuneServiceImpl`에 유연한 Fallback 분기 구조를 적용함.
* **서버 기동 시 크롤링 작업으로 인한 Tomcat 부팅 지연 문제**:
  * *문제 원인*: Spring 컨텍스트 동기화 시점(`ContextRefreshedEvent`)에 웹 크롤링을 동기 실행할 경우 서버 기동 타임아웃 및 DB 커넥션 풀 미안정 에러 발생.
  * *해결 로직*: `RecruitmentScheduler` 내 `CompletableFuture.runAsync()`를 적용해 초기 크롤링 작업을 비동기 스레드로 전환하고, `Thread.sleep(3000)` 대기 시간을 두어 HikariCP 커넥션 풀이 완전 안정화된 후 동작하도록 수정.
* **Windows Git 대소문자 파일명 중복 충돌 버그**:
  * *문제 원인*: Windows 파일 시스템 특성상 대소문자만 다른 파일(`UserDao.java` / `UserDao.java` 및 DTO 등)이 중복 추적되어 빌드 실패가 발생함.
  * *해결 로직*: 중복 추적되던 DTO/DAO 파일들을 정리 및 단일화하고, `refactor(auth)` 커밋을 통해 파일명을 표준 패턴으로 교체 및 재정립.
* **공고 스크랩 토글 및 데이터 동기화 시 DB 제약조건 위반**:
  * *문제 원인*: 동시 스크랩 요청 또는 크롤링 공고 중복 적재 시 PK/UNIQUE 제약조건 충돌 예외 발생.
  * *해결 로직*: MyBatis XML에 `MERGE INTO` 구문을 적용하고, 백엔드 단에서 `DataIntegrityViolationException` 예외 catch 처리를 적용하여 정교하게 동시성을 제어함.

## 배운 점 및 회고

* **외부 API 의존성 격리 및 Fallback 설계의 유용성**:
  * 외부 REST API 서비스의 가용성 이슈에 대비해 시스템 내부에 복구용 로컬 도메인 엔진(`LocalSazuEngine`)을 구축해 둠으로써 외부 환경 변화에도 끊김 없는 서비스를 제공하는 방어적 프로그래밍을 경험함.
* **비동기 처리와 정기 배치 스케줄링 활용**:
  * 크롤링과 같은 무거운 I/O 작업을 메인 부팅 스레드와 분리(`CompletableFuture`)하고, `@Scheduled` 기반 배치 스케줄러로 데이터 주기 관리 및 정리를 자동화하는 경험을 쌓음.
* **형상 관리 및 파일 시스템 컨벤션의 중요성**:
  * 다양한 OS 환경에서 작업하는 팀 프로젝트에서 Git 대소문자 구별 및 네이밍 컨벤션을 철저히 유지해야 빌드 및 형상 관리 문제를 방지할 수 있음을 체득함.