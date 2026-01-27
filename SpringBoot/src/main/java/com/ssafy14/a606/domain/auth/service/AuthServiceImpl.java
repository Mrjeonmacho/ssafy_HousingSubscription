package com.ssafy14.a606.domain.auth.service;

import com.ssafy14.a606.domain.auth.dto.request.SignInRequestDto;
import com.ssafy14.a606.domain.auth.dto.response.SignInResponseDto;
import com.ssafy14.a606.domain.user.entity.AuthType;
import com.ssafy14.a606.domain.user.entity.User;
import com.ssafy14.a606.domain.user.repository.UserRepository;
import com.ssafy14.a606.global.exceptions.AuthorizationException;
import com.ssafy14.a606.global.security.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    // 로컬 로그인
    @Override
    public SignInResponseDto signInLocal(SignInRequestDto request, HttpServletResponse response) {

        User user = userRepository.findByLoginId(request.getLoginId())
                .orElseThrow(() -> new AuthorizationException("아이디 또는 비밀번호가 올바르지 않습니다."));
        if (user.getAuthType() != AuthType.LOCAL) {
            throw new AuthorizationException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        if (user.getPassword() == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthorizationException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        String role = user.getRole().name(); // enum이면 name()

        String accessToken = jwtTokenProvider.createAccessToken(user.getLoginId(), role);
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getLoginId());

        String userRole = "ROLE_" + user.getRole().name();

        // refreshToken -> HttpOnly 쿠키
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false)      // 로컬 http 테스트: false / 운영 https: true
                .sameSite("Lax")    // 운영에서 프론트-백 도메인 다르면 None 고려
                .path("/")
                .maxAge(Duration.ofDays(14))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return new SignInResponseDto(accessToken, refreshToken, user.getUserName(), userRole);
    }


}
