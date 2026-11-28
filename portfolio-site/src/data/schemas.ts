// DB 구조 그림의 표와 관계. Schema.astro 가 그린다.
// 표의 높이는 컴포넌트가 계산하므로 여기서는 왼쪽 위 좌표(x, y)와 폭(w)만 정한다.
// 표 높이: 이름 30 + 설명 18(있을 때) + 컬럼 줄마다 18 + 여백 12(컬럼이 있을 때) 또는 4.

export type KeyKind = 'PK' | 'FK' | 'UQ';

export interface SchemaColumn {
  name: string;
  key?: KeyKind;
}

export interface SchemaTable {
  id: string;
  name: string;
  /** 이름 아래에 적는 한 줄 설명 */
  note?: string;
  x: number;
  y: number;
  w: number;
  columns?: SchemaColumn[];
  /** 직접 만들거나 고친 표면 강조한다. */
  main?: boolean;
}

export type Side = 'left' | 'right' | 'top' | 'bottom';

export interface SchemaLink {
  from: [table: string, side: Side];
  to: [table: string, side: Side];
  /** 양 끝에 적는 관계 수. 예: ['1', 'N'] */
  ends?: [string, string];
  /** 꺾이는 위치. 좌우로 잇는 선이면 x, 위아래로 잇는 선이면 y. 없으면 가운데서 꺾는다. */
  via?: number;
}

export interface SchemaMark {
  x: number;
  y: number;
  text: string;
}

export interface SchemaData {
  id: string;
  label: string;
  /** 그림의 가로 크기. 세로는 표 위치로 계산한다. */
  width: number;
  tables: SchemaTable[];
  links?: SchemaLink[];
  /** 표 묶음 위에 적는 작은 제목 */
  marks?: SchemaMark[];
  /** 그림 아래쪽에 적는 줄 */
  notes?: string[];
}

export const washcallSchema: SchemaData = {
  id: 'washcall-schema',
  label: 'WashCall 데이터 모델',
  width: 760,
  tables: [
    {
      id: 'user',
      name: 'user_table',
      note: '사용자',
      x: 20,
      y: 92,
      w: 196,
      columns: [
        { name: 'user_username', key: 'UQ' },
        { name: 'user_snum', key: 'UQ' },
        { name: 'user_token' },
        { name: 'fcm_token' },
      ],
      main: true,
    },
    {
      id: 'reservation',
      name: 'reservation_table',
      note: '세탁실 대기 표시',
      x: 264,
      y: 20,
      w: 232,
      columns: [{ name: '(user_id, room_id)', key: 'UQ' }],
      main: true,
    },
    {
      id: 'roomSub',
      name: 'room_subscriptions',
      note: '세탁실 구독 · 계속 유지',
      x: 264,
      y: 122,
      w: 232,
      columns: [{ name: '(user_id, room_id)', key: 'UQ' }],
      main: true,
    },
    {
      id: 'notifySub',
      name: 'notify_subscriptions',
      note: '기기 완료 알림 · 보낸 뒤 삭제',
      x: 264,
      y: 224,
      w: 232,
      columns: [{ name: '(user_id, machine_uuid)', key: 'UQ' }],
      main: true,
    },
    { id: 'room', name: 'room_table', note: '세탁실', x: 544, y: 60, w: 196, main: true },
    {
      id: 'machine',
      name: 'machine_table',
      note: '세탁기 · 건조기',
      x: 544,
      y: 206,
      w: 196,
      columns: [
        { name: 'machine_uuid', key: 'PK' },
        { name: 'machine_id', key: 'UQ' },
      ],
      main: true,
    },
    { id: 'time', name: 'time_table', note: '코스별 평균 시간', x: 20, y: 362, w: 196 },
    {
      id: 'busy',
      name: 'busy_table',
      note: '요일 × 시간 혼잡도',
      x: 264,
      y: 362,
      w: 232,
      columns: [{ name: '(day, time)', key: 'UQ' }],
    },
    { id: 'standard', name: 'standard_table', note: '기기별 진동 기준값 이력', x: 544, y: 362, w: 196 },
    { id: 'tip', name: 'ai_tip_cache', note: 'AI 추천 문구 캐시', x: 20, y: 488, w: 196, main: true },
    { id: 'weather', name: 'weather_cache', note: '기상청 예보 캐시', x: 264, y: 488, w: 232, main: true },
    { id: 'raw', name: 'raw_sensor_data', note: '센서 원시 샘플', x: 544, y: 488, w: 196, main: true },
  ],
  links: [
    { from: ['user', 'right'], to: ['reservation', 'left'], ends: ['1', 'N'] },
    { from: ['user', 'right'], to: ['roomSub', 'left'], ends: ['1', 'N'] },
    { from: ['user', 'right'], to: ['notifySub', 'left'], ends: ['1', 'N'] },
    { from: ['reservation', 'right'], to: ['room', 'left'], ends: ['N', '1'] },
    { from: ['roomSub', 'right'], to: ['room', 'left'], ends: ['N', '1'] },
    { from: ['notifySub', 'right'], to: ['machine', 'left'], ends: ['N', '1'] },
    { from: ['room', 'bottom'], to: ['machine', 'top'], ends: ['1', 'N'] },
  ],
  marks: [
    { x: 20, y: 350, text: '집계와 기준값' },
    { x: 20, y: 476, text: '캐시와 원시 데이터' },
  ],
};

export const timetableSchema: SchemaData = {
  id: 'timetable-schema',
  label: '수원대 스마트 시간표 데이터 모델',
  width: 820,
  tables: [
    {
      id: 'user',
      name: 'User',
      note: '계정',
      x: 10,
      y: 20,
      w: 196,
      columns: [{ name: 'id', key: 'PK' }, { name: 'username' }, { name: 'email' }],
    },
    {
      id: 'student',
      name: 'Student',
      note: '학생',
      x: 234,
      y: 20,
      w: 172,
      columns: [{ name: 'id (학번)', key: 'PK' }, { name: 'department' }, { name: 'grade' }],
    },
    {
      id: 'history',
      name: 'CourseHistory',
      note: '이수 내역',
      x: 434,
      y: 20,
      w: 172,
      columns: [{ name: 'status' }],
    },
    {
      id: 'course',
      name: 'Course',
      note: '개설 강좌 · 분반마다 한 행',
      x: 638,
      y: 20,
      w: 172,
      columns: [
        { name: 'course_id', key: 'PK' },
        { name: 'subject_code', key: 'UQ' },
        { name: 'division', key: 'UQ' },
        { name: 'type' },
        { name: 'target_grade' },
        { name: 'grade_limits' },
      ],
      main: true,
    },
    {
      id: 'rec',
      name: 'TimetableRecommendation',
      note: '추천 요청',
      x: 10,
      y: 176,
      w: 196,
      columns: [{ name: 'rec_id', key: 'PK' }],
    },
    {
      id: 'plan',
      name: 'RecommendationPlan',
      note: '추천안 · 최대 3안',
      x: 234,
      y: 176,
      w: 172,
      columns: [{ name: 'plan_id', key: 'PK' }],
    },
    { id: 'planCourse', name: 'PlanCourse', note: '추천안에 담긴 강좌', x: 434, y: 176, w: 172 },
    {
      id: 'schedule',
      name: 'CourseSchedule',
      note: '요일 · 교시 · 강의실',
      x: 638,
      y: 228,
      w: 172,
      columns: [
        { name: 'day' },
        { name: 'start_period' },
        { name: 'end_period' },
        { name: 'room_id', key: 'FK' },
        { name: 'room_name' },
      ],
      main: true,
    },
    { id: 'building', name: 'Building', note: '건물', x: 234, y: 300, w: 172, main: true },
    { id: 'room', name: 'Room', note: '강의실', x: 434, y: 300, w: 172 },
  ],
  links: [
    { from: ['user', 'right'], to: ['student', 'left'], ends: ['1', '1'] },
    { from: ['student', 'right'], to: ['history', 'left'], ends: ['1', 'N'] },
    { from: ['history', 'right'], to: ['course', 'left'], ends: ['N', '1'] },
    { from: ['rec', 'right'], to: ['plan', 'left'], ends: ['1', 'N'] },
    { from: ['plan', 'right'], to: ['planCourse', 'left'], ends: ['1', 'N'] },
    { from: ['planCourse', 'right'], to: ['course', 'left'], ends: ['N', ''], via: 628 },
    { from: ['course', 'bottom'], to: ['schedule', 'top'], ends: ['1', 'N'] },
    { from: ['building', 'right'], to: ['room', 'left'], ends: ['1', 'N'] },
    { from: ['room', 'right'], to: ['schedule', 'left'], ends: ['1', 'N'], via: 616 },
  ],
  notes: [
    '그 밖의 테이블: StudentCredits, SavedTimetable, College · Department · Major, GraduationRequirement,',
    'RequiredCourse, Review, WalkEdge',
  ],
};

export const dongguramiSchema: SchemaData = {
  id: 'donggurami-schema',
  label: '동구라미 데이터 모델 중 지원과 현장 인증 부분',
  width: 800,
  tables: [
    { id: 'user', name: 'User', note: '학생 계정', x: 8, y: 20, w: 172 },
    { id: 'profile', name: 'Profile', note: '회원 정보', x: 212, y: 20, w: 172 },
    { id: 'members', name: 'ClubMembers', note: '동아리 부원', x: 416, y: 20, w: 172 },
    { id: 'club', name: 'Club', note: '동아리', x: 620, y: 20, w: 172 },
    {
      id: 'event',
      name: 'EventVerification',
      note: '행사 현장 인증 이력',
      x: 8,
      y: 116,
      w: 172,
      columns: [{ name: 'user_uuid', key: 'UQ' }, { name: 'club_uuid' }],
      main: true,
    },
    {
      id: 'aplict',
      name: 'Aplict',
      note: '지원 기록',
      x: 416,
      y: 116,
      w: 172,
      columns: [
        { name: 'club_id', key: 'FK' },
        { name: 'profile_id', key: 'FK' },
        { name: 'aplict_checked' },
        { name: 'active_flag' },
        { name: 'uk_aplict_active', key: 'UQ' },
      ],
      main: true,
    },
    { id: 'leader', name: 'Leader', note: '동아리 회장 계정', x: 620, y: 116, w: 172 },
  ],
  links: [
    { from: ['user', 'right'], to: ['profile', 'left'], ends: ['1', '1'] },
    { from: ['profile', 'right'], to: ['members', 'left'], ends: ['1', 'N'] },
    { from: ['members', 'right'], to: ['club', 'left'], ends: ['N', '1'] },
    { from: ['profile', 'right'], to: ['aplict', 'left'], ends: ['', 'N'] },
    { from: ['aplict', 'right'], to: ['club', 'left'], ends: ['N', ''] },
    { from: ['club', 'bottom'], to: ['leader', 'top'], ends: ['1', '1'] },
  ],
  notes: [
    'uk_aplict_active = UNIQUE(club_id, profile_id, active_flag). active_flag 는 처리 전인 지원서에서만 값이 있는 생성 컬럼입니다.',
    'EventVerification 은 외래 키 없이 UUID 값으로 사용자와 동아리를 가리킵니다.',
    '그 밖의 테이블: ClubIntro, ClubCategory, Notice, 사진, 토큰, Admin 등',
  ],
};

export const easygymSchema: SchemaData = {
  id: 'easygym-schema',
  label: 'easyGym 데이터 모델 중 결제 부분',
  width: 800,
  tables: [
    {
      id: 'member',
      name: 'member_tbl',
      note: '일반 회원',
      x: 8,
      y: 20,
      w: 172,
      columns: [{ name: 'memberNo' }, { name: 'memberPoints' }],
    },
    {
      id: 'payform',
      name: 'payform_tbl',
      note: '회원권 결제 · 환불',
      x: 212,
      y: 20,
      w: 172,
      columns: [{ name: 'payformNo' }, { name: 'memberNo' }, { name: 'detailNo' }, { name: 'payformSub' }],
      main: true,
    },
    {
      id: 'detail',
      name: 'detail_tbl',
      note: '운동시설',
      x: 416,
      y: 20,
      w: 172,
      columns: [{ name: 'detailNo' }, { name: 'operatorNo' }],
    },
    { id: 'review', name: 'detailreview_tbl', note: '시설 후기', x: 620, y: 20, w: 172 },
  ],
  links: [
    { from: ['member', 'right'], to: ['payform', 'left'], ends: ['1', 'N'] },
    { from: ['payform', 'right'], to: ['detail', 'left'], ends: ['N', '1'] },
    { from: ['detail', 'right'], to: ['review', 'left'], ends: ['1', 'N'] },
  ],
  notes: ['그 밖의 테이블: 사업자 회원, 찜, 신고, 자유게시판, 공지, 문의, 관리자'],
};
