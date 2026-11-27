// 프로젝트 요약 정보. 메인 페이지 카드와 상세 페이지 머리말(링크, 이전·다음 프로젝트)이 함께 쓴다.
import type { IconName } from '../lib/icons';

export interface RepoLink {
  label: string;
  url: string;
}

export interface DemoLink {
  url: string;
  /** true 면 "서비스 열기" 링크를 보여 준다. 서비스를 내렸을 때 false 로 바꾸면 숨겨진다. */
  up: boolean;
  note?: string;
}

/**
 * 카드 표지 그림. 사진 경로는 public/images 기준이다.
 * - browsers: 기울인 브라우저 창 두 장. tint 를 주면 그 바탕색을 쓴다.
 * - phones: 휴대폰 두 대. tint 를 주면 그 바탕색을 쓴다.
 * - window-phone: 창 한 장과 휴대폰 한 대
 * - browser-phone: 바탕색 위에 브라우저 창 한 장과 휴대폰 한 대
 * - browser: 바탕색 위에 브라우저 창 한 장(사진이 한 장뿐일 때)
 */
export type Cover =
  | { kind: 'browsers'; back: string; front: string; tint?: string }
  | { kind: 'phones'; left: string; right: string; tint?: string }
  | { kind: 'window-phone'; window: string; phone: string }
  | { kind: 'browser-phone'; browser: string; phone: string; tint: string }
  | { kind: 'browser'; image: string; tint: string };

export interface Project {
  key: string;
  title: string;
  /** 카드 위쪽에 영문 대문자로 적는 분야 */
  domain: string;
  /** 상세 페이지 제목 위에 적는 한 줄. 어떤 종류의 서비스인지 */
  service: string;
  /** 무엇을 하는 프로젝트인지. 메인 페이지 카드에 쓴다. */
  summary: string;
  period: string;
  role: string;
  /** 카드에 보여 줄 대표 기술 세 개 */
  tech: string[];
  /** 사이트 루트 기준 상세 페이지 경로 */
  path: string;
  /** 수상한 프로젝트일 때. 예: '대상' */
  award?: string;
  repos?: RepoLink[];
  demo?: DemoLink;
  cover: Cover;
  /** 상세 페이지 사진 칸의 바탕색. 없으면 기본색을 쓴다. */
  heroTint?: string;
}

export const mainProjects: Project[] = [
  {
    key: 'hwaseong-dashboard',
    title: '화성시 교통 수요·공급 대시보드',
    domain: 'CIVIC TECH',
    service: '2026 AI화성챌린지 · 교통 분야',
    summary:
      '화성시를 1km 격자로 나눠 버스가 부족한 지역을 찾고, 정류장·똑버스·증편을 어디에 넣으면 얼마나 나아지는지 미리 계산해 보는 교통 담당자용 대시보드입니다.',
    period: '2026.08',
    role: '팀장 · 백엔드',
    tech: ['FastAPI', 'Docker Compose', 'GitHub Actions'],
    path: 'projects/hwaseong-dashboard/',
    repos: [
      { label: 'GitHub (백엔드)', url: 'https://github.com/2026-AIHwaseong-project/hwaseong-dashboard-backend' },
      { label: 'GitHub (프론트엔드)', url: 'https://github.com/2026-AIHwaseong-project/hwaseong-dashboard' },
    ],
    demo: {
      url: 'https://hwaseong-dashboard.pages.dev',
      up: true,
      note: '대회 종료 후 서버를 내려, 녹화된 데이터로 동작하는 보관판입니다.',
    },
    cover: {
      kind: 'browsers',
      back: 'hwaseong-dashboard/pc/24-simulation.webp',
      front: 'hwaseong-dashboard/pc/05-map-layer-shortage.webp',
    },
    heroTint: '#1e302a',
  },
  {
    key: 'donggurami',
    title: '동구라미',
    domain: 'CAMPUS PLATFORM',
    service: '수원대 동아리 모집 플랫폼',
    summary:
      '수원대학교 중앙동아리의 모집 과정을 한곳에 모은 서비스입니다. 학생은 동아리를 찾아 지원하고, 회장은 지원자를 선발하고, 동아리연합회는 동아리와 공지를 관리합니다.',
    period: '2025.09 ~ 2025.10',
    role: '2기 백엔드 팀장',
    tech: ['Spring Boot 3', 'JPA', 'MySQL'],
    path: 'projects/donggurami/',
    repos: [{ label: 'GitHub', url: 'https://github.com/2jang/USW-Circle-Link-Server' }],
    demo: { url: 'https://donggurami.net', up: true },
    cover: {
      kind: 'phones',
      left: 'donggurami/mobile/app-01-list.webp',
      right: 'donggurami/mobile/app-05-intro.webp',
    },
    heroTint: '#283221',
  },
  {
    key: 'privacy-lens',
    title: 'Privacy Lens',
    domain: 'COMPUTER VISION',
    service: '사진 속 개인정보 탐지·가림',
    summary:
      '사진을 올리기 전에 배경에 작게 찍힌 개인정보(택배 송장, 신분증, 모니터 화면)를 찾아 위치와 이유를 보여 주고, 고른 영역을 가려 주는 웹 서비스입니다.',
    period: '2026.09 ~ 진행 중',
    role: '백엔드 · 배포',
    tech: ['FastAPI', 'PaddleOCR', 'asyncio'],
    path: 'projects/privacy-lens/',
    repos: [{ label: 'GitHub', url: 'https://github.com/2026-usw-project/privacy-lens' }],
    demo: { url: 'https://privacy-lens.2jang.dev', up: true },
    cover: {
      kind: 'window-phone',
      window: 'privacy-lens/pc/10-protected-parcel.webp',
      phone: 'privacy-lens/mobile/10-protected-parcel.webp',
    },
    heroTint: '#1d292b',
  },
];

export const subProjects: Project[] = [
  {
    key: 'washcall',
    title: 'WashCall',
    domain: 'IoT SERVICE',
    service: '기숙사 세탁실 실시간 알림',
    summary:
      '세탁기에 붙인 진동 센서로 빈 세탁기와 남은 시간을 실시간으로 보여 주고, 세탁이 끝나면 휴대폰으로 알려 주는 기숙사 세탁실 서비스입니다.',
    period: '2025.09 ~ 2026.01',
    role: '팀장 · 백엔드',
    tech: ['FastAPI', 'WebSocket', 'FCM'],
    path: 'projects/washcall/',
    repos: [
      { label: 'GitHub (서버)', url: 'https://github.com/2jang/WashCall-Server' },
      { label: 'GitHub (웹)', url: 'https://github.com/2jang/WashCall-Web' },
    ],
    demo: { url: 'https://washcall.2jang.dev', up: true },
    cover: {
      kind: 'browser-phone',
      browser: 'washcall/pc/04-realtime-status.webp',
      phone: 'washcall/mobile/09-congestion-chart.webp',
      tint: '#b3d9c2',
    },
  },
  {
    key: 'deepfake-voice',
    title: 'DeepFake-Voice',
    domain: 'AUDIO RESEARCH',
    service: '한국어 딥페이크 음성 탐지',
    summary:
      '음성이 실제 사람의 목소리인지 AI로 합성한 것인지 판정하는 프로젝트입니다. 탐지 모델을 학습하는 연구 파이프라인과, 파일이나 마이크 소리를 판정해 보는 웹 데모를 만들었습니다.',
    period: '2026.05 ~ 2026.06',
    role: '단독 개발',
    tech: ['Python', 'PyTorch', 'FastAPI'],
    path: 'projects/deepfake-voice/',
    repos: [{ label: 'GitHub', url: 'https://github.com/2jang/DeepFake-Voice' }],
    cover: {
      kind: 'browsers',
      back: 'deepfake-voice/pc/04-result-fake.webp',
      front: 'deepfake-voice/pc/06-segment-timeline.webp',
      tint: '#9e9bc2',
    },
  },
  {
    key: 'easygym',
    title: 'easyGym',
    domain: 'COMMERCE',
    service: '운동시설 검색·회원권 결제',
    summary:
      '헬스장·필라테스·복싱장을 찾아 비교하고 회원권을 결제하는 운동시설 중개 웹 서비스입니다. 첫 팀 프로젝트이고, 종료 후에는 혼자 배포하고 유지보수했습니다.',
    period: '2024.07 ~ 2024.08',
    role: '팀원 · 결제 담당',
    tech: ['Spring Boot 3', 'MyBatis', 'JSP'],
    path: 'projects/easygym/',
    repos: [{ label: 'GitHub', url: 'https://github.com/2jang/easyGym' }],
    demo: { url: 'https://easygym.2jang.dev', up: true },
    cover: {
      kind: 'browser-phone',
      browser: 'easygym/pc/05-list.webp',
      phone: 'easygym/mobile/01-main.webp',
      tint: '#c8b9a8',
    },
  },
  {
    key: 'timetable',
    title: '수원대 스마트 시간표',
    domain: 'SCHEDULING',
    service: '졸업요건 계산·시간표 자동 추천',
    summary:
      '들은 과목과 원하는 조건을 넣으면 졸업까지 부족한 학점을 계산하고 이번 학기 시간표를 최대 3안 짜 주는 수원대 학생용 웹 서비스입니다.',
    period: '2026.05',
    role: '백엔드',
    tech: ['FastAPI', 'SQLAlchemy', 'MySQL'],
    path: 'projects/timetable/',
    award: '우수상',
    repos: [{ label: 'GitHub', url: 'https://github.com/USW-Scytale/timetable-backend' }],
    cover: {
      kind: 'browser-phone',
      browser: 'timetable/pc/08-result-compare.webp',
      phone: 'timetable/mobile/07b-result-timetable.webp',
      tint: '#abbce0',
    },
  },
  {
    key: 'suwon-ai',
    title: '지능형SW융합대학 소개 웹사이트',
    domain: 'CAMPUS WEB',
    service: '단과대학 소개와 학생 편의 기능',
    summary:
      '수원대학교 지능형SW융합대학을 소개하는 웹사이트입니다. 졸업요건 확인, 캠퍼스 길찾기, 학부 대항 실시간 클릭 게임, AI 챗봇을 함께 제공합니다.',
    period: '2025.05',
    role: '프론트엔드',
    tech: ['React', 'Vite', 'STOMP WebSocket'],
    path: 'projects/suwon-ai/',
    award: '대상',
    repos: [{ label: 'GitHub', url: 'https://github.com/2jang/sw-hackathon-react' }],
    demo: { url: 'https://suwonai.2jang.dev', up: true },
    cover: {
      kind: 'browser-phone',
      browser: 'suwon-ai/pc/01-home.webp',
      phone: 'suwon-ai/mobile/27-pathfinder-route.webp',
      tint: '#bdd0a6',
    },
  },
  {
    key: 'dbti',
    title: 'DBTI',
    domain: 'CHATBOT',
    service: '반려견 성향 검사 카카오톡 챗봇',
    summary:
      '반려견 보호자를 위한 카카오톡 챗봇과 웹 성향 검사입니다. MBTI를 보내면 어울리는 견종을 추천하고, 웹에서 12문항에 답하면 반려견의 성격 유형과 양육 방법을 카드로 알려 줍니다.',
    period: '2024.07 ~ 2024.08',
    role: '팀장 · 백엔드',
    tech: ['Flask', '카카오 i 오픈빌더', 'JavaScript'],
    path: 'projects/dbti/',
    repos: [{ label: 'GitHub', url: 'https://github.com/2jang/DBTI' }],
    cover: {
      kind: 'phones',
      left: 'dbti/mobile/03-web-start.webp',
      right: 'dbti/mobile/07-web-result.webp',
      tint: '#bccbd3',
    },
  },
];

export const allProjects: Project[] = [...mainProjects, ...subProjects];

export function findProject(key: string): Project | undefined {
  return allProjects.find((project) => project.key === key);
}

export function isMainProject(key: string): boolean {
  return mainProjects.some((project) => project.key === key);
}

export interface Award {
  /** 'YYYY.MM' */
  date: string;
  name: string;
  result: string;
  role: string;
  /** 상세 페이지가 있는 프로젝트의 key */
  project: string;
}

export const awards: Award[] = [
  {
    date: '2026.05',
    name: '수원대학교 바이브코딩 교내 해커톤',
    result: '우수상',
    role: '백엔드',
    project: 'timetable',
  },
  {
    date: '2025.05',
    name: '수원대학교 ICT 교내 해커톤',
    result: '대상',
    role: '프론트엔드',
    project: 'suwon-ai',
  },
];

export interface Skill {
  area: string;
  icon: IconName;
  items: string[];
}

export const skills: Skill[] = [
  {
    area: '백엔드',
    icon: 'server',
    items: ['Python', 'FastAPI', 'asyncio', 'Java 17', 'Spring Boot 3', 'Spring Security', 'JPA', 'MyBatis'],
  },
  { area: '데이터', icon: 'database', items: ['MySQL', 'PostgreSQL', 'PostGIS', 'Redis'] },
  { area: '실시간 통신', icon: 'radio', items: ['WebSocket', 'SSE', 'Firebase Cloud Messaging'] },
  { area: '프론트엔드', icon: 'code', items: ['JavaScript', 'React', 'JSP'] },
  { area: '배포와 운영', icon: 'box', items: ['Docker Compose', 'GitHub Actions', 'AWS EC2', 'Caddy', 'Linux'] },
  { area: '테스트', icon: 'check-square', items: ['pytest', 'JUnit 5', 'Mockito', 'Testcontainers'] },
];

export const profile = {
  name: '조현우',
  handle: '2jang',
  role: '백엔드 개발자',
  github: 'https://github.com/2jang',
  /** 소개 구역의 메일 링크(mailto:)에 쓴다. */
  email: 'jakeecc@naver.com',
  /** 머리글 왼쪽 위 이름. 가운데 점은 강조색으로 찍는다. */
  brand: ['2jang', 'dev'],
};
