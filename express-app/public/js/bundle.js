webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _angular = __webpack_require__(5);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _angularUiRouter = __webpack_require__(7);
	
	var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);
	
	__webpack_require__(8);
	
	var _router = __webpack_require__(9);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _hello = __webpack_require__(12);
	
	var _hello2 = _interopRequireDefault(_hello);
	
	var _test = __webpack_require__(16);
	
	var _test2 = _interopRequireDefault(_test);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = _angular2.default.module('app', [_angularUiRouter2.default, 'ionic']);
	
	(0, _hello2.default)(app);
	
	(0, _router2.default)(app);
	
	/**
	 * ionic中的滚动框使用
	 * delegate-handle="horizontal1"
	 * delegate-handle="horizontal2"
	 * 在ios中会变卡
	 */

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "views/index.html";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _helloPage = __webpack_require__(10);
	
	var _helloPage2 = _interopRequireDefault(_helloPage);
	
	var _aboutPage = __webpack_require__(11);
	
	var _aboutPage2 = _interopRequireDefault(_aboutPage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (app) {
	    app.config(function ($stateProvider) {
	        $stateProvider.state({
	            name: 'hello',
	            url: '/hello',
	            templateUrl: _helloPage2.default
	        }).state({
	            name: 'about',
	            url: '/about',
	            templateUrl: _aboutPage2.default
	        });
	    });
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "views/helloPage.html";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "views/aboutPage.html";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _hello = __webpack_require__(13);
	
	var _hello2 = _interopRequireDefault(_hello);
	
	__webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (app) {
		app.directive('hello', function () {
			return {
				restrict: 'E',
				templateUrl: _hello2.default
			};
		});
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "views/hello.html";

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var one = 1;
	exports.two = one;

/***/ })
]);
//# sourceMappingURL=bundle.js.map