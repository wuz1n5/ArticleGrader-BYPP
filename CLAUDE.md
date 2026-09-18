# ArticleGrade

사용자의 이해 수준에 맞춰 최신 과학·기술 기사를 보여주는 웹사이트.

## 현재 상태

- Next.js + TypeScript + Tailwind 기반 프론트엔드 MVP 완성, GitHub/Vercel에 배포됨.
- 카테고리 필터, Lv.1~Lv.5 난이도 필터, Featured Article / Recently Published UI 동작 중.
- 기사 데이터는 아직 `src/data/articles.json` local mock JSON.
- 현재 진행 중인 작업: Mock JSON을 실제 데이터로 교체하기 위해 ScienceDaily RSS 하나만 우선 연동.
  자세한 원칙은 아래 "다음 개발 단계: ScienceDaily RSS 연동" 참고.

## 핵심 아이디어

- 사용자는 여러 과학 분야의 최신 기사를 볼 수 있다.
- 모든 기사는 이해 수준에 따라 Lv.1 ~ Lv.5로 분류된다.
- 주요 기사 출처로 ScienceDaily, IEEE Spectrum을 고려 중 (ScienceDaily만 연동 진행 중, IEEE Spectrum은 아직 미연동).
- ScienceDaily 연동이 안정화되기 전까지 UI/필터 개발은 계속 Mock 데이터 기준으로 검증 가능해야 한다.

## 난이도 기준 (Lv.1 ~ Lv.5)

| 레벨 | 이름 | 기준 |
|---|---|---|
| Lv.1 | 입문 | 배경지식 없이 읽을 수 있는 과학 이야기. 예: "양자컴퓨터란 무엇인가?" |
| Lv.2 | 기초 | 기본적인 과학 용어가 조금 등장. 예: qubit 같은 기본 개념 |
| Lv.3 | 중급 | 여러 과학 개념을 알아야 이해 가능. 예: quantum entanglement, encryption |
| Lv.4 | 고급 | 알고리즘, 실험 방법, 기술적 원리까지 다룸 |
| Lv.5 | 전문 | 논문에 가까운 연구 내용. 수식, 실험 방법, 전문 용어가 많이 등장 |

새 기사를 다루거나 분류 로직을 작성할 때는 이 기준을 그대로 따를 것.

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS

## 현재 단계에서의 제약 (중요)

다음은 아직 하지 않는다. 요청받지 않는 한 임의로 도입하지 말 것.

- DB 사용 안 함 (PostgreSQL 포함)
- Supabase 사용 안 함
- 검색 기능 구현 안 함
- 로그인/인증 기능 구현 안 함
- IEEE Spectrum 연동 안 함 (ScienceDaily 하나만 우선 진행)
- ScienceDaily 원문 전체 저장/복제 안 함 (제목, 요약, URL, 출처, 발행일 등 메타데이터만 사용)
- 기사 난이도/분야 자동 분류 로직 구현 안 함 (ScienceDaily에서 가져온 기사도 당분간 수동/고정 값이나 처리 보류)
- 기존에 동작하는 카테고리/난이도 필터, 홈 화면 디자인을 불필요하게 변경하지 않음

## 다음 개발 단계: ScienceDaily RSS 연동

- 목표는 Mock JSON을 대체하는 것이 아니라, ScienceDaily RSS 수집이 정상적으로 되는지 먼저 확인하는 것.
- 가져오는 필드: 제목(title), 요약(summary), 원문 URL, 출처(source), 발행일(publishedAt).
- RSS에서 가져온 데이터는 기존 `Article` 타입(`src/types/article.ts`) 및 현재 UI(`ArticleCard`, `FeaturedArticle`, `ArticleGrid` 등)와 호환되는 형태로 변환해서 사용한다.
- 기사 카드를 클릭하면 원문 사이트로 이동해야 하므로 `Article`에 원문 URL(예: `originalUrl`) 필드가 필요하다. 이 URL은 ScienceDaily 원문 링크이며, 원문 내용 자체를 저장/복제하지 않는다.
- 구조 원칙:
  - 데이터 수집/파싱(RSS fetch) 로직과 UI 로직을 분리한다.
  - 외부 RSS 데이터를 내부 `Article` 형태로 변환하는 계층(어댑터/매퍼)을 수집 로직과 별도로 분리한다.
  - 모든 로직을 한 파일에 몰아넣지 않는다. 책임별로 파일을 나눈다 (예: RSS fetch, XML 파싱, Article 변환, 기존 데이터 접근 로직과의 연결).
  - 이후 Spring Boot 서버나 PostgreSQL을 추가할 가능성은 염두에 두되, 지금 단계에서 그 가능성을 이유로 과도하게 추상화하거나 레이어를 미리 만들지 않는다.
  - 기존에 동작하는 카테고리/난이도 필터(`src/lib/articles.ts` 등)와 디자인은 꼭 필요한 경우가 아니면 수정하지 않는다.

## 초기 화면 구성

- 상단: 서비스 제목 + 짧은 설명
- 그 아래: 과학 분야 navigation (분야 클릭 시 해당 분야 기사 목록으로 이동)
- 사용자가 Lv.1 ~ Lv.5 중 원하는 난이도를 선택할 수 있는 UI
- 홈 화면: 최신 기사들을 보여줌
  - 가장 최신/주요 기사 하나는 크게 강조해서 보여줌
  - 그 아래에 최근 기사들을 목록/그리드로 배치
- 각 기사 카드/항목에 표시할 정보: 제목, 짧은 요약, 분야(category), 난이도(Lv.1~5), 출처, 날짜

## 디자인 방향

- 전통적인 온라인 과학 잡지 느낌
- ScienceDaily의 정보 구조를 참고하되 그대로 복제하지 않음
- 밝은 배경, 콘텐츠·타이포그래피 중심
- 과도한 gradient, neon, glassmorphism, animation은 사용하지 않음
- 기사에서 category와 difficulty(Lv.1~5)가 한눈에 잘 보여야 함

## 향후 계획 (지금 단계에서 구현하지 않음)

- IEEE Spectrum RSS 연동
- 기사 분야 자동 분류
- 기사 난이도 자동 분류
- 한국어 지원 기능 검토
- 필요해지면 Spring Boot 서버 / PostgreSQL 등 Backend/DB 추가
