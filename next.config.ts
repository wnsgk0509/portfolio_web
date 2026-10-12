import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 모바일/LAN IP 및 외부 터널링(localtunnel, ngrok) 접속 시 dev 리소스(번들/HMR) 차단 해제
  allowedDevOrigins: [
    "192.168.0.117",
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "*.loca.lt",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.local",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
