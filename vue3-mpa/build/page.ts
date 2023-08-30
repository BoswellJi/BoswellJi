import { createPages } from 'vite-plugin-virtual-mpa'

const env = process.env.NODE_ENV || ''
const pages = createPages([
  {
    name: 'home',
    entry: '/src/pages/home/main.ts',
    template: 'src/pages/home/index.html',
    filename: 'home.html',
    data: { env }
  },
  {
    name: 'list',
    entry: '/src/pages/list/main.ts',
    template: 'src/pages/list/index.html',
    filename: 'list.html',
    data: { env }
  }
])

export default pages
