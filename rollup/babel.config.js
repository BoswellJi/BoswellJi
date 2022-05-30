module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: { version: "3.15.2", proposals: true },
      },
    ]
  ],
};
