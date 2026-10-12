import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 모바일 및 외부 기기 등 로컬 네트워크(LAN IP)에서 개발 서버 접속 시 dev 리소스(자바스크립트 번들/HMR) 403 차단 해제
  allowedDevOrigins: [
    "192.168.0.117",
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "*.local",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
