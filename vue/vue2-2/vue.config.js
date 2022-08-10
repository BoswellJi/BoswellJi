const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'/app2/',
  transpileDependencies: true,
  devServer:{
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
})
