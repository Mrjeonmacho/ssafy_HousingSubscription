package com.ssafy14.a606.domain.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignInResponseDto {

    private String accessToken;
    private String refreshToken;
    private String userName;
    private String userRole;

}
