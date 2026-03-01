import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // 注意：静态导出模式下 redirects 不生效，重定向需要在 Nginx/服务器层面配置
  // 如需域名跳转，请查看 nginx.conf 中的配置示例
};

export default nextConfig;
