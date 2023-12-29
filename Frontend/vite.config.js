import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BACKENDURL = "http://localhost:3000";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Authentication
      "/api/v1/auth/register": BACKENDURL,
      "/api/v1/auth/login": BACKENDURL,
      "/api/v1/auth/logout": BACKENDURL,
      "/api/v1/auth/forgotpassword": BACKENDURL,
      "/api/v1/auth/myprofile": BACKENDURL,
      "/api/v1/auth/verify/user": BACKENDURL,

      //income Expense
      "/api/v1/incomeexpense/findall/incomeexpense": BACKENDURL,

      //Category

      "/api/v1/category/getall/category": BACKENDURL,
    },
  },
});
