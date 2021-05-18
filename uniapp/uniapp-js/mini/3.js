(function() {
  const timing = window.__global.timing;
  const loadStartTs = Date.now();
  timing.addPoint("MAIN_PACKAGE_LOAD_START", loadStartTs);
  const links = [
    "http://127.0.0.1:32266/appservice/common/runtime.js?t=wechat&s=1621215012038&v=1fe31eff3f82763b152dee42571d886a",
    "http://127.0.0.1:32266/appservice/@babel/runtime/helpers/interopRequireDefault.js",
    "http://127.0.0.1:32266/appservice/@babel/runtime/helpers/typeof.js",
    "http://127.0.0.1:32266/appservice/common/vendor.js?t=wechat&s=1621215012038&v=2bc6be64cefb9c11ce755529076b9a2d",
    "http://127.0.0.1:32266/appservice/components/cc-back-top/index.js?t=wechat&s=1621215012038&v=ec2994c95e057a2eb21745f81b04c29f",
    "http://127.0.0.1:32266/appservice/components/cc-phone-bind-popup/index.js?t=wechat&s=1621215012038&v=b6320b2871bbec2d5a5594b0ac861463",
    "http://127.0.0.1:32266/appservice/components/cc-simple-action-modal/cc-simple-action-modal.js?t=wechat&s=1621215012038&v=474ba5142ec3da93d56c51ffd8a9600d",
    "http://127.0.0.1:32266/appservice/components/cc-simple-alert-modal/index.js?t=wechat&s=1621215012038&v=a6e686ea90664cf49a1a2f3ca17a6d98",
    "http://127.0.0.1:32266/appservice/components/tab-bar/index.js?t=wechat&s=1621215012038&v=589fc491603db762125e12cbfc6916ea",
    "http://127.0.0.1:32266/appservice/components/tab-control-tag/index.js?t=wechat&s=1621215012038&v=bf5e8e616caf7e6bce36c5ded56e23e0",
    "http://127.0.0.1:32266/appservice/components/wifi-error/index.js?t=wechat&s=1621215012038&v=2ba09e8411b628647f7cf67168b912fd",
    "http://127.0.0.1:32266/appservice/pages/index/index.js?t=wechat&s=1621215012038&v=c6e353c071475b623782b6a97c873a9f",
    "http://127.0.0.1:32266/appservice/pages/index/cc-discount-league/cc-filter.js?t=wechat&s=1621215012038&v=817d6835f5fb0c8730a8f5650859c5c4",
    "http://127.0.0.1:32266/appservice/pages/index/cc-discount-league/index.js?t=wechat&s=1621215012038&v=285f70446b532f558ccadb3c12acc67f",
    "http://127.0.0.1:32266/appservice/pages/index/cc-get-phone-number/index.js?t=wechat&s=1621215012038&v=98fb52d7199c27a646330756f2d1fb59",
    "http://127.0.0.1:32266/appservice/pages/index/child-index-icon-group/index.js?t=wechat&s=1621215012038&v=e4bca1432ba222d195182d584653c065",
    "http://127.0.0.1:32266/appservice/pages/mine/index/index.js?t=wechat&s=1621215012038&v=446a53c226a339a3ae60d3d3dad86ca2",
    "http://127.0.0.1:32266/appservice/pages/webview/webview.js?t=wechat&s=1621215012038&v=7cecf1072af2e84f55d1e1fc15b13d50",
    "http://127.0.0.1:32266/appservice/app.js?t=wechat&s=1621215012038&v=2541b7e4277f01fddb83e6afc1119da3",
    "http://127.0.0.1:32266/appservice/common/main.js?t=wechat&s=1621215012038&v=f93facd70de0cd429d4ca1a9f6f5f736",
  ];
  const ignoreds = {};
  let scriptCounter = links.length;
  let babelLock = false;
  window.addEventListener(
    "__babel_module_loading",
    () => {
      // 当前分包下有依赖helper函数，需要等待加载完才能初始化脚本
      babelLock = true;
    },
    false
  );
  window.addEventListener(
    "__babel_module_loaded",
    () => {
      babelLock = false;
      doWhenAllScriptLoaded();
    },
    false
  );

  const doWhenAllScriptLoaded = () => {
    if (__global.asSubLoader && __global.asSubLoader.loadingBabel) {
      return;
    }
    if (!babelLock && scriptCounter <= 0) {
      // 分包加载完
      timing.addCost("MAIN_PACKAGE_LOAD", loadStartTs, Date.now(), {
        packageName: `__APP__`,
      });
      timing.addPoint("USERCODE_LOADED", Date.now());

      const requireStartTs = Date.now();
      const innerScript = document.createElement("script");
      innerScript.text = `
    try {
      require("app.js")
    } catch (error) {
      !error.from && console.error('app.js错误:\\n',error)
      throw error
    };var decodePathName = decodeURI("components/cc-back-top/index")
__wxAppCode__[decodePathName + ".json"]={"component":true,"usingComponents":{"tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"}}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("components/cc-phone-bind-popup/index")
__wxAppCode__[decodePathName + ".json"]={"component":true,"usingComponents":{"tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"}}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("components/cc-simple-action-modal/cc-simple-action-modal")
__wxAppCode__[decodePathName + ".json"]={"component":true,"usingComponents":{"tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"}}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("components/cc-simple-alert-modal/index")
__wxAppCode__[decodePathName + ".json"]={"component":true,"usingComponents":{"tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"}}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("components/tab-bar/index")
__wxAppCode__[decodePathName + ".json"]={"component":true,"usingComponents":{"tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"}}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("components/tab-control-tag/index")
__wxAppCode__[decodePathName + ".json"]={"usingComponents":{"tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"},"component":true}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("components/wifi-error/index")
__wxAppCode__[decodePathName + ".json"]={"usingComponents":{"tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"},"component":true}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("pages/index/index")
__wxAppCode__[decodePathName + ".json"]={"navigationStyle":"custom","navigationBarTextStyle":"white","enablePullDownRefresh":true,"navigationBarFit":"squeezed","usingComponents":{"discount-league":"/pages/index/cc-discount-league/index","cc-get-phone-number":"/pages/index/cc-get-phone-number/index","cc-back-top":"/components/cc-back-top/index","tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"},"__warning__":"无效的 page.json [\\"navigationBarFit\\"]"}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("pages/index/cc-discount-league/cc-filter")
__wxAppCode__[decodePathName + ".json"]={"component":true,"usingComponents":{"tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"}}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("pages/index/cc-discount-league/index")
__wxAppCode__[decodePathName + ".json"]={"component":true,"usingComponents":{"cc-filter":"/pages/index/cc-discount-league/cc-filter","tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"}}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("pages/index/cc-get-phone-number/index")
__wxAppCode__[decodePathName + ".json"]={"component":true,"usingComponents":{"tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"}}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("pages/index/child-index-icon-group/index")
__wxAppCode__[decodePathName + ".json"]={"usingComponents":{"tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"},"component":true}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("pages/mine/index/index")
__wxAppCode__[decodePathName + ".json"]={"navigationBarTitleText":"我的","navigationBarBackgroundColor":"#2aae67","navigationBarTextStyle":"white","enablePullDownRefresh":true,"usingComponents":{"cc-simple-alert-modal":"/components/cc-simple-alert-modal/index","tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"}}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml")
var decodePathName = decodeURI("pages/webview/webview")
__wxAppCode__[decodePathName + ".json"]={"usingComponents":{"wifi-error":"/components/wifi-error/index","tab-bar":"/components/tab-bar/index","cc-phone-bind-popup":"/components/cc-phone-bind-popup/index"}}
__wxAppCode__[decodePathName + ".wxml"]=\$gwx("./" + decodePathName + ".wxml");
      var decodePathName = decodeURI("components/cc-back-top/index")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("components/cc-phone-bind-popup/index")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("components/cc-simple-action-modal/cc-simple-action-modal")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("components/cc-simple-alert-modal/index")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("components/tab-bar/index")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("components/tab-control-tag/index")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("components/wifi-error/index")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("pages/index/index")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("pages/index/cc-discount-league/cc-filter")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("pages/index/cc-discount-league/index")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("pages/index/cc-get-phone-number/index")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("pages/index/child-index-icon-group/index")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("pages/mine/index/index")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    ;
      var decodePathName = decodeURI("pages/webview/webview")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      try {
        require(__wxAppCurrentFile__)
      } catch (error) {
        // 插件项目不能hack define和require，走这里，异常只能精准到页面，内部的多层依赖的报错无法精准
        !error.from && console.error('页面【' + decodePathName + ']错误:\\n',error)
        throw error
      }
    `;
      document.head.appendChild(innerScript);
      timing.addCost("MAIN_PACKAGE_REQUIRE", requireStartTs, Date.now(), {
        packageName: `__APP__`,
      });
      timing.addPoint("USERCODE_REQUIRED", Date.now());

      const readyMsg = "SUBPACKAGE_READY___APP__";
      if (location.href.includes("instanceframe")) {
        __global.alert(readyMsg);
      } else {
        const __alert =
          window.alert || (window.__global && window.__global.alert);
        __alert(readyMsg);
      }
    }
  };

  const scriptLoaded = function() {
    if (this.__loaded) {
      return;
    }
    this.__loaded = true;
    scriptCounter--;
    doWhenAllScriptLoaded();
  };

  if (!__global.asSubLoader) {
    for (const link of links) {
      const script = document.createElement("script");
      const ignoreText = ignoreds[link];
      script.src = link;
      script.onload = function() {
        scriptLoaded.apply(this, arguments);
        if (ignoreText) {
          const s = document.createElement("script");
          s.text = ignoreText;
          document.head.appendChild(s);
        }
      };
      script.onerror = scriptLoaded.bind(script);
      document.head.appendChild(script);
    }
  } else {
    for (const link of links) {
      const script = {};
      const ignoreText = ignoreds[link];

      const onload = function() {
        scriptLoaded.apply(this, arguments);
        if (ignoreText) {
          const s = document.createElement("script");
          s.text = ignoreText;
          document.head.appendChild(s);
        }
      }.bind(script);

      // __global.asSubLoader.loadAppResourceScripts([{
      //   src: link,
      // }]).then(onload)
      // continue

      const info = __global.asSubLoader.appResourceScriptList[script.src];
      if (info) {
        if (info.status === "loading") {
          info.onLoad.then(onload).catch(scriptLoaded.bind(script));
        } else if (info.status === "loaded") {
          onload();
        } else {
          // error
          scriptLoaded.bind(script)();
        }
      } else {
        __global.asSubLoader
          .loadAppResourceScripts([
            {
              src: link,
            },
          ])
          .then(onload);
      }
    }
  }
})();
