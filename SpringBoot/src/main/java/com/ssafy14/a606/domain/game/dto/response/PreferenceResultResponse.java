package com.ssafy14.a606.domain.game.dto.response;

public class PreferenceResultResponse {

    private String preferenceType;
    private String summary;
    private String recommend;
    private String noticeTip;

    public PreferenceResultResponse(
            String preferenceType,
            String summary,
            String recommend,
            String noticeTip
    ) {
        this.preferenceType = preferenceType;
        this.summary = summary;
        this.recommend = recommend;
        this.noticeTip = noticeTip;
    }

    public String getPreferenceType() {
        return preferenceType;
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
