const fs = require('fs');

module.exports = {
  chainWebpack: config => {
    // config.optimization.splitChunks({
    //   maxSize: 100
    // });
    config.optimization.minimize(false);

  }
}