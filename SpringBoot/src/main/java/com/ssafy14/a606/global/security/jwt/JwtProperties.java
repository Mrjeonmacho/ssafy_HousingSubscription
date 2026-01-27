package com.ssafy14.a606.global.security.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt")
public record JwtProperties(
        String secret,
        long accessExpirationMs,
        long refreshExpirationMs
) {}
