package com.ssafy14.a606.domain.auth.dto.request;

import lombok.Getter;

@Getter
public class SignInRequestDto {

    private String loginId;
    private String password;

}
