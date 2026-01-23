package com.ssafy14.a606.domain.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class SignUpRequestDto {

    // 로컬 로그인 ID
    @NotBlank(message = "로그인 ID는 필수입니다.")
    @Size(max = 50, message = "로그인 ID는 50자 이하여야합니다")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "로그인 ID는 영문, 숫자만 사용할 수 있습니다.")
    private String loginId;

    // 비밀번호 -> 저장 전 BCrypt로 해시
    @NotBlank(message = "비밀번호는 필수입니다.")
    @Size(min = 8, max = 20, message = "비밀번호는 8자 이상 20자 이하여야 합니다.")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*]).+$",
            message = "비밀번호는 소문자, 숫자, 특수문자를 각각 최소 1자 이상 포함해야 합니다."
    )
    private String password;

    // 사용자 이름
    @NotBlank(message = "이름은 필수입니다.")
    private String userName;

    // 이메일
    @NotBlank(message = "이메일은 필수입니다.")
    @Email(message = "이메일 형식이 올바르지 않습니다.")
    private String email;
}
