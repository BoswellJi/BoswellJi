(global["webpackJsonp"] = global["webpackJsonp"] || [])
.push([["common/vendor"], {

  /***/ 1:
  /*!************************************************************!*\
    !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.createApp = createApp; exports.createComponent = createComponent; exports.createPage = createPage; exports.default = void 0; var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); } function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); } function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); } function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); } function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); } function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

      var _toString = Object.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;

      function isFn(fn) {
        return typeof fn === 'function';
      }

      function isStr(str) {
        return typeof str === 'string';
      }

      function isPlainObject(obj) {
        return _toString.call(obj) === '[object Object]';
      }

      function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
      }

      function noop() { }

      /**
                          * Create a cached version of a pure function.
                          */
      function cached(fn) {
        var cache = Object.create(null);
        return function cachedFn(str) {
          var hit = cache[str];
          return hit || (cache[str] = fn(str));
        };
      }

      /**
         * Camelize a hyphen-delimited string.
         */
      var camelizeRE = /-(\w)/g;
      var camelize = cached(function (str) {
        return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; });
      });

      var HOOKS = [
        'invoke',
        'success',
        'fail',
        'complete',
        'returnValue'];


      var globalInterceptors = {};
      var scopedInterceptors = {};

      function mergeHook(parentVal, childVal) {
        var res = childVal ?
          parentVal ?
            parentVal.concat(childVal) :
            Array.isArray(childVal) ?
              childVal : [childVal] :
          parentVal;
        return res ?
          dedupeHooks(res) :
          res;
      }

      function dedupeHooks(hooks) {
        var res = [];
        for (var i = 0; i < hooks.length; i++) {
          if (res.indexOf(hooks[i]) === -1) {
            res.push(hooks[i]);
          }
        }
        return res;
      }

      function removeHook(hooks, hook) {
        var index = hooks.indexOf(hook);
        if (index !== -1) {
          hooks.splice(index, 1);
        }
      }

      function mergeInterceptorHook(interceptor, option) {
        Object.keys(option).forEach(function (hook) {
          if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
            interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
          }
        });
      }

      function removeInterceptorHook(interceptor, option) {
        if (!interceptor || !option) {
          return;
        }
        Object.keys(option).forEach(function (hook) {
          if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
            removeHook(interceptor[hook], option[hook]);
          }
        });
      }

      function addInterceptor(method, option) {
        if (typeof method === 'string' && isPlainObject(option)) {
          mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
        } else if (isPlainObject(method)) {
          mergeInterceptorHook(globalInterceptors, method);
        }
      }

      function removeInterceptor(method, option) {
        if (typeof method === 'string') {
          if (isPlainObject(option)) {
            removeInterceptorHook(scopedInterceptors[method], option);
          } else {
            delete scopedInterceptors[method];
          }
        } else if (isPlainObject(method)) {
          removeInterceptorHook(globalInterceptors, method);
        }
      }

      function wrapperHook(hook) {
        return function (data) {
          return hook(data) || data;
        };
      }

      function isPromise(obj) {
        return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
      }

      function queue(hooks, data) {
        var promise = false;
        for (var i = 0; i < hooks.length; i++) {
          var hook = hooks[i];
          if (promise) {
            promise = Promise.then(wrapperHook(hook));
          } else {
            var res = hook(data);
            if (isPromise(res)) {
              promise = Promise.resolve(res);
            }
            if (res === false) {
              return {
                then: function then() { }
              };

            }
          }
        }
        return promise || {
          then: function then(callback) {
            return callback(data);
          }
        };

      }

      function wrapperOptions(interceptor) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        ['success', 'fail', 'complete'].forEach(function (name) {
          if (Array.isArray(interceptor[name])) {
            var oldCallback = options[name];
            options[name] = function callbackInterceptor(res) {
              queue(interceptor[name], res).then(function (res) {
                /* eslint-disable no-mixed-operators */
                return isFn(oldCallback) && oldCallback(res) || res;
              });
            };
          }
        });
        return options;
      }

      function wrapperReturnValue(method, returnValue) {
        var returnValueHooks = [];
        if (Array.isArray(globalInterceptors.returnValue)) {
          returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
        }
        var interceptor = scopedInterceptors[method];
        if (interceptor && Array.isArray(interceptor.returnValue)) {
          returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
        }
        returnValueHooks.forEach(function (hook) {
          returnValue = hook(returnValue) || returnValue;
        });
        return returnValue;
      }

      function getApiInterceptorHooks(method) {
        var interceptor = Object.create(null);
        Object.keys(globalInterceptors).forEach(function (hook) {
          if (hook !== 'returnValue') {
            interceptor[hook] = globalInterceptors[hook].slice();
          }
        });
        var scopedInterceptor = scopedInterceptors[method];
        if (scopedInterceptor) {
          Object.keys(scopedInterceptor).forEach(function (hook) {
            if (hook !== 'returnValue') {
              interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
            }
          });
        }
        return interceptor;
      }

      function invokeApi(method, api, options) {
        for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) { params[_key - 3] = arguments[_key]; }
        var interceptor = getApiInterceptorHooks(method);
        if (interceptor && Object.keys(interceptor).length) {
          if (Array.isArray(interceptor.invoke)) {
            var res = queue(interceptor.invoke, options);
            return res.then(function (options) {
              return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
            });
          } else {
            return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
          }
        }
        return api.apply(void 0, [options].concat(params));
      }

      var promiseInterceptor = {
        returnValue: function returnValue(res) {
          if (!isPromise(res)) {
            return res;
          }
          return res.then(function (res) {
            return res[1];
          }).catch(function (res) {
            return res[0];
          });
        }
      };


      var SYNC_API_RE =
        /^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

      var CONTEXT_API_RE = /^create|Manager$/;

      // Context例外情况
      var CONTEXT_API_RE_EXC = ['createBLEConnection'];

      // 同步例外情况
      var ASYNC_API = ['createBLEConnection'];

      var CALLBACK_API_RE = /^on|^off/;

      function isContextApi(name) {
        return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
      }
      function isSyncApi(name) {
        return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
      }

      function isCallbackApi(name) {
        return CALLBACK_API_RE.test(name) && name !== 'onPush';
      }

      function handlePromise(promise) {
        return promise.then(function (data) {
          return [null, data];
        }).
          catch(function (err) { return [err]; });
      }

      function shouldPromise(name) {
        if (
          isContextApi(name) ||
          isSyncApi(name) ||
          isCallbackApi(name)) {
          return false;
        }
        return true;
      }

      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
            function (value) { return promise.resolve(callback()).then(function () { return value; }); },
            function (reason) {
              return promise.resolve(callback()).then(function () {
                throw reason;
              });
            });

        };
      }

      function promisify(name, api) {
        if (!shouldPromise(name)) {
          return api;
        }
        return function promiseApi() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) { params[_key2 - 1] = arguments[_key2]; }
          if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
            return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
          }
          return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
            invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
              success: resolve,
              fail: reject
            })].concat(
              params));
          })));
        };
      }

      var EPS = 1e-4;
      var BASE_DEVICE_WIDTH = 750;
      var isIOS = false;
      var deviceWidth = 0;
      var deviceDPR = 0;

      function checkDeviceWidth() {
        var _wx$getSystemInfoSync =




          wx.getSystemInfoSync(), platform = _wx$getSystemInfoSync.platform, pixelRatio = _wx$getSystemInfoSync.pixelRatio, windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

        deviceWidth = windowWidth;
        deviceDPR = pixelRatio;
        isIOS = platform === 'ios';
      }

      function upx2px(number, newDeviceWidth) {
        if (deviceWidth === 0) {
          checkDeviceWidth();
        }

        number = Number(number);
        if (number === 0) {
          return 0;
        }
        var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
        if (result < 0) {
          result = -result;
        }
        result = Math.floor(result + EPS);
        if (result === 0) {
          if (deviceDPR === 1 || !isIOS) {
            result = 1;
          } else {
            result = 0.5;
          }
        }
        return number < 0 ? -result : result;
      }

      var interceptors = {
        promiseInterceptor: promiseInterceptor
      };


      var baseApi = /*#__PURE__*/Object.freeze({
        __proto__: null,
        upx2px: upx2px,
        addInterceptor: addInterceptor,
        removeInterceptor: removeInterceptor,
        interceptors: interceptors
      });


      var previewImage = {
        args: function args(fromArgs) {
          var currentIndex = parseInt(fromArgs.current);
          if (isNaN(currentIndex)) {
            return;
          }
          var urls = fromArgs.urls;
          if (!Array.isArray(urls)) {
            return;
          }
          var len = urls.length;
          if (!len) {
            return;
          }
          if (currentIndex < 0) {
            currentIndex = 0;
          } else if (currentIndex >= len) {
            currentIndex = len - 1;
          }
          if (currentIndex > 0) {
            fromArgs.current = urls[currentIndex];
            fromArgs.urls = urls.filter(
              function (item, index) { return index < currentIndex ? item !== urls[currentIndex] : true; });

          } else {
            fromArgs.current = urls[0];
          }
          return {
            indicator: false,
            loop: false
          };

        }
      };


      function addSafeAreaInsets(result) {
        if (result.safeArea) {
          var safeArea = result.safeArea;
          result.safeAreaInsets = {
            top: safeArea.top,
            left: safeArea.left,
            right: result.windowWidth - safeArea.right,
            bottom: result.windowHeight - safeArea.bottom
          };

        }
      }
      var protocols = {
        previewImage: previewImage,
        getSystemInfo: {
          returnValue: addSafeAreaInsets
        },

        getSystemInfoSync: {
          returnValue: addSafeAreaInsets
        }
      };


      var todos = [
        'vibrate',
        'preloadPage',
        'unPreloadPage',
        'loadSubPackage'];

      var canIUses = [];

      var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

      function processCallback(methodName, method, returnValue) {
        return function (res) {
          return method(processReturnValue(methodName, res, returnValue));
        };
      }

      function processArgs(methodName, fromArgs) {
        var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}; var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}; var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
          var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
          if (isFn(argsOption)) {
            argsOption = argsOption(fromArgs, toArgs) || {};
          }
          for (var key in fromArgs) {
            if (hasOwn(argsOption, key)) {
              var keyOption = argsOption[key];
              if (isFn(keyOption)) {
                keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
              }
              if (!keyOption) {// 不支持的参数
                console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
              } else if (isStr(keyOption)) {// 重写参数 key
                toArgs[keyOption] = fromArgs[key];
              } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
                toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
              }
            } else if (CALLBACKS.indexOf(key) !== -1) {
              toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
            } else {
              if (!keepFromArgs) {
                toArgs[key] = fromArgs[key];
              }
            }
          }
          return toArgs;
        } else if (isFn(fromArgs)) {
          fromArgs = processCallback(methodName, fromArgs, returnValue);
        }
        return fromArgs;
      }

      function processReturnValue(methodName, res, returnValue) {
        var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        if (isFn(protocols.returnValue)) {// 处理通用 returnValue
          res = protocols.returnValue(methodName, res);
        }
        return processArgs(methodName, res, returnValue, {}, keepReturnValue);
      }

      function wrapper(methodName, method) {
        if (hasOwn(protocols, methodName)) {
          var protocol = protocols[methodName];
          if (!protocol) {// 暂不支持的 api
            return function () {
              console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
            };
          }
          return function (arg1, arg2) {// 目前 api 最多两个参数
            var options = protocol;
            if (isFn(protocol)) {
              options = protocol(arg1);
            }

            arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

            var args = [arg1];
            if (typeof arg2 !== 'undefined') {
              args.push(arg2);
            }
            var returnValue = wx[options.name || methodName].apply(wx, args);
            if (isSyncApi(methodName)) {// 同步 api
              return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
            }
            return returnValue;
          };
        }
        return method;
      }

      var todoApis = Object.create(null);

      var TODOS = [
        'onTabBarMidButtonTap',
        'subscribePush',
        'unsubscribePush',
        'onPush',
        'offPush',
        'share'];


      function createTodoApi(name) {
        return function todoApi(_ref) {
          var fail = _ref.fail, complete = _ref.complete;
          var res = {
            errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5")
          };

          isFn(fail) && fail(res);
          isFn(complete) && complete(res);
        };
      }

      TODOS.forEach(function (name) {
        todoApis[name] = createTodoApi(name);
      });

      var providers = {
        oauth: ['weixin'],
        share: ['weixin'],
        payment: ['wxpay'],
        push: ['weixin']
      };


      function getProvider(_ref2) {
        var service = _ref2.service, success = _ref2.success, fail = _ref2.fail, complete = _ref2.complete;
        var res = false;
        if (providers[service]) {
          res = {
            errMsg: 'getProvider:ok',
            service: service,
            provider: providers[service]
          };

          isFn(success) && success(res);
        } else {
          res = {
            errMsg: 'getProvider:fail:服务[' + service + ']不存在'
          };

          isFn(fail) && fail(res);
        }
        isFn(complete) && complete(res);
      }

      var extraApi = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getProvider: getProvider
      });


      var getEmitter = function () {
        if (typeof getUniEmitter === 'function') {
          /* eslint-disable no-undef */
          return getUniEmitter;
        }
        var Emitter;
        return function getUniEmitter() {
          if (!Emitter) {
            Emitter = new _vue.default();
          }
          return Emitter;
        };
      }();

      function apply(ctx, method, args) {
        return ctx[method].apply(ctx, args);
      }

      function $on() {
        return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
      }
      function $off() {
        return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
      }
      function $once() {
        return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
      }
      function $emit() {
        return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
      }

      var eventApi = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $on: $on,
        $off: $off,
        $once: $once,
        $emit: $emit
      });


      var api = /*#__PURE__*/Object.freeze({
        __proto__: null
      });


      var MPPage = Page;
      var MPComponent = Component;

      var customizeRE = /:/g;

      var customize = cached(function (str) {
        return camelize(str.replace(customizeRE, '-'));
      });

      function initTriggerEvent(mpInstance) {
        {
          if (!wx.canIUse('nextTick')) {
            return;
          }
        }
        var oldTriggerEvent = mpInstance.triggerEvent;
        mpInstance.triggerEvent = function (event) {
          for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) { args[_key3 - 1] = arguments[_key3]; }
          return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
        };
      }

      function initHook(name, options) {
        var oldHook = options[name];
        if (!oldHook) {
          options[name] = function () {
            initTriggerEvent(this);
          };
        } else {
          options[name] = function () {
            initTriggerEvent(this); for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) { args[_key4] = arguments[_key4]; }
            return oldHook.apply(this, args);
          };
        }
      }

      Page = function Page() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        initHook('onLoad', options);
        return MPPage(options);
      };

      Component = function Component() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        initHook('created', options);
        return MPComponent(options);
      };

      var PAGE_EVENT_HOOKS = [
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onResize',
        'onTabItemTap'];


      function initMocks(vm, mocks) {
        var mpInstance = vm.$mp[vm.mpType];
        mocks.forEach(function (mock) {
          if (hasOwn(mpInstance, mock)) {
            vm[mock] = mpInstance[mock];
          }
        });
      }

      function hasHook(hook, vueOptions) {
        if (!vueOptions) {
          return true;
        }

        if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
          return true;
        }

        vueOptions = vueOptions.default || vueOptions;

        if (isFn(vueOptions)) {
          if (isFn(vueOptions.extendOptions[hook])) {
            return true;
          }
          if (vueOptions.super &&
            vueOptions.super.options &&
            Array.isArray(vueOptions.super.options[hook])) {
            return true;
          }
          return false;
        }

        if (isFn(vueOptions[hook])) {
          return true;
        }
        var mixins = vueOptions.mixins;
        if (Array.isArray(mixins)) {
          return !!mixins.find(function (mixin) { return hasHook(hook, mixin); });
        }
      }

      function initHooks(mpOptions, hooks, vueOptions) {
        hooks.forEach(function (hook) {
          if (hasHook(hook, vueOptions)) {
            mpOptions[hook] = function (args) {
              return this.$vm && this.$vm.__call_hook(hook, args);
            };
          }
        });
      }

      function initVueComponent(Vue, vueOptions) {
        vueOptions = vueOptions.default || vueOptions;
        var VueComponent;
        if (isFn(vueOptions)) {
          VueComponent = vueOptions;
        } else {
          VueComponent = Vue.extend(vueOptions);
        }
        vueOptions = VueComponent.options;
        return [VueComponent, vueOptions];
      }

      function initSlots(vm, vueSlots) {
        if (Array.isArray(vueSlots) && vueSlots.length) {
          var $slots = Object.create(null);
          vueSlots.forEach(function (slotName) {
            $slots[slotName] = true;
          });
          vm.$scopedSlots = vm.$slots = $slots;
        }
      }

      function initVueIds(vueIds, mpInstance) {
        vueIds = (vueIds || '').split(',');
        var len = vueIds.length;

        if (len === 1) {
          mpInstance._$vueId = vueIds[0];
        } else if (len === 2) {
          mpInstance._$vueId = vueIds[0];
          mpInstance._$vuePid = vueIds[1];
        }
      }

      function initData(vueOptions, context) {
        var data = vueOptions.data || {};
        var methods = vueOptions.methods || {};

        if (typeof data === 'function') {
          try {
            data = data.call(context); // 支持 Vue.prototype 上挂的数据
          } catch (e) {
            if (Object({ "VUE_APP_PLATFORM": "mp-weixin", "NODE_ENV": "development", "BASE_URL": "/" }).VUE_APP_DEBUG) {
              console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
            }
          }
        } else {
          try {
            // 对 data 格式化
            data = JSON.parse(JSON.stringify(data));
          } catch (e) { }
        }

        if (!isPlainObject(data)) {
          data = {};
        }

        Object.keys(methods).forEach(function (methodName) {
          if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
            data[methodName] = methods[methodName];
          }
        });

        return data;
      }

      var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

      function createObserver(name) {
        return function observer(newVal, oldVal) {
          if (this.$vm) {
            this.$vm[name] = newVal; // 为了触发其他非 render watcher
          }
        };
      }

      function initBehaviors(vueOptions, initBehavior) {
        var vueBehaviors = vueOptions.behaviors;
        var vueExtends = vueOptions.extends;
        var vueMixins = vueOptions.mixins;

        var vueProps = vueOptions.props;

        if (!vueProps) {
          vueOptions.props = vueProps = [];
        }

        var behaviors = [];
        if (Array.isArray(vueBehaviors)) {
          vueBehaviors.forEach(function (behavior) {
            behaviors.push(behavior.replace('uni://', "wx".concat("://")));
            if (behavior === 'uni://form-field') {
              if (Array.isArray(vueProps)) {
                vueProps.push('name');
                vueProps.push('value');
              } else {
                vueProps.name = {
                  type: String,
                  default: ''
                };

                vueProps.value = {
                  type: [String, Number, Boolean, Array, Object, Date],
                  default: ''
                };

              }
            }
          });
        }
        if (isPlainObject(vueExtends) && vueExtends.props) {
          behaviors.push(
            initBehavior({
              properties: initProperties(vueExtends.props, true)
            }));


        }
        if (Array.isArray(vueMixins)) {
          vueMixins.forEach(function (vueMixin) {
            if (isPlainObject(vueMixin) && vueMixin.props) {
              behaviors.push(
                initBehavior({
                  properties: initProperties(vueMixin.props, true)
                }));


            }
          });
        }
        return behaviors;
      }

      function parsePropType(key, type, defaultValue, file) {
        // [String]=>String
        if (Array.isArray(type) && type.length === 1) {
          return type[0];
        }
        return type;
      }

      function initProperties(props) {
        var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false; var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var properties = {};
        if (!isBehavior) {
          properties.vueId = {
            type: String,
            value: ''
          };

          properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
            type: null,
            value: [],
            observer: function observer(newVal, oldVal) {
              var $slots = Object.create(null);
              newVal.forEach(function (slotName) {
                $slots[slotName] = true;
              });
              this.setData({
                $slots: $slots
              });

            }
          };

        }
        if (Array.isArray(props)) {// ['title']
          props.forEach(function (key) {
            properties[key] = {
              type: null,
              observer: createObserver(key)
            };

          });
        } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
          Object.keys(props).forEach(function (key) {
            var opts = props[key];
            if (isPlainObject(opts)) {// title:{type:String,default:''}
              var value = opts.default;
              if (isFn(value)) {
                value = value();
              }

              opts.type = parsePropType(key, opts.type);

              properties[key] = {
                type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
                value: value,
                observer: createObserver(key)
              };

            } else {// content:String
              var type = parsePropType(key, opts);
              properties[key] = {
                type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
                observer: createObserver(key)
              };

            }
          });
        }
        return properties;
      }

      function wrapper$1(event) {
        // TODO 又得兼容 mpvue 的 mp 对象
        try {
          event.mp = JSON.parse(JSON.stringify(event));
        } catch (e) { }

        event.stopPropagation = noop;
        event.preventDefault = noop;

        event.target = event.target || {};

        if (!hasOwn(event, 'detail')) {
          event.detail = {};
        }

        if (hasOwn(event, 'markerId')) {
          event.detail = typeof event.detail === 'object' ? event.detail : {};
          event.detail.markerId = event.markerId;
        }

        if (isPlainObject(event.detail)) {
          event.target = Object.assign({}, event.target, event.detail);
        }

        return event;
      }

      function getExtraValue(vm, dataPathsArray) {
        var context = vm;
        dataPathsArray.forEach(function (dataPathArray) {
          var dataPath = dataPathArray[0];
          var value = dataPathArray[2];
          if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
            var propPath = dataPathArray[1];
            var valuePath = dataPathArray[3];

            var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

            if (Number.isInteger(vFor)) {
              context = value;
            } else if (!propPath) {
              context = vFor[value];
            } else {
              if (Array.isArray(vFor)) {
                context = vFor.find(function (vForItem) {
                  return vm.__get_value(propPath, vForItem) === value;
                });
              } else if (isPlainObject(vFor)) {
                context = Object.keys(vFor).find(function (vForKey) {
                  return vm.__get_value(propPath, vFor[vForKey]) === value;
                });
              } else {
                console.error('v-for 暂不支持循环数据：', vFor);
              }
            }

            if (valuePath) {
              context = vm.__get_value(valuePath, context);
            }
          }
        });
        return context;
      }

      function processEventExtra(vm, extra, event) {
        var extraObj = {};

        if (Array.isArray(extra) && extra.length) {
          /**
                                                    *[
                                                    *    ['data.items', 'data.id', item.data.id],
                                                    *    ['metas', 'id', meta.id]
                                                    *],
                                                    *[
                                                    *    ['data.items', 'data.id', item.data.id],
                                                    *    ['metas', 'id', meta.id]
                                                    *],
                                                    *'test'
                                                    */
          extra.forEach(function (dataPath, index) {
            if (typeof dataPath === 'string') {
              if (!dataPath) {// model,prop.sync
                extraObj['$' + index] = vm;
              } else {
                if (dataPath === '$event') {// $event
                  extraObj['$' + index] = event;
                } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
                  extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
                } else {
                  extraObj['$' + index] = vm.__get_value(dataPath);
                }
              }
            } else {
              extraObj['$' + index] = getExtraValue(vm, dataPath);
            }
          });
        }

        return extraObj;
      }

      function getObjByArray(arr) {
        var obj = {};
        for (var i = 1; i < arr.length; i++) {
          var element = arr[i];
          obj[element[0]] = element[1];
        }
        return obj;
      }

      function processEventArgs(vm, event) {
        var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : []; var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : []; var isCustom = arguments.length > 4 ? arguments[4] : undefined; var methodName = arguments.length > 5 ? arguments[5] : undefined;
        var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
        if (isCustom) {// 自定义事件
          isCustomMPEvent = event.currentTarget &&
            event.currentTarget.dataset &&
            event.currentTarget.dataset.comType === 'wx';
          if (!args.length) {// 无参数，直接传入 event 或 detail 数组
            if (isCustomMPEvent) {
              return [event];
            }
            return event.detail.__args__ || event.detail;
          }
        }

        var extraObj = processEventExtra(vm, extra, event);

        var ret = [];
        args.forEach(function (arg) {
          if (arg === '$event') {
            if (methodName === '__set_model' && !isCustom) {// input v-model value
              ret.push(event.target.value);
            } else {
              if (isCustom && !isCustomMPEvent) {
                ret.push(event.detail.__args__[0]);
              } else {// wxcomponent 组件或内置组件
                ret.push(event);
              }
            }
          } else {
            if (Array.isArray(arg) && arg[0] === 'o') {
              ret.push(getObjByArray(arg));
            } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
              ret.push(extraObj[arg]);
            } else {
              ret.push(arg);
            }
          }
        });

        return ret;
      }

      var ONCE = '~';
      var CUSTOM = '^';

      function isMatchEventType(eventType, optType) {
        return eventType === optType ||

          optType === 'regionchange' && (

            eventType === 'begin' ||
            eventType === 'end');


      }

      function handleEvent(event) {
        var _this = this;
        event = wrapper$1(event);

        // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
        var dataset = (event.currentTarget || event.target).dataset;
        if (!dataset) {
          return console.warn('事件信息不存在');
        }
        var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
        if (!eventOpts) {
          return console.warn('事件信息不存在');
        }

        // [['handle',[1,2,a]],['handle1',[1,2,a]]]
        var eventType = event.type;

        var ret = [];

        eventOpts.forEach(function (eventOpt) {
          var type = eventOpt[0];
          var eventsArray = eventOpt[1];

          var isCustom = type.charAt(0) === CUSTOM;
          type = isCustom ? type.slice(1) : type;
          var isOnce = type.charAt(0) === ONCE;
          type = isOnce ? type.slice(1) : type;

          if (eventsArray && isMatchEventType(eventType, type)) {
            eventsArray.forEach(function (eventArray) {
              var methodName = eventArray[0];
              if (methodName) {
                var handlerCtx = _this.$vm;
                if (
                  handlerCtx.$options.generic &&
                  handlerCtx.$parent &&
                  handlerCtx.$parent.$parent) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
                  handlerCtx = handlerCtx.$parent.$parent;
                }
                if (methodName === '$emit') {
                  handlerCtx.$emit.apply(handlerCtx,
                    processEventArgs(
                      _this.$vm,
                      event,
                      eventArray[1],
                      eventArray[2],
                      isCustom,
                      methodName));

                  return;
                }
                var handler = handlerCtx[methodName];
                if (!isFn(handler)) {
                  throw new Error(" _vm.".concat(methodName, " is not a function"));
                }
                if (isOnce) {
                  if (handler.once) {
                    return;
                  }
                  handler.once = true;
                }
                ret.push(handler.apply(handlerCtx, processEventArgs(
                  _this.$vm,
                  event,
                  eventArray[1],
                  eventArray[2],
                  isCustom,
                  methodName)));

              }
            });
          }
        });

        if (
          eventType === 'input' &&
          ret.length === 1 &&
          typeof ret[0] !== 'undefined') {
          return ret[0];
        }
      }

      var hooks = [
        'onShow',
        'onHide',
        'onError',
        'onPageNotFound'];


      function parseBaseApp(vm, _ref3) {
        var mocks = _ref3.mocks, initRefs = _ref3.initRefs;
        if (vm.$options.store) {
          _vue.default.prototype.$store = vm.$options.store;
        }

        _vue.default.prototype.mpHost = "mp-weixin";

        _vue.default.mixin({
          beforeCreate: function beforeCreate() {
            if (!this.$options.mpType) {
              return;
            }

            this.mpType = this.$options.mpType;

            this.$mp = _defineProperty({
              data: {}
            },
              this.mpType, this.$options.mpInstance);


            this.$scope = this.$options.mpInstance;

            delete this.$options.mpType;
            delete this.$options.mpInstance;

            if (this.mpType !== 'app') {
              initRefs(this);
              initMocks(this, mocks);
            }
          }
        });


        var appOptions = {
          onLaunch: function onLaunch(args) {
            if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
              return;
            }
            {
              if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
                console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
              }
            }

            this.$vm = vm;

            this.$vm.$mp = {
              app: this
            };


            this.$vm.$scope = this;
            // vm 上也挂载 globalData
            this.$vm.globalData = this.globalData;

            this.$vm._isMounted = true;
            this.$vm.__call_hook('mounted', args);

            this.$vm.__call_hook('onLaunch', args);
          }
        };


        // 兼容旧版本 globalData
        appOptions.globalData = vm.$options.globalData || {};
        // 将 methods 中的方法挂在 getApp() 中
        var methods = vm.$options.methods;
        if (methods) {
          Object.keys(methods).forEach(function (name) {
            appOptions[name] = methods[name];
          });
        }

        initHooks(appOptions, hooks);

        return appOptions;
      }

      var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

      function findVmByVueId(vm, vuePid) {
        var $children = vm.$children;
        // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
        for (var i = $children.length - 1; i >= 0; i--) {
          var childVm = $children[i];
          if (childVm.$scope._$vueId === vuePid) {
            return childVm;
          }
        }
        // 反向递归查找
        var parentVm;
        for (var _i = $children.length - 1; _i >= 0; _i--) {
          parentVm = findVmByVueId($children[_i], vuePid);
          if (parentVm) {
            return parentVm;
          }
        }
      }

      function initBehavior(options) {
        return Behavior(options);
      }

      function isPage() {
        return !!this.route;
      }

      function initRelation(detail) {
        this.triggerEvent('__l', detail);
      }

      function initRefs(vm) {
        var mpInstance = vm.$scope;
        Object.defineProperty(vm, '$refs', {
          get: function get() {
            var $refs = {};
            var components = mpInstance.selectAllComponents('.vue-ref');
            components.forEach(function (component) {
              var ref = component.dataset.ref;
              $refs[ref] = component.$vm || component;
            });
            var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
            forComponents.forEach(function (component) {
              var ref = component.dataset.ref;
              if (!$refs[ref]) {
                $refs[ref] = [];
              }
              $refs[ref].push(component.$vm || component);
            });
            return $refs;
          }
        });

      }

      function handleLink(event) {
        var _ref4 =



          event.detail || event.value, vuePid = _ref4.vuePid, vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

        var parentVm;

        if (vuePid) {
          parentVm = findVmByVueId(this.$vm, vuePid);
        }

        if (!parentVm) {
          parentVm = this.$vm;
        }

        vueOptions.parent = parentVm;
      }

      function parseApp(vm) {
        return parseBaseApp(vm, {
          mocks: mocks,
          initRefs: initRefs
        });

      }

      function createApp(vm) {
        App(parseApp(vm));
        return vm;
      }

      function parseBaseComponent(vueComponentOptions) {
        var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, isPage = _ref5.isPage, initRelation = _ref5.initRelation; var _initVueComponent =
          initVueComponent(_vue.default, vueComponentOptions), _initVueComponent2 = _slicedToArray(_initVueComponent, 2), VueComponent = _initVueComponent2[0], vueOptions = _initVueComponent2[1];

        var options = _objectSpread({
          multipleSlots: true,
          addGlobalClass: true
        },
          vueOptions.options || {});


        {
          // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
          if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
            Object.assign(options, vueOptions['mp-weixin'].options);
          }
        }

        var componentOptions = {
          options: options,
          data: initData(vueOptions, _vue.default.prototype),
          behaviors: initBehaviors(vueOptions, initBehavior),
          properties: initProperties(vueOptions.props, false, vueOptions.__file),
          lifetimes: {
            attached: function attached() {
              var properties = this.properties;

              var options = {
                mpType: isPage.call(this) ? 'page' : 'component',
                mpInstance: this,
                propsData: properties
              };


              initVueIds(properties.vueId, this);

              // 处理父子关系
              initRelation.call(this, {
                vuePid: this._$vuePid,
                vueOptions: options
              });


              // 初始化 vue 实例
              this.$vm = new VueComponent(options);

              // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
              initSlots(this.$vm, properties.vueSlots);

              // 触发首次 setData
              this.$vm.$mount();
            },
            ready: function ready() {
              // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
              // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
              if (this.$vm) {
                this.$vm._isMounted = true;
                this.$vm.__call_hook('mounted');
                this.$vm.__call_hook('onReady');
              }
            },
            detached: function detached() {
              this.$vm && this.$vm.$destroy();
            }
          },

          pageLifetimes: {
            show: function show(args) {
              this.$vm && this.$vm.__call_hook('onPageShow', args);
            },
            hide: function hide() {
              this.$vm && this.$vm.__call_hook('onPageHide');
            },
            resize: function resize(size) {
              this.$vm && this.$vm.__call_hook('onPageResize', size);
            }
          },

          methods: {
            __l: handleLink,
            __e: handleEvent
          }
        };


        // externalClasses
        if (vueOptions.externalClasses) {
          componentOptions.externalClasses = vueOptions.externalClasses;
        }

        if (Array.isArray(vueOptions.wxsCallMethods)) {
          vueOptions.wxsCallMethods.forEach(function (callMethod) {
            componentOptions.methods[callMethod] = function (args) {
              return this.$vm[callMethod](args);
            };
          });
        }

        if (isPage) {
          return componentOptions;
        }
        return [componentOptions, VueComponent];
      }

      function parseComponent(vueComponentOptions) {
        return parseBaseComponent(vueComponentOptions, {
          isPage: isPage,
          initRelation: initRelation
        });

      }

      var hooks$1 = [
        'onShow',
        'onHide',
        'onUnload'];


      hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

      function parseBasePage(vuePageOptions, _ref6) {
        var isPage = _ref6.isPage, initRelation = _ref6.initRelation;
        var pageOptions = parseComponent(vuePageOptions);

        initHooks(pageOptions.methods, hooks$1, vuePageOptions);

        pageOptions.methods.onLoad = function (args) {
          this.$vm.$mp.query = args; // 兼容 mpvue
          this.$vm.__call_hook('onLoad', args);
        };

        return pageOptions;
      }

      function parsePage(vuePageOptions) {
        return parseBasePage(vuePageOptions, {
          isPage: isPage,
          initRelation: initRelation
        });

      }

      function createPage(vuePageOptions) {
        {
          return Component(parsePage(vuePageOptions));
        }
      }

      function createComponent(vueOptions) {
        {
          return Component(parseComponent(vueOptions));
        }
      }

      todos.forEach(function (todoApi) {
        protocols[todoApi] = false;
      });

      canIUses.forEach(function (canIUseApi) {
        var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
          canIUseApi;
        if (!wx.canIUse(apiName)) {
          protocols[canIUseApi] = false;
        }
      });

      var uni = {};

      if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
        uni = new Proxy({}, {
          get: function get(target, name) {
            if (target[name]) {
              return target[name];
            }
            if (baseApi[name]) {
              return baseApi[name];
            }
            if (api[name]) {
              return promisify(name, api[name]);
            }
            {
              if (extraApi[name]) {
                return promisify(name, extraApi[name]);
              }
              if (todoApis[name]) {
                return promisify(name, todoApis[name]);
              }
            }
            if (eventApi[name]) {
              return eventApi[name];
            }
            if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
              return;
            }
            return promisify(name, wrapper(name, wx[name]));
          },
          set: function set(target, name, value) {
            target[name] = value;
            return true;
          }
        });

      } else {
        Object.keys(baseApi).forEach(function (name) {
          uni[name] = baseApi[name];
        });

        {
          Object.keys(todoApis).forEach(function (name) {
            uni[name] = promisify(name, todoApis[name]);
          });
          Object.keys(extraApi).forEach(function (name) {
            uni[name] = promisify(name, todoApis[name]);
          });
        }

        Object.keys(eventApi).forEach(function (name) {
          uni[name] = eventApi[name];
        });

        Object.keys(api).forEach(function (name) {
          uni[name] = promisify(name, api[name]);
        });

        Object.keys(wx).forEach(function (name) {
          if (hasOwn(wx, name) || hasOwn(protocols, name)) {
            uni[name] = promisify(name, wrapper(name, wx[name]));
          }
        });
      }

      wx.createApp = createApp;
      wx.createPage = createPage;
      wx.createComponent = createComponent;

      var uni$1 = uni; var _default =

        uni$1; exports.default = _default;

      /***/
    }),

  /***/ 10:
  /*!************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/shop-info-result.js ***!
    \************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function (uni) {/**
   * 获取店铺id
   */
        module.exports = function loginResultPromise() {
          var checkCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
          var promise = new Promise(function (resolve, reject) {
            var result = uni.getStorageSync('ShopInfoDone');
            if (result) {
              resolve(result);
            } else {
              reject();
            }
          });

          return promise.catch(function () {
            var count = 0;
            var p = new Promise(function (resolve, reject) {
              var times = setInterval(function () {
                var result = uni.getStorageSync('ShopInfoDone');
                if (result) {
                  clearInterval(times);
                  resolve(result);
                }

                if (++count >= checkCount) {// 超过30s(300次)超时
                  clearInterval(times);
                  reject();
                }
              }, 50);
            });
            return p;
          });
        };
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 11:
  /*!***************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/request.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        var _cryptHelper = _interopRequireDefault(__webpack_require__(/*! @/utils/crypt-helper */ 12));

        var _url = _interopRequireDefault(__webpack_require__(/*! ./url */ 19));
        var _systemInfo = _interopRequireDefault(__webpack_require__(/*! ./system-info */ 20));
        var _loginResult = _interopRequireDefault(__webpack_require__(/*! ./login-result */ 9));
        var _global = __webpack_require__(/*! ./global.config */ 21); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); } function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); } function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; } function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




        module.exports = function (_ref) {
          var _this = this; var target = _ref.url, _ref$data = _ref.data, data = _ref$data === void 0 ? {} : _ref$data, _ref$header = _ref.header, header = _ref$header === void 0 ? { 'content-type': 'application/json' } : _ref$header, _success = _ref.success, down = _ref.down, _fail = _ref.fail, _complete = _ref.complete, _ref$mode = _ref.mode, mode = _ref$mode === void 0 ? "normal" : _ref$mode, _ref$enCode = _ref.enCode, enCode = _ref$enCode === void 0 ? false : _ref$enCode, _ref$deCode = _ref.deCode, deCode = _ref$deCode === void 0 ? false : _ref$deCode;

          var promise = Promise.resolve();

          promise = (0, _loginResult.default)();






          promise.then(function (info) {
            var _ref2 =
              Array.isArray(info) ? info : [], _ref3 = _slicedToArray(_ref2, 4), _ref3$ = _ref3[0], sys = _ref3$ === void 0 ? {} : _ref3$, _ref3$2 = _ref3[1], property = _ref3$2 === void 0 ? {} : _ref3$2, _ref3$3 = _ref3[2], devc = _ref3$3 === void 0 ? {} : _ref3$3, _ref3$4 = _ref3[3], client = _ref3$4 === void 0 ? {} : _ref3$4;
            var token = uni.getStorageSync("token");
            if (token) {
              var params = data;
              if (typeof params === 'object') {
                params.LoginId = data.MemberId ? data.MemberId : token.MemberId;
                params.MemberId = data.MemberId ? data.MemberId : token.MemberId;
                params.OpendId = data.OpenId ? data.OpenId : token.OpenId;
                params.PostKey = data.PostKey ? data.PostKey : token.PostKey;
                params.Secretkey = data.Secretkey ? data.Secretkey : token.Secretkey;
                params.TokenKey = data.TokenKey ? data.TokenKey : token.TokenKey;
                params.ShareUserID = token.ShareUserID || undefined;
                params.SceneId = token.SceneId || undefined;
                params.Version = _url.default.version;
                params.POPAccountID = data.POPAccountID ? data.POPAccountID : token.POPAccountID;
                params.POPSupplierID = data.POPSupplierID ? data.POPSupplierID : token.POPSupplierID;
                params.UserName = token.NickName ? token.NickName : '';




                Object.assign(params, { ProjectCode: _global.projectCode, PlatformCode: _global.platform }, params);
              }
              var start = new Date();
              console.log(">>>>>>发送请求>>>>>>", _url.default[mode] + target, JSON.stringify(params));
              uni.request({
                url: _url.default[mode] + target,
                method: "POST",
                header: header,
                data: enCode ? {
                  Data: _cryptHelper.default.Encrypt(JSON.stringify(params))
                } :
                  params,
                success: function success(res) {
                  if (deCode) {
                    res.data = JSON.parse(_cryptHelper.default.Decrypt(res.data));
                  }
                  if (res.data.IsSuccess) {
                    console.log("<<<<<<<<<<请求<<<<<<<<<<", new Date() - start, target, "返回成功", res.data);
                    _success && _success.call(null, res);
                  } else {
                    console.warn("<<<<<<<<<<请求<<<<<<<<<<", new Date() - start, target, "返回失败", res.data);
                    if (res.data.Msg && res.data.Msg.indexOf("用户不合法") > -1) {
                      console.log("==============用户不合法，执行login");
                    }
                    res.data != 'success' && _this.except({
                      level: 0,
                      path: _url.default[mode] + target,
                      message: JSON.stringify(res.data)
                    });

                    down && down.call(null, res);
                  }
                },
                fail: function fail(e) {
                  try {
                    var err = JSON.stringify(e) || '';
                    console.warn("<<<<<<<<<请求失败<<<<<<<<<<", target, "原因:", e);
                    _this.except({
                      level: 0,
                      path: _url.default[mode] + target,
                      message: err
                    });

                    _fail && _fail.call(null);
                  } catch (error) {

                  }
                },
                complete: function complete() {
                  _complete && _complete.call(null);
                }
              });

            } else {
              console.log("token不存在，执行login");
              _this.hasToken(false);
            }
          });
          promise = null;
        };
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 118:
  /*!*****************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/recommend.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); } function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); } function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); } function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); } function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 自主推荐
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */var _default =
        {
          methods: {
            /**
                      * 验证商品是否被推荐
                      * @param {Number} unionCode 平台码
                      * @param {Number} id 商品id
                      */
            getIsRecommend: function getIsRecommend(unionCode, id) {
              var _this = this;
              this.$app.request2({
                url: 'api/ManagerRecommend/Exists',
                mode: 'normal4',
                data: {
                  UnionCode: unionCode,
                  GoodsId: id
                },

                success: function success(res) {
                  _this.isRecommend = res.value; // true ，false 是否推荐
                },
                down: function down(res) { },
                fail: function fail() { },
                complete: function complete() { }
              });

            },
            /**
                * 查询自主推荐夹列表
                * @param {boolean} isAllChecked
                */
            getRecommendList: function getRecommendList(isAllChecked) {
              var _this2 = this;
              uni.showLoading({
                mask: true
              });

              this.$app.request2({
                url: 'api/ManagerRecommend/GetPageList',
                mode: 'normal4',
                data: {
                  ManagerLoginId: this.mangerId,
                  PageIndex: this.pageIndex,
                  PageSize: this.pageSize
                },

                success: function success(res) {

                  var list = (res.PageList.List || []).filter(function (el) {
                    return el.UnionCode != 30103;
                  });





                  var recommendList = [];
                  if (_this2.pageIndex === 1) {
                    recommendList = _toConsumableArray(list);
                  } else {
                    recommendList = [].concat(_toConsumableArray(_this2.recommendList), _toConsumableArray(list));
                  }

                  _this2.isMore = res.PageList.IsMore;
                  // 分享商品
                  if (_this2.recommendShare && _this2.recommendShare.dataList) {
                    _this2.recommendShare.dataList = recommendList.filter(function (el) { return el.GoodsInfo.RowStatus == 1; }).slice(0, 2);
                  }
                  // 添加选择状态字段
                  recommendList.forEach(function (item) {
                    item.checked = item.checked ? item.checked : _this2.isAllChecked;
                  });
                  _this2.recommendList = recommendList;
                },
                down: function down(res) {
                  _this2.recommendList = [];
                  _this2.isMore = false;
                },
                fail: function fail() {
                  _this2.recommendList = [];
                  _this2.isMore = false;
                },
                complete: function complete() {
                  uni.hideLoading();
                  uni.stopPullDownRefresh();
                }
              });

            },
            /**
                * 删除自主推荐
                */
            delRecommend: function delRecommend() {
              var _this3 = this; var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
              return new Promise(function (resolve, reject) {
                _this3.$app.request2({
                  url: 'api/ManagerRecommend/Delete',
                  mode: 'normal4',
                  data: {
                    GoodsList: ids
                  },

                  success: function success(res) {
                    if (res && res[0]) {
                      uni.showToast({
                        title: '取消推荐',
                        mask: true,
                        icon: 'none'
                      });

                      _this3.$eventBus.$emit('recommend-del', {
                        id: ids
                      });

                      resolve();
                    } else {
                      uni.showToast({
                        title: '取消推荐失败',
                        mask: true,
                        icon: 'none'
                      });

                      reject();
                    }
                  },
                  down: function down(res) {
                    uni.showToast({
                      title: '取消推荐失败',
                      mask: true,
                      icon: 'none'
                    });

                    reject();
                  },
                  fail: function fail() {
                    uni.showToast({
                      title: '取消推荐失败',
                      mask: true,
                      icon: 'none'
                    });

                    reject();
                  },
                  complete: function complete() { }
                });

              });
            },
            /**
                * 新增推荐
                * @param {Object} unionCode 平台码
                * @param {Object} id 唯一标识
                */
            addRecommend: function addRecommend(unionCode, id) {
              var _this4 = this;
              this.$app.request2({
                url: 'api/ManagerRecommend/Add',
                mode: 'normal4',
                data: {
                  UnionCode: unionCode,
                  GoodsId: id
                },

                success: function success(res) {
                  if (res && res.value) {
                    uni.showToast({
                      title: '已添加到我的主推',
                      mask: true,
                      icon: 'none'
                    });

                    _this4.isRecommend = true;
                    _this4.$eventBus.$emit('recommend-add', {
                      id: res
                    });

                  } else {
                    uni.showToast({
                      title: '添加主推失败',
                      mask: true,
                      icon: 'none'
                    });

                  }
                },
                down: function down(res) {
                  var _ref =


                    res || {}, _ref$data = _ref.data, data = _ref$data === void 0 ? {} : _ref$data;
                  uni.showToast({
                    title: data.ResultMsg || '添加主推失败',
                    mask: true,
                    icon: 'none'
                  });

                },
                fail: function fail() {
                  uni.showToast({
                    title: '添加主推失败',
                    mask: true,
                    icon: 'none'
                  });

                },
                complete: function complete() { }
              });

            },
            /**
                * 跳转详情
                * @param {number} code 唯一码
                * @param {object} item 商品信息
                */
            skipDetail: function skipDetail(code, item) {
              if (code == 30101 || code == 30102 || code == 30103 || code == 30109 || code == 30110 || code == 30111) {// 拼多多，京东,同程
                uni.navigateTo({
                  url: "/pages/buying-pdd/index?id=".concat(item.id, "&unionCode=").concat(code)
                });

              } else if (code == 30115) {// 度假
                uni.navigateTo({
                  url: "/pages/buying-pdd/index?id=".concat(item.id, "&unionCode=").concat(code, "&productBelong=").concat(item.ProductBelong, "&duJiaSupplierId=").concat(item.DujiaSupplierId)
                });

              } else if (code == 30105 || code == 30106 || code == 30107) {//好福利，吃喝玩乐
                uni.navigateTo({
                  url: "/pages/welfare-detail/welfare-detail?mission=".concat(item.id)
                });

              } else if (code == 30104) {//喵家优选
                uni.navigateTo({
                  url: "/pages/buying-normal/index?id=".concat(item.id)
                });

              }
            }
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 119:
  /*!*************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/number.js ***!
    \*************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      var multiply = __webpack_require__(/*! ./multiply */ 120);

      function add(num1, num2) {
        if (isNaN(Number(num1)) || isNaN(Number(num2))) {
          return NaN;
        }
        var e = 0;

        var len1 = 0;

        if ((num1 + '').indexOf('.') > -1) {
          len1 = (num1 + '').replace(/^-?(\d+)((\.)(\d+))?$/, '$4').length;
        }

        var len2 = 0;

        if ((num2 + '').indexOf('.') > -1) {
          len2 = (num2 + '').replace(/^-?(\d+)((\.)(\d+))?$/, '$4').length;
        }

        e = Math.max(len1, len2);

        var num1Int = multiply(num1, Math.pow(10, e));
        var num2Int = multiply(num2, Math.pow(10, e));

        var result = num1Int + num2Int + '';

        if (result.length > e) {
          var reg = new RegExp("(\\d{".concat(e, "})$"));
          result = result.replace(reg, '.$1');
        } else {
          result = '0.' + new Array(e - result.length).fill(0).join('') + result;
        }
        return Number(result);
      }

      module.exports = {
        add: add,
        multiply: multiply
      };

      /***/
    }),

  /***/ 12:
  /*!*******************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/crypt-helper.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      var Crypto = __webpack_require__(/*! ./cryptojs/cryptojs.js */ 13).Crypto;

      //加密
      function Encrypt(word) {
        var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
        var eb = Crypto.charenc.UTF8.stringToBytes(word);
        var kb = Crypto.charenc.UTF8.stringToBytes("30357993730357993730357993736985"); //KEY
        var vb = Crypto.charenc.UTF8.stringToBytes("4523684452368445"); //IV
        var ub = Crypto.AES.encrypt(eb, kb, { iv: vb, mode: mode, asBpytes: true });
        return ub;
      }
      //解密
      function Decrypt(word) {
        var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
        var eb = Crypto.util.base64ToBytes(word);
        var kb = Crypto.charenc.UTF8.stringToBytes("30357993730357993730357993736985"); //KEY
        var vb = Crypto.charenc.UTF8.stringToBytes("4523684452368445"); //IV
        var ub = Crypto.AES.decrypt(eb, kb, { asBpytes: true, mode: mode, iv: vb });
        return ub;
      }

      module.exports = {
        Encrypt: Encrypt,
        Decrypt: Decrypt
      };

      /***/
    }),

  /***/ 120:
  /*!***************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/multiply.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

      /**
       * 浮点数相乘
       */
      module.exports = function (num1, num2) {
        num1 = Number(num1);
        num2 = Number(num2);
        if (isNaN(num1) || isNaN(num1)) {
          return NaN;
        }
        var e = 0;

        var num1Int = String(num1).replace('.', '');
        var num2Int = String(num2).replace('.', '');
        // js浮点数影响计算精度兼容
        if (String(num1).indexOf('.') > -1) {
          e += String(num1).replace(/^-?(\d+)((\.)(\d+))?$/, '$4').length;
        }

        if (String(num2).indexOf('.') > -1) {
          e += String(num2).replace(/^-?(\d+)((\.)(\d+))?$/, '$4').length;
        }

        var result = num1Int * num2Int + '';
        if (result.length > e) {
          var reg = new RegExp("(\\d{".concat(e, "})$"));
          result = result.replace(reg, '.$1');
        } else {
          result = '0.' + new Array(e - result.length).fill(0).join('') + result;
        }

        return Number(result);
      };

      /***/
    }),

  /***/ 121:
  /*!******************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/tc-img-rect.js ***!
    \******************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; var tcImgHost = ['pic5.40017.cn', 'pic4.40017.cn', 'pic3.40017.cn', 'pic2.40017.cn'];
      function _default(url, width, height) {
        var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '00';
        if (typeof url !== 'string') {
          return url;
        }
        var isTC = false;
        for (var len = tcImgHost.length; len--;) {
          if (url.indexOf(tcImgHost[len]) > -1) {
            isTC = true;
            break;
          }
        }
        if (isTC) {
          return url.replace(/.(png|jpg)$/i, "_".concat(width, "x").concat(height, "_").concat(mode, ".$1"));
        } else {
          return url;
        }
      }

      /***/
    }),

  /***/ 122:
  /*!****************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/buying-normal/service.js ***!
    \****************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.getQRCode = getQRCode; exports.invalidGoods = invalidGoods; /**
                                                                                                                                                 * 获取菊花码
                                                                                                                                                 */
        function getQRCode(_ref) {
          var page = _ref.page, scene = _ref.scene, vm = _ref.vm;
          return vm.$app.genQRCode(page, scene).then(function (res) {
            return res;
          }).catch(function (ex) {
            typeof ex === 'object' &&
              uni.showToast({
                mask: true,
                title: res.data.ResultMsg,
                icon: 'none'
              });

            return Promise.reject();
          });
        }

        /**
           * 无效商品，跳转下架页面
           * @param {Vue} vm 组件实例
           * @param {Object} res 接口实例
           */
        function invalidGoods(_ref2) {
          var vm = _ref2.vm, res = _ref2.res;
          // 店主没有关联商品，所以商品不存在当前店铺
          if (res && res.data && res.data.ResultCode == 2 && res.data.Body && res.data.Body.IsAllowSaled === false) {
            res = res.data.Body;
            uni.redirectTo({
              url: "/sub-packages/package_no-goods/index/index?imgUrl=".concat(res.ImagePath && encodeURIComponent(res.ImagePath) || '无', "&title=").concat(res.Name &&
                encodeURIComponent(res.Name) ||
                '无', "&unionCode=30104&shop=none")
            });

          }
        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 13:
  /*!************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/cryptojs/cryptojs.js ***!
    \************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      var Crypto = exports.Crypto = __webpack_require__(/*! ./lib/Crypto */ 14).Crypto;

      // [ 'CryptoMath'
      // , 'BlockModes'
      // , 'DES'
      // , 'AES'
      // , 'HMAC'
      // , 'MARC4'
      // , 'MD5'
      // , 'PBKDF2'
      // , 'PBKDF2Async'
      // , 'Rabbit'
      // , 'SHA1'
      // , 'SHA256'
      // ].
      ['BlockModes', 'AES', 'MD5'].forEach(function (path) {
        __webpack_require__(15)("./" + path);
      });

      /***/
    }),

  /***/ 136:
  /*!***************************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/components/common-share-poster/service.js ***!
    \***************************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 24)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } var _default = {
          /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 获取图片
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @param String src 图片地址
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @returns Promise
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
          getImage: function getImage(src) {
            if (!src) {
              return Promise.reject('非法的地址');
            }
            return new Promise(function (resolve, reject) {
              uni.getImageInfo({
                src: src,
                success: function success(res) {
                  resolve(res);
                },
                fail: function fail(err) {
                  reject('share-poster-material组件getImageInfo:下载图片失败-' + src);
                }
              });

            });
          },
          /**
              * 根据字体宽度计算文本可以分几行
              * @param {string} text 文本
              * @param {number} width 限制宽度
              */
          muliteLine: function muliteLine(_ref) {
            var text = _ref.text, width = _ref.width, ctx = _ref.ctx;
            var arrText = text.split(''),
              line = '',
              arrTr = [];
            for (var i = 0; i < arrText.length; i++) {
              var testLine = line + arrText[i];
              var metrics = this.measureText(testLine, ctx);
              if (metrics.width > width && i > 0) {
                arrTr.push(line);
                line = arrText[i];
              } else {
                line = testLine;
              }
              if (i == arrText.length - 1) {
                arrTr.push(line);
              }
            }
            return arrTr;
          },
          /**
              * 解决华为手机canvas上不能正常显示人民币符号的bug
              */
          getCNY: function getCNY() {
            return "".concat(unescape("\xA5".replace(/\\/g, '%')));
          },
          /**
              * 获取字体宽度
              * @param {string} text 文本
              * @param {CanvasElement} ctx  canvas实例
              */
          measureText: function measureText(text, ctx) {

            return ctx.measureText(text);






































          },
          /**
              * 圆角方形
              * @param {Object} cxt
              * @param {Object} x
              * @param {Object} y
              * @param {Object} width
              * @param {Object} height
              * @param {Object} radius
              */
          drawRoundRect: function drawRoundRect(color, x, y, width, height, radius, ctx) {
            return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      ctx.fillStyle = color;
                      ctx.beginPath();
                      ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
                      ctx.lineTo(width - radius + x, y);
                      ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
                      ctx.lineTo(width + x, height + y - radius);
                      ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
                      ctx.lineTo(radius + x, height + y);
                      ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
                      ctx.closePath();
                      ctx.fill(); case 11: case "end": return _context.stop();
                  }
                }
              }, _callee);
            }))();
          },
          /**
              * 图片
              * @param {Object} url
              * @param {Object} x
              * @param {Object} y
              * @param {Object} w
              * @param {Object} h
              * @param {Object} ctx
              */
          drawImage: function drawImage(url, x, y, w, h, ctx, circle, cx, cy, cr) {
            var _this = this; return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
              var _yield$_this$getImage, path, width, height; return _regenerator.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0: _context2.next = 2; return (




                      _this.getImage(url)); case 2: _yield$_this$getImage = _context2.sent; path = _yield$_this$getImage.path; width = _yield$_this$getImage.width; height = _yield$_this$getImage.height;
                      if (circle === true) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(cx, cy, cr, 0, 2 * Math.PI);
                        ctx.clip();
                      }
                      ctx.drawImage(path, x, y, w, h);
                      ctx.restore(); case 9: case "end": return _context2.stop();
                  }
                }
              }, _callee2);
            }))();
          },
          drawRect: function drawRect(color, x, y, w, h, ctx) {
            return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
              return _regenerator.default.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      ctx.beginPath();
                      ctx.fillStyle = color;
                      ctx.fillRect(x, y, w, h); case 3: case "end": return _context3.stop();
                  }
                }
              }, _callee3);
            }))();
          },
          drawCircle: function drawCircle(r, x, y, sDeg, ctx) {
            return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
              return _regenerator.default.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      ctx.beginPath();
                      ctx.arc(x, y, r, sDeg, 2 * Math.PI);
                      ctx.setStrokeStyle('#fff');
                      ctx.stroke(); case 4: case "end": return _context4.stop();
                  }
                }
              }, _callee4);
            }))();
          },
          drawText: function drawText(color, fontSize, text, x, y, w, lineNum, ctx) {
            var _this2 = this; return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
              var lines, lineArr, textMar, lineCut; return _regenerator.default.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      ctx.fillStyle = color;
                      ctx.setFontSize(Math.round(fontSize));
                      ctx.textBaseline = 'top';
                      if (lineNum != undefined) {
                        lines = lineNum;
                        lineArr = _this2.muliteLine({
                          text: text,
                          width: w,
                          ctx: ctx
                        });

                        textMar = lineNum > 1 ? 5 : 0;
                        lineCut = lineArr.slice(0, lines);
                        if (lineArr.length > lines) {
                          lineCut[lines - 1] = lineCut[lines - 1].slice(0, -1) + '…';
                        }
                        lineCut.forEach(function (item, index) {
                          ctx.fillText(item, x, y + (fontSize + textMar) * index);
                        });
                      } else {
                        ctx.fillText(text, x, y);
                      } case 4: case "end": return _context5.stop();
                  }
                }
              }, _callee5);
            }))();
          },
          drawLine: function drawLine(color, sX, sY, eX, eY, ctx) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.moveTo(sX, sY);
            ctx.lineTo(eX, eY);
            ctx.stroke();
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 139:
  /*!*************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/buying-pdd/service.js ***!
    \*************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.modifyElementStyle = modifyElementStyle; exports.offshelfSkip = offshelfSkip; exports.goBackSkipOffshelf = goBackSkipOffshelf; exports.getQRCode = getQRCode; exports.supplierIcon = supplierIcon; function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 商品下架跳转
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @param {Object} detail 商品详情
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
        function offshelfSkip(detail) {
          var unionCode = 30104;
          var imgUrl = '';
          var title = '';

          if (typeof detail === 'object') {
            if (detail.GoodsInfo !== undefined) {
              var goods = detail.GoodsInfo;
              imgUrl = goods && goods.img_main || '';
              title = goods && goods.title || '';
            }
            if (detail.UnionCode !== undefined) {
              unionCode = detail.UnionCode;
            }
          }

          uni.redirectTo({
            url: "/sub-packages/package_no-goods/index/index?imgUrl=".concat(encodeURIComponent(imgUrl), "&title=").concat(encodeURIComponent(title), "&unionCode=").concat(unionCode)
          });

        }

        /* 跳过下架页面 */
        function goBackSkipOffshelf() {
          var pages = getCurrentPages();
          if (pages && pages instanceof Array) {
            var index = -1;
            // 找到开始的下架页
            for (var i = 0, len = pages.length; i < len; i++) {
              if (pages[i] && pages[i].route === 'sub-packages/package_no-goods/index/index') {
                index = i;
                break;
              }
            }
            // 找到下架页之前的列表入口页
            if (index > 0) {
              uni.navigateBack({
                delta: pages.length - 1 - index + 2
              });

            } else {
              uni.navigateBack();
            }
          }
        }

        /**
           * 修改元素样式
           * @param {String} richText 富文本字符串
           */
        function modifyElementStyle(richText) {
          richText.forEach(function (item) {
            if (item.name === 'img' || item.name === 'table') {
              var attrs = item.attrs || {};
              item.attrs = _objectSpread({}, attrs, {
                style: 'width:100%;height:auto;' + (attrs.style ? attrs.style : '')
              });

            }
            if (item.children && item.children.length > 0) {
              modifyElementStyle(item.children);
            }
          });
        }


        /**
           * 获取菊花码
           */
        function getQRCode(_ref) {
          var page = _ref.page, scene = _ref.scene, vm = _ref.vm;
          return vm.$app.genQRCode(page, scene).then(function (res) {
            return res;
          }).catch(function (ex) {
            typeof ex === 'object' &&
              uni.showToast({
                mask: true,
                title: res.data.ResultMsg,
                icon: 'none'
              });

            return Promise.reject();
          });
        }

        /**
           * 供应商图标
           * @param {Object} unioncode
           */
        function supplierIcon(_ref2) {
          var vm = _ref2.vm;
          if (vm.isPDD) {
            return 'https://pic5.40017.cn/04/002/9f/a1/rBTJUl0R7hCABH2cAAAORKSH8Ko926.png';
          } else if (vm.isJD) {
            return 'https://pic5.40017.cn/04/001/9d/02/rBTJUl0R5-qAF8MHAAAI-s3frwQ074.png';
          } else if (vm.isTB) {
            return 'https://pic5.40017.cn/i/ori/LF40q6CJTa.png';
          } else if (vm.isGNY || vm.isZBY || vm.isCJY || vm.isDJ) {
            return 'https://pic5.40017.cn/04/002/53/fd/rBTJUl2vxPaAKBunAAAOoK_umIk170.png';
          }
        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 14:
  /*!**************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/cryptojs/lib/Crypto.js ***!
    \**************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

      if (typeof Crypto == "undefined" || !Crypto.util) {
        (function () {

          var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

          // Global Crypto object
          // with browser window or with node module
          var Crypto = typeof window === 'undefined' ? exports.Crypto = {} : window.Crypto = {};

          // Crypto utilities
          var util = Crypto.util = {

            // Bit-wise rotate left
            rotl: function rotl(n, b) {
              return n << b | n >>> 32 - b;
            },

            // Bit-wise rotate right
            rotr: function rotr(n, b) {
              return n << 32 - b | n >>> b;
            },

            // Swap big-endian to little-endian and vice versa
            endian: function endian(n) {

              // If number given, swap endian
              if (n.constructor == Number) {
                return util.rotl(n, 8) & 0x00FF00FF |
                  util.rotl(n, 24) & 0xFF00FF00;
              }

              // Else, assume array and swap all items
              for (var i = 0; i < n.length; i++) {
                n[i] = util.endian(n[i]);
              }
              return n;

            },

            // Generate an array of any length of random bytes
            randomBytes: function randomBytes(n) {
              for (var bytes = []; n > 0; n--) {
                bytes.push(Math.floor(Math.random() * 256));
              }
              return bytes;
            },

            // Convert a byte array to big-endian 32-bit words
            bytesToWords: function bytesToWords(bytes) {
              for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) {
                words[b >>> 5] |= (bytes[i] & 0xFF) << 24 - b % 32;
              }
              return words;
            },

            // Convert big-endian 32-bit words to a byte array
            wordsToBytes: function wordsToBytes(words) {
              for (var bytes = [], b = 0; b < words.length * 32; b += 8) {
                bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
              }
              return bytes;
            },

            // Convert a byte array to a hex string
            bytesToHex: function bytesToHex(bytes) {
              for (var hex = [], i = 0; i < bytes.length; i++) {
                hex.push((bytes[i] >>> 4).toString(16));
                hex.push((bytes[i] & 0xF).toString(16));
              }
              return hex.join("");
            },

            // Convert a hex string to a byte array
            hexToBytes: function hexToBytes(hex) {
              for (var bytes = [], c = 0; c < hex.length; c += 2) {
                bytes.push(parseInt(hex.substr(c, 2), 16));
              }
              return bytes;
            },

            // Convert a byte array to a base-64 string
            bytesToBase64: function bytesToBase64(bytes) {

              // Use browser-native function if it exists
              if (typeof btoa == "function") return btoa(Binary.bytesToString(bytes));

              for (var base64 = [], i = 0; i < bytes.length; i += 3) {
                var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
                for (var j = 0; j < 4; j++) {
                  if (i * 8 + j * 6 <= bytes.length * 8)
                    base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F)); else
                    base64.push("=");
                }
              }

              return base64.join("");

            },

            // Convert a base-64 string to a byte array
            base64ToBytes: function base64ToBytes(base64) {

              // Use browser-native function if it exists
              if (typeof atob == "function") return Binary.stringToBytes(atob(base64));

              // Remove non-base-64 characters
              base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");

              for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
                if (imod4 == 0) continue;
                bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 |
                  base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
              }

              return bytes;

            }
          };



          // Crypto character encodings
          var charenc = Crypto.charenc = {};

          // UTF-8 encoding
          var UTF8 = charenc.UTF8 = {

            // Convert a string to a byte array
            stringToBytes: function stringToBytes(str) {
              return Binary.stringToBytes(unescape(encodeURIComponent(str)));
            },

            // Convert a byte array to a string
            bytesToString: function bytesToString(bytes) {
              return decodeURIComponent(escape(Binary.bytesToString(bytes)));
            }
          };



          // Binary encoding
          var Binary = charenc.Binary = {

            // Convert a string to a byte array
            stringToBytes: function stringToBytes(str) {
              for (var bytes = [], i = 0; i < str.length; i++) {
                bytes.push(str.charCodeAt(i) & 0xFF);
              }
              return bytes;
            },

            // Convert a byte array to a string
            bytesToString: function bytesToString(bytes) {
              for (var str = [], i = 0; i < bytes.length; i++) {
                str.push(String.fromCharCode(bytes[i]));
              }
              return str.join("");
            }
          };



        })();
      }

      /***/
    }),

  /***/ 140:
  /*!*******************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/navigate-to-min-program.js ***!
    \*******************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.navigateToMinProgramSelf = navigateToMinProgramSelf; /**
                                                                                                                                           * 跳转小程序，app跳小程序
                                                                                                                                           * @param {string} appId 目标小程序id
                                                                                                                                           * @param {string} path 目标小程序地址
                                                                                                                                           * @param {string} selfAppPath 原小程序地址（app过来
                                                                                                                                           */
        function navigateToMinProgramSelf(_ref) {
          var appId = _ref.appId, path = _ref.path, selfAppPath = _ref.selfAppPath;

          uni.navigateToMiniProgram({
            appId: appId,
            path: path,
            envVersion: 'trial' //trial release
          });
























        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 141:
  /*!**************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/qrcode.js ***!
    \**************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

      //---------------------------------------------------------------------
      //
      // QR Code Generator for JavaScript
      //
      // Copyright (c) 2009 Kazuhiko Arase
      //
      // URL: http://www.d-project.com/
      //
      // Licensed under the MIT license:
      //	http://www.opensource.org/licenses/mit-license.php
      //
      // The word 'QR Code' is registered trademark of
      // DENSO WAVE INCORPORATED
      //	http://www.denso-wave.com/qrcode/faqpatent-e.html
      //
      //---------------------------------------------------------------------

      //---------------微信小程序基于base64生成二维码插件修改-------------------
      /*
       * @Modified: Pudon
       * @demoURL: https://github.com/Pudon/weapp-qrcode
       * @Date: 2018-09-11 14:00:05 
       * @Last Modified by: Pudon
       * @Last Modified time: 2018-09-12 16:33:19
       */
      //---------------------------------------------------------------------

      /**
       * qrcode
       * @param typeNumber 1 to 40
       * @param errorCorrectLevel 'L','M','Q','H'
       */
      var qrcode = function qrcode(typeNumber, errorCorrectLevel) {

        var PAD0 = 0xEC;
        var PAD1 = 0x11;

        var _typeNumber = typeNumber;
        var _errorCorrectLevel = QRErrorCorrectLevel[errorCorrectLevel];
        var _modules = null;
        var _moduleCount = 0;
        var _dataCache = null;
        var _dataList = new Array();

        var _this = {};

        var makeImpl = function makeImpl(test, maskPattern) {

          _moduleCount = _typeNumber * 4 + 17;
          _modules = function (moduleCount) {
            var modules = new Array(moduleCount);
            for (var row = 0; row < moduleCount; row += 1) {
              modules[row] = new Array(moduleCount);
              for (var col = 0; col < moduleCount; col += 1) {
                modules[row][col] = null;
              }
            }
            return modules;
          }(_moduleCount);

          setupPositionProbePattern(0, 0);
          setupPositionProbePattern(_moduleCount - 7, 0);
          setupPositionProbePattern(0, _moduleCount - 7);
          setupPositionAdjustPattern();
          setupTimingPattern();
          setupTypeInfo(test, maskPattern);

          if (_typeNumber >= 7) {
            setupTypeNumber(test);
          }

          if (_dataCache == null) {
            _dataCache = createData(_typeNumber, _errorCorrectLevel, _dataList);
          }

          mapData(_dataCache, maskPattern);
        };

        var setupPositionProbePattern = function setupPositionProbePattern(row, col) {

          for (var r = -1; r <= 7; r += 1) {

            if (row + r <= -1 || _moduleCount <= row + r) continue;

            for (var c = -1; c <= 7; c += 1) {

              if (col + c <= -1 || _moduleCount <= col + c) continue;

              if (0 <= r && r <= 6 && (c == 0 || c == 6) ||
                0 <= c && c <= 6 && (r == 0 || r == 6) ||
                2 <= r && r <= 4 && 2 <= c && c <= 4) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        };

        var getBestMaskPattern = function getBestMaskPattern() {

          var minLostPoint = 0;
          var pattern = 0;

          for (var i = 0; i < 8; i += 1) {

            makeImpl(true, i);

            var lostPoint = QRUtil.getLostPoint(_this);

            if (i == 0 || minLostPoint > lostPoint) {
              minLostPoint = lostPoint;
              pattern = i;
            }
          }

          return pattern;
        };

        var setupTimingPattern = function setupTimingPattern() {

          for (var r = 8; r < _moduleCount - 8; r += 1) {
            if (_modules[r][6] != null) {
              continue;
            }
            _modules[r][6] = r % 2 == 0;
          }

          for (var c = 8; c < _moduleCount - 8; c += 1) {
            if (_modules[6][c] != null) {
              continue;
            }
            _modules[6][c] = c % 2 == 0;
          }
        };

        var setupPositionAdjustPattern = function setupPositionAdjustPattern() {

          var pos = QRUtil.getPatternPosition(_typeNumber);

          for (var i = 0; i < pos.length; i += 1) {

            for (var j = 0; j < pos.length; j += 1) {

              var row = pos[i];
              var col = pos[j];

              if (_modules[row][col] != null) {
                continue;
              }

              for (var r = -2; r <= 2; r += 1) {

                for (var c = -2; c <= 2; c += 1) {

                  if (r == -2 || r == 2 || c == -2 || c == 2 ||
                    r == 0 && c == 0) {
                    _modules[row + r][col + c] = true;
                  } else {
                    _modules[row + r][col + c] = false;
                  }
                }
              }
            }
          }
        };

        var setupTypeNumber = function setupTypeNumber(test) {

          var bits = QRUtil.getBCHTypeNumber(_typeNumber);

          for (var i = 0; i < 18; i += 1) {
            var mod = !test && (bits >> i & 1) == 1;
            _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
          }

          for (var i = 0; i < 18; i += 1) {
            var mod = !test && (bits >> i & 1) == 1;
            _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
          }
        };

        var setupTypeInfo = function setupTypeInfo(test, maskPattern) {

          var data = _errorCorrectLevel << 3 | maskPattern;
          var bits = QRUtil.getBCHTypeInfo(data);

          // vertical
          for (var i = 0; i < 15; i += 1) {

            var mod = !test && (bits >> i & 1) == 1;

            if (i < 6) {
              _modules[i][8] = mod;
            } else if (i < 8) {
              _modules[i + 1][8] = mod;
            } else {
              _modules[_moduleCount - 15 + i][8] = mod;
            }
          }

          // horizontal
          for (var i = 0; i < 15; i += 1) {

            var mod = !test && (bits >> i & 1) == 1;

            if (i < 8) {
              _modules[8][_moduleCount - i - 1] = mod;
            } else if (i < 9) {
              _modules[8][15 - i - 1 + 1] = mod;
            } else {
              _modules[8][15 - i - 1] = mod;
            }
          }

          // fixed module
          _modules[_moduleCount - 8][8] = !test;
        };

        var mapData = function mapData(data, maskPattern) {

          var inc = -1;
          var row = _moduleCount - 1;
          var bitIndex = 7;
          var byteIndex = 0;
          var maskFunc = QRUtil.getMaskFunction(maskPattern);

          for (var col = _moduleCount - 1; col > 0; col -= 2) {

            if (col == 6) col -= 1;

            while (true) {

              for (var c = 0; c < 2; c += 1) {

                if (_modules[row][col - c] == null) {

                  var dark = false;

                  if (byteIndex < data.length) {
                    dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                  }

                  var mask = maskFunc(row, col - c);

                  if (mask) {
                    dark = !dark;
                  }

                  _modules[row][col - c] = dark;
                  bitIndex -= 1;

                  if (bitIndex == -1) {
                    byteIndex += 1;
                    bitIndex = 7;
                  }
                }
              }

              row += inc;

              if (row < 0 || _moduleCount <= row) {
                row -= inc;
                inc = -inc;
                break;
              }
            }
          }
        };

        var createBytes = function createBytes(buffer, rsBlocks) {

          var offset = 0;

          var maxDcCount = 0;
          var maxEcCount = 0;

          var dcdata = new Array(rsBlocks.length);
          var ecdata = new Array(rsBlocks.length);

          for (var r = 0; r < rsBlocks.length; r += 1) {

            var dcCount = rsBlocks[r].dataCount;
            var ecCount = rsBlocks[r].totalCount - dcCount;

            maxDcCount = Math.max(maxDcCount, dcCount);
            maxEcCount = Math.max(maxEcCount, ecCount);

            dcdata[r] = new Array(dcCount);

            for (var i = 0; i < dcdata[r].length; i += 1) {
              dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
            }
            offset += dcCount;

            var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
            var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

            var modPoly = rawPoly.mod(rsPoly);
            ecdata[r] = new Array(rsPoly.getLength() - 1);
            for (var i = 0; i < ecdata[r].length; i += 1) {
              var modIndex = i + modPoly.getLength() - ecdata[r].length;
              ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
            }
          }

          var totalCodeCount = 0;
          for (var i = 0; i < rsBlocks.length; i += 1) {
            totalCodeCount += rsBlocks[i].totalCount;
          }

          var data = new Array(totalCodeCount);
          var index = 0;

          for (var i = 0; i < maxDcCount; i += 1) {
            for (var r = 0; r < rsBlocks.length; r += 1) {
              if (i < dcdata[r].length) {
                data[index] = dcdata[r][i];
                index += 1;
              }
            }
          }

          for (var i = 0; i < maxEcCount; i += 1) {
            for (var r = 0; r < rsBlocks.length; r += 1) {
              if (i < ecdata[r].length) {
                data[index] = ecdata[r][i];
                index += 1;
              }
            }
          }

          return data;
        };

        var createData = function createData(typeNumber, errorCorrectLevel, dataList) {

          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

          var buffer = qrBitBuffer();

          for (var i = 0; i < dataList.length; i += 1) {
            var data = dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber));
            data.write(buffer);
          }

          // calc num max data.
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i += 1) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          if (buffer.getLengthInBits() > totalDataCount * 8) {
            throw new Error('code length overflow. (' +
              buffer.getLengthInBits() +
              '>' +
              totalDataCount * 8 +
              ')');
          }

          // end code
          if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
            buffer.put(0, 4);
          }

          // padding
          while (buffer.getLengthInBits() % 8 != 0) {
            buffer.putBit(false);
          }

          // padding
          while (true) {

            if (buffer.getLengthInBits() >= totalDataCount * 8) {
              break;
            }
            buffer.put(PAD0, 8);

            if (buffer.getLengthInBits() >= totalDataCount * 8) {
              break;
            }
            buffer.put(PAD1, 8);
          }

          return createBytes(buffer, rsBlocks);
        };

        _this.addData = function (data) {
          var newData = qr8BitByte(data);
          _dataList.push(newData);
          _dataCache = null;
        };

        _this.isDark = function (row, col) {
          if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
            throw new Error(row + ',' + col);
          }
          return _modules[row][col];
        };

        _this.getModuleCount = function () {
          return _moduleCount;
        };

        _this.make = function () {
          makeImpl(false, getBestMaskPattern());
        };

        _this.createTableTag = function (cellSize, margin) {

          cellSize = cellSize || 2;
          margin = typeof margin == 'undefined' ? cellSize * 4 : margin;

          var qrHtml = '';

          qrHtml += '<table style="';
          qrHtml += ' border-width: 0px; border-style: none;';
          qrHtml += ' border-collapse: collapse;';
          qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
          qrHtml += '">';
          qrHtml += '<tbody>';

          for (var r = 0; r < _this.getModuleCount(); r += 1) {

            qrHtml += '<tr>';

            for (var c = 0; c < _this.getModuleCount(); c += 1) {
              qrHtml += '<td style="';
              qrHtml += ' border-width: 0px; border-style: none;';
              qrHtml += ' border-collapse: collapse;';
              qrHtml += ' padding: 0px; margin: 0px;';
              qrHtml += ' width: ' + cellSize + 'px;';
              qrHtml += ' height: ' + cellSize + 'px;';
              qrHtml += ' background-color: ';
              qrHtml += _this.isDark(r, c) ? '#000000' : '#ffffff';
              qrHtml += ';';
              qrHtml += '"/>';
            }

            qrHtml += '</tr>';
          }

          qrHtml += '</tbody>';
          qrHtml += '</table>';

          return qrHtml;
        };

        _this.createImgTag = function (cellSize, margin, size) {

          cellSize = cellSize || 2;
          margin = typeof margin == 'undefined' ? cellSize * 4 : margin;

          var min = margin;
          var max = _this.getModuleCount() * cellSize + margin;

          return createImgTag(size, size, function (x, y) {
            if (min <= x && x < max && min <= y && y < max) {
              var c = Math.floor((x - min) / cellSize);
              var r = Math.floor((y - min) / cellSize);
              return _this.isDark(r, c) ? 0 : 1;
            } else {
              return 1;
            }
          });
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // qrcode.stringToBytes
      //---------------------------------------------------------------------

      qrcode.stringToBytes = function (s) {
        var bytes = new Array();
        for (var i = 0; i < s.length; i += 1) {
          var c = s.charCodeAt(i);
          bytes.push(c & 0xff);
        }
        return bytes;
      };

      //---------------------------------------------------------------------
      // qrcode.createStringToBytes
      //---------------------------------------------------------------------

      /**
       * @param unicodeData base64 string of byte array.
       * [16bit Unicode],[16bit Bytes], ...
       * @param numChars
       */
      qrcode.createStringToBytes = function (unicodeData, numChars) {

        // create conversion map.

        var unicodeMap = function () {

          var bin = base64DecodeInputStream(unicodeData);
          var read = function read() {
            var b = bin.read();
            if (b == -1) throw new Error();
            return b;
          };

          var count = 0;
          var unicodeMap = {};
          while (true) {
            var b0 = bin.read();
            if (b0 == -1) break;
            var b1 = read();
            var b2 = read();
            var b3 = read();
            var k = String.fromCharCode(b0 << 8 | b1);
            var v = b2 << 8 | b3;
            unicodeMap[k] = v;
            count += 1;
          }
          if (count != numChars) {
            throw new Error(count + ' != ' + numChars);
          }

          return unicodeMap;
        }();

        var unknownChar = '?'.charCodeAt(0);

        return function (s) {
          var bytes = new Array();
          for (var i = 0; i < s.length; i += 1) {
            var c = s.charCodeAt(i);
            if (c < 128) {
              bytes.push(c);
            } else {
              var b = unicodeMap[s.charAt(i)];
              if (typeof b == 'number') {
                if ((b & 0xff) == b) {
                  // 1byte
                  bytes.push(b);
                } else {
                  // 2bytes
                  bytes.push(b >>> 8);
                  bytes.push(b & 0xff);
                }
              } else {
                bytes.push(unknownChar);
              }
            }
          }
          return bytes;
        };
      };

      //---------------------------------------------------------------------
      // QRMode
      //---------------------------------------------------------------------

      var QRMode = {
        MODE_NUMBER: 1 << 0,
        MODE_ALPHA_NUM: 1 << 1,
        MODE_8BIT_BYTE: 1 << 2,
        MODE_KANJI: 1 << 3
      };


      //---------------------------------------------------------------------
      // QRErrorCorrectLevel
      //---------------------------------------------------------------------

      var QRErrorCorrectLevel = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
      };


      //---------------------------------------------------------------------
      // QRMaskPattern
      //---------------------------------------------------------------------

      var QRMaskPattern = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
      };


      //---------------------------------------------------------------------
      // QRUtil
      //---------------------------------------------------------------------

      var QRUtil = function () {

        var PATTERN_POSITION_TABLE = [
          [],
          [6, 18],
          [6, 22],
          [6, 26],
          [6, 30],
          [6, 34],
          [6, 22, 38],
          [6, 24, 42],
          [6, 26, 46],
          [6, 28, 50],
          [6, 30, 54],
          [6, 32, 58],
          [6, 34, 62],
          [6, 26, 46, 66],
          [6, 26, 48, 70],
          [6, 26, 50, 74],
          [6, 30, 54, 78],
          [6, 30, 56, 82],
          [6, 30, 58, 86],
          [6, 34, 62, 90],
          [6, 28, 50, 72, 94],
          [6, 26, 50, 74, 98],
          [6, 30, 54, 78, 102],
          [6, 28, 54, 80, 106],
          [6, 32, 58, 84, 110],
          [6, 30, 58, 86, 114],
          [6, 34, 62, 90, 118],
          [6, 26, 50, 74, 98, 122],
          [6, 30, 54, 78, 102, 126],
          [6, 26, 52, 78, 104, 130],
          [6, 30, 56, 82, 108, 134],
          [6, 34, 60, 86, 112, 138],
          [6, 30, 58, 86, 114, 142],
          [6, 34, 62, 90, 118, 146],
          [6, 30, 54, 78, 102, 126, 150],
          [6, 24, 50, 76, 102, 128, 154],
          [6, 28, 54, 80, 106, 132, 158],
          [6, 32, 58, 84, 110, 136, 162],
          [6, 26, 54, 82, 110, 138, 166],
          [6, 30, 58, 86, 114, 142, 170]];

        var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
        var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
        var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;

        var _this = {};

        var getBCHDigit = function getBCHDigit(data) {
          var digit = 0;
          while (data != 0) {
            digit += 1;
            data >>>= 1;
          }
          return digit;
        };

        _this.getBCHTypeInfo = function (data) {
          var d = data << 10;
          while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
            d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
          }
          return (data << 10 | d) ^ G15_MASK;
        };

        _this.getBCHTypeNumber = function (data) {
          var d = data << 12;
          while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
            d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
          }
          return data << 12 | d;
        };

        _this.getPatternPosition = function (typeNumber) {
          return PATTERN_POSITION_TABLE[typeNumber - 1];
        };

        _this.getMaskFunction = function (maskPattern) {

          switch (maskPattern) {

            case QRMaskPattern.PATTERN000:
              return function (i, j) { return (i + j) % 2 == 0; };
            case QRMaskPattern.PATTERN001:
              return function (i, j) { return i % 2 == 0; };
            case QRMaskPattern.PATTERN010:
              return function (i, j) { return j % 3 == 0; };
            case QRMaskPattern.PATTERN011:
              return function (i, j) { return (i + j) % 3 == 0; };
            case QRMaskPattern.PATTERN100:
              return function (i, j) { return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0; };
            case QRMaskPattern.PATTERN101:
              return function (i, j) { return i * j % 2 + i * j % 3 == 0; };
            case QRMaskPattern.PATTERN110:
              return function (i, j) { return (i * j % 2 + i * j % 3) % 2 == 0; };
            case QRMaskPattern.PATTERN111:
              return function (i, j) { return (i * j % 3 + (i + j) % 2) % 2 == 0; };

            default:
              throw new Error('bad maskPattern:' + maskPattern);
          }

        };

        _this.getErrorCorrectPolynomial = function (errorCorrectLength) {
          var a = qrPolynomial([1], 0);
          for (var i = 0; i < errorCorrectLength; i += 1) {
            a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
          }
          return a;
        };

        _this.getLengthInBits = function (mode, type) {

          if (1 <= type && type < 10) {

            // 1 - 9

            switch (mode) {
              case QRMode.MODE_NUMBER: return 10;
              case QRMode.MODE_ALPHA_NUM: return 9;
              case QRMode.MODE_8BIT_BYTE: return 8;
              case QRMode.MODE_KANJI: return 8;
              default:
                throw new Error('mode:' + mode);
            }


          } else if (type < 27) {

            // 10 - 26

            switch (mode) {
              case QRMode.MODE_NUMBER: return 12;
              case QRMode.MODE_ALPHA_NUM: return 11;
              case QRMode.MODE_8BIT_BYTE: return 16;
              case QRMode.MODE_KANJI: return 10;
              default:
                throw new Error('mode:' + mode);
            }


          } else if (type < 41) {

            // 27 - 40

            switch (mode) {
              case QRMode.MODE_NUMBER: return 14;
              case QRMode.MODE_ALPHA_NUM: return 13;
              case QRMode.MODE_8BIT_BYTE: return 16;
              case QRMode.MODE_KANJI: return 12;
              default:
                throw new Error('mode:' + mode);
            }


          } else {
            throw new Error('type:' + type);
          }
        };

        _this.getLostPoint = function (qrcode) {

          var moduleCount = qrcode.getModuleCount();

          var lostPoint = 0;

          // LEVEL1

          for (var row = 0; row < moduleCount; row += 1) {
            for (var col = 0; col < moduleCount; col += 1) {

              var sameCount = 0;
              var dark = qrcode.isDark(row, col);

              for (var r = -1; r <= 1; r += 1) {

                if (row + r < 0 || moduleCount <= row + r) {
                  continue;
                }

                for (var c = -1; c <= 1; c += 1) {

                  if (col + c < 0 || moduleCount <= col + c) {
                    continue;
                  }

                  if (r == 0 && c == 0) {
                    continue;
                  }

                  if (dark == qrcode.isDark(row + r, col + c)) {
                    sameCount += 1;
                  }
                }
              }

              if (sameCount > 5) {
                lostPoint += 3 + sameCount - 5;
              }
            }
          };

          // LEVEL2

          for (var row = 0; row < moduleCount - 1; row += 1) {
            for (var col = 0; col < moduleCount - 1; col += 1) {
              var count = 0;
              if (qrcode.isDark(row, col)) count += 1;
              if (qrcode.isDark(row + 1, col)) count += 1;
              if (qrcode.isDark(row, col + 1)) count += 1;
              if (qrcode.isDark(row + 1, col + 1)) count += 1;
              if (count == 0 || count == 4) {
                lostPoint += 3;
              }
            }
          }

          // LEVEL3

          for (var row = 0; row < moduleCount; row += 1) {
            for (var col = 0; col < moduleCount - 6; col += 1) {
              if (qrcode.isDark(row, col) &&
                !qrcode.isDark(row, col + 1) &&
                qrcode.isDark(row, col + 2) &&
                qrcode.isDark(row, col + 3) &&
                qrcode.isDark(row, col + 4) &&
                !qrcode.isDark(row, col + 5) &&
                qrcode.isDark(row, col + 6)) {
                lostPoint += 40;
              }
            }
          }

          for (var col = 0; col < moduleCount; col += 1) {
            for (var row = 0; row < moduleCount - 6; row += 1) {
              if (qrcode.isDark(row, col) &&
                !qrcode.isDark(row + 1, col) &&
                qrcode.isDark(row + 2, col) &&
                qrcode.isDark(row + 3, col) &&
                qrcode.isDark(row + 4, col) &&
                !qrcode.isDark(row + 5, col) &&
                qrcode.isDark(row + 6, col)) {
                lostPoint += 40;
              }
            }
          }

          // LEVEL4

          var darkCount = 0;

          for (var col = 0; col < moduleCount; col += 1) {
            for (var row = 0; row < moduleCount; row += 1) {
              if (qrcode.isDark(row, col)) {
                darkCount += 1;
              }
            }
          }

          var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
          lostPoint += ratio * 10;

          return lostPoint;
        };

        return _this;
      }();

      //---------------------------------------------------------------------
      // QRMath
      //---------------------------------------------------------------------

      var QRMath = function () {

        var EXP_TABLE = new Array(256);
        var LOG_TABLE = new Array(256);

        // initialize tables
        for (var i = 0; i < 8; i += 1) {
          EXP_TABLE[i] = 1 << i;
        }
        for (var i = 8; i < 256; i += 1) {
          EXP_TABLE[i] = EXP_TABLE[i - 4] ^
            EXP_TABLE[i - 5] ^
            EXP_TABLE[i - 6] ^
            EXP_TABLE[i - 8];
        }
        for (var i = 0; i < 255; i += 1) {
          LOG_TABLE[EXP_TABLE[i]] = i;
        }

        var _this = {};

        _this.glog = function (n) {

          if (n < 1) {
            throw new Error('glog(' + n + ')');
          }

          return LOG_TABLE[n];
        };

        _this.gexp = function (n) {

          while (n < 0) {
            n += 255;
          }

          while (n >= 256) {
            n -= 255;
          }

          return EXP_TABLE[n];
        };

        return _this;
      }();

      //---------------------------------------------------------------------
      // qrPolynomial
      //---------------------------------------------------------------------

      function qrPolynomial(num, shift) {

        if (typeof num.length == 'undefined') {
          throw new Error(num.length + '/' + shift);
        }

        var _num = function () {
          var offset = 0;
          while (offset < num.length && num[offset] == 0) {
            offset += 1;
          }
          var _num = new Array(num.length - offset + shift);
          for (var i = 0; i < num.length - offset; i += 1) {
            _num[i] = num[i + offset];
          }
          return _num;
        }();

        var _this = {};

        _this.getAt = function (index) {
          return _num[index];
        };

        _this.getLength = function () {
          return _num.length;
        };

        _this.multiply = function (e) {

          var num = new Array(_this.getLength() + e.getLength() - 1);

          for (var i = 0; i < _this.getLength(); i += 1) {
            for (var j = 0; j < e.getLength(); j += 1) {
              num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
            }
          }

          return qrPolynomial(num, 0);
        };

        _this.mod = function (e) {

          if (_this.getLength() - e.getLength() < 0) {
            return _this;
          }

          var ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));

          var num = new Array(_this.getLength());
          for (var i = 0; i < _this.getLength(); i += 1) {
            num[i] = _this.getAt(i);
          }

          for (var i = 0; i < e.getLength(); i += 1) {
            num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
          }

          // recursive call
          return qrPolynomial(num, 0).mod(e);
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // QRRSBlock
      //---------------------------------------------------------------------

      var QRRSBlock = function () {


        // [1: [L, M, Q, H], ..]
        var RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];

        var qrRSBlock = function qrRSBlock(totalCount, dataCount) {
          var _this = {};
          _this.totalCount = totalCount;
          _this.dataCount = dataCount;
          return _this;
        };

        var _this = {};

        var getRsBlockTable = function getRsBlockTable(typeNumber, errorCorrectLevel) {

          switch (errorCorrectLevel) {
            case QRErrorCorrectLevel.L:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
            case QRErrorCorrectLevel.M:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
            case QRErrorCorrectLevel.Q:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
            case QRErrorCorrectLevel.H:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
            default:
              return undefined;
          }

        };

        _this.getRSBlocks = function (typeNumber, errorCorrectLevel) {

          var rsBlock = getRsBlockTable(typeNumber, errorCorrectLevel);

          if (typeof rsBlock == 'undefined') {
            throw new Error('bad rs block @ typeNumber:' + typeNumber +
              '/errorCorrectLevel:' + errorCorrectLevel);
          }

          var length = rsBlock.length / 3;

          var list = new Array();

          for (var i = 0; i < length; i += 1) {

            var count = rsBlock[i * 3 + 0];
            var totalCount = rsBlock[i * 3 + 1];
            var dataCount = rsBlock[i * 3 + 2];

            for (var j = 0; j < count; j += 1) {
              list.push(qrRSBlock(totalCount, dataCount));
            }
          }

          return list;
        };

        return _this;
      }();

      //---------------------------------------------------------------------
      // qrBitBuffer
      //---------------------------------------------------------------------

      var qrBitBuffer = function qrBitBuffer() {

        var _buffer = new Array();
        var _length = 0;

        var _this = {};

        _this.getBuffer = function () {
          return _buffer;
        };

        _this.getAt = function (index) {
          var bufIndex = Math.floor(index / 8);
          return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
        };

        _this.put = function (num, length) {
          for (var i = 0; i < length; i += 1) {
            _this.putBit((num >>> length - i - 1 & 1) == 1);
          }
        };

        _this.getLengthInBits = function () {
          return _length;
        };

        _this.putBit = function (bit) {

          var bufIndex = Math.floor(_length / 8);
          if (_buffer.length <= bufIndex) {
            _buffer.push(0);
          }

          if (bit) {
            _buffer[bufIndex] |= 0x80 >>> _length % 8;
          }

          _length += 1;
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // qr8BitByte
      //---------------------------------------------------------------------

      var qr8BitByte = function qr8BitByte(data) {

        var _mode = QRMode.MODE_8BIT_BYTE;
        var _data = data;
        var _parsedData = [];

        var _this = {};


        // Added to support UTF-8 Characters
        for (var i = 0, l = _data.length; i < l; i++) {
          var byteArray = [];
          var code = _data.charCodeAt(i);

          if (code > 0x10000) {
            byteArray[0] = 0xF0 | (code & 0x1C0000) >>> 18;
            byteArray[1] = 0x80 | (code & 0x3F000) >>> 12;
            byteArray[2] = 0x80 | (code & 0xFC0) >>> 6;
            byteArray[3] = 0x80 | code & 0x3F;
          } else if (code > 0x800) {
            byteArray[0] = 0xE0 | (code & 0xF000) >>> 12;
            byteArray[1] = 0x80 | (code & 0xFC0) >>> 6;
            byteArray[2] = 0x80 | code & 0x3F;
          } else if (code > 0x80) {
            byteArray[0] = 0xC0 | (code & 0x7C0) >>> 6;
            byteArray[1] = 0x80 | code & 0x3F;
          } else {
            byteArray[0] = code;
          }

          // Fix Unicode corruption bug
          _parsedData.push(byteArray);
        }

        _parsedData = Array.prototype.concat.apply([], _parsedData);

        if (_parsedData.length != _data.length) {
          _parsedData.unshift(191);
          _parsedData.unshift(187);
          _parsedData.unshift(239);
        }

        var _bytes = _parsedData;

        _this.getMode = function () {
          return _mode;
        };

        _this.getLength = function (buffer) {
          return _bytes.length;
        };

        _this.write = function (buffer) {
          for (var i = 0; i < _bytes.length; i += 1) {
            buffer.put(_bytes[i], 8);
          }
        };

        return _this;
      };

      //=====================================================================
      // GIF Support etc.
      //

      //---------------------------------------------------------------------
      // byteArrayOutputStream
      //---------------------------------------------------------------------

      var byteArrayOutputStream = function byteArrayOutputStream() {

        var _bytes = new Array();

        var _this = {};

        _this.writeByte = function (b) {
          _bytes.push(b & 0xff);
        };

        _this.writeShort = function (i) {
          _this.writeByte(i);
          _this.writeByte(i >>> 8);
        };

        _this.writeBytes = function (b, off, len) {
          off = off || 0;
          len = len || b.length;
          for (var i = 0; i < len; i += 1) {
            _this.writeByte(b[i + off]);
          }
        };

        _this.writeString = function (s) {
          for (var i = 0; i < s.length; i += 1) {
            _this.writeByte(s.charCodeAt(i));
          }
        };

        _this.toByteArray = function () {
          return _bytes;
        };

        _this.toString = function () {
          var s = '';
          s += '[';
          for (var i = 0; i < _bytes.length; i += 1) {
            if (i > 0) {
              s += ',';
            }
            s += _bytes[i];
          }
          s += ']';
          return s;
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // base64EncodeOutputStream
      //---------------------------------------------------------------------

      var base64EncodeOutputStream = function base64EncodeOutputStream() {

        var _buffer = 0;
        var _buflen = 0;
        var _length = 0;
        var _base64 = '';

        var _this = {};

        var writeEncoded = function writeEncoded(b) {
          _base64 += String.fromCharCode(encode(b & 0x3f));
        };

        var encode = function encode(n) {
          if (n < 0) {
            // error.
          } else if (n < 26) {
            return 0x41 + n;
          } else if (n < 52) {
            return 0x61 + (n - 26);
          } else if (n < 62) {
            return 0x30 + (n - 52);
          } else if (n == 62) {
            return 0x2b;
          } else if (n == 63) {
            return 0x2f;
          }
          throw new Error('n:' + n);
        };

        _this.writeByte = function (n) {

          _buffer = _buffer << 8 | n & 0xff;
          _buflen += 8;
          _length += 1;

          while (_buflen >= 6) {
            writeEncoded(_buffer >>> _buflen - 6);
            _buflen -= 6;
          }
        };

        _this.flush = function () {

          if (_buflen > 0) {
            writeEncoded(_buffer << 6 - _buflen);
            _buffer = 0;
            _buflen = 0;
          }

          if (_length % 3 != 0) {
            // padding
            var padlen = 3 - _length % 3;
            for (var i = 0; i < padlen; i += 1) {
              _base64 += '=';
            }
          }
        };

        _this.toString = function () {
          return _base64;
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // base64DecodeInputStream
      //---------------------------------------------------------------------

      var base64DecodeInputStream = function base64DecodeInputStream(str) {

        var _str = str;
        var _pos = 0;
        var _buffer = 0;
        var _buflen = 0;

        var _this = {};

        _this.read = function () {

          while (_buflen < 8) {

            if (_pos >= _str.length) {
              if (_buflen == 0) {
                return -1;
              }
              throw new Error('unexpected end of file./' + _buflen);
            }

            var c = _str.charAt(_pos);
            _pos += 1;

            if (c == '=') {
              _buflen = 0;
              return -1;
            } else if (c.match(/^\s$/)) {
              // ignore if whitespace.
              continue;
            }

            _buffer = _buffer << 6 | decode(c.charCodeAt(0));
            _buflen += 6;
          }

          var n = _buffer >>> _buflen - 8 & 0xff;
          _buflen -= 8;
          return n;
        };

        var decode = function decode(c) {
          if (0x41 <= c && c <= 0x5a) {
            return c - 0x41;
          } else if (0x61 <= c && c <= 0x7a) {
            return c - 0x61 + 26;
          } else if (0x30 <= c && c <= 0x39) {
            return c - 0x30 + 52;
          } else if (c == 0x2b) {
            return 62;
          } else if (c == 0x2f) {
            return 63;
          } else {
            throw new Error('c:' + c);
          }
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // gifImage (B/W)
      //---------------------------------------------------------------------

      var gifImage = function gifImage(width, height) {

        var _width = width;
        var _height = height;
        var _data = new Array(width * height);

        var _this = {};

        _this.setPixel = function (x, y, pixel) {
          _data[y * _width + x] = pixel;
        };

        _this.write = function (out) {

          //---------------------------------
          // GIF Signature

          out.writeString('GIF87a');

          //---------------------------------
          // Screen Descriptor

          out.writeShort(_width);
          out.writeShort(_height);

          out.writeByte(0x80); // 2bit
          out.writeByte(0);
          out.writeByte(0);

          //---------------------------------
          // Global Color Map

          // black
          out.writeByte(0x00);
          out.writeByte(0x00);
          out.writeByte(0x00);

          // white
          out.writeByte(0xff);
          out.writeByte(0xff);
          out.writeByte(0xff);

          //---------------------------------
          // Image Descriptor

          out.writeString(',');
          out.writeShort(0);
          out.writeShort(0);
          out.writeShort(_width);
          out.writeShort(_height);
          out.writeByte(0);

          //---------------------------------
          // Local Color Map

          //---------------------------------
          // Raster Data

          var lzwMinCodeSize = 2;
          var raster = getLZWRaster(lzwMinCodeSize);

          out.writeByte(lzwMinCodeSize);

          var offset = 0;

          while (raster.length - offset > 255) {
            out.writeByte(255);
            out.writeBytes(raster, offset, 255);
            offset += 255;
          }

          out.writeByte(raster.length - offset);
          out.writeBytes(raster, offset, raster.length - offset);
          out.writeByte(0x00);

          //---------------------------------
          // GIF Terminator
          out.writeString(';');
        };

        var bitOutputStream = function bitOutputStream(out) {

          var _out = out;
          var _bitLength = 0;
          var _bitBuffer = 0;

          var _this = {};

          _this.write = function (data, length) {

            if (data >>> length != 0) {
              throw new Error('length over');
            }

            while (_bitLength + length >= 8) {
              _out.writeByte(0xff & (data << _bitLength | _bitBuffer));
              length -= 8 - _bitLength;
              data >>>= 8 - _bitLength;
              _bitBuffer = 0;
              _bitLength = 0;
            }

            _bitBuffer = data << _bitLength | _bitBuffer;
            _bitLength = _bitLength + length;
          };

          _this.flush = function () {
            if (_bitLength > 0) {
              _out.writeByte(_bitBuffer);
            }
          };

          return _this;
        };

        var getLZWRaster = function getLZWRaster(lzwMinCodeSize) {

          var clearCode = 1 << lzwMinCodeSize;
          var endCode = (1 << lzwMinCodeSize) + 1;
          var bitLength = lzwMinCodeSize + 1;

          // Setup LZWTable
          var table = lzwTable();

          for (var i = 0; i < clearCode; i += 1) {
            table.add(String.fromCharCode(i));
          }
          table.add(String.fromCharCode(clearCode));
          table.add(String.fromCharCode(endCode));

          var byteOut = byteArrayOutputStream();
          var bitOut = bitOutputStream(byteOut);

          // clear code
          bitOut.write(clearCode, bitLength);

          var dataIndex = 0;

          var s = String.fromCharCode(_data[dataIndex]);
          dataIndex += 1;

          while (dataIndex < _data.length) {

            var c = String.fromCharCode(_data[dataIndex]);
            dataIndex += 1;

            if (table.contains(s + c)) {

              s = s + c;

            } else {

              bitOut.write(table.indexOf(s), bitLength);

              if (table.size() < 0xfff) {

                if (table.size() == 1 << bitLength) {
                  bitLength += 1;
                }

                table.add(s + c);
              }

              s = c;
            }
          }

          bitOut.write(table.indexOf(s), bitLength);

          // end code
          bitOut.write(endCode, bitLength);

          bitOut.flush();

          return byteOut.toByteArray();
        };

        var lzwTable = function lzwTable() {

          var _map = {};
          var _size = 0;

          var _this = {};

          _this.add = function (key) {
            if (_this.contains(key)) {
              throw new Error('dup key:' + key);
            }
            _map[key] = _size;
            _size += 1;
          };

          _this.size = function () {
            return _size;
          };

          _this.indexOf = function (key) {
            return _map[key];
          };

          _this.contains = function (key) {
            return typeof _map[key] != 'undefined';
          };

          return _this;
        };

        return _this;
      };

      var createImgTag = function createImgTag(width, height, getPixel, alt) {

        var gif = gifImage(width, height);
        for (var y = 0; y < height; y += 1) {
          for (var x = 0; x < width; x += 1) {
            gif.setPixel(x, y, getPixel(x, y));
          }
        }

        var b = byteArrayOutputStream();
        gif.write(b);

        var base64 = base64EncodeOutputStream();
        var bytes = b.toByteArray();
        for (var i = 0; i < bytes.length; i += 1) {
          base64.writeByte(bytes[i]);
        }
        base64.flush();

        var img = '';
        img += 'data:image/gif;base64,';
        img += base64;

        return img;
      };

      //---------------------------------------------------------------------
      // returns qrcode function.

      var drawImg = function drawImg(text, options) {
        options = options || {};
        var typeNumber = options.typeNumber || 4;
        var errorCorrectLevel = options.errorCorrectLevel || 'M';
        var size = options.size || 500;

        var qr;

        try {
          qr = qrcode(typeNumber, errorCorrectLevel || 'M');
          qr.addData(text);
          qr.make();
        } catch (e) {
          if (typeNumber >= 40) {
            throw new Error('Text too long to encode');
          } else {
            return drawImg(text, {
              size: size,
              errorCorrectLevel: errorCorrectLevel,
              typeNumber: typeNumber + 1
            });

          }
        }

        // calc cellsize and margin
        var cellsize = parseInt(size / qr.getModuleCount());
        var margin = parseInt((size - qr.getModuleCount() * cellsize) / 2);

        return qr.createImgTag(cellsize, margin, size);
      };
      module.exports = {
        drawImg: drawImg
      };

      /***/
    }),

  /***/ 142:
  /*!*******************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/html-parser.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; /*
                                                                                                        * HTML5 Parser By Sam Blowes
                                                                                                        *
                                                                                                        * Designed for HTML5 documents
                                                                                                        *
                                                                                                        * Original code by John Resig (ejohn.org)
                                                                                                        * http://ejohn.org/blog/pure-javascript-html-parser/
                                                                                                        * Original code by Erik Arvidsson, Mozilla Public License
                                                                                                        * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
                                                                                                        *
                                                                                                        * ----------------------------------------------------------------------------
                                                                                                        * License
                                                                                                        * ----------------------------------------------------------------------------
                                                                                                        *
                                                                                                        * This code is triple licensed using Apache Software License 2.0,
                                                                                                        * Mozilla Public License or GNU Public License
                                                                                                        *
                                                                                                        * ////////////////////////////////////////////////////////////////////////////
                                                                                                        *
                                                                                                        * Licensed under the Apache License, Version 2.0 (the "License"); you may not
                                                                                                        * use this file except in compliance with the License.  You may obtain a copy
                                                                                                        * of the License at http://www.apache.org/licenses/LICENSE-2.0
                                                                                                        *
                                                                                                        * ////////////////////////////////////////////////////////////////////////////
                                                                                                        *
                                                                                                        * The contents of this file are subject to the Mozilla Public License
                                                                                                        * Version 1.1 (the "License"); you may not use this file except in
                                                                                                        * compliance with the License. You may obtain a copy of the License at
                                                                                                        * http://www.mozilla.org/MPL/
                                                                                                        *
                                                                                                        * Software distributed under the License is distributed on an "AS IS"
                                                                                                        * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
                                                                                                        * License for the specific language governing rights and limitations
                                                                                                        * under the License.
                                                                                                        *
                                                                                                        * The Original Code is Simple HTML Parser.
                                                                                                        *
                                                                                                        * The Initial Developer of the Original Code is Erik Arvidsson.
                                                                                                        * Portions created by Erik Arvidssson are Copyright (C) 2004. All Rights
                                                                                                        * Reserved.
                                                                                                        *
                                                                                                        * ////////////////////////////////////////////////////////////////////////////
                                                                                                        *
                                                                                                        * This program is free software; you can redistribute it and/or
                                                                                                        * modify it under the terms of the GNU General Public License
                                                                                                        * as published by the Free Software Foundation; either version 2
                                                                                                        * of the License, or (at your option) any later version.
                                                                                                        *
                                                                                                        * This program is distributed in the hope that it will be useful,
                                                                                                        * but WITHOUT ANY WARRANTY; without even the implied warranty of
                                                                                                        * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                                                                                                        * GNU General Public License for more details.
                                                                                                        *
                                                                                                        * You should have received a copy of the GNU General Public License
                                                                                                        * along with this program; if not, write to the Free Software
                                                                                                        * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
                                                                                                        *
                                                                                                        * ----------------------------------------------------------------------------
                                                                                                        * Usage
                                                                                                        * ----------------------------------------------------------------------------
                                                                                                        *
                                                                                                        * // Use like so:
                                                                                                        * HTMLParser(htmlString, {
                                                                                                        *     start: function(tag, attrs, unary) {},
                                                                                                        *     end: function(tag) {},
                                                                                                        *     chars: function(text) {},
                                                                                                        *     comment: function(text) {}
                                                                                                        * });
                                                                                                        *
                                                                                                        * // or to get an XML string:
                                                                                                        * HTMLtoXML(htmlString);
                                                                                                        *
                                                                                                        * // or to get an XML DOM Document
                                                                                                        * HTMLtoDOM(htmlString);
                                                                                                        *
                                                                                                        * // or to inject into an existing document/DOM node
                                                                                                        * HTMLtoDOM(htmlString, document);
                                                                                                        * HTMLtoDOM(htmlString, document.body);
                                                                                                        *
                                                                                                        */
      // Regular Expressions for parsing tags and attributes
      var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
      var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
      var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g; // Empty Elements - HTML 5

      var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr'); // Block Elements - HTML 5
      // fixed by xxx 将 ins 标签从块级名单中移除

      var block = makeMap('a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'); // Inline Elements - HTML 5

      var inline = makeMap('abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'); // Elements that you can, intentionally, leave open
      // (and which close themselves)

      var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr'); // Attributes that have their values filled in disabled="disabled"

      var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected'); // Special Elements (can contain anything)

      var special = makeMap('script,style');
      function HTMLParser(html, handler) {
        var index;
        var chars;
        var match;
        var stack = [];
        var last = html;

        stack.last = function () {
          return this[this.length - 1];
        };

        while (html) {
          chars = true; // Make sure we're not in a script or style element

          if (!stack.last() || !special[stack.last()]) {
            // Comment
            if (html.indexOf('<!--') == 0) {
              index = html.indexOf('-->');

              if (index >= 0) {
                if (handler.comment) {
                  handler.comment(html.substring(4, index));
                }

                html = html.substring(index + 3);
                chars = false;
              } // end tag

            } else if (html.indexOf('</') == 0) {
              match = html.match(endTag);

              if (match) {
                html = html.substring(match[0].length);
                match[0].replace(endTag, parseEndTag);
                chars = false;
              } // start tag

            } else if (html.indexOf('<') == 0) {
              match = html.match(startTag);

              if (match) {
                html = html.substring(match[0].length);
                match[0].replace(startTag, parseStartTag);
                chars = false;
              }
            }

            if (chars) {
              index = html.indexOf('<');
              var text = index < 0 ? html : html.substring(0, index);
              html = index < 0 ? '' : html.substring(index);

              if (handler.chars) {
                handler.chars(text);
              }
            }
          } else {
            html = html.replace(new RegExp('([\\s\\S]*?)<\/' + stack.last() + '[^>]*>'), function (all, text) {
              text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, '$1$2');

              if (handler.chars) {
                handler.chars(text);
              }

              return '';
            });
            parseEndTag('', stack.last());
          }

          if (html == last) {
            throw 'Parse Error: ' + html;
          }

          last = html;
        } // Clean up any remaining tags


        parseEndTag();

        function parseStartTag(tag, tagName, rest, unary) {
          tagName = tagName.toLowerCase();

          if (block[tagName]) {
            while (stack.last() && inline[stack.last()]) {
              parseEndTag('', stack.last());
            }
          }

          if (closeSelf[tagName] && stack.last() == tagName) {
            parseEndTag('', tagName);
          }

          unary = empty[tagName] || !!unary;

          if (!unary) {
            stack.push(tagName);
          }

          if (handler.start) {
            var attrs = [];
            rest.replace(attr, function (match, name) {
              var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : '';
              attrs.push({
                name: name,
                value: value,
                escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') // "
              });

            });

            if (handler.start) {
              handler.start(tagName, attrs, unary);
            }
          }
        }

        function parseEndTag(tag, tagName) {
          // If no tag name is provided, clean shop
          if (!tagName) {
            var pos = 0;
          } // Find the closest opened tag of the same type
          else {
            for (var pos = stack.length - 1; pos >= 0; pos--) {
              if (stack[pos] == tagName) {
                break;
              }
            }
          }

          if (pos >= 0) {
            // Close all the open elements, up the stack
            for (var i = stack.length - 1; i >= pos; i--) {
              if (handler.end) {
                handler.end(stack[i]);
              }
            } // Remove the open elements from the stack


            stack.length = pos;
          }
        }
      }

      function makeMap(str) {
        var obj = {};
        var items = str.split(',');

        for (var i = 0; i < items.length; i++) {
          obj[items[i]] = true;
        }

        return obj;
      }

      function removeDOCTYPE(html) {
        return html.replace(/<\?xml.*\?>\n/, '').replace(/<!doctype.*>\n/, '').replace(/<!DOCTYPE.*>\n/, '');
      }

      function parseAttrs(attrs) {
        return attrs.reduce(function (pre, attr) {
          var value = attr.value;
          var name = attr.name;

          if (pre[name]) {
            pre[name] = pre[name] + " " + value;
          } else {
            pre[name] = value;
          }

          return pre;
        }, {});
      }

      function parseHtml(html) {
        html = removeDOCTYPE(html);
        var stacks = [];
        var results = {
          node: 'root',
          children: []
        };

        HTMLParser(html, {
          start: function start(tag, attrs, unary) {
            var node = {
              name: tag
            };


            if (attrs.length !== 0) {
              node.attrs = parseAttrs(attrs);
            }

            if (unary) {
              var parent = stacks[0] || results;

              if (!parent.children) {
                parent.children = [];
              }

              parent.children.push(node);
            } else {
              stacks.unshift(node);
            }
          },
          end: function end(tag) {
            var node = stacks.shift();
            if (node.name !== tag) console.error('invalid state: mismatch end tag');

            if (stacks.length === 0) {
              results.children.push(node);
            } else {
              var parent = stacks[0];

              if (!parent.children) {
                parent.children = [];
              }

              parent.children.push(node);
            }
          },
          chars: function chars(text) {
            var node = {
              type: 'text',
              text: text
            };


            if (stacks.length === 0) {
              results.children.push(node);
            } else {
              var parent = stacks[0];

              if (!parent.children) {
                parent.children = [];
              }

              parent.children.push(node);
            }
          },
          comment: function comment(text) {
            var node = {
              node: 'comment',
              text: text
            };

            var parent = stacks[0];

            if (!parent.children) {
              parent.children = [];
            }

            parent.children.push(node);
          }
        });

        return results.children;
      } var _default =

        parseHtml; exports.default = _default;

      /***/
    }),

  /***/ 143:
  /*!**********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/which-platform.js ***!
    \**********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _default = {
          computed: {
            // 拼多多
            isPDD: function isPDD() {
              return this.unionCode == 30101;
            },
            // 京东
            isJD: function isJD() {
              return this.unionCode == 30102;
            },
            // 淘宝
            isTB: function isTB() {
              return this.unionCode == 30103;
            },
            // 咪店
            isMD: function isMD() {
              return this.unionCode == 30104;
            },
            // 好福利
            isHFL: function isHFL() {
              return this.unionCode == 30105;
            },
            // 吃喝玩乐
            isCHWL: function isCHWL() {
              return this.unionCode == 30106;
            },
            // 社区团
            isSQT: function isSQT() {
              return this.unionCode == 30107;
            },
            // 国内游
            isGNY: function isGNY() {
              return this.unionCode == 30109;
            },
            // 周边游
            isZBY: function isZBY() {
              return this.unionCode == 30110;
            },
            // 出境游
            isCJY: function isCJY() {
              return this.unionCode == 30111;
            },
            // 度假
            isDJ: function isDJ() {
              return this.unionCode == 30115;
            }
          },

          methods: {
            /**
                      * 获取供应商icon
                      */
            supplierIcon: function supplierIcon() {
              if (this.isPDD) {
                return 'https://pic5.40017.cn/04/002/9f/a1/rBTJUl0R7hCABH2cAAAORKSH8Ko926.png';
              } else if (this.isJD) {
                return 'https://pic5.40017.cn/04/001/9d/02/rBTJUl0R5-qAF8MHAAAI-s3frwQ074.png';
              } else if (this.isTB) {
                return 'https://pic5.40017.cn/i/ori/LF40q6CJTa.png';
              } else if (this.isGNY || this.isZBY || this.isCJY || this.isDJ) {
                return 'https://pic5.40017.cn/04/002/53/fd/rBTJUl2vxPaAKBunAAAOoK_umIk170.png';
              }
            },
            /**
                * 跳转商品详情页
                * @param {Number} id 商品id
                */
            skipDetail: function skipDetail(id) {
              if (this.isPDD || this.isJD || this.isGNY || this.isZBY || this.isCJY || this.isDJ || this.isTB) {
                uni.navigateTo({
                  url: "/pages/buying-pdd/index?id=".concat(id, "&unionCode=").concat(this.unionCode)
                });

              } else if (this.isHFL || this.isCHWL || this.isSQT) {
                uni.navigateTo({
                  url: "/pages/welfare-detail/welfare-detail?mission=".concat(id)
                });

              } else if (this.isMD) {
                uni.navigateTo({
                  url: "/pages/buying-normal/index?id=".concat(id)
                });

              }
            }
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 15:
  /*!******************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/cryptojs/lib sync ^\.\/.*$ ***!
    \******************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      var map = {
        "./AES": 16,
        "./AES.js": 16,
        "./BlockModes": 17,
        "./BlockModes.js": 17,
        "./Crypto": 14,
        "./Crypto.js": 14,
        "./MD5": 18,
        "./MD5.js": 18
      };


      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }
      function webpackContextResolve(req) {
        var id = map[req];
        if (!(id + 1)) { // check for number or string
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        }
        return id;
      }
      webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map);
      };
      webpackContext.resolve = webpackContextResolve;
      module.exports = webpackContext;
      webpackContext.id = 15;

      /***/
    }),

  /***/ 16:
  /*!***********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/cryptojs/lib/AES.js ***!
    \***********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      (function () {

        var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 14).Crypto : window.Crypto;

        // Shortcuts
        var util = C.util,
          charenc = C.charenc,
          UTF8 = charenc.UTF8;

        // Precomputed SBOX
        var SBOX = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5,
          0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
          0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0,
          0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
          0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc,
          0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
          0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a,
          0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
          0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0,
          0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
          0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b,
          0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
          0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85,
          0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
          0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5,
          0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
          0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17,
          0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
          0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88,
          0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
          0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c,
          0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
          0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9,
          0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
          0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6,
          0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
          0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e,
          0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
          0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94,
          0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
          0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68,
          0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];

        // Compute inverse SBOX lookup table
        for (var INVSBOX = [], i = 0; i < 256; i++) { INVSBOX[SBOX[i]] = i; }

        // Compute mulitplication in GF(2^8) lookup tables
        var MULT2 = [],
          MULT3 = [],
          MULT9 = [],
          MULTB = [],
          MULTD = [],
          MULTE = [];

        function xtime(a, b) {
          for (var result = 0, i = 0; i < 8; i++) {
            if (b & 1) result ^= a;
            var hiBitSet = a & 0x80;
            a = a << 1 & 0xFF;
            if (hiBitSet) a ^= 0x1b;
            b >>>= 1;
          }
          return result;
        }

        for (var i = 0; i < 256; i++) {
          MULT2[i] = xtime(i, 2);
          MULT3[i] = xtime(i, 3);
          MULT9[i] = xtime(i, 9);
          MULTB[i] = xtime(i, 0xB);
          MULTD[i] = xtime(i, 0xD);
          MULTE[i] = xtime(i, 0xE);
        }

        // Precomputed RCon lookup
        var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

        // Inner state
        var state = [[], [], [], []],
          keylength,
          nrounds,
          keyschedule;

        var AES = C.AES = {

          /**
                             * Public API
                             */

          encrypt: function encrypt(message, password, options) {

            options = options || {};

            // Determine mode
            var mode = options.mode || new C.mode.OFB();

            // Allow mode to override options
            if (mode.fixOptions) mode.fixOptions(options);

            var

              // Convert to bytes if message is a string
              m =
                message.constructor == String ?
                  UTF8.stringToBytes(message) :
                  message,


              // Generate random IV
              iv = options.iv || util.randomBytes(AES._blocksize * 4),

              // Generate key
              k =
                password.constructor == String ?
                  // Derive key from passphrase
                  C.PBKDF2(password, iv, 32, { asBytes: true }) :
                  // else, assume byte array representing cryptographic key
                  password;


            // Encrypt
            AES._init(k);
            mode.encrypt(AES, m, iv);

            // Return ciphertext
            m = options.iv ? m : iv.concat(m);
            return options && options.asBytes ? m : util.bytesToBase64(m);

          },

          decrypt: function decrypt(ciphertext, password, options) {

            options = options || {};

            // Determine mode
            var mode = options.mode || new C.mode.OFB();

            // Allow mode to override options
            if (mode.fixOptions) mode.fixOptions(options);

            var

              // Convert to bytes if ciphertext is a string
              c =
                ciphertext.constructor == String ?
                  util.base64ToBytes(ciphertext) :
                  ciphertext,


              // Separate IV and message
              iv = options.iv || c.splice(0, AES._blocksize * 4),

              // Generate key
              k =
                password.constructor == String ?
                  // Derive key from passphrase
                  C.PBKDF2(password, iv, 32, { asBytes: true }) :
                  // else, assume byte array representing cryptographic key
                  password;


            // Decrypt
            AES._init(k);
            mode.decrypt(AES, c, iv);

            // Return plaintext
            return options && options.asBytes ? c : UTF8.bytesToString(c);

          },


          /**
              * Package private methods and properties
              */

          _blocksize: 4,

          _encryptblock: function _encryptblock(m, offset) {

            // Set input
            for (var row = 0; row < AES._blocksize; row++) {
              for (var col = 0; col < 4; col++) {
                state[row][col] = m[offset + col * 4 + row];
              }
            }

            // Add round key
            for (var row = 0; row < 4; row++) {
              for (var col = 0; col < 4; col++) {
                state[row][col] ^= keyschedule[col][row];
              }
            }

            for (var round = 1; round < nrounds; round++) {

              // Sub bytes
              for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 4; col++) {
                  state[row][col] = SBOX[state[row][col]];
                }
              }

              // Shift rows
              state[1].push(state[1].shift());
              state[2].push(state[2].shift());
              state[2].push(state[2].shift());
              state[3].unshift(state[3].pop());

              // Mix columns
              for (var col = 0; col < 4; col++) {

                var s0 = state[0][col],
                  s1 = state[1][col],
                  s2 = state[2][col],
                  s3 = state[3][col];

                state[0][col] = MULT2[s0] ^ MULT3[s1] ^ s2 ^ s3;
                state[1][col] = s0 ^ MULT2[s1] ^ MULT3[s2] ^ s3;
                state[2][col] = s0 ^ s1 ^ MULT2[s2] ^ MULT3[s3];
                state[3][col] = MULT3[s0] ^ s1 ^ s2 ^ MULT2[s3];

              }

              // Add round key
              for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 4; col++) {
                  state[row][col] ^= keyschedule[round * 4 + col][row];
                }
              }

            }

            // Sub bytes
            for (var row = 0; row < 4; row++) {
              for (var col = 0; col < 4; col++) {
                state[row][col] = SBOX[state[row][col]];
              }
            }

            // Shift rows
            state[1].push(state[1].shift());
            state[2].push(state[2].shift());
            state[2].push(state[2].shift());
            state[3].unshift(state[3].pop());

            // Add round key
            for (var row = 0; row < 4; row++) {
              for (var col = 0; col < 4; col++) {
                state[row][col] ^= keyschedule[nrounds * 4 + col][row];
              }
            }

            // Set output
            for (var row = 0; row < AES._blocksize; row++) {
              for (var col = 0; col < 4; col++) {
                m[offset + col * 4 + row] = state[row][col];
              }
            }

          },

          _decryptblock: function _decryptblock(c, offset) {

            // Set input
            for (var row = 0; row < AES._blocksize; row++) {
              for (var col = 0; col < 4; col++) {
                state[row][col] = c[offset + col * 4 + row];
              }
            }

            // Add round key
            for (var row = 0; row < 4; row++) {
              for (var col = 0; col < 4; col++) {
                state[row][col] ^= keyschedule[nrounds * 4 + col][row];
              }
            }

            for (var round = 1; round < nrounds; round++) {

              // Inv shift rows
              state[1].unshift(state[1].pop());
              state[2].push(state[2].shift());
              state[2].push(state[2].shift());
              state[3].push(state[3].shift());

              // Inv sub bytes
              for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 4; col++) {
                  state[row][col] = INVSBOX[state[row][col]];
                }
              }

              // Add round key
              for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 4; col++) {
                  state[row][col] ^= keyschedule[(nrounds - round) * 4 + col][row];
                }
              }

              // Inv mix columns
              for (var col = 0; col < 4; col++) {

                var s0 = state[0][col],
                  s1 = state[1][col],
                  s2 = state[2][col],
                  s3 = state[3][col];

                state[0][col] = MULTE[s0] ^ MULTB[s1] ^ MULTD[s2] ^ MULT9[s3];
                state[1][col] = MULT9[s0] ^ MULTE[s1] ^ MULTB[s2] ^ MULTD[s3];
                state[2][col] = MULTD[s0] ^ MULT9[s1] ^ MULTE[s2] ^ MULTB[s3];
                state[3][col] = MULTB[s0] ^ MULTD[s1] ^ MULT9[s2] ^ MULTE[s3];

              }

            }

            // Inv shift rows
            state[1].unshift(state[1].pop());
            state[2].push(state[2].shift());
            state[2].push(state[2].shift());
            state[3].push(state[3].shift());

            // Inv sub bytes
            for (var row = 0; row < 4; row++) {
              for (var col = 0; col < 4; col++) {
                state[row][col] = INVSBOX[state[row][col]];
              }
            }

            // Add round key
            for (var row = 0; row < 4; row++) {
              for (var col = 0; col < 4; col++) {
                state[row][col] ^= keyschedule[col][row];
              }
            }

            // Set output
            for (var row = 0; row < AES._blocksize; row++) {
              for (var col = 0; col < 4; col++) {
                c[offset + col * 4 + row] = state[row][col];
              }
            }

          },


          /**
              * Private methods
              */

          _init: function _init(k) {
            keylength = k.length / 4;
            nrounds = keylength + 6;
            AES._keyexpansion(k);
          },

          // Generate a key schedule
          _keyexpansion: function _keyexpansion(k) {

            keyschedule = [];

            for (var row = 0; row < keylength; row++) {
              keyschedule[row] = [
                k[row * 4],
                k[row * 4 + 1],
                k[row * 4 + 2],
                k[row * 4 + 3]];

            }

            for (var row = keylength; row < AES._blocksize * (nrounds + 1); row++) {

              var temp = [
                keyschedule[row - 1][0],
                keyschedule[row - 1][1],
                keyschedule[row - 1][2],
                keyschedule[row - 1][3]];


              if (row % keylength == 0) {

                // Rot word
                temp.push(temp.shift());

                // Sub word
                temp[0] = SBOX[temp[0]];
                temp[1] = SBOX[temp[1]];
                temp[2] = SBOX[temp[2]];
                temp[3] = SBOX[temp[3]];

                temp[0] ^= RCON[row / keylength];

              } else if (keylength > 6 && row % keylength == 4) {

                // Sub word
                temp[0] = SBOX[temp[0]];
                temp[1] = SBOX[temp[1]];
                temp[2] = SBOX[temp[2]];
                temp[3] = SBOX[temp[3]];

              }

              keyschedule[row] = [
                keyschedule[row - keylength][0] ^ temp[0],
                keyschedule[row - keylength][1] ^ temp[1],
                keyschedule[row - keylength][2] ^ temp[2],
                keyschedule[row - keylength][3] ^ temp[3]];


            }

          }
        };



      })();

      /***/
    }),

  /***/ 17:
  /*!******************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/cryptojs/lib/BlockModes.js ***!
    \******************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      /*!
       * Crypto-JS contribution from Simon Greatrix
       */

      (function () {

        var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 14).Crypto : window.Crypto;

        // Create pad namespace
        var C_pad = C.pad = {};

        // Calculate the number of padding bytes required.
        function _requiredPadding(cipher, message) {
          var blockSizeInBytes = cipher._blocksize * 4;
          var reqd = blockSizeInBytes - message.length % blockSizeInBytes;
          return reqd;
        };

        // Remove padding when the final byte gives the number of padding bytes.
        var _unpadLength = function _unpadLength(message) {
          var pad = message.pop();
          for (var i = 1; i < pad; i++) {
            message.pop();
          }
        };

        // No-operation padding, used for stream ciphers
        C_pad.NoPadding = {
          pad: function pad(cipher, message) { },
          unpad: function unpad(message) { }
        };


        // Zero Padding.
        //
        // If the message is not an exact number of blocks, the final block is
        // completed with 0x00 bytes. There is no unpadding.
        C_pad.ZeroPadding = {
          pad: function pad(cipher, message) {
            var blockSizeInBytes = cipher._blocksize * 4;
            var reqd = message.length % blockSizeInBytes;
            if (reqd != 0) {
              for (reqd = blockSizeInBytes - reqd; reqd > 0; reqd--) {
                message.push(0x00);
              }
            }
          },

          unpad: function unpad(message) { }
        };


        // ISO/IEC 7816-4 padding.
        //
        // Pads the plain text with an 0x80 byte followed by as many 0x00
        // bytes are required to complete the block.
        C_pad.iso7816 = {
          pad: function pad(cipher, message) {
            var reqd = _requiredPadding(cipher, message);
            message.push(0x80);
            for (; reqd > 1; reqd--) {
              message.push(0x00);
            }
          },

          unpad: function unpad(message) {
            while (message.pop() != 0x80) { }
          }
        };


        // ANSI X.923 padding
        //
        // The final block is padded with zeros except for the last byte of the
        // last block which contains the number of padding bytes.
        C_pad.ansix923 = {
          pad: function pad(cipher, message) {
            var reqd = _requiredPadding(cipher, message);
            for (var i = 1; i < reqd; i++) {
              message.push(0x00);
            }
            message.push(reqd);
          },

          unpad: _unpadLength
        };


        // ISO 10126
        //
        // The final block is padded with random bytes except for the last
        // byte of the last block which contains the number of padding bytes.
        C_pad.iso10126 = {
          pad: function pad(cipher, message) {
            var reqd = _requiredPadding(cipher, message);
            for (var i = 1; i < reqd; i++) {
              message.push(Math.floor(Math.random() * 256));
            }
            message.push(reqd);
          },

          unpad: _unpadLength
        };


        // PKCS7 padding
        //
        // PKCS7 is described in RFC 5652. Padding is in whole bytes. The
        // value of each added byte is the number of bytes that are added,
        // i.e. N bytes, each of value N are added.
        C_pad.pkcs7 = {
          pad: function pad(cipher, message) {
            var reqd = _requiredPadding(cipher, message);
            for (var i = 0; i < reqd; i++) {
              message.push(reqd);
            }
          },

          unpad: _unpadLength
        };


        // Create mode namespace
        var C_mode = C.mode = {};

        /**
                                   * Mode base "class".
                                   */
        var Mode = C_mode.Mode = function (padding) {
          if (padding) {
            this._padding = padding;
          }
        };

        Mode.prototype = {
          encrypt: function encrypt(cipher, m, iv) {
            this._padding.pad(cipher, m);
            this._doEncrypt(cipher, m, iv);
          },

          decrypt: function decrypt(cipher, m, iv) {
            this._doDecrypt(cipher, m, iv);
            this._padding.unpad(m);
          },

          // Default padding
          _padding: C_pad.iso7816
        };



        /**
                                      * Electronic Code Book mode.
                                      * 
                                      * ECB applies the cipher directly against each block of the input.
                                      * 
                                      * ECB does not require an initialization vector.
                                      */
        var ECB = C_mode.ECB = function () {
          // Call parent constructor
          Mode.apply(this, arguments);
        };

        // Inherit from Mode
        var ECB_prototype = ECB.prototype = new Mode();

        // Concrete steps for Mode template
        ECB_prototype._doEncrypt = function (cipher, m, iv) {
          var blockSizeInBytes = cipher._blocksize * 4;
          // Encrypt each block
          for (var offset = 0; offset < m.length; offset += blockSizeInBytes) {
            cipher._encryptblock(m, offset);
          }
        };
        ECB_prototype._doDecrypt = function (cipher, c, iv) {
          var blockSizeInBytes = cipher._blocksize * 4;
          // Decrypt each block
          for (var offset = 0; offset < c.length; offset += blockSizeInBytes) {
            cipher._decryptblock(c, offset);
          }
        };

        // ECB never uses an IV
        ECB_prototype.fixOptions = function (options) {
          options.iv = [];
        };


        /**
            * Cipher block chaining
            * 
            * The first block is XORed with the IV. Subsequent blocks are XOR with the
            * previous cipher output.
            */
        var CBC = C_mode.CBC = function () {
          // Call parent constructor
          Mode.apply(this, arguments);
        };

        // Inherit from Mode
        var CBC_prototype = CBC.prototype = new Mode();

        // Concrete steps for Mode template
        CBC_prototype._doEncrypt = function (cipher, m, iv) {
          var blockSizeInBytes = cipher._blocksize * 4;

          // Encrypt each block
          for (var offset = 0; offset < m.length; offset += blockSizeInBytes) {
            if (offset == 0) {
              // XOR first block using IV
              for (var i = 0; i < blockSizeInBytes; i++) {
                m[i] ^= iv[i];
              }
            } else {
              // XOR this block using previous crypted block
              for (var i = 0; i < blockSizeInBytes; i++) {
                m[offset + i] ^= m[offset + i - blockSizeInBytes];
              }
            }
            // Encrypt block
            cipher._encryptblock(m, offset);
          }
        };
        CBC_prototype._doDecrypt = function (cipher, c, iv) {
          var blockSizeInBytes = cipher._blocksize * 4;

          // At the start, the previously crypted block is the IV
          var prevCryptedBlock = iv;

          // Decrypt each block
          for (var offset = 0; offset < c.length; offset += blockSizeInBytes) {
            // Save this crypted block
            var thisCryptedBlock = c.slice(offset, offset + blockSizeInBytes);
            // Decrypt block
            cipher._decryptblock(c, offset);
            // XOR decrypted block using previous crypted block
            for (var i = 0; i < blockSizeInBytes; i++) {
              c[offset + i] ^= prevCryptedBlock[i];
            }
            prevCryptedBlock = thisCryptedBlock;
          }
        };


        /**
            * Cipher feed back
            * 
            * The cipher output is XORed with the plain text to produce the cipher output,
            * which is then fed back into the cipher to produce a bit pattern to XOR the
            * next block with.
            * 
            * This is a stream cipher mode and does not require padding.
            */
        var CFB = C_mode.CFB = function () {
          // Call parent constructor
          Mode.apply(this, arguments);
        };

        // Inherit from Mode
        var CFB_prototype = CFB.prototype = new Mode();

        // Override padding
        CFB_prototype._padding = C_pad.NoPadding;

        // Concrete steps for Mode template
        CFB_prototype._doEncrypt = function (cipher, m, iv) {
          var blockSizeInBytes = cipher._blocksize * 4,
            keystream = iv.slice(0);

          // Encrypt each byte
          for (var i = 0; i < m.length; i++) {

            var j = i % blockSizeInBytes;
            if (j == 0) cipher._encryptblock(keystream, 0);

            m[i] ^= keystream[j];
            keystream[j] = m[i];
          }
        };
        CFB_prototype._doDecrypt = function (cipher, c, iv) {
          var blockSizeInBytes = cipher._blocksize * 4,
            keystream = iv.slice(0);

          // Encrypt each byte
          for (var i = 0; i < c.length; i++) {

            var j = i % blockSizeInBytes;
            if (j == 0) cipher._encryptblock(keystream, 0);

            var b = c[i];
            c[i] ^= keystream[j];
            keystream[j] = b;
          }
        };


        /**
            * Output feed back
            * 
            * The cipher repeatedly encrypts its own output. The output is XORed with the
            * plain text to produce the cipher text.
            * 
            * This is a stream cipher mode and does not require padding.
            */
        var OFB = C_mode.OFB = function () {
          // Call parent constructor
          Mode.apply(this, arguments);
        };

        // Inherit from Mode
        var OFB_prototype = OFB.prototype = new Mode();

        // Override padding
        OFB_prototype._padding = C_pad.NoPadding;

        // Concrete steps for Mode template
        OFB_prototype._doEncrypt = function (cipher, m, iv) {

          var blockSizeInBytes = cipher._blocksize * 4,
            keystream = iv.slice(0);

          // Encrypt each byte
          for (var i = 0; i < m.length; i++) {

            // Generate keystream
            if (i % blockSizeInBytes == 0)
              cipher._encryptblock(keystream, 0);

            // Encrypt byte
            m[i] ^= keystream[i % blockSizeInBytes];

          }
        };
        OFB_prototype._doDecrypt = OFB_prototype._doEncrypt;

        /**
                                                              * Counter
                                                              * @author Gergely Risko
                                                              *
                                                              * After every block the last 4 bytes of the IV is increased by one
                                                              * with carry and that IV is used for the next block.
                                                              *
                                                              * This is a stream cipher mode and does not require padding.
                                                              */
        var CTR = C_mode.CTR = function () {
          // Call parent constructor
          Mode.apply(this, arguments);
        };

        // Inherit from Mode
        var CTR_prototype = CTR.prototype = new Mode();

        // Override padding
        CTR_prototype._padding = C_pad.NoPadding;

        CTR_prototype._doEncrypt = function (cipher, m, iv) {
          var blockSizeInBytes = cipher._blocksize * 4;
          var counter = iv.slice(0);

          for (var i = 0; i < m.length;) {
            // do not lose iv
            var keystream = counter.slice(0);

            // Generate keystream for next block
            cipher._encryptblock(keystream, 0);

            // XOR keystream with block
            for (var j = 0; i < m.length && j < blockSizeInBytes; j++, i++) {
              m[i] ^= keystream[j];
            }

            // Increase counter
            if (++counter[blockSizeInBytes - 1] == 256) {
              counter[blockSizeInBytes - 1] = 0;
              if (++counter[blockSizeInBytes - 2] == 256) {
                counter[blockSizeInBytes - 2] = 0;
                if (++counter[blockSizeInBytes - 3] == 256) {
                  counter[blockSizeInBytes - 3] = 0;
                  ++counter[blockSizeInBytes - 4];
                }
              }
            }
          }
        };
        CTR_prototype._doDecrypt = CTR_prototype._doEncrypt;

      })();

      /***/
    }),

  /***/ 18:
  /*!***********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/cryptojs/lib/MD5.js ***!
    \***********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      (function () {

        var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 14).Crypto : window.Crypto;

        // Shortcuts
        var util = C.util,
          charenc = C.charenc,
          UTF8 = charenc.UTF8,
          Binary = charenc.Binary;

        // Public API
        var MD5 = C.MD5 = function (message, options) {
          var digestbytes = util.wordsToBytes(MD5._md5(message));
          return options && options.asBytes ? digestbytes :
            options && options.asString ? Binary.bytesToString(digestbytes) :
              util.bytesToHex(digestbytes);
        };

        // The core
        MD5._md5 = function (message) {

          // Convert to byte array
          if (message.constructor == String) message = UTF8.stringToBytes(message);
          /* else, assume byte array already */

          var m = util.bytesToWords(message),
            l = message.length * 8,
            a = 1732584193,
            b = -271733879,
            c = -1732584194,
            d = 271733878;

          // Swap endian
          for (var i = 0; i < m.length; i++) {
            m[i] = (m[i] << 8 | m[i] >>> 24) & 0x00FF00FF |
              (m[i] << 24 | m[i] >>> 8) & 0xFF00FF00;
          }

          // Padding
          m[l >>> 5] |= 0x80 << l % 32;
          m[(l + 64 >>> 9 << 4) + 14] = l;

          // Method shortcuts
          var FF = MD5._ff,
            GG = MD5._gg,
            HH = MD5._hh,
            II = MD5._ii;

          for (var i = 0; i < m.length; i += 16) {

            var aa = a,
              bb = b,
              cc = c,
              dd = d;

            a = FF(a, b, c, d, m[i + 0], 7, -680876936);
            d = FF(d, a, b, c, m[i + 1], 12, -389564586);
            c = FF(c, d, a, b, m[i + 2], 17, 606105819);
            b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
            a = FF(a, b, c, d, m[i + 4], 7, -176418897);
            d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
            c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
            b = FF(b, c, d, a, m[i + 7], 22, -45705983);
            a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
            d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
            c = FF(c, d, a, b, m[i + 10], 17, -42063);
            b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
            a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
            d = FF(d, a, b, c, m[i + 13], 12, -40341101);
            c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
            b = FF(b, c, d, a, m[i + 15], 22, 1236535329);

            a = GG(a, b, c, d, m[i + 1], 5, -165796510);
            d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
            c = GG(c, d, a, b, m[i + 11], 14, 643717713);
            b = GG(b, c, d, a, m[i + 0], 20, -373897302);
            a = GG(a, b, c, d, m[i + 5], 5, -701558691);
            d = GG(d, a, b, c, m[i + 10], 9, 38016083);
            c = GG(c, d, a, b, m[i + 15], 14, -660478335);
            b = GG(b, c, d, a, m[i + 4], 20, -405537848);
            a = GG(a, b, c, d, m[i + 9], 5, 568446438);
            d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
            c = GG(c, d, a, b, m[i + 3], 14, -187363961);
            b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
            a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
            d = GG(d, a, b, c, m[i + 2], 9, -51403784);
            c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
            b = GG(b, c, d, a, m[i + 12], 20, -1926607734);

            a = HH(a, b, c, d, m[i + 5], 4, -378558);
            d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
            c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
            b = HH(b, c, d, a, m[i + 14], 23, -35309556);
            a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
            d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
            c = HH(c, d, a, b, m[i + 7], 16, -155497632);
            b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
            a = HH(a, b, c, d, m[i + 13], 4, 681279174);
            d = HH(d, a, b, c, m[i + 0], 11, -358537222);
            c = HH(c, d, a, b, m[i + 3], 16, -722521979);
            b = HH(b, c, d, a, m[i + 6], 23, 76029189);
            a = HH(a, b, c, d, m[i + 9], 4, -640364487);
            d = HH(d, a, b, c, m[i + 12], 11, -421815835);
            c = HH(c, d, a, b, m[i + 15], 16, 530742520);
            b = HH(b, c, d, a, m[i + 2], 23, -995338651);

            a = II(a, b, c, d, m[i + 0], 6, -198630844);
            d = II(d, a, b, c, m[i + 7], 10, 1126891415);
            c = II(c, d, a, b, m[i + 14], 15, -1416354905);
            b = II(b, c, d, a, m[i + 5], 21, -57434055);
            a = II(a, b, c, d, m[i + 12], 6, 1700485571);
            d = II(d, a, b, c, m[i + 3], 10, -1894986606);
            c = II(c, d, a, b, m[i + 10], 15, -1051523);
            b = II(b, c, d, a, m[i + 1], 21, -2054922799);
            a = II(a, b, c, d, m[i + 8], 6, 1873313359);
            d = II(d, a, b, c, m[i + 15], 10, -30611744);
            c = II(c, d, a, b, m[i + 6], 15, -1560198380);
            b = II(b, c, d, a, m[i + 13], 21, 1309151649);
            a = II(a, b, c, d, m[i + 4], 6, -145523070);
            d = II(d, a, b, c, m[i + 11], 10, -1120210379);
            c = II(c, d, a, b, m[i + 2], 15, 718787259);
            b = II(b, c, d, a, m[i + 9], 21, -343485551);

            a = a + aa >>> 0;
            b = b + bb >>> 0;
            c = c + cc >>> 0;
            d = d + dd >>> 0;

          }

          return util.endian([a, b, c, d]);

        };

        // Auxiliary functions
        MD5._ff = function (a, b, c, d, x, s, t) {
          var n = a + (b & c | ~b & d) + (x >>> 0) + t;
          return (n << s | n >>> 32 - s) + b;
        };
        MD5._gg = function (a, b, c, d, x, s, t) {
          var n = a + (b & d | c & ~d) + (x >>> 0) + t;
          return (n << s | n >>> 32 - s) + b;
        };
        MD5._hh = function (a, b, c, d, x, s, t) {
          var n = a + (b ^ c ^ d) + (x >>> 0) + t;
          return (n << s | n >>> 32 - s) + b;
        };
        MD5._ii = function (a, b, c, d, x, s, t) {
          var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
          return (n << s | n >>> 32 - s) + b;
        };

        // Package private blocksize
        MD5._blocksize = 16;

        MD5._digestsize = 16;

      })();

      /***/
    }),

  /***/ 1822:
  /*!***************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/travel/index/service.js ***!
    \***************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _common = _interopRequireDefault(__webpack_require__(/*! ./common */ 820));
      var _global = __webpack_require__(/*! @/common/global.config */ 21); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } var _default =

      {
        /**
         * 列表接口
         */
        getProductTaskList: function getProductTaskList() {
          var _this = this;
          this.$app.request2({
            url: 'api/NewAuditTask/GetProductTaskList',
            data: {
              PageIndex: 0,
              PageSize: 0,
              CityId: this.posInfo.cityId
            },

            success: function success(res) {
              _this.sourceList = res.SourceList;

              var fruitList = res.FruitChannelList;
              _this.fruitList = fruitList.map(function (el) {
                el.EndTime = _common.default.formatTime(el.EndTime);
                return el;
              });
            },
            down: function down(res) { },
            fail: function fail() { },
            complete: function complete() { }
          });

        },
        /**
            * 获取广告信息
            */
        fetchAdInfo: function fetchAdInfo() {
          var _this2 = this;
          this.$app.request2({
            url: 'api/CommonPage/GetPageInfoBySortID',
            data: {
              SPCSortID: [
                20535,
                20536],

              SPCProjectID: _global.projectCode
            },

            success: function success(res) {
              var _res$SPCList =


                res.SPCList, SPCList = _res$SPCList === void 0 ? [] : _res$SPCList;
              var bannerTemp = [];
              var recommendTemp = [];
              SPCList.forEach(function (el) {
                if (el.SPCSortID == 20535) {
                  bannerTemp.push(el);
                } else if (el.SPCSortID == 20536) {
                  recommendTemp.push(el);
                }
              });
              _this2.bannerList = bannerTemp;
              _this2.recommendList = recommendTemp;
            },
            down: function down(res) { },
            fail: function fail() { },
            complete: function complete() { }
          });

        },
        /**
            * 获取当前城市
            * @param {Object} lat 经度
            * @param {Object} lon 维度
            */
        fetchPosInfo: function fetchPosInfo(lat, lon) {
          var _this3 = this;
          this.$app.request2({
            url: 'api/CommonPage/GetDistrictByLongitude',
            data: {
              Lat: lat,
              Lon: lon
            },

            success: function success(res) {
              if (res) {
                _this3.posInfo = {
                  cityId: res.DistrictCode,
                  cityName: res.DistrictName
                };

              }
            },
            down: function down(res) { },
            fail: function fail() { },
            complete: function complete() { }
          });

        }
      }; exports.default = _default;

      /***/
    }),

  /***/ 186:
  /*!****************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/mp-share.js ***!
    \****************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * app分享到小程序
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @param {*} shareInfo 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */
        function share2Wechat(_ref) {
          var _ref$webUrl = _ref.webUrl, webUrl = _ref$webUrl === void 0 ? 'https://m.1jingxi.com/surpriseplus/' : _ref$webUrl, _ref$path = _ref.path, path = _ref$path === void 0 ? '' : _ref$path, _ref$title = _ref.title, title = _ref$title === void 0 ? '' : _ref$title, _ref$imageUrl = _ref.imageUrl, imageUrl = _ref$imageUrl === void 0 ? '' : _ref$imageUrl, _ref$type = _ref.type, type = _ref$type === void 0 ? 0 : _ref$type;
          return new Promise(function (resolve, reject) {
            var shareParam = {
              provider: 'weixin',
              type: 5,
              imageUrl: imageUrl,
              title: title,
              scene: 'WXSceneSession',
              miniProgram: {
                id: 'gh_3a4f39b0a589',
                path: path,
                type: type,
                webUrl: webUrl
              }
            };



            uni.share(_objectSpread({},
              shareParam, {
              success: function success(res) {
                resolve();
              },
              fail: function fail() {
                reject();
              }
            }));

          });
        } var _default =

          share2Wechat; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 187:
  /*!*****************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/welfare-detail/service.js ***!
    \*****************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.offshelfSkip = offshelfSkip; exports.goBackSkipOffshelf = goBackSkipOffshelf; exports.default = void 0; /**
                                                                                                                                                                                            * 商品下架跳转
                                                                                                                                                                                            * @param {Object} detail 商品详情
                                                                                                                                                                                            */
        function offshelfSkip(detail) {
          var goods = detail.GoodsInfo;
          var unionCode = detail.UnionCode ? detail.UnionCode : '30104';
          var imgUrl = goods && goods.img_main || '';
          var title = goods && goods.title || '';

          uni.redirectTo({
            url: "/sub-packages/package_no-goods/index/index?imgUrl=".concat(encodeURIComponent(imgUrl), "&title=").concat(encodeURIComponent(title), "&unionCode=").concat(unionCode)
          });

        }

        /* 跳过下架页面 */
        function goBackSkipOffshelf() {
          var pages = getCurrentPages();
          if (pages && pages instanceof Array) {
            var index = -1;
            // 找到开始的下架页
            for (var i = 0, len = pages.length; i < len; i++) {
              if (pages[i] && pages[i].route === 'sub-packages/package_no-goods/index/index') {
                index = i;
                break;
              }
            }
            // 找到下架页之前的列表入口页
            if (index > 0) {
              uni.navigateBack({
                delta: pages.length - 1 - index + 2
              });

            } else {
              uni.navigateBack();
            }
          }
        } var _default =

        {
          /**
           * 获取主推信息
           * @param {number} unioncode 商品类型唯一码
           */
          getRecommend: function getRecommend(unioncode) {
            if (this.IsShopOwner) {
              this.getIsRecommend(unioncode, this.CfgId);
            }
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 1893:
  /*!****************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/index/goto-buying-pdd.js ***!
    \****************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * 在往buying-pdd 跳转的时候考虑是否是淘礼金的情况
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * 淘礼金跳淘宝app
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

        function _default(goods) {
          var extension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; var
            unionCode = goods.UnionCode, GoodsInfo = goods.GoodsInfo; var

              id =




                GoodsInfo.id, _GoodsInfo$ProductBel = GoodsInfo.ProductBelong, productBelong = _GoodsInfo$ProductBel === void 0 ? '' : _GoodsInfo$ProductBel, _GoodsInfo$DujiaSuppl = GoodsInfo.DujiaSupplierId, duJiaSupplierId = _GoodsInfo$DujiaSuppl === void 0 ? '' : _GoodsInfo$DujiaSuppl, typeId = GoodsInfo.TypeId, TaoGiftUrl = GoodsInfo.TaoGiftUrl;

          var promise = Promise.reject();
          console.log('goods', JSON.stringify(goods));




















































































          promise.catch(function () {
            var qsObj = _objectSpread({
              unionCode: unionCode,
              id: id,
              typeId: typeId,
              productBelong: productBelong,
              duJiaSupplierId: duJiaSupplierId
            },
              extension);

            var qsString = Object.keys(qsObj).reduce(function (last, current) {
              last.push("".concat(current, "=").concat(qsObj[current]));
              return last;
            }, []).join('&');
            uni.navigateTo({
              url: "/pages/buying-pdd/index?".concat(qsString)
            });

          });
        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 19:
  /*!***********************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/url.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

      var urlOpt = {
        normal: {
          local: "http://10.101.74.17/USAN/",
          local2: "http://10.101.72.16:6300/tccxgc/api/",
          local3: "http://10.101.20.17:6300/tccxgc/api/",
          local4: "http://10.101.20.17:6300/tccxgc/api/",
          local5: "http://10.101.72.19:6300/surprise/",
          local6: "http://10.101.74.13:6300/tccxgc/oldapi/",
          qa: "http://10.101.20.17:6300/tccxgc/api/",
          t: "http://SurpriseChallenge.t.51jiesan.com/api/",
          online: "https://SurpriseChallenge.51jiesan.com/api/"
        },




        normal2: {
          local: "",
          local2: "http://10.101.72.2:6300/tccxgc/query/",
          local3: "http://10.101.74.20:14695/",
          local4: "http://10.101.20.17:6300/tccxgc/query/",
          local5: "http://10.101.72.19:6300/tccxgc/query/",
          local6: "http://10.101.74.13:6301/query/",
          qa: "http://10.101.20.17:6300/tccxgc/query/",
          t: "http://tccxgc.t.51jiesan.com/query/",
          online: "https://tccxgc.51jiesan.com/query/"
        },




        normal3: {
          local: "http://10.101.74.24:7072/",
          local2: "http://10.101.72.2:6300/surpriseapi/",
          local3: "http://10.101.20.17:6300/tccxgc/surpriseapi/",
          local4: "http://10.101.20.17:6300/tccxgc/surpriseapi/",
          local5: "http://10.101.72.19:6300/tccxgc/surpriseapi/",
          local6: "http://10.101.74.20:6300/surpriseapi/", //孙
          qa: "http://10.101.20.17:6300/tccxgc/surpriseapi/",
          t: "http://www.t.1jingxi.com/surpriseapi/",
          online: "https://www.1jingxi.com/surpriseapi/"
        },




        normal4: {
          local: "",
          local2: "",
          local3: "http://10.101.20.17:6303/",
          local4: "http://10.101.20.17:6303/",
          local5: "http://10.101.72.19:6300/",
          local6: "http://10.101.72.23:54971/",
          qa: "http://10.101.20.17:6303/", // http://10.101.74.20:6303/
          t: "http://www.t.1jingxi.com/surprisegamepollapi/",
          online: "https://www.1jingxi.com/surprisegamepollapi/"
        },




        normal5: {
          local: "",
          local2: "",
          local3: "http://10.101.72.1:6300/api/",
          local4: "",
          local5: "",
          local6: "",
          // qa:"http://10.101.72.2:6300/usanapitest/", // 张青青
          qa: "http://10.101.20.17:6300/usanapi/", // 真实
          // qa: "http://10.101.72.13/USAN/", // 张琴
          t: "http://tccxgc.t.51jiesan.com/usanapi/",
          online: "https://tccxgc.51jiesan.com/usanapi/"
        },




        monitor: {
          local2: "http://10.101.74.27:6300/surpriseapi/",
          local3: "http://surprisechallenge.t.51jiesan.com/surpriseapi/",
          local4: "http://surprisechallenge.t.51jiesan.com/surpriseapi/",
          local6: "http://surprisechallenge.t.51jiesan.com/surpriseapi/",
          qa: "http://10.101.20.17:6300/tccxgc/surpriseapi/",
          t: "http://surprisechallenge.t.51jiesan.com/surpriseapi/",
          online: "https://surprisechallenge.51jiesan.com/surpriseapi/"
        },




        h5share: {
          qa: "http://mobile.1jingxi.com/",
          t: "http://mobile.1jingxi.com/",
          online: "https://m.trleaf.com/"
        }
      };



      var linkType = "qa"; //测试
      // var linkType = "online";//线上
      // var linkType = "t";//预发





      var wsOpt = {
        ws: {
          local2: "ws://10.101.72.16:6300/tccxgc/query/api/DPSocket/Get",
          // local3: "ws://10.101.72.13:6300/tccxgc/query/api/DPSocket/Get",
          local3: "http://10.101.72.13:54971/",
          local5: 'ws://10.101.72.7:6300/tccxgc/query/api/DPSocket/Get',
          local4: 'http://10.101.20.17:54971/',
          // t: "ws://tccxgc.t.51jiesan.com/query/api/DPSocket/Get",
          t: "http://www.t.1jingxi.com/service/ws",
          online: "wss://tccxgc.51jiesan.com/query/api/DPSocket/Get"
        }
      };


      var wsType = "online"; //线上
      var wsProxy = {
        local3: 'http://10.101.74.14:62682/service/ws',
        local4: 'http://10.101.72.13:6301/service/ws',
        t: 'http://www.t.1jingxi.com/service/ws',
        online: 'https://www.1jingxi.com/service/ws'
      };

      // var proxyType = "online";//测试
      var proxyType = "online"; //线上
      var version = '3.2.0';
      module.exports = {
        normal: urlOpt.normal[linkType],
        normal2: urlOpt.normal2[linkType],
        normal3: urlOpt.normal3[linkType],
        normal4: urlOpt.normal4[linkType],
        normal5: urlOpt.normal5[linkType],
        monitor: urlOpt.monitor[linkType],
        ws: wsOpt.ws[wsType],
        proxy: wsProxy[proxyType],
        h5share: urlOpt.h5share[linkType],
        version: version,
        linkType: linkType
      };

      /***/
    }),

  /***/ 1957:
  /*!*****************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/cc-mixins.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.testMixin = exports.DialogVisible = void 0; /**
                                                                                                                                  * @name mixins
                                                                                                                                  * @description 公用script部分组合
                                                                                                                                  * @author
                                                                                                                                  * @date 2019-03-23
                                                                                                                                  */

        /**
                                                                                                                                            * dialog弹框是否显示mixin
                                                                                                                                            */
        var DialogVisible = {
          data: function data() {
            return {
              visible: false,
              animation: {}
            };

          },
          props: {
            /**
                    * 点击空白处是否关闭弹框
                    * 默认:开启
                    */
            stopPropagation: {
              type: Boolean,
              default: false
            },

            /**
                                 * 动画持续时间
                                 * 单位 ms
                                 */
            duration: {
              type: Number,
              default: 400
            },

            /**
                               * 动画的效果
                               * 'linear'	动画从头到尾的速度是相同的
                               * 'ease'	动画以低速开始，然后加快，在结束前变慢
                               * 'ease-in'	动画以低速开始
                               * 'ease-in-out'	动画以低速开始和结束
                               * 'ease-out'	动画以低速结束
                               * 'step-start'	动画第一帧就跳至结束状态直到结束
                               * 'step-end'	动画一直保持开始状态，最后一帧跳到结束状态
                               */
            timingFunction: {
              type: String,
              default: 'linear'
            },

            /**
                                    * 动画延迟时间
                                    * 单位 ms
                                    */
            delay: {
              type: Number,
              default: 0
            },

            /**
                             * 移动开始位置
                             */
            transformOrigin: {
              type: String,
              default: '50% 50% 0'
            },

            showClose: {
              type: Boolean,
              default: true
            }
          },


          watch: {
            visible: function visible(newVal, oldVal) {
              // H5不支持动画,会有报错,需要条件编译

              var animation = uni.createAnimation({
                duration: this.duration,
                timingFunction: this.timingFunction,
                delay: this.delay,
                transformOrigin: this.transformOrigin
              });

              animation.opacity(0).step();
              this.animation = animation.export();
              var vm = this;

              var timer = null;
              clearTimeout(timer);
              timer = setTimeout(function () {
                animation.opacity(1).step();
                vm.animation = animation.export();
                clearTimeout(timer);
                timer = null;
              }, 50);

            }
          },

          methods: {
            showDialog: function showDialog() {
              this.visible = true;
            },
            closeDialog: function closeDialog() {
              this.visible = false;
            },
            /**
                * 点击页面空白处关闭弹框
                */
            dialogWrapperHandler: function dialogWrapperHandler(e) {
              console.log('dialogWrapperHandler');
              if (this.stopPropagation) return;
              this.$emit('dialogWrapperHandler', e);
            },
            /**
                * 阻止页面事件向上、向下冒泡
                */
            dialogContainerHandler: function dialogContainerHandler(e) {
              console.log('dialogContainerHandler');
              this.$emit('dialogContainerHandler', e);
            }
          }
        };



  /**
              * mixin混入时生命周期函数
              * 经测试推荐使用created、mounted
              */exports.DialogVisible = DialogVisible;
        var testMixin = {
          created: function created() {
            console.log('testMixin-created');
          },
          mounted: function mounted() {
            console.log('testMixin-mounted');
          }
        }; exports.testMixin = testMixin;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 2:
  /*!******************************************************************************************!*\
    !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
    \******************************************************************************************/
  /*! exports provided: default */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
  /* WEBPACK VAR INJECTION */(function (global) {/*!
   * Vue.js v2.6.11
   * (c) 2014-2020 Evan You
   * Released under the MIT License.
   */
        /*  */

        var emptyObject = Object.freeze({});

        // These helpers produce better VM code in JS engines due to their
        // explicitness and function inlining.
        function isUndef(v) {
          return v === undefined || v === null
        }

        function isDef(v) {
          return v !== undefined && v !== null
        }

        function isTrue(v) {
          return v === true
        }

        function isFalse(v) {
          return v === false
        }

        /**
         * Check if value is primitive.
         */
        function isPrimitive(value) {
          return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            // $flow-disable-line
            typeof value === 'symbol' ||
            typeof value === 'boolean'
          )
        }

        /**
         * Quick object check - this is primarily used to tell
         * Objects from primitive values when we know the value
         * is a JSON-compliant type.
         */
        function isObject(obj) {
          return obj !== null && typeof obj === 'object'
        }

        /**
         * Get the raw type string of a value, e.g., [object Object].
         */
        var _toString = Object.prototype.toString;

        function toRawType(value) {
          return _toString.call(value).slice(8, -1)
        }

        /**
         * Strict object type check. Only returns true
         * for plain JavaScript objects.
         */
        function isPlainObject(obj) {
          return _toString.call(obj) === '[object Object]'
        }

        function isRegExp(v) {
          return _toString.call(v) === '[object RegExp]'
        }

        /**
         * Check if val is a valid array index.
         */
        function isValidArrayIndex(val) {
          var n = parseFloat(String(val));
          return n >= 0 && Math.floor(n) === n && isFinite(val)
        }

        function isPromise(val) {
          return (
            isDef(val) &&
            typeof val.then === 'function' &&
            typeof val.catch === 'function'
          )
        }

        /**
         * Convert a value to a string that is actually rendered.
         */
        function toString(val) {
          return val == null
            ? ''
            : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
              ? JSON.stringify(val, null, 2)
              : String(val)
        }

        /**
         * Convert an input value to a number for persistence.
         * If the conversion fails, return original string.
         */
        function toNumber(val) {
          var n = parseFloat(val);
          return isNaN(n) ? val : n
        }

        /**
         * Make a map and return a function for checking if a key
         * is in that map.
         */
        function makeMap(
          str,
          expectsLowerCase
        ) {
          var map = Object.create(null);
          var list = str.split(',');
          for (var i = 0; i < list.length; i++) {
            map[list[i]] = true;
          }
          return expectsLowerCase
            ? function (val) { return map[val.toLowerCase()]; }
            : function (val) { return map[val]; }
        }

        /**
         * Check if a tag is a built-in tag.
         */
        var isBuiltInTag = makeMap('slot,component', true);

        /**
         * Check if an attribute is a reserved attribute.
         */
        var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

        /**
         * Remove an item from an array.
         */
        function remove(arr, item) {
          if (arr.length) {
            var index = arr.indexOf(item);
            if (index > -1) {
              return arr.splice(index, 1)
            }
          }
        }

        /**
         * Check whether an object has the property.
         */
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        function hasOwn(obj, key) {
          return hasOwnProperty.call(obj, key)
        }

        /**
         * Create a cached version of a pure function.
         */
        function cached(fn) {
          var cache = Object.create(null);
          return (function cachedFn(str) {
            var hit = cache[str];
            return hit || (cache[str] = fn(str))
          })
        }

        /**
         * Camelize a hyphen-delimited string.
         */
        var camelizeRE = /-(\w)/g;
        var camelize = cached(function (str) {
          return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
        });

        /**
         * Capitalize a string.
         */
        var capitalize = cached(function (str) {
          return str.charAt(0).toUpperCase() + str.slice(1)
        });

        /**
         * Hyphenate a camelCase string.
         */
        var hyphenateRE = /\B([A-Z])/g;
        var hyphenate = cached(function (str) {
          return str.replace(hyphenateRE, '-$1').toLowerCase()
        });

        /**
         * Simple bind polyfill for environments that do not support it,
         * e.g., PhantomJS 1.x. Technically, we don't need this anymore
         * since native bind is now performant enough in most browsers.
         * But removing it would mean breaking code that was able to run in
         * PhantomJS 1.x, so this must be kept for backward compatibility.
         */

        /* istanbul ignore next */
        function polyfillBind(fn, ctx) {
          function boundFn(a) {
            var l = arguments.length;
            return l
              ? l > 1
                ? fn.apply(ctx, arguments)
                : fn.call(ctx, a)
              : fn.call(ctx)
          }

          boundFn._length = fn.length;
          return boundFn
        }

        function nativeBind(fn, ctx) {
          return fn.bind(ctx)
        }

        var bind = Function.prototype.bind
          ? nativeBind
          : polyfillBind;

        /**
         * Convert an Array-like object to a real Array.
         */
        function toArray(list, start) {
          start = start || 0;
          var i = list.length - start;
          var ret = new Array(i);
          while (i--) {
            ret[i] = list[i + start];
          }
          return ret
        }

        /**
         * Mix properties into target object.
         */
        function extend(to, _from) {
          for (var key in _from) {
            to[key] = _from[key];
          }
          return to
        }

        /**
         * Merge an Array of Objects into a single Object.
         */
        function toObject(arr) {
          var res = {};
          for (var i = 0; i < arr.length; i++) {
            if (arr[i]) {
              extend(res, arr[i]);
            }
          }
          return res
        }

        /* eslint-disable no-unused-vars */

        /**
         * Perform no operation.
         * Stubbing args to make Flow happy without leaving useless transpiled code
         * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
         */
        function noop(a, b, c) { }

        /**
         * Always return false.
         */
        var no = function (a, b, c) { return false; };

        /* eslint-enable no-unused-vars */

        /**
         * Return the same value.
         */
        var identity = function (_) { return _; };

        /**
         * Check if two values are loosely equal - that is,
         * if they are plain objects, do they have the same shape?
         */
        function looseEqual(a, b) {
          if (a === b) { return true }
          var isObjectA = isObject(a);
          var isObjectB = isObject(b);
          if (isObjectA && isObjectB) {
            try {
              var isArrayA = Array.isArray(a);
              var isArrayB = Array.isArray(b);
              if (isArrayA && isArrayB) {
                return a.length === b.length && a.every(function (e, i) {
                  return looseEqual(e, b[i])
                })
              } else if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime()
              } else if (!isArrayA && !isArrayB) {
                var keysA = Object.keys(a);
                var keysB = Object.keys(b);
                return keysA.length === keysB.length && keysA.every(function (key) {
                  return looseEqual(a[key], b[key])
                })
              } else {
                /* istanbul ignore next */
                return false
              }
            } catch (e) {
              /* istanbul ignore next */
              return false
            }
          } else if (!isObjectA && !isObjectB) {
            return String(a) === String(b)
          } else {
            return false
          }
        }

        /**
         * Return the first index at which a loosely equal value can be
         * found in the array (if value is a plain object, the array must
         * contain an object of the same shape), or -1 if it is not present.
         */
        function looseIndexOf(arr, val) {
          for (var i = 0; i < arr.length; i++) {
            if (looseEqual(arr[i], val)) { return i }
          }
          return -1
        }

        /**
         * Ensure a function is called only once.
         */
        function once(fn) {
          var called = false;
          return function () {
            if (!called) {
              called = true;
              fn.apply(this, arguments);
            }
          }
        }

        var ASSET_TYPES = [
          'component',
          'directive',
          'filter'
        ];

        var LIFECYCLE_HOOKS = [
          'beforeCreate',
          'created',
          'beforeMount',
          'mounted',
          'beforeUpdate',
          'updated',
          'beforeDestroy',
          'destroyed',
          'activated',
          'deactivated',
          'errorCaptured',
          'serverPrefetch'
        ];

        /*  */



        var config = ({
          /**
           * Option merge strategies (used in core/util/options)
           */
          // $flow-disable-line
          optionMergeStrategies: Object.create(null),

          /**
           * Whether to suppress warnings.
           */
          silent: false,

          /**
           * Show production mode tip message on boot?
           */
          productionTip: "development" !== 'production',

          /**
           * Whether to enable devtools
           */
          devtools: "development" !== 'production',

          /**
           * Whether to record perf
           */
          performance: false,

          /**
           * Error handler for watcher errors
           */
          errorHandler: null,

          /**
           * Warn handler for watcher warns
           */
          warnHandler: null,

          /**
           * Ignore certain custom elements
           */
          ignoredElements: [],

          /**
           * Custom user key aliases for v-on
           */
          // $flow-disable-line
          keyCodes: Object.create(null),

          /**
           * Check if a tag is reserved so that it cannot be registered as a
           * component. This is platform-dependent and may be overwritten.
           */
          isReservedTag: no,

          /**
           * Check if an attribute is reserved so that it cannot be used as a component
           * prop. This is platform-dependent and may be overwritten.
           */
          isReservedAttr: no,

          /**
           * Check if a tag is an unknown element.
           * Platform-dependent.
           */
          isUnknownElement: no,

          /**
           * Get the namespace of an element
           */
          getTagNamespace: noop,

          /**
           * Parse the real tag name for the specific platform.
           */
          parsePlatformTagName: identity,

          /**
           * Check if an attribute must be bound using property, e.g. value
           * Platform-dependent.
           */
          mustUseProp: no,

          /**
           * Perform updates asynchronously. Intended to be used by Vue Test Utils
           * This will significantly reduce performance if set to false.
           */
          async: true,

          /**
           * Exposed for legacy reasons
           */
          _lifecycleHooks: LIFECYCLE_HOOKS
        });

        /*  */

        /**
         * unicode letters used for parsing html tags, component names and property paths.
         * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
         * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
         */
        var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

        /**
         * Check if a string starts with $ or _
         */
        function isReserved(str) {
          var c = (str + '').charCodeAt(0);
          return c === 0x24 || c === 0x5F
        }

        /**
         * Define a property.
         */
        function def(obj, key, val, enumerable) {
          Object.defineProperty(obj, key, {
            value: val,
            enumerable: !!enumerable,
            writable: true,
            configurable: true
          });
        }

        /**
         * Parse simple path.
         */
        var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
        function parsePath(path) {
          if (bailRE.test(path)) {
            return
          }
          var segments = path.split('.');
          return function (obj) {
            for (var i = 0; i < segments.length; i++) {
              if (!obj) { return }
              obj = obj[segments[i]];
            }
            return obj
          }
        }

        /*  */

        // can we use __proto__?
        var hasProto = '__proto__' in {};

        // Browser environment sniffing
        var inBrowser = typeof window !== 'undefined';
        var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
        var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
        var UA = inBrowser && window.navigator.userAgent.toLowerCase();
        var isIE = UA && /msie|trident/.test(UA);
        var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
        var isEdge = UA && UA.indexOf('edge/') > 0;
        var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
        var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
        var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
        var isPhantomJS = UA && /phantomjs/.test(UA);
        var isFF = UA && UA.match(/firefox\/(\d+)/);

        // Firefox has a "watch" function on Object.prototype...
        var nativeWatch = ({}).watch;
        if (inBrowser) {
          try {
            var opts = {};
            Object.defineProperty(opts, 'passive', ({
              get: function get() {
              }
            })); // https://github.com/facebook/flow/issues/285
            window.addEventListener('test-passive', null, opts);
          } catch (e) { }
        }

        // this needs to be lazy-evaled because vue may be required before
        // vue-server-renderer can set VUE_ENV
        var _isServer;
        var isServerRendering = function () {
          if (_isServer === undefined) {
            /* istanbul ignore if */
            if (!inBrowser && !inWeex && typeof global !== 'undefined') {
              // detect presence of vue-server-renderer and avoid
              // Webpack shimming the process
              _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
            } else {
              _isServer = false;
            }
          }
          return _isServer
        };

        // detect devtools
        var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

        /* istanbul ignore next */
        function isNative(Ctor) {
          return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
        }

        var hasSymbol =
          typeof Symbol !== 'undefined' && isNative(Symbol) &&
          typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

        var _Set;
        /* istanbul ignore if */ // $flow-disable-line
        if (typeof Set !== 'undefined' && isNative(Set)) {
          // use native Set when available.
          _Set = Set;
        } else {
          // a non-standard Set polyfill that only works with primitive keys.
          _Set = /*@__PURE__*/(function () {
            function Set() {
              this.set = Object.create(null);
            }
            Set.prototype.has = function has(key) {
              return this.set[key] === true
            };
            Set.prototype.add = function add(key) {
              this.set[key] = true;
            };
            Set.prototype.clear = function clear() {
              this.set = Object.create(null);
            };

            return Set;
          }());
        }

        /*  */

        var warn = noop;
        var tip = noop;
        var generateComponentTrace = (noop); // work around flow check
        var formatComponentName = (noop);

        if (true) {
          var hasConsole = typeof console !== 'undefined';
          var classifyRE = /(?:^|[-_])(\w)/g;
          var classify = function (str) {
            return str
              .replace(classifyRE, function (c) { return c.toUpperCase(); })
              .replace(/[-_]/g, '');
          };

          warn = function (msg, vm) {
            var trace = vm ? generateComponentTrace(vm) : '';

            if (config.warnHandler) {
              config.warnHandler.call(null, msg, vm, trace);
            } else if (hasConsole && (!config.silent)) {
              console.error(("[Vue warn]: " + msg + trace));
            }
          };

          tip = function (msg, vm) {
            if (hasConsole && (!config.silent)) {
              console.warn("[Vue tip]: " + msg + (
                vm ? generateComponentTrace(vm) : ''
              ));
            }
          };

          formatComponentName = function (vm, includeFile) {
            if (vm.$root === vm) {
              if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
                return ('') + vm.$options.__file
              }
              return '<Root>'
            }
            var options = typeof vm === 'function' && vm.cid != null
              ? vm.options
              : vm._isVue
                ? vm.$options || vm.constructor.options
                : vm;
            var name = options.name || options._componentTag;
            var file = options.__file;
            if (!name && file) {
              var match = file.match(/([^/\\]+)\.vue$/);
              name = match && match[1];
            }

            return (
              (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
              (file && includeFile !== false ? (" at " + file) : '')
            )
          };

          var repeat = function (str, n) {
            var res = '';
            while (n) {
              if (n % 2 === 1) { res += str; }
              if (n > 1) { str += str; }
              n >>= 1;
            }
            return res
          };

          generateComponentTrace = function (vm) {
            if (vm._isVue && vm.$parent) {
              var tree = [];
              var currentRecursiveSequence = 0;
              while (vm && vm.$options.name !== 'PageBody') {
                if (tree.length > 0) {
                  var last = tree[tree.length - 1];
                  if (last.constructor === vm.constructor) {
                    currentRecursiveSequence++;
                    vm = vm.$parent;
                    continue
                  } else if (currentRecursiveSequence > 0) {
                    tree[tree.length - 1] = [last, currentRecursiveSequence];
                    currentRecursiveSequence = 0;
                  }
                }
                !vm.$options.isReserved && tree.push(vm);
                vm = vm.$parent;
              }
              return '\n\nfound in\n\n' + tree
                .map(function (vm, i) {
                  return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
                    ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
                    : formatComponentName(vm)));
                })
                .join('\n')
            } else {
              return ("\n\n(found in " + (formatComponentName(vm)) + ")")
            }
          };
        }

        /*  */

        var uid = 0;

        /**
         * A dep is an observable that can have multiple
         * directives subscribing to it.
         */
        var Dep = function Dep() {
          // fixed by xxxxxx (nvue vuex)
          /* eslint-disable no-undef */
          if (typeof SharedObject !== 'undefined') {
            this.id = SharedObject.uid++;
          } else {
            this.id = uid++;
          }
          this.subs = [];
        };

        Dep.prototype.addSub = function addSub(sub) {
          this.subs.push(sub);
        };

        Dep.prototype.removeSub = function removeSub(sub) {
          remove(this.subs, sub);
        };

        Dep.prototype.depend = function depend() {
          if (Dep.SharedObject.target) {
            Dep.SharedObject.target.addDep(this);
          }
        };

        Dep.prototype.notify = function notify() {
          // stabilize the subscriber list first
          var subs = this.subs.slice();
          if (true && !config.async) {
            // subs aren't sorted in scheduler if not running async
            // we need to sort them now to make sure they fire in correct
            // order
            subs.sort(function (a, b) { return a.id - b.id; });
          }
          for (var i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
          }
        };

        // The current target watcher being evaluated.
        // This is globally unique because only one watcher
        // can be evaluated at a time.
        // fixed by xxxxxx (nvue shared vuex)
        /* eslint-disable no-undef */
        Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
        Dep.SharedObject.target = null;
        Dep.SharedObject.targetStack = [];

        function pushTarget(target) {
          Dep.SharedObject.targetStack.push(target);
          Dep.SharedObject.target = target;
        }

        function popTarget() {
          Dep.SharedObject.targetStack.pop();
          Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
        }

        /*  */

        var VNode = function VNode(
          tag,
          data,
          children,
          text,
          elm,
          context,
          componentOptions,
          asyncFactory
        ) {
          this.tag = tag;
          this.data = data;
          this.children = children;
          this.text = text;
          this.elm = elm;
          this.ns = undefined;
          this.context = context;
          this.fnContext = undefined;
          this.fnOptions = undefined;
          this.fnScopeId = undefined;
          this.key = data && data.key;
          this.componentOptions = componentOptions;
          this.componentInstance = undefined;
          this.parent = undefined;
          this.raw = false;
          this.isStatic = false;
          this.isRootInsert = true;
          this.isComment = false;
          this.isCloned = false;
          this.isOnce = false;
          this.asyncFactory = asyncFactory;
          this.asyncMeta = undefined;
          this.isAsyncPlaceholder = false;
        };

        var prototypeAccessors = { child: { configurable: true } };

        // DEPRECATED: alias for componentInstance for backwards compat.
        /* istanbul ignore next */
        prototypeAccessors.child.get = function () {
          return this.componentInstance
        };

        Object.defineProperties(VNode.prototype, prototypeAccessors);

        var createEmptyVNode = function (text) {
          if (text === void 0) text = '';

          var node = new VNode();
          node.text = text;
          node.isComment = true;
          return node
        };

        function createTextVNode(val) {
          return new VNode(undefined, undefined, undefined, String(val))
        }

        // optimized shallow clone
        // used for static nodes and slot nodes because they may be reused across
        // multiple renders, cloning them avoids errors when DOM manipulations rely
        // on their elm reference.
        function cloneVNode(vnode) {
          var cloned = new VNode(
            vnode.tag,
            vnode.data,
            // #7975
            // clone children array to avoid mutating original in case of cloning
            // a child.
            vnode.children && vnode.children.slice(),
            vnode.text,
            vnode.elm,
            vnode.context,
            vnode.componentOptions,
            vnode.asyncFactory
          );
          cloned.ns = vnode.ns;
          cloned.isStatic = vnode.isStatic;
          cloned.key = vnode.key;
          cloned.isComment = vnode.isComment;
          cloned.fnContext = vnode.fnContext;
          cloned.fnOptions = vnode.fnOptions;
          cloned.fnScopeId = vnode.fnScopeId;
          cloned.asyncMeta = vnode.asyncMeta;
          cloned.isCloned = true;
          return cloned
        }

        /*
         * not type checking this file because flow doesn't play well with
         * dynamically accessing methods on Array prototype
         */

        var arrayProto = Array.prototype;
        var arrayMethods = Object.create(arrayProto);

        var methodsToPatch = [
          'push',
          'pop',
          'shift',
          'unshift',
          'splice',
          'sort',
          'reverse'
        ];

        /**
         * Intercept mutating methods and emit events
         */
        methodsToPatch.forEach(function (method) {
          // cache original method
          var original = arrayProto[method];
          def(arrayMethods, method, function mutator() {
            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];

            var result = original.apply(this, args);
            var ob = this.__ob__;
            var inserted;
            switch (method) {
              case 'push':
              case 'unshift':
                inserted = args;
                break
              case 'splice':
                inserted = args.slice(2);
                break
            }
            if (inserted) { ob.observeArray(inserted); }
            // notify change
            ob.dep.notify();
            return result
          });
        });

        /*  */

        var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

        /**
         * In some cases we may want to disable observation inside a component's
         * update computation.
         */
        var shouldObserve = true;

        function toggleObserving(value) {
          shouldObserve = value;
        }

        /**
         * Observer class that is attached to each observed
         * object. Once attached, the observer converts the target
         * object's property keys into getter/setters that
         * collect dependencies and dispatch updates.
         */
        var Observer = function Observer(value) {
          this.value = value;
          this.dep = new Dep();
          this.vmCount = 0;
          def(value, '__ob__', this);
          if (Array.isArray(value)) {
            if (hasProto) {
              {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
                if (value.push !== value.__proto__.push) {
                  copyAugment(value, arrayMethods, arrayKeys);
                } else {
                  protoAugment(value, arrayMethods);
                }
              }
            } else {
              copyAugment(value, arrayMethods, arrayKeys);
            }
            this.observeArray(value);
          } else {
            this.walk(value);
          }
        };

        /**
         * Walk through all properties and convert them into
         * getter/setters. This method should only be called when
         * value type is Object.
         */
        Observer.prototype.walk = function walk(obj) {
          var keys = Object.keys(obj);
          for (var i = 0; i < keys.length; i++) {
            defineReactive$$1(obj, keys[i]);
          }
        };

        /**
         * Observe a list of Array items.
         */
        Observer.prototype.observeArray = function observeArray(items) {
          for (var i = 0, l = items.length; i < l; i++) {
            observe(items[i]);
          }
        };

        // helpers

        /**
         * Augment a target Object or Array by intercepting
         * the prototype chain using __proto__
         */
        function protoAugment(target, src) {
          /* eslint-disable no-proto */
          target.__proto__ = src;
          /* eslint-enable no-proto */
        }

        /**
         * Augment a target Object or Array by defining
         * hidden properties.
         */
        /* istanbul ignore next */
        function copyAugment(target, src, keys) {
          for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            def(target, key, src[key]);
          }
        }

        /**
         * Attempt to create an observer instance for a value,
         * returns the new observer if successfully observed,
         * or the existing observer if the value already has one.
         */
        function observe(value, asRootData) {
          if (!isObject(value) || value instanceof VNode) {
            return
          }
          var ob;
          if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
            ob = value.__ob__;
          } else if (
            shouldObserve &&
            !isServerRendering() &&
            (Array.isArray(value) || isPlainObject(value)) &&
            Object.isExtensible(value) &&
            !value._isVue
          ) {
            ob = new Observer(value);
          }
          if (asRootData && ob) {
            ob.vmCount++;
          }
          return ob
        }

        /**
         * Define a reactive property on an Object.
         */
        function defineReactive$$1(
          obj,
          key,
          val,
          customSetter,
          shallow
        ) {
          var dep = new Dep();

          var property = Object.getOwnPropertyDescriptor(obj, key);
          if (property && property.configurable === false) {
            return
          }

          // cater for pre-defined getter/setters
          var getter = property && property.get;
          var setter = property && property.set;
          if ((!getter || setter) && arguments.length === 2) {
            val = obj[key];
          }

          var childOb = !shallow && observe(val);
          Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter() {
              var value = getter ? getter.call(obj) : val;
              if (Dep.SharedObject.target) { // fixed by xxxxxx
                dep.depend();
                if (childOb) {
                  childOb.dep.depend();
                  if (Array.isArray(value)) {
                    dependArray(value);
                  }
                }
              }
              return value
            },
            set: function reactiveSetter(newVal) {
              var value = getter ? getter.call(obj) : val;
              /* eslint-disable no-self-compare */
              if (newVal === value || (newVal !== newVal && value !== value)) {
                return
              }
              /* eslint-enable no-self-compare */
              if (true && customSetter) {
                customSetter();
              }
              // #7981: for accessor properties without setter
              if (getter && !setter) { return }
              if (setter) {
                setter.call(obj, newVal);
              } else {
                val = newVal;
              }
              childOb = !shallow && observe(newVal);
              dep.notify();
            }
          });
        }

        /**
         * Set a property on an object. Adds the new property and
         * triggers change notification if the property doesn't
         * already exist.
         */
        function set(target, key, val) {
          if (true &&
            (isUndef(target) || isPrimitive(target))
          ) {
            warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
          }
          if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.length = Math.max(target.length, key);
            target.splice(key, 1, val);
            return val
          }
          if (key in target && !(key in Object.prototype)) {
            target[key] = val;
            return val
          }
          var ob = (target).__ob__;
          if (target._isVue || (ob && ob.vmCount)) {
            true && warn(
              'Avoid adding reactive properties to a Vue instance or its root $data ' +
              'at runtime - declare it upfront in the data option.'
            );
            return val
          }
          if (!ob) {
            target[key] = val;
            return val
          }
          defineReactive$$1(ob.value, key, val);
          ob.dep.notify();
          return val
        }

        /**
         * Delete a property and trigger change if necessary.
         */
        function del(target, key) {
          if (true &&
            (isUndef(target) || isPrimitive(target))
          ) {
            warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
          }
          if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.splice(key, 1);
            return
          }
          var ob = (target).__ob__;
          if (target._isVue || (ob && ob.vmCount)) {
            true && warn(
              'Avoid deleting properties on a Vue instance or its root $data ' +
              '- just set it to null.'
            );
            return
          }
          if (!hasOwn(target, key)) {
            return
          }
          delete target[key];
          if (!ob) {
            return
          }
          ob.dep.notify();
        }

        /**
         * Collect dependencies on array elements when the array is touched, since
         * we cannot intercept array element access like property getters.
         */
        function dependArray(value) {
          for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
            e = value[i];
            e && e.__ob__ && e.__ob__.dep.depend();
            if (Array.isArray(e)) {
              dependArray(e);
            }
          }
        }

        /*  */

        /**
         * Option overwriting strategies are functions that handle
         * how to merge a parent option value and a child option
         * value into the final value.
         */
        var strats = config.optionMergeStrategies;

        /**
         * Options with restrictions
         */
        if (true) {
          strats.el = strats.propsData = function (parent, child, vm, key) {
            if (!vm) {
              warn(
                "option \"" + key + "\" can only be used during instance " +
                'creation with the `new` keyword.'
              );
            }
            return defaultStrat(parent, child)
          };
        }

        /**
         * Helper that recursively merges two data objects together.
         */
        function mergeData(to, from) {
          if (!from) { return to }
          var key, toVal, fromVal;

          var keys = hasSymbol
            ? Reflect.ownKeys(from)
            : Object.keys(from);

          for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            // in case the object is already observed...
            if (key === '__ob__') { continue }
            toVal = to[key];
            fromVal = from[key];
            if (!hasOwn(to, key)) {
              set(to, key, fromVal);
            } else if (
              toVal !== fromVal &&
              isPlainObject(toVal) &&
              isPlainObject(fromVal)
            ) {
              mergeData(toVal, fromVal);
            }
          }
          return to
        }

        /**
         * Data
         */
        function mergeDataOrFn(
          parentVal,
          childVal,
          vm
        ) {
          if (!vm) {
            // in a Vue.extend merge, both should be functions
            if (!childVal) {
              return parentVal
            }
            if (!parentVal) {
              return childVal
            }
            // when parentVal & childVal are both present,
            // we need to return a function that returns the
            // merged result of both functions... no need to
            // check if parentVal is a function here because
            // it has to be a function to pass previous merges.
            return function mergedDataFn() {
              return mergeData(
                typeof childVal === 'function' ? childVal.call(this, this) : childVal,
                typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
              )
            }
          } else {
            return function mergedInstanceDataFn() {
              // instance merge
              var instanceData = typeof childVal === 'function'
                ? childVal.call(vm, vm)
                : childVal;
              var defaultData = typeof parentVal === 'function'
                ? parentVal.call(vm, vm)
                : parentVal;
              if (instanceData) {
                return mergeData(instanceData, defaultData)
              } else {
                return defaultData
              }
            }
          }
        }

        strats.data = function (
          parentVal,
          childVal,
          vm
        ) {
          if (!vm) {
            if (childVal && typeof childVal !== 'function') {
              true && warn(
                'The "data" option should be a function ' +
                'that returns a per-instance value in component ' +
                'definitions.',
                vm
              );

              return parentVal
            }
            return mergeDataOrFn(parentVal, childVal)
          }

          return mergeDataOrFn(parentVal, childVal, vm)
        };

        /**
         * Hooks and props are merged as arrays.
         */
        function mergeHook(
          parentVal,
          childVal
        ) {
          var res = childVal
            ? parentVal
              ? parentVal.concat(childVal)
              : Array.isArray(childVal)
                ? childVal
                : [childVal]
            : parentVal;
          return res
            ? dedupeHooks(res)
            : res
        }

        function dedupeHooks(hooks) {
          var res = [];
          for (var i = 0; i < hooks.length; i++) {
            if (res.indexOf(hooks[i]) === -1) {
              res.push(hooks[i]);
            }
          }
          return res
        }

        LIFECYCLE_HOOKS.forEach(function (hook) {
          strats[hook] = mergeHook;
        });

        /**
         * Assets
         *
         * When a vm is present (instance creation), we need to do
         * a three-way merge between constructor options, instance
         * options and parent options.
         */
        function mergeAssets(
          parentVal,
          childVal,
          vm,
          key
        ) {
          var res = Object.create(parentVal || null);
          if (childVal) {
            true && assertObjectType(key, childVal, vm);
            return extend(res, childVal)
          } else {
            return res
          }
        }

        ASSET_TYPES.forEach(function (type) {
          strats[type + 's'] = mergeAssets;
        });

        /**
         * Watchers.
         *
         * Watchers hashes should not overwrite one
         * another, so we merge them as arrays.
         */
        strats.watch = function (
          parentVal,
          childVal,
          vm,
          key
        ) {
          // work around Firefox's Object.prototype.watch...
          if (parentVal === nativeWatch) { parentVal = undefined; }
          if (childVal === nativeWatch) { childVal = undefined; }
          /* istanbul ignore if */
          if (!childVal) { return Object.create(parentVal || null) }
          if (true) {
            assertObjectType(key, childVal, vm);
          }
          if (!parentVal) { return childVal }
          var ret = {};
          extend(ret, parentVal);
          for (var key$1 in childVal) {
            var parent = ret[key$1];
            var child = childVal[key$1];
            if (parent && !Array.isArray(parent)) {
              parent = [parent];
            }
            ret[key$1] = parent
              ? parent.concat(child)
              : Array.isArray(child) ? child : [child];
          }
          return ret
        };

        /**
         * Other object hashes.
         */
        strats.props =
          strats.methods =
          strats.inject =
          strats.computed = function (
            parentVal,
            childVal,
            vm,
            key
          ) {
            if (childVal && "development" !== 'production') {
              assertObjectType(key, childVal, vm);
            }
            if (!parentVal) { return childVal }
            var ret = Object.create(null);
            extend(ret, parentVal);
            if (childVal) { extend(ret, childVal); }
            return ret
          };
        strats.provide = mergeDataOrFn;

        /**
         * Default strategy.
         */
        var defaultStrat = function (parentVal, childVal) {
          return childVal === undefined
            ? parentVal
            : childVal
        };

        /**
         * Validate component names
         */
        function checkComponents(options) {
          for (var key in options.components) {
            validateComponentName(key);
          }
        }

        function validateComponentName(name) {
          if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
            warn(
              'Invalid component name: "' + name + '". Component names ' +
              'should conform to valid custom element name in html5 specification.'
            );
          }
          if (isBuiltInTag(name) || config.isReservedTag(name)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + name
            );
          }
        }

        /**
         * Ensure all props option syntax are normalized into the
         * Object-based format.
         */
        function normalizeProps(options, vm) {
          var props = options.props;
          if (!props) { return }
          var res = {};
          var i, val, name;
          if (Array.isArray(props)) {
            i = props.length;
            while (i--) {
              val = props[i];
              if (typeof val === 'string') {
                name = camelize(val);
                res[name] = { type: null };
              } else if (true) {
                warn('props must be strings when using array syntax.');
              }
            }
          } else if (isPlainObject(props)) {
            for (var key in props) {
              val = props[key];
              name = camelize(key);
              res[name] = isPlainObject(val)
                ? val
                : { type: val };
            }
          } else if (true) {
            warn(
              "Invalid value for option \"props\": expected an Array or an Object, " +
              "but got " + (toRawType(props)) + ".",
              vm
            );
          }
          options.props = res;
        }

        /**
         * Normalize all injections into Object-based format
         */
        function normalizeInject(options, vm) {
          var inject = options.inject;
          if (!inject) { return }
          var normalized = options.inject = {};
          if (Array.isArray(inject)) {
            for (var i = 0; i < inject.length; i++) {
              normalized[inject[i]] = { from: inject[i] };
            }
          } else if (isPlainObject(inject)) {
            for (var key in inject) {
              var val = inject[key];
              normalized[key] = isPlainObject(val)
                ? extend({ from: key }, val)
                : { from: val };
            }
          } else if (true) {
            warn(
              "Invalid value for option \"inject\": expected an Array or an Object, " +
              "but got " + (toRawType(inject)) + ".",
              vm
            );
          }
        }

        /**
         * Normalize raw function directives into object format.
         */
        function normalizeDirectives(options) {
          var dirs = options.directives;
          if (dirs) {
            for (var key in dirs) {
              var def$$1 = dirs[key];
              if (typeof def$$1 === 'function') {
                dirs[key] = { bind: def$$1, update: def$$1 };
              }
            }
          }
        }

        function assertObjectType(name, value, vm) {
          if (!isPlainObject(value)) {
            warn(
              "Invalid value for option \"" + name + "\": expected an Object, " +
              "but got " + (toRawType(value)) + ".",
              vm
            );
          }
        }

        /**
         * Merge two option objects into a new one.
         * Core utility used in both instantiation and inheritance.
         */
        function mergeOptions(
          parent,
          child,
          vm
        ) {
          if (true) {
            checkComponents(child);
          }

          if (typeof child === 'function') {
            child = child.options;
          }

          normalizeProps(child, vm);
          normalizeInject(child, vm);
          normalizeDirectives(child);

          // Apply extends and mixins on the child options,
          // but only if it is a raw options object that isn't
          // the result of another mergeOptions call.
          // Only merged options has the _base property.
          if (!child._base) {
            if (child.extends) {
              parent = mergeOptions(parent, child.extends, vm);
            }
            if (child.mixins) {
              for (var i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm);
              }
            }
          }

          var options = {};
          var key;
          for (key in parent) {
            mergeField(key);
          }
          for (key in child) {
            if (!hasOwn(parent, key)) {
              mergeField(key);
            }
          }
          function mergeField(key) {
            var strat = strats[key] || defaultStrat;
            options[key] = strat(parent[key], child[key], vm, key);
          }
          return options
        }

        /**
         * Resolve an asset.
         * This function is used because child instances need access
         * to assets defined in its ancestor chain.
         */
        function resolveAsset(
          options,
          type,
          id,
          warnMissing
        ) {
          /* istanbul ignore if */
          if (typeof id !== 'string') {
            return
          }
          var assets = options[type];
          // check local registration variations first
          if (hasOwn(assets, id)) { return assets[id] }
          var camelizedId = camelize(id);
          if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
          var PascalCaseId = capitalize(camelizedId);
          if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
          // fallback to prototype chain
          var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
          if (true && warnMissing && !res) {
            warn(
              'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
              options
            );
          }
          return res
        }

        /*  */



        function validateProp(
          key,
          propOptions,
          propsData,
          vm
        ) {
          var prop = propOptions[key];
          var absent = !hasOwn(propsData, key);
          var value = propsData[key];
          // boolean casting
          var booleanIndex = getTypeIndex(Boolean, prop.type);
          if (booleanIndex > -1) {
            if (absent && !hasOwn(prop, 'default')) {
              value = false;
            } else if (value === '' || value === hyphenate(key)) {
              // only cast empty string / same name to boolean if
              // boolean has higher priority
              var stringIndex = getTypeIndex(String, prop.type);
              if (stringIndex < 0 || booleanIndex < stringIndex) {
                value = true;
              }
            }
          }
          // check default value
          if (value === undefined) {
            value = getPropDefaultValue(vm, prop, key);
            // since the default value is a fresh copy,
            // make sure to observe it.
            var prevShouldObserve = shouldObserve;
            toggleObserving(true);
            observe(value);
            toggleObserving(prevShouldObserve);
          }
          if (
            true
          ) {
            assertProp(prop, key, value, vm, absent);
          }
          return value
        }

        /**
         * Get the default value of a prop.
         */
        function getPropDefaultValue(vm, prop, key) {
          // no default, return undefined
          if (!hasOwn(prop, 'default')) {
            return undefined
          }
          var def = prop.default;
          // warn against non-factory defaults for Object & Array
          if (true && isObject(def)) {
            warn(
              'Invalid default value for prop "' + key + '": ' +
              'Props with type Object/Array must use a factory function ' +
              'to return the default value.',
              vm
            );
          }
          // the raw prop value was also undefined from previous render,
          // return previous default value to avoid unnecessary watcher trigger
          if (vm && vm.$options.propsData &&
            vm.$options.propsData[key] === undefined &&
            vm._props[key] !== undefined
          ) {
            return vm._props[key]
          }
          // call factory function for non-Function types
          // a value is Function if its prototype is function even across different execution context
          return typeof def === 'function' && getType(prop.type) !== 'Function'
            ? def.call(vm)
            : def
        }

        /**
         * Assert whether a prop is valid.
         */
        function assertProp(
          prop,
          name,
          value,
          vm,
          absent
        ) {
          if (prop.required && absent) {
            warn(
              'Missing required prop: "' + name + '"',
              vm
            );
            return
          }
          if (value == null && !prop.required) {
            return
          }
          var type = prop.type;
          var valid = !type || type === true;
          var expectedTypes = [];
          if (type) {
            if (!Array.isArray(type)) {
              type = [type];
            }
            for (var i = 0; i < type.length && !valid; i++) {
              var assertedType = assertType(value, type[i]);
              expectedTypes.push(assertedType.expectedType || '');
              valid = assertedType.valid;
            }
          }

          if (!valid) {
            warn(
              getInvalidTypeMessage(name, value, expectedTypes),
              vm
            );
            return
          }
          var validator = prop.validator;
          if (validator) {
            if (!validator(value)) {
              warn(
                'Invalid prop: custom validator check failed for prop "' + name + '".',
                vm
              );
            }
          }
        }

        var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

        function assertType(value, type) {
          var valid;
          var expectedType = getType(type);
          if (simpleCheckRE.test(expectedType)) {
            var t = typeof value;
            valid = t === expectedType.toLowerCase();
            // for primitive wrapper objects
            if (!valid && t === 'object') {
              valid = value instanceof type;
            }
          } else if (expectedType === 'Object') {
            valid = isPlainObject(value);
          } else if (expectedType === 'Array') {
            valid = Array.isArray(value);
          } else {
            valid = value instanceof type;
          }
          return {
            valid: valid,
            expectedType: expectedType
          }
        }

        /**
         * Use function string name to check built-in types,
         * because a simple equality check will fail when running
         * across different vms / iframes.
         */
        function getType(fn) {
          var match = fn && fn.toString().match(/^\s*function (\w+)/);
          return match ? match[1] : ''
        }

        function isSameType(a, b) {
          return getType(a) === getType(b)
        }

        function getTypeIndex(type, expectedTypes) {
          if (!Array.isArray(expectedTypes)) {
            return isSameType(expectedTypes, type) ? 0 : -1
          }
          for (var i = 0, len = expectedTypes.length; i < len; i++) {
            if (isSameType(expectedTypes[i], type)) {
              return i
            }
          }
          return -1
        }

        function getInvalidTypeMessage(name, value, expectedTypes) {
          var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
            " Expected " + (expectedTypes.map(capitalize).join(', '));
          var expectedType = expectedTypes[0];
          var receivedType = toRawType(value);
          var expectedValue = styleValue(value, expectedType);
          var receivedValue = styleValue(value, receivedType);
          // check if we need to specify expected value
          if (expectedTypes.length === 1 &&
            isExplicable(expectedType) &&
            !isBoolean(expectedType, receivedType)) {
            message += " with value " + expectedValue;
          }
          message += ", got " + receivedType + " ";
          // check if we need to specify received value
          if (isExplicable(receivedType)) {
            message += "with value " + receivedValue + ".";
          }
          return message
        }

        function styleValue(value, type) {
          if (type === 'String') {
            return ("\"" + value + "\"")
          } else if (type === 'Number') {
            return ("" + (Number(value)))
          } else {
            return ("" + value)
          }
        }

        function isExplicable(value) {
          var explicitTypes = ['string', 'number', 'boolean'];
          return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
        }

        function isBoolean() {
          var args = [], len = arguments.length;
          while (len--) args[len] = arguments[len];

          return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
        }

        /*  */

        function handleError(err, vm, info) {
          // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
          // See: https://github.com/vuejs/vuex/issues/1505
          pushTarget();
          try {
            if (vm) {
              var cur = vm;
              while ((cur = cur.$parent)) {
                var hooks = cur.$options.errorCaptured;
                if (hooks) {
                  for (var i = 0; i < hooks.length; i++) {
                    try {
                      var capture = hooks[i].call(cur, err, vm, info) === false;
                      if (capture) { return }
                    } catch (e) {
                      globalHandleError(e, cur, 'errorCaptured hook');
                    }
                  }
                }
              }
            }
            globalHandleError(err, vm, info);
          } finally {
            popTarget();
          }
        }

        function invokeWithErrorHandling(
          handler,
          context,
          args,
          vm,
          info
        ) {
          var res;
          try {
            res = args ? handler.apply(context, args) : handler.call(context);
            if (res && !res._isVue && isPromise(res) && !res._handled) {
              res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
              // issue #9511
              // avoid catch triggering multiple times when nested calls
              res._handled = true;
            }
          } catch (e) {
            handleError(e, vm, info);
          }
          return res
        }

        function globalHandleError(err, vm, info) {
          if (config.errorHandler) {
            try {
              return config.errorHandler.call(null, err, vm, info)
            } catch (e) {
              // if the user intentionally throws the original error in the handler,
              // do not log it twice
              if (e !== err) {
                logError(e, null, 'config.errorHandler');
              }
            }
          }
          logError(err, vm, info);
        }

        function logError(err, vm, info) {
          if (true) {
            warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
          }
          /* istanbul ignore else */
          if ((inBrowser || inWeex) && typeof console !== 'undefined') {
            console.error(err);
          } else {
            throw err
          }
        }

        /*  */

        var callbacks = [];
        var pending = false;

        function flushCallbacks() {
          pending = false;
          var copies = callbacks.slice(0);
          callbacks.length = 0;
          for (var i = 0; i < copies.length; i++) {
            copies[i]();
          }
        }

        // Here we have async deferring wrappers using microtasks.
        // In 2.5 we used (macro) tasks (in combination with microtasks).
        // However, it has subtle problems when state is changed right before repaint
        // (e.g. #6813, out-in transitions).
        // Also, using (macro) tasks in event handler would cause some weird behaviors
        // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
        // So we now use microtasks everywhere, again.
        // A major drawback of this tradeoff is that there are some scenarios
        // where microtasks have too high a priority and fire in between supposedly
        // sequential events (e.g. #4521, #6690, which have workarounds)
        // or even between bubbling of the same event (#6566).
        var timerFunc;

        // The nextTick behavior leverages the microtask queue, which can be accessed
        // via either native Promise.then or MutationObserver.
        // MutationObserver has wider support, however it is seriously bugged in
        // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
        // completely stops working after triggering a few times... so, if native
        // Promise is available, we will use it:
        /* istanbul ignore next, $flow-disable-line */
        if (typeof Promise !== 'undefined' && isNative(Promise)) {
          var p = Promise.resolve();
          timerFunc = function () {
            p.then(flushCallbacks);
            // In problematic UIWebViews, Promise.then doesn't completely break, but
            // it can get stuck in a weird state where callbacks are pushed into the
            // microtask queue but the queue isn't being flushed, until the browser
            // needs to do some other work, e.g. handle a timer. Therefore we can
            // "force" the microtask queue to be flushed by adding an empty timer.
            if (isIOS) { setTimeout(noop); }
          };
        } else if (!isIE && typeof MutationObserver !== 'undefined' && (
          isNative(MutationObserver) ||
          // PhantomJS and iOS 7.x
          MutationObserver.toString() === '[object MutationObserverConstructor]'
        )) {
          // Use MutationObserver where native Promise is not available,
          // e.g. PhantomJS, iOS7, Android 4.4
          // (#6466 MutationObserver is unreliable in IE11)
          var counter = 1;
          var observer = new MutationObserver(flushCallbacks);
          var textNode = document.createTextNode(String(counter));
          observer.observe(textNode, {
            characterData: true
          });
          timerFunc = function () {
            counter = (counter + 1) % 2;
            textNode.data = String(counter);
          };
        } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
          // Fallback to setImmediate.
          // Technically it leverages the (macro) task queue,
          // but it is still a better choice than setTimeout.
          timerFunc = function () {
            setImmediate(flushCallbacks);
          };
        } else {
          // Fallback to setTimeout.
          timerFunc = function () {
            setTimeout(flushCallbacks, 0);
          };
        }

        function nextTick(cb, ctx) {
          var _resolve;
          callbacks.push(function () {
            if (cb) {
              try {
                cb.call(ctx);
              } catch (e) {
                handleError(e, ctx, 'nextTick');
              }
            } else if (_resolve) {
              _resolve(ctx);
            }
          });
          if (!pending) {
            pending = true;
            timerFunc();
          }
          // $flow-disable-line
          if (!cb && typeof Promise !== 'undefined') {
            return new Promise(function (resolve) {
              _resolve = resolve;
            })
          }
        }

        /*  */

        /* not type checking this file because flow doesn't play well with Proxy */

        var initProxy;

        if (true) {
          var allowedGlobals = makeMap(
            'Infinity,undefined,NaN,isFinite,isNaN,' +
            'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
            'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
            'require' // for Webpack/Browserify
          );

          var warnNonPresent = function (target, key) {
            warn(
              "Property or method \"" + key + "\" is not defined on the instance but " +
              'referenced during render. Make sure that this property is reactive, ' +
              'either in the data option, or for class-based components, by ' +
              'initializing the property. ' +
              'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
              target
            );
          };

          var warnReservedPrefix = function (target, key) {
            warn(
              "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
              'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
              'prevent conflicts with Vue internals. ' +
              'See: https://vuejs.org/v2/api/#data',
              target
            );
          };

          var hasProxy =
            typeof Proxy !== 'undefined' && isNative(Proxy);

          if (hasProxy) {
            var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
            config.keyCodes = new Proxy(config.keyCodes, {
              set: function set(target, key, value) {
                if (isBuiltInModifier(key)) {
                  warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
                  return false
                } else {
                  target[key] = value;
                  return true
                }
              }
            });
          }

          var hasHandler = {
            has: function has(target, key) {
              var has = key in target;
              var isAllowed = allowedGlobals(key) ||
                (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
              if (!has && !isAllowed) {
                if (key in target.$data) { warnReservedPrefix(target, key); }
                else { warnNonPresent(target, key); }
              }
              return has || !isAllowed
            }
          };

          var getHandler = {
            get: function get(target, key) {
              if (typeof key === 'string' && !(key in target)) {
                if (key in target.$data) { warnReservedPrefix(target, key); }
                else { warnNonPresent(target, key); }
              }
              return target[key]
            }
          };

          initProxy = function initProxy(vm) {
            if (hasProxy) {
              // determine which proxy handler to use
              var options = vm.$options;
              var handlers = options.render && options.render._withStripped
                ? getHandler
                : hasHandler;
              vm._renderProxy = new Proxy(vm, handlers);
            } else {
              vm._renderProxy = vm;
            }
          };
        }

        /*  */

        var seenObjects = new _Set();

        /**
         * Recursively traverse an object to evoke all converted
         * getters, so that every nested property inside the object
         * is collected as a "deep" dependency.
         */
        function traverse(val) {
          _traverse(val, seenObjects);
          seenObjects.clear();
        }

        function _traverse(val, seen) {
          var i, keys;
          var isA = Array.isArray(val);
          if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
            return
          }
          if (val.__ob__) {
            var depId = val.__ob__.dep.id;
            if (seen.has(depId)) {
              return
            }
            seen.add(depId);
          }
          if (isA) {
            i = val.length;
            while (i--) { _traverse(val[i], seen); }
          } else {
            keys = Object.keys(val);
            i = keys.length;
            while (i--) { _traverse(val[keys[i]], seen); }
          }
        }

        var mark;
        var measure;

        if (true) {
          var perf = inBrowser && window.performance;
          /* istanbul ignore if */
          if (
            perf &&
            perf.mark &&
            perf.measure &&
            perf.clearMarks &&
            perf.clearMeasures
          ) {
            mark = function (tag) { return perf.mark(tag); };
            measure = function (name, startTag, endTag) {
              perf.measure(name, startTag, endTag);
              perf.clearMarks(startTag);
              perf.clearMarks(endTag);
              // perf.clearMeasures(name)
            };
          }
        }

        /*  */

        var normalizeEvent = cached(function (name) {
          var passive = name.charAt(0) === '&';
          name = passive ? name.slice(1) : name;
          var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
          name = once$$1 ? name.slice(1) : name;
          var capture = name.charAt(0) === '!';
          name = capture ? name.slice(1) : name;
          return {
            name: name,
            once: once$$1,
            capture: capture,
            passive: passive
          }
        });

        function createFnInvoker(fns, vm) {
          function invoker() {
            var arguments$1 = arguments;

            var fns = invoker.fns;
            if (Array.isArray(fns)) {
              var cloned = fns.slice();
              for (var i = 0; i < cloned.length; i++) {
                invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
              }
            } else {
              // return handler return value for single handlers
              return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
            }
          }
          invoker.fns = fns;
          return invoker
        }

        function updateListeners(
          on,
          oldOn,
          add,
          remove$$1,
          createOnceHandler,
          vm
        ) {
          var name, def$$1, cur, old, event;
          for (name in on) {
            def$$1 = cur = on[name];
            old = oldOn[name];
            event = normalizeEvent(name);
            if (isUndef(cur)) {
              true && warn(
                "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
                vm
              );
            } else if (isUndef(old)) {
              if (isUndef(cur.fns)) {
                cur = on[name] = createFnInvoker(cur, vm);
              }
              if (isTrue(event.once)) {
                cur = on[name] = createOnceHandler(event.name, cur, event.capture);
              }
              add(event.name, cur, event.capture, event.passive, event.params);
            } else if (cur !== old) {
              old.fns = cur;
              on[name] = old;
            }
          }
          for (name in oldOn) {
            if (isUndef(on[name])) {
              event = normalizeEvent(name);
              remove$$1(event.name, oldOn[name], event.capture);
            }
          }
        }

        /*  */

        /*  */

        // fixed by xxxxxx (mp properties)
        function extractPropertiesFromVNodeData(data, Ctor, res, context) {
          var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
          if (isUndef(propOptions)) {
            return res
          }
          var externalClasses = Ctor.options.mpOptions.externalClasses || [];
          var attrs = data.attrs;
          var props = data.props;
          if (isDef(attrs) || isDef(props)) {
            for (var key in propOptions) {
              var altKey = hyphenate(key);
              var result = checkProp(res, props, key, altKey, true) ||
                checkProp(res, attrs, key, altKey, false);
              // externalClass
              if (
                result &&
                res[key] &&
                externalClasses.indexOf(altKey) !== -1 &&
                context[camelize(res[key])]
              ) {
                // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
                res[key] = context[camelize(res[key])];
              }
            }
          }
          return res
        }

        function extractPropsFromVNodeData(
          data,
          Ctor,
          tag,
          context// fixed by xxxxxx
        ) {
          // we are only extracting raw values here.
          // validation and default values are handled in the child
          // component itself.
          var propOptions = Ctor.options.props;
          if (isUndef(propOptions)) {
            // fixed by xxxxxx
            return extractPropertiesFromVNodeData(data, Ctor, {}, context)
          }
          var res = {};
          var attrs = data.attrs;
          var props = data.props;
          if (isDef(attrs) || isDef(props)) {
            for (var key in propOptions) {
              var altKey = hyphenate(key);
              if (true) {
                var keyInLowerCase = key.toLowerCase();
                if (
                  key !== keyInLowerCase &&
                  attrs && hasOwn(attrs, keyInLowerCase)
                ) {
                  tip(
                    "Prop \"" + keyInLowerCase + "\" is passed to component " +
                    (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
                    " \"" + key + "\". " +
                    "Note that HTML attributes are case-insensitive and camelCased " +
                    "props need to use their kebab-case equivalents when using in-DOM " +
                    "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
                  );
                }
              }
              checkProp(res, props, key, altKey, true) ||
                checkProp(res, attrs, key, altKey, false);
            }
          }
          // fixed by xxxxxx
          return extractPropertiesFromVNodeData(data, Ctor, res, context)
        }

        function checkProp(
          res,
          hash,
          key,
          altKey,
          preserve
        ) {
          if (isDef(hash)) {
            if (hasOwn(hash, key)) {
              res[key] = hash[key];
              if (!preserve) {
                delete hash[key];
              }
              return true
            } else if (hasOwn(hash, altKey)) {
              res[key] = hash[altKey];
              if (!preserve) {
                delete hash[altKey];
              }
              return true
            }
          }
          return false
        }

        /*  */

        // The template compiler attempts to minimize the need for normalization by
        // statically analyzing the template at compile time.
        //
        // For plain HTML markup, normalization can be completely skipped because the
        // generated render function is guaranteed to return Array<VNode>. There are
        // two cases where extra normalization is needed:

        // 1. When the children contains components - because a functional component
        // may return an Array instead of a single root. In this case, just a simple
        // normalization is needed - if any child is an Array, we flatten the whole
        // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
        // because functional components already normalize their own children.
        function simpleNormalizeChildren(children) {
          for (var i = 0; i < children.length; i++) {
            if (Array.isArray(children[i])) {
              return Array.prototype.concat.apply([], children)
            }
          }
          return children
        }

        // 2. When the children contains constructs that always generated nested Arrays,
        // e.g. <template>, <slot>, v-for, or when the children is provided by user
        // with hand-written render functions / JSX. In such cases a full normalization
        // is needed to cater to all possible types of children values.
        function normalizeChildren(children) {
          return isPrimitive(children)
            ? [createTextVNode(children)]
            : Array.isArray(children)
              ? normalizeArrayChildren(children)
              : undefined
        }

        function isTextNode(node) {
          return isDef(node) && isDef(node.text) && isFalse(node.isComment)
        }

        function normalizeArrayChildren(children, nestedIndex) {
          var res = [];
          var i, c, lastIndex, last;
          for (i = 0; i < children.length; i++) {
            c = children[i];
            if (isUndef(c) || typeof c === 'boolean') { continue }
            lastIndex = res.length - 1;
            last = res[lastIndex];
            //  nested
            if (Array.isArray(c)) {
              if (c.length > 0) {
                c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
                // merge adjacent text nodes
                if (isTextNode(c[0]) && isTextNode(last)) {
                  res[lastIndex] = createTextVNode(last.text + (c[0]).text);
                  c.shift();
                }
                res.push.apply(res, c);
              }
            } else if (isPrimitive(c)) {
              if (isTextNode(last)) {
                // merge adjacent text nodes
                // this is necessary for SSR hydration because text nodes are
                // essentially merged when rendered to HTML strings
                res[lastIndex] = createTextVNode(last.text + c);
              } else if (c !== '') {
                // convert primitive to vnode
                res.push(createTextVNode(c));
              }
            } else {
              if (isTextNode(c) && isTextNode(last)) {
                // merge adjacent text nodes
                res[lastIndex] = createTextVNode(last.text + c.text);
              } else {
                // default key for nested array children (likely generated by v-for)
                if (isTrue(children._isVList) &&
                  isDef(c.tag) &&
                  isUndef(c.key) &&
                  isDef(nestedIndex)) {
                  c.key = "__vlist" + nestedIndex + "_" + i + "__";
                }
                res.push(c);
              }
            }
          }
          return res
        }

        /*  */

        function initProvide(vm) {
          var provide = vm.$options.provide;
          if (provide) {
            vm._provided = typeof provide === 'function'
              ? provide.call(vm)
              : provide;
          }
        }

        function initInjections(vm) {
          var result = resolveInject(vm.$options.inject, vm);
          if (result) {
            toggleObserving(false);
            Object.keys(result).forEach(function (key) {
              /* istanbul ignore else */
              if (true) {
                defineReactive$$1(vm, key, result[key], function () {
                  warn(
                    "Avoid mutating an injected value directly since the changes will be " +
                    "overwritten whenever the provided component re-renders. " +
                    "injection being mutated: \"" + key + "\"",
                    vm
                  );
                });
              } else { }
            });
            toggleObserving(true);
          }
        }

        function resolveInject(inject, vm) {
          if (inject) {
            // inject is :any because flow is not smart enough to figure out cached
            var result = Object.create(null);
            var keys = hasSymbol
              ? Reflect.ownKeys(inject)
              : Object.keys(inject);

            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              // #6574 in case the inject object is observed...
              if (key === '__ob__') { continue }
              var provideKey = inject[key].from;
              var source = vm;
              while (source) {
                if (source._provided && hasOwn(source._provided, provideKey)) {
                  result[key] = source._provided[provideKey];
                  break
                }
                source = source.$parent;
              }
              if (!source) {
                if ('default' in inject[key]) {
                  var provideDefault = inject[key].default;
                  result[key] = typeof provideDefault === 'function'
                    ? provideDefault.call(vm)
                    : provideDefault;
                } else if (true) {
                  warn(("Injection \"" + key + "\" not found"), vm);
                }
              }
            }
            return result
          }
        }

        /*  */



        /**
         * Runtime helper for resolving raw children VNodes into a slot object.
         */
        function resolveSlots(
          children,
          context
        ) {
          if (!children || !children.length) {
            return {}
          }
          var slots = {};
          for (var i = 0, l = children.length; i < l; i++) {
            var child = children[i];
            var data = child.data;
            // remove slot attribute if the node is resolved as a Vue slot node
            if (data && data.attrs && data.attrs.slot) {
              delete data.attrs.slot;
            }
            // named slots should only be respected if the vnode was rendered in the
            // same context.
            if ((child.context === context || child.fnContext === context) &&
              data && data.slot != null
            ) {
              var name = data.slot;
              var slot = (slots[name] || (slots[name] = []));
              if (child.tag === 'template') {
                slot.push.apply(slot, child.children || []);
              } else {
                slot.push(child);
              }
            } else {
              // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
              if (child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page') {
                (slots['page'] || (slots['page'] = [])).push(child);
              } else {
                (slots.default || (slots.default = [])).push(child);
              }
            }
          }
          // ignore slots that contains only whitespace
          for (var name$1 in slots) {
            if (slots[name$1].every(isWhitespace)) {
              delete slots[name$1];
            }
          }
          return slots
        }

        function isWhitespace(node) {
          return (node.isComment && !node.asyncFactory) || node.text === ' '
        }

        /*  */

        function normalizeScopedSlots(
          slots,
          normalSlots,
          prevSlots
        ) {
          var res;
          var hasNormalSlots = Object.keys(normalSlots).length > 0;
          var isStable = slots ? !!slots.$stable : !hasNormalSlots;
          var key = slots && slots.$key;
          if (!slots) {
            res = {};
          } else if (slots._normalized) {
            // fast path 1: child component re-render only, parent did not change
            return slots._normalized
          } else if (
            isStable &&
            prevSlots &&
            prevSlots !== emptyObject &&
            key === prevSlots.$key &&
            !hasNormalSlots &&
            !prevSlots.$hasNormal
          ) {
            // fast path 2: stable scoped slots w/ no normal slots to proxy,
            // only need to normalize once
            return prevSlots
          } else {
            res = {};
            for (var key$1 in slots) {
              if (slots[key$1] && key$1[0] !== '$') {
                res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
              }
            }
          }
          // expose normal slots on scopedSlots
          for (var key$2 in normalSlots) {
            if (!(key$2 in res)) {
              res[key$2] = proxyNormalSlot(normalSlots, key$2);
            }
          }
          // avoriaz seems to mock a non-extensible $scopedSlots object
          // and when that is passed down this would cause an error
          if (slots && Object.isExtensible(slots)) {
            (slots)._normalized = res;
          }
          def(res, '$stable', isStable);
          def(res, '$key', key);
          def(res, '$hasNormal', hasNormalSlots);
          return res
        }

        function normalizeScopedSlot(normalSlots, key, fn) {
          var normalized = function () {
            var res = arguments.length ? fn.apply(null, arguments) : fn({});
            res = res && typeof res === 'object' && !Array.isArray(res)
              ? [res] // single vnode
              : normalizeChildren(res);
            return res && (
              res.length === 0 ||
              (res.length === 1 && res[0].isComment) // #9658
            ) ? undefined
              : res
          };
          // this is a slot using the new v-slot syntax without scope. although it is
          // compiled as a scoped slot, render fn users would expect it to be present
          // on this.$slots because the usage is semantically a normal slot.
          if (fn.proxy) {
            Object.defineProperty(normalSlots, key, {
              get: normalized,
              enumerable: true,
              configurable: true
            });
          }
          return normalized
        }

        function proxyNormalSlot(slots, key) {
          return function () { return slots[key]; }
        }

        /*  */

        /**
         * Runtime helper for rendering v-for lists.
         */
        function renderList(
          val,
          render
        ) {
          var ret, i, l, keys, key;
          if (Array.isArray(val) || typeof val === 'string') {
            ret = new Array(val.length);
            for (i = 0, l = val.length; i < l; i++) {
              ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
            }
          } else if (typeof val === 'number') {
            ret = new Array(val);
            for (i = 0; i < val; i++) {
              ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
            }
          } else if (isObject(val)) {
            if (hasSymbol && val[Symbol.iterator]) {
              ret = [];
              var iterator = val[Symbol.iterator]();
              var result = iterator.next();
              while (!result.done) {
                ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
                result = iterator.next();
              }
            } else {
              keys = Object.keys(val);
              ret = new Array(keys.length);
              for (i = 0, l = keys.length; i < l; i++) {
                key = keys[i];
                ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
              }
            }
          }
          if (!isDef(ret)) {
            ret = [];
          }
          (ret)._isVList = true;
          return ret
        }

        /*  */

        /**
         * Runtime helper for rendering <slot>
         */
        function renderSlot(
          name,
          fallback,
          props,
          bindObject
        ) {
          var scopedSlotFn = this.$scopedSlots[name];
          var nodes;
          if (scopedSlotFn) { // scoped slot
            props = props || {};
            if (bindObject) {
              if (true && !isObject(bindObject)) {
                warn(
                  'slot v-bind without argument expects an Object',
                  this
                );
              }
              props = extend(extend({}, bindObject), props);
            }
            // fixed by xxxxxx app-plus scopedSlot
            nodes = scopedSlotFn(props, this, props._i) || fallback;
          } else {
            nodes = this.$slots[name] || fallback;
          }

          var target = props && props.slot;
          if (target) {
            return this.$createElement('template', { slot: target }, nodes)
          } else {
            return nodes
          }
        }

        /*  */

        /**
         * Runtime helper for resolving filters
         */
        function resolveFilter(id) {
          return resolveAsset(this.$options, 'filters', id, true) || identity
        }

        /*  */

        function isKeyNotMatch(expect, actual) {
          if (Array.isArray(expect)) {
            return expect.indexOf(actual) === -1
          } else {
            return expect !== actual
          }
        }

        /**
         * Runtime helper for checking keyCodes from config.
         * exposed as Vue.prototype._k
         * passing in eventKeyName as last argument separately for backwards compat
         */
        function checkKeyCodes(
          eventKeyCode,
          key,
          builtInKeyCode,
          eventKeyName,
          builtInKeyName
        ) {
          var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
          if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
            return isKeyNotMatch(builtInKeyName, eventKeyName)
          } else if (mappedKeyCode) {
            return isKeyNotMatch(mappedKeyCode, eventKeyCode)
          } else if (eventKeyName) {
            return hyphenate(eventKeyName) !== key
          }
        }

        /*  */

        /**
         * Runtime helper for merging v-bind="object" into a VNode's data.
         */
        function bindObjectProps(
          data,
          tag,
          value,
          asProp,
          isSync
        ) {
          if (value) {
            if (!isObject(value)) {
              true && warn(
                'v-bind without argument expects an Object or Array value',
                this
              );
            } else {
              if (Array.isArray(value)) {
                value = toObject(value);
              }
              var hash;
              var loop = function (key) {
                if (
                  key === 'class' ||
                  key === 'style' ||
                  isReservedAttribute(key)
                ) {
                  hash = data;
                } else {
                  var type = data.attrs && data.attrs.type;
                  hash = asProp || config.mustUseProp(tag, type, key)
                    ? data.domProps || (data.domProps = {})
                    : data.attrs || (data.attrs = {});
                }
                var camelizedKey = camelize(key);
                var hyphenatedKey = hyphenate(key);
                if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
                  hash[key] = value[key];

                  if (isSync) {
                    var on = data.on || (data.on = {});
                    on[("update:" + key)] = function ($event) {
                      value[key] = $event;
                    };
                  }
                }
              };

              for (var key in value) loop(key);
            }
          }
          return data
        }

        /*  */

        /**
         * Runtime helper for rendering static trees.
         */
        function renderStatic(
          index,
          isInFor
        ) {
          var cached = this._staticTrees || (this._staticTrees = []);
          var tree = cached[index];
          // if has already-rendered static tree and not inside v-for,
          // we can reuse the same tree.
          if (tree && !isInFor) {
            return tree
          }
          // otherwise, render a fresh tree.
          tree = cached[index] = this.$options.staticRenderFns[index].call(
            this._renderProxy,
            null,
            this // for render fns generated for functional component templates
          );
          markStatic(tree, ("__static__" + index), false);
          return tree
        }

        /**
         * Runtime helper for v-once.
         * Effectively it means marking the node as static with a unique key.
         */
        function markOnce(
          tree,
          index,
          key
        ) {
          markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
          return tree
        }

        function markStatic(
          tree,
          key,
          isOnce
        ) {
          if (Array.isArray(tree)) {
            for (var i = 0; i < tree.length; i++) {
              if (tree[i] && typeof tree[i] !== 'string') {
                markStaticNode(tree[i], (key + "_" + i), isOnce);
              }
            }
          } else {
            markStaticNode(tree, key, isOnce);
          }
        }

        function markStaticNode(node, key, isOnce) {
          node.isStatic = true;
          node.key = key;
          node.isOnce = isOnce;
        }

        /*  */

        function bindObjectListeners(data, value) {
          if (value) {
            if (!isPlainObject(value)) {
              true && warn(
                'v-on without argument expects an Object value',
                this
              );
            } else {
              var on = data.on = data.on ? extend({}, data.on) : {};
              for (var key in value) {
                var existing = on[key];
                var ours = value[key];
                on[key] = existing ? [].concat(existing, ours) : ours;
              }
            }
          }
          return data
        }

        /*  */

        function resolveScopedSlots(
          fns, // see flow/vnode
          res,
          // the following are added in 2.6
          hasDynamicKeys,
          contentHashKey
        ) {
          res = res || { $stable: !hasDynamicKeys };
          for (var i = 0; i < fns.length; i++) {
            var slot = fns[i];
            if (Array.isArray(slot)) {
              resolveScopedSlots(slot, res, hasDynamicKeys);
            } else if (slot) {
              // marker for reverse proxying v-slot without scope on this.$slots
              if (slot.proxy) {
                slot.fn.proxy = true;
              }
              res[slot.key] = slot.fn;
            }
          }
          if (contentHashKey) {
            (res).$key = contentHashKey;
          }
          return res
        }

        /*  */

        function bindDynamicKeys(baseObj, values) {
          for (var i = 0; i < values.length; i += 2) {
            var key = values[i];
            if (typeof key === 'string' && key) {
              baseObj[values[i]] = values[i + 1];
            } else if (true && key !== '' && key !== null) {
              // null is a special value for explicitly removing a binding
              warn(
                ("Invalid value for dynamic directive argument (expected string or null): " + key),
                this
              );
            }
          }
          return baseObj
        }

        // helper to dynamically append modifier runtime markers to event names.
        // ensure only append when value is already string, otherwise it will be cast
        // to string and cause the type check to miss.
        function prependModifier(value, symbol) {
          return typeof value === 'string' ? symbol + value : value
        }

        /*  */

        function installRenderHelpers(target) {
          target._o = markOnce;
          target._n = toNumber;
          target._s = toString;
          target._l = renderList;
          target._t = renderSlot;
          target._q = looseEqual;
          target._i = looseIndexOf;
          target._m = renderStatic;
          target._f = resolveFilter;
          target._k = checkKeyCodes;
          target._b = bindObjectProps;
          target._v = createTextVNode;
          target._e = createEmptyVNode;
          target._u = resolveScopedSlots;
          target._g = bindObjectListeners;
          target._d = bindDynamicKeys;
          target._p = prependModifier;
        }

        /*  */

        function FunctionalRenderContext(
          data,
          props,
          children,
          parent,
          Ctor
        ) {
          var this$1 = this;

          var options = Ctor.options;
          // ensure the createElement function in functional components
          // gets a unique context - this is necessary for correct named slot check
          var contextVm;
          if (hasOwn(parent, '_uid')) {
            contextVm = Object.create(parent);
            // $flow-disable-line
            contextVm._original = parent;
          } else {
            // the context vm passed in is a functional context as well.
            // in this case we want to make sure we are able to get a hold to the
            // real context instance.
            contextVm = parent;
            // $flow-disable-line
            parent = parent._original;
          }
          var isCompiled = isTrue(options._compiled);
          var needNormalization = !isCompiled;

          this.data = data;
          this.props = props;
          this.children = children;
          this.parent = parent;
          this.listeners = data.on || emptyObject;
          this.injections = resolveInject(options.inject, parent);
          this.slots = function () {
            if (!this$1.$slots) {
              normalizeScopedSlots(
                data.scopedSlots,
                this$1.$slots = resolveSlots(children, parent)
              );
            }
            return this$1.$slots
          };

          Object.defineProperty(this, 'scopedSlots', ({
            enumerable: true,
            get: function get() {
              return normalizeScopedSlots(data.scopedSlots, this.slots())
            }
          }));

          // support for compiled functional template
          if (isCompiled) {
            // exposing $options for renderStatic()
            this.$options = options;
            // pre-resolve slots for renderSlot()
            this.$slots = this.slots();
            this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
          }

          if (options._scopeId) {
            this._c = function (a, b, c, d) {
              var vnode = createElement(contextVm, a, b, c, d, needNormalization);
              if (vnode && !Array.isArray(vnode)) {
                vnode.fnScopeId = options._scopeId;
                vnode.fnContext = parent;
              }
              return vnode
            };
          } else {
            this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
          }
        }

        installRenderHelpers(FunctionalRenderContext.prototype);

        function createFunctionalComponent(
          Ctor,
          propsData,
          data,
          contextVm,
          children
        ) {
          var options = Ctor.options;
          var props = {};
          var propOptions = options.props;
          if (isDef(propOptions)) {
            for (var key in propOptions) {
              props[key] = validateProp(key, propOptions, propsData || emptyObject);
            }
          } else {
            if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
            if (isDef(data.props)) { mergeProps(props, data.props); }
          }

          var renderContext = new FunctionalRenderContext(
            data,
            props,
            children,
            contextVm,
            Ctor
          );

          var vnode = options.render.call(null, renderContext._c, renderContext);

          if (vnode instanceof VNode) {
            return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
          } else if (Array.isArray(vnode)) {
            var vnodes = normalizeChildren(vnode) || [];
            var res = new Array(vnodes.length);
            for (var i = 0; i < vnodes.length; i++) {
              res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
            }
            return res
          }
        }

        function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
          // #7817 clone node before setting fnContext, otherwise if the node is reused
          // (e.g. it was from a cached normal slot) the fnContext causes named slots
          // that should not be matched to match.
          var clone = cloneVNode(vnode);
          clone.fnContext = contextVm;
          clone.fnOptions = options;
          if (true) {
            (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
          }
          if (data.slot) {
            (clone.data || (clone.data = {})).slot = data.slot;
          }
          return clone
        }

        function mergeProps(to, from) {
          for (var key in from) {
            to[camelize(key)] = from[key];
          }
        }

        /*  */

        /*  */

        /*  */

        /*  */

        // inline hooks to be invoked on component VNodes during patch
        var componentVNodeHooks = {
          init: function init(vnode, hydrating) {
            if (
              vnode.componentInstance &&
              !vnode.componentInstance._isDestroyed &&
              vnode.data.keepAlive
            ) {
              // kept-alive components, treat as a patch
              var mountedNode = vnode; // work around flow
              componentVNodeHooks.prepatch(mountedNode, mountedNode);
            } else {
              var child = vnode.componentInstance = createComponentInstanceForVnode(
                vnode,
                activeInstance
              );
              child.$mount(hydrating ? vnode.elm : undefined, hydrating);
            }
          },

          prepatch: function prepatch(oldVnode, vnode) {
            var options = vnode.componentOptions;
            var child = vnode.componentInstance = oldVnode.componentInstance;
            updateChildComponent(
              child,
              options.propsData, // updated props
              options.listeners, // updated listeners
              vnode, // new parent vnode
              options.children // new children
            );
          },

          insert: function insert(vnode) {
            var context = vnode.context;
            var componentInstance = vnode.componentInstance;
            if (!componentInstance._isMounted) {
              callHook(componentInstance, 'onServiceCreated');
              callHook(componentInstance, 'onServiceAttached');
              componentInstance._isMounted = true;
              callHook(componentInstance, 'mounted');
            }
            if (vnode.data.keepAlive) {
              if (context._isMounted) {
                // vue-router#1212
                // During updates, a kept-alive component's child components may
                // change, so directly walking the tree here may call activated hooks
                // on incorrect children. Instead we push them into a queue which will
                // be processed after the whole patch process ended.
                queueActivatedComponent(componentInstance);
              } else {
                activateChildComponent(componentInstance, true /* direct */);
              }
            }
          },

          destroy: function destroy(vnode) {
            var componentInstance = vnode.componentInstance;
            if (!componentInstance._isDestroyed) {
              if (!vnode.data.keepAlive) {
                componentInstance.$destroy();
              } else {
                deactivateChildComponent(componentInstance, true /* direct */);
              }
            }
          }
        };

        var hooksToMerge = Object.keys(componentVNodeHooks);

        function createComponent(
          Ctor,
          data,
          context,
          children,
          tag
        ) {
          if (isUndef(Ctor)) {
            return
          }

          var baseCtor = context.$options._base;

          // plain options object: turn it into a constructor
          if (isObject(Ctor)) {
            Ctor = baseCtor.extend(Ctor);
          }

          // if at this stage it's not a constructor or an async component factory,
          // reject.
          if (typeof Ctor !== 'function') {
            if (true) {
              warn(("Invalid Component definition: " + (String(Ctor))), context);
            }
            return
          }

          // async component
          var asyncFactory;
          if (isUndef(Ctor.cid)) {
            asyncFactory = Ctor;
            Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
            if (Ctor === undefined) {
              // return a placeholder node for async component, which is rendered
              // as a comment node but preserves all the raw information for the node.
              // the information will be used for async server-rendering and hydration.
              return createAsyncPlaceholder(
                asyncFactory,
                data,
                context,
                children,
                tag
              )
            }
          }

          data = data || {};

          // resolve constructor options in case global mixins are applied after
          // component constructor creation
          resolveConstructorOptions(Ctor);

          // transform component v-model data into props & events
          if (isDef(data.model)) {
            transformModel(Ctor.options, data);
          }

          // extract props
          var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

          // functional component
          if (isTrue(Ctor.options.functional)) {
            return createFunctionalComponent(Ctor, propsData, data, context, children)
          }

          // extract listeners, since these needs to be treated as
          // child component listeners instead of DOM listeners
          var listeners = data.on;
          // replace with listeners with .native modifier
          // so it gets processed during parent component patch.
          data.on = data.nativeOn;

          if (isTrue(Ctor.options.abstract)) {
            // abstract components do not keep anything
            // other than props & listeners & slot

            // work around flow
            var slot = data.slot;
            data = {};
            if (slot) {
              data.slot = slot;
            }
          }

          // install component management hooks onto the placeholder node
          installComponentHooks(data);

          // return a placeholder vnode
          var name = Ctor.options.name || tag;
          var vnode = new VNode(
            ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
            data, undefined, undefined, undefined, context,
            { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
            asyncFactory
          );

          return vnode
        }

        function createComponentInstanceForVnode(
          vnode, // we know it's MountedComponentVNode but flow doesn't
          parent // activeInstance in lifecycle state
        ) {
          var options = {
            _isComponent: true,
            _parentVnode: vnode,
            parent: parent
          };
          // check inline-template render functions
          var inlineTemplate = vnode.data.inlineTemplate;
          if (isDef(inlineTemplate)) {
            options.render = inlineTemplate.render;
            options.staticRenderFns = inlineTemplate.staticRenderFns;
          }
          return new vnode.componentOptions.Ctor(options)
        }

        function installComponentHooks(data) {
          var hooks = data.hook || (data.hook = {});
          for (var i = 0; i < hooksToMerge.length; i++) {
            var key = hooksToMerge[i];
            var existing = hooks[key];
            var toMerge = componentVNodeHooks[key];
            if (existing !== toMerge && !(existing && existing._merged)) {
              hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
            }
          }
        }

        function mergeHook$1(f1, f2) {
          var merged = function (a, b) {
            // flow complains about extra args which is why we use any
            f1(a, b);
            f2(a, b);
          };
          merged._merged = true;
          return merged
        }

        // transform component v-model info (value and callback) into
        // prop and event handler respectively.
        function transformModel(options, data) {
          var prop = (options.model && options.model.prop) || 'value';
          var event = (options.model && options.model.event) || 'input'
            ; (data.attrs || (data.attrs = {}))[prop] = data.model.value;
          var on = data.on || (data.on = {});
          var existing = on[event];
          var callback = data.model.callback;
          if (isDef(existing)) {
            if (
              Array.isArray(existing)
                ? existing.indexOf(callback) === -1
                : existing !== callback
            ) {
              on[event] = [callback].concat(existing);
            }
          } else {
            on[event] = callback;
          }
        }

        /*  */

        var SIMPLE_NORMALIZE = 1;
        var ALWAYS_NORMALIZE = 2;

        // wrapper function for providing a more flexible interface
        // without getting yelled at by flow
        function createElement(
          context,
          tag,
          data,
          children,
          normalizationType,
          alwaysNormalize
        ) {
          if (Array.isArray(data) || isPrimitive(data)) {
            normalizationType = children;
            children = data;
            data = undefined;
          }
          if (isTrue(alwaysNormalize)) {
            normalizationType = ALWAYS_NORMALIZE;
          }
          return _createElement(context, tag, data, children, normalizationType)
        }

        function _createElement(
          context,
          tag,
          data,
          children,
          normalizationType
        ) {
          if (isDef(data) && isDef((data).__ob__)) {
            true && warn(
              "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
              'Always create fresh vnode data objects in each render!',
              context
            );
            return createEmptyVNode()
          }
          // object syntax in v-bind
          if (isDef(data) && isDef(data.is)) {
            tag = data.is;
          }
          if (!tag) {
            // in case of component :is set to falsy value
            return createEmptyVNode()
          }
          // warn against non-primitive key
          if (true &&
            isDef(data) && isDef(data.key) && !isPrimitive(data.key)
          ) {
            {
              warn(
                'Avoid using non-primitive value as key, ' +
                'use string/number value instead.',
                context
              );
            }
          }
          // support single function children as default scoped slot
          if (Array.isArray(children) &&
            typeof children[0] === 'function'
          ) {
            data = data || {};
            data.scopedSlots = { default: children[0] };
            children.length = 0;
          }
          if (normalizationType === ALWAYS_NORMALIZE) {
            children = normalizeChildren(children);
          } else if (normalizationType === SIMPLE_NORMALIZE) {
            children = simpleNormalizeChildren(children);
          }
          var vnode, ns;
          if (typeof tag === 'string') {
            var Ctor;
            ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
            if (config.isReservedTag(tag)) {
              // platform built-in elements
              if (true && isDef(data) && isDef(data.nativeOn)) {
                warn(
                  ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
                  context
                );
              }
              vnode = new VNode(
                config.parsePlatformTagName(tag), data, children,
                undefined, undefined, context
              );
            } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
              // component
              vnode = createComponent(Ctor, data, context, children, tag);
            } else {
              // unknown or unlisted namespaced elements
              // check at runtime because it may get assigned a namespace when its
              // parent normalizes children
              vnode = new VNode(
                tag, data, children,
                undefined, undefined, context
              );
            }
          } else {
            // direct component options / constructor
            vnode = createComponent(tag, data, context, children);
          }
          if (Array.isArray(vnode)) {
            return vnode
          } else if (isDef(vnode)) {
            if (isDef(ns)) { applyNS(vnode, ns); }
            if (isDef(data)) { registerDeepBindings(data); }
            return vnode
          } else {
            return createEmptyVNode()
          }
        }

        function applyNS(vnode, ns, force) {
          vnode.ns = ns;
          if (vnode.tag === 'foreignObject') {
            // use default namespace inside foreignObject
            ns = undefined;
            force = true;
          }
          if (isDef(vnode.children)) {
            for (var i = 0, l = vnode.children.length; i < l; i++) {
              var child = vnode.children[i];
              if (isDef(child.tag) && (
                isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
                applyNS(child, ns, force);
              }
            }
          }
        }

        // ref #5318
        // necessary to ensure parent re-render when deep bindings like :style and
        // :class are used on slot nodes
        function registerDeepBindings(data) {
          if (isObject(data.style)) {
            traverse(data.style);
          }
          if (isObject(data.class)) {
            traverse(data.class);
          }
        }

        /*  */

        function initRender(vm) {
          vm._vnode = null; // the root of the child tree
          vm._staticTrees = null; // v-once cached trees
          var options = vm.$options;
          var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
          var renderContext = parentVnode && parentVnode.context;
          vm.$slots = resolveSlots(options._renderChildren, renderContext);
          vm.$scopedSlots = emptyObject;
          // bind the createElement fn to this instance
          // so that we get proper render context inside it.
          // args order: tag, data, children, normalizationType, alwaysNormalize
          // internal version is used by render functions compiled from templates
          vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
          // normalization is always applied for the public version, used in
          // user-written render functions.
          vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

          // $attrs & $listeners are exposed for easier HOC creation.
          // they need to be reactive so that HOCs using them are always updated
          var parentData = parentVnode && parentVnode.data;

          /* istanbul ignore else */
          if (true) {
            defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
              !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
            }, true);
            defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
              !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
            }, true);
          } else { }
        }

        var currentRenderingInstance = null;

        function renderMixin(Vue) {
          // install runtime convenience helpers
          installRenderHelpers(Vue.prototype);

          Vue.prototype.$nextTick = function (fn) {
            return nextTick(fn, this)
          };

          Vue.prototype._render = function () {
            var vm = this;
            var ref = vm.$options;
            var render = ref.render;
            var _parentVnode = ref._parentVnode;

            if (_parentVnode) {
              vm.$scopedSlots = normalizeScopedSlots(
                _parentVnode.data.scopedSlots,
                vm.$slots,
                vm.$scopedSlots
              );
            }

            // set parent vnode. this allows render functions to have access
            // to the data on the placeholder node.
            vm.$vnode = _parentVnode;
            // render self
            var vnode;
            try {
              // There's no need to maintain a stack because all render fns are called
              // separately from one another. Nested component's render fns are called
              // when parent component is patched.
              currentRenderingInstance = vm;
              vnode = render.call(vm._renderProxy, vm.$createElement);
            } catch (e) {
              handleError(e, vm, "render");
              // return error render result,
              // or previous vnode to prevent render error causing blank component
              /* istanbul ignore else */
              if (true && vm.$options.renderError) {
                try {
                  vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
                } catch (e) {
                  handleError(e, vm, "renderError");
                  vnode = vm._vnode;
                }
              } else {
                vnode = vm._vnode;
              }
            } finally {
              currentRenderingInstance = null;
            }
            // if the returned array contains only a single node, allow it
            if (Array.isArray(vnode) && vnode.length === 1) {
              vnode = vnode[0];
            }
            // return empty vnode in case the render function errored out
            if (!(vnode instanceof VNode)) {
              if (true && Array.isArray(vnode)) {
                warn(
                  'Multiple root nodes returned from render function. Render function ' +
                  'should return a single root node.',
                  vm
                );
              }
              vnode = createEmptyVNode();
            }
            // set parent
            vnode.parent = _parentVnode;
            return vnode
          };
        }

        /*  */

        function ensureCtor(comp, base) {
          if (
            comp.__esModule ||
            (hasSymbol && comp[Symbol.toStringTag] === 'Module')
          ) {
            comp = comp.default;
          }
          return isObject(comp)
            ? base.extend(comp)
            : comp
        }

        function createAsyncPlaceholder(
          factory,
          data,
          context,
          children,
          tag
        ) {
          var node = createEmptyVNode();
          node.asyncFactory = factory;
          node.asyncMeta = { data: data, context: context, children: children, tag: tag };
          return node
        }

        function resolveAsyncComponent(
          factory,
          baseCtor
        ) {
          if (isTrue(factory.error) && isDef(factory.errorComp)) {
            return factory.errorComp
          }

          if (isDef(factory.resolved)) {
            return factory.resolved
          }

          var owner = currentRenderingInstance;
          if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
            // already pending
            factory.owners.push(owner);
          }

          if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
            return factory.loadingComp
          }

          if (owner && !isDef(factory.owners)) {
            var owners = factory.owners = [owner];
            var sync = true;
            var timerLoading = null;
            var timerTimeout = null

              ; (owner).$on('hook:destroyed', function () { return remove(owners, owner); });

            var forceRender = function (renderCompleted) {
              for (var i = 0, l = owners.length; i < l; i++) {
                (owners[i]).$forceUpdate();
              }

              if (renderCompleted) {
                owners.length = 0;
                if (timerLoading !== null) {
                  clearTimeout(timerLoading);
                  timerLoading = null;
                }
                if (timerTimeout !== null) {
                  clearTimeout(timerTimeout);
                  timerTimeout = null;
                }
              }
            };

            var resolve = once(function (res) {
              // cache resolved
              factory.resolved = ensureCtor(res, baseCtor);
              // invoke callbacks only if this is not a synchronous resolve
              // (async resolves are shimmed as synchronous during SSR)
              if (!sync) {
                forceRender(true);
              } else {
                owners.length = 0;
              }
            });

            var reject = once(function (reason) {
              true && warn(
                "Failed to resolve async component: " + (String(factory)) +
                (reason ? ("\nReason: " + reason) : '')
              );
              if (isDef(factory.errorComp)) {
                factory.error = true;
                forceRender(true);
              }
            });

            var res = factory(resolve, reject);

            if (isObject(res)) {
              if (isPromise(res)) {
                // () => Promise
                if (isUndef(factory.resolved)) {
                  res.then(resolve, reject);
                }
              } else if (isPromise(res.component)) {
                res.component.then(resolve, reject);

                if (isDef(res.error)) {
                  factory.errorComp = ensureCtor(res.error, baseCtor);
                }

                if (isDef(res.loading)) {
                  factory.loadingComp = ensureCtor(res.loading, baseCtor);
                  if (res.delay === 0) {
                    factory.loading = true;
                  } else {
                    timerLoading = setTimeout(function () {
                      timerLoading = null;
                      if (isUndef(factory.resolved) && isUndef(factory.error)) {
                        factory.loading = true;
                        forceRender(false);
                      }
                    }, res.delay || 200);
                  }
                }

                if (isDef(res.timeout)) {
                  timerTimeout = setTimeout(function () {
                    timerTimeout = null;
                    if (isUndef(factory.resolved)) {
                      reject(
                        true
                          ? ("timeout (" + (res.timeout) + "ms)")
                          : undefined
                      );
                    }
                  }, res.timeout);
                }
              }
            }

            sync = false;
            // return in case resolved synchronously
            return factory.loading
              ? factory.loadingComp
              : factory.resolved
          }
        }

        /*  */

        function isAsyncPlaceholder(node) {
          return node.isComment && node.asyncFactory
        }

        /*  */

        function getFirstComponentChild(children) {
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              var c = children[i];
              if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                return c
              }
            }
          }
        }

        /*  */

        /*  */

        function initEvents(vm) {
          vm._events = Object.create(null);
          vm._hasHookEvent = false;
          // init parent attached events
          var listeners = vm.$options._parentListeners;
          if (listeners) {
            updateComponentListeners(vm, listeners);
          }
        }

        var target;

        function add(event, fn) {
          target.$on(event, fn);
        }

        function remove$1(event, fn) {
          target.$off(event, fn);
        }

        function createOnceHandler(event, fn) {
          var _target = target;
          return function onceHandler() {
            var res = fn.apply(null, arguments);
            if (res !== null) {
              _target.$off(event, onceHandler);
            }
          }
        }

        function updateComponentListeners(
          vm,
          listeners,
          oldListeners
        ) {
          target = vm;
          updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
          target = undefined;
        }

        function eventsMixin(Vue) {
          var hookRE = /^hook:/;
          Vue.prototype.$on = function (event, fn) {
            var vm = this;
            if (Array.isArray(event)) {
              for (var i = 0, l = event.length; i < l; i++) {
                vm.$on(event[i], fn);
              }
            } else {
              (vm._events[event] || (vm._events[event] = [])).push(fn);
              // optimize hook:event cost by using a boolean flag marked at registration
              // instead of a hash lookup
              if (hookRE.test(event)) {
                vm._hasHookEvent = true;
              }
            }
            return vm
          };

          Vue.prototype.$once = function (event, fn) {
            var vm = this;
            function on() {
              vm.$off(event, on);
              fn.apply(vm, arguments);
            }
            on.fn = fn;
            vm.$on(event, on);
            return vm
          };

          Vue.prototype.$off = function (event, fn) {
            var vm = this;
            // all
            if (!arguments.length) {
              vm._events = Object.create(null);
              return vm
            }
            // array of events
            if (Array.isArray(event)) {
              for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
                vm.$off(event[i$1], fn);
              }
              return vm
            }
            // specific event
            var cbs = vm._events[event];
            if (!cbs) {
              return vm
            }
            if (!fn) {
              vm._events[event] = null;
              return vm
            }
            // specific handler
            var cb;
            var i = cbs.length;
            while (i--) {
              cb = cbs[i];
              if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1);
                break
              }
            }
            return vm
          };

          Vue.prototype.$emit = function (event) {
            var vm = this;
            if (true) {
              var lowerCaseEvent = event.toLowerCase();
              if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
                tip(
                  "Event \"" + lowerCaseEvent + "\" is emitted in component " +
                  (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
                  "Note that HTML attributes are case-insensitive and you cannot use " +
                  "v-on to listen to camelCase events when using in-DOM templates. " +
                  "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
                );
              }
            }
            var cbs = vm._events[event];
            if (cbs) {
              cbs = cbs.length > 1 ? toArray(cbs) : cbs;
              var args = toArray(arguments, 1);
              var info = "event handler for \"" + event + "\"";
              for (var i = 0, l = cbs.length; i < l; i++) {
                invokeWithErrorHandling(cbs[i], vm, args, vm, info);
              }
            }
            return vm
          };
        }

        /*  */

        var activeInstance = null;
        var isUpdatingChildComponent = false;

        function setActiveInstance(vm) {
          var prevActiveInstance = activeInstance;
          activeInstance = vm;
          return function () {
            activeInstance = prevActiveInstance;
          }
        }

        function initLifecycle(vm) {
          var options = vm.$options;

          // locate first non-abstract parent
          var parent = options.parent;
          if (parent && !options.abstract) {
            while (parent.$options.abstract && parent.$parent) {
              parent = parent.$parent;
            }
            parent.$children.push(vm);
          }

          vm.$parent = parent;
          vm.$root = parent ? parent.$root : vm;

          vm.$children = [];
          vm.$refs = {};

          vm._watcher = null;
          vm._inactive = null;
          vm._directInactive = false;
          vm._isMounted = false;
          vm._isDestroyed = false;
          vm._isBeingDestroyed = false;
        }

        function lifecycleMixin(Vue) {
          Vue.prototype._update = function (vnode, hydrating) {
            var vm = this;
            var prevEl = vm.$el;
            var prevVnode = vm._vnode;
            var restoreActiveInstance = setActiveInstance(vm);
            vm._vnode = vnode;
            // Vue.prototype.__patch__ is injected in entry points
            // based on the rendering backend used.
            if (!prevVnode) {
              // initial render
              vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
            } else {
              // updates
              vm.$el = vm.__patch__(prevVnode, vnode);
            }
            restoreActiveInstance();
            // update __vue__ reference
            if (prevEl) {
              prevEl.__vue__ = null;
            }
            if (vm.$el) {
              vm.$el.__vue__ = vm;
            }
            // if parent is an HOC, update its $el as well
            if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
              vm.$parent.$el = vm.$el;
            }
            // updated hook is called by the scheduler to ensure that children are
            // updated in a parent's updated hook.
          };

          Vue.prototype.$forceUpdate = function () {
            var vm = this;
            if (vm._watcher) {
              vm._watcher.update();
            }
          };

          Vue.prototype.$destroy = function () {
            var vm = this;
            if (vm._isBeingDestroyed) {
              return
            }
            callHook(vm, 'beforeDestroy');
            vm._isBeingDestroyed = true;
            // remove self from parent
            var parent = vm.$parent;
            if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
              remove(parent.$children, vm);
            }
            // teardown watchers
            if (vm._watcher) {
              vm._watcher.teardown();
            }
            var i = vm._watchers.length;
            while (i--) {
              vm._watchers[i].teardown();
            }
            // remove reference from data ob
            // frozen object may not have observer.
            if (vm._data.__ob__) {
              vm._data.__ob__.vmCount--;
            }
            // call the last hook...
            vm._isDestroyed = true;
            // invoke destroy hooks on current rendered tree
            vm.__patch__(vm._vnode, null);
            // fire destroyed hook
            callHook(vm, 'destroyed');
            // turn off all instance listeners.
            vm.$off();
            // remove __vue__ reference
            if (vm.$el) {
              vm.$el.__vue__ = null;
            }
            // release circular reference (#6759)
            if (vm.$vnode) {
              vm.$vnode.parent = null;
            }
          };
        }

        function updateChildComponent(
          vm,
          propsData,
          listeners,
          parentVnode,
          renderChildren
        ) {
          if (true) {
            isUpdatingChildComponent = true;
          }

          // determine whether component has slot children
          // we need to do this before overwriting $options._renderChildren.

          // check if there are dynamic scopedSlots (hand-written or compiled but with
          // dynamic slot names). Static scoped slots compiled from template has the
          // "$stable" marker.
          var newScopedSlots = parentVnode.data.scopedSlots;
          var oldScopedSlots = vm.$scopedSlots;
          var hasDynamicScopedSlot = !!(
            (newScopedSlots && !newScopedSlots.$stable) ||
            (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
            (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
          );

          // Any static slot children from the parent may have changed during parent's
          // update. Dynamic scoped slots may also have changed. In such cases, a forced
          // update is necessary to ensure correctness.
          var needsForceUpdate = !!(
            renderChildren ||               // has new static slots
            vm.$options._renderChildren ||  // has old static slots
            hasDynamicScopedSlot
          );

          vm.$options._parentVnode = parentVnode;
          vm.$vnode = parentVnode; // update vm's placeholder node without re-render

          if (vm._vnode) { // update child tree's parent
            vm._vnode.parent = parentVnode;
          }
          vm.$options._renderChildren = renderChildren;

          // update $attrs and $listeners hash
          // these are also reactive so they may trigger child update if the child
          // used them during render
          vm.$attrs = parentVnode.data.attrs || emptyObject;
          vm.$listeners = listeners || emptyObject;

          // update props
          if (propsData && vm.$options.props) {
            toggleObserving(false);
            var props = vm._props;
            var propKeys = vm.$options._propKeys || [];
            for (var i = 0; i < propKeys.length; i++) {
              var key = propKeys[i];
              var propOptions = vm.$options.props; // wtf flow?
              props[key] = validateProp(key, propOptions, propsData, vm);
            }
            toggleObserving(true);
            // keep a copy of raw propsData
            vm.$options.propsData = propsData;
          }

          // fixed by xxxxxx update properties(mp runtime)
          vm._$updateProperties && vm._$updateProperties(vm);

          // update listeners
          listeners = listeners || emptyObject;
          var oldListeners = vm.$options._parentListeners;
          vm.$options._parentListeners = listeners;
          updateComponentListeners(vm, listeners, oldListeners);

          // resolve slots + force update if has children
          if (needsForceUpdate) {
            vm.$slots = resolveSlots(renderChildren, parentVnode.context);
            vm.$forceUpdate();
          }

          if (true) {
            isUpdatingChildComponent = false;
          }
        }

        function isInInactiveTree(vm) {
          while (vm && (vm = vm.$parent)) {
            if (vm._inactive) { return true }
          }
          return false
        }

        function activateChildComponent(vm, direct) {
          if (direct) {
            vm._directInactive = false;
            if (isInInactiveTree(vm)) {
              return
            }
          } else if (vm._directInactive) {
            return
          }
          if (vm._inactive || vm._inactive === null) {
            vm._inactive = false;
            for (var i = 0; i < vm.$children.length; i++) {
              activateChildComponent(vm.$children[i]);
            }
            callHook(vm, 'activated');
          }
        }

        function deactivateChildComponent(vm, direct) {
          if (direct) {
            vm._directInactive = true;
            if (isInInactiveTree(vm)) {
              return
            }
          }
          if (!vm._inactive) {
            vm._inactive = true;
            for (var i = 0; i < vm.$children.length; i++) {
              deactivateChildComponent(vm.$children[i]);
            }
            callHook(vm, 'deactivated');
          }
        }

        function callHook(vm, hook) {
          // #7573 disable dep collection when invoking lifecycle hooks
          pushTarget();
          var handlers = vm.$options[hook];
          var info = hook + " hook";
          if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
              invokeWithErrorHandling(handlers[i], vm, null, vm, info);
            }
          }
          if (vm._hasHookEvent) {
            vm.$emit('hook:' + hook);
          }
          popTarget();
        }

        /*  */

        var MAX_UPDATE_COUNT = 100;

        var queue = [];
        var activatedChildren = [];
        var has = {};
        var circular = {};
        var waiting = false;
        var flushing = false;
        var index = 0;

        /**
         * Reset the scheduler's state.
         */
        function resetSchedulerState() {
          index = queue.length = activatedChildren.length = 0;
          has = {};
          if (true) {
            circular = {};
          }
          waiting = flushing = false;
        }

        // Async edge case #6566 requires saving the timestamp when event listeners are
        // attached. However, calling performance.now() has a perf overhead especially
        // if the page has thousands of event listeners. Instead, we take a timestamp
        // every time the scheduler flushes and use that for all event listeners
        // attached during that flush.
        var currentFlushTimestamp = 0;

        // Async edge case fix requires storing an event listener's attach timestamp.
        var getNow = Date.now;

        // Determine what event timestamp the browser is using. Annoyingly, the
        // timestamp can either be hi-res (relative to page load) or low-res
        // (relative to UNIX epoch), so in order to compare time we have to use the
        // same timestamp type when saving the flush timestamp.
        // All IE versions use low-res event timestamps, and have problematic clock
        // implementations (#9632)
        if (inBrowser && !isIE) {
          var performance = window.performance;
          if (
            performance &&
            typeof performance.now === 'function' &&
            getNow() > document.createEvent('Event').timeStamp
          ) {
            // if the event timestamp, although evaluated AFTER the Date.now(), is
            // smaller than it, it means the event is using a hi-res timestamp,
            // and we need to use the hi-res version for event listener timestamps as
            // well.
            getNow = function () { return performance.now(); };
          }
        }

        /**
         * Flush both queues and run the watchers.
         */
        function flushSchedulerQueue() {
          currentFlushTimestamp = getNow();
          flushing = true;
          var watcher, id;

          // Sort queue before flush.
          // This ensures that:
          // 1. Components are updated from parent to child. (because parent is always
          //    created before the child)
          // 2. A component's user watchers are run before its render watcher (because
          //    user watchers are created before the render watcher)
          // 3. If a component is destroyed during a parent component's watcher run,
          //    its watchers can be skipped.
          queue.sort(function (a, b) { return a.id - b.id; });

          // do not cache length because more watchers might be pushed
          // as we run existing watchers
          for (index = 0; index < queue.length; index++) {
            watcher = queue[index];
            if (watcher.before) {
              watcher.before();
            }
            id = watcher.id;
            has[id] = null;
            watcher.run();
            // in dev build, check and stop circular updates.
            if (true && has[id] != null) {
              circular[id] = (circular[id] || 0) + 1;
              if (circular[id] > MAX_UPDATE_COUNT) {
                warn(
                  'You may have an infinite update loop ' + (
                    watcher.user
                      ? ("in watcher with expression \"" + (watcher.expression) + "\"")
                      : "in a component render function."
                  ),
                  watcher.vm
                );
                break
              }
            }
          }

          // keep copies of post queues before resetting state
          var activatedQueue = activatedChildren.slice();
          var updatedQueue = queue.slice();

          resetSchedulerState();

          // call component updated and activated hooks
          callActivatedHooks(activatedQueue);
          callUpdatedHooks(updatedQueue);

          // devtool hook
          /* istanbul ignore if */
          if (devtools && config.devtools) {
            devtools.emit('flush');
          }
        }

        function callUpdatedHooks(queue) {
          var i = queue.length;
          while (i--) {
            var watcher = queue[i];
            var vm = watcher.vm;
            if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
              callHook(vm, 'updated');
            }
          }
        }

        /**
         * Queue a kept-alive component that was activated during patch.
         * The queue will be processed after the entire tree has been patched.
         */
        function queueActivatedComponent(vm) {
          // setting _inactive to false here so that a render function can
          // rely on checking whether it's in an inactive tree (e.g. router-view)
          vm._inactive = false;
          activatedChildren.push(vm);
        }

        function callActivatedHooks(queue) {
          for (var i = 0; i < queue.length; i++) {
            queue[i]._inactive = true;
            activateChildComponent(queue[i], true /* true */);
          }
        }

        /**
         * Push a watcher into the watcher queue.
         * Jobs with duplicate IDs will be skipped unless it's
         * pushed when the queue is being flushed.
         */
        function queueWatcher(watcher) {
          var id = watcher.id;
          if (has[id] == null) {
            has[id] = true;
            if (!flushing) {
              queue.push(watcher);
            } else {
              // if already flushing, splice the watcher based on its id
              // if already past its id, it will be run next immediately.
              var i = queue.length - 1;
              while (i > index && queue[i].id > watcher.id) {
                i--;
              }
              queue.splice(i + 1, 0, watcher);
            }
            // queue the flush
            if (!waiting) {
              waiting = true;

              if (true && !config.async) {
                flushSchedulerQueue();
                return
              }
              nextTick(flushSchedulerQueue);
            }
          }
        }

        /*  */



        var uid$2 = 0;

        /**
         * A watcher parses an expression, collects dependencies,
         * and fires callback when the expression value changes.
         * This is used for both the $watch() api and directives.
         */
        var Watcher = function Watcher(
          vm,
          expOrFn,
          cb,
          options,
          isRenderWatcher
        ) {
          this.vm = vm;
          if (isRenderWatcher) {
            vm._watcher = this;
          }
          vm._watchers.push(this);
          // options
          if (options) {
            this.deep = !!options.deep;
            this.user = !!options.user;
            this.lazy = !!options.lazy;
            this.sync = !!options.sync;
            this.before = options.before;
          } else {
            this.deep = this.user = this.lazy = this.sync = false;
          }
          this.cb = cb;
          this.id = ++uid$2; // uid for batching
          this.active = true;
          this.dirty = this.lazy; // for lazy watchers
          this.deps = [];
          this.newDeps = [];
          this.depIds = new _Set();
          this.newDepIds = new _Set();
          this.expression = true
            ? expOrFn.toString()
            : undefined;
          // parse expression for getter
          if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
          } else {
            this.getter = parsePath(expOrFn);
            if (!this.getter) {
              this.getter = noop;
              true && warn(
                "Failed watching path: \"" + expOrFn + "\" " +
                'Watcher only accepts simple dot-delimited paths. ' +
                'For full control, use a function instead.',
                vm
              );
            }
          }
          this.value = this.lazy
            ? undefined
            : this.get();
        };

        /**
         * Evaluate the getter, and re-collect dependencies.
         */
        Watcher.prototype.get = function get() {
          pushTarget(this);
          var value;
          var vm = this.vm;
          try {
            value = this.getter.call(vm, vm);
          } catch (e) {
            if (this.user) {
              handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
            } else {
              throw e
            }
          } finally {
            // "touch" every property so they are all tracked as
            // dependencies for deep watching
            if (this.deep) {
              traverse(value);
            }
            popTarget();
            this.cleanupDeps();
          }
          return value
        };

        /**
         * Add a dependency to this directive.
         */
        Watcher.prototype.addDep = function addDep(dep) {
          var id = dep.id;
          if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
              dep.addSub(this);
            }
          }
        };

        /**
         * Clean up for dependency collection.
         */
        Watcher.prototype.cleanupDeps = function cleanupDeps() {
          var i = this.deps.length;
          while (i--) {
            var dep = this.deps[i];
            if (!this.newDepIds.has(dep.id)) {
              dep.removeSub(this);
            }
          }
          var tmp = this.depIds;
          this.depIds = this.newDepIds;
          this.newDepIds = tmp;
          this.newDepIds.clear();
          tmp = this.deps;
          this.deps = this.newDeps;
          this.newDeps = tmp;
          this.newDeps.length = 0;
        };

        /**
         * Subscriber interface.
         * Will be called when a dependency changes.
         */
        Watcher.prototype.update = function update() {
          /* istanbul ignore else */
          if (this.lazy) {
            this.dirty = true;
          } else if (this.sync) {
            this.run();
          } else {
            queueWatcher(this);
          }
        };

        /**
         * Scheduler job interface.
         * Will be called by the scheduler.
         */
        Watcher.prototype.run = function run() {
          if (this.active) {
            var value = this.get();
            if (
              value !== this.value ||
              // Deep watchers and watchers on Object/Arrays should fire even
              // when the value is the same, because the value may
              // have mutated.
              isObject(value) ||
              this.deep
            ) {
              // set new value
              var oldValue = this.value;
              this.value = value;
              if (this.user) {
                try {
                  this.cb.call(this.vm, value, oldValue);
                } catch (e) {
                  handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
                }
              } else {
                this.cb.call(this.vm, value, oldValue);
              }
            }
          }
        };

        /**
         * Evaluate the value of the watcher.
         * This only gets called for lazy watchers.
         */
        Watcher.prototype.evaluate = function evaluate() {
          this.value = this.get();
          this.dirty = false;
        };

        /**
         * Depend on all deps collected by this watcher.
         */
        Watcher.prototype.depend = function depend() {
          var i = this.deps.length;
          while (i--) {
            this.deps[i].depend();
          }
        };

        /**
         * Remove self from all dependencies' subscriber list.
         */
        Watcher.prototype.teardown = function teardown() {
          if (this.active) {
            // remove self from vm's watcher list
            // this is a somewhat expensive operation so we skip it
            // if the vm is being destroyed.
            if (!this.vm._isBeingDestroyed) {
              remove(this.vm._watchers, this);
            }
            var i = this.deps.length;
            while (i--) {
              this.deps[i].removeSub(this);
            }
            this.active = false;
          }
        };

        /*  */

        var sharedPropertyDefinition = {
          enumerable: true,
          configurable: true,
          get: noop,
          set: noop
        };

        function proxy(target, sourceKey, key) {
          sharedPropertyDefinition.get = function proxyGetter() {
            return this[sourceKey][key]
          };
          sharedPropertyDefinition.set = function proxySetter(val) {
            this[sourceKey][key] = val;
          };
          Object.defineProperty(target, key, sharedPropertyDefinition);
        }

        function initState(vm) {
          vm._watchers = [];
          var opts = vm.$options;
          if (opts.props) { initProps(vm, opts.props); }
          if (opts.methods) { initMethods(vm, opts.methods); }
          if (opts.data) {
            initData(vm);
          } else {
            observe(vm._data = {}, true /* asRootData */);
          }
          if (opts.computed) { initComputed(vm, opts.computed); }
          if (opts.watch && opts.watch !== nativeWatch) {
            initWatch(vm, opts.watch);
          }
        }

        function initProps(vm, propsOptions) {
          var propsData = vm.$options.propsData || {};
          var props = vm._props = {};
          // cache prop keys so that future props updates can iterate using Array
          // instead of dynamic object key enumeration.
          var keys = vm.$options._propKeys = [];
          var isRoot = !vm.$parent;
          // root instance props should be converted
          if (!isRoot) {
            toggleObserving(false);
          }
          var loop = function (key) {
            keys.push(key);
            var value = validateProp(key, propsOptions, propsData, vm);
            /* istanbul ignore else */
            if (true) {
              var hyphenatedKey = hyphenate(key);
              if (isReservedAttribute(hyphenatedKey) ||
                config.isReservedAttr(hyphenatedKey)) {
                warn(
                  ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
                  vm
                );
              }
              defineReactive$$1(props, key, value, function () {
                if (!isRoot && !isUpdatingChildComponent) {
                  {
                    if (vm.mpHost === 'mp-baidu') {//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                      return
                    }
                    //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
                    if (
                      key === 'value' &&
                      Array.isArray(vm.$options.behaviors) &&
                      vm.$options.behaviors.indexOf('uni://form-field') !== -1
                    ) {
                      return
                    }
                    if (vm._getFormData) {
                      return
                    }
                    var $parent = vm.$parent;
                    while ($parent) {
                      if ($parent.__next_tick_pending) {
                        return
                      }
                      $parent = $parent.$parent;
                    }
                  }
                  warn(
                    "Avoid mutating a prop directly since the value will be " +
                    "overwritten whenever the parent component re-renders. " +
                    "Instead, use a data or computed property based on the prop's " +
                    "value. Prop being mutated: \"" + key + "\"",
                    vm
                  );
                }
              });
            } else { }
            // static props are already proxied on the component's prototype
            // during Vue.extend(). We only need to proxy props defined at
            // instantiation here.
            if (!(key in vm)) {
              proxy(vm, "_props", key);
            }
          };

          for (var key in propsOptions) loop(key);
          toggleObserving(true);
        }

        function initData(vm) {
          var data = vm.$options.data;
          data = vm._data = typeof data === 'function'
            ? getData(data, vm)
            : data || {};
          if (!isPlainObject(data)) {
            data = {};
            true && warn(
              'data functions should return an object:\n' +
              'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
              vm
            );
          }
          // proxy data on instance
          var keys = Object.keys(data);
          var props = vm.$options.props;
          var methods = vm.$options.methods;
          var i = keys.length;
          while (i--) {
            var key = keys[i];
            if (true) {
              if (methods && hasOwn(methods, key)) {
                warn(
                  ("Method \"" + key + "\" has already been defined as a data property."),
                  vm
                );
              }
            }
            if (props && hasOwn(props, key)) {
              true && warn(
                "The data property \"" + key + "\" is already declared as a prop. " +
                "Use prop default value instead.",
                vm
              );
            } else if (!isReserved(key)) {
              proxy(vm, "_data", key);
            }
          }
          // observe data
          observe(data, true /* asRootData */);
        }

        function getData(data, vm) {
          // #7573 disable dep collection when invoking data getters
          pushTarget();
          try {
            return data.call(vm, vm)
          } catch (e) {
            handleError(e, vm, "data()");
            return {}
          } finally {
            popTarget();
          }
        }

        var computedWatcherOptions = { lazy: true };

        function initComputed(vm, computed) {
          // $flow-disable-line
          var watchers = vm._computedWatchers = Object.create(null);
          // computed properties are just getters during SSR
          var isSSR = isServerRendering();

          for (var key in computed) {
            var userDef = computed[key];
            var getter = typeof userDef === 'function' ? userDef : userDef.get;
            if (true && getter == null) {
              warn(
                ("Getter is missing for computed property \"" + key + "\"."),
                vm
              );
            }

            if (!isSSR) {
              // create internal watcher for the computed property.
              watchers[key] = new Watcher(
                vm,
                getter || noop,
                noop,
                computedWatcherOptions
              );
            }

            // component-defined computed properties are already defined on the
            // component prototype. We only need to define computed properties defined
            // at instantiation here.
            if (!(key in vm)) {
              defineComputed(vm, key, userDef);
            } else if (true) {
              if (key in vm.$data) {
                warn(("The computed property \"" + key + "\" is already defined in data."), vm);
              } else if (vm.$options.props && key in vm.$options.props) {
                warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
              }
            }
          }
        }

        function defineComputed(
          target,
          key,
          userDef
        ) {
          var shouldCache = !isServerRendering();
          if (typeof userDef === 'function') {
            sharedPropertyDefinition.get = shouldCache
              ? createComputedGetter(key)
              : createGetterInvoker(userDef);
            sharedPropertyDefinition.set = noop;
          } else {
            sharedPropertyDefinition.get = userDef.get
              ? shouldCache && userDef.cache !== false
                ? createComputedGetter(key)
                : createGetterInvoker(userDef.get)
              : noop;
            sharedPropertyDefinition.set = userDef.set || noop;
          }
          if (true &&
            sharedPropertyDefinition.set === noop) {
            sharedPropertyDefinition.set = function () {
              warn(
                ("Computed property \"" + key + "\" was assigned to but it has no setter."),
                this
              );
            };
          }
          Object.defineProperty(target, key, sharedPropertyDefinition);
        }

        function createComputedGetter(key) {
          return function computedGetter() {
            var watcher = this._computedWatchers && this._computedWatchers[key];
            if (watcher) {
              if (watcher.dirty) {
                watcher.evaluate();
              }
              if (Dep.SharedObject.target) {// fixed by xxxxxx
                watcher.depend();
              }
              return watcher.value
            }
          }
        }

        function createGetterInvoker(fn) {
          return function computedGetter() {
            return fn.call(this, this)
          }
        }

        function initMethods(vm, methods) {
          var props = vm.$options.props;
          for (var key in methods) {
            if (true) {
              if (typeof methods[key] !== 'function') {
                warn(
                  "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
                  "Did you reference the function correctly?",
                  vm
                );
              }
              if (props && hasOwn(props, key)) {
                warn(
                  ("Method \"" + key + "\" has already been defined as a prop."),
                  vm
                );
              }
              if ((key in vm) && isReserved(key)) {
                warn(
                  "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
                  "Avoid defining component methods that start with _ or $."
                );
              }
            }
            vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
          }
        }

        function initWatch(vm, watch) {
          for (var key in watch) {
            var handler = watch[key];
            if (Array.isArray(handler)) {
              for (var i = 0; i < handler.length; i++) {
                createWatcher(vm, key, handler[i]);
              }
            } else {
              createWatcher(vm, key, handler);
            }
          }
        }

        function createWatcher(
          vm,
          expOrFn,
          handler,
          options
        ) {
          if (isPlainObject(handler)) {
            options = handler;
            handler = handler.handler;
          }
          if (typeof handler === 'string') {
            handler = vm[handler];
          }
          return vm.$watch(expOrFn, handler, options)
        }

        function stateMixin(Vue) {
          // flow somehow has problems with directly declared definition object
          // when using Object.defineProperty, so we have to procedurally build up
          // the object here.
          var dataDef = {};
          dataDef.get = function () { return this._data };
          var propsDef = {};
          propsDef.get = function () { return this._props };
          if (true) {
            dataDef.set = function () {
              warn(
                'Avoid replacing instance root $data. ' +
                'Use nested data properties instead.',
                this
              );
            };
            propsDef.set = function () {
              warn("$props is readonly.", this);
            };
          }
          Object.defineProperty(Vue.prototype, '$data', dataDef);
          Object.defineProperty(Vue.prototype, '$props', propsDef);

          Vue.prototype.$set = set;
          Vue.prototype.$delete = del;

          Vue.prototype.$watch = function (
            expOrFn,
            cb,
            options
          ) {
            var vm = this;
            if (isPlainObject(cb)) {
              return createWatcher(vm, expOrFn, cb, options)
            }
            options = options || {};
            options.user = true;
            var watcher = new Watcher(vm, expOrFn, cb, options);
            if (options.immediate) {
              try {
                cb.call(vm, watcher.value);
              } catch (error) {
                handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
              }
            }
            return function unwatchFn() {
              watcher.teardown();
            }
          };
        }

        /*  */

        var uid$3 = 0;

        function initMixin(Vue) {
          Vue.prototype._init = function (options) {
            var vm = this;
            // a uid
            vm._uid = uid$3++;

            var startTag, endTag;
            /* istanbul ignore if */
            if (true && config.performance && mark) {
              startTag = "vue-perf-start:" + (vm._uid);
              endTag = "vue-perf-end:" + (vm._uid);
              mark(startTag);
            }

            // a flag to avoid this being observed
            vm._isVue = true;
            // merge options
            if (options && options._isComponent) {
              // optimize internal component instantiation
              // since dynamic options merging is pretty slow, and none of the
              // internal component options needs special treatment.
              initInternalComponent(vm, options);
            } else {
              vm.$options = mergeOptions(
                resolveConstructorOptions(vm.constructor),
                options || {},
                vm
              );
            }
            /* istanbul ignore else */
            if (true) {
              initProxy(vm);
            } else { }
            // expose real self
            vm._self = vm;
            initLifecycle(vm);
            initEvents(vm);
            initRender(vm);
            callHook(vm, 'beforeCreate');
            !vm._$fallback && initInjections(vm); // resolve injections before data/props  
            initState(vm);
            !vm._$fallback && initProvide(vm); // resolve provide after data/props
            !vm._$fallback && callHook(vm, 'created');

            /* istanbul ignore if */
            if (true && config.performance && mark) {
              vm._name = formatComponentName(vm, false);
              mark(endTag);
              measure(("vue " + (vm._name) + " init"), startTag, endTag);
            }

            if (vm.$options.el) {
              vm.$mount(vm.$options.el);
            }
          };
        }

        function initInternalComponent(vm, options) {
          var opts = vm.$options = Object.create(vm.constructor.options);
          // doing this because it's faster than dynamic enumeration.
          var parentVnode = options._parentVnode;
          opts.parent = options.parent;
          opts._parentVnode = parentVnode;

          var vnodeComponentOptions = parentVnode.componentOptions;
          opts.propsData = vnodeComponentOptions.propsData;
          opts._parentListeners = vnodeComponentOptions.listeners;
          opts._renderChildren = vnodeComponentOptions.children;
          opts._componentTag = vnodeComponentOptions.tag;

          if (options.render) {
            opts.render = options.render;
            opts.staticRenderFns = options.staticRenderFns;
          }
        }

        function resolveConstructorOptions(Ctor) {
          var options = Ctor.options;
          if (Ctor.super) {
            var superOptions = resolveConstructorOptions(Ctor.super);
            var cachedSuperOptions = Ctor.superOptions;
            if (superOptions !== cachedSuperOptions) {
              // super option changed,
              // need to resolve new options.
              Ctor.superOptions = superOptions;
              // check if there are any late-modified/attached options (#4976)
              var modifiedOptions = resolveModifiedOptions(Ctor);
              // update base extend options
              if (modifiedOptions) {
                extend(Ctor.extendOptions, modifiedOptions);
              }
              options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
              if (options.name) {
                options.components[options.name] = Ctor;
              }
            }
          }
          return options
        }

        function resolveModifiedOptions(Ctor) {
          var modified;
          var latest = Ctor.options;
          var sealed = Ctor.sealedOptions;
          for (var key in latest) {
            if (latest[key] !== sealed[key]) {
              if (!modified) { modified = {}; }
              modified[key] = latest[key];
            }
          }
          return modified
        }

        function Vue(options) {
          if (true &&
            !(this instanceof Vue)
          ) {
            warn('Vue is a constructor and should be called with the `new` keyword');
          }
          this._init(options);
        }

        initMixin(Vue);
        stateMixin(Vue);
        eventsMixin(Vue);
        lifecycleMixin(Vue);
        renderMixin(Vue);

        /*  */

        function initUse(Vue) {
          Vue.use = function (plugin) {
            var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
            if (installedPlugins.indexOf(plugin) > -1) {
              return this
            }

            // additional parameters
            var args = toArray(arguments, 1);
            args.unshift(this);
            if (typeof plugin.install === 'function') {
              plugin.install.apply(plugin, args);
            } else if (typeof plugin === 'function') {
              plugin.apply(null, args);
            }
            installedPlugins.push(plugin);
            return this
          };
        }

        /*  */

        function initMixin$1(Vue) {
          Vue.mixin = function (mixin) {
            this.options = mergeOptions(this.options, mixin);
            return this
          };
        }

        /*  */

        function initExtend(Vue) {
          /**
           * Each instance constructor, including Vue, has a unique
           * cid. This enables us to create wrapped "child
           * constructors" for prototypal inheritance and cache them.
           */
          Vue.cid = 0;
          var cid = 1;

          /**
           * Class inheritance
           */
          Vue.extend = function (extendOptions) {
            extendOptions = extendOptions || {};
            var Super = this;
            var SuperId = Super.cid;
            var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
            if (cachedCtors[SuperId]) {
              return cachedCtors[SuperId]
            }

            var name = extendOptions.name || Super.options.name;
            if (true && name) {
              validateComponentName(name);
            }

            var Sub = function VueComponent(options) {
              this._init(options);
            };
            Sub.prototype = Object.create(Super.prototype);
            Sub.prototype.constructor = Sub;
            Sub.cid = cid++;
            Sub.options = mergeOptions(
              Super.options,
              extendOptions
            );
            Sub['super'] = Super;

            // For props and computed properties, we define the proxy getters on
            // the Vue instances at extension time, on the extended prototype. This
            // avoids Object.defineProperty calls for each instance created.
            if (Sub.options.props) {
              initProps$1(Sub);
            }
            if (Sub.options.computed) {
              initComputed$1(Sub);
            }

            // allow further extension/mixin/plugin usage
            Sub.extend = Super.extend;
            Sub.mixin = Super.mixin;
            Sub.use = Super.use;

            // create asset registers, so extended classes
            // can have their private assets too.
            ASSET_TYPES.forEach(function (type) {
              Sub[type] = Super[type];
            });
            // enable recursive self-lookup
            if (name) {
              Sub.options.components[name] = Sub;
            }

            // keep a reference to the super options at extension time.
            // later at instantiation we can check if Super's options have
            // been updated.
            Sub.superOptions = Super.options;
            Sub.extendOptions = extendOptions;
            Sub.sealedOptions = extend({}, Sub.options);

            // cache constructor
            cachedCtors[SuperId] = Sub;
            return Sub
          };
        }

        function initProps$1(Comp) {
          var props = Comp.options.props;
          for (var key in props) {
            proxy(Comp.prototype, "_props", key);
          }
        }

        function initComputed$1(Comp) {
          var computed = Comp.options.computed;
          for (var key in computed) {
            defineComputed(Comp.prototype, key, computed[key]);
          }
        }

        /*  */

        function initAssetRegisters(Vue) {
          /**
           * Create asset registration methods.
           */
          ASSET_TYPES.forEach(function (type) {
            Vue[type] = function (
              id,
              definition
            ) {
              if (!definition) {
                return this.options[type + 's'][id]
              } else {
                /* istanbul ignore if */
                if (true && type === 'component') {
                  validateComponentName(id);
                }
                if (type === 'component' && isPlainObject(definition)) {
                  definition.name = definition.name || id;
                  definition = this.options._base.extend(definition);
                }
                if (type === 'directive' && typeof definition === 'function') {
                  definition = { bind: definition, update: definition };
                }
                this.options[type + 's'][id] = definition;
                return definition
              }
            };
          });
        }

        /*  */



        function getComponentName(opts) {
          return opts && (opts.Ctor.options.name || opts.tag)
        }

        function matches(pattern, name) {
          if (Array.isArray(pattern)) {
            return pattern.indexOf(name) > -1
          } else if (typeof pattern === 'string') {
            return pattern.split(',').indexOf(name) > -1
          } else if (isRegExp(pattern)) {
            return pattern.test(name)
          }
          /* istanbul ignore next */
          return false
        }

        function pruneCache(keepAliveInstance, filter) {
          var cache = keepAliveInstance.cache;
          var keys = keepAliveInstance.keys;
          var _vnode = keepAliveInstance._vnode;
          for (var key in cache) {
            var cachedNode = cache[key];
            if (cachedNode) {
              var name = getComponentName(cachedNode.componentOptions);
              if (name && !filter(name)) {
                pruneCacheEntry(cache, key, keys, _vnode);
              }
            }
          }
        }

        function pruneCacheEntry(
          cache,
          key,
          keys,
          current
        ) {
          var cached$$1 = cache[key];
          if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
            cached$$1.componentInstance.$destroy();
          }
          cache[key] = null;
          remove(keys, key);
        }

        var patternTypes = [String, RegExp, Array];

        var KeepAlive = {
          name: 'keep-alive',
          abstract: true,

          props: {
            include: patternTypes,
            exclude: patternTypes,
            max: [String, Number]
          },

          created: function created() {
            this.cache = Object.create(null);
            this.keys = [];
          },

          destroyed: function destroyed() {
            for (var key in this.cache) {
              pruneCacheEntry(this.cache, key, this.keys);
            }
          },

          mounted: function mounted() {
            var this$1 = this;

            this.$watch('include', function (val) {
              pruneCache(this$1, function (name) { return matches(val, name); });
            });
            this.$watch('exclude', function (val) {
              pruneCache(this$1, function (name) { return !matches(val, name); });
            });
          },

          render: function render() {
            var slot = this.$slots.default;
            var vnode = getFirstComponentChild(slot);
            var componentOptions = vnode && vnode.componentOptions;
            if (componentOptions) {
              // check pattern
              var name = getComponentName(componentOptions);
              var ref = this;
              var include = ref.include;
              var exclude = ref.exclude;
              if (
                // not included
                (include && (!name || !matches(include, name))) ||
                // excluded
                (exclude && name && matches(exclude, name))
              ) {
                return vnode
              }

              var ref$1 = this;
              var cache = ref$1.cache;
              var keys = ref$1.keys;
              var key = vnode.key == null
                // same constructor may get registered as different local components
                // so cid alone is not enough (#3269)
                ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
                : vnode.key;
              if (cache[key]) {
                vnode.componentInstance = cache[key].componentInstance;
                // make current key freshest
                remove(keys, key);
                keys.push(key);
              } else {
                cache[key] = vnode;
                keys.push(key);
                // prune oldest entry
                if (this.max && keys.length > parseInt(this.max)) {
                  pruneCacheEntry(cache, keys[0], keys, this._vnode);
                }
              }

              vnode.data.keepAlive = true;
            }
            return vnode || (slot && slot[0])
          }
        };

        var builtInComponents = {
          KeepAlive: KeepAlive
        };

        /*  */

        function initGlobalAPI(Vue) {
          // config
          var configDef = {};
          configDef.get = function () { return config; };
          if (true) {
            configDef.set = function () {
              warn(
                'Do not replace the Vue.config object, set individual fields instead.'
              );
            };
          }
          Object.defineProperty(Vue, 'config', configDef);

          // exposed util methods.
          // NOTE: these are not considered part of the public API - avoid relying on
          // them unless you are aware of the risk.
          Vue.util = {
            warn: warn,
            extend: extend,
            mergeOptions: mergeOptions,
            defineReactive: defineReactive$$1
          };

          Vue.set = set;
          Vue.delete = del;
          Vue.nextTick = nextTick;

          // 2.6 explicit observable API
          Vue.observable = function (obj) {
            observe(obj);
            return obj
          };

          Vue.options = Object.create(null);
          ASSET_TYPES.forEach(function (type) {
            Vue.options[type + 's'] = Object.create(null);
          });

          // this is used to identify the "base" constructor to extend all plain-object
          // components with in Weex's multi-instance scenarios.
          Vue.options._base = Vue;

          extend(Vue.options.components, builtInComponents);

          initUse(Vue);
          initMixin$1(Vue);
          initExtend(Vue);
          initAssetRegisters(Vue);
        }

        initGlobalAPI(Vue);

        Object.defineProperty(Vue.prototype, '$isServer', {
          get: isServerRendering
        });

        Object.defineProperty(Vue.prototype, '$ssrContext', {
          get: function get() {
            /* istanbul ignore next */
            return this.$vnode && this.$vnode.ssrContext
          }
        });

        // expose FunctionalRenderContext for ssr runtime helper installation
        Object.defineProperty(Vue, 'FunctionalRenderContext', {
          value: FunctionalRenderContext
        });

        Vue.version = '2.6.11';

        /**
         * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
         */
        var ARRAYTYPE = '[object Array]';
        var OBJECTTYPE = '[object Object]';
        // const FUNCTIONTYPE = '[object Function]'

        function diff(current, pre) {
          var result = {};
          syncKeys(current, pre);
          _diff(current, pre, '', result);
          return result
        }

        function syncKeys(current, pre) {
          if (current === pre) { return }
          var rootCurrentType = type(current);
          var rootPreType = type(pre);
          if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
            if (Object.keys(current).length >= Object.keys(pre).length) {
              for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                  current[key] = null;
                } else {
                  syncKeys(currentValue, pre[key]);
                }
              }
            }
          } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
            if (current.length >= pre.length) {
              pre.forEach(function (item, index) {
                syncKeys(current[index], item);
              });
            }
          }
        }

        function _diff(current, pre, path, result) {
          if (current === pre) { return }
          var rootCurrentType = type(current);
          var rootPreType = type(pre);
          if (rootCurrentType == OBJECTTYPE) {
            if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
              setResult(result, path, current);
            } else {
              var loop = function (key) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                  if (currentValue != pre[key]) {
                    setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                  }
                } else if (currentType == ARRAYTYPE) {
                  if (preType != ARRAYTYPE) {
                    setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                  } else {
                    if (currentValue.length < preValue.length) {
                      setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                      currentValue.forEach(function (item, index) {
                        _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                      });
                    }
                  }
                } else if (currentType == OBJECTTYPE) {
                  if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                    setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                  } else {
                    for (var subKey in currentValue) {
                      _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                    }
                  }
                }
              };

              for (var key in current) loop(key);
            }
          } else if (rootCurrentType == ARRAYTYPE) {
            if (rootPreType != ARRAYTYPE) {
              setResult(result, path, current);
            } else {
              if (current.length < pre.length) {
                setResult(result, path, current);
              } else {
                current.forEach(function (item, index) {
                  _diff(item, pre[index], path + '[' + index + ']', result);
                });
              }
            }
          } else {
            setResult(result, path, current);
          }
        }

        function setResult(result, k, v) {
          // if (type(v) != FUNCTIONTYPE) {
          result[k] = v;
          // }
        }

        function type(obj) {
          return Object.prototype.toString.call(obj)
        }

        /*  */

        function flushCallbacks$1(vm) {
          if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
            if (Object({ "VUE_APP_PLATFORM": "mp-weixin", "NODE_ENV": "development", "BASE_URL": "/" }).VUE_APP_DEBUG) {
              var mpInstance = vm.$scope;
              console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
            }
            var copies = vm.__next_tick_callbacks.slice(0);
            vm.__next_tick_callbacks.length = 0;
            for (var i = 0; i < copies.length; i++) {
              copies[i]();
            }
          }
        }

        function hasRenderWatcher(vm) {
          return queue.find(function (watcher) { return vm._watcher === watcher; })
        }

        function nextTick$1(vm, cb) {
          //1.nextTick 之前 已 setData 且 setData 还未回调完成
          //2.nextTick 之前存在 render watcher
          if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
            if (Object({ "VUE_APP_PLATFORM": "mp-weixin", "NODE_ENV": "development", "BASE_URL": "/" }).VUE_APP_DEBUG) {
              var mpInstance = vm.$scope;
              console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
            }
            return nextTick(cb, vm)
          } else {
            if (Object({ "VUE_APP_PLATFORM": "mp-weixin", "NODE_ENV": "development", "BASE_URL": "/" }).VUE_APP_DEBUG) {
              var mpInstance$1 = vm.$scope;
              console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
            }
          }
          var _resolve;
          if (!vm.__next_tick_callbacks) {
            vm.__next_tick_callbacks = [];
          }
          vm.__next_tick_callbacks.push(function () {
            if (cb) {
              try {
                cb.call(vm);
              } catch (e) {
                handleError(e, vm, 'nextTick');
              }
            } else if (_resolve) {
              _resolve(vm);
            }
          });
          // $flow-disable-line
          if (!cb && typeof Promise !== 'undefined') {
            return new Promise(function (resolve) {
              _resolve = resolve;
            })
          }
        }

        /*  */

        function cloneWithData(vm) {
          // 确保当前 vm 所有数据被同步
          var ret = Object.create(null);
          var dataKeys = [].concat(
            Object.keys(vm._data || {}),
            Object.keys(vm._computedWatchers || {}));

          dataKeys.reduce(function (ret, key) {
            ret[key] = vm[key];
            return ret
          }, ret);
          //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
          Object.assign(ret, vm.$mp.data || {});
          if (
            Array.isArray(vm.$options.behaviors) &&
            vm.$options.behaviors.indexOf('uni://form-field') !== -1
          ) { //form-field
            ret['name'] = vm.name;
            ret['value'] = vm.value;
          }

          return JSON.parse(JSON.stringify(ret))
        }

        var patch = function (oldVnode, vnode) {
          var this$1 = this;

          if (vnode === null) { //destroy
            return
          }
          if (this.mpType === 'page' || this.mpType === 'component') {
            var mpInstance = this.$scope;
            var data = Object.create(null);
            try {
              data = cloneWithData(this);
            } catch (err) {
              console.error(err);
            }
            data.__webviewId__ = mpInstance.data.__webviewId__;
            var mpData = Object.create(null);
            Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
              mpData[key] = mpInstance.data[key];
            });
            var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
            if (Object.keys(diffData).length) {
              if (Object({ "VUE_APP_PLATFORM": "mp-weixin", "NODE_ENV": "development", "BASE_URL": "/" }).VUE_APP_DEBUG) {
                console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
                  ']差量更新',
                  JSON.stringify(diffData));
              }
              this.__next_tick_pending = true;
              mpInstance.setData(diffData, function () {
                this$1.__next_tick_pending = false;
                flushCallbacks$1(this$1);
              });
            } else {
              flushCallbacks$1(this);
            }
          }
        };

        /*  */

        function createEmptyRender() {

        }

        function mountComponent$1(
          vm,
          el,
          hydrating
        ) {
          if (!vm.mpType) {//main.js 中的 new Vue
            return vm
          }
          if (vm.mpType === 'app') {
            vm.$options.render = createEmptyRender;
          }
          if (!vm.$options.render) {
            vm.$options.render = createEmptyRender;
            if (true) {
              /* istanbul ignore if */
              if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
                vm.$options.el || el) {
                warn(
                  'You are using the runtime-only build of Vue where the template ' +
                  'compiler is not available. Either pre-compile the templates into ' +
                  'render functions, or use the compiler-included build.',
                  vm
                );
              } else {
                warn(
                  'Failed to mount component: template or render function not defined.',
                  vm
                );
              }
            }
          }

          !vm._$fallback && callHook(vm, 'beforeMount');

          var updateComponent = function () {
            vm._update(vm._render(), hydrating);
          };

          // we set this to vm._watcher inside the watcher's constructor
          // since the watcher's initial patch may call $forceUpdate (e.g. inside child
          // component's mounted hook), which relies on vm._watcher being already defined
          new Watcher(vm, updateComponent, noop, {
            before: function before() {
              if (vm._isMounted && !vm._isDestroyed) {
                callHook(vm, 'beforeUpdate');
              }
            }
          }, true /* isRenderWatcher */);
          hydrating = false;
          return vm
        }

        /*  */

        function renderClass(
          staticClass,
          dynamicClass
        ) {
          if (isDef(staticClass) || isDef(dynamicClass)) {
            return concat(staticClass, stringifyClass(dynamicClass))
          }
          /* istanbul ignore next */
          return ''
        }

        function concat(a, b) {
          return a ? b ? (a + ' ' + b) : a : (b || '')
        }

        function stringifyClass(value) {
          if (Array.isArray(value)) {
            return stringifyArray(value)
          }
          if (isObject(value)) {
            return stringifyObject(value)
          }
          if (typeof value === 'string') {
            return value
          }
          /* istanbul ignore next */
          return ''
        }

        function stringifyArray(value) {
          var res = '';
          var stringified;
          for (var i = 0, l = value.length; i < l; i++) {
            if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
              if (res) { res += ' '; }
              res += stringified;
            }
          }
          return res
        }

        function stringifyObject(value) {
          var res = '';
          for (var key in value) {
            if (value[key]) {
              if (res) { res += ' '; }
              res += key;
            }
          }
          return res
        }

        /*  */

        var parseStyleText = cached(function (cssText) {
          var res = {};
          var listDelimiter = /;(?![^(]*\))/g;
          var propertyDelimiter = /:(.+)/;
          cssText.split(listDelimiter).forEach(function (item) {
            if (item) {
              var tmp = item.split(propertyDelimiter);
              tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
            }
          });
          return res
        });

        // normalize possible array / string values into Object
        function normalizeStyleBinding(bindingStyle) {
          if (Array.isArray(bindingStyle)) {
            return toObject(bindingStyle)
          }
          if (typeof bindingStyle === 'string') {
            return parseStyleText(bindingStyle)
          }
          return bindingStyle
        }

        /*  */

        var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

        function getTarget(obj, path) {
          var parts = path.split('.');
          var key = parts[0];
          if (key.indexOf('__$n') === 0) { //number index
            key = parseInt(key.replace('__$n', ''));
          }
          if (parts.length === 1) {
            return obj[key]
          }
          return getTarget(obj[key], parts.slice(1).join('.'))
        }

        function internalMixin(Vue) {

          Vue.config.errorHandler = function (err, vm, info) {
            Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
            console.error(err);
            /* eslint-disable no-undef */
            var app = getApp();
            if (app && app.onError) {
              app.onError(err);
            }
          };

          var oldEmit = Vue.prototype.$emit;

          Vue.prototype.$emit = function (event) {
            if (this.$scope && event) {
              this.$scope['triggerEvent'](event, {
                __args__: toArray(arguments, 1)
              });
            }
            return oldEmit.apply(this, arguments)
          };

          Vue.prototype.$nextTick = function (fn) {
            return nextTick$1(this, fn)
          };

          MP_METHODS.forEach(function (method) {
            Vue.prototype[method] = function (args) {
              if (this.$scope && this.$scope[method]) {
                return this.$scope[method](args)
              }
              // mp-alipay
              if (typeof my === 'undefined') {
                return
              }
              if (method === 'createSelectorQuery') {
                /* eslint-disable no-undef */
                return my.createSelectorQuery(args)
              } else if (method === 'createIntersectionObserver') {
                /* eslint-disable no-undef */
                return my.createIntersectionObserver(args)
              }
              // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
            };
          });

          Vue.prototype.__init_provide = initProvide;

          Vue.prototype.__init_injections = initInjections;

          Vue.prototype.__call_hook = function (hook, args) {
            var vm = this;
            // #7573 disable dep collection when invoking lifecycle hooks
            pushTarget();
            var handlers = vm.$options[hook];
            var info = hook + " hook";
            var ret;
            if (handlers) {
              for (var i = 0, j = handlers.length; i < j; i++) {
                ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
              }
            }
            if (vm._hasHookEvent) {
              vm.$emit('hook:' + hook, args);
            }
            popTarget();
            return ret
          };

          Vue.prototype.__set_model = function (target, key, value, modifiers) {
            if (Array.isArray(modifiers)) {
              if (modifiers.indexOf('trim') !== -1) {
                value = value.trim();
              }
              if (modifiers.indexOf('number') !== -1) {
                value = this._n(value);
              }
            }
            if (!target) {
              target = this;
            }
            target[key] = value;
          };

          Vue.prototype.__set_sync = function (target, key, value) {
            if (!target) {
              target = this;
            }
            target[key] = value;
          };

          Vue.prototype.__get_orig = function (item) {
            if (isPlainObject(item)) {
              return item['$orig'] || item
            }
            return item
          };

          Vue.prototype.__get_value = function (dataPath, target) {
            return getTarget(target || this, dataPath)
          };


          Vue.prototype.__get_class = function (dynamicClass, staticClass) {
            return renderClass(staticClass, dynamicClass)
          };

          Vue.prototype.__get_style = function (dynamicStyle, staticStyle) {
            if (!dynamicStyle && !staticStyle) {
              return ''
            }
            var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
            var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
            return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
          };

          Vue.prototype.__map = function (val, iteratee) {
            //TODO 暂不考虑 string,number
            var ret, i, l, keys, key;
            if (Array.isArray(val)) {
              ret = new Array(val.length);
              for (i = 0, l = val.length; i < l; i++) {
                ret[i] = iteratee(val[i], i);
              }
              return ret
            } else if (isObject(val)) {
              keys = Object.keys(val);
              ret = Object.create(null);
              for (i = 0, l = keys.length; i < l; i++) {
                key = keys[i];
                ret[key] = iteratee(val[key], key, i);
              }
              return ret
            }
            return []
          };

        }

        /*  */

        var LIFECYCLE_HOOKS$1 = [
          //App
          'onLaunch',
          'onShow',
          'onHide',
          'onUniNViewMessage',
          'onError',
          //Page
          'onLoad',
          // 'onShow',
          'onReady',
          // 'onHide',
          'onUnload',
          'onPullDownRefresh',
          'onReachBottom',
          'onTabItemTap',
          'onShareAppMessage',
          'onResize',
          'onPageScroll',
          'onNavigationBarButtonTap',
          'onBackPress',
          'onNavigationBarSearchInputChanged',
          'onNavigationBarSearchInputConfirmed',
          'onNavigationBarSearchInputClicked',
          //Component
          // 'onReady', // 兼容旧版本，应该移除该事件
          'onPageShow',
          'onPageHide',
          'onPageResize'
        ];
        function lifecycleMixin$1(Vue) {

          //fixed vue-class-component
          var oldExtend = Vue.extend;
          Vue.extend = function (extendOptions) {
            extendOptions = extendOptions || {};

            var methods = extendOptions.methods;
            if (methods) {
              Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName) !== -1) {
                  extendOptions[methodName] = methods[methodName];
                  delete methods[methodName];
                }
              });
            }

            return oldExtend.call(this, extendOptions)
          };

          var strategies = Vue.config.optionMergeStrategies;
          var mergeHook = strategies.created;
          LIFECYCLE_HOOKS$1.forEach(function (hook) {
            strategies[hook] = mergeHook;
          });

          Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
        }

        /*  */

        // install platform patch function
        Vue.prototype.__patch__ = patch;

        // public mount method
        Vue.prototype.$mount = function (
          el,
          hydrating
        ) {
          return mountComponent$1(this, el, hydrating)
        };

        lifecycleMixin$1(Vue);
        internalMixin(Vue);

  /*  */

  /* harmony default export */ __webpack_exports__["default"] = (Vue);

        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

      /***/
    }),

  /***/ 20:
  /*!*******************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/system-info.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _default = function () {

























        return Promise.reject('仅适用于app，其它平台主动reject');
      }(); exports.default = _default;

      /***/
    }),

  /***/ 21:
  /*!*********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/global.config.js ***!
    \*********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.platform = exports.extConfig = exports.extAble = exports.projectCode = exports.project = void 0; var _, _2, _3, _4, _5, _protocolUrl, _mutatorMap; function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } if (Object.getOwnPropertySymbols) { var objectSymbols = Object.getOwnPropertySymbols(descs); for (var i = 0; i < objectSymbols.length; i++) { var sym = objectSymbols[i]; var desc = descs[sym]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, sym, desc); } } return obj; } var project = 'd13'; exports.project = project;
      var platform = 13601; //平台标识: 13603 ios, 13602 android, 13601 小程序, 13604 H5
      exports.platform = platform;









      exports.project = project = 'd16';







      var projectCodeMeta = {
        d2: 10104,
        d5: 10106,
        d13: 10113, //捡漏猫App
        d15: 10115, // 捡漏猫小程序
        d16: 10116, // 咪店小程序
        d18: 10118, // 咪店APP-安卓
        d19: 10119 // 咪店APP-iOS
      };





      var projectCode = projectCodeMeta[project];

      // 默认扩展配置, 已咪店优选为基础
      exports.projectCode = projectCode; var extConfig = {
        name: '咪店',
        logo: 'https://pic5.40017.cn/i/ori/OTPO20bsSk.png',
        protocolName: {
          '30001': '咪店平台服务协议',
          '30002': '咪店隐私权政策',
          '30003': '咪店店主服务协议',
          '30004': 'C2C服务协议',
          '30005': '99vip会员服务协议'
        }
      }; exports.extConfig = extConfig;


      var extAble = false;

      // #region 第三方配置
      exports.extAble = extAble;
      var extConfigMeta = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
      // 如果从ext配置中获取不到projectCode则认定不是sass小程序
      exports.extAble = extAble = !!extConfigMeta.projectCode;


      if (extAble) {
        // 更新扩展配置
        exports.extConfig = extConfig = extConfigMeta;
        // 强制更新projectCode
        exports.projectCode = projectCode = extConfig.projectCode;
      }
      Object.assign(extConfig, { extAble: extAble });
      // #endregion

      // 自营logo名称
      Object.assign(extConfig, {
        sourceLogo: 'https://pic5.40017.cn/i/ori/Qucoj8Vhuw.png',
        sourceName: '名品优选'
      });


      // 扩展extConfig协议地址
      Object.assign(extConfig, {
        protocolUrl: (_protocolUrl = {
          baseUrl: 'https://m.1jingxi.com/surpriseplus/protocol2/'
        }, _ =

          '30001', _mutatorMap = {}, _mutatorMap[_] = _mutatorMap[_] || {}, _mutatorMap[_].get = function () { return "".concat(this.baseUrl, "30001.html?title=").concat(encodeURIComponent(extConfig.protocolName[30001])); }, _2 =
          '30002', _mutatorMap[_2] = _mutatorMap[_2] || {}, _mutatorMap[_2].get = function () { return "".concat(this.baseUrl, "30002.html?title=").concat(encodeURIComponent(extConfig.protocolName[30002])); }, _3 =
          '30003', _mutatorMap[_3] = _mutatorMap[_3] || {}, _mutatorMap[_3].get = function () { return "".concat(this.baseUrl, "30003.html?title=").concat(encodeURIComponent(extConfig.protocolName[30003])); }, _4 =
          '30004', _mutatorMap[_4] = _mutatorMap[_4] || {}, _mutatorMap[_4].get = function () { return "".concat(this.baseUrl, "30004.html?title=").concat(encodeURIComponent(extConfig.protocolName[30004])); }, _5 =
          '30005', _mutatorMap[_5] = _mutatorMap[_5] || {}, _mutatorMap[_5].get = function () { return "".concat(this.baseUrl, "30005.html?title=").concat(encodeURIComponent(extConfig.protocolName[30005])); }, _defineEnumerableProperties(_protocolUrl, _mutatorMap), _protocolUrl)
      });

      /***/
    }),

  /***/ 22:
  /*!****************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/request2.js ***!
    \****************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        var _cryptHelper = _interopRequireDefault(__webpack_require__(/*! @/utils/crypt-helper */ 12));

        var _url = _interopRequireDefault(__webpack_require__(/*! ./url */ 19));




        var _loginResult = _interopRequireDefault(__webpack_require__(/*! ./login-result */ 9));
        var _mta = __webpack_require__(/*! ./mta */ 23);



        var _global = __webpack_require__(/*! ./global.config */ 21); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); } function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); } function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; } function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




        // #region Task
        var statusSymbol = Symbol('status'),
          actionSymbol = Symbol('action'); var



            Task = /*#__PURE__*/function () {
              function Task() {
                _classCallCheck(this, Task);
                this[statusSymbol] = 'pending';
              } _createClass(Task, [{
                key: "abort", value: function abort() {
                  if (this[statusSymbol] === 'pending') {
                    this[actionSymbol] && this[actionSymbol]();
                    this[statusSymbol] = 'rejected';
                  }
                }
              }, {
                key: "resolved", value: function resolved() {
                  if (this[statusSymbol] === 'pending') {
                    this[statusSymbol] = 'resolved';
                  }
                }
              }, {
                key:
                  actionSymbol, value: function value() {

                  }
              }, { key: "status", get: function get() { return this[statusSymbol]; } }]); return Task;
            }();


        Task.ActionSymbol = actionSymbol;

        // #endregion

        /**
         * 接口访问2
         */
        module.exports = function (_ref) {
          var _this = this; var target = _ref.url, _ref$data = _ref.data, data = _ref$data === void 0 ? {} : _ref$data, _success = _ref.success, down = _ref.down, _fail = _ref.fail, _complete = _ref.complete, _ref$enCode = _ref.enCode, enCode = _ref$enCode === void 0 ? false : _ref$enCode, _ref$deCode = _ref.deCode, deCode = _ref$deCode === void 0 ? false : _ref$deCode, _ref$mode = _ref.mode, mode = _ref$mode === void 0 ? "normal3" : _ref$mode, _ref$method = _ref.method, method = _ref$method === void 0 ? 'POST' : _ref$method;

          var task = new Task();

          var promise = Promise.resolve();

          promise = (0, _loginResult.default)();






          promise.then(function (info) {
            if (task.status !== 'pending') {
              _fail && _fail.call(null, {
                errMsg: "abort"
              });

              _complete && _complete.call(null, {
                errMsg: "abort"
              });

              return;
            } var _ref2 =
              Array.isArray(info) ? info : [], _ref3 = _slicedToArray(_ref2, 4), _ref3$ = _ref3[0], sys = _ref3$ === void 0 ? {} : _ref3$, _ref3$2 = _ref3[1], property = _ref3$2 === void 0 ? {} : _ref3$2, _ref3$3 = _ref3[2], devc = _ref3$3 === void 0 ? {} : _ref3$3, _ref3$4 = _ref3[3], client = _ref3$4 === void 0 ? {} : _ref3$4;

            var token = uni.getStorageSync("token");
            if (token) {
              var params = data;

              params.LoginId = data.MemberId ? data.MemberId : token.MemberId;
              params.MemberId = data.MemberId ? data.MemberId : token.MemberId;
              params.OpendId = data.OpenId ? data.OpenId : token.OpenId;
              params.PostKey = data.PostKey ? data.PostKey : token.PostKey;
              params.Secretkey = data.Secretkey ? data.Secretkey : token.Secretkey;
              params.TokenKey = data.TokenKey ? data.TokenKey : token.TokenKey;
              params.ShareUserID = token.ShareUserID || undefined;
              params.SceneId = uni.getStorageSync('scene') || undefined;
              params.Version = _url.default.version;
              params.ShopMemberId = data.ShopkeeperLoginID ? data.ShopkeeperLoginID : uni.getStorageSync("ShopkeeperLoginID") || 0;
              params.ShopID = data.ShopID ? data.ShopID : uni.getStorageSync("ShopID") || 0;
              params.POPAccountID = data.POPAccountID ? data.POPAccountID : token.POPAccountID;
              params.POPSupplierID = data.POPSupplierID ? data.POPSupplierID : token.POPSupplierID;
              params.UserName = token.NickName ? token.NickName : '';
              params.BaseTimeStamp = token.BaseTimeStamp ? token.BaseTimeStamp : '';





              Object.assign(params, {
                ProjectCode: data.ProjectCode ? data.ProjectCode : _global.projectCode,
                PlatformCode: data.PlatformCode ? data.PlatformCode : _global.platform
              },
                params);

              console.log(">>>>>>发送请求>>>>>>", _url.default[mode] + target, JSON.stringify(params));
              var startTime = new Date();
              var requestTask = uni.request({
                url: _url.default[mode] + target,
                method: method,
                data: method.toUpperCase() === 'POST' ? enCode ? {
                  Data: _cryptHelper.default.Encrypt(JSON.stringify(params))
                } :
                  params : undefined,
                success: function success(res) {
                  if (deCode) {
                    res.data = JSON.parse(_cryptHelper.default.Decrypt(res.data));
                  }
                  if (res.data.ResultCode == 1) {
                    console.log("<<<<<<<<<<请求返回成功<<<<<<<<<<", target, "", res.data);
                    _success && _success.call(null, res.data.Body, res);
                  } else if (res.data.ResultCode == 2) {
                    console.warn("<<<<<<<<<<请求失败<<<<<<<<<<", target, "，请求参数有问题", res.data);
                    down && down.call(null, res);
                  } else if (res.data.ResultCode == 3) {
                    console.warn("<<<<<<<<<<请求失败<<<<<<<<<<", target, "，服务器异常", res.data);
                    down && down.call(null, res);
                  } else if (res.data.ResultCode == 200) {






                    console.warn("<<<<<<<<<<请求失败<<<<<<<<<<", target, "，尝试重新登录", res.data);
                    down && down.call(null, res);
                    uni.$emit('RELOGIN');
                  } else if (res.data.ResultCode == 4) {
                    down && down.call(null, res);
                  } else {
                    down && down.call(null, res);
                  }
                },
                fail: function fail(e) {
                  var endTime = new Date();
                  console.warn("<<<<<<<<<请求失败<<<<<<<<<<", target, "原因:", e);

                  // 替换默认终止信息
                  var errMsg = e.errMsg;
                  if (errMsg.indexOf('abort') > -1) {
                    e.errMsg = 'abort';
                  }
                  _fail && _fail.call(null, e);

                  if (mode === 'monitor') {
                    // do nothing
                  } else {
                    (0, _mta.except)({
                      level: 1,
                      path: _url.default[mode] + target,
                      message: "startTime:".concat(startTime, " ").concat(startTime.getTime(), "\r\nendTime:").concat(endTime, " ").concat(endTime.getTime(), "\r\nparams:").concat(JSON.stringify(params), "\r\nreason:").concat(JSON.stringify(e))
                    },
                      'network', 1);
                  }
                },
                complete: function complete(e) {
                  // 替换默认终止信息
                  var errMsg = e.errMsg;
                  if (errMsg.indexOf('abort') > -1) {
                    e.errMsg = 'abort';
                  }
                  task.resolved();
                  _complete && _complete.call(null, e);
                }
              });


              task[Task.ActionSymbol] = function () {
                requestTask.abort();
              };
            } else {
              if (_this && _this.$store) {
                _this.$store.commit('hasToken', false);
              }
              //









            }
            return token;
          });

          return task;
        };
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 23:
  /*!***********************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/mta.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.SPM = SPM; exports.except = except; exports.default = void 0; var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 24)); var _queue = _interopRequireDefault(__webpack_require__(/*! ../utils/queue */ 27));
        var _guid = _interopRequireDefault(__webpack_require__(/*! @/utils/guid */ 28));

        var _loginResult = _interopRequireDefault(__webpack_require__(/*! ./login-result */ 9));
        var _systemInfo = _interopRequireDefault(__webpack_require__(/*! ./system-info */ 20));
        var _sceneHandler = _interopRequireDefault(__webpack_require__(/*! ./scene-handler */ 29));

        var _getUserInfo = _interopRequireDefault(__webpack_require__(/*! ./get-user-info */ 30)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; } function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); } function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; } function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; } function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); } function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; } function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } } function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); } function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); } function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } var URL = __webpack_require__(/*! ./url */ 19); var _require =





          __webpack_require__(/*! ./global.config */ 21), projectCode = _require.projectCode, platform = _require.platform;

        // #region spm
        var SPMQueue = /*#__PURE__*/function (_Queue) {
          _inherits(SPMQueue, _Queue); var _super = _createSuper(SPMQueue);
          function SPMQueue() {
            _classCallCheck(this, SPMQueue);

            (0, _getUserInfo.default)().then(function (res) {
              if (res.errMsg === 'getUserInfo:ok') {
                uni.setStorage({
                  key: 'wxUserInfo',
                  data: res.userInfo
                });

              }
            }); return _super.call(this);


          } _createClass(SPMQueue, [{
            key: "insert", value: function insert() {
              var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              if (!option.spm) {
                return;
              }
              if (option.scene) {
                option = Object.assign((0, _sceneHandler.default)(option.scene), option);
              }
              var target = {
                h: uni.getStorageSync('scene') || 0, // 场景值
                type: projectCode, // projectCode
                p: platform, // 平台
                unique: option.unique || "".concat((0, _guid.default)(), ",").concat(Date.now()),
                s: option.spm || '', // SPM
                ot: option.ot || 0, // 事件类型, 0 点击事件, 13801 小程序打开, 13802 小程序关闭, 13803 页面加载, 13804 页面分享, 13807 小程序页面离开
                otrecord: option.records || [], // 页面事件记录
                path: option.path, // 页面路径
                param: option.param, // 页面参数
                btime: option.btime, // 打开时间
                etime: option.etime // 离开时间
              };
              _get(_getPrototypeOf(SPMQueue.prototype), "insert", this).call(this, target);
            }
          }, {
            key:
              _queue.default.handlerSymbol, value: function () {
                var _value = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(msg) {
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0: return _context.abrupt("return",
                          Promise.all([
                            (0, _loginResult.default)(50).catch(function () { }),
                            _systemInfo.default.catch(function () { })]).
                            then(function () {
                              return new Promise(function (resolve) {
                                var wxUserInfo = {};


                                Object.assign(wxUserInfo, uni.getStorageSync('wxUserInfo') || {});


                                var systemInfo = uni.getStorageSync('systemInfo') || {};

                                var token = uni.getStorageSync("token") || {};
                                var device = uni.getStorageSync("device") || {};
                                var shopId = uni.getStorageSync("ShopID") || 0;
                                var shopkeeperLoginID = uni.getStorageSync('ShopkeeperLoginID') || 0;

                                var param = {};
                                Object.assign(param, msg, {
                                  de: systemInfo.brand || systemInfo.model || '', // 设备名称
                                  t: token.Secretkey,
                                  ck: URL['version'] || '', // 版本



                                  i: token.IsNewMember || 0, // 是否是新会员
                                  id: token.MemberId || 0, // 会员id
                                  u: device.uuid || '', // 设备识别码
                                  sid: shopId || 0,
                                  cid: shopkeeperLoginID || 0,
                                  uname: token.NickName,
                                  ucountry: wxUserInfo.country, // 国家
                                  up: wxUserInfo.province, // 省份
                                  ucity: wxUserInfo.city, // 城市
                                  usex: wxUserInfo.gender, // 性别
                                  uage: '', // 年龄

                                  br: systemInfo.brand, // 品牌
                                  pm: systemInfo.model, // 型号
                                  ww: systemInfo.windowWidth, // 宽口宽度
                                  wh: systemInfo.windowHeight, // 窗口高度
                                  wvv: systemInfo.version, // 引擎版本号
                                  sv: systemInfo.system // 操作系统版本
                                });

                                uni.request({
                                  url: "".concat(URL['monitor'], "api/Track/SpmNew"),
                                  method: "POST",
                                  data: param,
                                  complete: function complete(res) {
                                    if (token.IsNewMember === 1) {
                                      uni.setStorageSync('token', Object.assign(token, {
                                        IsNewMember: 0
                                      }));

                                    }
                                    resolve();
                                  }
                                });

                              });
                            })); case 1: case "end": return _context.stop();
                      }
                    }
                  }, _callee);
                })); function value(_x) { return _value.apply(this, arguments); } return value;
              }()
          }]); return SPMQueue;
        }(_queue.default);



        var spmQueue = new SPMQueue();
        function SPM(option) {
          spmQueue.insert(option);
        };
        // #endregion

        // #region 异常收集
        var ExceptionQueue = /*#__PURE__*/function (_Queue2) {
          _inherits(ExceptionQueue, _Queue2); var _super2 = _createSuper(ExceptionQueue);
          function ExceptionQueue() {
            var _this; _classCallCheck(this, ExceptionQueue);
            _this = _super2.call(this);
            _this.overlook = ['Yn.env.USER_DATA_PATH']; return _this;
          }
    /**
       *
       * @param { String|Object|Error } ex 异常内容
       * @param { String } filter 异常过滤字段
       * @param { Number } level 异常等级 info 0, Warn 1, Error 2
       */_createClass(ExceptionQueue, [{
            key: "insert", value: function insert(
              ex) {
              var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined; var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
              var param = {},
                pageUrl = getPageUrl();
              if (ex instanceof Error) {
                param.Level = 0;
                param.RequestUrl = pageUrl || '';
                param.RequestParam = "".concat(ex.message, "\r\n").concat(ex.stack);
              } else if (ex instanceof Object) {
                param.Level = ex.level || 0;
                param.RequestUrl = ex.path || pageUrl || '';
                param.RequestParam = ex.message || '';
              } else {
                param.Level = 0;
                param.RequestUrl = pageUrl || '';
                param.RequestParam = String(ex);
              }
              if (filter) {
                param.filter = filter;
              }
              if (level && !param.Level) {
                param.Level = Number(level) || 0;
              }

              if (this.overlookHandler(param.RequestParam)) {
                return;
              }
              _get(_getPrototypeOf(ExceptionQueue.prototype), "insert", this).call(this, param);

            }
      /**
         * 过滤处理
         */ }, {
            key: "overlookHandler", value: function overlookHandler(
              message) {
              return this.overlook.some(function (rule) { return message.indexOf(rule) > -1; });
            }
          }, {
            key:
              _queue.default.handlerSymbol, value: function () {
                var _value2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(msg) {
                  return _regenerator.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0: return _context2.abrupt("return",
                          Promise.all([
                            (0, _loginResult.default)(50).catch(function () { }),
                            _systemInfo.default.catch(function () { })]).
                            then(function () {
                              return new Promise(function (resolve) {
                                var systemInfo = uni.getStorageSync('systemInfo') || {};
                                var token = uni.getStorageSync("token") || {};
                                var device = uni.getStorageSync("device") || {};

                                var version = URL.version || '';




                                var baseParam = {
                                  LoginId: token.MemberId,
                                  MemberId: token.MemberId,
                                  OpendId: token.OpenId,
                                  PostKey: token.PostKey,
                                  Secretkey: token.Secretkey,
                                  TokenKey: token.TokenKey,
                                  SceneId: token.SceneId || undefined,
                                  Version: version,
                                  Brand: systemInfo.brand,
                                  UIDevice: device.uuid,
                                  ProjectCode: projectCode,
                                  PlatformCode: platform,
                                  BaseTimeStamp: token.BaseTimeStamp ? token.BaseTimeStamp : ''
                                };

                                uni.request({
                                  url: "".concat(URL['monitor'], "api/CommonPage/FrontEndException"),
                                  method: "POST",
                                  data: Object.assign(baseParam, msg),
                                  complete: function complete() {
                                    resolve();
                                  }
                                });

                              });
                            })); case 1: case "end": return _context2.stop();
                      }
                    }
                  }, _callee2);
                })); function value(_x2) { return _value2.apply(this, arguments); } return value;
              }()
          }]); return ExceptionQueue;
        }(_queue.default);



        function getPageUrl() {
          try {
            var a = getCurrentPages(),
              b = "/";

            if (0 < a.length) {
              var page = a.pop(),
                options = page.options || {};
              var arr = [page.__route__];
              var urlParam = Object.keys(options).reduce(function (last, key) {
                return "".concat(last).concat(last && '&').concat(key, "=").concat(options[key]);
              }, '');
              if (urlParam) {
                arr.push(urlParam);
              }
              b = arr.join('?');
            }
            return b;
          } catch (c) {
            console.log("get current page path error:" + c);
          }
        }

        var exceptionQueue = new ExceptionQueue();
        /**
                                                    * 异常收集
                                                    */
        function except(ex) {
          exceptionQueue.insert(ex);
        };
        // #endregion
        var _default =


        {
          App: {
            init: function init(o) {

            }
          },

          Page: {
            init: function init(o) {
              SPM(o);
            }
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 24:
  /*!*********************************************************************************************!*\
    !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
    \*********************************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      module.exports = __webpack_require__(/*! regenerator-runtime */ 25);

      /***/
    }),

  /***/ 2400:
  /*!********************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/components/share-poster/service.js ***!
    \********************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 24)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } var _default = {
          /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 计算数字比例
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @param {number} num 数字
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
          setScale: function setScale(num) {
            return num * 0.7;
          },
          /* 获取手机相册写权限 */
          getWritePhotosAlbumAuth: function getWritePhotosAlbumAuth() {
            var _this = this;




            uni.getSetting({
              success: function success(_ref) {
                var authSetting = _ref.authSetting;
                var result = authSetting['scope.writePhotosAlbum'];
                if (result != undefined) {
                  _this.writePhotosAlbumAuth = Number(result);
                }
              }
            });


          },
          /**
              * 获取菊花码
              */
          getQRCode: function getQRCode(page, scene) {
            var _this2 = this;
            var self = this;
            this.$app.genQRCode(page, scene).then(function (res) {







              _this2.ewmUrl = res;

            }).catch(function (ex) {
              if (typeof ex === 'object') {
                uni.showToast({
                  mask: true,
                  title: res.data.ResultMsg,
                  icon: "none"
                });

              }
            });
          },
          /**
              * 保存图片
              */
          savePic: function savePic() {
            var _this3 = this; return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {
              var timer; return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0: _context.prev = 0;

                      uni.showLoading({
                        mask: true,
                        title: '保存中...'
                      });

                      // 画海报
                      _context.next = 4; return _this3.startDraw(); case 4: _context.next = 6; return (

                        new Promise(function (resolve, reject) {
                          var timer = setTimeout(function () {
                            resolve();
                            clearTimeout(timer);
                          }, 2000);
                        })); case 6: _context.next = 8; return (

                          new Promise(function (resolve, reject) {
                            uni.canvasToTempFilePath({
                              canvasId: "canvasPoster",
                              success: function success(_ref2) {
                                var tempFilePath = _ref2.tempFilePath;
                                uni.saveImageToPhotosAlbum({
                                  filePath: tempFilePath,
                                  success: function success() {
                                    resolve();
                                  },
                                  fail: function fail(err) {
                                    reject(err);
                                  }
                                });

                              },
                              fail: function fail(err) {
                                reject(err);
                              }
                            },
                              _this3);
                          })); case 8:
                      uni.showToast({
                        title: '保存成功'
                      });

                      _this3.$app.SPM({
                        spm: '2.22.489.1',
                        ot: 13805
                      }); _context.next = 16; break; case 12: _context.prev = 12; _context.t0 = _context["catch"](0);


                      uni.showToast({
                        icon: 'none',
                        title: '保存失败'
                      });

                      console.error(_context.t0); case 16: _context.prev = 16;

                      timer = setTimeout(function () {
                        uni.hideLoading();
                        clearTimeout(timer);
                      }, 2000); return _context.finish(16); case 19: case "end": return _context.stop();
                  }
                }
              }, _callee, null, [[0, 12, 16, 19]]);
            }))();

          },
          savePic2: function savePic2(src) {
            var _this4 = this;
            uni.showLoading({
              mask: true,
              title: '保存中...'
            });

            this.getImage(src).then(function (imgInfo) {
              return new Promise(function (resolve, reject) {
                uni.saveImageToPhotosAlbum({
                  filePath: imgInfo.path,
                  success: function success() {
                    resolve();
                  },
                  fail: function fail(err) {
                    reject(err);
                  }
                });

              });
            }).then(function () {
              uni.showToast({
                title: '保存成功'
              });

              _this4.$app.SPM({
                spm: '2.22.489.1',
                ot: 13805
              });

            }).catch(function (ex) {
              uni.showToast({
                icon: 'none',
                title: '保存失败'
              });

            }).then(function () {
              var timer = setTimeout(function () {
                uni.hideLoading();
                clearTimeout(timer);
              }, 2000);
            });
          },
          /**
              * 获取图片
              * @param String src 图片体质
              * @returns Promise
              */
          getImage: function getImage(src) {
            if (!src) {
              return Promise.reject('非法的地址');
            }
            return new Promise(function (resolve, reject) {
              uni.getImageInfo({
                src: src,
                success: function success(res) {
                  resolve(res);
                },
                fail: function fail() {
                  reject();
                }
              });

            });
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 2436:
  /*!*****************************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/components/share-poster-material/service.js ***!
    \*****************************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 24)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } var _default = {
          /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 获取图片
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @param String src 图片地址
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @returns Promise
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
          getImage: function getImage(src) {
            if (!src) {
              return Promise.reject('非法的地址');
            }
            return new Promise(function (resolve, reject) {
              uni.getImageInfo({
                src: src,
                success: function success(res) {
                  resolve(res);
                },
                fail: function fail(err) {
                  reject('share-poster-material组件getImageInfo:下载图片失败-' + src);
                }
              });

            });
          },
          /**
              * 根据字体宽度计算文本可以分几行
              * @param {string} text 文本
              * @param {number} width 限制宽度
              */
          muliteLine: function muliteLine(_ref) {
            var text = _ref.text, width = _ref.width, ctx = _ref.ctx;
            var arrText = (text || '').split(''),
              line = '',
              arrTr = [];
            for (var i = 0; i < arrText.length; i++) {
              var testLine = line + arrText[i];
              var metrics = this.measureText(testLine, ctx);
              if (metrics.width > width && i > 0) {
                arrTr.push(line);
                line = arrText[i];
              } else {
                line = testLine;
              }
              if (i == arrText.length - 1) {
                arrTr.push(line);
              }
            }
            return arrTr;
          },
          /**
              * 解决华为手机canvas上不能正常显示人民币符号的bug
              */
          getCNY: function getCNY() {
            return "".concat(unescape("\xA5".replace(/\\/g, '%')));
          },
          /**
              * 获取字体宽度
              * @param {string} text 文本
              * @param {CanvasElement} ctx  canvas实例
              */
          measureText: function measureText(text, ctx) {

            return ctx.measureText(text);






































          },
          /**
              *
              * @param {Object} cxt
              * @param {Object} x
              * @param {Object} y
              * @param {Object} width
              * @param {Object} height
              * @param {Object} radius
              */
          drawRoundRect: function drawRoundRect(color, x, y, width, height, radius, ctx) {
            return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      ctx.fillStyle = color;
                      ctx.beginPath();
                      ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
                      ctx.lineTo(width - radius + x, y);
                      ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
                      ctx.lineTo(width + x, height + y - radius);
                      ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
                      ctx.lineTo(radius + x, height + y);
                      ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
                      ctx.closePath();
                      ctx.fill(); case 11: case "end": return _context.stop();
                  }
                }
              }, _callee);
            }))();
          },
          drawImage: function drawImage(url, x, y, w, h, ctx) {
            var _this = this; return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
              var _yield$_this$getImage, path, width, height; return _regenerator.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0: if (!(
                      url.indexOf('data:image') == 0)) { _context2.next = 4; break; }
                      ctx.drawImage(url, x, y, w, h); _context2.next = 11; break; case 4: _context2.next = 6; return (





                        _this.getImage(url)); case 6: _yield$_this$getImage = _context2.sent; path = _yield$_this$getImage.path; width = _yield$_this$getImage.width; height = _yield$_this$getImage.height;
                      ctx.drawImage(path, x, y, w, h); case 11: case "end": return _context2.stop();
                  }
                }
              }, _callee2);
            }))();

          },
          drawRect: function drawRect(color, x, y, w, h, ctx) {
            return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
              return _regenerator.default.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      ctx.fillStyle = color;
                      ctx.fillRect(x, y, w, h); case 2: case "end": return _context3.stop();
                  }
                }
              }, _callee3);
            }))();
          },
          drawCircle: function drawCircle(r, x, y, sDeg, ctx) {
            return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
              return _regenerator.default.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      ctx.beginPath();
                      ctx.arc(x, y, r, sDeg, 2 * Math.PI);
                      ctx.setStrokeStyle('#fff');
                      ctx.stroke(); case 4: case "end": return _context4.stop();
                  }
                }
              }, _callee4);
            }))();
          },
          drawText: function drawText(color, fontSize, text, x, y, w, lineNum, ctx) {
            var _this2 = this; return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
              var lines, lineArr, textMar, lineCut; return _regenerator.default.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      ctx.fillStyle = color;
                      ctx.setFontSize(Math.round(fontSize));
                      ctx.textBaseline = 'top';
                      if (lineNum != undefined) {
                        lines = lineNum;
                        lineArr = _this2.muliteLine({
                          text: text,
                          width: w,
                          ctx: ctx
                        });

                        textMar = lineNum > 1 ? 5 : 0;
                        lineCut = lineArr.slice(0, lines);
                        if (lineArr.length > lines) {
                          lineCut[lines - 1] = lineCut[lines - 1].slice(0, -1) + '…';
                        }
                        lineCut.forEach(function (item, index) {
                          ctx.fillText(item, x, y + (fontSize + textMar) * index);
                        });
                      } else {
                        ctx.fillText(text, x, y);
                      } case 4: case "end": return _context5.stop();
                  }
                }
              }, _callee5);
            }))();
          },
          drawLine: function drawLine(color, sX, sY, eX, eY, ctx) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.moveTo(sX, sY);
            ctx.lineTo(eX, eY);
            ctx.stroke();
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 2444:
  /*!******************************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/components/share-poster-material1/service.js ***!
    \******************************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 24)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } var _default = {
          /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 获取图片
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @param String src 图片地址
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @returns Promise
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
          getImage: function getImage(src) {
            if (!src) {
              return Promise.reject('非法的地址');
            }
            return new Promise(function (resolve, reject) {
              uni.getImageInfo({
                src: src,
                success: function success(res) {
                  resolve(res);
                },
                fail: function fail() {
                  reject('share-poster-material组件getImageInfo:下载图片失败');
                }
              });

            });
          },
          /**
              * 根据字体宽度计算文本可以分几行
              * @param {string} text 文本
              * @param {number} width 限制宽度
              */
          muliteLine: function muliteLine(_ref) {
            var text = _ref.text, width = _ref.width, ctx = _ref.ctx;
            var arrText = (text || '').split(''),
              line = '',
              arrTr = [];
            for (var i = 0; i < arrText.length; i++) {
              var testLine = line + arrText[i];
              var metrics = this.measureText(testLine, ctx);
              if (metrics.width > width && i > 0) {
                arrTr.push(line);
                line = arrText[i];
              } else {
                line = testLine;
              }
              if (i == arrText.length - 1) {
                arrTr.push(line);
              }
            }
            return arrTr;
          },
          /**
              * 解决华为手机canvas上不能正常显示人民币符号的bug
              */
          getCNY: function getCNY() {
            return "".concat(unescape("\xA5".replace(/\\/g, '%')));
          },
          /**
              * 获取字体宽度
              * @param {string} text 文本
              * @param {CanvasElement} ctx  canvas实例
              */
          measureText: function measureText(text, ctx) {

            return ctx.measureText(text);






































          },
          drawImage: function drawImage(url, x, y, w, h, ctx, circle) {
            var _this = this; return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {
              var _yield$_this$getImage, path, width, height; return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0: _context.next = 2; return (




                      _this.getImage(url)); case 2: _yield$_this$getImage = _context.sent; path = _yield$_this$getImage.path; width = _yield$_this$getImage.width; height = _yield$_this$getImage.height;
                      if (circle) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(90 * _this.scalaRatio, 1122 * _this.scalaRatio, 50 * _this.scalaRatio, 0, 2 * Math.PI);
                        ctx.clip();
                      }
                      ctx.drawImage(path, x, y, w, h);
                      ctx.restore(); case 9: case "end": return _context.stop();
                  }
                }
              }, _callee);
            }))();
          },
          drawRect: function drawRect(color, x, y, w, h, ctx) {
            return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
              return _regenerator.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      ctx.fillStyle = color;
                      ctx.fillRect(x, y, w, h); case 2: case "end": return _context2.stop();
                  }
                }
              }, _callee2);
            }))();
          },
          drawCircle: function drawCircle(r, x, y, sDeg, ctx) {
            return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
              return _regenerator.default.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      ctx.beginPath();
                      ctx.arc(color, x, y, r, sDeg, 2 * Math.PI);
                      ctx.setStrokeStyle(color);
                      ctx.stroke(); case 4: case "end": return _context3.stop();
                  }
                }
              }, _callee3);
            }))();
          },
          drawText: function drawText(color, fontSize, text, x, y, w, lineNum, ctx) {
            var _this2 = this; return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
              var lines, lineArr, textMar, lineCut; return _regenerator.default.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      ctx.fillStyle = color;
                      ctx.setFontSize(Math.round(fontSize));
                      ctx.textBaseline = 'top';
                      if (lineNum != undefined) {
                        lines = lineNum;
                        lineArr = _this2.muliteLine({
                          text: text,
                          width: w,
                          ctx: ctx
                        });

                        textMar = lineNum > 1 ? 5 : 0;
                        lineCut = lineArr.slice(0, lines);
                        if (lineArr.length > lines) {
                          lineCut[lines - 1] = lineCut[lines - 1].slice(0, -1) + '…';
                        }
                        lineCut.forEach(function (item, index) {
                          ctx.fillText(item, x, y + (fontSize + textMar) * index);
                        });
                      } else {
                        ctx.fillText(text, x, y);
                      } case 4: case "end": return _context4.stop();
                  }
                }
              }, _callee4);
            }))();
          },
          drawLine: function drawLine(color, sX, sY, eX, eY, ctx) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.moveTo(sX, sY);
            ctx.lineTo(eX, eY);
            ctx.stroke();
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 25:
  /*!************************************************************!*\
    !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      /**
       * Copyright (c) 2014-present, Facebook, Inc.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */

      // This method of obtaining a reference to the global object needs to be
      // kept identical to the way it is obtained in runtime.js
      var g = (function () {
        return this || (typeof self === "object" && self);
      })() || Function("return this")();

      // Use `getOwnPropertyNames` because not all browsers support calling
      // `hasOwnProperty` on the global `self` object in a worker. See #183.
      var hadRuntime = g.regeneratorRuntime &&
        Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

      // Save the old regeneratorRuntime in case it needs to be restored later.
      var oldRuntime = hadRuntime && g.regeneratorRuntime;

      // Force reevalutation of runtime.js.
      g.regeneratorRuntime = undefined;

      module.exports = __webpack_require__(/*! ./runtime */ 26);

      if (hadRuntime) {
        // Restore the original runtime.
        g.regeneratorRuntime = oldRuntime;
      } else {
        // Remove the global property added by runtime.js.
        try {
          delete g.regeneratorRuntime;
        } catch (e) {
          g.regeneratorRuntime = undefined;
        }
      }


      /***/
    }),

  /***/ 2554:
  /*!******************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/index/goto-goods-detail.js ***!
    \******************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _throttle = _interopRequireDefault(__webpack_require__(/*! @/utils/throttle */ 71)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } var _default =

          (0, _throttle.default)(function (item, index) {

            if (this.customCallback === true) {
              this.$emit('gotoDetail', item);
              return;
            }

            if (item.UnionCode == 30104) {
              // 咪店优选
              uni.navigateTo({
                url: "/pages/buying-normal/index?id=".concat(item.GoodsInfo.id)
              });

            } else if (item.UnionCode == 30105 || item.UnionCode == 30106) {
              //吃喝玩乐
              uni.navigateTo({
                url: "/pages/welfare-detail/welfare-detail?mission=".concat(item.GoodsInfo.id)
              });

            } else {
              //京东  拼多多
              uni.navigateTo({
                url: "/pages/buying-pdd/index?id=".concat(item.GoodsInfo.id, "&unionCode=").concat(item.UnionCode, "&productBelong=").concat(item.GoodsInfo.ProductBelong || '', "&duJiaSupplierId=").concat(item.GoodsInfo.DujiaSupplierId || '')
              });

            }

            if (this.hot) {
              this.$app.SPM({
                spm: "7.314.318.".concat(index + 1, ".").concat(item.GoodsInfo.id)
              });

            }
          }, 2000, { trailing: false }); exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 26:
  /*!*****************************************************!*\
    !*** ./node_modules/regenerator-runtime/runtime.js ***!
    \*****************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

      /**
       * Copyright (c) 2014-present, Facebook, Inc.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */

      !(function (global) {
        "use strict";

        var Op = Object.prototype;
        var hasOwn = Op.hasOwnProperty;
        var undefined; // More compressible than void 0.
        var $Symbol = typeof Symbol === "function" ? Symbol : {};
        var iteratorSymbol = $Symbol.iterator || "@@iterator";
        var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

        var inModule = typeof module === "object";
        var runtime = global.regeneratorRuntime;
        if (runtime) {
          if (inModule) {
            // If regeneratorRuntime is defined globally and we're in a module,
            // make the exports object identical to regeneratorRuntime.
            module.exports = runtime;
          }
          // Don't bother evaluating the rest of this file if the runtime was
          // already defined globally.
          return;
        }

        // Define the runtime globally (as expected by generated code) as either
        // module.exports (if we're in a module) or a new, empty object.
        runtime = global.regeneratorRuntime = inModule ? module.exports : {};

        function wrap(innerFn, outerFn, self, tryLocsList) {
          // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
          var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
          var generator = Object.create(protoGenerator.prototype);
          var context = new Context(tryLocsList || []);

          // The ._invoke method unifies the implementations of the .next,
          // .throw, and .return methods.
          generator._invoke = makeInvokeMethod(innerFn, self, context);

          return generator;
        }
        runtime.wrap = wrap;

        // Try/catch helper to minimize deoptimizations. Returns a completion
        // record like context.tryEntries[i].completion. This interface could
        // have been (and was previously) designed to take a closure to be
        // invoked without arguments, but in all the cases we care about we
        // already have an existing method we want to call, so there's no need
        // to create a new function object. We can even get away with assuming
        // the method takes exactly one argument, since that happens to be true
        // in every case, so we don't have to touch the arguments object. The
        // only additional allocation required is the completion record, which
        // has a stable shape and so hopefully should be cheap to allocate.
        function tryCatch(fn, obj, arg) {
          try {
            return { type: "normal", arg: fn.call(obj, arg) };
          } catch (err) {
            return { type: "throw", arg: err };
          }
        }

        var GenStateSuspendedStart = "suspendedStart";
        var GenStateSuspendedYield = "suspendedYield";
        var GenStateExecuting = "executing";
        var GenStateCompleted = "completed";

        // Returning this object from the innerFn has the same effect as
        // breaking out of the dispatch switch statement.
        var ContinueSentinel = {};

        // Dummy constructor functions that we use as the .constructor and
        // .constructor.prototype properties for functions that return Generator
        // objects. For full spec compliance, you may wish to configure your
        // minifier not to mangle the names of these two functions.
        function Generator() { }
        function GeneratorFunction() { }
        function GeneratorFunctionPrototype() { }

        // This is a polyfill for %IteratorPrototype% for environments that
        // don't natively support it.
        var IteratorPrototype = {};
        IteratorPrototype[iteratorSymbol] = function () {
          return this;
        };

        var getProto = Object.getPrototypeOf;
        var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
        if (NativeIteratorPrototype &&
          NativeIteratorPrototype !== Op &&
          hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
          // This environment has a native %IteratorPrototype%; use it instead
          // of the polyfill.
          IteratorPrototype = NativeIteratorPrototype;
        }

        var Gp = GeneratorFunctionPrototype.prototype =
          Generator.prototype = Object.create(IteratorPrototype);
        GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
        GeneratorFunctionPrototype.constructor = GeneratorFunction;
        GeneratorFunctionPrototype[toStringTagSymbol] =
          GeneratorFunction.displayName = "GeneratorFunction";

        // Helper for defining the .next, .throw, and .return methods of the
        // Iterator interface in terms of a single ._invoke method.
        function defineIteratorMethods(prototype) {
          ["next", "throw", "return"].forEach(function (method) {
            prototype[method] = function (arg) {
              return this._invoke(method, arg);
            };
          });
        }

        runtime.isGeneratorFunction = function (genFun) {
          var ctor = typeof genFun === "function" && genFun.constructor;
          return ctor
            ? ctor === GeneratorFunction ||
            // For the native GeneratorFunction constructor, the best we can
            // do is to check its .name property.
            (ctor.displayName || ctor.name) === "GeneratorFunction"
            : false;
        };

        runtime.mark = function (genFun) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
          } else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            if (!(toStringTagSymbol in genFun)) {
              genFun[toStringTagSymbol] = "GeneratorFunction";
            }
          }
          genFun.prototype = Object.create(Gp);
          return genFun;
        };

        // Within the body of any async function, `await x` is transformed to
        // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
        // `hasOwn.call(value, "__await")` to determine if the yielded value is
        // meant to be awaited.
        runtime.awrap = function (arg) {
          return { __await: arg };
        };

        function AsyncIterator(generator) {
          function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") {
              reject(record.arg);
            } else {
              var result = record.arg;
              var value = result.value;
              if (value &&
                typeof value === "object" &&
                hasOwn.call(value, "__await")) {
                return Promise.resolve(value.__await).then(function (value) {
                  invoke("next", value, resolve, reject);
                }, function (err) {
                  invoke("throw", err, resolve, reject);
                });
              }

              return Promise.resolve(value).then(function (unwrapped) {
                // When a yielded Promise is resolved, its final value becomes
                // the .value of the Promise<{value,done}> result for the
                // current iteration.
                result.value = unwrapped;
                resolve(result);
              }, function (error) {
                // If a rejected Promise was yielded, throw the rejection back
                // into the async generator function so it can be handled there.
                return invoke("throw", error, resolve, reject);
              });
            }
          }

          var previousPromise;

          function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new Promise(function (resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }

            return previousPromise =
              // If enqueue has been called before, then we want to wait until
              // all previous Promises have been resolved before calling invoke,
              // so that results are always delivered in the correct order. If
              // enqueue has not been called before, then it is important to
              // call invoke immediately, without waiting on a callback to fire,
              // so that the async generator function has the opportunity to do
              // any necessary setup in a predictable way. This predictability
              // is why the Promise constructor synchronously invokes its
              // executor callback, and why async functions synchronously
              // execute code before the first await. Since we implement simple
              // async functions in terms of async generators, it is especially
              // important to get this right, even though it requires care.
              previousPromise ? previousPromise.then(
                callInvokeWithMethodAndArg,
                // Avoid propagating failures to Promises returned by later
                // invocations of the iterator.
                callInvokeWithMethodAndArg
              ) : callInvokeWithMethodAndArg();
          }

          // Define the unified helper method that is used to implement .next,
          // .throw, and .return (see defineIteratorMethods).
          this._invoke = enqueue;
        }

        defineIteratorMethods(AsyncIterator.prototype);
        AsyncIterator.prototype[asyncIteratorSymbol] = function () {
          return this;
        };
        runtime.AsyncIterator = AsyncIterator;

        // Note that simple async functions are implemented on top of
        // AsyncIterator objects; they just return a Promise for the value of
        // the final result produced by the iterator.
        runtime.async = function (innerFn, outerFn, self, tryLocsList) {
          var iter = new AsyncIterator(
            wrap(innerFn, outerFn, self, tryLocsList)
          );

          return runtime.isGeneratorFunction(outerFn)
            ? iter // If outerFn is a generator, return the full iterator.
            : iter.next().then(function (result) {
              return result.done ? result.value : iter.next();
            });
        };

        function makeInvokeMethod(innerFn, self, context) {
          var state = GenStateSuspendedStart;

          return function invoke(method, arg) {
            if (state === GenStateExecuting) {
              throw new Error("Generator is already running");
            }

            if (state === GenStateCompleted) {
              if (method === "throw") {
                throw arg;
              }

              // Be forgiving, per 25.3.3.3.3 of the spec:
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
              return doneResult();
            }

            context.method = method;
            context.arg = arg;

            while (true) {
              var delegate = context.delegate;
              if (delegate) {
                var delegateResult = maybeInvokeDelegate(delegate, context);
                if (delegateResult) {
                  if (delegateResult === ContinueSentinel) continue;
                  return delegateResult;
                }
              }

              if (context.method === "next") {
                // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;

              } else if (context.method === "throw") {
                if (state === GenStateSuspendedStart) {
                  state = GenStateCompleted;
                  throw context.arg;
                }

                context.dispatchException(context.arg);

              } else if (context.method === "return") {
                context.abrupt("return", context.arg);
              }

              state = GenStateExecuting;

              var record = tryCatch(innerFn, self, context);
              if (record.type === "normal") {
                // If an exception is thrown from innerFn, we leave state ===
                // GenStateExecuting and loop back for another invocation.
                state = context.done
                  ? GenStateCompleted
                  : GenStateSuspendedYield;

                if (record.arg === ContinueSentinel) {
                  continue;
                }

                return {
                  value: record.arg,
                  done: context.done
                };

              } else if (record.type === "throw") {
                state = GenStateCompleted;
                // Dispatch the exception by looping back around to the
                // context.dispatchException(context.arg) call above.
                context.method = "throw";
                context.arg = record.arg;
              }
            }
          };
        }

        // Call delegate.iterator[context.method](context.arg) and handle the
        // result, either by returning a { value, done } result from the
        // delegate iterator, or by modifying context.method and context.arg,
        // setting context.delegate to null, and returning the ContinueSentinel.
        function maybeInvokeDelegate(delegate, context) {
          var method = delegate.iterator[context.method];
          if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method always terminates the yield* loop.
            context.delegate = null;

            if (context.method === "throw") {
              if (delegate.iterator.return) {
                // If the delegate iterator has a return method, give it a
                // chance to clean up.
                context.method = "return";
                context.arg = undefined;
                maybeInvokeDelegate(delegate, context);

                if (context.method === "throw") {
                  // If maybeInvokeDelegate(context) changed context.method from
                  // "return" to "throw", let that override the TypeError below.
                  return ContinueSentinel;
                }
              }

              context.method = "throw";
              context.arg = new TypeError(
                "The iterator does not provide a 'throw' method");
            }

            return ContinueSentinel;
          }

          var record = tryCatch(method, delegate.iterator, context.arg);

          if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
          }

          var info = record.arg;

          if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
          }

          if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;

            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;

            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
              context.method = "next";
              context.arg = undefined;
            }

          } else {
            // Re-yield the result returned by the delegate method.
            return info;
          }

          // The delegate iterator is finished, so forget it and continue with
          // the outer generator.
          context.delegate = null;
          return ContinueSentinel;
        }

        // Define Generator.prototype.{next,throw,return} in terms of the
        // unified ._invoke helper method.
        defineIteratorMethods(Gp);

        Gp[toStringTagSymbol] = "Generator";

        // A Generator should always return itself as the iterator object when the
        // @@iterator function is called on it. Some browsers' implementations of the
        // iterator prototype chain incorrectly implement this, causing the Generator
        // object to not be returned from this call. This ensures that doesn't happen.
        // See https://github.com/facebook/regenerator/issues/274 for more details.
        Gp[iteratorSymbol] = function () {
          return this;
        };

        Gp.toString = function () {
          return "[object Generator]";
        };

        function pushTryEntry(locs) {
          var entry = { tryLoc: locs[0] };

          if (1 in locs) {
            entry.catchLoc = locs[1];
          }

          if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
          }

          this.tryEntries.push(entry);
        }

        function resetTryEntry(entry) {
          var record = entry.completion || {};
          record.type = "normal";
          delete record.arg;
          entry.completion = record;
        }

        function Context(tryLocsList) {
          // The root entry object (effectively a try statement without a catch
          // or a finally block) gives us a place to store values thrown from
          // locations where there is no enclosing try statement.
          this.tryEntries = [{ tryLoc: "root" }];
          tryLocsList.forEach(pushTryEntry, this);
          this.reset(true);
        }

        runtime.keys = function (object) {
          var keys = [];
          for (var key in object) {
            keys.push(key);
          }
          keys.reverse();

          // Rather than returning an object with a next method, we keep
          // things simple and return the next function itself.
          return function next() {
            while (keys.length) {
              var key = keys.pop();
              if (key in object) {
                next.value = key;
                next.done = false;
                return next;
              }
            }

            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
          };
        };

        function values(iterable) {
          if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) {
              return iteratorMethod.call(iterable);
            }

            if (typeof iterable.next === "function") {
              return iterable;
            }

            if (!isNaN(iterable.length)) {
              var i = -1, next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i];
                    next.done = false;
                    return next;
                  }
                }

                next.value = undefined;
                next.done = true;

                return next;
              };

              return next.next = next;
            }
          }

          // Return an iterator with no values.
          return { next: doneResult };
        }
        runtime.values = values;

        function doneResult() {
          return { value: undefined, done: true };
        }

        Context.prototype = {
          constructor: Context,

          reset: function (skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;

            this.method = "next";
            this.arg = undefined;

            this.tryEntries.forEach(resetTryEntry);

            if (!skipTempReset) {
              for (var name in this) {
                // Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" &&
                  hasOwn.call(this, name) &&
                  !isNaN(+name.slice(1))) {
                  this[name] = undefined;
                }
              }
            }
          },

          stop: function () {
            this.done = true;

            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") {
              throw rootRecord.arg;
            }

            return this.rval;
          },

          dispatchException: function (exception) {
            if (this.done) {
              throw exception;
            }

            var context = this;
            function handle(loc, caught) {
              record.type = "throw";
              record.arg = exception;
              context.next = loc;

              if (caught) {
                // If the dispatched exception was caught by a catch block,
                // then let that catch block handle the exception normally.
                context.method = "next";
                context.arg = undefined;
              }

              return !!caught;
            }

            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              var record = entry.completion;

              if (entry.tryLoc === "root") {
                // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
              }

              if (entry.tryLoc <= this.prev) {
                var hasCatch = hasOwn.call(entry, "catchLoc");
                var hasFinally = hasOwn.call(entry, "finallyLoc");

                if (hasCatch && hasFinally) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  } else if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }

                } else if (hasCatch) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  }

                } else if (hasFinally) {
                  if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }

                } else {
                  throw new Error("try statement without catch or finally");
                }
              }
            }
          },

          abrupt: function (type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc <= this.prev &&
                hasOwn.call(entry, "finallyLoc") &&
                this.prev < entry.finallyLoc) {
                var finallyEntry = entry;
                break;
              }
            }

            if (finallyEntry &&
              (type === "break" ||
                type === "continue") &&
              finallyEntry.tryLoc <= arg &&
              arg <= finallyEntry.finallyLoc) {
              // Ignore the finally entry if control is not jumping to a
              // location outside the try/catch block.
              finallyEntry = null;
            }

            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;

            if (finallyEntry) {
              this.method = "next";
              this.next = finallyEntry.finallyLoc;
              return ContinueSentinel;
            }

            return this.complete(record);
          },

          complete: function (record, afterLoc) {
            if (record.type === "throw") {
              throw record.arg;
            }

            if (record.type === "break" ||
              record.type === "continue") {
              this.next = record.arg;
            } else if (record.type === "return") {
              this.rval = this.arg = record.arg;
              this.method = "return";
              this.next = "end";
            } else if (record.type === "normal" && afterLoc) {
              this.next = afterLoc;
            }

            return ContinueSentinel;
          },

          finish: function (finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.finallyLoc === finallyLoc) {
                this.complete(entry.completion, entry.afterLoc);
                resetTryEntry(entry);
                return ContinueSentinel;
              }
            }
          },

          "catch": function (tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc === tryLoc) {
                var record = entry.completion;
                if (record.type === "throw") {
                  var thrown = record.arg;
                  resetTryEntry(entry);
                }
                return thrown;
              }
            }

            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
          },

          delegateYield: function (iterable, resultName, nextLoc) {
            this.delegate = {
              iterator: values(iterable),
              resultName: resultName,
              nextLoc: nextLoc
            };

            if (this.method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              this.arg = undefined;
            }

            return ContinueSentinel;
          }
        };
      })(
        // In sloppy mode, unbound `this` refers to the global object, fallback to
        // Function constructor if we're in global strict mode. That is sadly a form
        // of indirect eval which violates Content Security Policy.
        (function () {
          return this || (typeof self === "object" && self);
        })() || Function("return this")()
      );


      /***/
    }),

  /***/ 27:
  /*!************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/queue.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 24)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; } var handlerSymbol = Symbol('handlerSymbol'); var

        Queue = /*#__PURE__*/function () {
          function Queue() {
            _classCallCheck(this, Queue);
            this.state = 'resolved';
            this.queue = [];
          } _createClass(Queue, [{
            key: "insert", value: function insert() {
              var _this$queue;
              (_this$queue = this.queue).push.apply(_this$queue, arguments);
              if (this.state === 'resolved') {
                this.next();
              }
            }
          }, {
            key: "next", value: function () {
              var _next2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {
                var msg; return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:

                        msg = ''; case 1: if (!(
                          msg = this.queue.shift())) { _context.next = 6; break; } _context.next = 4; return (
                            this.handler(msg)); case 4: _context.next = 1; break; case 6: case "end": return _context.stop();
                    }
                  }
                }, _callee, this);
              })); function next() { return _next2.apply(this, arguments); } return next;
            }()
          }, {
            key: "handler", value: function () {
              var _handler = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(


                msg) {
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        this.state = 'pending'; _context2.prev = 1; _context2.next = 4; return (

                          this[handlerSymbol](msg)); case 4: _context2.next = 8; break; case 6: _context2.prev = 6; _context2.t0 = _context2["catch"](1); case 8: _context2.prev = 8;



                        this.state = 'resolved'; return _context2.finish(8); case 11: case "end": return _context2.stop();
                    }
                  }
                }, _callee2, this, [[1, 6, 8, 11]]);
              })); function handler(_x) { return _handler.apply(this, arguments); } return handler;
            }()
          }, {
            key:


              handlerSymbol, value: function () {
                var _value = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(msg) {
                  return _regenerator.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0: throw (
                          Error('尚未实现处理功能')); case 1: case "end": return _context3.stop();
                      }
                    }
                  }, _callee3);
                })); function value(_x2) { return _value.apply(this, arguments); } return value;
              }()
          }]); return Queue;
        }();



      Queue.handlerSymbol = handlerSymbol; var _default =


        Queue; exports.default = _default;

      /***/
    }),

  /***/ 28:
  /*!***********************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/guid.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

      function S4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      }

      function NewGuid() {
        return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
      }
      module.exports = NewGuid;

      /***/
    }),

  /***/ 29:
  /*!*********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/scene-handler.js ***!
    \*********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; /**
                                                                                                          * 场景值处理
                                                                                                          * @param {*} scene
                                                                                                          */
      function _default(scene) {
        if (scene) {
          // 菊花码兼容
          var queryString = decodeURIComponent(scene);
          var query = queryString.split("&").reduce(function (last, item) {
            var args = item.split("=");
            last[args[0]] = args[1];
            return last;
          }, {});
          return query;
        } else {
          return {};
        }
      }

      /***/
    }),

  /***/ 3:
  /*!***********************************!*\
    !*** (webpack)/buildin/global.js ***!
    \***********************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

      var g;

      // This works in non-strict mode
      g = (function () {
        return this;
      })();

      try {
        // This works if eval is allowed (see CSP)
        g = g || new Function("return this")();
      } catch (e) {
        // This works if the window reference is available
        if (typeof window === "object") g = window;
      }

      // g can still be undefined, but nothing to do about it...
      // We return undefined, instead of nothing here, so it's
      // easier to handle this case. if(!global) { ...}

      module.exports = g;


      /***/
    }),

  /***/ 30:
  /*!*********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/get-user-info.js ***!
    \*********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } function _default() {
          var swanId = '',
            presetPromise = Promise.resolve();














          return presetPromise.then(function () {
            return new Promise(function (resolve, reject) {
              uni.getUserInfo({
                success: function success(e) {
                  var param = _objectSpread({
                    encryptedData: e.data,
                    errMsg: "getUserInfo:ok",
                    swanId: swanId
                  },
                    e);

                  resolve(param);
                },
                fail: function fail() {
                  reject();
                }
              });

            });
          });
        };
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 31:
  /*!**************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/update.js ***!
    \**************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; function _default() {
          var updateManager = uni.getUpdateManager();
          updateManager.onCheckForUpdate(function (res) {
            console.log("有更新,开始更新");
          });
          updateManager.onUpdateReady(function () {
            updateManager.applyUpdate();
          });
          updateManager.onUpdateFailed(function () {
            uni.showModal({
              title: "更新",
              content: "更新下载失败，请检查网络。",
              showCancel: false
            });

          });
        };
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 312:
  /*!***************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/brand-detail/service.js ***!
    \***************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.getQRCode = getQRCode; exports.getAllItemSpecifics = getAllItemSpecifics; exports.posterGoodsInfoCache = void 0; /**
                                                                                                                                                                                                     * 获取商品规格
                                                                                                                                                                                                     * @param {Number} id 商品id
                                                                                                                                                                                                     * @param {Vue} vm 组件实例
                                                                                                                                                                                                     */
        function getAllItemSpecifics(id, vm) {
          return new Promise(function (resolve, reject) {
            vm.$app.request2({
              url: 'api/GoodsAttribute/GetAllItemSpecifics',
              mode: 'normal4',
              data: {
                goodsAttrTypeEnum: 2,
                GoodsId: id
              },

              success: function success(res) {
                var list = res.List || [];
                if (list && list.length != 0) {
                  list.forEach(function (item) { return item.default = undefined; });
                }
                resolve(list);
              },
              down: function down() {
                reject('business');
              },
              fail: function fail() {
                reject('network');
              }
            });

          });
        }

        var posterGoodsInfoCache = {
          list: [],
          qrCode: ''
        };



  /**
                   * 获取菊花码
                   */exports.posterGoodsInfoCache = posterGoodsInfoCache;
        function getQRCode(_ref) {
          var page = _ref.page, scene = _ref.scene, vm = _ref.vm;
          return vm.$app.genQRCode(page, scene).then(function (res) {
            return res;
          }).catch(function (ex) {
            typeof ex === 'object' &&
              uni.showToast({
                mask: true,
                title: res.data.ResultMsg,
                icon: 'none'
              });

            return Promise.reject();
          });
        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 32:
  /*!*****************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/get-share.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; function _default() {
          var _this = this; var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          return new Promise(function (resolve, reject) {
            _this.request2({
              url: "api/CommonPage/GetSurpriseShareInfoLinkUrl",
              data: {
                ShareNumber: arr
              },

              success: function success(res) {
                resolve(res);
              },
              down: function down(res) {
                var token = uni.getStorageSync("token");
                var shareArr = [];
                arr.forEach(function (item, index) {
                  shareArr.push({
                    ShareLinkUrl: "pages/index/index?spm=2.22.26.".concat(token.MemberId, ".").concat(item),
                    ShareNumber: 0,
                    SharePicUrl: 'https://pic5.40017.cn/03/000/f8/e0/rB5oQFwSIfmASJ_7AAFD8lJ5oxY542.jpg',
                    ShareTitle: '天天有活动，日日有惊喜'
                  });

                });
                resolve(shareArr);
              },
              fail: function fail() {
                reject();
              },
              complete: function complete() { }
            });

          });
        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 3204:
  /*!********************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/upgrade-shopkeeper-level.js ***!
    \********************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _default = {
          methods: {
            gotoUpgradeShopkeeperLevel: function gotoUpgradeShopkeeperLevel() {
              uni.navigateTo({
                url: '/sub-packages/package_shopkeeper-upgrade/index/index'
              });

            }
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 33:
  /*!***********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/collect-form-id.js ***!
    \***********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; /**
                                                                                                          * 收集formId
                                                                                                          */
      function _default(id) {
        var gameId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; var


          systemInfo =
            this.globalData.systemInfo;
        this.request2({
          url: "api/CommonPage/CollectFormId",
          mode: "monitor",
          data: {
            FormId: id,
            Node: gameId,
            PhoneBrands: systemInfo.brand,
            PhoneModel: systemInfo.model,
            WxVersion: systemInfo.version,
            ClentVersion: systemInfo.SDKVersion,
            OsVersion: systemInfo.system,
            ClentPlatform: systemInfo.platform
          }
        });



      }

      /***/
    }),

  /***/ 330:
  /*!*****************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/deep-clone.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

      var deepClone = function fnDeepClone(obj) {
        var result = Array.isArray(obj) ? [] : {};
        var key;

        if (obj && typeof obj === 'object') {
          for (key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
              result[key] = fnDeepClone(obj[key]);
            } else {
              result[key] = obj[key];
            }
          }
          return result;
        }
        return obj;
      };

      module.exports = deepClone;

      /***/
    }),

  /***/ 34:
  /*!*********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/handler-share.js ***!
    \*********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; /**
                                                                                                          * 处理分享信息
                                                                                                          */
        function _default() {
          var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1; var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ""; var isShowoff = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false; var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
          var t = type;

          // #region 补充店主信息
          var shopkeeperLoginID = this.$store.state.IsShopOwner ?
            this.$store.state.shopInfo.ShopkeeperLoginID || uni.getStorageSync('ShopkeeperLoginID') || 0 :
            uni.getStorageSync('ShopkeeperLoginID') || 0;
          Object.assign(data, { ShopkeeperLoginID: shopkeeperLoginID });
          // #endregion

          var sharedLoginID = data['SharedLoginID'];
          if (!sharedLoginID) {
            sharedLoginID = (uni.getStorageSync('token') || {}).MemberId || 0;
            Object.assign(data, { SharedLoginID: sharedLoginID });
          }
          if (!data['timestamp']) {
            Object.assign(data, { timestamp: "".concat(sharedLoginID).concat(Date.now()) });
          }
          // #region 店铺id
          var shopID = this.$store.state.IsShopOwner ?
            this.$store.state.shopInfo.ShopID || uni.getStorageSync('ShopID') || 0 :
            uni.getStorageSync('ShopID') || 0;
          Object.assign(data, { ShopID: shopID });
          // #endregion

          var d = encodeURIComponent(JSON.stringify(data));
          //获取token
          var token = uni.getStorageSync("token"); var


            indexShare =
              this.globalData.indexShare;

          var title = indexShare.title;
          var img = indexShare.img;

          var url = "pages/index/index?id=".concat(id, "&t=").concat(t, "&pk=").concat(encodeURIComponent(token.PostKey), "&sk=").concat(encodeURIComponent(token.Secretkey), "&tk=").concat(encodeURIComponent(token.TokenKey), "&isShowoff=").concat(isShowoff, "&data=").concat(d, "&spm=2.3.8.").concat(token.MemberId, ".").concat(t);
          console.log(url);
          return {
            title: title,
            path: url,
            imageUrl: img
          };

        };
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 35:
  /*!***********************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/pay.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; exports.failStore = exports.successStore = void 0; function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } var successStore = {},
          failStore = {}; exports.failStore = failStore; exports.successStore = successStore;






        /**
                                                                                           * 获取订单金额
                                                                                           * @param {*} orderId 订单id
                                                                                           * @param {*} orderType 订单类型 1：购买会员下单(订单类型 0:老订单 1:新订单 2:优动订单 3:购物车订单支付 )
                                                                                           */
        function loadData(orderId, orderType) {
          var _this = this;
          return new Promise(function (resolve, reject) {
            _this.$app.request2({
              url: 'api/Pay/GetPayAmount',
              data: {
                OrderType: orderType,
                OrderId: orderId
              },

              success: function success(res) {
                resolve(res);
              },
              down: function down(res) {
                reject(res);
              },
              fail: function fail() {
                reject('network');
              }
            });

          });
        }
        /**
           * 获取支付参数
           * @param {*} orderId 订单id
           * @param {*} orderType 订单类型 1：购买会员下单
           */
        function getWxPayOrder(orderId, orderType) {
          var _this2 = this;
          return new Promise(function (resolve, reject) {
            _this2.$app.request2({
              url: _this2.extConfig.extAble ? 'api/CommonOrder/WxPayOrder' : 'api/Pay/WxPayOrder',
              mode: _this2.extConfig.extAble ? 'normal4' : 'normal3',
              data: {
                OrderType: orderType,
                OrderId: orderId,




                TradeType: 'JSAPI'
              },


              success: function success(res) {
                resolve(res);
              },
              down: function down(res) {
                reject(res);
              },
              fail: function fail(res) {
                reject(res);
              }
            });

          });
        }

        /**
           * 支付
           * @param {*} param0 订单id, 订单类型, 是否支付前验证, 成功回写, 失败回写
           */
        function _default(_ref) {
          var _this3 = this; var orderId = _ref.orderId, _ref$orderType = _ref.orderType, orderType = _ref$orderType === void 0 ? 0 : _ref$orderType, _ref$verifyOrder = _ref.verifyOrder, verifyOrder = _ref$verifyOrder === void 0 ? true : _ref$verifyOrder, _ref$success = _ref.success, _success = _ref$success === void 0 ? function () { } : _ref$success, _ref$fail = _ref.fail, _fail = _ref$fail === void 0 ? function () { } : _ref$fail;
          uni.showLoading({
            mask: true,
            title: '支付中...'
          });

          var verifyOrderPromise = Promise.resolve();
          if (verifyOrder === true) {
            verifyOrderPromise = loadData.call(this, orderId, orderType);
          }
          verifyOrderPromise.then(function () {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, Value = _ref2.Value;
            return getWxPayOrder.call(_this3, orderId, orderType);
          }).then(function (res) {
            var orderInfo;













            orderInfo = {
              timeStamp: res.timeStamp,
              nonceStr: res.nonceStr,
              package: res.package,
              signType: res.signType,
              paySign: res.paySign
            };


            uni.requestPayment(_objectSpread({
              provider: 'wxpay'
            },




              orderInfo, {

              success: function success() {
                uni.showToast({
                  mask: true,
                  title: '支付成功'
                });

                _success();
              },
              fail: function fail(e) {
                var

                  errMsg =
                    e.errMsg;
                if (errMsg.toUpperCase().indexOf('CANCEL') > -1) {
                  _fail({
                    reason: 'cancel'
                  });

                } else {
                  uni.showToast({
                    mask: true,
                    title: '支付失败',
                    icon: 'none'
                  });

                  _fail({
                    reason: 'payment'
                  });

                }
                _this3.$app.except(JSON.stringify(_objectSpread({
                  orderId: _this3.orderId
                },
                  res, {},
                  e)));

              },
              complete: function complete() {
                _this3.$nextTick(function () {
                  uni.hideLoading();
                });
              }
            }));

          }).catch(function (_ref3) {
            var _ref3$data = _ref3.data, ex = _ref3$data === void 0 ? {} : _ref3$data;
            _fail({
              reason: 'business',
              message: ex.ResultMsg || '支付异常'
            });

            console.error(ex);
            _this3.$nextTick(function () {
              uni.hideLoading();
            });
          });
        };
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 351:
  /*!*************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/index/page-change2.js ***!
    \*************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; var _openApp = _interopRequireDefault(__webpack_require__(/*! ../../common/open-app */ 67));
        var _bindPhoneHelper = __webpack_require__(/*! @/common/bind-phone-helper */ 63);



        var _gotoContact = _interopRequireDefault(__webpack_require__(/*! @/common/goto-contact */ 68)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }





        function _default(item) {
          console.log('item1', item);
          var type = String(item.JumpType);

          var promise = Promise.resolve();
          switch (type) {
            case '20601':
              console.log('小程序内部跳转');
              uni.navigateTo({
                url: item.JumpUrl
              });

              break;
            case '20602':
              console.log('h5跳转');
              var url = "/pages/webview/webview?src=".concat(encodeURIComponent("".concat(item.JumpUrl)));
              if (this.$store.state.token.UniqueCode) {
                uni.navigateTo({
                  url: url
                });

              } else {
                _bindPhoneHelper.beforePhoneBind.call(this, _bindPhoneHelper.popupDirectShow, function (_ref) {
                  var result = _ref.result;
                  if (result === 'success') {
                    uni.navigateTo({
                      url: url
                    });

                  }
                });
              }
              break;
            case '20603':
              console.log('跳转其他小程序');
              var param = {
                appId: item.AppID,
                path: item.JumpUrl,
                extraData: {},
                success: function success(res) {
                  // 打开成功
                  console.log('打开成功');
                },
                fail: function fail() {
                  console.log('打开失败');
                }
              };

              if (this.$store.state.token.UniqueCode) {
                uni.navigateToMiniProgram(param);
              } else {
                _bindPhoneHelper.beforePhoneBind.call(this, _bindPhoneHelper.popupDirectShow, function (_ref2) {
                  var result = _ref2.result;
                  if (result === 'success') {
                    uni.navigateToMiniProgram(param);
                  }
                });
              }
              break;
            case '20604':
              console.log('跳转tabbar');
              uni.switchTab({
                url: item.JumpUrl
              });

              break;
            case '20606':
              _openApp.default.call(this, 'tb', item.JumpUrl);
              break;
            case '999999':
              console.log('APP跳转小程序');
              (0, _gotoContact.default)(item.JumpUrl);
              break;
            default:
              break;
          }
























        };
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 36:
  /*!********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/pay-external.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; exports.failStore = exports.successStore = void 0; function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } var successStore = {},
          failStore = {}; exports.failStore = failStore; exports.successStore = successStore;






        /**
                                                                                           * 获取订单金额
                                                                                           * @param {*} orderId 订单id
                                                                                           * @param {*} orderType 订单类型 1：购买会员下单(订单类型 0:老订单 1:新订单 2:优动订单 3:购物车订单支付 )
                                                                                           * @param {*} outMemberId 外部会员id
                                                                                           * @param {*} outOpenId 外部会员OpenId
                                                                                           */
        function loadData(orderId, orderType, outMemberId, outOpenId) {
          var _this = this;
          return new Promise(function (resolve, reject) {
            _this.$app.request2({
              url: 'api/Pay/GetPayAmount',
              data: {
                OrderType: orderType,
                OrderId: orderId,
                IsOutPay: 1,
                OutMemberId: outMemberId,
                OutOpenId: outOpenId
              },

              success: function success(res) {
                resolve(res);
              },
              down: function down(res) {
                reject(res);
              },
              fail: function fail() {
                reject('network');
              }
            });

          });
        }
        /**
           * 获取支付参数
           * @param {*} orderId 订单id
           * @param {*} orderType 订单类型 1：购买会员下单
           * @param {*} outMemberId 外部会员id
           * @param {*} outOpenId 外部会员OpenId
           */
        function getWxPayOrder(orderId, orderType, outMemberId, outOpenId) {
          var _this2 = this;
          return new Promise(function (resolve, reject) {
            _this2.$app.request2({
              url: 'api/Pay/WxPayOrder',
              data: {
                OrderType: orderType,
                OrderId: orderId,
                IsOutPay: 1,
                OutMemberId: outMemberId,
                OutOpenId: outOpenId,




                TradeType: 'JSAPI'
              },


              success: function success(res) {
                resolve(res);
              },
              down: function down(res) {
                reject(res);
              },
              fail: function fail(res) {
                reject(res);
              }
            });

          });
        }

        /**
           * 支付
           * @param {*} param0 订单id, 订单类型, 是否支付前验证, 成功回写, 失败回写
           */
        function _default(_ref) {
          var _this3 = this; var orderId = _ref.orderId, _ref$orderType = _ref.orderType, orderType = _ref$orderType === void 0 ? 0 : _ref$orderType, outMemberId = _ref.outMemberId, outOpenId = _ref.outOpenId, _ref$verifyOrder = _ref.verifyOrder, verifyOrder = _ref$verifyOrder === void 0 ? true : _ref$verifyOrder, _ref$success = _ref.success, _success = _ref$success === void 0 ? function () { } : _ref$success, _ref$fail = _ref.fail, _fail = _ref$fail === void 0 ? function () { } : _ref$fail;
          uni.showLoading({
            mask: true,
            title: '支付中...'
          });

          var verifyOrderPromise = Promise.resolve();
          if (verifyOrder === true) {
            verifyOrderPromise = loadData.call(this, orderId, orderType, outMemberId, outOpenId);
          }
          verifyOrderPromise.then(function () {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, Value = _ref2.Value;
            return getWxPayOrder.call(_this3, orderId, orderType, outMemberId, outOpenId);
          }).then(function (res) {
            var orderInfo;













            orderInfo = {
              timeStamp: res.timeStamp,
              nonceStr: res.nonceStr,
              package: res.package,
              signType: res.signType,
              paySign: res.paySign
            };


            uni.requestPayment(_objectSpread({
              provider: 'wxpay'
            },




              orderInfo, {

              success: function success() {
                uni.showToast({
                  mask: true,
                  title: '支付成功'
                });

                _success();
              },
              fail: function fail(e) {
                var

                  errMsg =
                    e.errMsg;
                if (errMsg.toUpperCase().indexOf('CANCEL') > -1) {
                  _fail({
                    reason: 'cancel'
                  });

                } else {
                  uni.showToast({
                    mask: true,
                    title: '支付失败',
                    icon: 'none'
                  });

                  _fail({
                    reason: 'payment'
                  });

                }
                _this3.$app.except(JSON.stringify(_objectSpread({
                  orderId: _this3.orderId
                },
                  res, {},
                  e)));

              },
              complete: function complete() {
                _this3.$nextTick(function () {
                  uni.hideLoading();
                });
              }
            }));

          }).catch(function (_ref3) {
            var _ref3$data = _ref3.data, ex = _ref3$data === void 0 ? {} : _ref3$data;
            _fail({
              reason: 'business',
              message: ex.ResultMsg || '支付异常'
            });

            console.error(ex);
            _this3.$nextTick(function () {
              uni.hideLoading();
            });
          });
        };
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 37:
  /*!**********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/choose-address.js ***!
    \**********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; exports.failStore = exports.successStore = void 0; var successStore = {},
          failStore = {}; exports.failStore = failStore; exports.successStore = successStore;






        /**
                                                                                           * 选择地址
                                                                                           * @param {*} param0
                                                                                           */
        function _default(_ref) {
          var _ref$success = _ref.success, success = _ref$success === void 0 ? function () { } : _ref$success, _ref$fail = _ref.fail, fail = _ref$fail === void 0 ? function () { } : _ref$fail;
          var successKey = "_".concat(+new Date());
          successStore[successKey] = success;
          var failKey = "_".concat(+new Date());
          failStore[failKey] = fail;

          uni.navigateTo({
            url: "/sub-packages/package_extra/address-list/address-list?success=".concat(successKey, "&fail=").concat(failKey)
          });

        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 38:
  /*!****************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/choose-store-address.js ***!
    \****************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; exports.failStore = exports.successStore = void 0; var successStore = {},
          failStore = {}; exports.failStore = failStore; exports.successStore = successStore;






        function _default(_ref) {
          var SupplierId = _ref.SupplierId, _ref$success = _ref.success, success = _ref$success === void 0 ? function () { } : _ref$success, _ref$fail = _ref.fail, fail = _ref$fail === void 0 ? function () { } : _ref$fail;
          var successKey = "_".concat(+new Date());
          successStore[successKey] = success;
          var failKey = "_".concat(+new Date());
          failStore[failKey] = fail;

          uni.navigateTo({
            url: "/sub-packages/package_pop/information-manage/store-manage/index?SupplierId=".concat(SupplierId, "&IsGoodsDetail=1&success=").concat(successKey, "&fail=").concat(failKey)
          });

        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 39:
  /*!******************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/bind-phone.js ***!
    \******************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; exports.failStore = exports.successStore = void 0; var successStore = {},
          failStore = {}; exports.failStore = failStore; exports.successStore = successStore;







        /**
                                                                                           * 手机号绑定
                                                                                           * @param {*} param0
                                                                                           */
        function _default(_ref) {
          var _ref$redirect = _ref.redirect, redirect = _ref$redirect === void 0 ? false : _ref$redirect, _ref$success = _ref.success, success = _ref$success === void 0 ? function () { } : _ref$success, _ref$fail = _ref.fail, fail = _ref$fail === void 0 ? function () { } : _ref$fail;
          var successKey = "_".concat(+new Date());
          successStore[successKey] = success;
          var failKey = "_".concat(+new Date());
          failStore[failKey] = fail;
          var url = "/sub-packages/package_extra/phone-bind/phone-bind?success=".concat(successKey, "&fail=").concat(failKey);
          if (redirect) {
            uni.redirectTo({
              url: url
            });

          } else {
            uni.navigateTo({
              url: url
            });

          }
        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 4:
  /*!********************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages.json ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {



      /***/
    }),

  /***/ 40:
  /*!**********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/visitor-record.js ***!
    \**********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } function _default(param) {
        this.$app.request2({
          url: 'api/MeowStore/ShopkeeperVisitorRecord',
          mode: "normal5",
          data: _objectSpread({},
            param)
        });


      }

      /***/
    }),

  /***/ 41:
  /*!********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/login-record.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; /**
                                                                                                          * 登录记录
                                                                                                          */
        function _default() {
          var _this = this;
          uni.$once('position', function (lon, lat) {
            var lastLogTime = uni.getStorageSync("last_loginCallback_time");
            console.log("上次登录日志时间", lastLogTime);
            if (lastLogTime != null && !isNaN(lastLogTime) && new Date().getTime() - parseInt(lastLogTime) <= 5000) {
              return; //5秒内不再次发送登录日志好吧
            }
            uni.getStorage({
              key: 'systemInfo',
              success: function success(res) {
                var _ref =





                  res.data || {}, system = _ref.system, platform = _ref.platform, brand = _ref.brand, model = _ref.model;
                var loginPlatfrom = 0;








                loginPlatfrom = 3;





                _this.$app.request2({
                  url: 'api/CommonServices/LoginCallback',
                  mode: "normal4",
                  data: {
                    lon: lon,
                    lat: lat,
                    deviceInfo: "".concat(brand || '', " ").concat(model || ''),
                    loginPlatfrom: loginPlatfrom
                  }
                });


              }
            });

          });
        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 42:
  /*!********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/share-record.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } function _default(param) {
        this.$app.request2({
          url: 'api/MeowStore/ShareRecord',
          mode: "normal5",
          data: _objectSpread({},
            param)
        });


      }

      /***/
    }),

  /***/ 420:
  /*!**************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/buying-normal/scale.js ***!
    \**************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; function scale(_ref, _ref2) {
        var widthMeta = _ref.width, heightMeta = _ref.height; var maxWidth = _ref2.width, maxHeight = _ref2.height;
        var width = widthMeta;
        var height = heightMeta;

        width = maxWidth;
        height = width / widthMeta * heightMeta;

        if (height > maxHeight) {
          height = maxHeight;
          width = height / heightMeta * widthMeta;
        }

        return {
          width: width,
          height: height,
          offsetX: (maxWidth - width) / 2,
          offsetY: (maxHeight - height) / 2
        };

      } var _default =

        scale; exports.default = _default;

      /***/
    }),

  /***/ 43:
  /*!*******************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/gen-qr-code.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; function _default() {
          var _this = this; var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ''; var scene = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var sceneParam = scene;
          var pageParams = page.split('?');
          if (pageParams[1]) {
            sceneParam = "".concat(pageParams[1], "&").concat(sceneParam);
          }
          var paramObj = sceneParam.split('&').reduce(function (last, current) {
            var keyVal = current.split('=');
            last[keyVal[0]] = keyVal[1];
            return last;
          }, {});

          // #region 店主id
          var shopkeeperLoginID = this.$store.state.IsShopOwner ?
            this.$store.state.shopInfo.ShopkeeperLoginID || uni.getStorageSync('ShopkeeperLoginID') || 0 :
            uni.getStorageSync('ShopkeeperLoginID') || 0;
          Object.assign(paramObj, { ShopkeeperLoginID: shopkeeperLoginID });
          // #endregion

          var sharedLoginID = paramObj['SharedLoginID'];
          if (!sharedLoginID) {
            sharedLoginID = (uni.getStorageSync('token') || {}).MemberId || 0;
            Object.assign(paramObj, { SharedLoginID: sharedLoginID });
          }
          if (!paramObj['timestamp']) {
            Object.assign(paramObj, { timestamp: "".concat(sharedLoginID).concat(Date.now()) });
          }

          // #region 店铺id
          var shopID = this.$store.state.IsShopOwner ?
            this.$store.state.shopInfo.ShopID || uni.getStorageSync('ShopID') || 0 :
            uni.getStorageSync('ShopID') || 0;
          Object.assign(paramObj, { ShopID: shopID });
          // #endregion








          sceneParam = Object.keys(paramObj).reduce(function (last, current) {
            return "".concat(last, "&").concat(current, "=").concat(paramObj[current]);
          }, '');

          return new Promise(function (resolve, reject) {
            _this.$app.request2({
              url: "api/GuessPicture/GetPictureQRCode",
              data: {
                page: pageParams[0] || page,
                scene: sceneParam.replace(/^&/, '')
              },

              success: function success(res) {
                resolve(res);
              },
              down: function down(res) {
                reject(res);
              },
              fail: function fail() {
                reject('network');
              }
            });

          });
        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 44:
  /*!******************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/album-auth.js ***!
    \******************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; /**
                                                                                                          * 微信保存到相册授权
                                                                                                          */
        function _default() {

          return new Promise(function (resolve, reject) {
            uni.getSetting({
              success: function success(_ref) {
                var authSetting = _ref.authSetting;
                if (!authSetting['scope.writePhotosAlbum'] && authSetting['scope.writePhotosAlbum'] != undefined) {
                  uni.openSetting({
                    success: function success(_ref2) {
                      var authSetting = _ref2.authSetting;
                      if (authSetting['scope.writePhotosAlbum']) {
                        resolve();
                      } else {
                        reject('Setting--拒绝开启写入相册授权');
                      }
                    },
                    fail: function fail() {
                      reject('打开设置失败');
                    }
                  });

                } else {
                  uni.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: function success() {
                      resolve();
                    },
                    fail: function fail() {
                      reject('authorize--拒绝开启写入相册授权');
                    }
                  });

                }
              },
              fail: function fail() {
                reject('获取设置失败');
              }
            });

          });





        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 45:
  /*!***********************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/util.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.dateFormat = dateFormat; exports.compareVersion = compareVersion; exports.before = before; exports.once = once; exports.zeroize = zeroize; exports.daysDiff = daysDiff; exports.clearTimeoutHandle = exports.clearIntervalHandle = exports.formatNumber = exports.formatTime = void 0; var formatTime = function formatTime(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
      }; exports.formatTime = formatTime;

      var formatNumber = function formatNumber(n) {
        n = n.toString();
        return n.charAt(1) ? n : '0' + n;
      };

  /**
      * 格式化日期
      * 性能比较差，在循环中建议使用标准方法获取年月日等信息
      * @param {*} date 日期
      * @param {*} fmt 模式
      */exports.formatNumber = formatNumber;
      function dateFormat(date, fmt) {
        if (!(date instanceof Date && String(date) !== 'Invalid Date')) {
          return '';
        }
        var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
        return fmt;
      }

      var clearIntervalHandle = function clearIntervalHandle() {
        var intervalHandles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        if (Array.isArray(intervalHandles)) {
          intervalHandles.forEach(function (item) {
            clearInterval(item);
          });
          intervalHandles.splice(0);
        } else {
          clearInterval(intervalHandles);
        }
      }; exports.clearIntervalHandle = clearIntervalHandle;

      var clearTimeoutHandle = function clearTimeoutHandle() {
        var timeoutHandles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        if (Array.isArray(timeoutHandles)) {
          timeoutHandles.forEach(function (item) {
            clearTimeout(item);
          });
          timeoutHandles.splice(0);
        } else {
          clearTimeout(timeoutHandles);
        }
      };

  /**
      * 版本号大小比较(此比较方法借鉴于服务器端的比较实现)
      * -1 小于, 0 等于, 1 大于
      * @param {String} verA 版本号A
      * @param {String} verB 版本号A
      * @returns {Number} 比较结果
      */exports.clearTimeoutHandle = clearTimeoutHandle;
      function compareVersion(verA, verB) {
        if (!verA || !verB) {
          return null;
        }
        var aArr = String(verA).split('.');
        var bArr = String(verB).split('.');

        if (aArr.length != bArr.length) {
          return null;
        }
        var equal = 0;
        var index = 0,
          len = aArr.length;
        for (; index < len; index++) {
          var aCurr = aArr[index],
            bCurr = bArr[index];
          if (aCurr > bCurr) {
            equal = 1;
            break;
          } else if (aCurr < bCurr) {
            equal = -1;
            break;
          }
        }
        return equal;
      }

      /**
         * 创建一个调用func的函数，调用次数不超过 n 次, 之后再调用这个函数，将返回一次最后调用func的结果。
         * @param {*} n 次数
         * @param {*} func 函数
         */
      function before(n, func) {
        var result;
        if (typeof func != 'function') {
          throw new TypeError('Expected a function');
        }
        n = n - n % 1;
        return function () {
          if (--n > 0) {
            result = func.apply(this, arguments);
          }
          if (n <= 1) {
            func = undefined;
          }
          return result;
        };
      }

      function once(func) {
        return before(2, func);
      }

      /**
         * 前补零
         * @param {*} num 数值
         * @param {*} len 长度
         */
      function zeroize(num, len) {
        var str = String(num == null ? '' : num);
        if (str.length >= len) {
          return str;
        } else {
          return "".concat(Array(len).join('0')).concat(num).slice(-len);
        }
      }

      var OneDay = 24 * 60 * 60 * 1000;
      /**
                                         * 两个时间的天数差
                                         * @param {*} current 当前时间
                                         * @param {*} target 目标时间
                                         */
      function daysDiff(current) {
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
        return (new Date(current - current % OneDay) - new Date(target - target % OneDay)) / OneDay;
      }

      /***/
    }),

  /***/ 46:
  /*!***************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/debounce.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

      module.exports = function (func, wait, immediate) {
        // immediate默认为false
        var timeout, args, context, timestamp, result;

        var later = function later() {
          // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
          var last = Date.now() - timestamp;

          if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
          } else {
            timeout = null;
            if (!immediate) {
              result = func.apply(context, args);
              if (!timeout) context = args = null;
            }
          }
        };

        return function () {
          context = this;
          args = arguments;
          timestamp = Date.now();
          // 第一次调用该方法时，且immediate为true，则调用func函数
          var callNow = immediate && !timeout;
          // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
          if (!timeout) timeout = setTimeout(later, wait);
          if (callNow) {
            result = func.apply(context, args);
            context = args = null;
          }

          return result;
        };
      };

      /***/
    }),

  /***/ 49:
  /*!**********************************************************************************************************!*\
    !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
    \**********************************************************************************************************/
  /*! exports provided: default */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function () { return normalizeComponent; });
      /* globals __VUE_SSR_CONTEXT__ */

      // IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
      // This module is a runtime utility for cleaner component module output and will
      // be included in the final webpack user bundle.

      function normalizeComponent(
        scriptExports,
        render,
        staticRenderFns,
        functionalTemplate,
        injectStyles,
        scopeId,
        moduleIdentifier, /* server only */
        shadowMode, /* vue-cli only */
        components, // fixed by xxxxxx auto components
        renderjs // fixed by xxxxxx renderjs
      ) {
        // Vue.extend constructor export interop
        var options = typeof scriptExports === 'function'
          ? scriptExports.options
          : scriptExports

        // fixed by xxxxxx auto components
        if (components) {
          if (!options.components) {
            options.components = {}
          }
          var hasOwn = Object.prototype.hasOwnProperty
          for (var name in components) {
            if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
              options.components[name] = components[name]
            }
          }
        }
        // fixed by xxxxxx renderjs
        if (renderjs) {
          (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function () {
            this[renderjs.__module] = this
          });
          (options.mixins || (options.mixins = [])).push(renderjs)
        }

        // render functions
        if (render) {
          options.render = render
          options.staticRenderFns = staticRenderFns
          options._compiled = true
        }

        // functional template
        if (functionalTemplate) {
          options.functional = true
        }

        // scopedId
        if (scopeId) {
          options._scopeId = 'data-v-' + scopeId
        }

        var hook
        if (moduleIdentifier) { // server build
          hook = function (context) {
            // 2.3 injection
            context =
              context || // cached call
              (this.$vnode && this.$vnode.ssrContext) || // stateful
              (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
              context = __VUE_SSR_CONTEXT__
            }
            // inject component styles
            if (injectStyles) {
              injectStyles.call(this, context)
            }
            // register component module identifier for async chunk inferrence
            if (context && context._registeredComponents) {
              context._registeredComponents.add(moduleIdentifier)
            }
          }
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook
        } else if (injectStyles) {
          hook = shadowMode
            ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
            : injectStyles
        }

        if (hook) {
          if (options.functional) {
            // for template-only hot-reload because in that case the render fn doesn't
            // go through the normalizer
            options._injectStyles = hook
            // register for functioal component in vue file
            var originalRender = options.render
            options.render = function renderWithStyleInjection(h, context) {
              hook.call(context)
              return originalRender(h, context)
            }
          } else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate
            options.beforeCreate = existing
              ? [].concat(existing, hook)
              : [hook]
          }
        }

        return {
          exports: scriptExports,
          options: options
        }
      }


      /***/
    }),

  /***/ 50:
  /*!************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/store/index.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
      var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 8));



      var _state = _interopRequireDefault(__webpack_require__(/*! ./state */ 51));
      var _mutations = _interopRequireDefault(__webpack_require__(/*! ./mutations */ 52));
      var _actions = _interopRequireDefault(__webpack_require__(/*! ./actions */ 53));
      var _getters = _interopRequireDefault(__webpack_require__(/*! ./getters */ 54)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } _vue.default.use(_vuex.default); var _default =

        new _vuex.default.Store({
          state: _state.default,
          mutations: _mutations.default,
          actions: _actions.default,
          getters: _getters.default
        }); exports.default = _default;

      /***/
    }),

  /***/ 51:
  /*!************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/store/state.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _default = {
        /**
                                                                                                                            * 登录信息
                                                                                                                            */
        token: {},
        /**
                    * 是否有token, 登录的意思
                    */
        hasToken: false,

        /**
                          * 场景值
                          */
        scene: '',

        /**
                    * 系统信息
                    */
        systemInfo: {},

        /**
                         * 推送设备信息
                         */
        pushClientInfo: {},

        /**
                             * 增量包版本号
                             */
        version: '',

        /**
                      * 设备信息
                      */
        device: {},

        /**
                     * 是否联网
                     */
        isConnected: false,

        menuButtonBoundingClientRect: {},

        hideWelfare: true,
        hideCatCustomer: true,

        /**
                                * 我是否是店主
                                */
        IsShopOwner: undefined,
        /**
                                 * 店铺信息
                                 */
        shopInfo: {},
        /**
                       * 店铺菜单栏
                       */
        shopMenuInfo: {},
        /**
                           * 会员信息
                           */
        vipInfo: {},
        /**
                      * 所有会员店铺的信息
                      */
        vipShopInfo: [],

        position: {
          cityId: 0,
          cityName: '全国'
        },


        // 定制模板--模板库--本次选中
        checkedList: [],

        // 未读消息数量
        unreadMsgCount: 0,

        // 定制首页按钮是否显示
        homeCustomizeBtnAble: false
      }; exports.default = _default;

      /***/
    }),

  /***/ 52:
  /*!****************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/store/mutations.js ***!
    \****************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); } function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); } function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); } function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); } function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; } var _default = {
          setToken: function setToken(state, value) {
            state.token = value;
            // value.NickName = ''; // TODO:delete
            uni.setStorageSync("token", value);












          },

          hasToken: function hasToken(state, value) {
            state.hasToken = value;
            uni.setStorageSync('hasToken', value);
          },

          setScene: function setScene(state, value) {
            state.scene = value;
            uni.setStorageSync('scene', value);
          },

          setSystemInfo: function setSystemInfo(state, value) {
            state.systemInfo = value;
            uni.setStorageSync('systemInfo', value);
          },

          setPushClientInfo: function setPushClientInfo(state, value) {
            uni.setStorageSync('pushClientInfo', value);
            state.pushClientInfo = value;
          },

          setVersion: function setVersion(state, value) {
            state.version = value;
            uni.setStorageSync('version', value);
          },

          setDevice: function setDevice(state, value) {
            state.device = value;
            uni.setStorageSync('device', value);
          },

          setConnected: function setConnected(state, value) {
            state.isConnected = value;
            uni.setStorageSync('isConnected', value);
          },

          setMenuButtonBoundingClientRect: function setMenuButtonBoundingClientRect(state, value) {
            state.menuButtonBoundingClientRect = value;
          },

          setHideWelfare: function setHideWelfare(state, value) {
            state.hideWelfare = value;
          },

          setHideCatCustomer: function setHideCatCustomer(state, value) {
            state.hideCatCustomer = value;
          },
          setShopOwner: function setShopOwner(state, value) {
            state.IsShopOwner = value;
          },
          setShopInfo: function setShopInfo(state, value) {
            state.shopInfo = value;
          },
          setShopMenuInfo: function setShopMenuInfo(state, value) {
            state.shopMenuInfo = value;
          },
          setVipInfo: function setVipInfo(state, value) {
            state.vipInfo = value;
          },
          setVipShopInfo: function setVipShopInfo(state, value) {
            state.vipShopInfo = value;
          },
          setPosition: function setPosition(state, value) {
            state.position = value;
          },
          // 定制模板-模板库-清空
          setClearCheckedList: function setClearCheckedList(state) {
            state.checkedList = [];
          },
          // 定制模板-模板库-根据分类清空
          setClearCheckedListBySTClassify: function setClearCheckedListBySTClassify(state, classify) {
            var filter = state.checkedList.filter(function (item) { return item.STClassify === classify; }); var _loop = function _loop(
              i, len) {
              var index = state.checkedList.findIndex(function (item) { return item.Id === filter[i].Id; });
              if (index < 0) {
                return "continue";
              }
              state.checkedList.splice(index, 1);
            }; for (var i = 0, len = filter.length; i < len; i++) {
              var _ret = _loop(i, len); if (_ret === "continue") continue;
            }
          },
          // 定制模板-模板库-增加
          setIncreaseCheckedList: function setIncreaseCheckedList(state, _ref) {
            var _state$checkedList; var classify = _ref.classify, value = _ref.value;
            // 根据分类清空
            this.commit('setClearCheckedListBySTClassify', classify);
            (_state$checkedList = state.checkedList).push.apply(_state$checkedList, _toConsumableArray(value));
          },
          // 定制模板-模板库-根据Id移除
          setDecreaseCheckedList: function setDecreaseCheckedList(state, id) {
            var index = state.checkedList.findIndex(function (item) { return item.Id === id; });
            if (index < 0) {
              return;
            }
            state.checkedList.splice(index, 1);
          },

          setUnreadMsgCount: function setUnreadMsgCount(state, value) {
            state.unreadMsgCount = value;
          },
          setHomeCustomizeBtnAble: function setHomeCustomizeBtnAble(state, value) {
            state.homeCustomizeBtnAble = value;
          },

          // 清空 状态机 app 来回切换账户，可能需要清空的状态机 数值  -老马增加
          clearStoreInfo: function clearStoreInfo(state) {
            state.token = {};
            //首页进入菜单 需要清
            state.shopMenuInfo = {};
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 53:
  /*!**************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/store/actions.js ***!
    \**************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _request = _interopRequireDefault(__webpack_require__(/*! ../common/request2 */ 22)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } var _default =

      {
        /**
         * 获取用户信息
         * @param {*} param0
         */
        getUserInfo: function getUserInfo(_ref) {
          var commit = _ref.commit, state = _ref.state;
          return new Promise(function (resolve) {
            (0, _request.default)({
              url: 'api/MemberLogin/GetSettingStatus',
              success: function success(res) {
                var

                  NickName =








                    res.NickName, HeadImage = res.HeadImgURL, Gender = res.Gender, MemberLevel = res.MemberLevel, InvitedBy = res.InvitedBy, PeopleProperties = res.PeopleProperties, POPSupplierID = res.POPSupplierID, POPAccountID = res.POPAccountID, WxAccount = res.WxAccount;

                // NickName = ''; // TODO: user delete
                // HeadImage = ''; // TODO: user delete

                var token = Object.assign({},

                  state.token,




                  {
                    Gender: Gender,
                    MemberLevel: MemberLevel,
                    InvitedBy: InvitedBy,
                    PeopleProperties: PeopleProperties,
                    POPSupplierID: POPSupplierID,
                    POPAccountID: POPAccountID,
                    WxAccount: WxAccount
                  });


                if (!state.token.NickName) {
                  token.NickName = NickName;
                }

                if (!state.token.HeadImage) {
                  token.HeadImage = HeadImage;
                }
                commit('setToken', token);
              },
              complete: function complete() {
                resolve();
              }
            });

          });
        },
        /**
            * 获取店铺信息
            * @param {*} param0
            * @return {Promise}
            */
        getShopInfo: function getShopInfo(_ref2) {
          var commit = _ref2.commit; var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref3$ShopkeeperLogin = _ref3.ShopkeeperLoginID, ShopkeeperLoginID = _ref3$ShopkeeperLogin === void 0 ? 0 : _ref3$ShopkeeperLogin, _ref3$ShopID = _ref3.ShopID, ShopID = _ref3$ShopID === void 0 ? 0 : _ref3$ShopID;
          return new Promise(function (resolve, reject) {
            (0, _request.default)({
              url: 'api/MeowStore/GetShopInfo',
              mode: "normal5",
              data: {




                ShopkeeperLoginID: ShopkeeperLoginID,
                ShopID: ShopID
              },


              success: function success(res) {
                resolve(res);
                commit('setShopInfo', res);
              },
              down: function down(res) {
                reject(res);
              },
              fail: function fail(err) {
                reject(err);
              }
            });

          });
        },
        /**
            * 获取店铺菜单栏
            * @param {*} param0
            * @return {Promise}
            */
        getShopMenuInfo: function getShopMenuInfo(_ref4) {
          var commit = _ref4.commit;
          return new Promise(function (resolve, reject) {
            (0, _request.default)({
              url: 'api/MeowStoreConfig/MeowShopMenu',
              mode: "normal5",
              success: function success(res) {
                commit('setShopMenuInfo', res);
                resolve(res);
              },
              down: function down(res) {
                reject(res);
              },
              fail: function fail(err) {
                reject(err);
              }
            });

          });
        },
        /**
            * 当前店铺会员信息
            * @param {*} param0
            */
        getVipInfo: function getVipInfo(_ref5) {
          var commit = _ref5.commit;
          return new Promise(function (resolve) {
            (0, _request.default)({
              url: 'api/MSVIP/GetMSVIPInfo',
              mode: 'normal4',
              success: function success(res) {
                commit('setVipInfo', res);
              },
              complete: function complete() {
                resolve();
              }
            });

          });
        },
        /**
            * 所有会员店铺
            * @param {*} param0
            * @returns Promise
            */
        getVipShopInfo: function getVipShopInfo(_ref6) {
          var commit = _ref6.commit;
          return new Promise(function (resolve) {
            (0, _request.default)({
              url: 'api/MSVIP/GetMSVIPShopInfo',
              mode: 'normal4',
              success: function success(res) {
                commit('setVipShopInfo', (res || {}).ShopList || []);
              },
              complete: function complete() {
                resolve();
              }
            });

          });
        },

        getUnreadMsgCount: function getUnreadMsgCount(_ref7) {
          var commit = _ref7.commit;
          return new Promise(function (resolve) {
            (0, _request.default)({
              url: 'api/MessageService/GetNewMessageCount',
              mode: 'normal4',
              success: function success(res) {
                commit('setUnreadMsgCount', (res || {}).AllCount || 0);
              },
              complete: function complete() {
                resolve();
              }
            });

          });
        }
      }; exports.default = _default;

      /***/
    }),

  /***/ 54:
  /*!**************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/store/getters.js ***!
    \**************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _default = {
        // 定制模板-模板库-模板名称
        checkedListName: function checkedListName(state) {
          return state.checkedList.map(function (item) { return item.Name; }).join();
        },
        theme: function theme(state) {
          var _ref =
            state.shopInfo || {}, _ref$ShopStyleConfig = _ref.ShopStyleConfig, ShopStyleConfig = _ref$ShopStyleConfig === void 0 ? {} : _ref$ShopStyleConfig, HeadImg = _ref.HeadImg, HeadImgType = _ref.HeadImgType;
          var topType = (HeadImgType || 0) + 1;
          // const topType = 2;
          var mainColor = ShopStyleConfig.MainColor;
          var minorColor = ShopStyleConfig.SecondaryColor;
          var colorType = ShopStyleConfig.Id || 1;
          // 颜色类型
          // const colorType = 2;
          // 基础颜色
          var color0 = '#fe5a4b';
          // 颜色2
          var color2 = '#ff6a00';
          return {
            topType: topType,
            colorType: colorType,

            // 字体类型
            color: { 1: "".concat(color0) }[colorType] || "".concat(color2),
            fontColor: "color: ".concat({ 1: color0 }[colorType] || '#fe5a4b'),
            // 背景色, 按钮颜色
            bgColor: "background-color: ".concat({ 1: color0 }[colorType] || color2),
            // 抵用券背景色
            // couponBg: `background:${{ 1: color0 }[colorType] || color2}, radial-gradient(45rpx circle at center left, #fff 20%, transparent 1rpx), radial-gradient(45rpx circle at center right, #fff 20%, transparent 1rpx)`,
            // 首页页头
            top: {
              color: { 1: '#fff' }[topType] || '#333',
              remarkColor: { 1: '#fff' }[topType] || '999',
              bgImg: { 1: 'linear-gradient(to left, #ff6c62, #ff6c62)' }[topType] || "url(".concat(HeadImg, ")"),
              search: {
                border: { 1: '1px solid #fff' }[topType] || '1px solid #f6f6f6',
                icon: { 1: 'https://pic5.40017.cn/04/002/94/e8/rBTJU123nfOAJtgXAAABv2q6Cjg866.png' }[colorType] || 'https://pic5.40017.cn/i/ori/P0Ay0oduko.png',
                color: { 1: '#666' }[topType] || "".concat(color2)
              },

              news: {
                icon: { 1: 'https://pic5.40017.cn/i/ori/P0SxBcn5Cg.png' }[topType] || 'https://pic5.40017.cn/i/ori/P0BRsWov9S.png',
                color: { 1: '#ffe2e0' }[topType] || '#999'
              },

              tab: {
                color: { 1: '#fff' }[topType] || '#333',
                icon: { 1: 'url(https://pic5.40017.cn/04/001/d1/20/rBTJUl2_w8yAEDxwAAABmzbo0Ow907.png)' }[topType] || 'url(https://pic5.40017.cn/i/ori/P0ALmhjxoQ.png)',
                arrowBg: { 1: 'linear-gradient(to right, rgba(255, 108, 82, 0) 0, #ff6c62 50%, #ff6c62 100%)' }[topType] || 'linear-gradient(to right, rgba(255, 255, 255, 0) 0, #fff 50%, #fff 100%)',
                arrowImg: { 1: 'https://pic5.40017.cn/i/ori/P69SCyxeTu.png' }[topType] || 'https://pic5.40017.cn/i/ori/P5QSqQllMQ.png',
                selectedBg: { 1: '#ff6c62' }[topType] || '#ffe7d6',
                collapseSelectedColor: { 1: color0 }[topType] || color2,
                collapseSelectedBg: { 1: '#ffe1d6' }[topType] || '#ffe7d6',
                collapseSelectedBorder: { 1: color0 }[topType] || color2,
                collapseIcon: { 1: 'url(https://pic5.40017.cn/i/ori/P7zkvKau1q.png)' }[topType] || 'url(https://pic5.40017.cn/i/ori/P7ykC6fXkk.png)'
              }
            },


            // tab样式
            tabbar: {
              selected: {
                color: { 1: 'linear-gradient(to bottom, #ff7753 , #ff584d)' }[colorType] || "linear-gradient(".concat(color2, ", ").concat(color2, ")")
              },

              share: { 1: 'https://pic5.40017.cn/i/ori/M40ETgJr3y.png' }[colorType] || 'https://pic5.40017.cn/i/ori/P2xgVHHlVC.png',
              dot: { 1: '#ff584d' }[colorType] || "".concat(color2)
            },

            // 搜索结果页
            search: {
              icon: { 1: 'url(https://pic5.40017.cn/04/002/52/97/rBTJU12vsamAUId9AAAC7mpE49g879.png) no-repeat' }[colorType] || 'https://pic5.40017.cn/i/ori/P0Ay0oduko.png',
              frontColor: { 1: '#ffffff' }[colorType] || '#000000',
              color: { 1: '#ffffff' }[colorType] || '#333333',
              bgColor: { 1: "#ff584d" }[colorType] || '#ffffff',
              arrowBg: { 1: 'linear-gradient(to left, #ff584d 60%, rgba(255, 88, 77, 0.4) 40%)' }[colorType] || 'linear-gradient(to left, #fff 60%, rgba(255, 255, 255, 0.4) 40%)',
              arrowImg: { 1: 'https://pic5.40017.cn/i/ori/P69SCyxeTu.png' }[colorType] || 'https://pic5.40017.cn/i/ori/P5QSqQllMQ.png',
              border: { 1: '1px solid #fff' }[colorType] || '1px solid #f6f6f6',
              inputBg: { 1: 'https://pic5.40017.cn/i/ori/P9sb1Jx6TK.png' }[colorType] || 'https://pic5.40017.cn/i/ori/P9sbokDb4k.png',
              selectedBg: { 1: '#ff6c62' }[colorType] || '#ffe7d6',
              collapseSelectedColor: { 1: '#fff' }[colorType] || color2,
              collapseSelectedBg: { 1: '#ff584d' }[colorType] || '#ffe7d6'
            }
          };


        },
        isMpUserAuth: function isMpUserAuth(state) {

          var token = state.token;
          return token.UnionID;




        }
      }; exports.default = _default;

      /***/
    }),

  /***/ 595:
  /*!************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/date.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

      var date = {
        //将日期字符串转换成日期对象
        stringToDate: function stringToDate(DateStr) {
          if (!DateStr) {
            return new Date(1970, 0, 1);
          }
          var converted = Date.parse(DateStr);
          var myDate = new Date(converted);
          if (isNaN(myDate)) {
            //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
            var arys = DateStr.split('-');
            myDate = new Date(arys[0], --arys[1], arys[2]);
          }
          return myDate;
        },
        //传入日期，产生日期列表
        getMonthData: function getMonthData(startdate) {
          var self = this;
          var itemdata = {
            day: "",
            date: "",
            dayindex: ""
          };

          //写出每月的总的天数，把天数定义给一个数组
          var moday = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          //2月份的天数必须得区分今年是不是闰年
          var d = this.stringToDate(new Date());
          if (startdate) {
            d = this.stringToDate(startdate);
          }
          var month = d.getMonth() + 1; //当前的月份
          var days = d.getDate(); //当前月的号数
          var years = d.getFullYear(); //当前的年份
          var run = years % 4; //看看是不是闰年
          if (run != 0) {
            moday[2] = 28; //2月份的天数
          } else {
            moday[2] = 29;
          }
          var monthstr = month < 10 ? '0' + month : month;
          //看一下当前月份的一号对应的是星期几
          d.setDate(1);
          var firstweekday = d.getDay();

          var daylist = new Array();
          var monthdaycount = moday[month]; //当前月的总天数
          //填充本月天数
          for (var i = 0; i < monthdaycount; i++) {
            var _day = i + 1; //拿到这一天是几号
            var _daystr = _day < 10 ? '0' + _day : _day;
            var _date = years + "-" + monthstr + "-" + _daystr;
            var _week = (firstweekday + i) % 7;
            if (_week == 0) {
              _week = 7;
            }
            daylist.push({
              week: _week, //这一天是星期几
              day: _day, //这一天是几号
              date: _date, //日期(2017-01-01格式字符串)
              dayindex: i //日期索引，从0-30
            });
          }
          return daylist;
        },
        //获得过去几天的时候是几号
        getPastDay: function getPastDay(n) {
          var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var d = s ? new Date(s) : new Date();
          d.setTime(d.getTime() - 24 * 60 * 60 * 1000 * n);
          var month = d.getMonth() + 1;
          if (month < 10) {
            month = "0" + month;
          }
          var date = d.getDate();
          if (date < 10) {
            date = "0" + date;
          }
          var day = "".concat(d.getFullYear(), "-").concat(month, "-").concat(date);
          return day;
        },
        //获得昨天
        getYesterday: function getYesterday() {
          return this.getPastDay(1);
        },
        //获得上个月
        getLastMonth: function getLastMonth() {
          var nowdays = new Date();
          var year = nowdays.getFullYear();
          var month = nowdays.getMonth();
          if (month == 0) {
            month = 12;
            year = year - 1;
          }
          if (month < 10) {
            month = "0" + month;
          }
          var firstDay = year + "-" + month + "-" + "01"; //上个月的第一天  
          var myDate = new Date(year, month, 0);
          var lastDay = year + "-" + month + "-" + myDate.getDate(); //上个月的最后一天  
          return { firstDay: firstDay, lastDay: lastDay };
        },
        //把"2017-12-28"转成"2017年12月28日 星期几"格式
        dateToChinese: function dateToChinese(txt) {
          var showYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true; var simple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var t = txt.split("-");
          var str = "";
          var week = this.stringToDate(txt).getDay();
          if (week == 0) {
            str = "星期日";
          } else if (week == 1) {
            str = "星期一";
          } else if (week == 2) {
            str = "星期二";
          } else if (week == 3) {
            str = "星期三";
          } else if (week == 4) {
            str = "星期四";
          } else if (week == 5) {
            str = "星期五";
          } else if (week == 6) {
            str = "星期六";
          }
          if (simple) {
            if (showYear) {
              return "".concat(t[0], "-").concat(t[1], "-").concat(t[2], " ").concat(str);
            } else {
              return "".concat(t[1], "-").concat(t[2], " ").concat(str);
            }
          } else {
            if (showYear) {
              return "".concat(t[0], "\u5E74").concat(t[1], "\u6708").concat(t[2], "\u65E5 ").concat(str);
            } else {
              return "".concat(t[1], "\u6708").concat(t[2], "\u65E5 ").concat(str);
            }
          }

        },
        //把"2017年12月28日"转成"2017-12-28"格式
        dateToMinus: function dateToMinus(txt) {
          var t = txt.match(/(\d+)年(\d+)月(\d+)日/);
          return "".concat(t[1], "-").concat(t[2], "-").concat(t[3]);
        }
      };


      module.exports = date;

      /***/
    }),

  /***/ 61:
  /*!**************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/login2.js ***!
    \**************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.auth = getData; exports.default = _default; exports.failStore = exports.successStore = void 0; function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } var successStore = {},
          failStore = {}; exports.failStore = failStore; exports.successStore = successStore;







        /**
                                                                                           * 用户点击了用户授权弹框按钮
                                                                                           * @param {*} data 小程序用户授权数据
                                                                                           * @param {*} callback 登录成功后回调
                                                                                           */
        function getData(data, callback) {
          var _this = this;
          var swanId = '';
          var swanPromise = Promise.resolve();












          swanPromise.then(function () {
            hintConfirm.call(_this, _objectSpread({ swanId: swanId }, data.detail, { Auth: true }), callback);
          });
        }
        /**
           * 对用户授权弹框进行处理
           * @param {*} detail 授权结果
           * @param {Function} callback 回调
           */
        function hintConfirm(detail, callback) {
          var _this2 = this;
          var userInfo = detail;
          if (userInfo && userInfo.errMsg === 'getUserInfo:ok') {
            var _userInfo$userInfo =




              userInfo.userInfo, nickName = _userInfo$userInfo.nickName, avatarUrl = _userInfo$userInfo.avatarUrl, gender = _userInfo$userInfo.gender;

            this.$app.globalData.name = nickName;
            this.$app.globalData.avatar = avatarUrl;

            this.$app.request2({
              url: 'api/MemberLogin/GetMemberUnionId',
              data: {
                NoMerge: true,
                EncryptedData: userInfo.encryptedData,
                Iv: userInfo.iv,
                SwanId: userInfo.swanId || ''
              },

              success: function success(_ref) {
                var UnionID = _ref.UnionID;
                setToken.call(_this2, {
                  NickName: nickName,
                  HeadImage: avatarUrl,
                  Gender: gender,
                  UnionID: UnionID,
                  Auth: !!userInfo.Auth
                });

                callback && callback();
              },
              complete: function complete() {
                uni.hideLoading();
              },
              down: function down() {
                _this2.$app.reMPLogin();
                _this2.$app.except("login2:down\r\n".concat(JSON.stringify(detail)));
              },
              fail: function fail() {
                _this2.$app.reMPLogin();
              }
            });


            uni.setStorage({
              key: 'wxUserInfo',
              data: userInfo.userInfo
            });

          } else {
            this.$app.except(JSON.stringify(detail));
          }
        }
        /**
           * 更新授权数据至token
           * @param {*} info
           */
        function setToken(info) {
          this.$store.commit('setToken', _objectSpread({},
            this.$store.state.token, {},
            info));

        }







        /**
           *
           * @param {*} param0
           */
        function _default() {
          var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, _ref2$success = _ref2.success, success = _ref2$success === void 0 ? function () { } : _ref2$success, _ref2$fail = _ref2.fail, fail = _ref2$fail === void 0 ? function () { } : _ref2$fail;
          var successKey = "_".concat(+new Date());
          successStore[successKey] = success;
          var failKey = "_".concat(+new Date());
          failStore[failKey] = fail;

          uni.navigateTo({
            url: "/pages/login2/login2?success=".concat(successKey, "&fail=").concat(failKey)
          });

        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 62:
  /*!************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/bind-phone-mixin.js ***!
    \************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _methods; function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                                                                                                                               * 该文件和 bind-phone-helper 文件组合使用，需同时加到对应组件中
                                                                                                                                                                                                                                                                                                                               * 如果要在某个页面或组件使用手机号绑定，优先放置组件`cc-phone-bind-popup`，然后在组件的`mixins`添加改mixin
                                                                                                                                                                                                                                                                                                                               * 接下来由该mixin控制后续绑定成功(phoneBindSuccess)与失败(phoneBindFail)的流程走向
                                                                                                                                                                                                                                                                                                                               * 成功时调用[phoneBindSuccessHandler]方法, 涉及流程需对[phoneBindSuccessHandler]进行实现
                                                                                                                                                                                                                                                                                                                               * 失败时调用[phoneBindFailHandler]方法, , 涉及流程需对[phoneBindFailHandler]进行实现
                                                                                                                                                                                                                                                                                                                               */
      var phoneBindSuccessHandler = Symbol('phoneBindSuccessHandler');
      var phoneBindFailHandler = Symbol('phoneBindFailHandler');

      var successHandler = function successHandler() {
        throw '你还实现绑定成功的逻辑';
      };
      var failHandler = function failHandler() {
        throw '你还实现绑定失败的逻辑';
      }; var _default =
      {
        data: function data() {
          return {
            phoneBindPopupShow: false,
            // 成功回调处理
            bindSuccessSymbol: phoneBindSuccessHandler,
            // 失败回调处理
            bindFailSymbol: phoneBindFailHandler
          };

        },
        watch: {
          phoneBindPopupShow: function phoneBindPopupShow(val) {
            var _this = this;
            if (val === false) {
              this.$nextTick(function () {
                _this[phoneBindSuccessHandler] = successHandler.bind(null);
                _this[phoneBindFailHandler] = failHandler.bind(null);
              });
            }
          }
        },

        methods: (_methods = {
          phoneBindSuccess: function phoneBindSuccess() {
            this[phoneBindSuccessHandler].call(this);
          },
          phoneBindFail: function phoneBindFail() {
            this[phoneBindFailHandler].call(this);
          }
        }, _defineProperty(_methods,
          phoneBindSuccessHandler, successHandler.bind(null)), _defineProperty(_methods,
            phoneBindFailHandler, failHandler.bind(null)), _methods)
      }; exports.default = _default;

      /***/
    }),

  /***/ 63:
  /*!*************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/bind-phone-helper.js ***!
    \*************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.searchPhoneBindPopup = searchPhoneBindPopup; exports.phoneAuth = phoneAuth; exports.beforePhoneBind = beforePhoneBind; exports.popupDirectShow = void 0; function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 该文件和 bind-phone-mixin 文件组合使用，需同时加到对应组件中
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 该文件涉及三块功能，cc-phone-bind-popup组件的搜寻，微信手机号绑定，自定义手机号绑定组件流程走向
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 例子:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * <cc-phone-bind-popup v-if="phoneBindPopupShow"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *   :show.sync="phoneBindPopupShow"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *   @success="phoneBindSuccess"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *   @fail="phoneBindFail"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * <button @tap="onBindPhone" open-type="getPhoneNumber"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *   @getphonenumber="onBindPhone" form-type="submit">点击绑定手机号</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * import bindPhoneMixin from '@/common/bind-phone-mixin';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * import { beforePhoneBind } from '@/common/phone-bind-helper';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * mixins: [bindPhoneMixin],
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * onBindPhone({ detail }) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *   beforePhoneBind.call(this, detail, ({ result }) {});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */

        /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 搜寻同级和上级的cc-phone-bind-popup组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @param {*} vm Vue Component Instance
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
        function searchPhoneBindPopup(vm) {
          var ins = vm;
          while (ins && !ins.bindSuccessSymbol) {
            ins = ins.$parent;
          }
          if (ins && typeof ins.bindSuccessSymbol === 'symbol') {
            return ins;
          } else {
            return null;
          }
        }

        /**
           * 小程序手机号授权
           *
           * @param {*} param0 小程序手机号授权数据
           * @param {*} callback 授权成功回调
           */
        function phoneAuth() {
          var _this = this; var detail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; var callback = arguments.length > 1 ? arguments[1] : undefined; var

            errMsg =


              detail.errMsg, encryptedData = detail.encryptedData, iv = detail.iv;

          if (errMsg === 'getPhoneNumber:ok') {
            uni.showLoading({
              title: '正在绑定...',
              mask: true
            });

            this.$app.request2({
              url: 'api/MemberLogin/GetMemberPhone',
              data: {
                encryptedData: encryptedData,
                iv: iv
              },

              success: function success(result) {
                var mobile = result;
                _this.$store.commit('setToken', _objectSpread({},
                  _this.$store.state.token, {
                  phone: mobile,
                  UniqueCode: mobile,
                  UserPhone: mobile
                }));


                callback && callback({
                  result: 'success',
                  reason: result
                });

              },
              down: function down(_ref) {
                var data = _ref.data;
                if (data.ResultCode == 200) {
                  callback && callback({
                    result: 'fail',
                    reason: '200',
                    message: data.ResultMsg || '手机号绑定失败'
                  });

                  uni.showModal({
                    title: '提示',
                    content: data.ResultMsg,
                    showCancel: false,
                    success: function success() {
                      uni.removeStorageSync("ShopkeeperLoginID");
                      uni.removeStorageSync("ShopID");
                      uni.removeStorageSync("ShopInfoDone");
                      uni.removeStorageSync("token");

                      _this.$app.reLaunch();
                      _this.$app.login();
                    }
                  });

                } else {
                  callback && callback({
                    result: 'fail',
                    reason: 'business',
                    message: data.ResultMsg || '手机号绑定失败'
                  });

                }
                _this.$app.except(JSON.stringify(data), "bind-phone-helper:phoneAuth:down");
              },
              fail: function fail(e) {
                callback && callback({
                  result: 'fail',
                  reason: 'network',
                  message: '手机号绑定异常'
                });

                this.$app.except(JSON.stringify(detail), 'bind-phone-helper:phoneAuth:fail', 1);
              },
              complete: function complete() {
                uni.hideLoading();
              }
            });

          } else {
            callback && callback({
              result: 'fail',
              reason: 'rejected',
              message: '授权失败'
            });

            this.$app.except(JSON.stringify(e), 'bind-phone-helper:phoneAuth:rejected', 4);
          }
        }

        /**
           * 手机号未绑定，进行手机号绑定操作
           *
           * @param {*} callback 绑定结果回调
           */
        function beforePhoneBind(detail, callback) {
          var _this2 = this;
          var phoneAuthPromise = Promise.reject(); // 兼顾app


          if (detail != popupDirectShow) {
            // 小程序处理rejected
            phoneAuthPromise.catch(function (ex) { });
            if (detail && detail.errMsg) {
              // 小程序有先走微信手机号验证，失败才走弹框逻辑
              phoneAuthPromise = new Promise(function (resolve, reject) {
                phoneAuth.call(_this2, detail, function (_ref2) {
                  var result = _ref2.result, reason = _ref2.reason, message = _ref2.message;
                  if (result === 'success') {
                    _this2.$nextTick(function () {
                      uni.showToast({
                        icon: 'none',
                        title: '手机号绑定成功'
                      });

                    });
                    callback && callback({
                      result: 'success'
                    });

                    resolve();
                    return;
                  } else {
                    if (reason == 200) {
                      resolve();
                      return;
                    } else if (reason !== 'rejected') {
                      uni.showModal({
                        title: '提示',
                        content: message,
                        showCancel: false
                      });

                    }
                  }
                  reject();
                });
              });
            } else {
              phoneAuthPromise = Promise.resolve();
            }
          }


          phoneAuthPromise.catch(function (ex) {
            var ins = searchPhoneBindPopup(_this2);
            if (ins) {
              ins[ins.bindSuccessSymbol] = function () {
                callback && callback({
                  result: 'success'
                });

              };
              ins[ins.bindFailSymbol] = function () {
                callback && callback({
                  result: 'fail',
                  reason: 'cancel'
                });

              };
              ins.phoneBindPopupShow = true;
            } else {
              uni.showToast({
                icon: 'none',
                title: '您还没绑定手机号'
              });

            }
          });
        }

        // 直接弹框自定义组件，不走微信手机号授权
        var popupDirectShow = Symbol('directShow'); exports.popupDirectShow = popupDirectShow;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 64:
  /*!***************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/index/common-methods.js ***!
    \***************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _jump = __webpack_require__(/*! ./jump */ 65);
      var _pageChange = _interopRequireDefault(__webpack_require__(/*! ./page-change */ 66)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } var _default =

      {
        setToken: function setToken(info) {
          this.$store.commit('setToken', _objectSpread({},
            this.$store.state.token, {},
            info));

        },
        stopMove: function stopMove() { },
        pageChange: _pageChange.default,
        jump: _jump.jump
      }; exports.default = _default;

      /***/
    }),

  /***/ 65:
  /*!*****************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/index/jump.js ***!
    \*****************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.handleJumpData = handleJumpData; exports.jump = jump; /**
                                                                                                                                           * 获取分享信息
                                                                                                                                           * @param {*} id 游戏id
                                                                                                                                           */
        function getShareUrl(id) {
          var _this = this;
          return new Promise(function (resolve, reject) {
            _this.$app.request2({
              url: 'api/CommonPage/GetShareInfoIndexLinkUrl',
              data: {
                SNId: id
              },

              success: function success(res) {
                resolve(res);
              },
              down: function down(res) {
                reject(res);
              },
              complete: function complete() { }
            });

          });
        };

        /**
            * 跳转
            * @param {*} data
            */
        function handleJumpData(data) {
          var _this2 = this;
          console.log('jumpData=', data);
          // 短链标识
          var isConfig = data.sn;
          // scene 1035, 通过公众号打开时存在长短链情况
          var isNeedGetParams;
          // 参数t是区分长短链的标识
          if (data.t) {
            isNeedGetParams = false; // 长短链走上面
          } else {
            isNeedGetParams = true; // 短链走下面
          }
          console.log('sn码', isConfig);
          // 从分享卡片和第三方小程序跳转到小程序, 此时是原始链接, 所有参数都可以从连接中获取
          if (data.scene == 1007 || data.scene == 1008 || data.scene == 1035 && !isNeedGetParams || data.scene == 1036 || data.scene == 1037) {
            console.log('卡片或第三方小程序进入', data);
            handleShopkeeperCache.call(this, data, '/pages/index/index', data.data.ShopkeeperLoginID, data.id, data.data.timestamp,
              data.data.ShopID);
          } else {
            // 如果是短链
            if (isConfig) {
              // 根据sn获取原始长链地址
              getShareUrl.call(this, isConfig).then(function (res) {
                var url = res.LinkUrl || '';
                data.data = data.data || {};
                console.log('getShareUrl返回', data, res);
                if (data.scene == 1047 || data.scene == 1048 || data.scene == 1049) {
                  // 从菊花码短链进入
                  console.log('菊花码短链进入', data, url);
                  var shopIdMatch = res.LinkUrl.match(/ShopID=(\w*)(&|$)/);
                  var timestampMatch = res.LinkUrl.match(/timestamp=(\w*)(&|$)/);
                  var SharedLoginIDMatch = res.LinkUrl.match(/SharedLoginID=(\w*)(&|$)/);
                  var ShopkeeperLoginIDMatch = res.LinkUrl.match(/ShopkeeperLoginID=(\w*)(&|$)/);
                  handleShopkeeperCache.call(_this2, data, url,
                    ShopkeeperLoginIDMatch && ShopkeeperLoginIDMatch[1] ? ShopkeeperLoginIDMatch[1] : undefined,
                    SharedLoginIDMatch && SharedLoginIDMatch[1] ? SharedLoginIDMatch[1] : undefined,
                    timestampMatch && timestampMatch[1] ? timestampMatch[1] : undefined,
                    shopIdMatch && shopIdMatch[1] ? shopIdMatch[1] : undefined);
                } else if (data.scene == 1035) {
                  // 从公众号短链进入
                  console.log('公众号短链进入');
                  var _url = decodeURIComponent(res.LinkUrl);
                  var query = _url.split('&').reduce(function (last, item) {
                    var args = item.split('=');
                    last[args[0]] = args[1];
                    return last;
                  }, {});
                  var params = JSON.parse(query.data);
                  handleShopkeeperCache.call(_this2, data, '/pages/index/index', params.ShopkeeperLoginID, params.SharedLoginID, params.timestamp,
                    params.ShopID);
                } else {
                  // 未判定的场景值直接调用getShopInfo
                  _this2.$store.dispatch('getShopInfo').then(function (res) {
                    uni.setStorageSync('ShopkeeperLoginID', res.ShopkeeperLoginID);
                    uni.setStorageSync('ShopID', res.ShopID);
                    uni.setStorageSync('ShopInfoDone', true);
                    if (!_this2.FunctionList['20190805001']) {
                      // 从未知渠道过来, 如果没有店主信息跳转输入手机号码页面
                      uni.reLaunch({
                        url: '/pages/login/welcome'
                      });

                    } else {
                      jumpAction(data, url);
                    }
                  });
                }
              });
            } else {
              // 未判定的场景值直接调用getShopInfo
              this.$store.dispatch('getShopInfo').then(function (res) {
                uni.setStorageSync('ShopkeeperLoginID', res.ShopkeeperLoginID);
                uni.setStorageSync('ShopID', res.ShopID);
                uni.setStorageSync('ShopInfoDone', true);
              });
            }
          }
        }

        /**
           * 执行跳转
           *
           * @param {*} data 数据
           * @param {*} url 地址
           */
        function jumpAction(data, url) {
          console.log('执行跳转方法', arguments, data, url);
          if (data.t == -1) {

          } else if (data.t == 20) {
            // 打卡红包
            uni.navigateTo({
              url: "".concat(url)
            });

          } else if (data.t == 201) {
            var shareUrl = "/pages/taskFriend/taskFriend?memberid=".concat(data.id);
            uni.navigateTo({
              url: shareUrl
            });

          } else if (data.t == 2014401) {
            uni.navigateTo({
              url: "/sub-packages/package_price/price-share/price-share?OrderId=".concat(data.data.orderId, "&thirdId=").concat(data.id, "&avatar=").concat(data.data.avatar, "&openId=").concat(data.data.openId)
            });

          } else if (data.t == 2014402 || data.t == 2014411) {
            var

              _url2 =
                data.data.url;
            uni.navigateTo({
              url: _url2
            });

          } else if (data.t == 2014403) {
            var _ref =



              data.data || {}, mission = _ref.mission, _ref$recordId = _ref.recordId, recordId = _ref$recordId === void 0 ? '' : _ref$recordId;
            uni.navigateTo({
              url: "/pages/welfare-detail/welfare-detail?mission=".concat(mission, "&recordId=").concat(recordId)
            });

          } else if (data.t == 2014404) {// 正常下单分享跳转
            uni.navigateTo({
              url: "/pages/buying-normal/index?id=".concat(data.data.id, "&refrom=").concat(data.data.refrom, "&postkey=").concat(data.data.postkey, "&relationid=").concat(data.data.relationid)
            });

          } else if (data.t == 2014408) {// Pdd详情页分享跳转
            uni.navigateTo({
              url: "/pages/buying-pdd/index?id=".concat(data.data.id, "&unionCode=").concat(data.data.unionCode, "&productBelong=").concat(data.data.productBelong || '', "&duJiaSupplierId=").concat(data.data.duJiaSupplierId || '', "&spm=").concat(data.spm)
            });

          } else if (data.t == 2014405) {// 我的余额页面
            uni.navigateTo({
              url: '/sub-packages/package_myRewards/myRewards/myRewards'
            });

          } else if (data.t == 2014409) {
            uni.navigateTo({
              url: "/pages/order-detail/order-detail?orderId=".concat(data.data.orderId)
            });

          } else if (data.t == 2014410) {
            uni.switchTab({
              url: '/pages/welfare/welfare'
            });

          } else if (data.t == 2014414) {
            uni.navigateTo({
              url: "/sub-packages/package_game/detail/detail?id=".concat(data.data.mission)
            });

          } else if (data.t == 2014415) {
            uni.navigateTo({
              url: "/sub-packages/package_self-recommend/selected/selected?postKey=".concat(data.data.postKey, "&secretkey=").concat(data.data.secretkey)
            });

          } else if (data.t == 2014416) {
            // 收益
            uni.navigateTo({
              url: "/sub-packages/package_myRewards/myRewards/myRewards"
            });

          } else if (data.t == 2014417) {
            // 专题
            uni.navigateTo({
              url: "/pages/special-topic/index/index?templateId=".concat(data.data.templateId || 0)
            });

          } else if (data.t == 2014801) {
            // 咪店学院
            uni.navigateTo({
              url: "/sub-packages/package_college/index/index?currentindex=".concat(data.data.currentindex || '')
            });

          } else if (data.t == 2014802) {
            // 店主订单管理
            uni.navigateTo({
              url: "/sub-packages/package_shop/customerOrder/index"
            });

          } else if (data.t == 2014803) {
            // 品牌详情页
            uni.navigateTo({
              url: "/pages/brand-detail/brand-detail?id=".concat(data.data.id, "&endTime=").concat(data.data.endTime || '')
            });

          } else if (data.t == 2014804) {
            // 店主上架商品的分享落地页
            uni.navigateTo({
              url: "/sub-packages/package_pop/goods/share/index?POPSupplierID=".concat(data.data.POPSupplierID)
            });

          } else if (data.t == 2014805) {
            // 活动抢购页
            uni.navigateTo({
              url: "/sub-packages/package_buying/rush-purchase/rush-purchase?activityId=".concat(data.data.activityId, "&roundId=").concat(data.data.roundId)
            });

          } else if (data.t == 2014806) {
            // 活动中间页
            uni.navigateTo({
              url: "/sub-packages/package_taobao/activity-go/activity-go?adId=".concat(data.data.adId)
            });

          } else if (data.t == 2014807) {
            // 活动会员中心
            uni.navigateTo({
              url: "/sub-packages/package_member-center/newIndex/newIndex?serialId=".concat(data.data.serialId, "&ShopkeeperLoginID=").concat(data.data.ShopkeeperLoginID)
            });

          } else if (data.t == 2014809) {
            // 优动
            uni.navigateTo({
              url: "/sub-packages/package_youdong/redirect/redirect?path=".concat(data.data.path)
            });

          } else if (data.t == 2014808) {
            // 素材页面
            var _url3;
            if (data.data.title) {
              _url3 = "/sub-packages/package_shop/recommend/recommend?currenttipvalue=".concat(
                data.data.currenttipvalue, "&tabVisible=").concat(data.data.tabVisible, "&title=").concat(data.data.title);
            } else {
              _url3 = "/sub-packages/package_shop/recommend/recommend";
            }
            uni.navigateTo({
              url: _url3
            });

          } else if (data.t == 2014810) {
            // 饿了么分享页
            uni.navigateTo({
              url: "/sub-packages/package_elemeshare/index/index?adId=".concat(data.data.adId)
            });

          } else if (data.t == 2014811) {
            // 美团
            uni.navigateTo({
              url: "/sub-packages/package_taobao/activity-go/activity-go?adId=".concat(data.data.adId)
            });

          } else if (data.t == 2014812) {// 直播中间页跳转
            uni.navigateTo({
              url: "/sub-packages/package_live-broadcast/detail/index?id=".concat(data.data.id)
            });

          } else if (data.t == 2014813) {// 直播列表页跳转
            uni.navigateTo({
              url: "/sub-packages/package_live-broadcast/index/index"
            });

          } else if (data.t == 2014814) {// 直播列表页跳转
            uni.navigateTo({
              url: "/pages/special-topic/daily-sale/daily-sale"
            });

          } else if (data.t == 2014815) {// 优惠券分享跳转
            uni.navigateTo({
              url: "/sub-packages/package_special-subject/coupon/user_coupon_share/user_coupon_share?promotionId=".concat(data.data.promotionId, "&batchId=").concat(data.data.batchId, "&receiveType=").concat(data.data.receiveType, "&needPersonCount=").concat(data.data.needPersonCount, "&assistanceId=").concat(data.data.assistanceId || '')
            });

          } else {
            console.log('跳转url');
            if (url.indexOf('/pages/index/index') == -1 &&
              url.indexOf('/sub-packages/package_custom-index/index/index') == -1) {
              uni.navigateTo({
                url: url
              });

            }
          }
        }

        /**
           * 处理店主参数
           * 暂存店主id和分享者id
           * 店主id将作为接口调用时的必传参数
           *
           * @param {*} data data
           * @param {*} url 跳转链接
           * @param {*} ShopkeeperLoginID 店主id
           * @param {*} SharedLoginID 分享者id
           * @param {*} timestamp 分享时间
           */
        function handleShopkeeperCache(data, url) {
          var _this3 = this; var ShopkeeperLoginID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0; var SharedLoginID = arguments.length > 3 ? arguments[3] : undefined; var timestamp = arguments.length > 4 ? arguments[4] : undefined; var ShopID = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
          // uni.setStorageSync('ShopkeeperLoginID', ShopkeeperLoginID); // 店主id
          // uni.setStorageSync('ShopID', ShopID); // 店主id
          uni.setStorageSync('SharedLoginID', SharedLoginID); // 分享人
          uni.setStorageSync('SharedLoginIDTime', new Date().getTime()); // 分享人时间戳 存储24小时
          this.$store.dispatch('getShopInfo', { ShopkeeperLoginID: ShopkeeperLoginID, ShopID: ShopID }).then(function (res) {
            uni.setStorageSync('ShopkeeperLoginID', res.ShopkeeperLoginID);
            uni.setStorageSync('ShopID', res.ShopID);
            uni.setStorageSync('ShopInfoDone', true);
            jumpAction(data, url);
          }).catch(function (ex) {
            _this3.$app.except(JSON.stringify(ex));
          });

          if (ShopkeeperLoginID) {
            this.$app.visitorRecord({
              ShopkeeperLoginID: ShopkeeperLoginID,
              SharedLoginID: SharedLoginID ? SharedLoginID : 0,
              ShopID: ShopID ? ShopID : undefined,
              SharedCode: timestamp ? timestamp : "UNSET".concat(Date.now())
            });

          }
        }
        /**
           * 跳转
           */
        function jump() {
          if (uni.getStorageSync('jump')) {
            var data = uni.getStorageSync('jump');
            console.log('jump缓存', data, this);
            uni.removeStorageSync('jump');
            handleJumpData.call(this, data);
          }
        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 66:
  /*!************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/index/page-change.js ***!
    \************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; var _openApp = _interopRequireDefault(__webpack_require__(/*! ../../common/open-app */ 67));
        var _gotoContact = _interopRequireDefault(__webpack_require__(/*! @/common/goto-contact */ 68));
        var _bindPhoneHelper = __webpack_require__(/*! @/common/bind-phone-helper */ 63); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }








        function _default(item) {
          console.log('item', item);

          var promise = Promise.resolve();
          switch (item.gotoUrlType) {
            case '20601':
              console.log('小程序内部跳转');
              uni.navigateTo({
                url: item.gotoUrl
              });

              break;
            case '20602':
              console.log('h5跳转');
              var url = "/pages/webview/webview?src=".concat(encodeURIComponent("".concat(item.gotoUrl)));
              if (this.$store.state.token.UniqueCode) {
                uni.navigateTo({
                  url: url
                });

              } else {
                _bindPhoneHelper.beforePhoneBind.call(this, _bindPhoneHelper.popupDirectShow, function (_ref) {
                  var result = _ref.result;
                  if (result === 'success') {
                    uni.navigateTo({
                      url: url
                    });

                  }
                });
              }
              break;
            case '20603':
              console.warn('跳转其他小程序');
              var param = {
                appId: item.gotoUrlAppId,
                path: item.gotoUrl,
                extraData: {},
                success: function success(res) {
                  // 打开成功
                  console.log('打开成功');
                },
                fail: function fail() {
                  console.log('打开失败');
                }
              };

              if (this.$store.state.token.UniqueCode) {
                uni.navigateToMiniProgram(param);
              } else {
                _bindPhoneHelper.beforePhoneBind.call(this, _bindPhoneHelper.popupDirectShow, function (_ref2) {
                  var result = _ref2.result;
                  if (result === 'success') {
                    uni.navigateToMiniProgram(param);
                  }
                });
              }

              break;
            case '20604':
              console.log('跳转tabbar');
              uni.switchTab({
                url: item.gotoUrl
              });

              break;
            case '20606':
              console.log('跳转app');
              (0, _openApp.default)('tb', item.gotoUrl);
              break;
            case '999999':
              console.log('APP跳转小程序');
              (0, _gotoContact.default)(item.gotoUrl);
              break;
            default:
              break;
          }
























        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 67:
  /*!****************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/open-app.js ***!
    \****************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; var _mta = __webpack_require__(/*! @/common/mta */ 23);
        /**
                                                                                                                                                   * 打开app
                                                                                                                                                   *
                                                                                                                                                   * @param {*} app app类型 tb 淘宝, pdd 拼多多, jd 京东
                                                                                                                                                   * @param {*} url
                                                                                                                                                   */
        function _default(app, url) {
          try {
            if (app === 'tb') {
              this.$app.request2({
                url: 'api/MeowStore/GetTaoBaoTranferUrl',
                mode: 'normal5',
                data: {
                  TaoBaoUrl: url
                },

                success: function success(res) {
                  if (res.UrlType == 0) {
                    var pages = getCurrentPages();
                    var path = pages.slice(-1)[0].route;
                    console.log(path);
                    if (path == 'pages/special-topic/index/index') {
                      uni.$emit("tb_auth_transfer1", { UrlType: res.UrlType });
                    } else if (path == 'sub-packages/package_taobao/activity-go/activity-go') {
                      uni.$emit("tb_auth_transfer2", { UrlType: res.UrlType });
                    } else {
                      uni.$emit("tb_auth_transfer", { UrlType: res.UrlType });
                    }
                  } else {
                    url = res.TransferUrl;
                    (0, _mta.except)({
                      level: 1,
                      message: "tb0:".concat(url, "\r\n").concat(url.replace(/^http(s?):\/\//, 'taobao://'))
                    });

                    var tbUrl = url.replace(/^http(s?):\/\//, 'taobao://');
                    plus.runtime.openURL(encodeURI("".concat(tbUrl).concat(tbUrl.indexOf('?') > -1 ? '&' : '?', "md_uuid=").concat(Date.now())), function (ex) {
                      (0, _mta.except)({
                        level: 1,
                        message: "tb1:".concat(JSON.stringify(ex))
                      },
                        'com.taobao.taobao');
                      plus.runtime.openURL(url, function (ex) {
                        (0, _mta.except)({
                          level: 1,
                          message: "tb1:".concat(JSON.stringify(ex))
                        });

                      });
                    });
                  }
                }
              });

            } else if (app === 'pdd') {
              if (plus.runtime.isApplicationExist({ pname: 'com.xunmeng.pinduoduo', action: 'pinduoduo://' })) {
                if (uni.getSystemInfoSync().platform == 'ios') {
                  //https://p.pinduoduo.com/I1PrKTIu  -短链接  ios 需要特殊处理下
                  if (url.match(new RegExp(/^http(s?):\/\/mobile.yangkeduo.com/))) {
                    url = url.replace('https://mobile.yangkeduo.com/', 'pinduoduo://com.xunmeng.pinduoduo/');
                  } else {
                    uni.navigateTo({
                      url: "/pages/webview/webview?src=".concat(encodeURIComponent(url))
                    });

                  }
                } else {
                  plus.runtime.openURL("pinduoduo://com.xunmeng.pinduoduo/" + url,
                    function (res) { });
                }

              } else {
                plus.runtime.openURL(url);
              }
            } else if (app === 'jd') {
              if (plus.runtime.isApplicationExist({ pname: 'com.jingdong.app.mall', action: 'openApp.jdMobile://' })) {
                if (uni.getSystemInfoSync().platform == 'android') {
                  plus.android.invoke("com.jingxi.catshop.utils.JDUtils",
                    "jumpJD", url);
                } else {
                  var HBXBridge = plus.ios.import("HBXBridge");
                  var BridgeObj = HBXBridge.sharedSingleton();
                  BridgeObj.JD_openKeplerPageWithURLuserInfo(url, {});
                }
              } else {
                plus.runtime.openURL(url);
              }
            }
          } catch (ex) {
            (0, _mta.except)({
              level: 1,
              message: "".concat(ex.message, "\r\n").concat(ex.stack)
            });

          }
        }
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 68:
  /*!********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/goto-contact.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; var _mta = __webpack_require__(/*! @/common/mta */ 23);

















































        function _default(path) {
          //   const path = `/sub-packages/package_extra/faq/faq`

          uni.navigateTo({
            url: path
          });






        };
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 69:
  /*!***************************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/index/customIndexLoactionMethods.js ***!
    \***************************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _default = {
          onLoad: function onLoad() {
            console.log("检查位置");

            this.checkUserPos();












          },
          watch: {
            posInfo: function posInfo() {
              // this.getProductTaskList();
            }
          },

          data: function data() {
            return {
              posInfo: {
                cityId: 0, // 全国
                cityName: '全国'
              }
            };


          },
          methods: {
            //查看本地
            viewLocal: function viewLocal() {

              if (this.posInfo.cityId != 0) return;

              this.checkUserPos();




            },
            // 检查是否存在位置权限
            checkUserPos: function checkUserPos() {
              var _this = this;

              uni.getSetting({
                success: function success(res) {
                  var auth = res.authSetting;
                  if (auth['scope.userLocation'] === true) {
                    _this.getPosInfo();
                  } else {
                    _this.initAuthPos();
                  }
                },
                fail: function fail() {
                  _this.initAuthPos();
                }
              });





            },
            //发起用户位置信息授权认证
            initAuthPos: function initAuthPos() {
              var _this2 = this;

              wx.authorize({
                scope: 'scope.userLocation',
                success: function success() {
                  _this2.getPosInfo();
                },
                fail: function fail() {
                  _this2.handleHomePage && _this2.handleHomePage();
                  uni.$emit('position', 0, 0);
                }
              });





            },
            // 获取当前位置信息，定位城市
            getPosInfo: function getPosInfo() {
              var _this3 = this;
              this.handleHomePage && this.handleHomePage();
              uni.getLocation({
                type: 'wgs84',
                success: function success(res) {
                  _this3.fetchPosInfo(res.latitude, res.longitude);
                  uni.$emit('position', res.longitude, res.latitude);
                },
                fail: function fail() {
                  uni.$emit('position', 0, 0);
                }
              });

            },
            fetchPosInfo: function fetchPosInfo(lat, lon) {
              var _this4 = this;
              this.$app.request2({
                url: 'api/CommonPage/GetDistrictByLongitude',
                data: {
                  Lat: lat,
                  Lon: lon
                },

                success: function success(res) {
                  if (res) {
                    _this4.posInfo = {
                      cityId: res.DistrictCode,
                      cityName: res.DistrictName,
                      lat: lat,
                      lon: lon
                    };

                    _this4.$store.commit('setPosition', _this4.posInfo);
                  }
                },
                down: function down(res) { },
                fail: function fail() { },
                complete: function complete() { }
              });

            }
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 70:
  /*!**********************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/index/customIndexTabMethods.js ***!
    \**********************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _throttle = _interopRequireDefault(__webpack_require__(/*! @/utils/throttle */ 71)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } var _default =

        {
          onLoad: function onLoad() {

          },
          watch: {},


          data: function data() {
          },
          computed: {
            shopInfo: function shopInfo() {
              return this.$store.state.shopInfo;
            }
          },

          methods: {
            getShopInfo: function getShopInfo() {
              var showLoading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
              showLoading && uni.showLoading({
                title: '加载中...',
                mask: true
              });

              return this.$store.dispatch('getShopInfo').catch(function (ex) { }).then(function (res) {
                uni.hideLoading();
                return res;
              });
            },
            refreshShopInfo: function refreshShopInfo() {
              var showLoading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
              return this.getShopInfo(showLoading);
            },
            //老头条跳转
            headlineJump: function headlineJump(url) {
              if (url == '/pages/travel/index/index' || url == '/pages/welfare/welfare') {
                uni.switchTab({
                  url: url
                });

              } else {
                uni.navigateTo({
                  url: url
                });

              }

            },
            //进入搜索页
            goSearch: function goSearch() {
              uni.navigateTo({
                url: "/sub-packages/package_tao/search/search?unioncode=".concat(this.unioncode)
              });

            },

            // 首页按钮
            gotoHome: function gotoHome() {
              uni.switchTab({
                url: "/pages/index/index"
              });

            },
            gotoSelection: function gotoSelection() {
              var pages = getCurrentPages(); // 当前页面
              var index = pages.reverse().findIndex(function (item) {
                return item && item.route.indexOf('pages/special-topic/selection/selection') > -1;
              });
              console.log('gotoSelection', index);
              if (index > -1) {
                uni.navigateBack({
                  delta: index
                });

              } else {
                uni.navigateTo({
                  url: "/pages/special-topic/selection/selection"
                });

              }
            },
            gotoWorkbench: function gotoWorkbench() {
              var pages = getCurrentPages(); // 当前页面
              var index = pages.reverse().findIndex(function (item) {
                return item && item.route.indexOf('package_shop/workbench/workbench') > -1;
              });
              console.log('gotoWorkbench', index);
              if (index > -1) {
                uni.navigateBack({
                  delta: index
                });

              } else {
                uni.navigateTo({
                  url: "/sub-packages/package_shop/workbench/workbench"
                });

              }
            },
            /**
                * 去每日特卖
                */
            gotoDailySale: function gotoDailySale() {
              var pages = getCurrentPages(); // 当前页面
              var index = pages.reverse().findIndex(function (item) {
                return item && item.route.indexOf('pages/special-topic/daily-sale/daily-sale') > -1;
              });
              console.log('getCurrentPages', index);
              if (index > -1) {
                uni.navigateBack({
                  delta: index
                });

              } else {
                uni.navigateTo({
                  url: "/pages/special-topic/daily-sale/daily-sale"
                });

              }
            },
            gotoMine: function gotoMine() {
              uni.switchTab({
                url: "/pages/mine/main/main"
              });

            },
            gotoTravelIndex: function gotoTravelIndex() {
              uni.removeStorageSync("travelIndexIsHomePage");
              uni.switchTab({
                url: "/pages/travel/index/index"
              });

            },
            gotoWelfare: function gotoWelfare() {
              uni.removeStorageSync("welfareIsHomePage");
              uni.switchTab({
                url: "/pages/welfare/welfare"
              });

            },
            shareShop: function shareShop() {
              if (this.active === 'dailySale') {
                this.$emit('open');
              } else {
                uni.navigateTo({
                  url: "/sub-packages/package_shop/runingSetting/shareShop/shareShop-new"
                });

              }
            },
            gotoVIP: function gotoVIP() {
              var pages = getCurrentPages(); // 当前页面
              var index = pages.reverse().findIndex(function (item) {
                return item && item.route.indexOf('pages/special-topic/vip/index') > -1;
              });
              if (index > -1) {
                uni.navigateBack({
                  delta: index
                });

              } else {
                uni.navigateTo({
                  url: "/pages/special-topic/vip/index"
                });

              }
            }
          }
        }; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 71:
  /*!***************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/utils/throttle.js ***!
    \***************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = _default; function _default(func, wait, options) {
        var timeout, context, args, result;
        var previous = 0;
        if (!options) options = {};

        var later = function later() {
          previous = options.leading === false ? 0 : Date.now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        };

        var throttled = function throttled() {
          var now = Date.now();
          if (!previous && options.leading === false) previous = now;
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0 || remaining > wait) {
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };

        throttled.cancel = function () {
          clearTimeout(timeout);
          previous = 0;
          timeout = context = args = null;
        };

        return throttled;
      };

      /***/
    }),

  /***/ 72:
  /*!**********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/marketing-task.js ***!
    \**********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.saveShowStatus = saveShowStatus; exports.pickShowAd = pickShowAd; exports.default = void 0;
        var _util = __webpack_require__(/*! @/utils/util */ 45);
        var _global = __webpack_require__(/*! @/common/global.config */ 21);
        var _advertisementJump = _interopRequireDefault(__webpack_require__(/*! @/common/advertisement-jump */ 73)); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

        var pageSortIDMeta = {
          // 首页
          'pages/index/index': '20547',
          // 选品
          'pages/special-topic/selection/selection': '20548',
          // 店主工作台
          'sub-packages/package_shop/workbench/workbench': '20549',
          // 特卖
          'pages/special-topic/daily-sale/daily-sale': '20550'
        };

        /**
                                                                   * 存储弹框显示结果
                                                                   * @param {Number} sortId 页面对应的sortId
                                                                   * @param {Number} 广告id
                                                                   */
        function saveShowStatus(sortId, id) {
          var statusObj = uni.getStorageSync('marketingTaskStatus') || {};
          // 当前页广告显示时间点
          var currentStatus = statusObj[sortId] || {};
          Object.assign(currentStatus, _defineProperty({},
            id, (0, _util.dateFormat)(new Date(), 'yyyy-MM-dd')));

          statusObj[sortId] = currentStatus;
          uni.setStorageSync('marketingTaskStatus', statusObj);
        }
        /**
           * 获取可显示
           * @param {Number} sortId 页面对应的sortId
           * @param {Array} list 当前页广告集合
           * @returns {Object} 选中的显示广告
           */
        function pickShowAd(sortId) {
          var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var now = new Date();
          now.setHours(0);
          now.setMinutes(0);
          now.setSeconds(0);
          now.setMilliseconds(0);

          var statusObj = uni.getStorageSync('marketingTaskStatus');
          //  当前页广告显示时间点
          var currentStatus = statusObj[sortId] || {};
          var ad = null;

          for (var i = 0, len = list.length; i < len; i++) {
            var item = list[i];
            var saveTime = currentStatus[item.SPCId];
            if (saveTime) {
              if (now - new Date(saveTime.replace(/-/g, '/')) >= 24 * 3600 * 1000) {
                ad = item;
                break;
              }
            } else {
              ad = item;
              break;
            }
          }

          return ad;
        }

        var mixin = {
          data: function data() {
            return {
              marketingTask: {
                show: false
              }
            };


          },
          mounted: function mounted() {
            var _this = this;
            this.$app.shopInfoPromise().then(function () {
              var path = _this.$mp.page.route;
              var sortID = pageSortIDMeta[path];
              sortID && _this.$app.request2({
                url: 'api/CommonPage/GetPageInfoBySortID',
                data: {
                  DataCache: 10001,
                  SPCSortID: [
                    sortID],

                  SPCProjectID: _global.projectCode
                },

                success: function success(res) {
                  var
                    SPCList = res.SPCList;
                  var ad = pickShowAd(sortID, SPCList);
                  if (ad) {
                    _this.marketingTask = Object.assign({}, { show: true }, _objectSpread({}, ad));
                    if (ad.SPCISOnce != 1) {
                      saveShowStatus(sortID, ad.SPCId);
                    }
                  }
                }
              });

            });
          },
          methods: {
            marketingTaskJump: function marketingTaskJump() {
              this.marketingTask.show = false;
              _advertisementJump.default.call(this, this.marketingTask);
            }
          }
        }; exports.default = mixin;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 73:
  /*!**************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/advertisement-jump.js ***!
    \**************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
        Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0;
        var _gotoContact = _interopRequireDefault(__webpack_require__(/*! @/common/goto-contact */ 68));
        var _bindPhoneHelper = __webpack_require__(/*! @/common/bind-phone-helper */ 63); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } /* 广告位的跳转 直接传入整个item */







        function adJump(item) {
          if (item.spm) {
            this.$app.SPM({
              spm: item.spm
            });

          }


          var promise = Promise.resolve();
          switch (item.SPCTurnUrlID) {
            case 20601:
              console.log('小程序内部跳转');
              uni.navigateTo({
                url: item.SPCTurnUrlAddress
              });

              break;
            case 20602:
              console.log('h5跳转');
              if (!String(item.SPCTurnUrlAddress || '').trim()) {
                return;
              }
              var url = "/pages/webview/webview?src=".concat(encodeURIComponent("".concat(item.SPCTurnUrlAddress)));

              if (this.$store.state.token.UniqueCode) {
                uni.navigateTo({
                  url: url
                });

              } else {
                _bindPhoneHelper.beforePhoneBind.call(this, _bindPhoneHelper.popupDirectShow, function (_ref) {
                  var result = _ref.result;
                  if (result === 'success') {
                    uni.navigateTo({
                      url: url
                    });

                  }
                });
              }
              break;

            case 20603:
              console.log('跳转其他小程序');
              var param = {
                appId: item.SPCDescribe,
                path: item.SPCTurnUrlAddress,
                extraData: {},
                success: function success(res) {
                  // 打开成功
                  console.log('打开成功');
                },
                fail: function fail() {
                  console.log('打开失败');
                }
              };


              if (this.$store.state.token.UniqueCode) {
                uni.navigateToMiniProgram(param);
              } else {
                _bindPhoneHelper.beforePhoneBind.call(this, _bindPhoneHelper.popupDirectShow, function (_ref2) {
                  var result = _ref2.result;
                  if (result === 'success') {
                    uni.navigateToMiniProgram(param);
                  }
                });
              }
              break;
            case 20604:
              console.log('跳转tabbar');
              uni.switchTab({
                url: item.SPCTurnUrlAddress
              });

              break;
            case 20612:
              console.log('APP跳转小程序');
              // item.SPCTurnUrlAddress=`/pages/index/index?sn=-1&t=2014809&data=${encodeURIComponent(JSON.stringify({path:'orders'}))}`;
              (0, _gotoContact.default)(item.SPCTurnUrlAddress);
              break;
            case 999999:
              console.log('勋光独立APP跳转小程序');
              // item.SPCTurnUrlAddress=`/pages/index/index?sn=-1&t=2014809&data=${encodeURIComponent(JSON.stringify({path:'orders'}))}`;
              (0, _gotoContact.default)(item.SPCTurnUrlAddress);
              break;
            default:
              break;
          }
























        } var _default =
          adJump; exports.default = _default;
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    }),

  /***/ 8:
  /*!********************************************!*\
    !*** ./node_modules/vuex/dist/vuex.esm.js ***!
    \********************************************/
  /*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function () { return Store; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function () { return install; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function () { return mapState; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function () { return mapMutations; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function () { return mapGetters; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function () { return mapActions; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function () { return createNamespacedHelpers; });
      /**
       * vuex v3.0.1
       * (c) 2017 Evan You
       * @license MIT
       */
      var applyMixin = function (Vue) {
        var version = Number(Vue.version.split('.')[0]);

        if (version >= 2) {
          Vue.mixin({ beforeCreate: vuexInit });
        } else {
          // override init and inject vuex init procedure
          // for 1.x backwards compatibility.
          var _init = Vue.prototype._init;
          Vue.prototype._init = function (options) {
            if (options === void 0) options = {};

            options.init = options.init
              ? [vuexInit].concat(options.init)
              : vuexInit;
            _init.call(this, options);
          };
        }

        /**
         * Vuex init hook, injected into each instances init hooks list.
         */

        function vuexInit() {
          var options = this.$options;
          // store injection
          if (options.store) {
            this.$store = typeof options.store === 'function'
              ? options.store()
              : options.store;
          } else if (options.parent && options.parent.$store) {
            this.$store = options.parent.$store;
          }
        }
      };

      var devtoolHook =
        typeof window !== 'undefined' &&
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

      function devtoolPlugin(store) {
        if (!devtoolHook) { return }

        store._devtoolHook = devtoolHook;

        devtoolHook.emit('vuex:init', store);

        devtoolHook.on('vuex:travel-to-state', function (targetState) {
          store.replaceState(targetState);
        });

        store.subscribe(function (mutation, state) {
          devtoolHook.emit('vuex:mutation', mutation, state);
        });
      }

      /**
       * Get the first item that pass the test
       * by second argument function
       *
       * @param {Array} list
       * @param {Function} f
       * @return {*}
       */
      /**
       * Deep copy the given object considering circular structure.
       * This function caches all nested objects and its copies.
       * If it detects circular structure, use cached copy to avoid infinite loop.
       *
       * @param {*} obj
       * @param {Array<Object>} cache
       * @return {*}
       */


      /**
       * forEach for object
       */
      function forEachValue(obj, fn) {
        Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
      }

      function isObject(obj) {
        return obj !== null && typeof obj === 'object'
      }

      function isPromise(val) {
        return val && typeof val.then === 'function'
      }

      function assert(condition, msg) {
        if (!condition) { throw new Error(("[vuex] " + msg)) }
      }

      var Module = function Module(rawModule, runtime) {
        this.runtime = runtime;
        this._children = Object.create(null);
        this._rawModule = rawModule;
        var rawState = rawModule.state;
        this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
      };

      var prototypeAccessors$1 = { namespaced: { configurable: true } };

      prototypeAccessors$1.namespaced.get = function () {
        return !!this._rawModule.namespaced
      };

      Module.prototype.addChild = function addChild(key, module) {
        this._children[key] = module;
      };

      Module.prototype.removeChild = function removeChild(key) {
        delete this._children[key];
      };

      Module.prototype.getChild = function getChild(key) {
        return this._children[key]
      };

      Module.prototype.update = function update(rawModule) {
        this._rawModule.namespaced = rawModule.namespaced;
        if (rawModule.actions) {
          this._rawModule.actions = rawModule.actions;
        }
        if (rawModule.mutations) {
          this._rawModule.mutations = rawModule.mutations;
        }
        if (rawModule.getters) {
          this._rawModule.getters = rawModule.getters;
        }
      };

      Module.prototype.forEachChild = function forEachChild(fn) {
        forEachValue(this._children, fn);
      };

      Module.prototype.forEachGetter = function forEachGetter(fn) {
        if (this._rawModule.getters) {
          forEachValue(this._rawModule.getters, fn);
        }
      };

      Module.prototype.forEachAction = function forEachAction(fn) {
        if (this._rawModule.actions) {
          forEachValue(this._rawModule.actions, fn);
        }
      };

      Module.prototype.forEachMutation = function forEachMutation(fn) {
        if (this._rawModule.mutations) {
          forEachValue(this._rawModule.mutations, fn);
        }
      };

      Object.defineProperties(Module.prototype, prototypeAccessors$1);

      var ModuleCollection = function ModuleCollection(rawRootModule) {
        // register root module (Vuex.Store options)
        this.register([], rawRootModule, false);
      };

      ModuleCollection.prototype.get = function get(path) {
        return path.reduce(function (module, key) {
          return module.getChild(key)
        }, this.root)
      };

      ModuleCollection.prototype.getNamespace = function getNamespace(path) {
        var module = this.root;
        return path.reduce(function (namespace, key) {
          module = module.getChild(key);
          return namespace + (module.namespaced ? key + '/' : '')
        }, '')
      };

      ModuleCollection.prototype.update = function update$1(rawRootModule) {
        update([], this.root, rawRootModule);
      };

      ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
        var this$1 = this;
        if (runtime === void 0) runtime = true;

        if (true) {
          assertRawModule(path, rawModule);
        }

        var newModule = new Module(rawModule, runtime);
        if (path.length === 0) {
          this.root = newModule;
        } else {
          var parent = this.get(path.slice(0, -1));
          parent.addChild(path[path.length - 1], newModule);
        }

        // register nested modules
        if (rawModule.modules) {
          forEachValue(rawModule.modules, function (rawChildModule, key) {
            this$1.register(path.concat(key), rawChildModule, runtime);
          });
        }
      };

      ModuleCollection.prototype.unregister = function unregister(path) {
        var parent = this.get(path.slice(0, -1));
        var key = path[path.length - 1];
        if (!parent.getChild(key).runtime) { return }

        parent.removeChild(key);
      };

      function update(path, targetModule, newModule) {
        if (true) {
          assertRawModule(path, newModule);
        }

        // update target module
        targetModule.update(newModule);

        // update nested modules
        if (newModule.modules) {
          for (var key in newModule.modules) {
            if (!targetModule.getChild(key)) {
              if (true) {
                console.warn(
                  "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
                  'manual reload is needed'
                );
              }
              return
            }
            update(
              path.concat(key),
              targetModule.getChild(key),
              newModule.modules[key]
            );
          }
        }
      }

      var functionAssert = {
        assert: function (value) { return typeof value === 'function'; },
        expected: 'function'
      };

      var objectAssert = {
        assert: function (value) {
          return typeof value === 'function' ||
            (typeof value === 'object' && typeof value.handler === 'function');
        },
        expected: 'function or object with "handler" function'
      };

      var assertTypes = {
        getters: functionAssert,
        mutations: functionAssert,
        actions: objectAssert
      };

      function assertRawModule(path, rawModule) {
        Object.keys(assertTypes).forEach(function (key) {
          if (!rawModule[key]) { return }

          var assertOptions = assertTypes[key];

          forEachValue(rawModule[key], function (value, type) {
            assert(
              assertOptions.assert(value),
              makeAssertionMessage(path, key, type, value, assertOptions.expected)
            );
          });
        });
      }

      function makeAssertionMessage(path, key, type, value, expected) {
        var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
        if (path.length > 0) {
          buf += " in module \"" + (path.join('.')) + "\"";
        }
        buf += " is " + (JSON.stringify(value)) + ".";
        return buf
      }

      var Vue; // bind on install

      var Store = function Store(options) {
        var this$1 = this;
        if (options === void 0) options = {};

        // Auto install if it is not done yet and `window` has `Vue`.
        // To allow users to avoid auto-installation in some cases,
        // this code should be placed here. See #731
        if (!Vue && typeof window !== 'undefined' && window.Vue) {
          install(window.Vue);
        }

        if (true) {
          assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
          assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
          assert(this instanceof Store, "Store must be called with the new operator.");
        }

        var plugins = options.plugins; if (plugins === void 0) plugins = [];
        var strict = options.strict; if (strict === void 0) strict = false;

        var state = options.state; if (state === void 0) state = {};
        if (typeof state === 'function') {
          state = state() || {};
        }

        // store internal state
        this._committing = false;
        this._actions = Object.create(null);
        this._actionSubscribers = [];
        this._mutations = Object.create(null);
        this._wrappedGetters = Object.create(null);
        this._modules = new ModuleCollection(options);
        this._modulesNamespaceMap = Object.create(null);
        this._subscribers = [];
        this._watcherVM = new Vue();

        // bind commit and dispatch to self
        var store = this;
        var ref = this;
        var dispatch = ref.dispatch;
        var commit = ref.commit;
        this.dispatch = function boundDispatch(type, payload) {
          return dispatch.call(store, type, payload)
        };
        this.commit = function boundCommit(type, payload, options) {
          return commit.call(store, type, payload, options)
        };

        // strict mode
        this.strict = strict;

        // init root module.
        // this also recursively registers all sub-modules
        // and collects all module getters inside this._wrappedGetters
        installModule(this, state, [], this._modules.root);

        // initialize the store vm, which is responsible for the reactivity
        // (also registers _wrappedGetters as computed properties)
        resetStoreVM(this, state);

        // apply plugins
        plugins.forEach(function (plugin) { return plugin(this$1); });

        if (Vue.config.devtools) {
          devtoolPlugin(this);
        }
      };

      var prototypeAccessors = { state: { configurable: true } };

      prototypeAccessors.state.get = function () {
        return this._vm._data.$$state
      };

      prototypeAccessors.state.set = function (v) {
        if (true) {
          assert(false, "Use store.replaceState() to explicit replace store state.");
        }
      };

      Store.prototype.commit = function commit(_type, _payload, _options) {
        var this$1 = this;

        // check object-style commit
        var ref = unifyObjectStyle(_type, _payload, _options);
        var type = ref.type;
        var payload = ref.payload;
        var options = ref.options;

        var mutation = { type: type, payload: payload };
        var entry = this._mutations[type];
        if (!entry) {
          if (true) {
            console.error(("[vuex] unknown mutation type: " + type));
          }
          return
        }
        this._withCommit(function () {
          entry.forEach(function commitIterator(handler) {
            handler(payload);
          });
        });
        this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

        if (
          true &&
          options && options.silent
        ) {
          console.warn(
            "[vuex] mutation type: " + type + ". Silent option has been removed. " +
            'Use the filter functionality in the vue-devtools'
          );
        }
      };

      Store.prototype.dispatch = function dispatch(_type, _payload) {
        var this$1 = this;

        // check object-style dispatch
        var ref = unifyObjectStyle(_type, _payload);
        var type = ref.type;
        var payload = ref.payload;

        var action = { type: type, payload: payload };
        var entry = this._actions[type];
        if (!entry) {
          if (true) {
            console.error(("[vuex] unknown action type: " + type));
          }
          return
        }

        this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

        return entry.length > 1
          ? Promise.all(entry.map(function (handler) { return handler(payload); }))
          : entry[0](payload)
      };

      Store.prototype.subscribe = function subscribe(fn) {
        return genericSubscribe(fn, this._subscribers)
      };

      Store.prototype.subscribeAction = function subscribeAction(fn) {
        return genericSubscribe(fn, this._actionSubscribers)
      };

      Store.prototype.watch = function watch(getter, cb, options) {
        var this$1 = this;

        if (true) {
          assert(typeof getter === 'function', "store.watch only accepts a function.");
        }
        return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
      };

      Store.prototype.replaceState = function replaceState(state) {
        var this$1 = this;

        this._withCommit(function () {
          this$1._vm._data.$$state = state;
        });
      };

      Store.prototype.registerModule = function registerModule(path, rawModule, options) {
        if (options === void 0) options = {};

        if (typeof path === 'string') { path = [path]; }

        if (true) {
          assert(Array.isArray(path), "module path must be a string or an Array.");
          assert(path.length > 0, 'cannot register the root module by using registerModule.');
        }

        this._modules.register(path, rawModule);
        installModule(this, this.state, path, this._modules.get(path), options.preserveState);
        // reset store to update getters...
        resetStoreVM(this, this.state);
      };

      Store.prototype.unregisterModule = function unregisterModule(path) {
        var this$1 = this;

        if (typeof path === 'string') { path = [path]; }

        if (true) {
          assert(Array.isArray(path), "module path must be a string or an Array.");
        }

        this._modules.unregister(path);
        this._withCommit(function () {
          var parentState = getNestedState(this$1.state, path.slice(0, -1));
          Vue.delete(parentState, path[path.length - 1]);
        });
        resetStore(this);
      };

      Store.prototype.hotUpdate = function hotUpdate(newOptions) {
        this._modules.update(newOptions);
        resetStore(this, true);
      };

      Store.prototype._withCommit = function _withCommit(fn) {
        var committing = this._committing;
        this._committing = true;
        fn();
        this._committing = committing;
      };

      Object.defineProperties(Store.prototype, prototypeAccessors);

      function genericSubscribe(fn, subs) {
        if (subs.indexOf(fn) < 0) {
          subs.push(fn);
        }
        return function () {
          var i = subs.indexOf(fn);
          if (i > -1) {
            subs.splice(i, 1);
          }
        }
      }

      function resetStore(store, hot) {
        store._actions = Object.create(null);
        store._mutations = Object.create(null);
        store._wrappedGetters = Object.create(null);
        store._modulesNamespaceMap = Object.create(null);
        var state = store.state;
        // init all modules
        installModule(store, state, [], store._modules.root, true);
        // reset vm
        resetStoreVM(store, state, hot);
      }

      function resetStoreVM(store, state, hot) {
        var oldVm = store._vm;

        // bind store public getters
        store.getters = {};
        var wrappedGetters = store._wrappedGetters;
        var computed = {};
        forEachValue(wrappedGetters, function (fn, key) {
          // use computed to leverage its lazy-caching mechanism
          computed[key] = function () { return fn(store); };
          Object.defineProperty(store.getters, key, {
            get: function () { return store._vm[key]; },
            enumerable: true // for local getters
          });
        });

        // use a Vue instance to store the state tree
        // suppress warnings just in case the user has added
        // some funky global mixins
        var silent = Vue.config.silent;
        Vue.config.silent = true;
        store._vm = new Vue({
          data: {
            $$state: state
          },
          computed: computed
        });
        Vue.config.silent = silent;

        // enable strict mode for new vm
        if (store.strict) {
          enableStrictMode(store);
        }

        if (oldVm) {
          if (hot) {
            // dispatch changes in all subscribed watchers
            // to force getter re-evaluation for hot reloading.
            store._withCommit(function () {
              oldVm._data.$$state = null;
            });
          }
          Vue.nextTick(function () { return oldVm.$destroy(); });
        }
      }

      function installModule(store, rootState, path, module, hot) {
        var isRoot = !path.length;
        var namespace = store._modules.getNamespace(path);

        // register in namespace map
        if (module.namespaced) {
          store._modulesNamespaceMap[namespace] = module;
        }

        // set state
        if (!isRoot && !hot) {
          var parentState = getNestedState(rootState, path.slice(0, -1));
          var moduleName = path[path.length - 1];
          store._withCommit(function () {
            Vue.set(parentState, moduleName, module.state);
          });
        }

        var local = module.context = makeLocalContext(store, namespace, path);

        module.forEachMutation(function (mutation, key) {
          var namespacedType = namespace + key;
          registerMutation(store, namespacedType, mutation, local);
        });

        module.forEachAction(function (action, key) {
          var type = action.root ? key : namespace + key;
          var handler = action.handler || action;
          registerAction(store, type, handler, local);
        });

        module.forEachGetter(function (getter, key) {
          var namespacedType = namespace + key;
          registerGetter(store, namespacedType, getter, local);
        });

        module.forEachChild(function (child, key) {
          installModule(store, rootState, path.concat(key), child, hot);
        });
      }

      /**
       * make localized dispatch, commit, getters and state
       * if there is no namespace, just use root ones
       */
      function makeLocalContext(store, namespace, path) {
        var noNamespace = namespace === '';

        var local = {
          dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
            var args = unifyObjectStyle(_type, _payload, _options);
            var payload = args.payload;
            var options = args.options;
            var type = args.type;

            if (!options || !options.root) {
              type = namespace + type;
              if (true && !store._actions[type]) {
                console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
                return
              }
            }

            return store.dispatch(type, payload)
          },

          commit: noNamespace ? store.commit : function (_type, _payload, _options) {
            var args = unifyObjectStyle(_type, _payload, _options);
            var payload = args.payload;
            var options = args.options;
            var type = args.type;

            if (!options || !options.root) {
              type = namespace + type;
              if (true && !store._mutations[type]) {
                console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
                return
              }
            }

            store.commit(type, payload, options);
          }
        };

        // getters and state object must be gotten lazily
        // because they will be changed by vm update
        Object.defineProperties(local, {
          getters: {
            get: noNamespace
              ? function () { return store.getters; }
              : function () { return makeLocalGetters(store, namespace); }
          },
          state: {
            get: function () { return getNestedState(store.state, path); }
          }
        });

        return local
      }

      function makeLocalGetters(store, namespace) {
        var gettersProxy = {};

        var splitPos = namespace.length;
        Object.keys(store.getters).forEach(function (type) {
          // skip if the target getter is not match this namespace
          if (type.slice(0, splitPos) !== namespace) { return }

          // extract local getter type
          var localType = type.slice(splitPos);

          // Add a port to the getters proxy.
          // Define as getter property because
          // we do not want to evaluate the getters in this time.
          Object.defineProperty(gettersProxy, localType, {
            get: function () { return store.getters[type]; },
            enumerable: true
          });
        });

        return gettersProxy
      }

      function registerMutation(store, type, handler, local) {
        var entry = store._mutations[type] || (store._mutations[type] = []);
        entry.push(function wrappedMutationHandler(payload) {
          handler.call(store, local.state, payload);
        });
      }

      function registerAction(store, type, handler, local) {
        var entry = store._actions[type] || (store._actions[type] = []);
        entry.push(function wrappedActionHandler(payload, cb) {
          var res = handler.call(store, {
            dispatch: local.dispatch,
            commit: local.commit,
            getters: local.getters,
            state: local.state,
            rootGetters: store.getters,
            rootState: store.state
          }, payload, cb);
          if (!isPromise(res)) {
            res = Promise.resolve(res);
          }
          if (store._devtoolHook) {
            return res.catch(function (err) {
              store._devtoolHook.emit('vuex:error', err);
              throw err
            })
          } else {
            return res
          }
        });
      }

      function registerGetter(store, type, rawGetter, local) {
        if (store._wrappedGetters[type]) {
          if (true) {
            console.error(("[vuex] duplicate getter key: " + type));
          }
          return
        }
        store._wrappedGetters[type] = function wrappedGetter(store) {
          return rawGetter(
            local.state, // local state
            local.getters, // local getters
            store.state, // root state
            store.getters // root getters
          )
        };
      }

      function enableStrictMode(store) {
        store._vm.$watch(function () { return this._data.$$state }, function () {
          if (true) {
            assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
          }
        }, { deep: true, sync: true });
      }

      function getNestedState(state, path) {
        return path.length
          ? path.reduce(function (state, key) { return state[key]; }, state)
          : state
      }

      function unifyObjectStyle(type, payload, options) {
        if (isObject(type) && type.type) {
          options = payload;
          payload = type;
          type = type.type;
        }

        if (true) {
          assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
        }

        return { type: type, payload: payload, options: options }
      }

      function install(_Vue) {
        if (Vue && _Vue === Vue) {
          if (true) {
            console.error(
              '[vuex] already installed. Vue.use(Vuex) should be called only once.'
            );
          }
          return
        }
        Vue = _Vue;
        applyMixin(Vue);
      }

      var mapState = normalizeNamespace(function (namespace, states) {
        var res = {};
        normalizeMap(states).forEach(function (ref) {
          var key = ref.key;
          var val = ref.val;

          res[key] = function mappedState() {
            var state = this.$store.state;
            var getters = this.$store.getters;
            if (namespace) {
              var module = getModuleByNamespace(this.$store, 'mapState', namespace);
              if (!module) {
                return
              }
              state = module.context.state;
              getters = module.context.getters;
            }
            return typeof val === 'function'
              ? val.call(this, state, getters)
              : state[val]
          };
          // mark vuex getter for devtools
          res[key].vuex = true;
        });
        return res
      });

      var mapMutations = normalizeNamespace(function (namespace, mutations) {
        var res = {};
        normalizeMap(mutations).forEach(function (ref) {
          var key = ref.key;
          var val = ref.val;

          res[key] = function mappedMutation() {
            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];

            var commit = this.$store.commit;
            if (namespace) {
              var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
              if (!module) {
                return
              }
              commit = module.context.commit;
            }
            return typeof val === 'function'
              ? val.apply(this, [commit].concat(args))
              : commit.apply(this.$store, [val].concat(args))
          };
        });
        return res
      });

      var mapGetters = normalizeNamespace(function (namespace, getters) {
        var res = {};
        normalizeMap(getters).forEach(function (ref) {
          var key = ref.key;
          var val = ref.val;

          val = namespace + val;
          res[key] = function mappedGetter() {
            if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
              return
            }
            if (true && !(val in this.$store.getters)) {
              console.error(("[vuex] unknown getter: " + val));
              return
            }
            return this.$store.getters[val]
          };
          // mark vuex getter for devtools
          res[key].vuex = true;
        });
        return res
      });

      var mapActions = normalizeNamespace(function (namespace, actions) {
        var res = {};
        normalizeMap(actions).forEach(function (ref) {
          var key = ref.key;
          var val = ref.val;

          res[key] = function mappedAction() {
            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];

            var dispatch = this.$store.dispatch;
            if (namespace) {
              var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
              if (!module) {
                return
              }
              dispatch = module.context.dispatch;
            }
            return typeof val === 'function'
              ? val.apply(this, [dispatch].concat(args))
              : dispatch.apply(this.$store, [val].concat(args))
          };
        });
        return res
      });

      var createNamespacedHelpers = function (namespace) {
        return ({
          mapState: mapState.bind(null, namespace),
          mapGetters: mapGetters.bind(null, namespace),
          mapMutations: mapMutations.bind(null, namespace),
          mapActions: mapActions.bind(null, namespace)
        });
      };

      function normalizeMap(map) {
        return Array.isArray(map)
          ? map.map(function (key) { return ({ key: key, val: key }); })
          : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
      }

      function normalizeNamespace(fn) {
        return function (namespace, map) {
          if (typeof namespace !== 'string') {
            map = namespace;
            namespace = '';
          } else if (namespace.charAt(namespace.length - 1) !== '/') {
            namespace += '/';
          }
          return fn(namespace, map)
        }
      }

      function getModuleByNamespace(store, helper, namespace) {
        var module = store._modulesNamespaceMap[namespace];
        if (true && !module) {
          console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
        }
        return module
      }

      var index_esm = {
        Store: Store,
        install: install,
        version: '3.0.1',
        mapState: mapState,
        mapMutations: mapMutations,
        mapGetters: mapGetters,
        mapActions: mapActions,
        createNamespacedHelpers: createNamespacedHelpers
      };


  /* harmony default export */ __webpack_exports__["default"] = (index_esm);


      /***/
    }),

  /***/ 820:
  /*!**************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/pages/travel/index/common.js ***!
    \**************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0; var _default = {
        /**
                                                                                                                            * 转换为秒数
                                                                                                                            * @param {Object} endTime 截止时间
                                                                                                                            */
        formatTime: function formatTime(endTime) {
          if (typeof endTime === 'number') return endTime;
          endTime = this.formatDate(endTime);
          if (this.isValidDate(new Date(endTime))) {
            var diffSecond = (new Date(endTime) - new Date()) / 1000;
            var diffHour = diffSecond / 60 / 60;
            if (diffHour <= 72 && diffHour > 0) {
              endTime = parseInt(diffSecond);
            } else {
              endTime = '';
            }
          } else {
            endTime = '';
          }
          return endTime;
        },
        /**
            * 判断日期是否合法
            * @param {Object} date 日期对象
            */
        isValidDate: function isValidDate(date) {
          return date instanceof Date && !isNaN(date.getTime());
        },
        /**
            * 格式化日期
            * @param {Object} dateTime
            */
        formatDate: function formatDate(dateTime) {
          return dateTime.replace(/\-/g, "/").replace(/T/g, " ");
        }
      }; exports.default = _default;

      /***/
    }),

  /***/ 9:
  /*!********************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/common/login-result.js ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function (uni) {/**
   * 登录验证
   */
        module.exports = function loginResultPromise() {
          var checkCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;

          var promise = new Promise(function (resolve, reject) {
            var result = uni.getStorageSync('token');
            // console.log("登陆result",result)
            if (result) {
              resolve(result);
            } else {
              reject();
            }
            false && false;

          });

          return promise.catch(function () {
            var count = 0;
            var p = new Promise(function (resolve, reject) {
              var times = setInterval(function () {
                var result = uni.getStorageSync('token');
                if (result) {
                  clearInterval(times);
                  resolve(result);
                }

                if (++count >= checkCount) {// 超过30s(300次)超时
                  clearInterval(times);
                  reject();
                }

                false && false;

              }, 50);
            });
            return p;
          });


          return Promise.resolve();
        };
        /* WEBPACK VAR INJECTION */
      }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

      /***/
    })

}]);
  //# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map

  
global.webpackJsonp = [
  [
    // 入口模块
    ["common/vendor"],
    // 用户模块
    {
      // 模块id 模块函数 module:模块对象 exports:模块对象指针 require：模块加载函数
      1: (function (module,exports,__webpack_require__) { })
    }
  ]
];