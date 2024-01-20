import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BACKENDURL = "http://localhost:3000/api/v1";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Authentication
      "/auth/register": BACKENDURL,
      "/auth/login": BACKENDURL,
      "/auth/logout": BACKENDURL,
      "/auth/forgotpassword": BACKENDURL,
      "/auth/myprofile": BACKENDURL,
      "/auth/verify/user": BACKENDURL,

      //income Expense
      "/incomeexpense/findall/incomeexpense": BACKENDURL,
      "/incomeexpense/create/incomeexpesne": BACKENDURL,
      "/incomeexpense/update/expense": BACKENDURL,
      "/incomeexpense/delete/expense": BACKENDURL,

      //Category

      "/category/getall/category": BACKENDURL,
      "/category/create/category": BACKENDURL,
      "/category/delete/category": BACKENDURL,
      "/category/update/category": BACKENDURL,
    },
  },
});
