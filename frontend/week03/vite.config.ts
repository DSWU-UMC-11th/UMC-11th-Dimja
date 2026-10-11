import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }), // autoCodeSplitting: true - route 화면 코드를 필요시점에 불러오도록 설정
    react(),
    tailwindcss(),
  ],
})
