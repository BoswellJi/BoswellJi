import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import CommonsChunkPlugin from "webpack/lib/optimize/CommonsChunkPlugin";
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import "babel-polyfill";


// 基础配置
const config = {
    entry: {
        index: './express-first/public/js/index.js',
        vender: ['angular', 'angular-ui-router']
    },
    //打包输出的文件
    output: {
        path: path.resolve(__dirname, "express-app/public"),
        publicPath:'/public/',
        filename: "js/bundle.js"
    },
    // 加载器
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss')
        }, {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory'
        }, {
            test: /\.(png|jpg|gif|svg)$/i,
            loader: 'url',
            exclude: /node_modules/,
            query: {
                limit: 10,
                name: 'images/[name].[ext]'
            }
        },{
            test:/\.html/,
            loader:'file',
            query: {
                name: 'views/[name].[ext]'
            }
        }]
    },
    //插件
    plugins: [
        new ExtractTextPlugin("css/style.bundle.css"),
        new webpack.optimize.CommonsChunkPlugin('vender','js/common.js')
    ],
    //css预处理器
    postcss: function() {
        return [precss, autoprefixer]
    },
    //
    resolve: {
        extensions: ['', '.js', '.css', '.less'],
        alias: {
                
        }
    },
    //源代码
    devtool: 'source-map'
}

// 开发环境
if (process.env.NODE_ENV === 'development') {
    const pluginsArr=[
        new webpack.optimize.CommonsChunkPlugin('vender','js/common.js')
    ];
    config.plugins.concat(pluginsArr);
}

// 生产环境
if (process.env.NODE_ENV === 'production') {
    const pluginsArr=[
        new webpack.optimize.CommonsChunkPlugin('vender','js/common.js')
    ];
    config.plugins.concat(pluginsArr);
}

module.exports = config;

