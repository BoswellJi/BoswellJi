const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  plugins: [
    new webpack.ProvidePlugin({
      module1: path.resolve(path.join(__dirname, 'src/module1')),
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: '单页',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader','eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
}
