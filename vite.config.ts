import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // השינוי הוא כאן: נקודה ולוכסן בלבד
  // זה אומר: "חפש את הקבצים באותה תיקייה שאני נמצא בה"
  base: './', 
})
