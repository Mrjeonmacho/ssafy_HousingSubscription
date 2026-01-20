# 1단계: 빌드 환경 (Node.js 24.13.0)
FROM node:24.13.0-alpine AS builder
WORKDIR /app

# 패키지 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 복사 및 빌드
# (젠킨스가 넣어준 .env 파일이 이 단계에서 빌드에 포함됩니다)
COPY . .
RUN npm run build

# 2단계: 배포 환경 (Nginx)
FROM nginx:alpine

# 빌드 결과물(dist)을 Nginx 경로로 복사
# (Vite의 기본 빌드 폴더는 'dist'입니다)
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA(React Router) 처리를 위한 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]