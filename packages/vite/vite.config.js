import legacy from '@vitejs/plugin-legacy'

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    legacy({
      targets: ['defaults', 'IE 11']
    })
  ],
  build: {
    // target: 'es5'
  }
}
