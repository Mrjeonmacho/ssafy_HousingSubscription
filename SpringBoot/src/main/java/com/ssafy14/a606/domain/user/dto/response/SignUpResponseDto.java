package com.ssafy14.a606.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpResponseDto {
    private Long userId;
    private String userName;
    private String role;
}
