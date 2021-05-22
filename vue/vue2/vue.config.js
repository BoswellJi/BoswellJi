

module.exports = {
  chainWebpack(config){
    config.mode('development');
    config.optimization.minimize(false);
  }
}