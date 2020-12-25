module.exports = {
  chainWebpack: config => {
    config.optimization.minimize(false)
  }
}