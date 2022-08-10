const { defineConfig } = require('@vue/cli-service')
const packageName = require('./package.json').name;
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
    },
  }
})
