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
	
	var _ngInfiniteScroll = __webpack_require__(17);
	
	var _ngInfiniteScroll2 = _interopRequireDefault(_ngInfiniteScroll);
	
	var _oneController = __webpack_require__(18);
	
	var _oneController2 = _interopRequireDefault(_oneController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = _angular2.default.module('app', [_angularUiRouter2.default, _ngInfiniteScroll2.default]);
	
	// controller
	
	
	(0, _oneController2.default)(app);
	
	(0, _hello2.default)(app);
	
	(0, _router2.default)(app);

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
	            templateUrl: _aboutPage2.default,
	            controller: 'one'
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

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/* ng-infinite-scroll - v1.3.0 - 2016-06-30 */
	angular.module('infinite-scroll', []).value('THROTTLE_MILLISECONDS', null).directive('infiniteScroll', [
	  '$rootScope', '$window', '$interval', 'THROTTLE_MILLISECONDS', function($rootScope, $window, $interval, THROTTLE_MILLISECONDS) {
	    return {
	      scope: {
	        infiniteScroll: '&',
	        infiniteScrollContainer: '=',
	        infiniteScrollDistance: '=',
	        infiniteScrollDisabled: '=',
	        infiniteScrollUseDocumentBottom: '=',
	        infiniteScrollListenForEvent: '@'
	      },
	      link: function(scope, elem, attrs) {
	        var changeContainer, checkInterval, checkWhenEnabled, container, handleInfiniteScrollContainer, handleInfiniteScrollDisabled, handleInfiniteScrollDistance, handleInfiniteScrollUseDocumentBottom, handler, height, immediateCheck, offsetTop, pageYOffset, scrollDistance, scrollEnabled, throttle, unregisterEventListener, useDocumentBottom, windowElement;
	        windowElement = angular.element($window);
	        scrollDistance = null;
	        scrollEnabled = null;
	        checkWhenEnabled = null;
	        container = null;
	        immediateCheck = true;
	        useDocumentBottom = false;
	        unregisterEventListener = null;
	        checkInterval = false;
	        height = function(elem) {
	          elem = elem[0] || elem;
	          if (isNaN(elem.offsetHeight)) {
	            return elem.document.documentElement.clientHeight;
	          } else {
	            return elem.offsetHeight;
	          }
	        };
	        offsetTop = function(elem) {
	          if (!elem[0].getBoundingClientRect || elem.css('none')) {
	            return;
	          }
	          return elem[0].getBoundingClientRect().top + pageYOffset(elem);
	        };
	        pageYOffset = function(elem) {
	          elem = elem[0] || elem;
	          if (isNaN(window.pageYOffset)) {
	            return elem.document.documentElement.scrollTop;
	          } else {
	            return elem.ownerDocument.defaultView.pageYOffset;
	          }
	        };
	        handler = function() {
	          var containerBottom, containerTopOffset, elementBottom, remaining, shouldScroll;
	          if (container === windowElement) {
	            containerBottom = height(container) + pageYOffset(container[0].document.documentElement);
	            elementBottom = offsetTop(elem) + height(elem);
	          } else {
	            containerBottom = height(container);
	            containerTopOffset = 0;
	            if (offsetTop(container) !== void 0) {
	              containerTopOffset = offsetTop(container);
	            }
	            elementBottom = offsetTop(elem) - containerTopOffset + height(elem);
	          }
	          if (useDocumentBottom) {
	            elementBottom = height((elem[0].ownerDocument || elem[0].document).documentElement);
	          }
	          remaining = elementBottom - containerBottom;
	          shouldScroll = remaining <= height(container) * scrollDistance + 1;
	          if (shouldScroll) {
	            checkWhenEnabled = true;
	            if (scrollEnabled) {
	              if (scope.$$phase || $rootScope.$$phase) {
	                return scope.infiniteScroll();
	              } else {
	                return scope.$apply(scope.infiniteScroll);
	              }
	            }
	          } else {
	            if (checkInterval) {
	              $interval.cancel(checkInterval);
	            }
	            return checkWhenEnabled = false;
	          }
	        };
	        throttle = function(func, wait) {
	          var later, previous, timeout;
	          timeout = null;
	          previous = 0;
	          later = function() {
	            previous = new Date().getTime();
	            $interval.cancel(timeout);
	            timeout = null;
	            return func.call();
	          };
	          return function() {
	            var now, remaining;
	            now = new Date().getTime();
	            remaining = wait - (now - previous);
	            if (remaining <= 0) {
	              $interval.cancel(timeout);
	              timeout = null;
	              previous = now;
	              return func.call();
	            } else {
	              if (!timeout) {
	                return timeout = $interval(later, remaining, 1);
	              }
	            }
	          };
	        };
	        if (THROTTLE_MILLISECONDS != null) {
	          handler = throttle(handler, THROTTLE_MILLISECONDS);
	        }
	        scope.$on('$destroy', function() {
	          container.unbind('scroll', handler);
	          if (unregisterEventListener != null) {
	            unregisterEventListener();
	            unregisterEventListener = null;
	          }
	          if (checkInterval) {
	            return $interval.cancel(checkInterval);
	          }
	        });
	        handleInfiniteScrollDistance = function(v) {
	          return scrollDistance = parseFloat(v) || 0;
	        };
	        scope.$watch('infiniteScrollDistance', handleInfiniteScrollDistance);
	        handleInfiniteScrollDistance(scope.infiniteScrollDistance);
	        handleInfiniteScrollDisabled = function(v) {
	          scrollEnabled = !v;
	          if (scrollEnabled && checkWhenEnabled) {
	            checkWhenEnabled = false;
	            return handler();
	          }
	        };
	        scope.$watch('infiniteScrollDisabled', handleInfiniteScrollDisabled);
	        handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);
	        handleInfiniteScrollUseDocumentBottom = function(v) {
	          return useDocumentBottom = v;
	        };
	        scope.$watch('infiniteScrollUseDocumentBottom', handleInfiniteScrollUseDocumentBottom);
	        handleInfiniteScrollUseDocumentBottom(scope.infiniteScrollUseDocumentBottom);
	        changeContainer = function(newContainer) {
	          if (container != null) {
	            container.unbind('scroll', handler);
	          }
	          container = newContainer;
	          if (newContainer != null) {
	            return container.bind('scroll', handler);
	          }
	        };
	        changeContainer(windowElement);
	        if (scope.infiniteScrollListenForEvent) {
	          unregisterEventListener = $rootScope.$on(scope.infiniteScrollListenForEvent, handler);
	        }
	        handleInfiniteScrollContainer = function(newContainer) {
	          if ((newContainer == null) || newContainer.length === 0) {
	            return;
	          }
	          if (newContainer.nodeType && newContainer.nodeType === 1) {
	            newContainer = angular.element(newContainer);
	          } else if (typeof newContainer.append === 'function') {
	            newContainer = angular.element(newContainer[newContainer.length - 1]);
	          } else if (typeof newContainer === 'string') {
	            newContainer = angular.element(document.querySelector(newContainer));
	          }
	          if (newContainer != null) {
	            return changeContainer(newContainer);
	          } else {
	            throw new Error("invalid infinite-scroll-container attribute.");
	          }
	        };
	        scope.$watch('infiniteScrollContainer', handleInfiniteScrollContainer);
	        handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);
	        if (attrs.infiniteScrollParent != null) {
	          changeContainer(angular.element(elem.parent()));
	        }
	        if (attrs.infiniteScrollImmediateCheck != null) {
	          immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
	        }
	        return checkInterval = $interval((function() {
	          if (immediateCheck) {
	            handler();
	          }
	          return $interval.cancel(checkInterval);
	        }));
	      }
	    };
	  }
	]);
	
	if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
	  module.exports = 'infinite-scroll';
	}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (app) {
	    app.controller('one', ['$scope', '$parse', '$interpolate', function ($scope, $parse, $interpolate) {
	        $scope.name = 'jmz';
	        $scope.parsedValue = '1';
	
	        $scope.$watch('epr', function (newVal, oldVal, scope) {
	            if (newVal !== oldVal) {
	                // 用该表达式设置parseFun
	                var parseFun = $parse(newVal);
	                // 获取经过解析后表达式的值
	                $scope.parsedValue = parseFun(scope);
	            }
	        });
	
	        $scope.$watch('emailBody', function (body) {
	            if (body) {
	                var template = $interpolate(body);
	                $scope.previewText = template({ to: $scope.to });
	            }
	        });
	    }]);
	};
	
	/**
	 * $parse ： 手动触动解析表达式
	 * $watch ： 监听控制器下的$scope上的某个属性，变化后，调用指定函数
	 */

/***/ })
]);
//# sourceMappingURL=bundle.js.map