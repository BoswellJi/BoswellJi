(self.webpackChunkmalagu1=self.webpackChunkmalagu1||[]).push([[145],{6764:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RestOperationsFactory=t.RestOperations=void 0,t.RestOperations=Symbol("RestOperations"),t.RestOperationsFactory=Symbol("RestOperationsFactory")},325:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,o)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(6764),t),o(r(7170),t)},7170:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),t.DefaultRestOperationsFactory=void 0;const i=r(6764),s=r(9669),a=r(5218);let u=class DefaultRestOperationsFactory{create(){return s.default.create(this.clientConfig)}};n([(0,a.Value)("malagu.client.config"),o("design:type",Object)],u.prototype,"clientConfig",void 0),u=n([(0,a.Component)(i.RestOperationsFactory)],u),t.DefaultRestOperationsFactory=u},9379:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AOP_POINTCUT=t.CORS=t.SERVER_PATH=t.ENDPOINT=void 0,t.ENDPOINT="malagu.server.endpoint",t.SERVER_PATH="malagu.server.path",t.CORS="malagu.web.cors",t.AOP_POINTCUT="Endpoint"},5523:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,o)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(1981),t),o(r(5581),t)},5581:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),t.PathResolverImpl=void 0;const i=r(1981),s=r(5218),a=r(9379),u=r(748);let c=class PathResolverImpl{async resolve(...e){const[t,...r]=e.filter((e=>!!e));return t?u.UrlUtil.isAbsoluteUrl(t)||t.startsWith(this.serverPath)?s.UrlUtil.join(t,...r):s.UrlUtil.join(this.serverPath,t,...r):this.serverPath}};n([(0,s.Value)(a.SERVER_PATH),o("design:type",String)],c.prototype,"serverPath",void 0),c=n([(0,s.Component)(i.PathResolver)],c),t.PathResolverImpl=c},1981:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PathResolver=void 0,t.PathResolver=Symbol("PathResolver")},748:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,o)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(676),t)},676:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UrlUtil=void 0;const n=r(5218),o=r(9379),i=r(5523);!function(e){function isAbsoluteUrl(e){return!!e&&/^[a-z0-9.+-]+:\/\/.*/i.test(e)}e.isValidRedirectUrl=function isValidRedirectUrl(e){return e&&(e.startsWith("/")||isAbsoluteUrl(e))},e.isAbsoluteUrl=isAbsoluteUrl,e.getUrl=async function getUrl(...e){const t=n.ConfigUtil.get(o.ENDPOINT),r=n.ContainerUtil.get(i.PathResolver);return r.resolve(t,await r.resolve(...e))},e.getPath=async function getPath(...e){return n.ContainerUtil.get(i.PathResolver).resolve(...e)}}(t.UrlUtil||(t.UrlUtil={}))},9669:(e,t,r)=>{e.exports=r(1609)},5448:(e,t,r)=>{"use strict";var n=r(4867),o=r(6026),i=r(4372),s=r(5327),a=r(4097),u=r(4109),c=r(7985),f=r(5061),l=r(7874),d=r(5263);e.exports=function xhrAdapter(e){return new Promise((function dispatchXhrRequest(t,r){var p,h=e.data,g=e.headers,m=e.responseType;function done(){e.cancelToken&&e.cancelToken.unsubscribe(p),e.signal&&e.signal.removeEventListener("abort",p)}n.isFormData(h)&&delete g["Content-Type"];var v=new XMLHttpRequest;if(e.auth){var y=e.auth.username||"",b=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";g.Authorization="Basic "+btoa(y+":"+b)}var O=a(e.baseURL,e.url);function onloadend(){if(v){var n="getAllResponseHeaders"in v?u(v.getAllResponseHeaders()):null,i={data:m&&"text"!==m&&"json"!==m?v.response:v.responseText,status:v.status,statusText:v.statusText,headers:n,config:e,request:v};o((function _resolve(e){t(e),done()}),(function _reject(e){r(e),done()}),i),v=null}}if(v.open(e.method.toUpperCase(),s(O,e.params,e.paramsSerializer),!0),v.timeout=e.timeout,"onloadend"in v?v.onloadend=onloadend:v.onreadystatechange=function handleLoad(){v&&4===v.readyState&&(0!==v.status||v.responseURL&&0===v.responseURL.indexOf("file:"))&&setTimeout(onloadend)},v.onabort=function handleAbort(){v&&(r(f("Request aborted",e,"ECONNABORTED",v)),v=null)},v.onerror=function handleError(){r(f("Network Error",e,null,v)),v=null},v.ontimeout=function handleTimeout(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",n=e.transitional||l;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(f(t,e,n.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",v)),v=null},n.isStandardBrowserEnv()){var w=(e.withCredentials||c(O))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;w&&(g[e.xsrfHeaderName]=w)}"setRequestHeader"in v&&n.forEach(g,(function setRequestHeader(e,t){void 0===h&&"content-type"===t.toLowerCase()?delete g[t]:v.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(v.withCredentials=!!e.withCredentials),m&&"json"!==m&&(v.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&v.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&v.upload&&v.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(p=function(e){v&&(r(!e||e&&e.type?new d("canceled"):e),v.abort(),v=null)},e.cancelToken&&e.cancelToken.subscribe(p),e.signal&&(e.signal.aborted?p():e.signal.addEventListener("abort",p))),h||(h=null),v.send(h)}))}},1609:(e,t,r)=>{"use strict";var n=r(4867),o=r(1849),i=r(321),s=r(7185);var a=function createInstance(e){var t=new i(e),r=o(i.prototype.request,t);return n.extend(r,i.prototype,t),n.extend(r,t),r.create=function create(t){return createInstance(s(e,t))},r}(r(5546));a.Axios=i,a.Cancel=r(5263),a.CancelToken=r(4972),a.isCancel=r(6502),a.VERSION=r(7288).version,a.all=function all(e){return Promise.all(e)},a.spread=r(8713),a.isAxiosError=r(6268),e.exports=a,e.exports.default=a},5263:e=>{"use strict";function Cancel(e){this.message=e}Cancel.prototype.toString=function toString(){return"Cancel"+(this.message?": "+this.message:"")},Cancel.prototype.__CANCEL__=!0,e.exports=Cancel},4972:(e,t,r)=>{"use strict";var n=r(5263);function CancelToken(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function promiseExecutor(e){t=e}));var r=this;this.promise.then((function(e){if(r._listeners){var t,n=r._listeners.length;for(t=0;t<n;t++)r._listeners[t](e);r._listeners=null}})),this.promise.then=function(e){var t,n=new Promise((function(e){r.subscribe(e),t=e})).then(e);return n.cancel=function reject(){r.unsubscribe(t)},n},e((function cancel(e){r.reason||(r.reason=new n(e),t(r.reason))}))}CancelToken.prototype.throwIfRequested=function throwIfRequested(){if(this.reason)throw this.reason},CancelToken.prototype.subscribe=function subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},CancelToken.prototype.unsubscribe=function unsubscribe(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},CancelToken.source=function source(){var e;return{token:new CancelToken((function executor(t){e=t})),cancel:e}},e.exports=CancelToken},6502:e=>{"use strict";e.exports=function isCancel(e){return!(!e||!e.__CANCEL__)}},321:(e,t,r)=>{"use strict";var n=r(4867),o=r(5327),i=r(782),s=r(3572),a=r(7185),u=r(4875),c=u.validators;function Axios(e){this.defaults=e,this.interceptors={request:new i,response:new i}}Axios.prototype.request=function request(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},(t=a(this.defaults,t)).method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var r=t.transitional;void 0!==r&&u.assertOptions(r,{silentJSONParsing:c.transitional(c.boolean),forcedJSONParsing:c.transitional(c.boolean),clarifyTimeoutError:c.transitional(c.boolean)},!1);var n=[],o=!0;this.interceptors.request.forEach((function unshiftRequestInterceptors(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(o=o&&e.synchronous,n.unshift(e.fulfilled,e.rejected))}));var i,f=[];if(this.interceptors.response.forEach((function pushResponseInterceptors(e){f.push(e.fulfilled,e.rejected)})),!o){var l=[s,void 0];for(Array.prototype.unshift.apply(l,n),l=l.concat(f),i=Promise.resolve(t);l.length;)i=i.then(l.shift(),l.shift());return i}for(var d=t;n.length;){var p=n.shift(),h=n.shift();try{d=p(d)}catch(e){h(e);break}}try{i=s(d)}catch(e){return Promise.reject(e)}for(;f.length;)i=i.then(f.shift(),f.shift());return i},Axios.prototype.getUri=function getUri(e){return e=a(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function forEachMethodNoData(e){Axios.prototype[e]=function(t,r){return this.request(a(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function forEachMethodWithData(e){Axios.prototype[e]=function(t,r,n){return this.request(a(n||{},{method:e,url:t,data:r}))}})),e.exports=Axios},782:(e,t,r)=>{"use strict";var n=r(4867);function InterceptorManager(){this.handlers=[]}InterceptorManager.prototype.use=function use(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},InterceptorManager.prototype.eject=function eject(e){this.handlers[e]&&(this.handlers[e]=null)},InterceptorManager.prototype.forEach=function forEach(e){n.forEach(this.handlers,(function forEachHandler(t){null!==t&&e(t)}))},e.exports=InterceptorManager},4097:(e,t,r)=>{"use strict";var n=r(1793),o=r(7303);e.exports=function buildFullPath(e,t){return e&&!n(t)?o(e,t):t}},5061:(e,t,r)=>{"use strict";var n=r(481);e.exports=function createError(e,t,r,o,i){var s=new Error(e);return n(s,t,r,o,i)}},3572:(e,t,r)=>{"use strict";var n=r(4867),o=r(8527),i=r(6502),s=r(5546),a=r(5263);function throwIfCancellationRequested(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new a("canceled")}e.exports=function dispatchRequest(e){return throwIfCancellationRequested(e),e.headers=e.headers||{},e.data=o.call(e,e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function cleanHeaderConfig(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function onAdapterResolution(t){return throwIfCancellationRequested(e),t.data=o.call(e,t.data,t.headers,e.transformResponse),t}),(function onAdapterRejection(t){return i(t)||(throwIfCancellationRequested(e),t&&t.response&&(t.response.data=o.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function enhanceError(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e}},7185:(e,t,r)=>{"use strict";var n=r(4867);e.exports=function mergeConfig(e,t){t=t||{};var r={};function getMergedValue(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function mergeDeepProperties(r){return n.isUndefined(t[r])?n.isUndefined(e[r])?void 0:getMergedValue(void 0,e[r]):getMergedValue(e[r],t[r])}function valueFromConfig2(e){if(!n.isUndefined(t[e]))return getMergedValue(void 0,t[e])}function defaultToConfig2(r){return n.isUndefined(t[r])?n.isUndefined(e[r])?void 0:getMergedValue(void 0,e[r]):getMergedValue(void 0,t[r])}function mergeDirectKeys(r){return r in t?getMergedValue(e[r],t[r]):r in e?getMergedValue(void 0,e[r]):void 0}var o={url:valueFromConfig2,method:valueFromConfig2,data:valueFromConfig2,baseURL:defaultToConfig2,transformRequest:defaultToConfig2,transformResponse:defaultToConfig2,paramsSerializer:defaultToConfig2,timeout:defaultToConfig2,timeoutMessage:defaultToConfig2,withCredentials:defaultToConfig2,adapter:defaultToConfig2,responseType:defaultToConfig2,xsrfCookieName:defaultToConfig2,xsrfHeaderName:defaultToConfig2,onUploadProgress:defaultToConfig2,onDownloadProgress:defaultToConfig2,decompress:defaultToConfig2,maxContentLength:defaultToConfig2,maxBodyLength:defaultToConfig2,transport:defaultToConfig2,httpAgent:defaultToConfig2,httpsAgent:defaultToConfig2,cancelToken:defaultToConfig2,socketPath:defaultToConfig2,responseEncoding:defaultToConfig2,validateStatus:mergeDirectKeys};return n.forEach(Object.keys(e).concat(Object.keys(t)),(function computeConfigValue(e){var t=o[e]||mergeDeepProperties,i=t(e);n.isUndefined(i)&&t!==mergeDirectKeys||(r[e]=i)})),r}},6026:(e,t,r)=>{"use strict";var n=r(5061);e.exports=function settle(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},8527:(e,t,r)=>{"use strict";var n=r(4867),o=r(5546);e.exports=function transformData(e,t,r){var i=this||o;return n.forEach(r,(function transform(r){e=r.call(i,e,t)})),e}},5546:(e,t,r)=>{"use strict";var n=r(8369),o=r(4867),i=r(6016),s=r(481),a=r(7874),u={"Content-Type":"application/x-www-form-urlencoded"};function setContentTypeIfUnset(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var c={transitional:a,adapter:function getDefaultAdapter(){var e;return("undefined"!=typeof XMLHttpRequest||void 0!==n&&"[object process]"===Object.prototype.toString.call(n))&&(e=r(5448)),e}(),transformRequest:[function transformRequest(e,t){return i(t,"Accept"),i(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(setContentTypeIfUnset(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)||t&&"application/json"===t["Content-Type"]?(setContentTypeIfUnset(t,"application/json"),function stringifySafely(e,t,r){if(o.isString(e))try{return(t||JSON.parse)(e),o.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(r||JSON.stringify)(e)}(e)):e}],transformResponse:[function transformResponse(e){var t=this.transitional||c.transitional,r=t&&t.silentJSONParsing,n=t&&t.forcedJSONParsing,i=!r&&"json"===this.responseType;if(i||n&&o.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(i){if("SyntaxError"===e.name)throw s(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function validateStatus(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};o.forEach(["delete","get","head"],(function forEachMethodNoData(e){c.headers[e]={}})),o.forEach(["post","put","patch"],(function forEachMethodWithData(e){c.headers[e]=o.merge(u)})),e.exports=c},7874:e=>{"use strict";e.exports={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1}},7288:e=>{e.exports={version:"0.26.1"}},1849:e=>{"use strict";e.exports=function bind(e,t){return function wrap(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},5327:(e,t,r)=>{"use strict";var n=r(4867);function encode(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function buildURL(e,t,r){if(!t)return e;var o;if(r)o=r(t);else if(n.isURLSearchParams(t))o=t.toString();else{var i=[];n.forEach(t,(function serialize(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function parseValue(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(encode(t)+"="+encode(e))})))})),o=i.join("&")}if(o){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},7303:e=>{"use strict";e.exports=function combineURLs(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},4372:(e,t,r)=>{"use strict";var n=r(4867);e.exports=n.isStandardBrowserEnv()?function standardBrowserEnv(){return{write:function write(e,t,r,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(o)&&a.push("path="+o),n.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function read(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function remove(e){this.write(e,"",Date.now()-864e5)}}}():{write:function write(){},read:function read(){return null},remove:function remove(){}}},1793:e=>{"use strict";e.exports=function isAbsoluteURL(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}},6268:(e,t,r)=>{"use strict";var n=r(4867);e.exports=function isAxiosError(e){return n.isObject(e)&&!0===e.isAxiosError}},7985:(e,t,r)=>{"use strict";var n=r(4867);e.exports=n.isStandardBrowserEnv()?function standardBrowserEnv(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function resolveURL(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=resolveURL(window.location.href),function isURLSameOrigin(t){var r=n.isString(t)?resolveURL(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function isURLSameOrigin(){return!0}},6016:(e,t,r)=>{"use strict";var n=r(4867);e.exports=function normalizeHeaderName(e,t){n.forEach(e,(function processHeader(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},4109:(e,t,r)=>{"use strict";var n=r(4867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function parseHeaders(e){var t,r,i,s={};return e?(n.forEach(e.split("\n"),(function parser(e){if(i=e.indexOf(":"),t=n.trim(e.substr(0,i)).toLowerCase(),r=n.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([r]):s[t]?s[t]+", "+r:r}})),s):s}},8713:e=>{"use strict";e.exports=function spread(e){return function wrap(t){return e.apply(null,t)}}},4875:(e,t,r)=>{"use strict";var n=r(7304),o=r(7288).version,i={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){i[e]=function validator(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));var s={};i.transitional=function transitional(e,t,r){function formatMessage(e,t){return"[Axios v"+o+"] Transitional option '"+e+"'"+t+(r?". "+r:"")}return function(r,o,i){if(!1===e)throw new Error(formatMessage(o," has been removed"+(t?" in "+t:"")));return t&&!s[o]&&(s[o]=!0,n.warn(formatMessage(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,o,i)}},e.exports={assertOptions:function assertOptions(e,t,r){if("object"!=typeof e)throw new TypeError("options must be an object");for(var n=Object.keys(e),o=n.length;o-- >0;){var i=n[o],s=t[i];if(s){var a=e[i],u=void 0===a||s(a,i,e);if(!0!==u)throw new TypeError("option "+i+" must be "+u)}else if(!0!==r)throw Error("Unknown option "+i)}},validators:i}},4867:(e,t,r)=>{"use strict";var n=r(1849),o=Object.prototype.toString;function isArray(e){return Array.isArray(e)}function isUndefined(e){return void 0===e}function isArrayBuffer(e){return"[object ArrayBuffer]"===o.call(e)}function isObject(e){return null!==e&&"object"==typeof e}function isPlainObject(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function isFunction(e){return"[object Function]"===o.call(e)}function forEach(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),isArray(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray,isArrayBuffer,isBuffer:function isBuffer(e){return null!==e&&!isUndefined(e)&&null!==e.constructor&&!isUndefined(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function isFormData(e){return"[object FormData]"===o.call(e)},isArrayBufferView:function isArrayBufferView(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&isArrayBuffer(e.buffer)},isString:function isString(e){return"string"==typeof e},isNumber:function isNumber(e){return"number"==typeof e},isObject,isPlainObject,isUndefined,isDate:function isDate(e){return"[object Date]"===o.call(e)},isFile:function isFile(e){return"[object File]"===o.call(e)},isBlob:function isBlob(e){return"[object Blob]"===o.call(e)},isFunction,isStream:function isStream(e){return isObject(e)&&isFunction(e.pipe)},isURLSearchParams:function isURLSearchParams(e){return"[object URLSearchParams]"===o.call(e)},isStandardBrowserEnv:function isStandardBrowserEnv(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach,merge:function merge(){var e={};function assignValue(t,r){isPlainObject(e[r])&&isPlainObject(t)?e[r]=merge(e[r],t):isPlainObject(t)?e[r]=merge({},t):isArray(t)?e[r]=t.slice():e[r]=t}for(var t=0,r=arguments.length;t<r;t++)forEach(arguments[t],assignValue);return e},extend:function extend(e,t,r){return forEach(t,(function assignValue(t,o){e[o]=r&&"function"==typeof t?n(t,r):t})),e},trim:function trim(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function stripBOM(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}}}]);