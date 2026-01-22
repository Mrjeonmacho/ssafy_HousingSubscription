package com.ssafy14.a606.domain.game.enums;

public enum PreferenceType {

    STABLE_SEEKER(
            "안정 추구형",
            "출퇴근 접근성과 주거 안정성을 중요하게 생각하며, 한 곳에서 오래 거주할 수 있는 환경을 선호하는 유형입니다.",
            "공공임대주택 / 행복주택 / 장기임대주택 적합",
            "거주의무기간, 대출 제한 여부, 교통 접근성을 중심으로 공고를 확인하세요."
    ),

    FLEXIBLE_MOVER(
            "자유 이동형",
            "거주 기간과 위치에 큰 제약을 두지 않고, 상황에 따라 유연하게 이동할 수 있는 주거를 선호하는 유형입니다.",
            "민간임대 / 단기임대 / 전월세 적합",
            "계약 기간, 갱신 조건, 중도 해지 가능 여부를 꼼꼼히 확인하세요."
    ),

    COST_CONSERVATIVE(
            "비용 보수형",
            "주거 위치보다 비용 부담을 더 중요하게 생각하며, 월세와 보증금 등 실질적인 지출을 최소화하려는 유형입니다.",
            "공공임대 / 청년월세지원 / 보증금 낮은 전세 적합",
            "관리비 포함 여부와 월 고정 지출 총액을 기준으로 공고를 비교하세요."
    ),

    OPPORTUNITY_SEEKER(
            "기회 추구형",
            "초기 비용이나 대출 부담을 감수하더라도, 입지나 향후 가치 상승 가능성을 중시하는 유형입니다.",
            "민영주택 / 분양전환형 임대주택 / 입지 우수 지역 적합",
            "대출 조건과 상환 계획, 분양 전환 가능 여부를 반드시 확인하세요."
    ),

    LOCATION_PRIORITY(
            "입지 우선형",
            "주거 비용보다 출퇴근과 통학 편의성, 생활 인프라 접근성을 가장 중요하게 생각하는 유형입니다.",
            "역세권 주택 / 도심 소형 주택 / 교통 중심지 적합",
            "교통 노선과 실제 출퇴근 시간을 기준으로 공고를 살펴보세요."
    ),

    BALANCE_SEEKER(
            "균형 추구형",
            "비용, 입지, 거주 기간 등 여러 요소를 균형 있게 고려하여 합리적인 선택을 하려는 유형입니다.",
            "행복주택 / 공공지원 민간임대 / 중간 입지 주택 적합",
            "특정 조건 하나보다 전체 조건을 종합적으로 비교해 보세요."
    );

    private final String displayName;
    private final String summary;
    private final String recommend;
    private final String noticeTip;

    PreferenceType(String displayName, String summary, String recommend, String noticeTip) {
        this.displayName = displayName;
        this.summary = summary;
        this.recommend = recommend;
        this.noticeTip = noticeTip;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getSummary() {
        return summary;
    }

    public String getRecommend() {
        return recommend;
    }

    public String getNoticeTip() {
        return noticeTip;
    }
}
