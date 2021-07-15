const path = require('path')
const webpack = require('webpack')
const { ModuleFederationPlugin } = webpack.container;

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: './src/index.js',
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
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      remotes: {
        home: "home@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        "./Content": "./src/module3",
        "./Button": "./src/module4",
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsxSuffixTo: [/\.vue$/]
            }
          }
        ],
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.vue'],
    alias:{
      a:'vue'
    }
  },
}
