!(function(e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var r = (t[o] = {
      i: o,
      l: !1,
      exports: {},
    });
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, o) {
      n.o(e, t) ||
        Object.defineProperty(e, t, {
          enumerable: !0,
          get: o,
        });
    }),
    (n.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module",
        }),
        Object.defineProperty(e, "__esModule", {
          value: !0,
        });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (n.r(o),
        Object.defineProperty(o, "default", {
          enumerable: !0,
          value: e,
        }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            o,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
          );
      return o;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 49));
})([
  function(e, t) {
    const n = window.navigator || window.__global.navigator,
      o = window.WebSocket || window.__global.WebSocket,
      r = window.prompt || window.__global.prompt,
      s = n.userAgent.match(/port\/(\d*)/),
      a = s ? parseInt(s[1]) : 9974,
      i = "ws://127.0.0.1:" + a;
    e.exports = class {
      constructor(e, t = !0) {
        (this._protocol = e),
          (this._needToken = t),
          (this._ws = null),
          (this._msgQueue = []),
          (this._callback = new Set()),
          (this._parseJson = null),
          (this.tryTime = 0),
          "complete" == document.readyState
            ? setTimeout(() => {
                this.connect();
              })
            : window.addEventListener("load", () => {
                this.connect();
              });
      }
      connect() {
        if (!a) return;
        if (this.tryTime++ >= 10) return;
        let e = this._protocol;
        if (this._needToken) {
          e = `${e}#${r("GET_MESSAGE_TOKEN")}#`;
        }
        (this._ws = new o(i, e)),
          (this._ws.onopen = (e) => {
            const t = [].concat(this._msgQueue);
            (this._msgQueue = []),
              t.forEach((e) => {
                this.send(e);
              });
          }),
          (this._ws.onclose = (e) => {
            (this._ws = null),
              setTimeout(() => {
                this.tryTime < 10 && (this.tryTime++, this.connect());
              }, 150);
          }),
          (this._ws.onmessage = (e) => {
            try {
              const t = this._parseJson
                ? this._parseJson(e.data)
                : JSON.parse(e.data);
              this._callback.forEach((e) => {
                try {
                  e.call(this, t);
                } catch (e) {}
              });
            } catch (e) {}
          });
      }
      send(e) {
        this._ws && this._ws.readyState === o.OPEN
          ? this._ws.send(JSON.stringify(e))
          : this._msgQueue.push(e);
      }
      registerCallback(e) {
        "function" == typeof e && this._callback.add(e);
      }
      removeCallback(e) {
        this._callback.delete(e);
      }
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    const o = n(2),
      r = o.navigator.userAgent,
      s = n(0);
    let a,
      i = !1,
      c = !1;
    const l = () => {
        if (a) return a;
        let e = "APPSERVICE";
        return (
          /widgetservice/.test(r)
            ? (e = "WIDGETSERVICE")
            : /gameservice/.test(r)
            ? (e = "GAMESERVICE")
            : /ibservice/.test(r) && (e = "IBSERVICE"),
          (a = new s(e)),
          /gameservice/.test(r) &&
            a.registerCallback((e) => {
              const { command: t, data: n } = e;
              if ("SET_CANVAS" === t) {
                const e = o.document.getElementById("myCanvas");
                e.setAttribute("width", n.width),
                  e.setAttribute("height", n.height),
                  e.setAttribute("style", n.style);
              }
            }),
          a
        );
      },
      u = new Set();
    let d = [];
    const f = (e) => {
        u.forEach((t) => {
          try {
            t(e);
          } catch (e) {}
        });
      },
      g = (e) => {
        if (c) f(e);
        else {
          const { command: t } = e;
          switch (t) {
            case "APPSERVICE_INVOKE_EMITTER":
            case "APPSERVICE_ON_EVENT":
            case "WEBVIEW_PUBLISH":
              d.push(e);
              break;
            default:
              f(e);
          }
        }
      };
    function p(e) {
      l().send(e);
    }
    (t.send = p),
      (t.registerCallback = function(e) {
        if ((u.add(e), !i)) {
          l().registerCallback(g), (i = !0);
        }
      }),
      (t.removeCallback = function(e) {
        if ((u.delete(e), !i)) {
          l().registerCallback(g), (i = !0);
        }
      }),
      (t.setAppserviceReady = function(e, t) {
        if (c === e) return;
        (c = e), (l()._parseJson = t), e && (d.forEach((e) => f(e)), (d = []));
      }),
      (window.__global.messager = {
        send: p,
      });
  },
  function(e, t, n) {
    "use strict";
    e.exports = window.__global;
  },
  ,
  function(e, t, n) {
    "use strict";
    const o = n(8);
    class r extends o.EventEmitter {
      constructor() {
        super(),
          (this.instanceScopeListeners = new Set()),
          (this.instanceScope = () => ({
            on: (e, t) => (
              this.on(e, t),
              this.instanceScopeListeners.add({
                event: e,
                fn: t,
              }),
              this
            ),
            once: (e, t) => (
              this.once(e, t),
              this.instanceScopeListeners.add({
                event: e,
                fn: t,
              }),
              this
            ),
            off: this.off.bind(this),
          })),
          this.initAutoClean();
      }
      initAutoClean() {
        this.on("RESET_INSTANCE", () => {
          for (const { event: e, fn: t } of this.instanceScopeListeners)
            this.off(e, t);
          this.instanceScopeListeners.clear();
        });
      }
    }
    e.exports = new r();
  },
  function(e, t, n) {
    "use strict";
    const o = n(19),
      r = n(6),
      s = n(2);
    let a = !1,
      i = [];
    window.showDebugInfo = (e, t) => {
      const n = i.filter((n) => {
        const o = !e || (Array.isArray(e) ? e.includes(n.type) : n.type === e),
          r =
            !t ||
            (Array.isArray(t) ? t.includes(n.eventName) : n.eventName === t);
        if (o && r) return n;
      });
      console.group("showDebugInfo"),
        n.forEach((e) => {
          console.group(
            `${e.timesmap} WeixinJSBridge ${e.type} ${e.eventName}`
          ),
            console.debug.apply(window, e.data),
            console.groupEnd();
        }),
        console.groupEnd(),
        (a = !0);
    };
    const c = () => (console.clear(), void (a = !1));
    Object.defineProperty(window, "closeDebug", {
      get: () => c,
    });
    const l = () => {
      console.table(i);
    };
    Object.defineProperty(window, "showDebugInfoTable", {
      get: () => l,
    });
    function u(e) {
      const t = s.atob(e),
        n = t.length,
        o = new Uint8Array(n);
      for (let e = 0; e < n; e++) o[e] = t.charCodeAt(e);
      return o.buffer;
    }
    function d(e, t = "`") {
      return e
        ? "`" === t
          ? e
              .replace(/\\/g, "\\\\")
              .replace(/`/g, "\\`")
              .replace(/\$/g, "\\$")
          : '"' === t
          ? e
              .replace(/\\/g, "\\\\")
              .replace(/\r\n/g, "\n")
              .replace(/\n/g, "\\n")
              .replace(/"/g, '\\"')
          : "'" === t
          ? e
              .replace(/\\/g, "\\\\")
              .replace(/\r\n/g, "\n")
              .replace(/\n/g, "\\n")
              .replace(/'/g, "\\'")
          : e
        : e;
    }
    const f = (e) => {
        const t = /^(?:http|ws)s?:\/\/((?:\d{1,3}\.){3}\d{1,3})(?::\d{1,5})?/i.exec(
          e
        );
        if (t) {
          const { localhostIp: e, networkMask: n } = r.DevtoolsConfig;
          if (!e || !n) return !1;
          const o = t[1];
          return (
            e
              .split(".")
              .map((e, t) => e & n[t])
              .join(".") ===
            o
              .split(".")
              .map((e, t) => e & n[t])
              .join(".")
          );
        }
        return !1;
      },
      g = /^(http|ws|udp)s?:\/\/[\w-.]+(:\d+)?/i;
    let p = !0;
    window.__disPlayURLCheckWarning = !0;
    const m = (e) => {
      const t = /^(?:http|ws)s?:\/\/((?:\d{1,3}\.){3}\d{1,3})(?::\d{1,5})?/i.exec(
        e
      );
      if (t) {
        return t[1] === r.DevtoolsConfig.localhostIp;
      }
      return !1;
    };
    e.exports = {
      debugLog: (e, t) => {
        a &&
          (console.group(e), console.debug.apply(null, t), console.groupEnd());
      },
      debugInfo: (e) => {
        a || (i.length > 100 && (i = []), i.push(e));
      },
      isDev: () => a,
      base64ToArrayBuffer: u,
      arrayBufferToBase64: function(e) {
        let t = "";
        const n = new Uint8Array(e),
          o = n.byteLength;
        for (let e = 0; e < o; e++) t += String.fromCharCode(n[e]);
        return s.btoa(t);
      },
      escapeQuot: d,
      isKindOfArrayBuffer: function(e) {
        if (!e) return !1;
        if (e instanceof ArrayBuffer) return !0;
        try {
          const t = Object.getPrototypeOf(e);
          return !(
            !t.hasOwnProperty("byteLength") ||
            "[object ArrayBuffer]" !== Object.prototype.toString.call(t)
          );
        } catch (e) {
          return !1;
        }
      },
      isKindOfArray: function(e) {
        if (!e) return !1;
        if (e instanceof Array) return !0;
        if (Array.isArray(e)) return !0;
        try {
          const t = e.length;
          if ("number" != typeof t) return !1;
          for (let n = 0; n < t; n++) if (!(n in e)) return !1;
          return !0;
        } catch (e) {
          return !1;
        }
      },
      checkUrl: (e, t = "request") => {
        if (o.isTourist())
          return (
            p &&
              (console.group(new Date() + " 无 AppID 关联"),
              console.warn(
                "工具未检查合法域名，更多请参考文档：https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html"
              ),
              console.groupEnd(),
              (p = !1)),
            !0
          );
        if (!r.DevtoolsConfig.urlCheck)
          return (
            window.__disPlayURLCheckWarning &&
              (console.group(
                new Date() +
                  " 配置中关闭合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书检查"
              ),
              console.warn(
                "工具未校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书。"
              ),
              console.groupEnd(),
              (window.__disPlayURLCheckWarning = !1)),
            !0
          );
        if (!e) return !1;
        if (/(\?|&)skip_domain_check=true(&|$)/.test(e)) return !0;
        if (
          ["request", "downloadFile", "uploadFile", "socket", "udp"].includes(t)
        ) {
          if (m(e))
            return (
              setTimeout(() => {
                console.error("Cannot send network request to localhost.");
              }),
              !1
            );
          if (f(e)) return !0;
        }
        if (!(e = g.exec(e.toLowerCase()))) return !1;
        e = e[0];
        if (/^http:\/\/(tmp|usr|store)\/?$/gi.test(e)) return !0;
        try {
          let n = [];
          n =
            "downloadFile" === t
              ? r.NetworkConfig.download
              : "uploadFile" === t
              ? r.NetworkConfig.upload
              : "socket" === t
              ? r.NetworkConfig.socket
              : "udp" === t
              ? r.NetworkConfig.udp
              : r.NetworkConfig.request;
          for (const o of n) {
            const n = g.exec(o.toLowerCase());
            if (n && n[0] === e) return !0;
            if (
              "socket" === t &&
              r.DevtoolsConfig.setting.WebsocketSkipPortCheck
            ) {
              if (new RegExp(`^${o}(:\\d+)?$`).test(e)) return !0;
            }
          }
          const o = [];
          n.forEach((e) => {
            o.push([e]);
          }),
            console.group(`${new Date()} ${t} 合法域名校验出错`),
            console.info(
              "如若已在管理后台更新域名配置，请刷新项目配置后重新编译项目，操作路径：“详情-域名信息”"
            ),
            console.error(
              ` ${d(
                e,
                "`"
              )} 不在以下 ${t} 合法域名列表中，请参考文档：https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html`
            ),
            console.table(o),
            console.groupEnd();
        } catch (e) {
          return console.error(e), !1;
        }
        return !1;
      },
      isLocalhost: m,
      isInLAN: f,
      coverRes: (e) => {
        if (null == e ? void 0 : e.__cover) {
          for (const t in e.__cover)
            "base64" === t &&
              ((e[e.__cover[t]] = u(e.base64)), delete e.base64),
              "base64Array" === t &&
                ((e[e.__cover[t]] = e.base64Array.map((e) => u(e))),
                delete e.base64Array);
          delete e.__cover;
        }
      },
      coverResToOriginArgs: (e, t) => {
        if (null == e ? void 0 : e.__toOrigin)
          for (const n in e.__toOrigin) {
            const o = e.__toOrigin[n],
              r = t[o.argsName],
              s = e[n];
            if (s && r && "ArrayBuffer" === o.type) {
              const t = new Uint8Array(r),
                o = new Uint8Array(s),
                a = t.length;
              for (let e = 0; e < a; e++) t[e] = o[e];
              e[n] = r;
            }
          }
        delete e.__toOrigin;
      },
      calibration: () => {
        try {
          const e = new s.XMLHttpRequest();
          (e.responseType = "text"),
            e.open(
              "GET",
              `${location.protocol}//${
                window.location.host
              }/calibration/${Date.now()}`,
              !0
            ),
            e.send();
        } catch (e) {}
      },
      getQueryString: function(e) {
        var t = new RegExp(`(^|&)${e}=([^&]*)(&|$)`, "i"),
          n = window.location.search.substr(1).match(t);
        return null != n ? unescape(n[2]) : null;
      },
    };
  },
  function(e, t, n) {
    "use strict";
    window.__devtoolsConfig ||
      (window.__devtoolsConfig = {
        setting: {},
      }),
      (window.__wxConfig = window.__wxConfig || {});
    const o = {
      getSystemInfo: !0,
      getBatteryInfo: !0,
      getBackgroundAudioState: !0,
      setBackgroundAudioState: !0,
      operateBackgroundAudio: !0,
      createRequestTask: !0,
      createUploadTask: !0,
      createDownloadTask: !0,
      createSocketTask: !0,
      operateSocketTask: !0,
      createAudioInstance: !0,
      getMenuButtonBoundingClientRect: !0,
      getPermissionBytes: !0,
      getPluginPermissionBytes: !0,
      createUDPSocket: !0,
      bindUDPSocket: !0,
      createLockStep: !0,
      loadFont: !0,
      canIUse: !0,
      createBufferURL: !0,
      revokeBufferURL: !0,
      measureTextString: !0,
      readCompressedFileSync: !0,
    };
    let r = 0;
    e.exports = {
      syncSDKList: o,
      isSyncSDK: function(e) {
        return !!o[e] || /Sync$/.test(e);
      },
      get DevtoolsConfig() {
        return __devtoolsConfig;
      },
      get NetworkConfig() {
        return (
          (null === __devtoolsConfig || void 0 === __devtoolsConfig
            ? void 0
            : __devtoolsConfig.network) || {}
        );
      },
      get Permission() {
        return null === __devtoolsConfig || void 0 === __devtoolsConfig
          ? void 0
          : __devtoolsConfig.permission;
      },
      get AppserviceMaxDataSize() {
        return (
          ((null === __devtoolsConfig || void 0 === __devtoolsConfig
            ? void 0
            : __devtoolsConfig.setting) &&
            __devtoolsConfig.setting.MaxDataSize) ||
          1048576
        );
      },
      get MaxRequestConcurrent() {
        return (
          ((null === __devtoolsConfig || void 0 === __devtoolsConfig
            ? void 0
            : __devtoolsConfig.setting) &&
            __devtoolsConfig.setting.MaxRequestConcurrent) ||
          10
        );
      },
      get MaxWebsocketConnect() {
        return (
          ((null === __devtoolsConfig || void 0 === __devtoolsConfig
            ? void 0
            : __devtoolsConfig.setting) &&
            __devtoolsConfig.setting.MaxWebsocketConnect) ||
          10
        );
      },
      get isUseApiMock() {
        return (
          (null === __devtoolsConfig || void 0 === __devtoolsConfig
            ? void 0
            : __devtoolsConfig.useApiMock) || !1
        );
      },
      get apiMockApiList() {
        return (
          (null === __devtoolsConfig || void 0 === __devtoolsConfig
            ? void 0
            : __devtoolsConfig.apiList) || {}
        );
      },
      get libNumberVersion() {
        var e;
        return null !==
          (e =
            null === __devtoolsConfig || void 0 === __devtoolsConfig
              ? void 0
              : __devtoolsConfig.libNumberVersion) && void 0 !== e
          ? e
          : 999999999;
      },
      ibForbiddenApi: {
        navigateTo: !0,
        navigateBack: !0,
        redirectTo: !0,
        switchTab: !0,
        reLaunch: !0,
        updateApp: !0,
        openUrl: !0,
        restart: !0,
        showTabBar: !0,
        hideTabBar: !0,
        openAddress: !0,
        addPhoneContact: !0,
        showActionSheet: !0,
        showToast: !0,
        hideToast: !0,
        showModal: !0,
        showLoading: !0,
        shareAppMessage: !0,
        showShareMenuWithShareTicket: !0,
        showShareMenu: !0,
        hideShareMenu: !0,
        shareAppMessageDirectly: !0,
        showShareTimelineMenu: !0,
        hideShareTimelineMenu: !0,
        openSetting: !0,
      },
      urlCheckErrReason: "url not in domain list",
      needTransArgsBase64Api: {
        createBufferURL: !0,
      },
      canNotReadFromCodePackage: {
        js: !0,
        wxss: !0,
        wxml: !0,
      },
      genIdForDevTools: function(e, t) {
        if (
          "operateWXData" === e &&
          t &&
          "qbase_commapi" === t.apiName &&
          t.data &&
          t.data.data
        )
          switch (t.data.data.qbase_api_name) {
            case "tcbapi_db_adddocument":
            case "tcbapi_db_deletedocument":
            case "tcbapi_db_querydocument":
            case "tcbapi_db_updatedocument":
            case "tcbapi_db_setdocument":
            case "tcbapi_db_countdocument":
            case "tcbapi_db_aggregate":
            case "tcbapi_deletefile":
            case "tcbapi_gettempfileurl": {
              const e = "4." + r++;
              return (
                console.debug(
                  "~DP_DEBUG_" +
                    JSON.stringify({
                      type: "NetworkStackTrace",
                      requestId: e,
                      ignoreDepth: 2,
                    })
                ),
                e
              );
            }
          }
      },
      invokeNeedToDevtoolsApi: {
        request: !0,
        createRequestTask: !0,
        operateRequestTask: !0,
      },
    };
  },
  ,
  function(e, t, n) {
    "use strict";
    var o = Object.prototype.hasOwnProperty,
      r = "~";
    function s() {}
    function a(e, t, n) {
      (this.fn = e), (this.context = t), (this.once = n || !1);
    }
    function i() {
      (this._events = new s()), (this._eventsCount = 0);
    }
    Object.create &&
      ((s.prototype = Object.create(null)), new s().__proto__ || (r = !1)),
      (i.prototype.eventNames = function() {
        var e,
          t,
          n = [];
        if (0 === this._eventsCount) return n;
        for (t in (e = this._events))
          o.call(e, t) && n.push(r ? t.slice(1) : t);
        return Object.getOwnPropertySymbols
          ? n.concat(Object.getOwnPropertySymbols(e))
          : n;
      }),
      (i.prototype.listeners = function(e, t) {
        var n = r ? r + e : e,
          o = this._events[n];
        if (t) return !!o;
        if (!o) return [];
        if (o.fn) return [o.fn];
        for (var s = 0, a = o.length, i = new Array(a); s < a; s++)
          i[s] = o[s].fn;
        return i;
      }),
      (i.prototype.emit = function(e, t, n, o, s, a) {
        var i = r ? r + e : e;
        if (!this._events[i]) return !1;
        var c,
          l,
          u = this._events[i],
          d = arguments.length;
        if (u.fn) {
          switch ((u.once && this.removeListener(e, u.fn, void 0, !0), d)) {
            case 1:
              return u.fn.call(u.context), !0;
            case 2:
              return u.fn.call(u.context, t), !0;
            case 3:
              return u.fn.call(u.context, t, n), !0;
            case 4:
              return u.fn.call(u.context, t, n, o), !0;
            case 5:
              return u.fn.call(u.context, t, n, o, s), !0;
            case 6:
              return u.fn.call(u.context, t, n, o, s, a), !0;
          }
          for (l = 1, c = new Array(d - 1); l < d; l++) c[l - 1] = arguments[l];
          u.fn.apply(u.context, c);
        } else {
          var f,
            g = u.length;
          for (l = 0; l < g; l++)
            switch (
              (u[l].once && this.removeListener(e, u[l].fn, void 0, !0), d)
            ) {
              case 1:
                u[l].fn.call(u[l].context);
                break;
              case 2:
                u[l].fn.call(u[l].context, t);
                break;
              case 3:
                u[l].fn.call(u[l].context, t, n);
                break;
              case 4:
                u[l].fn.call(u[l].context, t, n, o);
                break;
              default:
                if (!c)
                  for (f = 1, c = new Array(d - 1); f < d; f++)
                    c[f - 1] = arguments[f];
                u[l].fn.apply(u[l].context, c);
            }
        }
        return !0;
      }),
      (i.prototype.on = function(e, t, n) {
        var o = new a(t, n || this),
          s = r ? r + e : e;
        return (
          this._events[s]
            ? this._events[s].fn
              ? (this._events[s] = [this._events[s], o])
              : this._events[s].push(o)
            : ((this._events[s] = o), this._eventsCount++),
          this
        );
      }),
      (i.prototype.once = function(e, t, n) {
        var o = new a(t, n || this, !0),
          s = r ? r + e : e;
        return (
          this._events[s]
            ? this._events[s].fn
              ? (this._events[s] = [this._events[s], o])
              : this._events[s].push(o)
            : ((this._events[s] = o), this._eventsCount++),
          this
        );
      }),
      (i.prototype.removeListener = function(e, t, n, o) {
        var a = r ? r + e : e;
        if (!this._events[a]) return this;
        if (!t)
          return (
            0 == --this._eventsCount
              ? (this._events = new s())
              : delete this._events[a],
            this
          );
        var i = this._events[a];
        if (i.fn)
          i.fn !== t ||
            (o && !i.once) ||
            (n && i.context !== n) ||
            (0 == --this._eventsCount
              ? (this._events = new s())
              : delete this._events[a]);
        else {
          for (var c = 0, l = [], u = i.length; c < u; c++)
            (i[c].fn !== t || (o && !i[c].once) || (n && i[c].context !== n)) &&
              l.push(i[c]);
          l.length
            ? (this._events[a] = 1 === l.length ? l[0] : l)
            : 0 == --this._eventsCount
            ? (this._events = new s())
            : delete this._events[a];
        }
        return this;
      }),
      (i.prototype.removeAllListeners = function(e) {
        var t;
        return (
          e
            ? ((t = r ? r + e : e),
              this._events[t] &&
                (0 == --this._eventsCount
                  ? (this._events = new s())
                  : delete this._events[t]))
            : ((this._events = new s()), (this._eventsCount = 0)),
          this
        );
      }),
      (i.prototype.off = i.prototype.removeListener),
      (i.prototype.addListener = i.prototype.on),
      (i.prototype.setMaxListeners = function() {
        return this;
      }),
      (i.prefixed = r),
      (i.EventEmitter = i),
      (e.exports = i);
  },
  ,
  ,
  ,
  ,
  function(e, t, n) {
    var o = n(22);
    (t = Array.isArray
      ? Array.isArray
      : function(e) {
          return "[object Array]" === o(e);
        }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(33);
    (t = Object.keys
      ? Object.keys
      : function(e) {
          var t = [];
          for (var n in e) o(e, n) && t.push(n);
          return t;
        }),
      (e.exports = t);
  },
  ,
  ,
  ,
  ,
  function(e, t, n) {
    "use strict";
    const o = n(6),
      r = () => {
        var e;
        return (
          "touristappid" === o.DevtoolsConfig.appid ||
          (null === (e = o.DevtoolsConfig.userInfo) || void 0 === e
            ? void 0
            : e.isTourist)
        );
      },
      s = {
        login: (e, t, n) => {
          n({
            errMsg: "login:ok",
            code: "the code is a mock one",
          });
        },
        authorize: (e, t, n) => {
          n({
            errMsg: "authorize:fail",
          });
        },
        operateWXData: (e, t, n) => {
          if ("webapi_getuserinfo" !== t.data.api_name)
            n({
              errMsg: "operateWXData:fail",
            });
          else {
            const e = (function() {
              const e = o.DevtoolsConfig.userInfo || {};
              return (
                delete o.DevtoolsConfig.userInfo,
                "touristappid" === o.DevtoolsConfig.appid || e.isTourist
                  ? e
                  : {}
              );
            })();
            n({
              errMsg: "operateWXData:ok",
              data: {
                data: JSON.stringify({
                  nickName: e.nickName,
                  avatarUrl: e.headUrl,
                  gender: "male" === e.sex ? 1 : 2,
                  province: e.province,
                  city: e.city,
                  country: e.country,
                }),
              },
            });
          }
        },
        openSetting: (e, t, n) => {
          n({
            errMsg: "openSetting:ok",
            authSetting: [
              {
                scope: "scope.userInfo",
                state: 1,
              },
            ],
          });
        },
      };
    e.exports = {
      isTourist: r,
      fake: s,
      check: function(...e) {
        const t = e[0];
        return (
          !(!r() || !s.hasOwnProperty(t)) &&
          (console.group(new Date() + " 游客模式"),
          console.warn(
            `请注意游客模式下，调用 wx.${t} 是受限的, API 的返回是工具的模拟返回`
          ),
          console.groupEnd(),
          setTimeout(() => {
            s[t].apply(null, e);
          }),
          !0)
        );
      },
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    const o = new Set(["USERCODE_REQUIRED", "PAGEFRAME_GENERATE_FUNC_READY"]),
      r = [];
    let s;
    class a {
      constructor(e) {
        (this.records = []),
          (this.countdownRecords = new Set()),
          (this._commonRecordReported = !1),
          (this._pendingReport = []),
          (this.onMutation = (e) => {
            if (this.countdownRecords.size > 0)
              for (const t of e)
                if (t.addedNodes)
                  for (const e of t.addedNodes)
                    if (
                      e instanceof HTMLScriptElement &&
                      e.hasAttribute("countdownid")
                    ) {
                      const t = e.getAttribute("countdownid");
                      let n;
                      for (const e of this.countdownRecords)
                        if (
                          e.countdownid === t &&
                          (e.received++, e.received >= e.expect)
                        ) {
                          this.addPoint(e.name, Date.now()), (n = e);
                          break;
                        }
                      n && this.countdownRecords.delete(n);
                    }
          }),
          (this.report = () => {
            clearTimeout(this._reportTimer),
              this._blocked
                ? (this._reportTimer = setTimeout(this.report, 5e3))
                : this._pendingReport.length &&
                  (this._commonRecordReported ||
                    (this._pendingReport.unshift(...r),
                    (this._commonRecordReported = !0)),
                  s.send({
                    command: "TIMING_REPORT",
                    data: this._pendingReport,
                    common: this._commonMsg,
                  }),
                  (this._pendingReport = []),
                  (this._reportTimer = setTimeout(this.report, 5e3)));
          }),
          (this.observer = new e.MutationObserver(this.onMutation)),
          this.observer.observe(e.document.head, {
            childList: !0,
          }),
          (this._blocked = e.blocked),
          this.init();
      }
      static setMessager(e) {
        s = e;
      }
      init() {
        setTimeout(this.report, 5e3);
      }
      setBlocked(e) {
        (this._blocked = e), e || this.report();
      }
      addCost(e, t, n, o) {
        const r = {
          type: "cost",
          name: e,
          start: t,
          end: n,
          cost: n - t,
          opt: o,
        };
        this.records.push(r), this._pendingReport.push(r);
      }
      addPoint(e, t = Date.now()) {
        const n = {
          type: "point",
          name: e,
          value: t,
        };
        this.records.push(n),
          this._pendingReport.push(n),
          o.has(e) && this.report();
      }
      static addCommonPoint(e, t = Date.now()) {
        r.push({
          type: "point",
          name: e,
          value: t,
        });
      }
      prepareScriptCountdownReport(e, t, n) {
        this.countdownRecords.add({
          name: e,
          countdownid: t,
          expect: n,
          received: 0,
        });
      }
      setCommonMessage(e) {
        this._commonMsg = e;
      }
    }
    (t.Timing = a), (window.__global.Timing = a);
  },
  function(e, t, n) {
    var o = n(22);
    (t = function(e) {
      var t = o(e);
      return (
        "[object Function]" === t ||
        "[object GeneratorFunction]" === t ||
        "[object AsyncFunction]" === t
      );
    }),
      (e.exports = t);
  },
  function(e, t) {
    var n = Object.prototype.toString;
    (t = function(e) {
      return n.call(e);
    }),
      (e.exports = t);
  },
  function(e, t) {
    (t = function(e) {
      return void 0 === e;
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    "use strict";
    const o = n(2);
    e.exports = {
      sync: (e, t, n) => {
        const r = {
            api: e,
            args: t,
            options: n,
          },
          s = new o.XMLHttpRequest();
        return (
          s.open("POST", "/apihelper/assdk?t=" + Date.now(), !1),
          s.send(JSON.stringify(r)),
          200 === s.status
            ? JSON.parse(s.responseText)
            : {
                errMsg: e + ":fail",
              }
        );
      },
    };
  },
  ,
  ,
  ,
  ,
  ,
  ,
  function(e, t) {
    (t = function(e) {
      var t = typeof e;
      return !!e && ("function" === t || "object" === t);
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(23);
    (t = function(e, t, n) {
      if (o(t)) return e;
      switch (null == n ? 3 : n) {
        case 1:
          return function(n) {
            return e.call(t, n);
          };
        case 3:
          return function(n, o, r) {
            return e.call(t, n, o, r);
          };
        case 4:
          return function(n, o, r, s) {
            return e.call(t, n, o, r, s);
          };
      }
      return function() {
        return e.apply(t, arguments);
      };
    }),
      (e.exports = t);
  },
  function(e, t) {
    var n = Object.prototype.hasOwnProperty;
    (t = function(e, t) {
      return n.call(e, t);
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    "use strict";
    const o = n(70),
      r = n(72),
      s = n(73),
      a = n(74),
      i = n(75),
      c = n(76),
      l = n(77),
      u = Object.assign(
        Object.assign(
          Object.assign(
            Object.assign(
              Object.assign(Object.assign(Object.assign({}, o), r), s),
              a
            ),
            i
          ),
          c
        ),
        l
      );
    e.exports = u;
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
      n(50);
    const o = n(20),
      r = n(6),
      s = n(53),
      a = n(68),
      i = n(81),
      c = n(82),
      l = n(83),
      u = n(85),
      d = n(86),
      f = n(2),
      g = n(87),
      p = n(88),
      m = n(1),
      h = n(5);
    o.Timing.setMessager(m),
      location.pathname.endsWith("mainframe") ||
        (window.__global.timing = new o.Timing({
          document: document,
          MutationObserver:
            window.MutationObserver || window.__global.MutationObserver,
        })),
      p(window);
    -1 !== f.navigator.userAgent.indexOf("game") ? g.init() : d(),
      (window.__global.getNewWeixinJSBridge = (e, t) => {
        const n = {},
          o = () => {
            const { invoke: e } = a(n),
              { publish: t } = c(n),
              { publishSync: o } = l(n),
              { subscribe: r, triggerSubscribeEvent: d } = u(),
              { on: f, triggerOnEvent: g } = s(),
              { beforeinvoke: p, afterinvoke: m } = i(n);
            return {
              invoke: e,
              publish: t,
              subscribe: r,
              on: f,
              publishSync: o,
              beforeinvoke: p,
              afterinvoke: m,
              get __triggerOnEvent() {
                return g;
              },
              get __triggerSubscribeEvent() {
                return d;
              },
              __unblock: () => {},
              __setCommonPayload(e, t) {
                n[e] = t;
              },
            };
          };
        if (t) {
          let e,
            t = [];
          const r = (n, ...o) => {
            e
              ? e[n].apply(e, o)
              : t.push({
                  method: n,
                  args: o,
                });
          };
          let s = !1;
          return {
            invoke: r.bind(null, "invoke"),
            publish: r.bind(null, "publish"),
            subscribe: r.bind(null, "subscribe"),
            on: r.bind(null, "on"),
            publishSync: r.bind(null, "publishSync"),
            beforeinvoke: r.bind(null, "beforeinvoke"),
            afterinvoke: r.bind(null, "afterinvoke"),
            __triggerOnEvent: r.bind(null, "__triggerOnEvent"),
            __triggerSubscribeEvent: r.bind(null, "__triggerSubscribeEvent"),
            __unblock: () => {
              if (!s) {
                (s = !0), (e = o());
                for (const { method: n, args: o } of t)
                  try {
                    e[n].apply(null, o);
                  } catch (e) {
                    console.error(e);
                  }
                t = [];
              }
            },
            __setCommonPayload(e, t) {
              n[e] = t;
            },
          };
        }
        return o();
      }),
      (window.WeixinJSBridge = window.__global.WeixinJSBridge = window.__global.getNewWeixinJSBridge(
        "global"
      )),
      (window.__global.WeixinJSBridgeMap = {
        __globalBridge: window.WeixinJSBridge,
      }),
      (window.NativeGlobal = {
        createBufferURL: (e) => {
          var t;
          let n = {};
          if (
            (window.__global.WeixinJSBridge.invoke(
              "createBufferURL",
              {
                buffer: e,
              },
              (e) => {
                n = e;
              }
            ),
            null === (t = null == n ? void 0 : n.errMsg) || void 0 === t
              ? void 0
              : t.startsWith("createBufferURL:fail"))
          ) {
            throw new Error(n.errMsg);
          }
          return n.url;
        },
        revokeBufferURL: (e) => {
          var t;
          let n = {};
          if (
            (window.__global.WeixinJSBridge.invoke(
              "revokeBufferURL",
              {
                url: e,
              },
              (e) => {
                n = e;
              }
            ),
            null === (t = null == n ? void 0 : n.errMsg) || void 0 === t
              ? void 0
              : t.startsWith("revokeBufferURL:fail"))
          ) {
            throw new Error(n.errMsg);
          }
          return n.result;
        },
      });
    r.DevtoolsConfig.online &&
      r.DevtoolsConfig.autoTest &&
      setInterval(() => {
        console.clear();
      }, 6e5),
      h.calibration(),
      o.Timing.addCommonPoint("ASDEBUG_LOADED");
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    const o = n(8),
      r = n(1),
      s = n(51),
      a = n(52),
      i = n(4),
      c = n(5);
    class l {
      constructor() {
        (this.globalSessionId = Date.now()),
          (this.idCounter = 1),
          (this.frames = new Map()),
          (this.currentFrameId = 0),
          (this.runtimeInstanceInfo = {}),
          (this.verbose = !1),
          (this.messagerCallback = (e) => {
            const { command: t, data: n } = e;
            "LOAD_APPSERVICE" === t
              ? (r.setAppserviceReady(!1),
                i.emit("RESET_INSTANCE"),
                (this.runtimeInstanceInfo.compileTs = n.compileTs),
                n.initOptions &&
                  n.initOptions.systemInfo &&
                  i.emit("SET_SYSTEM_INFO", n.initOptions.systemInfo),
                n.error || this.loadAppService(n.scripts, n.hardReload))
              : "RESET" === t
              ? this.reset({
                  clearPreload: n.clearPreload,
                  shouldPreload: n.shouldPreload,
                })
              : "PRELOAD" === t && this.preload();
          }),
          r.registerCallback(this.messagerCallback);
        try {
          this.runtimeInstanceInfo = {
            compileTs: Number(location.search.match(/cts=(\d+)/)[1]),
          };
        } catch (e) {
          const t = __global.prompt("GET_RUNTIME_INSTANCE_INFO");
          this.runtimeInstanceInfo = JSON.parse(t);
        }
        this.loadAppService(), s.proxyGlobalVarToInstanceFrame(this);
      }
      isLoadSuccess(e) {
        const t = e.iframe;
        let n = !0;
        try {
          t.contentWindow.location && (n = !0);
        } catch (e) {
          n = !1;
        }
        return n;
      }
      isValidFrame(e) {
        return this.frames.has(e);
      }
      isValidCurrentFrame(e) {
        return this.frames.has(e) && this.currentFrameId === e;
      }
      loadAppService(e, t) {
        if (0 === this.frames.size || t) {
          if (t) for (const [e, t] of this.frames) this.disposeFrame(t);
          const e = this.idCounter++;
          this.currentFrameId = e;
          const n = this.initASFrameInfo({
            id: e,
            iframe: void 0,
            status: "void",
            statusChangeEE: new o.EventEmitter(),
            statusUpdateTs: Date.now(),
            statusChangeListeners: {},
            instanceInfo: Object.assign({}, this.runtimeInstanceInfo),
            timing: {
              loadStartTs: Date.now(),
            },
          });
          this.frames.set(e, n),
            a
              .createIframeElement(this.generateInstanceFrameSrc(e, !0))
              .then((e) => {
                (n.iframe = e), (n.status = "loading");
              });
        } else {
          let n = !1;
          const o = new Set(),
            r = [...this.frames.values()];
          for (const t of r)
            if (n) o.add(t);
            else
              switch (t.status) {
                case "void":
                  (n = !0), (this.currentFrameId = t.id);
                  break;
                case "preloading": {
                  (n = !0),
                    (this.currentFrameId = t.id),
                    (t.instanceInfo = Object.assign(
                      {},
                      this.runtimeInstanceInfo
                    )),
                    t.statusChangeListeners.waitPreloading &&
                      (clearTimeout(
                        t.statusChangeListeners.waitPreloading.timeoutId
                      ),
                      t.statusChangeEE.off(
                        "change",
                        t.statusChangeListeners.waitPreloading.listener
                      ),
                      this.verbose &&
                        this.groupDebug(
                          "warn",
                          "clear previous wait before trying to load preloading frame " +
                            t.id
                        ));
                  const o = setTimeout(() => {
                    this.groupLog("warn", "preloading -> timedout"),
                      (t.status = "timedout");
                  }, 5e3);
                  this.verbose &&
                    this.groupDebug(
                      "warn",
                      "[--loader--] try to load preloading frame " + t.id
                    );
                  const r = () => {
                    "preloaded" === t.status &&
                      (clearTimeout(o),
                      t.statusChangeEE.off("change", r),
                      (t.status = "loading"),
                      t.iframe.contentWindow.__global.timing.addPoint(
                        "APPRESOURCE_LOAD_START",
                        Date.now()
                      ),
                      a.loadScripts(t.iframe.contentDocument, e));
                  };
                  t.statusChangeEE.on("change", r),
                    (t.statusChangeListeners.waitPreloading = {
                      timeoutId: o,
                      listener: r,
                    });
                  break;
                }
                case "preloaded":
                  (n = !0),
                    (this.currentFrameId = t.id),
                    (t.instanceInfo = Object.assign(
                      {},
                      this.runtimeInstanceInfo
                    )),
                    (t.status = "loading"),
                    t.iframe.contentWindow.__global.timing.addPoint(
                      "APPRESOURCE_LOAD_START",
                      Date.now()
                    ),
                    a.loadScripts(t.iframe.contentDocument, e);
                  break;
                case "loading":
                case "loaded":
                case "errored":
                case "timedout":
                  o.add(t);
                  break;
                default:
                  this.groupLog(
                    "warn",
                    `[loader] unknown status ${t.status}. (getFirstAvailableFrame)`
                  ),
                    o.add(t);
              }
          if (
            (o.forEach((e) => {
              this.disposeFrame(e);
            }),
            !n)
          ) {
            [...this.frames.values()].forEach((e) => this.disposeFrame(e)),
              this.loadAppService(e, t);
          }
        }
      }
      preload() {
        for (const e of this.frames.values())
          if ("preloading" === e.status || "preloaded" === e.status) return;
        const e = this.idCounter++,
          t = this.initASFrameInfo({
            id: e,
            iframe: void 0,
            status: "void",
            statusChangeEE: new o.EventEmitter(),
            statusUpdateTs: Date.now(),
            statusChangeListeners: {},
            timing: {
              preloadStartTs: Date.now(),
            },
          });
        this.frames.set(e, t),
          a.createIframeElement(this.generateInstanceFrameSrc(e)).then((e) => {
            (t.iframe = e), (t.status = "preloading");
          });
      }
      loadSrc(e, t) {
        try {
          const n = e.iframe.contentWindow;
          n.__global.history.pushState("", "", t), n.location.reload();
        } catch (t) {
          this.verbose && this.groupDebug("warn", "loadSrc catch error", t),
            (e.status = "errored"),
            this.disposeFrame(e),
            1 === this.frames.size && this.preload();
        }
      }
      handleLoadStart(e) {
        const t = e.location.search.includes("autoload"),
          n = Number(e.location.hash.match(/#id_(\d+)/)[1]),
          o = this.frames.get(n);
        o &&
          (s.createInstanceFrameInitialGlobal({
            id: n,
            win: e,
            isPreload: !t,
            asLoader: this,
          }),
          e.addEventListener("load", () => {
            this.isValidFrame(n) &&
              (t
                ? this.handleLoadDone(e, n)
                : this.isLoadSuccess(o)
                ? ((o.status = "preloaded"),
                  (o.timing.preloadEndTs = Date.now()),
                  (o.timing.preloadCost =
                    o.timing.preloadEndTs - o.timing.preloadStartTs))
                : (o.status = "errored"));
          }),
          c.calibration());
      }
      handleLoadDone(e, t) {
        if (!this.isValidCurrentFrame(t)) return;
        const n = this.frames.get(t);
        if (!this.isLoadSuccess(n)) return void (n.status = "errored");
        if ("loaded" === n.status) return;
        if (!n.instanceInfo)
          return void this.groupLog(
            "error",
            "frame loaded without instanceInfo"
          );
        e.performance.mark("documentReadyAlertStart"),
          e.__global.alert("DOCUMENT_READY"),
          e.performance.mark("documentReadyAlertEnd");
        const o = new e.__global.CustomEvent("LOADER_LOAD_DONE");
        e.dispatchEvent(o),
          e.__global.WeixinJSBridge.__setCommonPayload(
            "compileTs",
            n.instanceInfo.compileTs
          ),
          e.__global.WeixinJSBridge.__unblock(),
          r.setAppserviceReady(!0, e.JSON.parse.bind(e.JSON)),
          e.__global.timing.setCommonMessage(n.instanceInfo),
          e.__global.timing.setBlocked(!1),
          (n.status = "loaded"),
          (n.timing.loadEndTs = Date.now()),
          e.__global.requestIdleCallback(() => {
            e.__global.timing.report();
          }),
          e.console.debug("@appservice-current-context");
      }
      handleWxConfigReady(e) {
        const t = Number(e.location.hash.match(/#id_(\d+)/)[1]),
          n = this.frames.get(t);
        n &&
          (n.instanceInfo
            ? (e.__global.WeixinJSBridge.__setCommonPayload(
                "compileTs",
                n.instanceInfo.compileTs
              ),
              e.__global.WeixinJSBridge.__unblock())
            : this.groupLog(
                "error",
                "during handleWxConfigReady, frame instanceInfo not found"
              ));
      }
      disposeFrame(e) {
        var t;
        if (
          (this.verbose &&
            this.groupDebug(
              "warn",
              "dispose frame",
              e,
              null == e ? void 0 : e.id
            ),
          (e = e || this.frames.get(this.currentFrameId)))
        ) {
          if ((this.frames.delete(e.id), this.currentFrameId === e.id))
            if (this.frames.size > 0)
              for (const [e, t] of this.frames) {
                this.currentFrameId = t.id;
                break;
              }
            else this.currentFrameId = -1;
          null === (t = __global.cfn) || void 0 === t || t.call(__global, e),
            e.iframe.parentElement.removeChild(e.iframe),
            this.clearStatusChangeListeners(e);
        }
      }
      clearStatusChangeListeners(e) {
        for (const t in e.statusChangeListeners) {
          const n = e.statusChangeListeners[t];
          clearTimeout(n.timeoutId),
            e.statusChangeEE.off("change", n.listener),
            this.verbose &&
              this.groupDebug("warn", `clear ${t} listener of frame ${e.id}`);
        }
        e.statusChangeListeners = {};
      }
      reset(e = {}) {
        const { clearPreload: t, shouldPreload: n = !0 } = e;
        if (
          (this.verbose &&
            this.groupDebug(
              "warn",
              `reset triggered. clearPreload ${t}, shouldPreload ${n}`
            ),
          r.setAppserviceReady(!1),
          i.emit("RESET_INSTANCE"),
          -1 !== this.currentFrameId)
        ) {
          const e = this.frames.get(this.currentFrameId);
          (!t && "preloaded" === (null == e ? void 0 : e.status)) ||
            "preloading" === (null == e ? void 0 : e.status) ||
            this.disposeFrame();
        }
        if (t) {
          const e = [...this.frames.values()];
          for (const t of e) this.disposeFrame(t);
          n && this.preload();
        } else {
          const e = new Set();
          let t;
          for (const [n, o] of this.frames) {
            if (!t) {
              switch (o.status) {
                case "preloaded":
                case "preloading":
                  (t = o), this.clearStatusChangeListeners(o);
                  break;
                default:
                  e.add(o);
              }
              break;
            }
            e.add(o);
          }
          for (const t of e) this.disposeFrame(t);
          !t && n && this.preload();
        }
      }
      async getCurrentInstanceFrame() {
        const e = this.frames.get(this.currentFrameId);
        if (!e) {
          const e = "no current frame during getCurrentInstanceFrame";
          throw (this.groupLog("error", e), new Error("[loader] " + e));
        }
        switch (e.status) {
          case "preloaded":
          case "loaded":
            return e.iframe;
          case "loading":
          case "preloading":
            return new Promise((t, n) => {
              const o = setTimeout(() => {
                  e.status = "timedout";
                }, 5e3),
                r = () => {
                  "preloaded" === e.status || "loaded" === e.status
                    ? (clearTimeout(o),
                      e.statusChangeEE.off("change", r),
                      t(e.iframe))
                    : "errored" === e.status &&
                      n("[loader] frame load errored");
                };
              e.statusChangeEE.on("change", r),
                (e.statusChangeListeners.waitGetFrame = {
                  timeoutId: o,
                  listener: r,
                });
            });
          case "blank":
          case "errored":
          default:
            throw new Error(
              "[loader] unexpected current frame status " + e.status
            );
        }
      }
      generateInstanceFrameSrc(e, t) {
        let n = `${location.protocol}//${location.host}/appservice/instanceframe?s=${this.globalSessionId}`;
        return t && (n += "&autoload"), (n += "#id_" + e), n;
      }
      initASFrameInfo(e) {
        const t = this;
        let n = e.status;
        return (
          Object.defineProperty(e, "status", {
            get: () => n,
            set(o) {
              n !== o &&
                (t.verbose &&
                  t.groupDebug(
                    "warn",
                    `id ${e.id} change status from ${n} to ${o}`,
                    new Error().stack
                  ),
                (n = o),
                (e.statusUpdateTs = Date.now()),
                e.statusChangeEE.emit("change", e));
            },
          }),
          e
        );
      }
      proxyAlert(e, t) {
        if (!this.isValidCurrentFrame(e))
          return void (
            this.verbose &&
            this.groupDebug(
              "warn",
              `reject non-current frame (id ${e}) alert req with msg: ${t}`
            )
          );
        const n = this.frames.get(e);
        return (
          t.startsWith("SUBPACKAGE_READY_") &&
            ("loaded" !== n.status &&
              setTimeout(() => {
                e === this.currentFrameId &&
                  this.handleLoadDone(n.iframe.contentWindow, e);
              }),
            n.iframe.contentWindow.__global.asSubLoader.emit(t)),
          __global.alert(
            "$$" +
              JSON.stringify({
                msg: t,
                common: n.instanceInfo,
              })
          )
        );
      }
      proxyPrompt(e, t) {
        if (!this.isValidCurrentFrame(e))
          return void (
            this.verbose &&
            this.groupDebug(
              "warn",
              `reject non-current frame (id ${e}) prompt req with msg: ${t}`
            )
          );
        const n = this.frames.get(e);
        return __global.prompt(
          "$$" +
            JSON.stringify({
              msg: t,
              common: n.instanceInfo,
            })
        );
      }
      getInstanceWindowSync() {
        const e = this.frames.get(this.currentFrameId);
        try {
          return null == e ? void 0 : e.iframe.contentWindow;
        } catch (e) {
          return;
        }
      }
      groupLog(e, ...t) {
        console.group(new Date() + " 开发者工具 AppService 内部错误"),
          console[e]("[--loader--]", ...t),
          console.groupEnd();
      }
      groupDebug(e, ...t) {
        if (this.verbose) {
          console.group(
            new Date().toISOString() + " 开发者工具 AppService Loader 调试信息"
          );
          try {
            console[e]("[--loader--]", ...t);
          } catch (e) {
            console.warn("[--loader--] error while outputing debug log", e);
          }
          console.groupEnd();
        }
      }
    }
    if (((t.ASLoader = l), location.pathname.endsWith("mainframe"))) {
      const e = new l();
      (window.__global.asLoader = e),
        (window.__global.getInstanceWindow = async () =>
          (await e.getCurrentInstanceFrame()).contentWindow);
    } else
      r.setAppserviceReady(!0),
        (window.__global.getInstanceWindow = async () => window);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
      (t.createInstanceFrameInitialGlobal = (e) => {
        const { id: t, win: n, isPreload: o, asLoader: r } = e,
          s = n.__passWAServiceGlobal__ || function() {};
        (n.__global.WAServiceGlobal = {}),
          (n.__passWAServiceGlobal__ = function(e) {
            for (const t in e)
              "Protect" !== t && (n.__global.WAServiceGlobal[t] = e[t]);
            s(e);
          }),
          (n.__wxAppData = {}),
          (n.__wxRoute = void 0),
          (n.__wxRouteBegin = void 0),
          (n.__wxAppCode__ = {}),
          (n.__wxAppCurrentFile__ = void 0),
          (n.__vd_version_info__ = {}),
          (n.Component = function() {}),
          (n.Behavior = function() {}),
          (n.definePlugin = function() {}),
          (n.requirePlugin = function() {}),
          (n.global = {}),
          (n.__workerVendorCode__ = {}),
          (n.__workersCode__ = {}),
          (n.__global.WeixinWorker = n.WeixinWorker = {}),
          (n.$gwx = void 0),
          (n.__global.id = t),
          (n.WeixinJSBridge = n.__global.WeixinJSBridge = __global.getNewWeixinJSBridge(
            "global",
            o
          )),
          (n.__global.timing = new __global.Timing({
            document: n.document,
            MutationObserver: n.__global.MutationObserver,
            blocked: !0,
          })),
          (n.__global.asLoader = r),
          (n.alert = n.__global.alert = r.proxyAlert.bind(r, t)),
          (n.prompt = n.__global.prompt = r.proxyPrompt.bind(r, t)),
          (n.NativeGlobal = {
            createBufferURL: (e) => {
              let t = {};
              if (
                (n.__global.WeixinJSBridge.invoke(
                  "createBufferURL",
                  {
                    buffer: e,
                  },
                  (e) => {
                    t = e;
                  }
                ),
                null == t
                  ? void 0
                  : t.errMsg.startsWith("createBufferURL:fail"))
              ) {
                throw new Error(t.errMsg);
              }
              return t.url;
            },
            revokeBufferURL: (e) => {
              let t = {};
              if (
                (n.__global.WeixinJSBridge.invoke(
                  "revokeBufferURL",
                  {
                    url: e,
                  },
                  (e) => {
                    t = e;
                  }
                ),
                null == t
                  ? void 0
                  : t.errMsg.startsWith("revokeBufferURL:fail"))
              ) {
                throw new Error(t.errMsg);
              }
              return t.result;
            },
          });
      }),
      (t.proxyGlobalVarToInstanceFrame = function(e) {
        const t = () => {
            const t = e.frames.get(e.currentFrameId);
            if (t) return t.iframe.contentWindow;
          },
          n = (e) => e;
        [
          {
            name: "__wxAppData",
            defaultValue: {},
          },
          {
            name: "__wxAppCode__",
            defaultValue: {},
          },
          {
            name: "WAServiceGlobal",
            defaultValue: {},
            subpathGetter: (e) => e.__global,
          },
          {
            name: "__wxAppCurrentFile__",
            defaultValue: void 0,
            proxySet: !0,
          },
          {
            name: "__workersCode__",
            defaultValue: {},
          },
          {
            name: "__workerVendorCode__",
            defaultValue: {},
          },
          {
            name: "WeixinWorker",
            defaultValue: {},
          },
          {
            name: "__WeixinWorker",
            defaultValue: {},
          },
          {
            name: "__vd_version_info__",
            defaultValue: {},
          },
          {
            name: "__passWAServiceGlobal__",
            defaultValue: void 0,
            proxySet: !0,
          },
          {
            name: "__devtoolsUseBeforeInvoke__",
            defaultValue: !1,
          },
          {
            name: "wx",
            defaultValue: {},
          },
          {
            name: "getApp",
            defaultValue: void 0,
          },
          {
            name: "getCurrentPages",
            defaultValue: void 0,
          },
          {
            name: "global",
            defaultValue: {},
          },
          {
            name: "__wxConfig",
            defaultValue: {},
          },
          {
            name: "__devtoolsConfig",
            defaultValue: {},
          },
          {
            name: "WeixinJSBridge",
            defaultValue: void 0,
          },
          {
            name: "__interfaceBuilder",
            defaultValue: !1,
          },
        ].forEach((e) => {
          Object.defineProperty(
            e.subpathGetter ? e.subpathGetter(window) : window,
            e.name,
            {
              get: () =>
                ((e = n, o, r) => {
                  var s;
                  try {
                    const n = t();
                    return n && null !== (s = e(n)[o]) && void 0 !== s ? s : r;
                  } catch (e) {
                    return r;
                  }
                })(e.subpathGetter, e.name, e.defaultValue),
              set: (o) => (
                e.proxySet &&
                  ((e = n, o, r) => {
                    const s = t();
                    s && (e(s)[o] = r);
                  })(e.subpathGetter, e.name, o),
                !0
              ),
              enumerable: !0,
            }
          );
        });
      });
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
      (t.createIframeElement = async function(e = "about:blank") {
        const t = document.createElement("iframe");
        return (
          (t.style.borderWidth = "0px"),
          (t.style.width = "100%"),
          (t.style.height = "100%"),
          (t.src = e),
          document.body
            ? (document.body.appendChild(t), t)
            : new Promise((e) => {
                document.addEventListener("DOMContentLoaded", () => {
                  document.body.appendChild(t), e(t);
                });
              })
        );
      }),
      (t.ignoreKeys = new Set(["dedupId"])),
      (t.loadScripts = async function(e, n) {
        if (n)
          for (const o of n) {
            const n = e.createElement("script");
            n.charset = "UTF-8";
            let r = !0;
            for (const e in o)
              if ("async" === e) r = !1;
              else {
                if (t.ignoreKeys.has(e)) continue;
                n[e] = o[e];
              }
            r && n.src
              ? await new Promise((t) => {
                  n.addEventListener("load", t),
                    n.addEventListener("error", t),
                    e.head.appendChild(n);
                })
              : e.head.appendChild(n);
          }
      });
  },
  function(e, t, n) {
    "use strict";
    const o = n(54),
      r = n(5),
      s = n(1),
      a = n(4);
    e.exports = function() {
      const e = a.instanceScope();
      let t = {},
        n = !1,
        i = !1;
      function c(e, r, s) {
        if (n)
          return void console.warn(
            "[memory-leak] triggerOnEvent called on a deprecated instance"
          );
        t.triggerWorkerEvent &&
          "function" == typeof t.triggerWorkerEvent &&
          t.triggerWorkerEvent(e, o(r));
        const a = t[e];
        if ("function" == typeof a)
          try {
            a(r, s);
          } catch (e) {
            console.error(e);
          }
      }
      const l = (e) => {
        const { command: t, data: n, webviewID: o } = e;
        "APPSERVICE_ON_EVENT" === t &&
          (r.coverRes(n.data), c(n.eventName, n.data, o));
      };
      return (
        i || ((i = !0), s.registerCallback(l)),
        e.on("triggerOnEvent", function(e, t, n) {
          c(e, t, n);
        }),
        (window.DeviceOrientation = function(e, t, o) {
          n ||
            c("onAccelerometerChange", {
              x: e,
              y: t,
              z: o,
            });
        }),
        a.once("RESET_INSTANCE", () => {
          (n = !0), (t = {}), s.removeCallback(l);
        }),
        {
          on: function(e, o) {
            n ||
              (r.debugLog(`${new Date()} WeixinJSBridge on ${e}`, arguments),
              r.debugInfo({
                type: "on",
                eventName: e,
                data: arguments,
                timesmap: new Date(),
              }),
              o && (t[e] = o));
          },
          triggerOnEvent: c,
        }
      );
    };
  },
  function(e, t, n) {
    var o = n(31),
      r = n(21),
      s = n(13),
      a = n(55);
    (t = function(e) {
      return s(e)
        ? e.map(function(e) {
            return t(e);
          })
        : o(e) && !r(e)
        ? a(e, function(e) {
            return t(e);
          })
        : e;
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(56),
      r = n(14);
    (t = function(e, t, n) {
      t = o(t, n);
      for (var s = r(e), a = s.length, i = {}, c = 0; c < a; c++) {
        var l = s[c];
        i[l] = t(e[l], l, e);
      }
      return i;
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(21),
      r = n(31),
      s = n(13),
      a = n(32),
      i = n(57),
      c = n(64),
      l = n(65);
    (t = function(e, t, n) {
      return null == e ? c : o(e) ? a(e, t, n) : r(e) && !s(e) ? i(e) : l(e);
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(58),
      r = n(63);
    (t = function(e) {
      return (
        (e = o({}, e)),
        function(t) {
          return r(t, e);
        }
      );
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(14);
    (t = n(59)(o)), (e.exports = t);
  },
  function(e, t, n) {
    var o = n(23),
      r = n(60);
    (t = function(e, t) {
      return function(n) {
        return (
          r(arguments, function(s, a) {
            if (0 !== a) {
              var i = e(s);
              r(i, function(e) {
                (t && !o(n[e])) || (n[e] = s[e]);
              });
            }
          }),
          n
        );
      };
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(61),
      r = n(14),
      s = n(32);
    (t = function(e, t, n) {
      var a, i;
      if (((t = s(t, n)), o(e)))
        for (a = 0, i = e.length; a < i; a++) t(e[a], a, e);
      else {
        var c = r(e);
        for (a = 0, i = c.length; a < i; a++) t(e[c[a]], c[a], e);
      }
      return e;
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(62),
      r = n(21),
      s = Math.pow(2, 53) - 1;
    (t = function(e) {
      if (!e) return !1;
      var t = e.length;
      return o(t) && t >= 0 && t <= s && !r(e);
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(22);
    (t = function(e) {
      return "[object Number]" === o(e);
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(14);
    (t = function(e, t) {
      var n = o(t),
        r = n.length;
      if (null == e) return !r;
      e = Object(e);
      for (var s = 0; s < r; s++) {
        var a = n[s];
        if (t[a] !== e[a] || !(a in e)) return !1;
      }
      return !0;
    }),
      (e.exports = t);
  },
  function(e, t) {
    (t = function(e) {
      return e;
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(13),
      r = n(66);
    (t = function(e) {
      return o(e)
        ? function(t) {
            return r(t, e);
          }
        : ((t = e),
          function(e) {
            return null == e ? void 0 : e[t];
          });
      var t;
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(23),
      r = n(67);
    (t = function(e, t) {
      var n;
      for (n = (t = r(t, e)).shift(); !o(n); ) {
        if (null == (e = e[n])) return;
        n = t.shift();
      }
      return e;
    }),
      (e.exports = t);
  },
  function(e, t, n) {
    var o = n(33),
      r = n(13);
    t = function(e, t) {
      if (r(e)) return e;
      if (t && o(t, e)) return [e];
      var n = [];
      return (
        e.replace(s, function(e, t, o, r) {
          n.push(o ? r.replace(a, "$1") : t || e);
        }),
        n
      );
    };
    var s = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      a = /\\(\\)?/g;
    e.exports = t;
  },
  function(e, t, n) {
    "use strict";
    const o = n(19),
      r = n(1),
      s = n(69),
      a = n(34),
      i = n(78),
      c = n(79),
      l = n(24),
      u = n(5),
      d = n(6),
      f = n(4),
      g = n(80),
      {
        arrayBufferToBase64: p,
        coverRes: m,
        isKindOfArrayBuffer: h,
        coverResToOriginArgs: _,
      } = u,
      { modifyComponentData: v } = g,
      {
        isSyncSDK: b,
        needTransArgsBase64Api: w,
        genIdForDevTools: y,
        invokeNeedToDevtoolsApi: S,
      } = d;
    let { isUseApiMock: E, apiMockApiList: k } = d;
    e.exports = function(e) {
      const t = {};
      let n = 1,
        g = !1,
        C = !1;
      const T = (e) => {
          const { command: n, data: o } = e;
          if ("APPSERVICE_INVOKE_CALLBACK" === n) {
            if (o.res.needImplement) {
              const { api: e, args: n } = o.res;
              a[e](e, n, t[o.callbackID]);
            } else {
              const e = o.callbackID,
                n = t[e];
              m(o.res), "function" == typeof n && n(o.res);
            }
            delete t[o.callbackID];
          } else
            "APPSERVICE_INVOKE_EMITTER" === n
              ? f.emit("triggerOnEvent", o.name, o.payload)
              : "API_MOCK_STATUS_CHANGE" === n
              ? (E = o)
              : "API_MOCK_APILIST_CHANGE" === n && (k = o.apiList);
          "MODIFY_COMPONENT_DATA" === n &&
            v(o.id, o.componentData, o.webviewId);
        },
        I = function(e, t, n, o) {
          return function(r) {
            n && r.__toOrigin && _(r, n),
              "function" == typeof t &&
                (e || o
                  ? t(r)
                  : setTimeout(() => {
                      t(r);
                    }, 0));
          };
        };
      return (
        f.once("RESET_INSTANCE", () => {
          (g = !0), r.removeCallback(T);
        }),
        C || ((C = !0), r.registerCallback(T)),
        {
          invoke: function(f, _, v) {
            if (g) return;
            if (window.__interfaceBuilder && d.ibForbiddenApi[f])
              return void console.log("interfacebuilder disabled invoke", f, _);
            if (w[f]) for (const e in _) h(_[e]) && (_[e] = p(_[e]));
            const C = {};
            if (i[f])
              for (const e in _)
                i[f].is(_[e], e) &&
                  (i[f].saveOrigin && (C[e] = _[e]),
                  (_[e] = i[f].trans(_, _[e])));
            u.debugLog(`${new Date()} WeixinJSBridge invoke ${f}`, arguments),
              u.debugInfo({
                type: "invoke",
                eventName: f,
                data: arguments,
                timesmap: new Date(),
              });
            const T = b(f),
              A = I(T, v, C);
            if (o.check(f, _, A)) return;
            if (s[f] && !s[f](f, _, A)) return;
            if (c[f]) {
              const e = c[f](f, _, A);
              if (!e) return;
              _ = e;
            }
            const D = y(f, _),
              O = D
                ? Object.assign(Object.assign({}, _), {
                    __devtoolsId: D,
                  })
                : _,
              x = window.__devtoolsUseBeforeInvoke__;
            if (a[f] && (!E || void 0 === k[f]) && (!x || !S[f])) {
              const t = a[f](f, _, A, e);
              if ("PROCEED" !== (null == t ? void 0 : t.action)) return;
            }
            const P = n++;
            if (!T)
              return (
                (t[P] = I(T, v, C, !0)),
                void r.send({
                  command: "APPSERVICE_INVOKE",
                  data: {
                    api: f,
                    args: O,
                    callbackID: P,
                  },
                  common: e,
                })
              );
            const M = l.sync(f, O);
            M.needImplement ? a[f](f, _, A) : (m(M), delete M.to, A(M));
          },
        }
      );
    };
  },
  function(e, t, n) {
    "use strict";
    const o = n(6),
      r = n(5),
      { checkUrl: s } = r,
      { urlCheckErrReason: a } = o,
      i = {
        downloadFile: function(e, t, n) {
          return (
            !!s(t.url, "downloadFile") ||
            (n({
              errMsg: `${e}:fail ${a}`,
            }),
            !1)
          );
        },
        uploadFile: function(e, t, n) {
          return (
            !!s(t.url, "uploadFile") ||
            (n({
              errMsg: `${e}:fail ${a}`,
            }),
            !1)
          );
        },
        createUploadTask: function(e, t, n) {
          return (
            !(!t.__skipDomainCheck__ && !s(t.url, "uploadFile")) ||
            (n({
              errMsg: `${e}:fail ${a}`,
            }),
            !1)
          );
        },
        createDownloadTask: function(e, t, n) {
          return (
            !(!t.__skipDomainCheck__ && !s(t.url, "downloadFile")) ||
            (n({
              errMsg: `${e}:fail ${a}`,
            }),
            !1)
          );
        },
        authorize: function(e, t, n) {
          return (
            "scope.userInfo" === t.scope &&
              (console.group(new Date() + " 接口调整"),
              console.error(
                'wx.authorize({scope: "scope.userInfo"}) 不会出现授权弹窗，请使用 <button open-type="getUserInfo />\n参考文档: https://developers.weixin.qq.com/blogdetail?action=get_post_info&lang=zh_CN&token=1650183953&docid=0000a26e1aca6012e896a517556c01'
              ),
              console.groupEnd()),
            !0
          );
        },
      };
    e.exports = i;
  },
  function(e, t, n) {
    "use strict";
    const o = n(71),
      r = n(4),
      s = n(6),
      a = n(5),
      i = n(2),
      { MaxRequestConcurrent: c, urlCheckErrReason: l } = s,
      { checkUrl: u } = a,
      d = {};
    let f = 1,
      g = 0,
      p = Date.now();
    r.on("RESET_INSTANCE", () => {
      (g = 0), (p = Date.now());
    });
    const m = function(e) {
        return function(t) {
          "function" == typeof e && e(t);
        };
      },
      h = {
        "accept-charset": !0,
        "accept-encoding": !0,
        "access-control-request-headers": !0,
        "access-control-request-method": !0,
        connection: !0,
        "content-length": !0,
        cookie: !0,
        cookie2: !0,
        date: !0,
        dnt: !0,
        expect: !0,
        host: !0,
        "keep-alive": !0,
        origin: !0,
        referer: !0,
        te: !0,
        trailer: !0,
        "transfer-encoding": !0,
        upgrade: !0,
        via: !0,
      };
    function _(e, t) {
      const { origin: n, tls: o } = e;
      console.group(new Date() + " wx.request 错误"),
        console.error(
          `${n} 对应的服务器 TLS 为 ${o} ，小程序要求的 TLS 版本必须大于等于 1.2 。控制台输入 showRequestInfo() 可以获取更详细信息。`
        ),
        console.groupEnd(),
        t({
          errMsg: "request:fail 小程序要求的 TLS 版本必须大于等于 1.2",
        });
    }
    function v(e, t) {
      const { origin: n } = e;
      console.group(new Date() + " wx.request 错误"),
        console.error(
          n +
            " 对应的服务器证书无效。控制台输入 showRequestInfo() 可以获取更详细信息。"
        ),
        console.groupEnd(),
        t({
          errMsg: "request:fail 对应的服务器证书无效。",
        });
    }
    const b = (e, t, n, a) => {
        var d;
        g++;
        const f = p,
          m = (e) => {
            f === p &&
              setTimeout(() => {
                g--, "function" == typeof n && n(e);
              });
          };
        if (g > c)
          return (
            console.group(new Date() + " request 错误"),
            console.error(
              `同时最多发起 ${c} 个 request 请求，更多请参考文档：https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html`
            ),
            console.groupEnd(),
            void m({
              errMsg: e + ":fail exceed max task count",
            })
          );
        const { url: b, responseType: w, __skipDomainCheck__: E } = t;
        if (!E && !u(b))
          return void m({
            errMsg: `${e}:fail ${l}`,
          });
        const k = t.method || "POST";
        if (
          [
            "OPTIONS",
            "GET",
            "HEAD",
            "POST",
            "PUT",
            "DELETE",
            "TRACE",
            "CONNECT",
          ].indexOf(k) < 0
        )
          return void m({
            errMsg: e + ":fail method is invalid",
          });
        const C = o.getSecuryDetailsByURL(b);
        if (C.isReady) {
          if (!C.isSecuryTLS) return void _(C, m);
          if (!C.isSecuryCertificate) return void v(C, m);
        }
        const T = t.header || {};
        let I = i.XMLHttpRequest;
        if (i.asLoader) {
          const t = i.asLoader.getInstanceWindowSync();
          if (!t)
            return void m({
              errMsg: e + ":fail runtime invalidated",
            });
          I = t.__global.XMLHttpRequest;
        }
        const A = new I();
        (A.disableHttp2 = !t.enableHttp2),
          (A.responseType = w || "text"),
          (A.timeout =
            t.timeout ||
            (null === (d = __wxConfig.networkTimeout) || void 0 === d
              ? void 0
              : d.request) ||
            6e4),
          A.open(k, t.url, !0),
          (A.onreadystatechange = () => {
            if (A.readyState === (A.HEADERS_RECEIVED || 2))
              try {
                let e = {};
                try {
                  e = JSON.parse(A.getResponseHeader("for-weapp-devtools"));
                } catch (e) {}
                "function" == typeof a &&
                  s.libNumberVersion >= 1009093 &&
                  a({
                    state: "headersReceived",
                    header: S(e || {}),
                    cookies: y(e || {}),
                  });
              } catch (e) {
                console.error(e);
              }
            if ((A.readyState, 4 === A.readyState)) {
              A.onreadystatechange = null;
              const n = A.status;
              if (0 === n);
              else {
                const s = o.getSecuryDetailsByURL(b);
                let a = {};
                try {
                  a = JSON.parse(A.getResponseHeader("for-weapp-devtools"));
                } catch (e) {}
                function t(t) {
                  if (!t.isSecuryTLS) return void _(t, m);
                  if (!t.isSecuryCertificate) return void v(t, m);
                  if (A.responseURL && !E && !u(A.responseURL))
                    return void m({
                      errMsg: `${e}:fail ${l}`,
                    });
                  const o = {
                    errMsg: e + ":ok",
                    header: S(a || {}),
                    cookies: y(a || {}),
                    statusCode: n,
                  };
                  (o.data = "arraybuffer" === w ? A.response : A.responseText),
                    m(o);
                }
                s.isReady
                  ? t(s)
                  : r.instanceScope().once("TLS_CHECK_READY_" + s.id, t);
              }
            }
          }),
          (A.onerror = () => {
            m({
              errMsg: e + ":fail",
            });
          }),
          (A.ontimeout = () => {
            m({
              errMsg: e + ":fail timeout",
            });
          }),
          (A.onabort = () => {
            m({
              errMsg: e + ":fail abort",
            });
          });
        let D = 0;
        for (const e in T) "content-type" === e.toLowerCase() && D++;
        D >= 2 && delete T["content-type"];
        let O = !1;
        for (const t in T)
          if (T.hasOwnProperty(t)) {
            const n = t.toLowerCase(),
              o = T[t];
            O = "content-type" === n || O;
            try {
              h[n] || 0 === t.indexOf("for-wechatdevtools-fake-")
                ? A.setRequestHeader("for-wechatdevtools-fake-" + t, o)
                : A.setRequestHeader(t, T[t]);
            } catch (t) {
              return void m({
                errMsg: `${e}:fail ${t}`,
              });
            }
          }
        "POST" !== k ||
          O ||
          A.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
          );
        const x = t.data;
        try {
          A.send(x);
        } catch (t) {
          m({
            errMsg: e + ":fail",
          });
        }
        return A;
      },
      w = (e = "") => e,
      y = (e) => {
        const t = [];
        for (const n in e)
          if ("set-cookie" === n.toLowerCase()) {
            const o = e[n],
              r = Object.prototype.toString.call(o);
            if ("[object String]" === r) {
              t.push(w(o.trim()));
              continue;
            }
            if ("[object Array]" === r) {
              for (const e of o) t.push(w(e.trim()));
              continue;
            }
          }
        return t;
      },
      S = (e, t = ",") => {
        const n = {};
        for (const o in e) {
          const r = Object.prototype.toString.call(e[o]);
          n[o] = "[object Array]" === r ? e[o].join(t) : e[o];
        }
        return n;
      };
    e.exports = {
      request: b,
      createRequestTask: (e, t, n) => {
        const o = m(n),
          s = {
            id: f++,
            url: t.url,
            data: t.data,
            header: t.header,
            method: t.method,
            callback: (e, t) => {
              let n = {};
              (n =
                0 === t.errMsg.indexOf("request:ok")
                  ? {
                      requestTaskId: e,
                      state: "success",
                      data: t.data,
                      header: t.header,
                      statusCode: t.statusCode,
                      cookies: t.cookies,
                    }
                  : {
                      requestTaskId: e,
                      state: "fail",
                      errMsg: t.errMsg.replace(/^request:fail ?/, ""),
                    }),
                delete d[e],
                r.emit("triggerOnEvent", "onRequestTaskStateChange", n);
            },
          };
        o({
          errMsg: e + ":ok",
          requestTaskId: s.id,
        }),
          (d[s.id] = s);
        s.xhr = b("request", t, s.callback.bind(void 0, s.id), function(e) {
          const t = Object.assign(Object.assign({}, e), {
            requestTaskId: s.id,
          });
          r.emit("triggerOnEvent", "onRequestTaskStateChange", t);
        });
      },
      operateRequestTask: (e, t, n) => {
        const o = m(n),
          r = t.requestTaskId,
          s = t.operationType,
          a = d[r];
        if (!a)
          return o({
            errMsg: e + ":fail task not found",
          });
        if ("abort" !== s)
          return o({
            errMsg: `${e}:fail illegal operationType ${s}`,
          });
        try {
          a.xhr.abort(),
            o({
              errMsg: e + ":ok",
            });
        } catch (t) {
          o({
            errMsg: `${e}:fail ${t}`,
          });
        }
      },
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    const o = n(19),
      r = n(4),
      s = n(6),
      a = n(2);
    t.securityDetails = window.securityDetails = {
      "https://servicewechat.com": {
        isSecuryTLS: !0,
        securityState: "secure",
        isReady: !0,
        isSecuryCertificate: !0,
        tls: "TLS 1.2",
      },
    };
    let i = 1e4;
    function c(e) {
      const t = a.document.createElement("a");
      return (
        (t.href = e),
        {
          protocol: t.protocol,
          origin: t.origin,
          fullPath: `${t.origin}/${t.pathname}`,
        }
      );
    }
    function l(e) {
      const { protocol: n, origin: r, fullPath: a } = c(e);
      let l = t.securityDetails[r];
      return o.isTourist() || !s.DevtoolsConfig.urlCheck || "https:" !== n
        ? ((l = {
            isReady: !0,
            isSecuryTLS: !0,
            isSecuryCertificate: !0,
          }),
          (t.securityDetails[r] = l),
          l)
        : l ||
            ((l = {
              isReady: !1,
              id: i++,
              tls: "",
              isSecuryTLS: !1,
              securityState: "",
              isSecuryCertificate: !1,
              protocol: n,
              origin: r,
              fullPath: a,
              url: e,
            }),
            (t.securityDetails[r] = l),
            l);
    }
    (t.parseURL = c),
      (window.setSecurityDetails = function(e, n) {
        const { origin: o } = c(e);
        n = JSON.parse(n);
        let s = t.securityDetails[o];
        s || (s = t.securityDetails[o] = {});
        const { protocol: a, securityState: i } = n;
        let l = !1;
        a && (l = parseFloat(a.replace("TLS ", "")) >= 1.2),
          (s.isSecuryTLS = l),
          (s.tls = a),
          (s.securityState = i),
          (s.isSecuryCertificate = "insecure" !== i),
          (s.isReady = !0),
          (s.remoteAddress = n.remoteAddress),
          (s.statusCode = n.statusCode);
        const u = s.id;
        r.emit("TLS_CHECK_READY_" + u, t.securityDetails[o]);
      }),
      (t.getSecuryDetailsByURL = l),
      (t.default = {
        securityDetails: t.securityDetails,
        getSecuryDetailsByURL: l,
        parseURL: c,
      });
  },
  function(e, t, n) {
    "use strict";
    const o = {
      0: "log",
      1: "info",
      2: "warn",
      3: "error",
    };
    e.exports = {
      reportKeyValue: (e, t, n) => {
        n({
          errMsg: e + ":ok",
        });
      },
      reportIDKey: (e, t, n) => {
        n({
          errMsg: e + ":ok",
        });
      },
      traceEvent: (e, t, n) => {
        n({
          errMsg: e + ":ok",
        });
      },
      log: (e, t, n) => {
        (t.dataArray || []).forEach((e) => {
          const t = o[e.level];
          t && e.msg && console[t](e.msg);
        });
      },
    };
  },
  function(e, t, n) {
    "use strict";
    const o = n(4),
      r = n(6),
      s = n(5),
      a = n(2),
      { checkUrl: i } = s;
    let c = {},
      l = 1,
      u = Date.now();
    function d(e) {
      (window.alert ? window.alert : a.alert)(
        "SET_SOCKET_HEADER:" + JSON.stringify(e)
      );
    }
    const f = window.WebSocket || a.WebSocket,
      g = function(e) {
        return function(t) {
          "function" == typeof e && e(t);
        };
      },
      p = {
        1e3: "normal closure",
        1001: "going away",
        1002: "protocol error",
        1003: "unsupported data",
        1004: "reserved",
        1005: "no status rcvd",
        1006: "abnormal closure",
        1007: "invalid frame payload data",
        1008: "policy violation",
        1009: "message too big",
        1010: "mandatory ext.",
        1011: "internal server error",
        1015: "tls handshake",
      };
    function m(e) {
      console.group(new Date() + " 无网络状态模拟"),
        console.error(
          `已开启无网络状态模拟，网络请求 ${e} 已被阻止；在模拟器工具栏切换网络状态，可恢复网络请求。`
        ),
        console.groupEnd();
    }
    let h;
    function _() {
      h && (h.close(), (h = void 0));
      for (const e in c) {
        const t = c[e].socket;
        t && t.close();
      }
    }
    window.addEventListener("networkChange", (e) => {
      (r.DevtoolsConfig.networkStatus = e.detail.networkStatus),
        "none" === r.DevtoolsConfig.networkStatus && _();
    }),
      o.on("RESET_INSTANCE", () => {
        _(), (c = {}), (u = Date.now());
      }),
      (e.exports = {
        connectSocket: (e, t, n) => {
          const { url: s, header: c } = t,
            l = g(n);
          if ("none" === r.DevtoolsConfig.networkStatus)
            return (
              m(s),
              void l({
                errMsg: e + ":fail network is down",
              })
            );
          if (!i(s, "socket"))
            return void l({
              errMsg: "connectSocket:fail " + r.urlCheckErrReason,
            });
          if (
            (c && Object.keys(c).length > 0 && d(c),
            h && (h.readyState === f.OPEN || h.readyState === f.CONNECTING))
          )
            return void l({
              errMsg: "connectSocket:fail websocket is connected",
            });
          try {
            let e = window.WebSocket;
            if (a.asLoader) {
              const t = a.asLoader.getInstanceWindowSync();
              if (!t)
                return void l({
                  errMsg: "connectSocket:fail runtime invalidated",
                });
              e = t.__global.WebSocket;
            }
            h = new e(s, t.protocols || []);
          } catch (e) {
            o.emit("triggerOnEvent", "onSocketError", {
              errMsg: "未完成的操作",
            }),
              (h = void 0);
          }
          if (!h)
            return void l({
              errMsg: "connectSocket:fail",
            });
          h.binaryType = "arraybuffer";
          const _ = u === u;
          (h.onopen = function(e) {
            _ && o.emit("triggerOnEvent", "onSocketOpen", {});
          }),
            (h.onmessage = function(e) {
              _ &&
                o.emit("triggerOnEvent", "onSocketMessage", {
                  data: e.data,
                });
            }),
            (h.onclose = function(e) {
              _ &&
                (o.emit("triggerOnEvent", "onSocketClose", {
                  code: e.code,
                  reason: e.reason || p[e.code] || "",
                }),
                (h = void 0));
            }),
            (h.onerror = function(e) {
              _ &&
                (o.emit("triggerOnEvent", "onSocketError", {
                  errMsg: "未完成的操作",
                }),
                (h = void 0));
            }),
            l({
              errMsg: "connectSocket:ok",
            });
        },
        sendSocketMessage: (e, t, n) => {
          const o = g(n),
            r = t.data;
          let s = "fail";
          if (h)
            try {
              h.readyState === f.OPEN
                ? (h.send(r), (s = "ok"))
                : (s = "fail webSocket is not connected");
            } catch (e) {
              s = "fail " + e.message;
            }
          o({
            errMsg: `${e}:${s}`,
          });
        },
        closeSocket: (e, t, n) => {
          const o = g(n);
          if (h)
            try {
              h.close(t.code, t.reason),
                o({
                  errMsg: "closeSocket:ok",
                });
            } catch (e) {
              o({
                errMsg: "closeSocket:fail " + e,
              });
            }
          else
            o({
              errMsg: "closeSocket:fail",
            });
          h = void 0;
        },
        createSocketTask: (e, t, n) => {
          var s;
          const u = g(n),
            f = Object.keys(c).length,
            { url: h, header: _, protocols: v, __skipDomainCheck__: b } = t,
            w = l++,
            y = {
              socketTaskId: w,
              url: h,
              protocols: v,
              header: _,
            };
          if (
            (u({
              socketTaskId: w,
              errMsg: e + ":ok",
            }),
            f >= r.MaxWebsocketConnect)
          )
            return void setTimeout(() => {
              console.group(new Date() + " websocket 错误"),
                console.error(
                  `同时最多发起 ${r.MaxWebsocketConnect} 个 socket 请求，更多请参考文档：https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html`
                ),
                console.groupEnd(),
                o.emit("triggerOnEvent", "onSocketTaskStateChange", {
                  socketTaskId: w,
                  state: "error",
                  errMsg: "exceed max task count",
                });
            });
          if ("none" === r.DevtoolsConfig.networkStatus)
            return void setTimeout(() => {
              m(h),
                o.emit("triggerOnEvent", "onSocketTaskStateChange", {
                  socketTaskId: w,
                  state: "error",
                  errMsg: "network is down",
                });
            });
          if (!b && !i(h, "socket"))
            return void setTimeout(() => {
              o.emit("triggerOnEvent", "onSocketTaskStateChange", {
                socketTaskId: w,
                state: "error",
                errMsg: r.urlCheckErrReason,
              });
            });
          (c[w] = y), _ && Object.keys(_).length > 0 && d(_);
          const S =
            (null === (s = __wxConfig.networkTimeout) || void 0 === s
              ? void 0
              : s.connectSocket) || 6e4;
          let E,
            k = !1;
          try {
            let e = window.WebSocket;
            if (a.asLoader) {
              const t = a.asLoader.getInstanceWindowSync();
              if (!t)
                return void u({
                  errMsg: "connectSocket:fail runtime invalidated",
                });
              e = t.__global.WebSocket;
            }
            E = new e(h, t.protocols || []);
          } catch (e) {
            if (k) return;
            o.emit("triggerOnEvent", "onSocketTaskStateChange", {
              socketTaskId: w,
              state: "error",
              errMsg: "未完成的操作",
            }),
              delete c[w];
          }
          if (!E) return;
          const C = setTimeout(() => {
            var e;
            (k = !0),
              o.emit("triggerOnEvent", "onSocketTaskStateChange", {
                socketTaskId: w,
                state: "error",
                errMsg: "Timed out connecting to server.",
              }),
              delete c[w],
              null === (e = null == E ? void 0 : E.close) ||
                void 0 === e ||
                e.call(E);
          }, S);
          (E.binaryType = "arraybuffer"),
            (E.onopen = function() {
              clearTimeout(C),
                o.emit("triggerOnEvent", "onSocketTaskStateChange", {
                  socketTaskId: w,
                  state: "open",
                });
            }),
            (E.onmessage = function(e) {
              if (k) return;
              const t = e.data;
              o.emit("triggerOnEvent", "onSocketTaskStateChange", {
                socketTaskId: w,
                data: t,
                state: "message",
              });
            }),
            (E.onclose = function(e) {
              k ||
                (o.emit("triggerOnEvent", "onSocketTaskStateChange", {
                  socketTaskId: w,
                  state: "close",
                  code: e.code,
                  reason: e.reason || p[e.code] || "",
                }),
                delete c[w]);
            }),
            (E.onerror = function() {
              k ||
                (o.emit("triggerOnEvent", "onSocketTaskStateChange", {
                  socketTaskId: w,
                  state: "error",
                  errMsg: "未完成的操作",
                }),
                delete c[w]);
            }),
            (y.socket = E);
        },
        operateSocketTask: (e, t, n) => {
          const {
              socketTaskId: o,
              operationType: r,
              code: s,
              reason: a,
              data: i,
            } = t,
            l = g(n),
            u = c[o];
          if (!u)
            return l({
              errMsg: e + ":fail task not found",
            });
          if ("send" !== r)
            if ("close" !== r)
              l({
                errMsg: `${e}:fail illegal operationType ${r}`,
              });
            else
              try {
                u.socket.close(t.code, t.reason),
                  l({
                    errMsg: e + ":ok",
                  });
              } catch (t) {
                l({
                  errMsg: `${e}:fail ${t.message}`,
                });
              }
          else
            try {
              u.socket.readyState === f.OPEN
                ? (u.socket.send(i),
                  l({
                    errMsg: e + ":ok",
                  }))
                : l({
                    errMsg: e + ":fail webSocket is not connected",
                  });
            } catch (t) {
              l({
                errMsg: `${e}:fail ${t.message}`,
              });
            }
        },
      });
  },
  function(e, t, n) {
    "use strict";
    const o = n(2);
    e.exports = {
      encodeArrayBufferSync: async function(e, t, n) {
        const r = t.format,
          s = t.data;
        try {
          const t = new o.TextEncoder(r).encode(s);
          return n({
            errMsg: e + ":ok",
            buffer: t.buffer,
          });
        } catch (t) {
          return n({
            errMsg: `${e}:fail ${t}`,
          });
        }
      },
      decodeArrayBufferSync: async function(e, t, n) {
        const r = t.format,
          s = t.data;
        try {
          const t = new o.TextDecoder(r);
          return n({
            errMsg: e + ":ok",
            result: t.decode(s),
          });
        } catch (t) {
          return n({
            errMsg: e + ":fail",
          });
        }
      },
    };
  },
  function(e, t, n) {
    "use strict";
    const o = n(1),
      r = n(4);
    let s,
      a,
      i = !1,
      c = !1;
    function l() {
      c ||
        (o.send({
          command: "APPSERVICE_SDK_STORAGE_ACTION",
          data: {
            action: "INIT",
          },
        }),
        (c = !0));
    }
    function u() {
      if (s) return s;
      i ||
        ((i = !0),
        o.registerCallback((e) => {
          const { command: t, data: n } = e;
          "APPSERVICE_STORAGE_UPDATED" === t
            ? (n.storage && (s = n.storage), n.config && (a = n.config))
            : "APPSERVICE_EXEC_STORAGE_SDK" === t
            ? _[n.api] && _[n.api](n.api, n.args, () => {})
            : "APPSERVICE_RESET_STORAGE" === t && ((s = void 0), (a = void 0));
        })),
        l();
    }
    function d(e, t, n) {
      o.send({
        command: "APPSERVICE_SDK_STORAGE_ACTION",
        data: {
          action: "UPDATE",
          api: e,
          args: t,
          callbackID: void 0,
        },
        common: n,
      });
    }
    function f(e, t, n) {
      const o = u();
      if (!o)
        return {
          action: "PROCEED",
        };
      const r = t.key;
      let s = t.storageId,
        a = {};
      void 0 === s
        ? (s = 0)
        : 0 !== s &&
          1 !== s &&
          2 !== s &&
          n({
            errMsg: e + ":fail nonexistent storage space",
          }),
        (a = o[s] || {});
      const i = a[r];
      n(
        void 0 !== i
          ? {
              errMsg: e + ":ok",
              data: JSON.parse(JSON.stringify(i.data)),
              dataType: i.dataType,
            }
          : {
              errMsg: e + ":fail data not found",
            }
      );
    }
    function g(e, t, n, o) {
      const r = u();
      if (!r)
        return {
          action: "PROCEED",
        };
      const s = t.key;
      0 === s.length &&
        n({
          errMsg: e + ":fail key is empty",
        });
      let i = t.storageId,
        c = {};
      void 0 === i
        ? (i = 0)
        : 0 !== i &&
          1 !== i &&
          2 !== i &&
          n({
            errMsg: e + ":fail nonexistent storage space",
          }),
        (c = r[i] || {}),
        (r[i] = c);
      const l = t.data,
        f = t.dataType;
      c[s] = {
        data: l,
        dataType: f,
      };
      const g = 0 === i ? a.userMaxSize : a.openDataMaxSize;
      JSON.stringify(r).length > 1024 * g * 1024
        ? n({
            errMsg: `${e}:fail exceed storage max size ${g}Mb`,
          })
        : (d(e, t, o),
          n({
            errMsg: e + ":ok",
          }));
    }
    function p(e, t, n, o) {
      let r = (t || {}).storageId;
      const s = u();
      if (!s)
        return {
          action: "PROCEED",
        };
      void 0 === r
        ? (r = 0)
        : 0 !== r &&
          1 !== r &&
          2 !== r &&
          n({
            errMsg: e + ":fail nonexistent storage space",
          }),
        (s[r] = {}),
        d(e, t, o),
        n({
          errMsg: e + ":ok",
        });
    }
    function m(e, t, n, o) {
      const r = u();
      if (!r)
        return {
          action: "PROCEED",
        };
      const s = t.key;
      let a = t.storageId,
        i = {};
      void 0 === a
        ? (a = 0)
        : 0 !== a &&
          1 !== a &&
          2 !== a &&
          n({
            errMsg: e + ":fail nonexistent storage space",
          }),
        (i = r[a] || {}),
        (r[a] = i),
        delete i[s],
        d(e, t, o),
        n({
          errMsg: e + ":ok",
        });
    }
    function h(e, t, n, o) {
      let r = (t || {}).storageId;
      const s = u();
      if (!s)
        return {
          action: "PROCEED",
        };
      let i = {};
      void 0 === r
        ? (r = 0)
        : 0 !== r &&
          1 !== r &&
          2 !== r &&
          n({
            errMsg: e + ":fail nonexistent storage space",
          }),
        (i = s[r] || {}),
        (s[r] = i);
      const c = {
        keys: Object.keys(i),
        currentSize: Math.ceil(JSON.stringify(i).length / 1024),
      };
      (c.limitSize = 1024 * a.userMaxSize), (c.errMsg = e + ":ok"), n(c);
    }
    r.on("RESET_INSTANCE", () => {
      (s = void 0), (c = !1), l();
    });
    const _ = {
      getStorage: f,
      clearStorage: p,
      setStorage: g,
      removeStorage: m,
      getStorageInfo: h,
      getStorageSync: f,
      setStorageSync: g,
      clearStorageSync: p,
      removeStorageSync: m,
      getStorageInfoSync: h,
    };
    e.exports = _;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    const o = n(1),
      r = n(4);
    let s,
      a = !1,
      i = !1;
    function c() {
      i ||
        (o.send({
          command: "APPSERVICE_SDK_DEVICE_ACTION",
          data: {
            action: "INIT",
          },
        }),
        (i = !0));
    }
    function l(e, t, n) {
      const r = (function() {
        if (s) return JSON.parse(JSON.stringify(s));
        a ||
          ((a = !0),
          o.registerCallback((e) => {
            const { command: t, data: n } = e;
            "APPSERVICE_DEVICE_UPDATED" === t &&
              n.systemInfo &&
              (s = n.systemInfo);
          })),
          c();
      })();
      if (!r)
        return {
          action: "PROCEED",
        };
      n(r);
    }
    r.on("RESET_INSTANCE", () => {
      (s = void 0), (i = !1), c();
    }),
      r.on("SET_SYSTEM_INFO", (e) => {
        (s = e), (i = !0);
      }),
      (t.getSystemInfoSync = l),
      (t.getSystemInfo = function(e, t, n) {
        return l(0, 0, n);
      });
  },
  function(e, t, n) {
    "use strict";
    const o = n(24),
      r = n(4),
      s = n(1);
    let a = {};
    const i = [
      "play",
      "canplay",
      "ended",
      "stop",
      "waiting",
      "seeking",
      "seeked",
    ];
    s.registerCallback((e) => {
      const { command: t } = e;
      ("LOAD_APPSERVICE" === t || "RESET" === t) && u();
    });
    const c = function(e) {
        return function(t) {
          "function" == typeof e && e(t);
        };
      },
      l = (e) => {
        r.emit("triggerOnEvent", "onAudioStateChange", e);
      };
    function u() {
      for (const e in a) a[e].pause(), a[e].remove();
      a = {};
    }
    e.exports = {
      createAudioInstance: (e, t, n) => {
        const o = c(n),
          r = `${Date.now()}${Math.random()}`,
          s = document.createElement("audio");
        (a[r] = s),
          o({
            errMsg: e + ":ok",
            audioId: r,
          });
      },
      destroyAudioInstance: function(e, t, n) {
        const o = t.audioId,
          r = c(n);
        a[o] && (a[o].pause(), a[o].remove(), delete a[o]),
          r({
            errMsg: e + ":ok",
            audioId: o,
          });
      },
      setAudioState: (e, t, n) => {
        const r = c(n);
        try {
          const {
              audioId: n,
              src: s,
              startTime: c,
              autoplay: u,
              loop: d,
              referrerPolicy: f,
            } = t,
            g = a[n];
          let { volume: p } = t;
          if (
            ((g.loop = d || !1),
            (g.autoplay = u || !1),
            (g.referrerPolicy = f || "no-referrer"),
            (p = parseFloat(p)),
            (g.volume = isNaN(p) ? 1 : Math.max(0, Math.min(1, p))),
            s &&
              (function(e, t, n) {
                if (e._src === t) return;
                e._src = t;
                const r = o.sync("getInnerAudioContextSrc", {
                  src: t,
                  referrerPolicy: n,
                });
                if ("getInnerAudioContextSrc:fail" === r.errMsg)
                  throw new Error("getInnerAudioContextSrc:fail");
                const s = r.durationResult;
                s && (e._duration = s), (e.src = r.srcResult);
              })(g, s, f),
            c)
          ) {
            const e = () => {
              g.removeEventListener("canplay", e), (g.currentTime = c / 1e3);
            };
            g.addEventListener("canplay", e);
          }
          (g.startTime = c || 0),
            (function(e) {
              const t = a[e];
              if (t.initStateChage) return;
              (t.initStateChage = !0),
                t.addEventListener("error", (t) => {
                  const n = t.currentTarget.error.code,
                    o = {
                      audioId: e,
                      state: "error",
                      errMsg: "MediaError",
                      errCode: 1e4 + parseInt(n, 10),
                    };
                  l(o);
                }),
                t.addEventListener("pause", () => {
                  const n = t._isStop ? "stop" : "pause";
                  t._isStop = !1;
                  l({
                    audioId: e,
                    state: n,
                  });
                }),
                i.forEach((n) => {
                  t.addEventListener(n, () => {
                    l({
                      audioId: e,
                      state: n,
                    });
                  });
                });
            })(n),
            r({
              errMsg: e + ":ok",
            });
        } catch (t) {
          r({
            errMsg: e + ":fail",
          });
        }
      },
      getAudioState: async function(e, t, n) {
        const o = c(n),
          r = t.audioId,
          s = a[r];
        if (s) {
          const { currentTime: t, paused: n, startTime: r } = s;
          let { duration: a } = s;
          const i = (function(e) {
            const t = e ? e.buffered : "";
            if (t) {
              const n = e.currentTime;
              for (let e = 0, o = t.length; e < o; e++)
                if (t.start(e) <= n && t.end(e) >= n) return t.end(e);
            }
            return 0;
          })(s);
          a === 1 / 0 && s._duration && (a = s._duration),
            o({
              errMsg: e + ":ok",
              duration: 1e3 * a,
              currentTime: 1e3 * t,
              paused: n,
              src: s._src,
              startTime: 1e3 * r,
              buffered: 1e3 * i,
              referrerPolicy: s.referrerPolicy,
            });
        } else
          o({
            errMsg: e + ":fail",
          });
      },
      operateAudio: (e, t, n) => {
        const o = c(n),
          { operationType: r, audioId: s, currentTime: i } = t,
          l = a[s];
        l
          ? ("play" === r
              ? (l.play(), (l._isStop = !1))
              : "pause" === r
              ? l.pause()
              : "stop" === r
              ? ((l._isStop = !0), l.pause(), (l.currentTime = 0))
              : "seek" === r && (l.currentTime = i / 1e3),
            o({
              errMsg: e + ":ok",
            }))
          : o({
              errMsg: e + ":fail",
            });
      },
      getAvailableAudioSources: async function(e, t, n) {
        c(n)({
          errMsg: e + ":ok",
          audioSources: ["auto"],
        });
      },
    };
  },
  function(e, t, n) {
    "use strict";
    const o = n(5),
      { arrayBufferToBase64: r, isKindOfArrayBuffer: s, isKindOfArray: a } = o,
      i = {
        invokeLockStepMethod: {
          is: (e) => (a(e) ? e.every((e) => s(e)) : s(e)),
          trans: (e, t) => (
            (e.__dataisab = !0), a(t) ? t.map((e) => r(e)) : r(t)
          ),
        },
        writeFile: {
          is: (e) => s(e),
          trans: (e, t) => ((e.__dataisab = !0), r(t)),
        },
        writeFileSync: {
          is: (e) => s(e),
          trans: (e, t) => ((e.__dataisab = !0), r(t)),
        },
        fs_appendFile: {
          is: (e) => s(e),
          trans: (e, t) => ((e.__dataisab = !0), r(t)),
        },
        fs_appendFileSync: {
          is: (e) => s(e),
          trans: (e, t) => ((e.__dataisab = !0), r(t)),
        },
        uploadToCommonCDN: {
          is: (e, t) => "fileData" === t && s(e),
          trans: (e, t) => ({
            __dataisab: !0,
            value: r(t),
          }),
        },
        sendUDPSocketMessage: {
          is: (e) => s(e),
          trans: (e, t) => ((e.__dataisab = !0), r(t)),
        },
        write: {
          is: (e) => s(e),
          trans: (e, t) => ((e.__dataisab = !0), r(t)),
        },
        writeSync: {
          is: (e) => s(e),
          trans: (e, t) => ((e.__dataisab = !0), r(t)),
        },
        read: {
          is: (e) => s(e),
          trans: (e, t) => ((e.__dataisab = !0), r(t)),
          saveOrigin: !0,
        },
        readSync: {
          is: (e) => s(e),
          trans: (e, t) => ((e.__dataisab = !0), r(t)),
          saveOrigin: !0,
        },
      };
    e.exports = i;
  },
  function(e, t, n) {
    "use strict";
    const o = n(2),
      r = o.navigator.userAgent,
      s = (e, t, n) => {
        if (!/gameservice/.test(r)) return t;
        const s = t.canvasId,
          a = () => {
            n({
              errMsg: e + ":fail canvas not found",
            });
          };
        if (!s) return void (/Sync$/.test(e) ? a() : setTimeout(a));
        const {
            x: i = 0,
            y: c = 0,
            width: l = s.width,
            height: u = s.height,
            destWidth: d = s.width,
            destHeight: f = s.height,
            fileType: g = "png",
          } = t,
          p = o.document.createElement("canvas");
        Object.setPrototypeOf(p, o.canvasProto), (p.width = d), (p.height = f);
        const m = p.getContext("2d");
        m &&
          (Object.setPrototypeOf(m, o.canvas2dContextProto),
          m.drawImage(s, i, c, l, u, 0, 0, d, f));
        const h = "jpg" === g ? "image/jpeg" : "image/png",
          _ = isNaN(t.quality)
            ? 1
            : t.quality > 0 && t.quality <= 1
            ? t.quality
            : 1;
        return {
          dataURL: p
            .toDataURL(h, _)
            .replace(/^data:image\/(jpg|png);base64,/, ""),
          fileType: g,
        };
      },
      a = {
        canvasToTempFilePath: s,
        canvasToTempFilePathSync: s,
      };
    e.exports = a;
  },
  function(e, t, n) {
    "use strict";
    const o = n(2);
    e.exports = {
      modifyComponentData: (e, t, n) => {
        o.WAServiceGlobal.__virtualDOM__.getNodeById(e, parseInt(n)).setData(t);
      },
    };
  },
  function(e, t, n) {
    "use strict";
    const o = n(1),
      r = n(34),
      s = n(24),
      a = n(5),
      i = n(4);
    let c,
      l = !1,
      u = !1;
    function d() {
      u ||
        (o.registerCallback((e) => {
          const { command: t, data: n } = e;
          "APPSERVICE_HOOK_METHODS_CACHE_UPDATED" === t &&
            n.pluginHookMethodsCache &&
            (c = n.pluginHookMethodsCache);
        }),
        (u = !0)),
        l ||
          (o.send({
            command: "APPSERVICE_HOOK_METHODS_CACHE_ACTION",
            data: {
              action: "get",
            },
          }),
          (l = !0));
    }
    i.on("RESET_INSTANCE", () => {
      (l = !1), d();
    }),
      (__global.getHookMethodsCache = function() {
        return c || d(), c;
      }),
      (e.exports = function(e) {
        const t = {};
        let n = 1,
          c = !1,
          l = !1;
        const u = (e) => {
            const { command: n, data: o } = e;
            if ("APPSERVICE_BEFORE_INVOKE_CALLBACK" === n) {
              if (o.res.needImplement) {
                const { api: e, args: n } = o.res;
                r[e](e, n, t[o.callbackID]);
              } else {
                const e = o.callbackID,
                  n = t[e];
                "function" == typeof n && n(o.res);
              }
              delete t[o.callbackID];
            } else if ("APPSERVICE_AFTER_INVOKE_CALLBACK" === n) {
              const e = o.callbackID,
                n = t[e];
              "function" == typeof n && n(o.res);
            }
          },
          d = function(e, t, n) {
            return function(e) {
              const o = Object.assign(Object.assign({}, e), n);
              "function" == typeof t && t(o);
            };
          };
        return (
          i.once("RESET_INSTANCE", () => {
            (c = !0), o.removeCallback(u);
          }),
          l || ((l = !0), o.registerCallback(u)),
          {
            beforeinvoke: function(i, l, u, f) {
              if (c) return;
              const { isAsync: g, preventDefault: p } = f;
              a.debugLog(
                `${new Date()} WeixinJSBridge beforeinvoke ${i}`,
                arguments
              ),
                a.debugInfo({
                  type: "beforeinvoke",
                  eventName: i,
                  data: arguments,
                  timesmap: new Date(),
                });
              let m = l;
              try {
                JSON.stringify(l);
              } catch (e) {
                m = [
                  {
                    error: !0,
                    errMsg: e,
                  },
                ];
              }
              if (!1 === p)
                return void o.send({
                  command: "APPSERVICE_BEFORE_INVOKE",
                  data: {
                    api: i,
                    args: m,
                    preventDefault: !1,
                  },
                  common: e,
                });
              const h = d(0, u, {}),
                _ = n++;
              if (g)
                (t[_] = h),
                  o.send({
                    command: "APPSERVICE_BEFORE_INVOKE",
                    data: {
                      api: i,
                      args: m,
                      callbackID: _,
                    },
                    common: e,
                  });
              else {
                const e = s.sync(i, m, {
                  beforeInvoke: !0,
                });
                e.needImplement ? r[i](i, l, h) : h(e);
              }
            },
            afterinvoke: function(r, i, l, u) {
              if (c) return;
              const { isAsync: f, preventDefault: g } = u;
              a.debugLog(
                `${new Date()} WeixinJSBridge afterinvoke ${r}`,
                arguments
              ),
                a.debugInfo({
                  type: "afterinvoke",
                  eventName: r,
                  data: arguments,
                  timesmap: new Date(),
                });
              const p = {
                res: i,
              };
              if (!1 === g)
                return void o.send({
                  command: "APPSERVICE_AFTER_INVOKE",
                  data: {
                    api: r,
                    args: p,
                    preventDefault: !1,
                  },
                  common: e,
                });
              const m = d(0, l, {}),
                h = n++;
              if (f)
                (t[h] = m),
                  o.send({
                    command: "APPSERVICE_AFTER_INVOKE",
                    data: {
                      api: r,
                      args: p,
                      callbackID: h,
                      common: e,
                    },
                  });
              else {
                m(
                  s.sync(r, p, {
                    afterInvoke: !0,
                  })
                );
              }
            },
          }
        );
      });
  },
  function(e, t, n) {
    "use strict";
    const o = n(5),
      r = n(1),
      s = n(4);
    e.exports = function(e) {
      let t = !1,
        n = !0,
        a = !1;
      const i = (t) => {
        const { command: o, data: s, fromWebviewID: a } = t;
        if ("WRITE_APP_DATA" === o) {
          const e = {};
          getCurrentPages().forEach((t) => {
            e[t.__route__ || t.route] = t;
          });
          for (const t in s) {
            const o = s[t],
              r = o.__webviewId__;
            e[t] && "function" == typeof e[t].setData
              ? ((n = !1), e[t].setData(o))
              : (null === wx || void 0 === wx
                ? void 0
                : wx.invokeWebviewMethod)
              ? ((n = !1),
                wx.invokeWebviewMethod({
                  name: "appDataChange",
                  args: {
                    data: o,
                  },
                }))
              : c(
                  "appDataChange",
                  {
                    data: {
                      data: o,
                    },
                  },
                  [r],
                  !0
                ),
              Object.assign(__wxAppData[t], o);
            for (const e in __wxAppData[t])
              void 0 === o[e] && delete __wxAppData[t][e];
          }
        } else
          "GET_APP_DATA" === o &&
            r.send({
              command: "SEND_APP_DATA",
              data: __wxAppData,
              common: e,
            });
      };
      function c(s, a, i, c) {
        var l;
        if (!t) {
          if (
            ((i = i ? i.filter((e) => void 0 !== e) : []),
            o.debugLog(`${new Date()} WeixinJSBridge publish ${s}`, arguments),
            a && 0 !== s.indexOf("canvas"))
          ) {
            const e = JSON.stringify(a).length;
            e > 1048576 &&
              (console.group(new Date() + " 数据传输长度过长"),
              console.warn(
                `${
                  "vdSyncBatch" === s ? "setData" : s
                } 数据传输长度为 ${Math.floor(e / 1024)} KB，存在有性能问题！`
              ),
              console.groupEnd());
          }
          o.debugInfo({
            type: "publish",
            eventName: s,
            data: arguments,
            timesmap: new Date(),
          }),
            ("appDataChange" !== s &&
              "pageInitData" !== s &&
              "__updateAppData" !== s) ||
              c ||
              r.send({
                command: "SEND_APP_DATA",
                data: __wxAppData,
                common: e,
              }),
            "invokeWebviewMethod" === s &&
              "appDataChange" ===
                (null === (l = null == a ? void 0 : a.data) || void 0 === l
                  ? void 0
                  : l.name) &&
              (n &&
                r.send({
                  command: "SEND_APP_DATA",
                  data: __wxAppData,
                  common: e,
                }),
              (n = !0)),
            ("vdSync" !== s && "vdSyncBatch" !== s) ||
              (n &&
                r.send({
                  command: "SEND_APP_DATA",
                  data: __wxAppData,
                  common: e,
                }),
              (n = !0)),
            r.send({
              command: "APPSERVICE_PUBLISH",
              data: {
                eventName: s,
                data: a,
                webviewIds: i,
              },
              common: e,
            });
        }
      }
      return (
        s.once("RESET_INSTANCE", () => {
          (t = !0), r.removeCallback(i);
        }),
        a || ((a = !0), r.registerCallback(i)),
        {
          publish: c,
        }
      );
    };
  },
  function(e, t, n) {
    "use strict";
    const o = n(5),
      r = n(84),
      s = n(1),
      a = n(4);
    e.exports = function(e) {
      let t = !1;
      return (
        a.once("RESET_INSTANCE", () => {
          t = !0;
        }),
        {
          publishSync: function(n, a, i) {
            if (t) return;
            let c;
            if (
              ((i = i ? i.filter((e) => void 0 !== e) : []),
              o.debugLog(
                `${new Date()} WeixinJSBridge publishsync ${n}`,
                arguments
              ),
              o.debugInfo({
                type: "publishsync",
                eventName: n,
                data: arguments,
                timesmap: new Date(),
              }),
              0 === i.length && (c = ["fail no such target", null]),
              (c = r.sync(
                "publishsync",
                {
                  eventName: n,
                  data: a,
                  webviewIds: i,
                },
                1e4,
                "fail timeout"
              )),
              c[0])
            )
              throw new Error(c[0]);
            return (
              "vdSyncSync" === n &&
                s.send({
                  command: "SEND_APP_DATA",
                  data: __wxAppData,
                  common: e,
                }),
              c[1]
            );
          },
        }
      );
    };
  },
  function(e, t, n) {
    "use strict";
    const o = n(2);
    e.exports = {
      sync: (e, t, n, r) => {
        const s = {
            args: t,
            syncTimeout: n,
            syncTimeoutMsg: r,
          },
          a = new o.XMLHttpRequest();
        if (
          (a.open("POST", `/jsbridge/${e}?t=${Date.now()}`, !1),
          a.send(JSON.stringify(s)),
          200 === a.status)
        )
          return JSON.parse(a.responseText);
      },
    };
  },
  function(e, t, n) {
    "use strict";
    const o = n(5),
      r = n(4),
      s = n(1);
    e.exports = function() {
      const e = r.instanceScope();
      let t = {},
        n = !1,
        a = !1;
      function i(e, n, o) {
        const r = t[e];
        if ("function" == typeof r)
          try {
            r(n, o);
          } catch (e) {
            console.error(e);
          }
      }
      const c = (e) => {
        const { command: t, data: n, fromWebviewID: o } = e;
        "WEBVIEW_PUBLISH" === t && i(n.eventName, n.data, o);
      };
      return (
        a || ((a = !0), s.registerCallback(c)),
        e.on("triggerSubscribeEvent", (e, t, n) => {
          i(e, t, n);
        }),
        r.once("RESET_INSTANCE", () => {
          (n = !0), (t = {}), s.removeCallback(c);
        }),
        {
          subscribe: function(e, r) {
            n ||
              (o.debugLog(
                `${new Date()} WeixinJSBridge subscribe ${e}`,
                arguments
              ),
              o.debugInfo({
                type: "subscribe",
                eventName: e,
                data: arguments,
                timesmap: new Date(),
              }),
              (t[e] = r));
          },
          triggerSubscribeEvent: i,
        }
      );
    };
  },
  function(e, t, n) {
    "use strict";
    const o = n(2),
      r = n(1);
    e.exports = function() {
      if (
        ([
          "Caches",
          "screen",
          "performance ",
          "getComputedStyle",
          "openDatabase",
          "btoa",
          "Image",
        ].forEach((e) => {
          delete window[e];
        }),
        (window.chrome = void 0),
        "complete" === o.document.readyState)
      )
        o.history.replaceState(
          {},
          o.document.title || "",
          location.href + "?load"
        ),
          o.alert("MAINFRAME_LOADED");
      else {
        const e = () => {
          o.history.replaceState(
            {},
            o.document.title || "",
            location.href + "?load"
          ),
            o.alert("MAINFRAME_LOADED"),
            o.removeEventListener("load", e);
        };
        o.addEventListener("load", e);
      }
      let e = !1;
      const t = WebAssembly.Memory;
      function n() {
        e ||
          ((e = !0),
          r.send({
            command: "PAGE_EXIST_WASM",
          }));
      }
      (WebAssembly.Memory = function(...e) {
        return n(), new t(...e);
      }),
        (WebAssembly.Memory.prototype = t.prototype);
      const s = WebAssembly.Instance;
      (WebAssembly.Instance = function(...e) {
        return n(), new s(...e);
      }),
        (WebAssembly.Instance.prototype = s.prototype);
    };
  },
  function(e, t, n) {
    "use strict";
    const o = n(1),
      r = n(2),
      s = (e, t) => {
        const n = r.document.getElementById("myCanvas"),
          o = new r.Touch({
            identifier: 1,
            target: n,
            clientX: e,
            clientY: t,
            pageX: e,
            pageY: t,
          }),
          s = new r.TouchEvent("touchstart", {
            bubbles: !0,
            touches: [o],
            targetTouches: [o],
            changedTouches: [o],
          });
        r.canvasProto.dispatchEvent.call(n, s);
      },
      a = (e, t) => {
        const n = r.document.getElementById("myCanvas"),
          o = new r.Touch({
            identifier: 1,
            target: n,
            clientX: e,
            clientY: t,
            pageX: e,
            pageY: t,
          }),
          s = new r.TouchEvent("touchend", {
            bubbles: !0,
            changedTouches: [o],
          });
        r.canvasProto.dispatchEvent.call(n, s);
      },
      i = (e, t) => {
        const n = r.document.getElementById("myCanvas"),
          o = new r.Touch({
            identifier: 1,
            target: n,
            clientX: e,
            clientY: t,
            pageX: e,
            pageY: t,
          }),
          s = new r.TouchEvent("touchmove", {
            bubbles: !0,
            touches: [o],
            targetTouches: [o],
            changedTouches: [o],
          });
        r.canvasProto.dispatchEvent.call(n, s);
      };
    let c = !1,
      l = !0;
    const u = (e) => {
        c &&
          l &&
          ((l = !1),
          setTimeout(() => {
            l = !0;
          }, 250),
          r.WeixinJSBridge.invoke("private_ideplugin_excute_command", {
            pluginId: "inspector_v1_game",
            command: "INSPECT_MOVE",
            data: {
              x: e.pageX,
              y: e.pageY,
            },
          }));
      },
      d = (e) => {
        c &&
          r.WeixinJSBridge.invoke("private_ideplugin_excute_command", {
            pluginId: "inspector_v1_game",
            command: "INSPECT_RESULT",
            data: {
              x: e.pageX,
              y: e.pageY,
            },
          });
      };
    e.exports = {
      init: () => {
        o.registerCallback(async (e) => {
          const { command: t, data: n } = e;
          let l;
          switch (t) {
            case "Driver.game.dumpUI":
              l = (() => {
                let e = {};
                try {
                  e = window.__monkeyInject.engine.dumpUI();
                } catch (e) {
                  return {
                    status: 17,
                    value: {
                      message: e.toString(),
                    },
                  };
                }
                return {
                  status: 0,
                  value: e,
                };
              })();
              break;
            case "Driver.game.tap":
              l = ((e) => (
                s(e.x, e.y),
                a(e.x, e.y),
                {
                  status: 0,
                }
              ))(n.data);
              break;
            case "Driver.game.swipe":
              l = await ((e) => {
                const {
                  startX: t = 0,
                  startY: n = 0,
                  endX: o = 0,
                  endY: r = 0,
                  duration: c = 0,
                } = e;
                s(t, n);
                let l = Math.floor(c / 20);
                l <= 0 && (l = 1);
                const u = (o - t) / l,
                  d = (r - n) / l;
                return new Promise((e, s) => {
                  const c = function(s) {
                    i(parseInt(t + s * u, 10), parseInt(n + s * d, 10)),
                      s < l
                        ? setTimeout(() => {
                            c(s + 1);
                          }, 20)
                        : (a(o, r),
                          e({
                            status: 0,
                          }));
                  };
                  c(0);
                });
              })(n.data);
              break;
            case "Driver.game.touchstart":
              l = await ((e) => (
                s(e.x, e.y),
                {
                  status: 0,
                }
              ))(n.data);
              break;
            case "Driver.game.touchend":
              l = await ((e) => (
                a(e.x, e.y),
                {
                  status: 0,
                }
              ))(n.data);
              break;
            case "Driver.game.touchmove":
              l = await ((e) => (
                i(e.x, e.y),
                {
                  status: 0,
                }
              ))(n.data);
              break;
            case "Driver.game.setInspectMode":
              l = ((e) => (
                (c = e.inspected),
                c
                  ? (r.document.addEventListener("mousemove", u),
                    r.document.addEventListener("mouseup", d))
                  : (r.document.removeEventListener("mousemove", u),
                    r.document.removeEventListener("mouseup", d)),
                {
                  status: 0,
                }
              ))(n.data);
              break;
            default:
              return;
          }
          o.send({
            command: t + ".callback",
            data: {
              callbackID: n.callbackID,
              res: l,
            },
          });
        });
      },
    };
  },
  function(e, t, n) {
    "use strict";
    const o = -1 !== n(2).navigator.userAgent.indexOf("game"),
      r = n(1),
      s = (e, t) => {
        r.send({
          command: "SYSTEM",
          data: {
            api: e,
            data: t,
          },
        });
      };
    r.registerCallback((e) => {
      const { command: t, data: n } = e;
      "SYSTEM_CALLBACK" === t &&
        (function(e, t) {
          switch (e) {
            case "showSystemInfo": {
              const e = t.memory,
                n = t.restartInfo,
                o = n.restartTimes;
              console.group(new Date() + " 工具系统信息"),
                console.info(
                  `${
                    n.beginTime
                  } 启动工具，执行编译 ${o} 次， 当前内存占用 ${e.toFixed(2)}m`
                ),
                console.table(t.info),
                console.groupEnd();
              break;
            }
            case "checkProxy":
              console.group(new Date() + " 代理信息"),
                console.table(t),
                console.groupEnd();
              break;
            case "showDecryptedInfo":
              console.group(new Date() + " 加解密信息"),
                console.table(t),
                console.groupEnd();
              break;
            case "getMessageTunnelInfo":
              console.group(new Date() + " Message Tunnel Info"),
                console.log(t),
                console.groupEnd();
              break;
            case "originalPositionFor":
              console.group(new Date() + " Origin Position"),
                t.error ? console.error(t.error) : console.log(t.origin),
                t.codeFrame && console.log(t.codeFrame),
                console.groupEnd();
              break;
            case "setSourceMapContent":
              console.group(new Date() + " setSourceMapContent"),
                console.log(t),
                console.groupEnd();
              break;
            default:
          }
        })(n.api, n.data);
    });
    const a = function(e) {
        if ("string" != typeof e) return console.log("param should be string");
        console.log("checking..."), s("checkProxy", e);
      },
      i = () => {
        s("cleanAppCache"), console.warn("应用缓存已清理完成，建议重新启动");
      },
      c = () => {
        const e = {};
        for (const t in window.securityDetails)
          if (0 !== t.indexOf("http://" + __wxConfig.apphash)) {
            const n = window.securityDetails[t];
            delete n.id,
              delete n.command,
              delete n.isReady,
              delete n.url,
              (e[t] = n);
          }
        console.table(e);
      },
      l = () => {
        console.table([
          {
            fun: "build",
            "arg[0]": "",
            "arg[1]": "",
            example: "build()",
            description: "build / reload",
          },
          {
            fun: "preview",
            "arg[0]": "",
            "arg[1]": "",
            example: "preview()",
            description: "preview with QR code",
          },
          {
            fun: "upload",
            "arg[0]": "",
            "arg[1]": "",
            example: "upload()",
            description: "upload the app",
          },
          {
            fun: "showDebugInfo",
            "arg[0]":
              "type -- String || Array; publish on subscribe invoke GetMsg",
            "arg[1]": "eventName -- String || Array;",
            example:
              'showDebugInfo() showDebugInfo("publish") showDebugInfo(["publish", "invoke"], "onAppRoute")',
            description: "open tools logs",
          },
          {
            fun: "closeDebug",
          },
          {
            fun: "showDebugInfoTable",
          },
          {
            fun: "openToolsLog",
            "arg[0]": "",
            "arg[1]": "",
            example: "openToolsLog()",
            description: "open log folder",
          },
          {
            fun: "openPlugin",
            "arg[0]": "",
            "arg[1]": "",
            example: "openPlugin()",
            description: "open plugin folder",
          },
          {
            fun: "openVendor",
            "arg[0]": "",
            "arg[1]": "",
            example: "openVendor()",
            description: "open vendor folder",
          },
          {
            fun: "openCache",
            "arg[0]": "",
            "arg[1]": "",
            example: "openCache()",
            description: "open Cache folder",
          },
          {
            fun: "openEngine",
            "arg[0]": "",
            "arg[1]": "",
            example: "openEngine()",
            description: "open engine folder",
          },
          {
            fun: "openEditorCache",
            "arg[0]": "",
            "arg[1]": "",
            example: "openEditorCache()",
            description: "open editor cache folder",
          },
          {
            fun: "showRequestInfo",
            "arg[0]": "",
            "arg[1]": "",
            example: "showRequestInfo()",
            description: "show request info",
          },
          {
            fun: "showSystemInfo",
            "arg[0]": "",
            "arg[1]": "",
            example: "showSystemInfo()",
            description: "show tools info",
          },
          {
            fun: "checkProxy",
            "arg[0]": "type -- String; url",
            example: 'checkProxy("http://www.qq.com")',
            description: "checkProxy of the input url",
          },
          {
            fun: "showDecryptedInfo",
            "arg[0]": "",
            example: "showDecryptedInfo()",
            description: "show API decrypted info",
          },
          {
            fun: "cleanAppCache",
            "arg[0]": "",
            example: "cleanAppCache()",
            description: "clean application cache",
          },
          {
            fun: "cleanEngineWASM",
            "arg[0]": "",
            example: "cleanEngineWASM()",
            description: "clean engine wasm cache",
          },
          {
            fun: "setSourceMapContent",
            "arg[0]": "the source map content",
            example: "setSourceMapContent({})",
            description: "set the source map for analyze",
          },
          {
            fun: "originalPositionFor",
            "arg[0]": "line",
            "arg[1]": "column",
            example: "originalPositionFor(1, 2)",
            description: "get the origin source position",
          },
        ]);
      };
    e.exports = (e) => {
      (e.getMessageTunnelInfo = function() {
        s("getMessageTunnelInfo");
      }),
        Object.defineProperty(e, "help", {
          get: () => l,
        }),
        Object.defineProperty(e, "showRequestInfo", {
          get: () => c,
        }),
        Object.defineProperty(e, "build", {
          get: () => () => s("build"),
        }),
        Object.defineProperty(e, "preview", {
          get: () => () => s("preview"),
        }),
        Object.defineProperty(e, "upload", {
          get: () => () => s("upload"),
        }),
        Object.defineProperty(e, "openToolsLog", {
          get: () => () => s("openToolsLog"),
        }),
        Object.defineProperty(e, "openInspect", {
          get: () => () => s("openInspect"),
        }),
        Object.defineProperty(e, "openGameEngineDebugMode", {
          get: () => () => s("openGameEngineDebugMode"),
        }),
        Object.defineProperty(e, "closeGameEngineDebugMode", {
          get: () => () => s("closeGameEngineDebugMode"),
        }),
        Object.defineProperty(e, "openGameEngineAssetsInspect", {
          get: () => () => s("openGameEngineAssetsInspect"),
        }),
        Object.defineProperty(e, "openUserDataPath", {
          get: () => () => s("openUserDataPath"),
        }),
        Object.defineProperty(e, "openPlugin", {
          get: () => () => s("openPlugin"),
        }),
        Object.defineProperty(e, "openVendor", {
          get: () => () => s("openVendor"),
        }),
        Object.defineProperty(e, "openCache", {
          get: () => () => s("openCache"),
        }),
        Object.defineProperty(e, "openEngine", {
          get: () => () => s("openEngine"),
        }),
        Object.defineProperty(e, "cleanEngineWASM", {
          get: () => () => s("cleanEngineWASM"),
        }),
        Object.defineProperty(e, "openEditorCache", {
          get: () => () => s("openEditorCache"),
        }),
        Object.defineProperty(e, "showSystemInfo", {
          get: () => () => s("showSystemInfo"),
        }),
        Object.defineProperty(e, "checkProxy", {
          get: () => a,
        }),
        Object.defineProperty(e, "syncMessage", {
          get: () => () => s("syncMessage"),
        }),
        Object.defineProperty(e, "showDecryptedInfo", {
          get: () => () => s("showDecryptedInfo"),
        }),
        Object.defineProperty(e, "cleanAppCache", {
          get: () => i,
        }),
        Object.defineProperty(e, "restoreLocalData", {
          get: () => () => s("restoreLocalData"),
        }),
        Object.defineProperty(e, "setSourceMapContent", {
          get: () => (e) => s("setSourceMapContent", e),
        }),
        Object.defineProperty(e, "originalPositionFor", {
          get: () => (e, t) =>
            s("originalPositionFor", {
              line: e,
              column: t,
            }),
        }),
        o &&
          (Object.defineProperty(e, "useStaticServer", {
            get: () => (e) => s("useStaticServer", e),
          }),
          Object.defineProperty(e, "saveJSCoreSnapshot", {
            get: () => (e) => s("saveJSCoreSnapshot", e),
          }));
    };
  },
]);
