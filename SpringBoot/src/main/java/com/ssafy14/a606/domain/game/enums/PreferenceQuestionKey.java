package com.ssafy14.a606.domain.game.enums;

import com.ssafy14.a606.global.exceptions.InvalidValueException;

public enum PreferenceQuestionKey {

    COMMUTE_TIME,
    HOUSING_COST,
    LOAN_ATTITUDE,
    STAY_DURATION,
    RELOCATION_FLEX,
    SACRIFICE_PRIORITY;

    public static PreferenceQuestionKey from(String key) {
        try {
            return PreferenceQuestionKey.valueOf(key);
        } catch (IllegalArgumentException e) {
            throw new InvalidValueException(
                    "유효하지 않은 설문 질문 키입니다: " + key
            );
        }
    }
}
