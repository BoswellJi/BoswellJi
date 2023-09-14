import { createPages } from 'vite-plugin-virtual-mpa'

const env = process.env.NODE_ENV || ''
const pages = createPages([
  {
    name: 'home',
    entry: '/src/pages/home/index/main.ts',
    template: 'src/pages/home/index/index.html',
    filename: 'home.html',
    data: { env }
  },
  {
    name: 'homeMore',
    entry: '/src/pages/home/more/main.ts',
    template: 'src/pages/home/more/index.html',
    filename: 'homeMore.html',
    data: { env }
  },
  {
    name: 'list',
    entry: '/src/pages/list/main.ts',
    template: 'src/pages/list/index.html',
    filename: 'list.html',
    data: { env }
  },
  {
    name: 'hotelList',
    entry: '/src/pages/hotel/list/main.ts',
    template: 'src/pages/hotel/list/index.html',
    filename: 'hotelList.html',
    data: { env }
  },
  {
    name: 'hotelDetail',
    entry: '/src/pages/hotel/detail/main.ts',
    template: 'src/pages/hotel/detail/index.html',
    filename: 'hotelDetail.html',
    data: { env }
  },
  {
    name: 'hotelBook',
    entry: '/src/pages/hotel/book/main.ts',
    template: 'src/pages/hotel/book/index.html',
    filename: 'hotelBook.html',
    data: { env }
  }
]);

const rewrites = [
  {
    from: /^\/Home\/Index$/,
    to: `/home.html`,
  },
  {
    from: /^\/Home\/More$/,
    to: `/homeMore.html`,
  },
  {
    from: /^\/Product\/IndexNew$/,
    to: `/list.html`,
  },
  {
    from: /^\/Home\/IndexNew$/,
    to: `/hotelList.html`,
  },
  {
    from: /^\/Hotel\/Detail$/,
    to: `/hotelDetail.html`,
  },
  {
    from: /^\/Hotel\/Order$/,
    to: `/hotelBook.html`,
  }
]

export { pages, rewrites }
