package com.ssafy14.a606.domain.user.service;

import com.ssafy14.a606.domain.user.dto.request.SignUpRequestDto;
import com.ssafy14.a606.domain.user.dto.response.SignUpResponseDto;
import com.ssafy14.a606.domain.user.entity.AuthType;
import com.ssafy14.a606.domain.user.entity.Role;
import com.ssafy14.a606.domain.user.entity.User;
import com.ssafy14.a606.domain.user.repository.UserRepository;
import com.ssafy14.a606.global.exceptions.DuplicateValueException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public SignUpResponseDto signUpLocal(SignUpRequestDto request) {

        // 이메일 중복 체크
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateValueException("이미 사용 중인 이메일입니다.");
        }

        // 로그인 ID 중복 체크
        if (userRepository.existsByLoginId(request.getLoginId())) {
            throw new DuplicateValueException("이미 사용 중인 ID입니다.");
        }

        // 비밀번호 해시(BCrypt)
        String encodedPw = passwordEncoder.encode(request.getPassword());

        // 엔티티 생성 (서버가 기본값 세팅)
        User user = User.builder()
                .authType(AuthType.LOCAL)
                .loginId(request.getLoginId())
                .password(encodedPw)
                .userName(request.getUserName())
                .email(request.getEmail())
                .role(Role.USER)
                .build();

        User saved = userRepository.save(user);

        return new SignUpResponseDto(saved.getId(), saved.getUserName(), saved.getRole().name());
    }

}
