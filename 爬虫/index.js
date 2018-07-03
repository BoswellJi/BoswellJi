var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');

var url = 'http://www.ygdy8.net/html/gndy/dyzz/index.html';

/**
 * get http请求的便捷方式，自动调用res.end();相比request()方法来说
 */
http.get(url, function (res) {
    var chunks = [];
    res.on('data', function (chunk) {
        /**
         * 读取二进制数据
         */
        chunks.push(chunk);
    });
    res.on('end', function () {
        var titles = [];
        /**
         * Buffer数组，进行合并（二进制数组
         */
        var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
        // let html = Buffer.concat(chunks).toString('gb2312');
        /**
         * node buffer不支持转换为编码gb2312 gbk编码的文本
         */
        // html = Buffer.from(html, 'gb2312');
        var $ = cheerio.load(html, { decodeEntities: false });
        $('.co_content8 .ulink').each(function (idx, element) {
            var $element = $(element);
            titles.push({
                title: $element.text()
            })
        })
        console.log(titles);
    });
});