package com.ssafy14.a606.domain.game.dto.request;

public class PreferenceAnswerRequest {
    private String questionKey;
    private String selectedOption;

    public String getQuestionKey() {
        return questionKey;
    }

    public String getSelectedOption() {
        return selectedOption;
    }
}
