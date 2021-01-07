
module.exports = {
  mode: 'development',
  entry: {
    index: './mods/1.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '1.js',
    publicPath:'/jmz'
  }
};