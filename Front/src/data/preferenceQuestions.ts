export type PreferenceOptionItem = {
  label: string;
  value: string;
};

export type PreferenceQuestion = {
  questionKey: string;
  category: string;
  title: string;
  options: PreferenceOptionItem[];
};

export const preferenceQuestions: PreferenceQuestion[] = [
  {
    questionKey: "COMMUTE_TIME",
    category: "출퇴근 / 통학 시간",
    title: "당신은 출·퇴근(통학) 시간이 어느 정도였으면 좋겠나요?",
    options: [
      { label: "30분 이내가 꼭 필요해요", value: "WITHIN_30_MIN" },
      { label: "1시간 이내면 괜찮아요", value: "WITHIN_1_HOUR" },
      { label: "크게 상관없어요", value: "NO_LIMIT" },
    ],
  },

  {
    questionKey: "HOUSING_COST",
    category: "월 고정 주거비",
    title: "매달 고정적으로 나가는 주거비(월세·관리비 포함)에 대해 가장 가까운 생각은 무엇인가요?",
    options: [
      { label: "최대한 줄이고 싶어요", value: "MINIMIZE_COST" },
      { label: "적정 수준이면 괜찮아요", value: "BALANCED_COST" },
      { label: "조건이 좋다면 어느 정도 감수할 수 있어요", value: "FLEXIBLE_COST" },
    ],
  },

  {
    questionKey: "LOAN_ATTITUDE",
    category: "대출에 대한 태도",
    title: "주거를 위해 대출을 이용하는 것에 대해 어떻게 생각하시나요?",
    options: [
      { label: "가능하면 대출은 피하고 싶어요", value: "AVOID_LOAN" },
      { label: "조건이 괜찮다면 고려할 수 있어요", value: "CONDITIONAL_LOAN" },
      { label: "기회가 된다면 적극적으로 활용할 수 있어요", value: "ACTIVE_LOAN" },
    ],
  },

  {
    questionKey: "STAY_DURATION",
    category: "거주 기간",
    title: "한 곳에 얼마나 오래 거주하고 싶으신가요?",
    options: [
      { label: "5년 이상 오래 안정적으로 살고 싶어요", value: "LONG_TERM" },
      { label: "2~4년 정도면 충분해요", value: "MID_TERM" },
      { label: "2년 미만으로 짧게 거주해도 괜찮아요", value: "SHORT_TERM" },
    ],
  },

  {
    questionKey: "RELOCATION_FLEX",
    category: "이사 / 이동에 대한 생각",
    title: "직장·학교·생활 변화로 이사해야 한다면 어떻게 생각하시나요?",
    options: [
      { label: "이사는 가급적 피하고 싶어요", value: "AVOID_MOVE" },
      { label: "필요하다면 이동할 수 있어요", value: "CONDITIONAL_MOVE" },
      { label: "이동하는 것 자체는 부담 없어요", value: "FLEXIBLE_MOVE" },
    ],
  },

  {
    questionKey: "SACRIFICE_PRIORITY",
    category: "포기 가능한 요소",
    title: "아래 중 하나를 꼭 포기해야 한다면, 어떤 요소를 선택하시겠어요?",
    options: [
      { label: "집의 위치(역세권, 접근성)", value: "SACRIFICE_LOCATION" },
      { label: "비용(월세, 보증금)", value: "SACRIFICE_COST" },
      { label: "거주 기간의 안정성", value: "SACRIFICE_STABILITY" },
    ],
  },
];
