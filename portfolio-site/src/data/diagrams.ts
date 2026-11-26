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
    { x: 178, y: 60, w: 160, h: 56, name: '오프라인 파이프라인', lines: ['격자 조인 · 지표 계산'] },
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
  viewBox: '0 48 760 236',
  boxes: [
    { x: 24, y: 132, w: 120, h: 56, name: '브라우저', lines: ['사진 업로드'] },
    {
      x: 200,
      y: 108,
      w: 204,
      h: 104,
      name: '게이트웨이',
      lines: ['단일 대기열', '요청별 담당 엔진 고정', '5초마다 엔진 상태 확인', '중복 요청은 기존 결과 반환'],
      main: true,
    },
    { x: 464, y: 60, w: 272, h: 56, name: '분석 엔진 1', lines: ['OCR 전용 스레드 → YOLO → 판정 → 가림'] },
    { x: 464, y: 132, w: 272, h: 56, name: '분석 엔진 2', lines: ['동일 구성'] },
    { x: 464, y: 204, w: 272, h: 56, name: '분석 엔진 N', lines: ['서버 추가로 확장'] },
  ],
  lines: ['M404 160H434', 'M434 88V232'],
  arrows: ['M144 152H200', 'M200 172H144', 'M434 88H464', 'M434 160H464', 'M434 232H464'],
  labels: [
    { x: 172, y: 144, anchor: 'middle', text: '분석 요청' },
    { x: 172, y: 188, anchor: 'middle', text: '진행 SSE' },
    { x: 452, y: 76, anchor: 'end', text: '유휴 엔진에 1건씩 배정' },
    { x: 302, y: 236, anchor: 'middle', text: '처리 시작 전 연결 실패만 재시도' },
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
    { x: 206, y: 80, w: 120, h: 56, name: 'cloudflared', lines: ['터널로 공개'] },
    { x: 374, y: 92, w: 190, h: 52, name: 'FastAPI 서버', lines: ['라우터 → 서비스 → SQLAlchemy'] },
    { x: 588, y: 92, w: 132, h: 52, name: 'MySQL', lines: ['강좌 스키마 재설계'], main: true },
    { x: 24, y: 204, w: 190, h: 56, name: 'JSON 시드', lines: ['강좌 · 건물 · 강의실 · 졸업요건'] },
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
    { x: 40, y: 212, w: 268, h: 52, name: '챗봇', lines: ['서버 연결 · 재시도 담당'] },
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
