# 포트폴리오 사이트

백엔드 개발자 조현우의 포트폴리오입니다. Astro로 만든 정적 사이트입니다.

## 실행

```bash
npm install
```

```bash
npm run dev
```

`http://localhost:4321` 에서 확인합니다. 배포용 파일은 `npm run build` 로 `dist/` 에 만듭니다.

## 구조

| 위치 | 내용 |
| --- | --- |
| `src/pages/index.astro` | 메인 페이지 (첫 화면, 소개와 수상, 기술 스택, 대표 프로젝트, 그 밖의 프로젝트) |
| `src/pages/projects/*.mdx` | 프로젝트 상세 페이지 8개. 본문은 Markdown 으로 씁니다. |
| `src/pages/404.astro` | 없는 주소로 들어왔을 때 보여 주는 페이지. 3초 뒤 메인 페이지로 옮깁니다. |
| `src/data/projects.ts` | 프로젝트 목록(제목, 분야, 한 줄 소개, 기간, 역할, 대표 기술, 링크, 표지)과 수상, 기술 스택, 머리글 이름, 메일 주소 |
| `src/data/shots.ts` | 프로젝트별 화면 캡처 목록과 사진 설명 |
| `src/data/diagrams.ts` | 구조도의 박스와 화살표 좌표 |
| `src/data/schemas.ts` | DB 구조 그림의 표, 컬럼, 관계 |
| `src/components/ProjectCard.astro` | 메인 페이지의 프로젝트 카드 |
| `src/components/ProjectCover.astro` | 카드 표지 그림(브라우저 창, 휴대폰 틀) |
| `src/components/Slider.astro` | 화면 캡처를 옆으로 넘겨 보는 슬라이더. 화살표 단추를 누르거나 마우스로 끌어서 넘깁니다. 상세 페이지 위쪽에 놓입니다. |
| `src/components/Lightbox.astro` | 사진을 누르면 한 장을 크게 보여 주고 아래에 설명을 적는 창 |
| `src/components/Shot.astro` | 그림 한 장(소개 그림, 동작 흐름 그림) |
| `src/components/Diagram.astro` | 구조도를 SVG 로 그리는 컴포넌트 |
| `src/components/Schema.astro` | DB 표와 관계를 SVG 로 그리는 컴포넌트. 본문에서는 `구조` 아래 `### 데이터 모델` 에 놓습니다. |
| `src/components/Icon.astro`, `src/lib/icons.ts` | 아이콘 |
| `src/components/Todo.astro` | 배포 전에 채워야 하는 값 표시 |
| `src/layouts/` | 공통 레이아웃(`Base.astro`)과 프로젝트 상세 레이아웃(`Project.astro`) |
| `src/styles/global.css` | 색상, 글꼴, 화면 폭별 배치, 인쇄용 스타일 |
| `public/art/` | 첫 화면 그림처럼 디자인에 쓰는 그림. 사진 가져오기 스크립트가 건드리지 않습니다. |
| `scripts/import-images.mjs` | 원본 화면 캡처를 사이트용 WebP 로 바꿔 `public/images` 에 넣는 스크립트 |
| `scripts/make-site-images.mjs` | 파비콘(`favicon.ico`)과 링크 미리보기 그림(`og-image.png`)을 만드는 스크립트 |

## 디자인

어두운 바탕에 라임색으로 강조합니다. 색과 글꼴은 `src/styles/global.css` 맨 위의 변수에 모여 있습니다.
인쇄하거나 PDF 로 저장할 때는 같은 파일 맨 아래의 인쇄용 규칙이 흰 바탕과 어두운 글씨로 바꿉니다.

머리글 왼쪽 위 이름은 `src/data/projects.ts` 의 `profile.brand`, 소개 구역의 메일 주소는 `profile.email` 에서 바꿉니다.

## 프로젝트 페이지 추가

1. `src/data/projects.ts` 의 `mainProjects` 또는 `subProjects` 에 항목을 추가합니다. `path` 는 `'projects/<이름>/'` 입니다. `cover` 에는 카드 표지에 쓸 사진을 두 장 적습니다(브라우저 창 두 장, 휴대폰 두 대, 브라우저 창과 휴대폰 중에서 고릅니다).
2. `src/pages/projects/<이름>.mdx` 를 만들고 `washcall.mdx` 의 머리말 형식을 따릅니다. 머리말의 `project` 값은 `projects.ts` 의 `key` 와 같아야 합니다.
3. 머리말 `meta` 에서 이름에 '기간'이나 '역할'이 들어간 줄은 제목 오른쪽에, 나머지 줄과 `stack` 은 본문 위의 표에 놓입니다.
4. 본문의 `##` 제목이 왼쪽 목차가 됩니다. 순서는 프로젝트 소개, 주요 기능, 담당 역할, 구조, 사례, 회고입니다.

## 사진

사진은 `public/images` 에 직접 넣지 않고 스크립트로 가져옵니다.

1. `src/data/shots.ts` 에 사진을 추가합니다. `file` 은 원본 사진 폴더 기준 경로(확장자 없음), `title` 은 슬라이더에 보이는 제목, `desc` 는 크게 봤을 때 아래에 보이는 설명입니다. 원본 파일 이름이 한글이면 `id` 로 영문 이름을 정합니다.
2. 아래 명령으로 가져옵니다. `public/images` 를 비우고 `shots.ts` 에 적힌 사진만 다시 만듭니다.

```bash
node scripts/import-images.mjs "<원본 사진 폴더>"
```

3. `shots.ts` 의 key 가 `projects.ts` 의 `key` 와 같으면 그 프로젝트 상세 페이지 위쪽에 슬라이더가 자동으로 놓입니다. 탭이 두 개 이상이면 PC·모바일처럼 탭으로 나뉩니다.
4. 카드 표지(`projects.ts` 의 `cover`)도 이 사진을 씁니다. 표지에 쓴 사진을 `shots.ts` 에서 빼면 표지 경로도 함께 바꿉니다.

## 저장소와 서비스 링크

`src/data/projects.ts` 의 `repos` 와 `demo` 가 메인 페이지 카드와 상세 페이지의 링크가 됩니다.
"서비스 열기" 링크는 `demo.up` 이 `true` 일 때 표시됩니다. 서비스를 내렸을 때 `false` 로 바꾸면 숨겨집니다.

## 파비콘과 링크 미리보기 그림

`public/favicon.ico` 와 `public/og-image.png` 는 스크립트로 만든 파일입니다. 파비콘은 `public/favicon.svg`(머리글 왼쪽 위 아이콘)로, 미리보기 그림은 메인 페이지 첫 화면을 찍어서 만듭니다.
첫 화면 문구나 아이콘을 바꿨으면 아래 순서로 다시 만듭니다. 미리보기 그림을 찍을 때 컴퓨터에 설치된 Edge 나 Chrome 을 화면 없이 실행합니다.

```bash
npm run build
```

```bash
node scripts/make-site-images.mjs
```

## 배포

배포 주소는 `astro.config.mjs` 의 `site`(`https://2jang.dev`)입니다. 링크 미리보기와 대표 주소(canonical)에 쓰이므로, 주소가 바뀌면 함께 고칩니다.

Cloudflare Pages 설정값입니다.

| 항목 | 값 |
| --- | --- |
| 루트 디렉터리 | 이 폴더(저장소 안의 `portfolio-site`) |
| 빌드 명령 | `npm run build` |
| 빌드 출력 디렉터리 | `dist` |
| Node 버전 | `.node-version` 파일의 버전. 적용되지 않으면 환경 변수 `NODE_VERSION` 에 같은 값을 넣습니다. |

Astro 7 은 Node 22.23.4 이상이 필요합니다. 없는 주소는 `dist/404.html` 이 처리합니다.

## 배포 전 점검

- `src` 에서 `<Todo` 를 검색해 남은 항목이 없어야 합니다.
- 사진에 실제 이름, 학번, 전화번호가 보이지 않아야 합니다.
