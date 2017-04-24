'use strict';

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

// //加载事件模块，获取事件触发器
// var EventEmitter=require("events").EventEmitter;

// //实例化一个事件触发器
// var life=new EventEmitter();


// //给事件触发器绑定一个自定义事件
// life.on('a',function(who){
// 	console.log('我爱'+who);
// })

// //可以绑定多个
// life.on('a',function(who){
// 	console.log('爱'+who);
// })

// //触发事件
// life.emit('a','jmz');
// life.emit('a','jay');


// //查看事件触发器绑定的摸个事件的个数
// console.log(life.listeners('a').length);
// console.log(EventEmitter.listenerCount(life,'a'));
var event = require('events');
// console.log(event);
// var emitter=new event.EventEmitter();

var MyEmitter = function (_event) {
	_inherits(MyEmitter, _event);

	function MyEmitter() {
		_classCallCheck(this, MyEmitter);

		return _possibleConstructorReturn(this, (MyEmitter.__proto__ || (0, _getPrototypeOf2.default)(MyEmitter)).apply(this, arguments));
	}

	return MyEmitter;
}(event);

var myEmitter = new MyEmitter();
myEmitter.on('event', function () {
	console.log('事件');
});

myEmitter.emit('event');