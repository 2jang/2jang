// 프로젝트별 화면 캡처 목록. 슬라이더(Slider.astro)와 사진 가져오기 스크립트(scripts/import-images.mjs)가 함께 쓴다.
// file 은 원본 사진 폴더 기준 경로(확장자 없음)다. 원본 파일 이름이 한글이면 id 로 영문 이름을 정한다.

export type Device = 'pc' | 'mobile';

export interface Shot {
  file: string;
  /** 사이트에 저장할 파일 이름. 없으면 원본 파일 이름을 쓴다. */
  id?: string;
  /** 슬라이더에서 사진 아래에 보이는 짧은 제목 */
  title: string;
  /** 사진을 눌러 크게 봤을 때 아래에 보이는 설명 */
  desc: string;
}

export interface ShotTab {
  label: string;
  device: Device;
  shots: Shot[];
}

export interface ExtraImage {
  file: string;
  id: string;
  device: Device;
}

export interface ShotSet {
  tabs: ShotTab[];
  /** 슬라이더 밖에서 따로 쓰는 그림(프로젝트 소개 그림) */
  extras?: ExtraImage[];
  /** 슬라이더 아래에 적는 촬영 조건 */
  note?: string;
}

function baseName(file: string): string {
  return file.slice(file.lastIndexOf('/') + 1);
}

/** public/images 기준 경로. 예: 'washcall/mobile/04-realtime-status.webp' */
export function shotPath(key: string, device: Device, shot: Pick<Shot, 'file' | 'id'>): string {
  return `${key}/${device}/${shot.id ?? baseName(shot.file)}.webp`;
}

export function extraPath(key: string, extra: ExtraImage): string {
  return `${key}/${extra.id}.webp`;
}

const HW = 'hwaseong-dashboard';
const USW = 'USW-Circle-Link-Server';
const PL = 'privacy-lens';
const WCW = 'WashCall-Web';
const WCS = 'WashCall-Server';
const DF = 'DeepFake-Voice';
const EG = 'easyGym';
const TT = 'timetable-backend';
const SW = 'sw-hackathon-react';

export const shotSets: Record<string, ShotSet> = {
  'hwaseong-dashboard': {
    note: '2026년 11월에 촬영한 화면입니다. 지표는 2026년 8월 25일에 만든 데이터 기준입니다.',
    tabs: [
      {
        label: 'PC',
        device: 'pc',
        shots: [
          {
            file: `${HW}/pc/01-dashboard`,
            title: '대시보드 첫 화면',
            desc: '시간대별 핵심 지표와 격자 지도, 노선 조정 우선순위 Top 10을 한 화면에서 봅니다.',
          },
          {
            file: `${HW}/pc/05-map-layer-shortage`,
            title: '버스 부족도 지도',
            desc: '화성시를 1km 격자 786칸으로 나누고 버스가 부족한 정도를 색으로 표시합니다. 붉을수록 부족한 곳입니다.',
          },
          {
            file: `${HW}/pc/06-map-layer-demand`,
            title: '수요 레이어',
            desc: '지도 레이어를 부족도, 수요, 공급, 유동인구 중에서 바꿔 볼 수 있습니다.',
          },
          {
            file: `${HW}/pc/09-cell-zoom-kakao`,
            title: '격자 확대',
            desc: '격자를 누르면 확대되고 카카오 지도 배경이 그 격자에 겹쳐 보입니다. 배경과 격자의 위치를 맞추는 작업을 담당했습니다.',
          },
          {
            file: `${HW}/pc/11-map-all-routes`,
            title: '노선과 정류장',
            desc: '버스 노선과 정류장을 지도 위에 함께 표시합니다.',
          },
          {
            file: `${HW}/pc/14-demand-supply-quadrant`,
            title: '수요·공급 4분면',
            desc: '격자를 수요와 공급 기준으로 네 구역에 나눠 보여 줍니다.',
          },
          {
            file: `${HW}/pc/15-stop-profile`,
            title: '정류장 시간대별 승하차',
            desc: '선택한 격자에서 가장 가까운 정류장의 시간대별 승차·하차 인원입니다.',
          },
          {
            file: `${HW}/pc/22-assistant-panel`,
            title: 'AI 도우미',
            desc: '지표와 사용법을 묻거나 "심야로 바꿔 줘"처럼 말로 화면을 조작합니다. 답변 스트리밍과 화면 조작 지시 부분을 담당했습니다.',
          },
          {
            file: `${HW}/pc/24-simulation`,
            title: '정책 시뮬레이션',
            desc: '정류장 신설, 똑버스, 증편 중 수단을 고르고 격자를 눌러 배치합니다.',
          },
          {
            file: `${HW}/pc/26-manual-placement-kpi`,
            title: '배치 후 지표 변화',
            desc: '배치하면 사각지대 수와 잠재 통행, 사업비를 서버가 다시 계산해 보여 줍니다.',
          },
          {
            file: `${HW}/pc/29-recommendation-map`,
            title: '추천 배치안',
            desc: '예산 안에서 효과가 큰 지점을 알고리즘이 골라 지도에 표시합니다.',
          },
          {
            file: `${HW}/pc/34-scenario-compare`,
            title: '시나리오 비교',
            desc: '저장한 배치안 두 개를 사업비와 줄어든 사각지대 수로 비교합니다.',
          },
          {
            file: `${HW}/pc/43-report-draft`,
            title: 'AI 검토 보고서',
            desc: '현재 분석과 시나리오로 공문 서식의 보고서 초안을 만듭니다. 원본과 다른 수치는 경고로 표시합니다.',
          },
          {
            file: `${HW}/pc/47-admin`,
            title: '관리자 콘솔',
            desc: '모델과 화면이 쓰는 값을 조정하고 데이터를 다시 계산하는 화면입니다. 화면과 API를 모두 담당했습니다.',
          },
          {
            file: `${HW}/pc/50-admin-confirm`,
            title: '적용 전 확인',
            desc: '값을 바꾸기 전에 이전 값과 새 값을 확인하고, 바꾼 내용은 이력으로 남깁니다.',
          },
          {
            file: `${HW}/pc/46-archive-mode`,
            title: '보관판',
            desc: '서버 없이 녹화된 응답으로 동작하는 보관판입니다. 대회가 끝난 뒤 팀원이 추가했습니다.',
          },
        ],
      },
      {
        label: '모바일',
        device: 'mobile',
        shots: [
          {
            file: `${HW}/mobile/01-dashboard`,
            title: '대시보드 첫 화면',
            desc: '휴대폰 폭에서 본 대시보드 첫 화면입니다.',
          },
          {
            file: `${HW}/mobile/05-map-layer-shortage`,
            title: '버스 부족도 지도',
            desc: '격자 지도를 휴대폰 폭에 맞춰 보여 줍니다.',
          },
          {
            file: `${HW}/mobile/09-cell-zoom-kakao`,
            title: '격자 확대',
            desc: '격자를 확대하면 카카오 지도 배경이 겹쳐 보입니다.',
          },
          {
            file: `${HW}/mobile/22-assistant-panel`,
            title: 'AI 도우미',
            desc: '휴대폰에서 연 AI 도우미 패널입니다.',
          },
          {
            file: `${HW}/mobile/24-simulation`,
            title: '정책 시뮬레이션',
            desc: '휴대폰에서 본 시뮬레이션 화면입니다.',
          },
          {
            file: `${HW}/mobile/47-admin`,
            title: '관리자 콘솔',
            desc: '휴대폰에서 본 관리자 콘솔입니다.',
          },
        ],
      },
    ],
  },

  donggurami: {
    note: '2026년 11월 운영 중인 사이트에서 촬영했습니다. 화면(프론트엔드)은 팀원 작업이고, 현재 운영 버전에는 제가 참여한 뒤에 팀원이 바꾼 기능도 들어 있습니다. 이름과 연락처는 가렸습니다. 지금은 사진 저장소 문제로 동아리 사진이 표시되지 않아, 백업해 둔 사진을 채워서 촬영했습니다.',
    tabs: [
      {
        label: '학생용 화면',
        device: 'mobile',
        shots: [
          {
            file: `${USW}/mobile/app-01_메인_동아리목록_1`,
            id: 'app-01-list',
            title: '동아리 목록',
            desc: '분과별로 중앙동아리를 보여 줍니다.',
          },
          {
            file: `${USW}/mobile/app-02_메인_모집중탭`,
            id: 'app-02-recruiting',
            title: '모집 중',
            desc: '지금 모집 중인 동아리만 모아 봅니다.',
          },
          {
            file: `${USW}/mobile/app-03_메인_관심카테고리필터`,
            id: 'app-03-filter',
            title: '관심 카테고리',
            desc: '관심 카테고리를 최대 3개 골라 맞는 동아리를 찾습니다.',
          },
          {
            file: `${USW}/mobile/app-05_동아리상세_소개글_1`,
            id: 'app-05-intro',
            title: '동아리 소개',
            desc: '소개 글과 활동 사진, 회장 이름을 봅니다. 회장 이름은 가렸습니다.',
          },
          {
            file: `${USW}/mobile/app-06_동아리상세_모집글`,
            id: 'app-06-recruit',
            title: '모집 글',
            desc: '동아리가 올린 모집 글을 봅니다.',
          },
          {
            file: `${USW}/mobile/app-07_동아리상세_지원하기_로그인안내`,
            id: 'app-07-apply',
            title: '지원하기',
            desc: '로그인하지 않고 지원하기를 누르면 로그인 안내가 나옵니다.',
          },
          {
            file: `${USW}/mobile/app-08_공지사항_목록`,
            id: 'app-08-notices',
            title: '공지사항',
            desc: '동아리연합회가 올린 공지 목록입니다.',
          },
          {
            file: `${USW}/mobile/app-10_로그인`,
            id: 'app-10-login',
            title: '로그인',
            desc: '학생 로그인 화면입니다. 로그인 시도는 5분에 5회로 제한합니다.',
          },
          {
            file: `${USW}/mobile/app-15_신규회원가입_이메일인증`,
            id: 'app-15-email',
            title: '학교 메일 인증',
            desc: '신규 가입은 학교 포털 메일로 인증합니다.',
          },
          {
            file: `${USW}/mobile/app-16_기존회원가입_소속동아리선택`,
            id: 'app-16-existing',
            title: '기존 동아리원 가입',
            desc: '이미 동아리에 속한 학생은 소속 동아리를 골라 가입을 요청하고, 회장이 승인합니다.',
          },
        ],
      },
      {
        label: '회장·연합회용 관리 웹',
        device: 'pc',
        shots: [
          {
            file: `${USW}/pc/admin-01_랜딩_1_히어로`,
            id: 'admin-01-landing',
            title: '관리 웹 첫 화면',
            desc: '동아리 회장과 동아리연합회가 쓰는 관리 웹의 첫 화면입니다.',
          },
          {
            file: `${USW}/pc/admin-01_랜딩_2_기능소개`,
            id: 'admin-01-features',
            title: '기능 안내',
            desc: '관리 웹이 제공하는 기능을 안내하는 화면입니다.',
          },
          {
            file: `${USW}/pc/admin-02_로그인`,
            id: 'admin-02-login',
            title: '회장·연합회 로그인',
            desc: '동아리 회장과 동아리연합회 계정으로 로그인합니다.',
          },
          {
            file: `${USW}/pc/admin-03_데모대시보드`,
            id: 'admin-03-dashboard',
            title: '회장 대시보드',
            desc: '동아리 정보와 부원 명단을 관리합니다. 사이트에 들어 있는 데모 데이터 화면이라 실제 정보가 아닙니다.',
          },
        ],
      },
    ],
  },

  'privacy-lens': {
    note: '사진 속 문서와 개인정보는 모두 가상 데이터입니다.',
    tabs: [
      {
        label: 'PC',
        device: 'pc',
        shots: [
          {
            file: `${PL}/pc/01-home`,
            title: '첫 화면',
            desc: '사진을 올리거나 찍어서 검사를 시작합니다. 가상 샘플 사진 3장으로 바로 써 볼 수 있습니다.',
          },
          {
            file: `${PL}/pc/03-targets`,
            title: '탐지 항목',
            desc: '이름, 연락처, 주소, 주민등록번호, 카드번호, 운송장번호 등 찾는 항목을 안내합니다.',
          },
          {
            file: `${PL}/pc/08-scanning`,
            title: '분석 진행 표시',
            desc: '처리 단계와 남은 시간을 실시간으로 보여 줍니다. 대기열과 진행 표시를 담당했습니다.',
          },
          {
            file: `${PL}/pc/09-review-parcel`,
            title: '위험 확인',
            desc: '찾은 위치를 사진 위에 번호로 표시하고, 항목마다 판정과 근거를 보여 줍니다.',
          },
          {
            file: `${PL}/pc/10-protected-parcel`,
            title: '가림 결과',
            desc: '고른 영역을 흐리게 하거나 검은색으로 가립니다.',
          },
          {
            file: `${PL}/pc/11-compare-parcel`,
            title: '원본과 비교',
            desc: '가리기 전과 후를 슬라이더로 비교합니다.',
          },
          {
            file: `${PL}/pc/12-edit-mode`,
            title: '영역 직접 수정',
            desc: '놓친 곳을 직접 추가하거나 영역을 옮기고 지웁니다.',
          },
          {
            file: `${PL}/pc/16-saved`,
            title: '저장',
            desc: '메타데이터를 지운 사진을 내려받거나 공유합니다.',
          },
          {
            file: `${PL}/pc/17-review-student`,
            title: '신분증이 찍힌 사진',
            desc: '카페 사진 구석에 찍힌 신분증에서 개인정보를 찾은 화면입니다.',
          },
          {
            file: `${PL}/pc/19-review-mixed`,
            title: '모니터와 서류가 찍힌 사진',
            desc: '모니터 화면과 책상 위 서류에서 여러 항목을 함께 찾은 화면입니다.',
          },
          {
            file: `${PL}/pc/05-judge-model`,
            title: '판단 모델 선택',
            desc: '기본은 규칙 판단이고, LLM이나 Gemini Decision으로 바꿀 수 있습니다. 판단 모델 연동을 담당했습니다.',
          },
          {
            file: `${PL}/pc/07-engine-list`,
            title: '분석 엔진 관리',
            desc: '게이트웨이에 연결된 분석 엔진을 추가·제거하고 순서를 바꿉니다. 게이트웨이를 설계하고 개발했습니다.',
          },
          {
            file: `${PL}/pc/14-raw-ocr`,
            title: 'OCR 원문 보기',
            desc: '개발 도구에서 OCR이 읽은 글자와 위치를 확인합니다.',
          },
          {
            file: `${PL}/pc/21-review-dark`,
            title: '어두운 화면',
            desc: '어두운 화면에서 본 위험 확인 화면입니다.',
          },
        ],
      },
      {
        label: '모바일',
        device: 'mobile',
        shots: [
          {
            file: `${PL}/mobile/01-home`,
            title: '첫 화면',
            desc: '휴대폰에서는 카메라로 바로 찍어 검사할 수 있습니다.',
          },
          {
            file: `${PL}/mobile/08-scanning`,
            title: '분석 진행 표시',
            desc: '처리 단계와 남은 시간을 실시간으로 보여 줍니다.',
          },
          {
            file: `${PL}/mobile/09-review-parcel`,
            title: '위험 확인',
            desc: '찾은 위치를 사진 위에 번호로 표시합니다.',
          },
          {
            file: `${PL}/mobile/10-protected-parcel`,
            title: '가림 결과',
            desc: '고른 영역을 가린 결과입니다.',
          },
          {
            file: `${PL}/mobile/11-compare-parcel`,
            title: '원본과 비교',
            desc: '가리기 전과 후를 슬라이더로 비교합니다.',
          },
          {
            file: `${PL}/mobile/17-review-student`,
            title: '신분증이 찍힌 사진',
            desc: '카페 사진 구석에 찍힌 신분증에서 개인정보를 찾은 화면입니다.',
          },
          {
            file: `${PL}/mobile/16-saved`,
            title: '저장',
            desc: '가린 사진을 내려받거나 공유합니다.',
          },
        ],
      },
    ],
  },

  washcall: {
    note: '화면은 앱의 목업 모드(데모 데이터)로 촬영했습니다. 혼잡도 그래프만 운영 중에 쌓인 집계 값입니다. 화면 디자인과 화면 로직 대부분은 팀원 작업입니다.',
    extras: [{ file: `${WCW}/pc/00-overview`, id: 'overview', device: 'pc' }],
    tabs: [
      {
        label: '모바일',
        device: 'mobile',
        shots: [
          {
            file: `${WCW}/mobile/04-realtime-status`,
            title: '실시간 현황',
            desc: '세탁기별 상태와 총 예상 시간, 진행 시간을 보여 줍니다. 위쪽에는 한산한 시간을 알려 주는 AI 추천 문구가 나옵니다.',
          },
          {
            file: `${WCW}/mobile/05-course-select`,
            title: '코스 선택',
            desc: '빈 세탁기에서 세탁 시작을 누르고 표준·강력 코스를 고릅니다.',
          },
          {
            file: `${WCW}/mobile/06-course-started-alert-on`,
            title: '완료 알림 등록',
            desc: '코스를 고르면 완료 알림이 함께 등록되고, 카드가 "세탁 중"으로 바뀝니다.',
          },
          {
            file: `${WCW}/mobile/07-notify-me-during-wash`,
            title: '알림 받기',
            desc: '돌아가고 있는 세탁기에도 완료 알림을 신청할 수 있습니다.',
          },
          {
            file: `${WCW}/mobile/08-vacancy-alert-on`,
            title: '빈자리 알림',
            desc: '모든 세탁기가 사용 중일 때 켜 두면 하나라도 끝났을 때 알려 줍니다.',
          },
          {
            file: `${WCW}/mobile/09-congestion-chart`,
            title: '시간대별 혼잡도',
            desc: '요일을 골라 시간대별 평균 사용 대수를 봅니다.',
          },
          {
            file: `${WCW}/mobile/13-pwa-install-ios`,
            title: '설치 안내(iOS)',
            desc: 'iOS는 홈 화면에 추가해야 푸시를 받을 수 있어 설치 방법을 안내합니다. 이 기능을 담당했습니다.',
          },
          {
            file: `${WCW}/mobile/13-pwa-install-android`,
            title: '설치 안내(Android)',
            desc: 'Android에서는 앱 설치 버튼을 보여 줍니다.',
          },
          {
            file: `${WCW}/mobile/14-mock-mode-fallback`,
            title: '목업 모드',
            desc: '서버에 연결하지 못하면 데모 데이터로 화면을 보여 줍니다. 개발 브랜치에만 있는 기능이고 직접 만들었습니다.',
          },
          {
            file: `${WCW}/mobile/10-survey`,
            title: '사용성 설문',
            desc: '서비스 사용성 설문 화면입니다.',
          },
          {
            file: `${WCW}/mobile/11-dark-mode-status`,
            title: '어두운 화면',
            desc: '어두운 화면에서 본 실시간 현황입니다.',
          },
        ],
      },
      {
        label: 'PC',
        device: 'pc',
        shots: [
          {
            file: `${WCW}/pc/04-realtime-status`,
            title: '실시간 현황',
            desc: 'PC에서 본 실시간 현황입니다.',
          },
          {
            file: `${WCW}/pc/05-course-select`,
            title: '코스 선택',
            desc: '세탁 시작을 누르면 코스 선택 창이 열립니다.',
          },
          {
            file: `${WCW}/pc/09-congestion-chart`,
            title: '시간대별 혼잡도',
            desc: '요일별 9~21시 평균 사용 대수 그래프입니다.',
          },
          {
            file: `${WCW}/pc/13-pwa-install-desktop`,
            title: '설치 안내(PC)',
            desc: 'PC 브라우저용 설치 안내입니다.',
          },
        ],
      },
      {
        label: '서버 API 문서',
        device: 'pc',
        shots: [
          {
            file: `${WCS}/pc/02-swagger-api-list`,
            title: 'API 목록',
            desc: '서버의 Swagger 문서입니다. 센서용, 학생·관리자용, 라벨링용 API로 나뉩니다.',
          },
          {
            file: `${WCS}/pc/03-swagger-update-detail`,
            title: '센서 상태 보고 API',
            desc: '센서가 세탁기 상태를 보내는 POST /update의 요청 형식입니다.',
          },
          {
            file: `${WCS}/pc/04-swagger-load-detail`,
            title: '메인 화면 API',
            desc: '메인 화면이 부르는 POST /load의 응답 형식입니다.',
          },
        ],
      },
    ],
  },

  'deepfake-voice': {
    note: '로컬에서 실행해 평가용 음성 파일로 촬영한 화면입니다. 화면에 보이는 EER 수치는 데이터 분할을 고치기 전 값이라 최종 성능이 아닙니다.',
    extras: [{ file: `${DF}/pc/00-overview`, id: 'overview', device: 'pc' }],
    tabs: [
      {
        label: 'PC',
        device: 'pc',
        shots: [
          {
            file: `${DF}/pc/01-home`,
            title: '첫 화면',
            desc: '마이크 녹음, 파일 업로드, 실시간 감시 탭과 모델 선택이 있습니다.',
          },
          {
            file: `${DF}/pc/03-upload-dropzone`,
            title: '파일 업로드',
            desc: 'WAV, MP3, FLAC 등 음성 파일을 올립니다.',
          },
          {
            file: `${DF}/pc/04-result-fake`,
            title: '판정 결과',
            desc: '음성 복제로 만든 평가용 파일을 올린 결과입니다. 딥페이크 의심 여부와 확률, 구간별 결과, 스펙트로그램을 보여 줍니다.',
          },
          {
            file: `${DF}/pc/05-segment-uncertain-verdict`,
            title: '판별 불확실',
            desc: '확률이 0.4~0.6이면 단정하지 않고 "판별 불확실"로 표시합니다.',
          },
          {
            file: `${DF}/pc/06-segment-timeline`,
            title: '구간별 분석',
            desc: '4초 구간마다 판정해 의심 구간을 색으로 표시합니다. 실제 음성 뒤에 합성 음성을 이어 붙인 파일이라 12초 지점부터 붉게 바뀝니다.',
          },
          {
            file: `${DF}/pc/07-model-compare`,
            title: '모델 6종 비교',
            desc: '같은 음성을 모델 6종으로 동시에 판정해 확률과 추론 시간을 비교합니다.',
          },
          {
            file: `${DF}/pc/08-quality-warning`,
            title: '입력 품질 경고',
            desc: '소리가 찢어지거나 거의 무음이면 경고를 표시합니다.',
          },
          {
            file: `${DF}/pc/09-history`,
            title: '분석 기록',
            desc: '이번 접속에서 판정한 결과를 목록으로 보여 줍니다.',
          },
          {
            file: `${DF}/pc/12-stream-detect-fake`,
            title: '실시간 감시',
            desc: '말하는 동안 0.5초마다 판정해 그래프로 그립니다. 가상 마이크에 음성 파일을 넣어 재현한 시연 화면입니다.',
          },
          {
            file: `${DF}/pc/13-stream-summary`,
            title: '감시 요약',
            desc: '감시가 끝나면 결과를 요약해 보여 줍니다.',
          },
          {
            file: `${DF}/pc/14-api-docs`,
            title: 'API 문서',
            desc: 'FastAPI가 만드는 Swagger 문서입니다.',
          },
        ],
      },
    ],
  },

  easygym: {
    note: '서비스가 내려가 있어 로컬에서 실행해 촬영했습니다. 회원 정보는 가상 값으로 바꿨습니다. 결제·환불, 지역 검색, 챗봇, 캡차가 제 작업이고 나머지 화면은 팀원 작업입니다.',
    tabs: [
      {
        label: 'PC',
        device: 'pc',
        shots: [
          { file: `${EG}/pc/01_메인`, id: '01-main', title: '메인', desc: '서비스 첫 화면입니다.' },
          {
            file: `${EG}/pc/03_메인_인기시설`,
            id: '03-popular',
            title: '분류별 인기순위',
            desc: '헬스·필라테스·복싱별로 후기 별점이 높은 시설을 보여 줍니다.',
          },
          {
            file: `${EG}/pc/05_시설목록_헬스`,
            id: '05-list',
            title: '시설 목록',
            desc: '사진, 주소, 가격, 무료 서비스를 비교합니다. 오른쪽 빈 영역은 지도 자리인데, 지도 서비스 키가 정지돼 표시되지 않습니다.',
          },
          {
            file: `${EG}/pc/08_지역검색_결과`,
            id: '08-search',
            title: '지역 검색',
            desc: '주소와 상호로 시설을 찾습니다. 직접 만든 기능입니다.',
          },
          {
            file: `${EG}/pc/09_시설상세`,
            id: '09-detail',
            title: '시설 상세',
            desc: '사진, 가격, 편의시설, 후기를 봅니다.',
          },
          {
            file: `${EG}/pc/13_결제_회원권구매`,
            id: '13-pay-form',
            title: '회원권 구매',
            desc: '개월 수를 고르면 할인이 적용되고 포인트를 쓸 수 있습니다. 결제 기능은 화면부터 DB까지 직접 만들었습니다.',
          },
          {
            file: `${EG}/pc/14_결제_토스결제창`,
            id: '14-pay-toss',
            title: '결제창',
            desc: '토스페이먼츠 테스트 결제창입니다. 실제 결제는 되지 않습니다.',
          },
          {
            file: `${EG}/pc/15_결제_완료`,
            id: '15-pay-done',
            title: '구매 완료',
            desc: '결제가 끝나면 구매 내용을 보여 줍니다.',
          },
          {
            file: `${EG}/pc/16_결제_환불신청`,
            id: '16-refund-form',
            title: '환불 신청',
            desc: '결제 후 7일 이내에 환불할 수 있습니다.',
          },
          {
            file: `${EG}/pc/17_결제_환불완료`,
            id: '17-refund-done',
            title: '환불 완료',
            desc: '환불이 끝난 화면입니다.',
          },
          {
            file: `${EG}/pc/18_마이페이지_이용중인상품`,
            id: '18-mypage',
            title: '마이페이지',
            desc: '이용 중인 회원권과 찜, 구매 내역, 후기를 관리합니다.',
          },
          {
            file: `${EG}/pc/04_챗봇`,
            id: '04-chatbot',
            title: '챗봇',
            desc: 'LLM 답변을 스트리밍으로 보여 주는 챗봇입니다. 팀 프로젝트가 끝난 뒤 직접 추가했습니다.',
          },
          {
            file: `${EG}/pc/29_일반회원_로그인`,
            id: '29-login',
            title: '로그인과 봇 방지',
            desc: '로그인과 가입 화면에 캡차를 넣고 서버에서 검증합니다. 촬영에는 테스트 키를 썼습니다.',
          },
          {
            file: `${EG}/pc/23_자유게시판_목록`,
            id: '23-board',
            title: '자유게시판',
            desc: '회원이 글을 쓰고 댓글을 다는 게시판입니다.',
          },
          {
            file: `${EG}/pc/36_사업자_업체등록`,
            id: '36-operator',
            title: '사업자 시설 등록',
            desc: '사업자가 시설 정보와 가격, 사진을 등록합니다.',
          },
          {
            file: `${EG}/pc/39_관리자_회원목록`,
            id: '39-admin',
            title: '관리자 화면',
            desc: '회원, 사업자, 업체, 신고, 공지를 관리합니다. 연락처는 가상 값입니다.',
          },
        ],
      },
      {
        label: '모바일',
        device: 'mobile',
        shots: [
          { file: `${EG}/mobile/01_메인`, id: '01-main', title: '메인', desc: '휴대폰에서 본 첫 화면입니다.' },
          {
            file: `${EG}/mobile/13_결제_회원권구매`,
            id: '13-pay-form',
            title: '회원권 구매',
            desc: '휴대폰에서 본 회원권 구매 화면입니다.',
          },
          {
            file: `${EG}/mobile/14_결제_토스결제창`,
            id: '14-pay-toss',
            title: '결제창',
            desc: '토스페이먼츠 테스트 결제창입니다.',
          },
          {
            file: `${EG}/mobile/15_결제_완료`,
            id: '15-pay-done',
            title: '구매 완료',
            desc: '결제가 끝난 화면입니다.',
          },
        ],
      },
    ],
  },

  timetable: {
    note: '로컬에서 데모 데이터로 실행해 촬영했습니다. 계정은 실제 학생이 아닌 데모 계정입니다. 화면(프론트엔드) 대부분은 팀원 작업입니다.',
    tabs: [
      {
        label: 'PC',
        device: 'pc',
        shots: [
          {
            file: `${TT}/pc/03-home-dashboard`,
            title: '홈',
            desc: '이번 주 대표 시간표와 학사일정, D-day를 보여 줍니다.',
          },
          {
            file: `${TT}/pc/06b-plan-conditions`,
            title: '조건 설정',
            desc: '수업 시작 시간, 공강 요일, 연강·공강 선호, 목표 학점을 고릅니다.',
          },
          {
            file: `${TT}/pc/07a-result-summary`,
            title: '추천 결과 비교',
            desc: '서버가 만든 시간표 3안을 추천도, 공강, 학점, 이동거리로 비교합니다.',
          },
          {
            file: `${TT}/pc/07b-result-timetable`,
            title: '추천 시간표',
            desc: '고른 안의 주간 시간표와 학점 구성입니다.',
          },
          {
            file: `${TT}/pc/07c-result-walk-empty-rooms`,
            title: '이동 동선과 빈 강의실',
            desc: '강의실 사이 도보 이동과 공강 시간에 가까운 빈 강의실을 보여 줍니다. 건물 좌표와 도보 경로 데이터는 서버가 제공합니다.',
          },
          {
            file: `${TT}/pc/08-result-compare`,
            title: '3안 나란히 보기',
            desc: '시간표 3안을 나란히 놓고 비교합니다.',
          },
          {
            file: `${TT}/pc/09a-my-timetables`,
            title: '내 시간표',
            desc: '마음에 드는 안을 저장하고 대표 시간표로 정합니다.',
          },
          {
            file: `${TT}/pc/10a-graduation-summary`,
            title: '졸업요건 현황',
            desc: '영역별 이수 학점과 부족한 학점을 보여 줍니다.',
          },
          {
            file: `${TT}/pc/10c-graduation-required-checklist`,
            title: '필수과목 체크',
            desc: '학년·학기별 필수과목 이수 여부를 체크합니다.',
          },
          {
            file: `${TT}/pc/12-calendar-dday`,
            title: '학사일정과 D-day',
            desc: '학사일정과 개인 D-day를 함께 봅니다.',
          },
          {
            file: `${TT}/pc/16a-swagger-api-list`,
            title: 'API 문서',
            desc: '백엔드의 Swagger 문서입니다. 엔드포인트는 25개입니다.',
          },
          {
            file: `${TT}/pc/16c-swagger-recommend-response`,
            title: '추천 API 응답',
            desc: '시간표 추천 API를 호출한 요청과 응답입니다.',
          },
        ],
      },
      {
        label: '모바일',
        device: 'mobile',
        shots: [
          {
            file: `${TT}/mobile/03-home-dashboard`,
            title: '홈',
            desc: '휴대폰에서 본 홈 화면입니다.',
          },
          {
            file: `${TT}/mobile/06b-plan-conditions`,
            title: '조건 설정',
            desc: '휴대폰에서 본 조건 설정 화면입니다.',
          },
          {
            file: `${TT}/mobile/07a-result-summary`,
            title: '추천 결과 비교',
            desc: '시간표 3안을 비교하는 화면입니다.',
          },
          {
            file: `${TT}/mobile/07b-result-timetable`,
            title: '추천 시간표',
            desc: '고른 안의 주간 시간표입니다.',
          },
          {
            file: `${TT}/mobile/10a-graduation-summary`,
            title: '졸업요건 현황',
            desc: '영역별 이수 학점과 부족한 학점을 보여 줍니다.',
          },
        ],
      },
    ],
  },

  'suwon-ai': {
    note: '운영 서버가 내려가 있어 로컬 서버로 실행해 촬영했습니다.',
    tabs: [
      {
        label: 'PC',
        device: 'pc',
        shots: [
          {
            file: `${SW}/pc/01-home`,
            title: '홈',
            desc: '수원대학교 지능형SW융합대학 소개 사이트의 첫 화면입니다.',
          },
          {
            file: `${SW}/pc/03-nav-menu`,
            title: '전체 메뉴',
            desc: '학부 3개, 학과 5개, 편의 기능 3개로 이동합니다.',
          },
          {
            file: `${SW}/pc/10-dept-computer-sw`,
            title: '학과 소개',
            desc: '학과 소개와 주요 전공 교과목을 보여 줍니다.',
          },
          {
            file: `${SW}/pc/21-graduate-checklist`,
            title: '졸업요건 체크',
            desc: '학과를 고르고 졸업요건을 체크합니다.',
          },
          {
            file: `${SW}/pc/22-graduate-result-fail`,
            title: '졸업요건 결과',
            desc: '충족한 비율과 남은 비율을 보여 줍니다.',
          },
          {
            file: `${SW}/pc/25-pathfinder-map`,
            title: '캠퍼스 길찾기',
            desc: '캠퍼스 지도에서 출발 건물과 도착 건물을 차례로 누릅니다.',
          },
          {
            file: `${SW}/pc/27-pathfinder-route`,
            title: '경로 표시',
            desc: '고른 두 건물 사이에 화살표로 경로를 표시합니다.',
          },
          {
            file: `${SW}/pc/28-pathfinder-result`,
            title: '소요 시간',
            desc: '예상 도보 시간은 서버에서 받고, 직선거리는 지도 축척으로 계산합니다.',
          },
          {
            file: `${SW}/pc/30-clickbattle-scoreboard`,
            title: '딸깍 배틀',
            desc: '학부 대항 실시간 클릭 게임입니다. 버튼을 누르면 접속한 모든 사람의 화면에 점수가 바로 반영됩니다.',
          },
          {
            file: `${SW}/pc/31-clickbattle-click-rank`,
            title: '순위 변동',
            desc: '점수에 따라 카드 순서와 왕관이 바뀝니다.',
          },
          {
            file: `${SW}/pc/32-clickbattle-fever`,
            title: '피버 타임',
            desc: '피버 게이지가 차면 10초 동안 클릭이 2배로 반영됩니다.',
          },
          {
            file: `${SW}/pc/34-chatbot-open`,
            title: '챗봇',
            desc: '모든 페이지 오른쪽 아래에서 챗봇 창을 엽니다.',
          },
        ],
      },
      {
        label: '모바일',
        device: 'mobile',
        shots: [
          { file: `${SW}/mobile/01-home`, title: '홈', desc: '휴대폰에서 본 첫 화면입니다.' },
          {
            file: `${SW}/mobile/21-graduate-checklist`,
            title: '졸업요건 체크',
            desc: '휴대폰에서 본 졸업요건 체크 화면입니다.',
          },
          {
            file: `${SW}/mobile/25-pathfinder-map`,
            title: '캠퍼스 길찾기',
            desc: '휴대폰에서도 지도에서 건물을 눌러 고릅니다.',
          },
          {
            file: `${SW}/mobile/27-pathfinder-route`,
            title: '경로 표시',
            desc: '고른 두 건물 사이의 경로입니다.',
          },
          {
            file: `${SW}/mobile/30-clickbattle-scoreboard`,
            title: '딸깍 배틀',
            desc: '휴대폰에서 본 점수판입니다.',
          },
          {
            file: `${SW}/mobile/32-clickbattle-fever`,
            title: '피버 타임',
            desc: '피버 게이지가 찬 화면입니다.',
          },
        ],
      },
    ],
  },
};
