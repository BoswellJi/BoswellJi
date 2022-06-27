var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');

/**
 * get http请求的便捷方式，自动调用res.end();相比request()方法来说
 */
http.get('http://www.baidu.com', function (res) {
  var chunks = [];
  res.on('data', function (chunk) {
    /**
     * 读取二进制数据
     */
    chunks.push(chunk);
  });
  res.on('end', function () {
    // Buffer数组，进行合并（二进制数组
    var html = iconv.decode(Buffer.concat(chunks), 'utf-8'),
      // node buffer不支持转换为编码gb2312 gbk编码的文本
      // let html = Buffer.concat(chunks).toString('gb2312');
      // html = Buffer.from(html, 'gb2312');
      // 获取到jquery对象
      $ = cheerio.load(html, { decodeEntities: false }),
      body = $('body').html();

    console.log(html);
    console.log(body);
  });
  res.on('error', function (err) {
    console.log(JSON.stringify(err));
  });
});