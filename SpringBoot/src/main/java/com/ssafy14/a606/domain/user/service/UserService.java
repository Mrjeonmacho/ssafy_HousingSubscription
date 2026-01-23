package com.ssafy14.a606.domain.user.service;


import com.ssafy14.a606.domain.user.dto.request.SignUpRequestDto;
import com.ssafy14.a606.domain.user.dto.response.SignUpResponseDto;

public interface UserService {

    SignUpResponseDto signUpLocal(SignUpRequestDto request);
}
