module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: { version: "3.8", proposals: true },
      },
    ]
  ],
  "plugins": [
    ["@vue/babel-plugin-jsx", {}]
  ]
};
