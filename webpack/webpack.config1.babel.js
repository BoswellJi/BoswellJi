import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import "babel-polyfill";

const config = {
    target: 'web',
    cache: true,
    entry: {
        index: './express-first/public/js/index.js',
        vender: ['angular', 'angular-ui-router']
    },
    output: {
        path: path.resolve(__dirname, "express-app/public"),
        publicPath: '/public/',
        filename: "js/bundle.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            exclude: /node_modules/,
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
        }, {
            test: /\.html/,
            loader: 'file',
            exclude: /node_modules/,
            query: {
                name: 'views/[name].[ext]'
            }
        }]
    },
    plugins: [
        new ExtractTextPlugin("css/style.bundle.css"),
        new webpack.optimize.CommonsChunkPlugin('vender', 'js/common.js'),
        new webpack.ProvidePlugin({
            angular: 'angular'
        })
    ],
    postcss: function () {
        return [precss, autoprefixer]
    },
    resolve: {
        extensions: ['', '.js', '.css', '.less', '.html'],
        alias: {

        }
    }
}

if (process.env.NODE_ENV == 'development') {
    config.devtool = 'source-map';
    const pluginsArr = [];
    config.plugins.concat(pluginsArr);
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        test: /(\.jsx|\.js)$/,
        compress: { warnings: false }
    }));
}

exports.module = config;
