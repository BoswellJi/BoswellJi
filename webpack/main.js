// 定义为数组
(global["webpackJsonp"] = global["webpackJsonp"] || [])
  .push([["common/main"], {

  /***/ 0:
  /*!*****************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/main.js ***!
    \*****************************************************/
  /*! no static exports found */
  /**
   * module: module对象
   * exports: module.exports（module的一个引用
   * __webpack_require__： 模块加载方法
   */
  /***/ (function (module, exports, __webpack_require__) {

        "use strict";
  /* WEBPACK VAR INJECTION */(function (createApp) {
          __webpack_require__(/*! uni-pages */ 4); var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
          var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 5));

          var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ 50));

          var _guid = _interopRequireDefault(__webpack_require__(/*! @/utils/guid */ 28));
          var _global = __webpack_require__(/*! @/common/global.config */ 21); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } var hintModal = function hintModal() { __webpack_require__.e(/*! require.ensure | components/hint-modal2/index */ "components/hint-modal2/index").then((function () { return resolve(__webpack_require__(/*! @/components/hint-modal2/ */ 1761)); }).bind(null, __webpack_require__)).catch(__webpack_require__.oe); }; var tabBar = function tabBar() { Promise.all(/*! require.ensure | components/tab-bar/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/tab-bar/index")]).then((function () { return resolve(__webpack_require__(/*! @/components/tab-bar/ */ 1768)); }).bind(null, __webpack_require__)).catch(__webpack_require__.oe); }; var imgButton = function imgButton() { __webpack_require__.e(/*! require.ensure | components/imgButton/index */ "components/imgButton/index").then((function () { return resolve(__webpack_require__(/*! @/components/imgButton */ 1775)); }).bind(null, __webpack_require__)).catch(__webpack_require__.oe); }; var imgView = function imgView() { __webpack_require__.e(/*! require.ensure | components/imgView/index */ "components/imgView/index").then((function () { return resolve(__webpack_require__(/*! @/components/imgView */ 1782)); }).bind(null, __webpack_require__)).catch(__webpack_require__.oe); }; var imgPositionButton = function imgPositionButton() { __webpack_require__.e(/*! require.ensure | components/imgPositionButton/index */ "components/imgPositionButton/index").then((function () { return resolve(__webpack_require__(/*! @/components/imgPositionButton */ 1789)); }).bind(null, __webpack_require__)).catch(__webpack_require__.oe); }; var ccPhoneBindPopup = function ccPhoneBindPopup() { Promise.all(/*! require.ensure | components/cc-phone-bind-popup/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/cc-phone-bind-popup/index")]).then((function () { return resolve(__webpack_require__(/*! @/components/cc-phone-bind-popup/index */ 1796)); }).bind(null, __webpack_require__)).catch(__webpack_require__.oe); };











          _vue.default.config.productionTip = false;

          _App.default.mpType = 'app';

          _vue.default.prototype.$store = _store.default;
          // 事件总线,用于同级组件通信
          _vue.default.prototype.$eventBus = new _vue.default();

          _vue.default.component('hint-modal', hintModal);
          _vue.default.component('tab-bar', tabBar);
          // Vue.component('status-bar', statusBar);
          // Vue.component('cc-nav-bar', navigationBar);
          _vue.default.component('com-img-button', imgButton);
          _vue.default.component('com-img-view', imgView);
          _vue.default.component('com-img-position-button', imgPositionButton);
          _vue.default.component('cc-phone-bind-popup', ccPhoneBindPopup);

          var param = _objectSpread({
            store: _store.default
          },
            _App.default);


          var app = new _vue.default(param);

          _vue.default.mixin({
            computed: {
              theme: function theme() {
                return this.$store.getters.theme;
              },
              extConfig: function extConfig() {
                return _global.extConfig;
              },
              isMpUserAuth: function isMpUserAuth() {
                return !!this.$store.getters.isMpUserAuth;
              }
            },

            created: function created() {

            },
            onLoad: function onLoad(options) {
              var page = this.$mp.page || {};
              Object.assign(page, { '_uniqueId_': "".concat((0, _guid.default)(), ",").concat(Date.now()), records: [] });

              if (page.onShareAppMessage) {
                var onShareAppMessage = page.onShareAppMessage;
                var onMpShareSPM = this.onMpShareSPM;
                page.onShareAppMessage = function () {
                  onMpShareSPM.apply(this, arguments);
                  return onShareAppMessage.apply(this, arguments);
                };
              }

            },
            onShow: function onShow() {














              var page = this.$mp.page || {};
              page.records.push(13803);

              this.$app.SPM({
                unique: page._uniqueId_,
                spm: '2.22.489.1',
                ot: 13803,
                records: page.records,
                path: page.route,
                param: JSON.stringify(page.options),
                btime: new Date()
              });


            },
            onHide: function onHide() {
              var page = this.$mp.page || {};
              page.records.push(13807);
              this.$app.SPM({
                unique: page._uniqueId_,
                spm: '2.22.489.1',
                ot: 13807,
                records: page.records,
                path: page.route,
                param: JSON.stringify(page.options),
                etime: new Date()
              });

            },
            onUnload: function onUnload() {
              var page = this.$mp.page || {};
              page.records.push(13808);
              this.$app.SPM({
                unique: page._uniqueId_,
                spm: '2.22.489.1',
                ot: 13808,
                records: page.records,
                path: page.route,
                param: JSON.stringify(page.options),
                etime: new Date()
              });

            },
            methods: {
              stopMove: function stopMove() { },
              formSubmit: function formSubmit(e) {
                this.$app.collectFormId(e.detail.formId);
              },

              onMpShareSPM: function onMpShareSPM(e) {
                var page = this.$mp.page || {};
                page.records.push(13804);

                var path = page.route;
                var param = page.options;
                if (e.from === 'menu' && e.webViewUrl) {
                  Object.assign(param, { webViewUrl: e.webViewUrl });
                }

                this.$app.SPM({
                  unique: page._uniqueId_,
                  spm: '2.22.489.1',
                  ot: 13804,
                  records: page.records,
                  path: path,
                  param: JSON.stringify(param)
                });

              }
            }
          });






          createApp(app).$mount();
          /* WEBPACK VAR INJECTION */
        }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

        /***/
      }),

  /***/ 47:
  /*!**************************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/App.vue?vue&type=style&index=0&lang=css& ***!
    \**************************************************************************************/
  /*! no static exports found */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _D_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */ 48);
  /* harmony import */ var _D_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
  /* harmony reexport (unknown) */ for (var __WEBPACK_IMPORT_KEY__ in _D_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if (__WEBPACK_IMPORT_KEY__ !== 'default') (function (key) { __webpack_require__.d(__webpack_exports__, key, function () { return _D_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
   /* harmony default export */ __webpack_exports__["default"] = (_D_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a);

        /***/
      }),

  /***/ 48:
  /*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
    !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/projects/suprise-cat-shop/meowshop/App.vue?vue&type=style&index=0&lang=css& ***!
    \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

        // extracted by mini-css-extract-plugin
        if (false) { var cssReload; }


        /***/
      }),

  /***/ 5:
  /*!*****************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/App.vue ***!
    \*****************************************************/
  /*! no static exports found */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 6);
  /* harmony reexport (unknown) */ for (var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if (__WEBPACK_IMPORT_KEY__ !== 'default') (function (key) { __webpack_require__.d(__webpack_exports__, key, function () { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
  /* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ 47);
  /* harmony import */ var _D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 49);
        var render, staticRenderFns, recyclableRender, components
        var renderjs





        /* normalize component */

        var component = Object(_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
          _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
          render,
          staticRenderFns,
          false,
          null,
          null,
          null,
          false,
          components,
          renderjs
        )

        component.options.__file = "App.vue"
  /* harmony default export */ __webpack_exports__["default"] = (component.exports);

        /***/
      }),

  /***/ 6:
  /*!******************************************************************************!*\
    !*** E:/projects/suprise-cat-shop/meowshop/App.vue?vue&type=script&lang=js& ***!
    \******************************************************************************/
  /*! no static exports found */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _D_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 7);
  /* harmony import */ var _D_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
  /* harmony reexport (unknown) */ for (var __WEBPACK_IMPORT_KEY__ in _D_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if (__WEBPACK_IMPORT_KEY__ !== 'default') (function (key) { __webpack_require__.d(__webpack_exports__, key, function () { return _D_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
   /* harmony default export */ __webpack_exports__["default"] = (_D_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a);

        /***/
      }),

  /***/ 7:
  /*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
    !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/projects/suprise-cat-shop/meowshop/App.vue?vue&type=script&lang=js& ***!
    \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

        "use strict";
  /* WEBPACK VAR INJECTION */(function (uni) {
          Object.defineProperty(exports, "__esModule", { value: true }); exports.default = void 0;
          var _vuex = __webpack_require__(/*! vuex */ 8);

          var _loginResult = _interopRequireDefault(__webpack_require__(/*! @/common/login-result */ 9));
          var _shopInfoResult = _interopRequireDefault(__webpack_require__(/*! @/common/shop-info-result */ 10));
          var _request = _interopRequireDefault(__webpack_require__(/*! @/common/request */ 11));
          var _request2 = _interopRequireDefault(__webpack_require__(/*! @/common/request2 */ 22));
          var _update = _interopRequireDefault(__webpack_require__(/*! @/common/update */ 31));
          var _getShare = _interopRequireDefault(__webpack_require__(/*! @/common/get-share */ 32));
          var _getUserInfo = _interopRequireDefault(__webpack_require__(/*! @/common/get-user-info */ 30));
          var _url = _interopRequireDefault(__webpack_require__(/*! @/common/url */ 19));
          var _collectFormId = _interopRequireDefault(__webpack_require__(/*! @/common/collect-form-id */ 33));
          var _handlerShare = _interopRequireDefault(__webpack_require__(/*! @/common/handler-share */ 34));
          var _sceneHandler = _interopRequireDefault(__webpack_require__(/*! @/common/scene-handler */ 29));








          var _pay = _interopRequireDefault(__webpack_require__(/*! @/common/pay */ 35));
          var _payExternal = _interopRequireDefault(__webpack_require__(/*! @/common/pay-external */ 36));
          var _chooseAddress = _interopRequireDefault(__webpack_require__(/*! @/common/choose-address */ 37));
          var _chooseStoreAddress = _interopRequireDefault(__webpack_require__(/*! @/common/choose-store-address */ 38));
          var _bindPhone = _interopRequireDefault(__webpack_require__(/*! @/common/bind-phone */ 39));

          var _global = __webpack_require__(/*! @/common/global.config */ 21);

          var _mta = _interopRequireWildcard(__webpack_require__(/*! @/common/mta */ 23));
          var _visitorRecord = _interopRequireDefault(__webpack_require__(/*! @/common/visitor-record */ 40));
          var _loginRecord = _interopRequireDefault(__webpack_require__(/*! @/common/login-record */ 41));
          var _shareRecord = _interopRequireDefault(__webpack_require__(/*! @/common/share-record */ 42));
          var _genQrCode = _interopRequireDefault(__webpack_require__(/*! @/common/gen-qr-code */ 43));

          var _albumAuth = _interopRequireDefault(__webpack_require__(/*! @/common/album-auth */ 44));



          var _util = __webpack_require__(/*! @/utils/util */ 45);
          var _debounce = _interopRequireDefault(__webpack_require__(/*! @/utils/debounce */ 46)); function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; } function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); } function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); } function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; } function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; } function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; } function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } var cryptHelper = __webpack_require__(/*! @/utils/crypt-helper.js */ 12); var _default =



          {
            data: function data() {
              return {
                globalData: {},
                projectCode: _global.projectCode,
                mta: _mta.default,
                extConfig: _global.extConfig,
                jPushMessage: { needProcess: false, page: '' }
              };

            },
            onLaunch: function onLaunch(e) {
              var _this = this;
              var self = this;
              Object.defineProperty(this.__proto__, '$app', {
                get: function get() {
                  return self;
                }
              });


              this.network();

              this.setScene(e.scene);
              Object.assign(e.query, this.sceneHandler(e.query.scene));


              uni.getSystemInfo({
                success: function success(res) {
                  _this.setSystemInfo(res);
                }
              });


































              Object.defineProperties(this.globalData, {
                indexShare: {
                  value: {}
                },

                indexShare2: {
                  value: {}
                },

                hasToken: {
                  get: function get() {
                    return self.$store.state.hasToken;
                  }
                },

                systemInfo: {
                  get: function get() {
                    return self.$store.state.systemInfo;
                  }
                },

                version: {
                  get: function get() {
                    return self.$store.state.version;
                  }
                },

                device: {
                  get: function get() {
                    return self.$store.state.device;
                  }
                },

                tickInterval: {
                  value: setInterval(function () {
                    uni.$emit('TICK', Date.now());
                  }, 999),
                  writable: false
                }
              });


              // 店主三联

              uni.removeStorageSync('ShopInfoDone');
              uni.removeStorageSync("sto_taobao_force_auth_hint_igore"); //移除淘宝强制授权-页面-忽略标记

              this.login('', e);
              this.getIsShopOwner();
              this.getIndexShare();
















              this.setDateFormat();
              uni.removeStorageSync('NotificationHint');
              _loginRecord.default.call(this);
              uni.hideTabBar();




















              uni.$once('RELOGIN', this.login.bind(this));

            },
            onShow: function onShow(e) {
              try {
                console.log('app onSHow', e);
























                Object.assign(e.query, this.sceneHandler(e.query.scene));
                // 现将分享参数存入缓存，后期在首页jump.js里做统一处理跳转逻辑
                if (e.query.id !== undefined && e.query.t !== undefined ||
                  e.query.sn) {
                  var query = '';
                  try {
                    query = e.query.data && JSON.parse(decodeURIComponent(e.query.data)); //其他信息
                  } catch (ex) {
                    (0, _mta.except)({
                      level: 1,
                      message: "".concat(e.query.data, "\r\n").concat(ex.message, "\r\n").concat(ex.stack)
                    });

                    console.error(ex);
                  }
                  uni.setStorageSync('jump', {
                    scene: e.scene,
                    id: e.query.id, //游戏id
                    t: e.query.t, //游戏类型
                    dt: e.query.dt, //从收银台跳转过来时候的订单号
                    tk: e.query.tk, //分享人的token
                    sk: e.query.sk,
                    pk: e.query.pk,
                    sn: e.query.sn,
                    spm: e.query.spm,
                    isShowoff: e.query.isShowoff || "false", //是不是从炫耀一下分享
                    data: query,
                    roomid: e.query.roomid
                  });

                  // 店主三联
                  uni.removeStorageSync('ShopInfoDone');
                }

                (0, _update.default)();



                !this.extConfig.extAble && this.liverParamHandler(e);

                this.SPM({
                  spm: '2.22.489.1',
                  ot: 13801,
                  btime: new Date()
                });

              } catch (ex) {
                if (typeof ex === 'object') {
                  ex.message = "".concat(ex.message, "\r\n").concat(JSON.stringify(e));
                }
                (0, _mta.except)(ex);
              }
            },
            onHide: function onHide() {
              console.log('app hide');
              this.SPM({
                spm: '2.22.489.1',
                ot: 13802,
                etime: new Date()
              });

            },
            methods: _objectSpread({
              sendCoupon: (0, _debounce.default)(function () {
                var _this2 = this;
                var copyValue;
                try {
                  copyValue = JSON.parse(uni.getStorageSync("copyValue")) || [];
                }
                catch (e) {
                  copyValue = [];
                }
                var AppLogin_Valid = uni.getStorageSync("AppLogin_Valid");
                var token = uni.getStorageSync('token');
                uni.getClipboardData({
                  success: function success(res) {
                    console.log(res.data);
                    if (res.data != '') {
                      if (copyValue.indexOf(res.data) > -1) {
                        return;
                      }
                      var value = res.data;
                      try {
                        _this2.request2({
                          url: 'api/UnionService/GetGoodsByClipboard',
                          mode: 'normal4',
                          data: {
                            Content: res.data
                          },

                          success: function success(res) {
                            if (token || AppLogin_Valid == "OWNER") {
                              uni.$emit('showSearchCoupon', { title: value, type: res.Type });
                            }
                            _this2.clearText();
                            uni.removeStorageSync("copyValue");
                          },
                          down: function down() {
                            reject('business');
                          },
                          fail: function fail() {
                            uni.$emit('showSearchCoupon', { title: value, type: 0 });
                          }
                        });

                      }
                      catch (e) {
                        uni.$emit('showSearchCoupon', { title: value, type: 0 });
                      }
                    }
                  }
                });

              }, 500),
              setCopyValues: function setCopyValues(data) {
                var copyValue;
                try {
                  copyValue = JSON.parse(uni.getStorageSync("copyValue")) || [];
                }
                catch (e) {
                  copyValue = [];
                }
                copyValue.push(data);
                uni.setStorageSync("copyValue", JSON.stringify(copyValue));
              },
              clearText: function clearText() {
                if (uni.getSystemInfoSync().platform == 'android') {
                  var Context = plus.android.importClass("android.content.Context");
                  var main = plus.android.runtimeMainActivity();
                  var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
                  plus.android.invoke(clip, "setText", "");
                  uni.getClipboardData({
                    success: function success(res) {
                      console.log("清除后剪切板：" + res.data);
                    }
                  });

                } else {
                  //ios 清空粘贴板
                  try {
                    var HBXBridge = plus.ios.import("HBXBridge");
                    var BridgeObj = HBXBridge.sharedSingleton();
                    BridgeObj.setUIPasteboardString("");
                  } catch (e) {
                    //TODO handle the exception
                  }
                }
              },
              /**
                  * 网络处理
                  */
              network: function network() {
                var _this3 = this;
                uni.getNetworkType({
                  success: function success(res) {
                    if (res.networkType == 'none') {
                      _this3.$store.commit('setConnected', false);
                    } else {
                      _this3.$store.commit('setConnected', true);
                    }
                  }
                });


                uni.onNetworkStatusChange(
                  (0, _debounce.default)(function (res) {
                    if (!res.isConnected) {
                      _this3.$store.commit('setConnected', false);
                    } else {
                      _this3.$store.commit('setConnected', true);
                    }
                  }, 1000));

              },

              //日期格式化函数
              setDateFormat: function setDateFormat() {
                Date.prototype.format = function (fmt) {
                  //author: meizz
                  var o = {
                    'M+': this.getMonth() + 1, //月份
                    'd+': this.getDate(), //日
                    'h+': this.getHours(), //小时
                    'm+': this.getMinutes(), //分
                    's+': this.getSeconds(), //秒
                    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
                    S: this.getMilliseconds() //毫秒
                  };
                  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)); }
                  return fmt;
                };
              },
              /**
                  * APP登录验证
                  * @returns {Promise} 结果
                  */

              checkLogin: function checkLogin() {

                // 登录过期时间
                var loginExpiration = 15;
                var hasToken = uni.getStorageSync('hasToken');
                var token = uni.getStorageSync('token'); var _token$LastModified =
                  token.LastModified, LastModified = _token$LastModified === void 0 ? '' : _token$LastModified;

                if (new Date(LastModified.replace(/-/g, '/')).getTime() + loginExpiration * 24 * 60 * 60 * 1000 >= Date.now()) {
                  token.LastModified = (0, _util.dateFormat)(new Date(), 'yyyy-MM-dd hh:mm:ss');
                  this.hasToken(true);
                  this.setToken(token);

                  return Promise.resolve(true);
                } else {
                  this.hasToken(false);
                  this.setToken({});
                  return Promise.resolve(false);
                }




              },

              /**
                  * 微信登陆
                  * @param {Function} cb 回调
                  * @param {Object} e 小程序launch参数
                  */
              login: function login(
                cb) {
                var _this4 = this; var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { query: {} };
                uni.setStorageSync('hasToken', true);
                var t = uni.getStorageSync('token');
                if (t && Object.keys(t).length) {
                  this.setToken(t);
                }

                uni.login({
                  success: function success(res) {
                    var
                      errMsg = res.errMsg, code = res.code;
                    uni.request({
                      url: "".concat(_url.default.normal3, "api/MemberLogin/MemberLoginEx"),
                      method: 'POST',
                      data: {
                        code: res.code,
                        LoginType: _global.projectCode,
                        Spm: e.query && e.query.id && e.query.id === 'perseverance' && !e.query.spm ? '4.16.18.1' : e.query.spm || '',
                        SceneId: e.scene,
                        projectCode: _global.projectCode,
                        PlatformCode: _global.platform
                      },

                      success: function success(_ref) {
                        var data = _ref.data;
                        // this.initMTA();
                        if (data.ResultCode === 1) {
                          var
                            Body = data.Body;
                          var token = {
                            MemberId: Body.MemberId || -1,
                            PostKey: Body.PostKey,
                            Secretkey: Body.Secretkey,
                            TokenKey: Body.TokenKey,
                            OpenId: Body.OpenId || '-1',
                            UnionID: Body.UnionID,
                            IsNewMember: Body.IsNewMember,
                            HeadImage: Body.HeadImage,
                            NickName: Body.NickName,
                            UserPhone: Body.UserPhone,
                            RelationId: Body.RelationId,
                            POPAccountID: Body.POPAccountID,
                            POPSupplierID: Body.POPSupplierID,
                            UniqueCode: Body.UniqueCode,
                            BaseTimeStamp: Body.BaseTimeStamp
                          };

                          if (!Body.HeadImage) {
                            delete token.HeadImage;
                          }
                          if (!Body.NickName) {
                            delete token.NickName;
                          }
                          if (!Body.UserPhone) {
                            delete token.UserPhone;
                          }
                          // token.NickName = ''; // TODO: user delete
                          // token.HeadImage = ''; // TODO: user delete
                          // token.UserPhone = ''; // TODO: user delete
                          // token.UnionID = ''; // TODO: user delete

                          var _t = _objectSpread({
                            HeadImage: '',
                            NickName: '',
                            UserPhone: ''
                          },
                            _this4.$store.state.token, {},
                            token);


                          _this4.setToken(_t);
                          _this4.hasToken(true);
                          _this4.$store.dispatch('getUserInfo');

                          typeof cb === 'function' && cb.call(_this4, _t);
                        } else if (data.ResultCode === 3) {
                          uni.clearStorageSync('token');
                        }
                      }
                    });

                  },
                  fail: function fail(err) {
                    console.error(err);
                  }
                });

              },




































              /**
                  * 验证微信登录是否过期
                  */
              checkMPLogin: function checkMPLogin() {
                var _this5 = this;

                return new Promise(function (resolve, reject) {
                  uni.checkSession({
                    fail: function fail() {
                      uni.showModal({
                        title: "提示",
                        content: "您的登录已过期，请重新登陆",
                        showCancel: false,
                        confirmText: "立即登录",
                        success: function success() {
                          uni.removeStorageSync("ShopkeeperLoginID");
                          uni.removeStorageSync("ShopID");
                          uni.removeStorageSync("ShopInfoDone");
                          uni.removeStorageSync("token");

                          _this5.reLaunch();
                          _this5.login();
                        }
                      });

                      reject();
                    },
                    success: function success() {
                      resolve();
                    }
                  });

                });

                return Promise.resolve();
              },
              reMPLogin: function reMPLogin() {

                this.login();

              },
              getIsShopOwner: function getIsShopOwner() {
                var _this6 = this;
                return new Promise(function (resolve) {
                  _this6.request2({
                    url: 'api/MeowStore/GetUserInfo',
                    mode: 'normal5',
                    success: function success(res) {
                      _this6.setShopOwner(false);
                      uni.setStorageSync("AppLogin_Valid", "CUSTOMER");
                      (res.RoleTypes || []).forEach(function (v, i) {
                        if (v == 2) {
                          _this6.setShopOwner(true);
                          uni.setStorageSync("AppLogin_Valid", "OWNER");
                        }
                      });
                    },
                    complete: function complete() {
                      resolve();
                    }
                  });

                });
              },
              /**
                  * 获取首页分享文案和图片
                  */
              getIndexShare: function getIndexShare() {
                var _this7 = this;
                this.getShare([20190702001, 20190814002]).then(function () {
                  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [], _ref3 = _slicedToArray(_ref2, 2), res = _ref3[0], res2 = _ref3[1];
                  console.log("share!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", res, res2, _this7.globalData);
                  if (res) {
                    var
                      ShareTitle = res.ShareTitle, SharePicUrl = res.SharePicUrl; var

                        indexShare = _this7.globalData.indexShare;

                    indexShare.title = ShareTitle;
                    indexShare.img = SharePicUrl;
                  }
                  if (res2) {
                    var
                      _ShareTitle = res2.ShareTitle, _SharePicUrl = res2.SharePicUrl; var

                        indexShare2 = _this7.globalData.indexShare2;

                    indexShare2.title = _ShareTitle;
                    indexShare2.img = _SharePicUrl;
                  }
                });
              },
              /**
                  * toast
                  */
              showToast: function showToast(text, res) {
                uni.hideLoading();
                uni.hideToast();
                if (text) {
                  if (text.length > 7) {
                    return new Promise(function (resolve) {
                      uni.showModal({
                        title: '提示',
                        content: text,
                        showCancel: false,
                        confirmColor: '#333',
                        success: function success(res) {
                          resolve();
                        }
                      });

                    });
                  } else {
                    uni.showToast({
                      title: text,
                      image: '/static/img/wrong.png',
                      duration: 2000
                    });

                  }
                }
                res && console.log(res);
              },
              /**可以使用then()catch()
                  * 根据页面名字在导航栈查询，找到返回page的对象，可以通过该对象直接调用函数 和index，index用户 delt 回退层级
                  */
              findPageInNavigation: function findPageInNavigation(pagename) {
                return new Promise(function (resolve, reject) {
                  var pos = -1;
                  var thePage = null;
                  var pages = getCurrentPages(); // 当前页面
                  for (var i = 0; i < pages.length; i++) {
                    var page = pages[i];
                    // page.route = pages/orderRefund/orderRefundEdit/orderRefundEdit
                    var pathArray = page.route.split('/');
                    var lastpage = '';
                    if (pathArray.length > 0) {
                      lastpage = pathArray[pathArray.length - 1];
                    }
                    if (lastpage == pagename) {
                      pos = i;
                      thePage = page;
                      break;
                    }
                  }
                  if (thePage) {
                    var delt = pages.length - 1 - pos;
                    thePage.delt = delt;
                  }
                  resolve(thePage);
                });
              },

              /**
                  * 关闭所有页面, 打开到应用内的某个页面
                  */
              reLaunch: function reLaunch() {
                uni.reLaunch({
                  url: '/pages/index/index'
                });

              },
              /**
                  * 店主id
                  */
              switchShop: function switchShop(shopMemberId, shopId) {
                var _this8 = this; var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}, _ref4$record = _ref4.record, record = _ref4$record === void 0 ? true : _ref4$record;
                uni.setStorageSync('ShopkeeperLoginID', shopMemberId);
                uni.setStorageSync('ShopID', shopId);
                this.getVipInfo().then(function () {
                  if (record) {
                    var token = uni.getStorageSync('token');
                    _this8.visitorRecord({
                      ShopkeeperLoginID: shopMemberId,
                      SharedLoginID: token.MemberId,
                      SharedCode: 'SwitchShop' + Date.now()
                    });

                    _loginRecord.default.call(_this8); // 切换回开会员的店铺(加登陆日志)
                  }
                  return _this8.getVipShopInfo();
                });
              },
              /**
                  * @param {Object} item 分享内容
                  */
              shareInfo: function shareInfo() {
                var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-1'; var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ''; var isShowoff = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false; var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
                var t = type; //777销售注册 888店主注册

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
                var token = uni.getStorageSync('token');
                var shareUrl = "".concat(item.ShareLinkUrl, "&id=").concat(id, "&t=").concat(t, "&data=").concat(d);






                console.log('===ShareInfo===', shareUrl);
                return {
                  title: item.ShareTitle,
                  path: shareUrl,
                  imageUrl: item.SharePicUrl
                };




              },
              // app 增加淘宝强制授权 有效期
              getTBAuthStatus: function getTBAuthStatus() {
                var _this9 = this;
                return new Promise(function (resolve, reject) {
                  _this9.$app.request2({
                    url: "api/Customer/GetCustomerStatus",
                    mode: "normal4",
                    data: {},

                    success: function success(res) {
                      // res = {HasApp: false,IsShopKeeper: true,TBAuthed: false,AppNotice:0 ,TBNotice:2}   //测试    //1-强制|2-提示|0-忽略
                      resolve(res);
                    },
                    down: function down(res) {
                      console.log("GetCustomerStatus=", res);
                      reject();
                    },
                    fail: function fail() {
                      reject();
                    }
                  });

                });
              },
              // 动态获取H5分享 域名，有人说微信中使用淘宝会 被微信封域名
              getShareDomain: function getShareDomain() {
                var _this10 = this;
                return new Promise(function (resolve) {
                  _this10.request2({
                    url: 'api/MeowStore/GetShareDomain',
                    mode: 'normal5',
                    success: function success(data) {
                      _url.default.h5share = data;
                      console.log("url.h5share=", _url.default.h5share);
                    },
                    complete: function complete() {
                      resolve();
                    }
                  });

                });
              },
































              getCurrentPage: function getCurrentPage() {
                try {
                  var pages = getCurrentPages();
                  var path = pages.slice(-1)[0].route;
                  console.log(path);
                  return path;
                } catch (e) {
                  //TODO handle the exception
                  console.log('get current page', err);
                }
              },

              /**
                  * 直播参数处理
                  */
              liverParamHandler: function liverParamHandler(options) {
                var _this11 = this;

                var livePlayer = requirePlugin('live-player-plugin');

                // 分享卡片入口场景才调用getShareParams接口获取以下参数
                if (options.path && options.path.indexOf('live-player-plugin') > -1 &&
                  options.scene == 1007 || options.scene == 1008 || options.scene == 1044 || options.scene == 1014) {// 增加1014小程序模板消息(加登陆日志)
                  console.log('小程序直播options', options);
                  livePlayer.getShareParams().
                    then(function (res) {
                      console.log('小程序直播param', res);
                      var shareOpenId = res.share_openid;
                      var token = uni.getStorageSync('token');
                      _this11.request2({
                        url: 'api/MeowStore/GetShopInfoForLive',
                        mode: 'normal5',
                        data: {
                          ShareOpenId: shareOpenId,
                          EnterLoginId: token.MemberId
                        },

                        success: function success(res) {
                          var

                            ShopkeeperLoginID =

                              res.ShopkeeperLoginID, ShopID = res.ShopID;
                          uni.setStorageSync('ShopkeeperLoginID', ShopkeeperLoginID);
                          uni.setStorageSync('ShopID', ShopID);

                          uni.setStorageSync('ShopInfoDone', true);
                          _this11.$store.dispatch('getShopInfo').then(function (res) {
                            _this11.visitorRecord({
                              ShopkeeperLoginID: res.ShopkeeperLoginID,
                              ShopID: res.ShopID
                            });

                            _loginRecord.default.call(_this11); // 订阅消息、小程序直播，根据分享参数进店(加登陆日志)
                          }).catch(function (ex) {
                            _this11.except("\u5C0F\u7A0B\u5E8F\u76F4\u64AD\r\n".concat(JSON.stringify(ex)));
                          });
                        },
                        fail: function fail() {

                        }
                      });

                    }).catch(function (err) {
                      console.log('get share params', err);
                    });
                }
              },

              loginResultPromise: _loginResult.default,
              shopInfoPromise: _shopInfoResult.default,
              request: _request.default,
              request2: _request2.default,
              sceneHandler: _sceneHandler.default,
              getShare: _getShare.default,
              getUserInfo: _getUserInfo.default,
              checkUpdate: _update.default,
              SPM: _mta.SPM,
              except: _mta.except,
              collectFormId: _collectFormId.default,
              handlerShare: _handlerShare.default,

              pay: _pay.default,
              payexternal: _payExternal.default,
              chooseAddress: _chooseAddress.default,
              chooseStoreAddress: _chooseStoreAddress.default,
              bindPhone: _bindPhone.default,

              visitorRecord: _visitorRecord.default,
              shareRecord: _shareRecord.default,
              genQRCode: _genQrCode.default,

              albumAuth: _albumAuth.default
            },






              (0, _vuex.mapActions)(['getVipInfo', 'getVipShopInfo']), {},
              (0, _vuex.mapMutations)(['setToken', 'hasToken', 'setScene', 'setSystemInfo', 'setVersion', 'setDevice', 'setPushClientInfo', 'setShopOwner'])),

            onError: function onError(msg) {
              this.except(msg, 'global', 2);
              console.error(msg);
            }
          }; exports.default = _default;
          /* WEBPACK VAR INJECTION */
        }.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

        /***/
      })

  }, [[0, "common/runtime", "common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map


global.webpackJsonp = [
  [
    // 入口模块
    ["common/main"],
    // 用户模块
    {
      1: (function () { })
    },
    // 公共模块
    [[0, "common/runtime", "common/vendor"]]
  ]
];