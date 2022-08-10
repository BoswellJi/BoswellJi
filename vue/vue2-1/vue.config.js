const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'/app1/',
  transpileDependencies: true,
  devServer:{
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
})
