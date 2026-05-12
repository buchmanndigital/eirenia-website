import type { NextConfig } from "next";
import { COACH_LOGIN, COACH_REGISTER } from "./lib/coach-public-paths";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: COACH_REGISTER, destination: "/admin/register" },
      { source: COACH_LOGIN, destination: "/admin/login" },
    ];
  },
};

export default nextConfig;
