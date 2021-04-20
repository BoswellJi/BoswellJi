const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.ProvidePlugin({
            module1: path.resolve(path.join(__dirname, 'src/module1'))
        })
    ]
};