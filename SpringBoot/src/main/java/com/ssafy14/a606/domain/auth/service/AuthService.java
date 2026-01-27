package com.ssafy14.a606.domain.auth.service;

import com.ssafy14.a606.domain.auth.dto.request.SignInRequestDto;
import com.ssafy14.a606.domain.auth.dto.response.SignInResponseDto;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    // 로컬 로그인
    SignInResponseDto signInLocal(SignInRequestDto request, HttpServletResponse response);
}
