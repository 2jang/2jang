// 구조도 좌표. 폭 760 기준이고, 박스는 이름 한 줄과 설명 줄(16 간격)로 이뤄진다.

export interface DiagramBox {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  lines?: string[];
  /** 직접 만들거나 추가한 부분이면 강조한다. */
  main?: boolean;
}

export interface DiagramContainer {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
}

export interface DiagramDiamond {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  lines: string[];
}

export interface DiagramLabel {
  x: number;
  y: number;
  text: string;
  anchor?: 'start' | 'middle' | 'end';
  bold?: boolean;
}

export interface DiagramData {
  id: string;
  label: string;
  viewBox: string;
  containers?: DiagramContainer[];
  boxes: DiagramBox[];
  diamonds?: DiagramDiamond[];
  arrows?: string[];
  lines?: string[];
  labels?: DiagramLabel[];
}

export const hwaseongArch: DiagramData = {
  id: 'hwaseong-arch',
  label: '화성시 교통 대시보드 시스템 구조',
  viewBox: '0 48 760 378',
  containers: [{ x: 184, y: 150, w: 376, h: 104, name: 'AWS EC2 · Docker Compose' }],
  boxes: [
    { x: 24, y: 60, w: 130, h: 56, name: '공공데이터', lines: ['교통카드 · 정류장'] },
    {
      x: 178,
      y: 52,
      w: 160,
      h: 72,
      name: '오프라인 파이프라인',
      lines: ['지표 계산 · 시뮬레이션', '수집 · 격자 조인은 팀원'],
      main: true,
    },
    { x: 362, y: 60, w: 144, h: 56, name: '결과 JSON', lines: ['지표 파일 21개'] },
    { x: 24, y: 182, w: 120, h: 56, name: '브라우저', lines: ['교통 담당자'] },
    { x: 200, y: 182, w: 100, h: 56, name: 'Caddy', lines: ['HTTPS 처리'] },
    {
      x: 324,
      y: 182,
      w: 220,
      h: 56,
      name: 'FastAPI 서버',
      lines: ['조회 · 시뮬레이션 · AI · 관리자'],
      main: true,
    },
    { x: 600, y: 182, w: 136, h: 56, name: 'AI 프로바이더', lines: ['4종 · 장애 시 대체 호출'] },
    { x: 24, y: 278, w: 150, h: 56, name: 'Cloudflare Pages', lines: ['정적 프론트엔드'] },
    { x: 24, y: 374, w: 124, h: 40, name: 'main에 push' },
    { x: 171, y: 374, w: 124, h: 40, name: '테스트 통과', main: true },
    { x: 318, y: 374, w: 124, h: 40, name: 'SSH 배포' },
    { x: 465, y: 374, w: 124, h: 40, name: '헬스체크 대기', main: true },
    { x: 612, y: 374, w: 124, h: 40, name: '외부 접속 확인' },
  ],
  arrows: [
    'M154 88H178',
    'M338 88H362',
    'M434 116V182',
    'M144 210H200',
    'M300 210H324',
    'M544 210H600',
    'M84 238V278',
    'M148 394H171',
    'M295 394H318',
    'M442 394H465',
    'M589 394H612',
    'M380 374V254',
  ],
  labels: [
    { x: 444, y: 138, text: '서버 시작 시 메모리에 로드' },
    { x: 94, y: 262, text: '페이지 로드' },
    { x: 390, y: 318, text: 'docker compose up --build' },
    { x: 24, y: 362, text: '배포 파이프라인 · GitHub Actions', bold: true },
  ],
};

export const dongguramiArch: DiagramData = {
  id: 'donggurami-arch',
  label: '동구라미 서버 구조',
  viewBox: '0 48 760 264',
  containers: [{ x: 162, y: 60, w: 402, h: 124, name: 'AWS Lightsail · 웹 인스턴스' }],
  boxes: [
    { x: 24, y: 96, w: 130, h: 72, name: '클라이언트', lines: ['학생 앱 · 웹', '회장 · 동연회 웹'] },
    { x: 178, y: 104, w: 96, h: 56, name: 'Nginx', lines: ['리버스 프록시'] },
    {
      x: 298,
      y: 96,
      w: 250,
      h: 72,
      name: 'Spring Boot 3 서버',
      lines: ['Security · CORS · JWT 필터', '레이트리밋 → 도메인 서비스 → JPA'],
    },
    { x: 596, y: 60, w: 140, h: 56, name: 'MySQL 8', lines: ['회원 · 동아리 · 지원서'] },
    { x: 596, y: 148, w: 140, h: 56, name: 'Redis', lines: ['리프레시 토큰 · 요청 제한'] },
    { x: 24, y: 244, w: 160, h: 56, name: 'FCM', lines: ['합격 여부 푸시 알림'] },
    { x: 208, y: 244, w: 160, h: 56, name: 'Naver SMTP', lines: ['학교 메일 인증'] },
    { x: 392, y: 244, w: 160, h: 56, name: 'AWS S3', lines: ['사진 업로드'] },
    { x: 576, y: 244, w: 160, h: 56, name: 'Pinpoint', lines: ['APM'] },
  ],
  lines: ['M423 168V222', 'M104 222H656'],
  arrows: [
    'M154 132H178',
    'M274 132H298',
    'M548 120H572V88H596',
    'M548 144H572V176H596',
    'M104 222V244',
    'M288 222V244',
    'M472 222V244',
    'M656 222V244',
  ],
  labels: [{ x: 433, y: 212, text: '외부 서비스' }],
};

export const dongguramiDeploy: DiagramData = {
  id: 'donggurami-deploy',
  label: '동구라미 블루/그린 배포 흐름',
  viewBox: '0 60 760 240',
  boxes: [
    { x: 24, y: 88, w: 124, h: 56, name: 'PR 머지', lines: ['main 브랜치'] },
    { x: 168, y: 88, w: 116, h: 56, name: '빌드 · 전송', lines: ['GitHub Actions'] },
    { x: 304, y: 88, w: 144, h: 56, name: '새 WAS 기동', lines: ['미사용 포트에서 실행'] },
    { x: 608, y: 88, w: 128, h: 56, name: '트래픽 전환', lines: ['이전 버전 종료'] },
    { x: 444, y: 208, w: 168, h: 56, name: '자가복구', lines: ['전체 종료 후 재시작'], main: true },
  ],
  diamonds: [{ cx: 528, cy: 116, rx: 60, ry: 40, lines: ['헬스체크', '통과?'] }],
  arrows: [
    'M148 116H168',
    'M284 116H304',
    'M448 116H468',
    'M588 116H608',
    'M528 156V208',
    'M612 236H672V144',
  ],
  labels: [
    { x: 604, y: 104, anchor: 'end', text: '성공' },
    { x: 538, y: 186, text: '실패' },
    { x: 662, y: 196, anchor: 'end', text: '재검사 통과' },
    { x: 528, y: 284, anchor: 'middle', text: '복구 중에는 서비스 중단 발생' },
  ],
};

export const privacyLensArch: DiagramData = {
  id: 'privacy-lens-arch',
  label: 'Privacy Lens 시스템 구조',
  viewBox: '0 48 760 456',
  containers: [
    { x: 24, y: 148, w: 712, h: 202, name: '게이트웨이 · 홈서버(미니PC)' },
    { x: 24, y: 390, w: 712, h: 102, name: '분석 엔진 · 서버 한 대에 하나 (OCR → 객체 검출 → 판정 → 가림)' },
  ],
  boxes: [
    { x: 24, y: 60, w: 160, h: 56, name: '브라우저', lines: ['사진 업로드 · 진행 표시'] },
    { x: 290, y: 60, w: 180, h: 56, name: 'Cloudflare Tunnel', lines: ['개인 도메인 · HTTPS'] },
    {
      x: 40,
      y: 180,
      w: 204,
      h: 68,
      name: '화면 제공 · 엔진 관리',
      lines: ['빌드한 화면을 함께 제공', '관리 키로 엔진 추가 · 제거'],
      main: true,
    },
    {
      x: 278,
      y: 180,
      w: 204,
      h: 68,
      name: '요청 검사 · 중복 확인',
      lines: ['사진 크기 · 요청 ID 형식 검사', '같은 요청은 기존 결과 반환'],
      main: true,
    },
    {
      x: 516,
      y: 180,
      w: 204,
      h: 68,
      name: '단일 대기열',
      lines: ['앞에 몇 건인지 안내', '가득 차면 503 응답'],
      main: true,
    },
    {
      x: 40,
      y: 268,
      w: 204,
      h: 68,
      name: '진행 중계 (SSE)',
      lines: ['배정 전: 대기 건수 · 예상 시간', '배정 후: 담당 엔진의 진행'],
      main: true,
    },
    {
      x: 278,
      y: 268,
      w: 204,
      h: 68,
      name: '엔진 상태 확인',
      lines: ['5초마다 확인', '연결 거부 즉시 · 지연 2회에 제외'],
      main: true,
    },
    {
      x: 516,
      y: 268,
      w: 204,
      h: 68,
      name: '엔진 배정',
      lines: ['유휴 엔진에 1건씩 · 담당 엔진 고정', '처리 전 연결 실패만 재시도'],
      main: true,
    },
    { x: 40, y: 422, w: 204, h: 56, name: '엔진 1', lines: ['홈서버(미니PC)'], main: true },
    { x: 278, y: 422, w: 204, h: 56, name: '엔진 2', lines: ['개인 PC'], main: true },
    { x: 516, y: 422, w: 204, h: 56, name: '엔진 N', lines: ['서버를 추가해 확장'], main: true },
  ],
  arrows: [
    'M184 78H290',
    'M290 98H184',
    'M380 116V180',
    'M482 214H516',
    'M618 248V268',
    'M142 390V336',
    'M380 336V390',
    'M618 336V390',
  ],
  labels: [
    { x: 237, y: 72, anchor: 'middle', text: '요청' },
    { x: 237, y: 112, anchor: 'middle', text: '결과 · 진행 SSE' },
    { x: 736, y: 82, anchor: 'end', text: '사진과 OCR 원문은 저장하지 않음' },
    { x: 736, y: 98, anchor: 'end', text: '대기열 · 엔진 목록은 메모리에 보관' },
    { x: 150, y: 374, text: '진행 상황 (SSE)' },
    { x: 388, y: 374, text: '상태 확인' },
    { x: 626, y: 374, text: '분석 요청' },
  ],
};

export const privacyLensEngine: DiagramData = {
  id: 'privacy-lens-engine',
  label: 'Privacy Lens 분석 엔진의 처리 순서',
  viewBox: '0 48 760 348',
  boxes: [
    { x: 24, y: 92, w: 156, h: 68, name: '토큰 검사', lines: ['토큰을 설정하면', '게이트웨이 요청만 허용'], main: true },
    {
      x: 209,
      y: 92,
      w: 156,
      h: 68,
      name: '중복 요청 확인',
      lines: ['요청 ID와 사진이 같으면', '첫 결과를 기다려 반환'],
      main: true,
    },
    { x: 394, y: 92, w: 156, h: 68, name: '차례 대기', lines: ['엔진 하나는', '한 번에 1건만 처리'], main: true },
    {
      x: 580,
      y: 92,
      w: 156,
      h: 68,
      name: '가림',
      lines: ['고른 영역을 흐리게 · 검게', '메타데이터 제거'],
      main: true,
    },
    {
      x: 24,
      y: 212,
      w: 156,
      h: 68,
      name: 'OCR',
      lines: ['PaddleOCR 추론을', '전용 스레드 1개에 고정'],
      main: true,
    },
    { x: 209, y: 212, w: 156, h: 68, name: '객체 검출', lines: ['번호판 · 증명사진 · 물건', 'YOLO 모델은 팀원이 학습'] },
    {
      x: 394,
      y: 212,
      w: 156,
      h: 68,
      name: '판정',
      lines: ['기본은 규칙 판정', '정규식 · 체크섬 · 주변 문구'],
      main: true,
    },
    { x: 580, y: 212, w: 156, h: 68, name: '결과 반환', lines: ['위치 · 심각도 · 근거 문구', 'JSON'], main: true },
    {
      x: 24,
      y: 316,
      w: 341,
      h: 68,
      name: '진행 · 시간 추정',
      lines: ['단계별 처리 시간을 기록해 남은 시간 추정', '단계가 시작될 때마다 다시 계산해 SSE로 전달'],
      main: true,
    },
    {
      x: 394,
      y: 316,
      w: 156,
      h: 68,
      name: 'LLM · Decision 판단',
      lines: ['판단 모델을 고르면', '규칙 대신 판단'],
      main: true,
    },
    { x: 580, y: 316, w: 156, h: 68, name: '외부 판단 API', lines: ['LLM 공급자', 'Gemini Decision'] },
  ],
  arrows: [
    'M180 126H209',
    'M365 126H394',
    'M472 160V186H102V212',
    'M180 246H209',
    'M365 246H394',
    'M550 246H580',
    'M102 280V316',
    'M287 280V316',
    'M472 280V316',
    'M550 350H580',
  ],
  labels: [
    { x: 24, y: 82, text: '분석 요청', bold: true },
    { x: 580, y: 82, text: '가림 요청', bold: true },
  ],
};

export const easygymArch: DiagramData = {
  id: 'easygym-arch',
  label: 'easyGym 시스템 구조',
  viewBox: '0 48 760 372',
  containers: [{ x: 176, y: 60, w: 408, h: 156, name: '라즈베리파이 · Spring Boot 3 (MVC + JSP)' }],
  boxes: [
    { x: 24, y: 104, w: 120, h: 56, name: '브라우저', lines: ['JSP 화면'] },
    { x: 192, y: 92, w: 184, h: 52, name: '결제 · 환불', lines: ['화면 → 서비스 → 매퍼'], main: true },
    { x: 392, y: 92, w: 176, h: 52, name: '챗봇', lines: ['LLM 응답을 SSE로 전달'], main: true },
    { x: 192, y: 152, w: 184, h: 52, name: '로그인 봇 방지', lines: ['캡차 서버 검증'], main: true },
    { x: 392, y: 152, w: 176, h: 52, name: '회원 · 게시판 · 시설', lines: ['팀원 작업'] },
    { x: 616, y: 104, w: 120, h: 56, name: 'MySQL', lines: ['MyBatis 매퍼'] },
    { x: 24, y: 268, w: 160, h: 56, name: '토스페이먼츠', lines: ['결제위젯 (테스트)'] },
    { x: 208, y: 268, w: 160, h: 56, name: 'Cloudflare Turnstile', lines: ['캡차'] },
    { x: 392, y: 268, w: 160, h: 56, name: 'OpenRouter', lines: ['LLM'] },
    { x: 576, y: 268, w: 160, h: 56, name: '카카오맵 · 메일', lines: ['지도 · 가입 인증'] },
    { x: 24, y: 368, w: 150, h: 40, name: 'main에 push' },
    { x: 200, y: 368, w: 200, h: 40, name: '빌드 (JDK 17 · Gradle)', main: true },
    { x: 426, y: 368, w: 190, h: 40, name: 'Release에 JAR 등록', main: true },
  ],
  lines: ['M380 216V244', 'M104 244H656'],
  arrows: [
    'M144 132H176',
    'M584 132H616',
    'M104 244V268',
    'M288 244V268',
    'M472 244V268',
    'M656 244V268',
    'M174 388H200',
    'M400 388H426',
  ],
  labels: [
    { x: 390, y: 236, text: '외부 서비스' },
    { x: 24, y: 356, text: '빌드 · GitHub Actions', bold: true },
  ],
};

export const timetableArch: DiagramData = {
  id: 'timetable-arch',
  label: '수원대 스마트 시간표 시스템 구조',
  viewBox: '0 48 760 352',
  containers: [{ x: 358, y: 60, w: 378, h: 96, name: '학교 팀 서버' }],
  boxes: [
    { x: 24, y: 72, w: 150, h: 72, name: '브라우저', lines: ['HTML 한 장', 'GitHub Pages · 팀원 작업'] },
    { x: 206, y: 80, w: 120, h: 56, name: 'cloudflared', lines: ['터널로 공개'], main: true },
    { x: 374, y: 92, w: 190, h: 52, name: 'FastAPI 서버', lines: ['라우터 → 서비스 → SQLAlchemy'] },
    { x: 588, y: 92, w: 132, h: 52, name: 'MySQL', lines: ['강좌 스키마 재설계'], main: true },
    { x: 24, y: 204, w: 190, h: 56, name: 'JSON 시드', lines: ['강좌 · 건물 · 강의실 · 졸업요건'], main: true },
    { x: 250, y: 204, w: 170, h: 56, name: '시드 스크립트', lines: ['851과목 · 1,617분반 적재'], main: true },
    { x: 566, y: 204, w: 170, h: 56, name: 'Alembic 마이그레이션', lines: ['스키마 버전 관리'], main: true },
    { x: 24, y: 328, w: 128, h: 40, name: 'DB · 계정 준비', main: true },
    { x: 170, y: 328, w: 128, h: 40, name: '마이그레이션', main: true },
    { x: 316, y: 328, w: 128, h: 40, name: '시드 적재', main: true },
    { x: 462, y: 328, w: 128, h: 40, name: '서버 실행 · 확인', main: true },
    { x: 608, y: 328, w: 128, h: 40, name: '터널 실행', main: true },
  ],
  arrows: [
    'M174 108H206',
    'M326 108H358',
    'M564 118H588',
    'M214 232H250',
    'M335 204V178H624V144',
    'M690 204V144',
    'M152 348H170',
    'M298 348H316',
    'M444 348H462',
    'M590 348H608',
  ],
  labels: [
    { x: 24, y: 316, text: '팀 서버 배포 스크립트', bold: true },
    { x: 380, y: 386, anchor: 'middle', text: '강좌가 비어 있을 때만' },
    { x: 526, y: 386, anchor: 'middle', text: '/health 응답 확인' },
    { x: 672, y: 386, anchor: 'middle', text: '바뀐 주소를 파일에 기록' },
  ],
};

export const suwonArch: DiagramData = {
  id: 'suwon-ai-arch',
  label: '지능형SW융합대학 소개 웹사이트 구조',
  viewBox: '0 48 760 324',
  containers: [
    { x: 24, y: 60, w: 300, h: 276, name: '브라우저 · React SPA' },
    { x: 436, y: 60, w: 300, h: 216, name: 'Spring Boot 서버 · 팀원 작업' },
  ],
  boxes: [
    { x: 40, y: 92, w: 268, h: 52, name: '캠퍼스 길찾기', lines: ['지도에서 건물 두 곳 선택'], main: true },
    { x: 40, y: 152, w: 268, h: 52, name: '딸깍 배틀', lines: ['학부 대항 실시간 클릭 게임'], main: true },
    { x: 40, y: 212, w: 268, h: 52, name: '챗봇', lines: ['화면 · 서버 연결 · 재시도'], main: true },
    { x: 40, y: 272, w: 268, h: 52, name: '졸업요건 확인', lines: ['학과별 체크리스트'], main: true },
    { x: 452, y: 92, w: 268, h: 52, name: '도보 시간 조회', lines: ['건물 쌍별 시간 표'] },
    { x: 452, y: 152, w: 268, h: 52, name: '클릭 집계 · 방송', lines: ['점수를 올리고 모두에게 전송'] },
    { x: 452, y: 212, w: 268, h: 52, name: 'LLM 연결', lines: ['OpenRouter로 교체'], main: true },
    { x: 516, y: 304, w: 140, h: 56, name: 'OpenRouter', lines: ['LLM'] },
  ],
  arrows: ['M308 118H452', 'M308 170H452', 'M452 186H308', 'M308 238H452', 'M586 276V304'],
  labels: [
    { x: 380, y: 110, anchor: 'middle', text: 'REST' },
    { x: 380, y: 162, anchor: 'middle', text: '클릭 (STOMP)' },
    { x: 380, y: 202, anchor: 'middle', text: '점수 방송' },
    { x: 380, y: 230, anchor: 'middle', text: '질문' },
  ],
};

export const washcallArch: DiagramData = {
  id: 'washcall-arch',
  label: 'WashCall 시스템 구조',
  viewBox: '0 48 760 392',
  containers: [
    { x: 24, y: 180, w: 160, h: 216, name: '웹 (PWA) · GitHub Pages' },
    { x: 256, y: 60, w: 280, h: 336, name: 'FastAPI 서버' },
  ],
  boxes: [
    { x: 24, y: 82, w: 160, h: 72, name: '세탁기 + 진동 센서', lines: ['팀원 펌웨어', '기기별 JWT로 상태 전송'] },
    { x: 36, y: 212, w: 136, h: 72, name: '화면', lines: ['세탁기 카드 갱신', '팀원 작업'] },
    { x: 36, y: 300, w: 136, h: 72, name: '서비스 워커', lines: ['백그라운드에서', '알림 표시'], main: true },
    { x: 272, y: 92, w: 248, h: 52, name: '센서 수신 API', lines: ['상태 전이 판단 · 혼잡도 집계'] },
    { x: 272, y: 152, w: 248, h: 52, name: '사용자 API', lines: ['첫 화면 · 알림 신청 · 통계'], main: true },
    { x: 272, y: 212, w: 248, h: 52, name: 'WebSocket 관리자', lines: ['상태 전송 · 타이머 동기화'], main: true },
    { x: 272, y: 272, w: 248, h: 52, name: 'AI 추천 · 날씨 갱신', lines: ['센서 이벤트 때 백그라운드 실행'], main: true },
    { x: 272, y: 332, w: 248, h: 52, name: '푸시 알림', lines: ['받을 사람 계산 · 묶음 전송 · 재시도'], main: true },
    { x: 608, y: 122, w: 128, h: 72, name: 'MySQL', lines: ['기기 상태 · 구독', '혼잡도 · 캐시'] },
    { x: 608, y: 270, w: 128, h: 56, name: '기상청 · LLM', lines: ['예보 · 추천 문구'] },
    { x: 608, y: 330, w: 128, h: 56, name: 'FCM', lines: ['Firebase 푸시'] },
  ],
  arrows: [
    'M184 118H256',
    'M184 226H220V178H256',
    'M256 246H184',
    'M536 158H608',
    'M536 298H608',
    'M536 358H608',
    'M672 386V414H104V396',
  ],
  labels: [
    { x: 220, y: 110, anchor: 'middle', text: '/update' },
    { x: 220, y: 170, anchor: 'middle', text: 'REST' },
    { x: 220, y: 262, anchor: 'middle', text: 'WebSocket' },
    { x: 572, y: 290, anchor: 'middle', text: '외부 호출' },
    { x: 388, y: 430, anchor: 'middle', text: '푸시 전달' },
  ],
};

export const deepfakeArch: DiagramData = {
  id: 'deepfake-voice-arch',
  label: 'DeepFake-Voice 구조. 연구 파이프라인과 웹 데모',
  viewBox: '0 48 760 324',
  boxes: [
    { x: 24, y: 74, w: 128, h: 72, name: '수집', lines: ['공개 데이터셋 5종', '다운로드 스크립트'] },
    { x: 170, y: 74, w: 128, h: 72, name: '전처리', lines: ['16kHz 변환', '품질 검사'] },
    { x: 316, y: 74, w: 128, h: 72, name: '분할', lines: ['학습 조합 4개', '평가셋 3개'] },
    { x: 462, y: 74, w: 128, h: 72, name: '학습', lines: ['모델 4종', '조합 · 증강 · 입력 길이'] },
    { x: 608, y: 74, w: 128, h: 72, name: '평가 · 분석', lines: ['지표 11종', '표 · 그래프 생성'] },
    { x: 262, y: 176, w: 236, h: 56, name: '분할 검증', lines: ['학습 · 검증 데이터 중복 검사'], main: true },
    { x: 608, y: 176, w: 128, h: 56, name: '모델 체크포인트', lines: ['*_best.pt'] },
    { x: 24, y: 280, w: 180, h: 72, name: '브라우저', lines: ['파일 올리기 · 마이크 녹음', '실시간 감시'] },
    { x: 290, y: 280, w: 180, h: 72, name: 'FastAPI 서버', lines: ['디코딩 · 16kHz 변환', '동시 분석 4건으로 제한'] },
    { x: 556, y: 280, w: 180, h: 72, name: '추론 엔진', lines: ['모델 지연 로딩', '4초 구간 · 50% 겹침'] },
  ],
  arrows: [
    'M152 110H170',
    'M298 110H316',
    'M444 110H462',
    'M590 110H608',
    'M380 146V176',
    'M526 146V204H608',
    'M204 306H290',
    'M290 326H204',
    'M470 316H556',
    'M672 232V280',
  ],
  labels: [
    { x: 24, y: 64, text: '연구 파이프라인 · Python 스크립트', bold: true },
    { x: 24, y: 270, text: '웹 데모 · FastAPI (로컬 실행)', bold: true },
    { x: 247, y: 298, anchor: 'middle', text: 'REST · WS' },
    { x: 247, y: 342, anchor: 'middle', text: '판정 · 점수' },
    { x: 682, y: 260, text: '불러오기' },
  ],
};

export const dbtiArch: DiagramData = {
  id: 'dbti-arch',
  label: 'DBTI 시스템 구조',
  viewBox: '0 48 760 340',
  containers: [{ x: 352, y: 60, w: 232, h: 216, name: 'Flask 서버' }],
  boxes: [
    { x: 24, y: 92, w: 120, h: 56, name: '카카오톡', lines: ['챗봇 채널'] },
    { x: 172, y: 92, w: 150, h: 56, name: '카카오 i 오픈빌더', lines: ['스킬 서버 호출'] },
    { x: 368, y: 92, w: 200, h: 52, name: '견종 추천', lines: ['MBTI → 견종 카드'], main: true },
    { x: 368, y: 152, w: 200, h: 52, name: '검사 결과 카드', lines: ['유형 설명 · 양육 방법'], main: true },
    { x: 368, y: 212, w: 200, h: 52, name: '검사 페이지 · 결과 받기', lines: ['결과를 메모리에 보관'], main: true },
    { x: 616, y: 60, w: 120, h: 56, name: 'CSV 정리', lines: ['유형 · 견종 데이터'], main: true },
    { x: 616, y: 146, w: 120, h: 72, name: 'CSV 3종', lines: ['유형 · 견종 · 설명', '시작할 때 읽음'] },
    { x: 24, y: 210, w: 180, h: 56, name: '브라우저', lines: ['웹 검사 12문항'] },
    { x: 24, y: 320, w: 170, h: 56, name: '16Personalities', lines: ['MBTI 유형 페이지 16개'] },
    { x: 230, y: 320, w: 170, h: 56, name: '크롤러', lines: ['MBTI 설명 수집 · 팀원 원형'] },
  ],
  arrows: [
    'M144 120H172',
    'M322 120H352',
    'M204 238H352',
    'M584 182H616',
    'M676 116V146',
    'M194 348H230',
    'M400 348H676V218',
  ],
  labels: [
    { x: 247, y: 166, anchor: 'middle', text: '/mbti_api · /kakao_api' },
    { x: 278, y: 230, anchor: 'middle', text: '결과 전송' },
    { x: 468, y: 294, anchor: 'middle', text: 'Flask 개발 서버로 실행' },
    { x: 24, y: 310, text: '데이터 준비', bold: true },
    { x: 540, y: 340, anchor: 'middle', text: 'MBTI 설명 CSV' },
  ],
};
