'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_http2.default.createServer(function (request, respone) {
	respone.writeHead(200, { 'content-type': 'text/plain' });
	respone.send('df');
	respone.end();
});