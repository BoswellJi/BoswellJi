const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');

const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: './src/index1.js',
    index_head: './src/css-module1.css'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // inject: false,
      template: './src/index.html',
      chunks: ['index', 'index_head']
    }),
    new HtmlWebpackInjector()
  ],
};
