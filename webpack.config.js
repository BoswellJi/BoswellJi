import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import CommonsChunkPlugin from "webpack/lib/optimize/CommonsChunkPlugin";
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import "babel-polyfill";


// 基础配置
const config = {
    entry: {
        index: './express-first/public/js/index.js'
        // vender: ['angular', 'angular-ui-router']
    },
    //打包输出的文件
    output: {
        path: path.resolve(__dirname, "express-app/public"),
        filename: "js/bundle.js"
    },
    // 加载器
    module: {
        loaders: [
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style','css!postcss')
        },
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory'
        }
        // , {
        //     test: /\.(png|jpg|gif|svg)$/i,
        //     loader: 'url',
        //     exclude: /node_modules/,
        //     query: {
        //         limit: 10,
        //         name: 'images/[name].[hash:8].[ext]'
        //     }
        // }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/style.bundle.css"),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('js/common.js')
        // new OpenBrowserPlugin({
        //     url: 'http://localhost:8080/views'
        // }),
        //     new webpack.DllReferencePlugin({
        //         context: __dirname,
        //         manifest: require('./dist/manifest.json')
        // })
    ],
    postcss: function() {
        return [precss, autoprefixer]
    },
    resolve: {
        extensions: ['', '.js', '.css', '.less'],
        // 
        alias: {

        }
    },
    //源代码
    devtool: 'source-map'
}

// 判断环境
if (process.env.NODE_ENV === 'production') {

}

module.exports = config;
