import webpackBase from './webpackConfig/base.config.js';
import webpackDev from './webpackConfig/dev.config.js';
import webpackPro from './webpackConfig/pro.config.js';




// 开发环境
if (process.env.NODE_ENV === 'development') {
    webpackBase.plugins.concat(webpackDev.plugins);
    webpackBase.devtool=webpackDev.devtool;
}

// 生产环境
if (process.env.NODE_ENV === 'production') {
    Object.assign(webpackBase.entry,webpackPro.entry);
    webpackBase.plugins.concat(webpackPro.plugins);
}

module.exports = webpackBase;
