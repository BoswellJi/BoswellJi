import legacy from '@vitejs/plugin-legacy';

const env = import.meta.env;

const getScript = () => {
  return env.ALLIANCE_ENV !== 'prod' && env.ALLIANCE_ENV !== 'dev'
    ? [
        {
          src: '/js/common/vconsole.min.js',
          type: 'text/javascript',
        },
        { innerHTML: 'new VConsole()' },
      ]
    : [];
};

export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/',
    head: {
      script: getScript(),
    },
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: ['@element-plus/nuxt', '@vant/nuxt', '@nuxt/eslint'],
  vant: {
    lazyload: true,
  },
  css: ['./app/assets/css/main.css'],
  devServer: {
    host: '0.0.0.0',
  },
  vite: {
    server: {
      proxy: {},
    },
    plugins: [legacy({})],
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  build: {},
});
