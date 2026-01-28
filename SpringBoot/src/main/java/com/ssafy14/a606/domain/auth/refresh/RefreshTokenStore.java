package com.ssafy14.a606.domain.auth.refresh;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RefreshTokenStore {

    private final StringRedisTemplate redisTemplate;

    private static final String KEY_PREFIX = "refresh:";

    private static final Duration REFRESH_TOKEN_TTL = Duration.ofDays(14);

    // Redis에 저장
    public void save(Long userId, String refreshToken) {
        String key = KEY_PREFIX + userId;
        redisTemplate.opsForValue().set(key, refreshToken, REFRESH_TOKEN_TTL);
    }

    // Redis에서 조회
    public Optional<String> get(Long userId) {
        String key = KEY_PREFIX + userId;
        return Optional.ofNullable(redisTemplate.opsForValue().get(key));
    }

    // Redis에서 삭제
    // 로그아웃 or 강제 만료 처리 시 사용
    public void delete(Long userId) {
        String key = KEY_PREFIX + userId;
        redisTemplate.delete(key);
    }

    // 요청으로 들어온 refreshToken이 Redis에 저장된 값과 동일한지 검증
    public boolean matches(Long userId, String refreshToken) {
        return get(userId).map(saved -> saved.equals(refreshToken)).orElse(false);
    }
}
