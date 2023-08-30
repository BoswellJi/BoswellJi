export default function viteGenPlugin() {
  return {
    name: 'vite-gen-plugin',
    buildEnd() {
      console.log('finish')
    }
  }
}
