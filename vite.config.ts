import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";


export default defineConfig({
  plugins: [react(), svgr({
    include: "**/*.svg?react",
  })],
  resolve: {
    alias: {
      '@styles': '/src/common/styles',
      '@Icons': '/src/assets/icons',
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: "[name]__[local]___[hash:base64:5]",
      scopeBehaviour: "local",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/global.scss" as *;`,
        api: 'modern-compiler'
      },
    },
  },
})
