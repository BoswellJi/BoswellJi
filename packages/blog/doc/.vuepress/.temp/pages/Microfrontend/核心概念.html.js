export const data = {
  "key": "v-6d1f0262",
  "path": "/Microfrontend/%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5.html",
  "title": "",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "微前端",
      "slug": "微前端",
      "children": [
        {
          "level": 3,
          "title": "single-spa应用",
          "slug": "single-spa应用",
          "children": []
        },
        {
          "level": 3,
          "title": "拆分应用",
          "slug": "拆分应用",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": null,
    "contributors": []
  },
  "filePathRelative": "Microfrontend/核心概念.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
