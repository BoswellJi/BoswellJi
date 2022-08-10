const { name } = require('./package');

module.exports = {
  publicPath:'/',
  devServer: {
    port: 7100,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', 
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
