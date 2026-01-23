package com.ssafy14.a606.domain.game.enums;

import com.ssafy14.a606.global.exceptions.InvalidValueException;

public enum PreferenceOption {

    // COMMUTE_TIME
    WITHIN_30_MIN,
    WITHIN_1_HOUR,
    NO_LIMIT,

    // HOUSING_COST
    MINIMIZE_COST,
    BALANCED_COST,
    FLEXIBLE_COST,

    // LOAN_ATTITUDE
    AVOID_LOAN,
    CONDITIONAL_LOAN,
    ACTIVE_LOAN,

    // STAY_DURATION
    LONG_TERM,
    MID_TERM,
    SHORT_TERM,

    // RELOCATION_FLEX
    AVOID_MOVE,
    CONDITIONAL_MOVE,
    FLEXIBLE_MOVE,

    // SACRIFICE_PRIORITY
    SACRIFICE_LOCATION,
    SACRIFICE_COST,
    SACRIFICE_STABILITY;

    public static PreferenceOption from(String option) {
        try {
            return PreferenceOption.valueOf(option);
        } catch (IllegalArgumentException e) {
            throw new InvalidValueException(
                    "유효하지 않은 설문 선택지입니다: " + option
            );
        }
    }
}
