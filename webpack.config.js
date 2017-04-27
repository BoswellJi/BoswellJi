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
        index: './express-first/public/js/index.js'
    },
    //打包输出的文件
    output: {
        path: path.resolve(__dirname, "express-app/public"),
        filename: "js/bundle.js"
    },
    // 加载器
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style','css!postcss')
        },{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory'
        }
        ]
    },
    //插件
    plugins: [
        new ExtractTextPlugin("css/style.bundle.css"),
        new webpack.optimize.CommonsChunkPlugin('js/common.js')
    ],
    //css预处理器
    postcss: function() {
        return [precss, autoprefixer]
    },
    //
    resolve: {
        extensions: ['', '.js', '.css', '.less']
    },
    //源代码
    devtool: 'source-map'
}
export default config;
