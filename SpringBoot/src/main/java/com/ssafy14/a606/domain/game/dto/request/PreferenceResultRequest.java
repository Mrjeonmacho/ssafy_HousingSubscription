package com.ssafy14.a606.domain.game.dto.request;

import java.util.List;

public class PreferenceResultRequest {

    private List<PreferenceAnswerRequest> answers;

    public List<PreferenceAnswerRequest> getAnswers() {
        return answers;
    }
}