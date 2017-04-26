'use strict';

function express() {
	var fns = [];
	function expr(req, res) {
		var i = 0;
		function next() {
			var task = fns[i++];
			if (!task) return;
			task(req, res, next);
		}
		next();
	}
	expr.use = function (fn) {
		fns.push(fn);
	};
	return expr;
}

var app = express();

app.use(function (req, res, next) {
	console.log('df');
	next();
});

app.use(function (req, res, next) {
	console.log('second');
	next();
});

// next把控制权给了下一个中间件，完成后在执行下面的
app.use(function (req, res, next) {
	console.log('12');
	next();
	console.log('34');
});

app.use(function (res, req, next) {
	console.log('nne');
	next();
});