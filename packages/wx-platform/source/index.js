< !DOCTYPE html >
  <html>
    <head>
      <title>小程序逻辑层</title>
      <meta http-equiv=Content-Type content="text/html; charset=utf-8">
        <meta http-equiv=Content-Security-Policy content="script-src https://localhost:* http://127.0.0.1:* 'self' 'unsafe-inline' 'unsafe-eval'">
          <script src=__dev__ /assubloader.js></script>
        <script src='/appservice/__dev__/beforebaselibready.js?t=wechat&s=1655690399944&v=d41d8cd98f00b204e9800998ecf8427e' charset="UTF-8" data-appresource></script>
        <script src='/appservice/__dev__/apihook.js?t=wechat&s=1655690399944&v=4802163d5baa69adf270b8ceceb8f319' charset="UTF-8"></script>
        <script src='/appservice/__dev__/wxconfig.js?t=wechat&s=1655690399944&v=41a6b20b61dac75d359ddddc5a4a6465' charset="UTF-8" data-appresource></script>
        <script src='/appservice/__dev__/wxconfigruntime.js?t=wechat&s=1655690399944&v=88e02a7f71feef4e0115517239491041' charset="UTF-8" data-appresource></script>
        <script src='/appservice/__dev__/devtoolsconfig.js?t=wechat&s=1655690399944&v=5c711b7129caeb45957cd2d631b88852' charset="UTF-8" data-appresource></script>
        <script>
          "undefined" != typeof __wxConfig && (__wxConfig.preload = !0),
          window.top.__global.asLoader.handleLoadStart(window)
        </script>
        <link rel="preload" href="__dev__/WAService.js?t=wechat&s=1655690399944&v=2.12.3" as="script">
          <script src="__dev__/WAService.js?t=wechat&s=1655690399944&v=2.12.3" charset="UTF-8"></script>
          <script>
            /// The code has been hidden by Wechat Devtools
          //# sourceURL=http://127.0.0.1:40708/appservice/__dev__/WAService.js?t=wechat&s=1655690399944&v=2.12.3
          </script>
          <link rel="preload" href="__dev__/wxmodule.patch.js?t=wechat&s=1655690399944&v=2.12.3" as="script">
            <script src="__dev__/wxmodule.patch.js?t=wechat&s=1655690399944&v=2.12.3" charset="UTF-8"></script>
            <script>
            /// The code has been hidden by Wechat Devtools
            //# sourceURL=http://127.0.0.1:40708/appservice/__dev__/wxmodule.patch.js?t=wechat&s=1655690399944&v=2.12.3
            </script>
            <script>
              window.__global.timing.addPoint('PUBLIB_LOADED', Date.now())
            </script>
            <!-- hackdefine -->
            <script data-preload-template="" type="application/javascript" data-is="appservice-code">
              __global.asSubLoader.loadAppResourceScripts([{
                "text": "__global.asSubLoader.collectMarkedAppResourceScripts()"
            }, {
                "text": "\n      (function () {\n        const desc = Object.getOwnPropertyDescriptor(window,'define')\n        if(!desc || !desc.writable){\n          return\n        }\n        var originDefine = window.define\n        var cacheDefineMods = []\n        var isReseted = false\n        window.define = function(modId, factory) {\n          if (isReseted) {\n            originDefine(modId, factory)\n          } else {\n            cacheDefineMods.push({\n              modId,\n              factory\n            })\n          }\n        }\n\n        window.define.isHackedByDevtool = true\n        window.define.restore = function() {\n          for (const item of cacheDefineMods) {\n            // 防止基础库把 window.__modules__ 改掉导致代码不加载\n            if (typeof window.__modules__ !== 'object' || !window.__modules__[item.modId]) {\n              define(item.modId, item.factory)\n            }\n          }\n          cacheDefineMods = []\n        }\n        window.define.reset = function() {\n          isReseted = true\n        }\n      })()\n    "
            }, {
                "src": "http://127.0.0.1:40708/appservice/env.config.js?t=wechat&s=1655690399944&v=cd437a408bcf0d2e4923be96a135a0e2",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/api/ajax.js?t=wechat&s=1655690399944&v=dc636f5a965ba245b97e16d7acdbe017",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/api/api.js?t=wechat&s=1655690399944&v=7901b93d3fafe3b131701535231f0c4c",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/api/mock-api.js?t=wechat&s=1655690399944&v=1cf6148ad6b71cb39fb39794f3d50028",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/components/sheet-filter/level-area/options.js?t=wechat&s=1655690399944&v=487fdfa7b64eaaa7af3b2d1d224ab62d",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/components/sheet-filter/subjects/options.js?t=wechat&s=1655690399944&v=c6d62a80b129058cf72f14d7d65e0218",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/images/index.js?t=wechat&s=1655690399944&v=2f7970109666ab9511913489dfcac79f",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/common/color.js?t=wechat&s=1655690399944&v=e9e059053f0716e2ae20f7711d5a6862",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/common/component.js?t=wechat&s=1655690399944&v=e054529f869a7a849435f9d543dfe33e",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/common/relation.js?t=wechat&s=1655690399944&v=7dec8c201bce9a22b237a67ea059e70c",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/common/utils.js?t=wechat&s=1655690399944&v=418dff8b615e3c052aec967cf32e6e29",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/@babel/runtime/helpers/Arrayincludes.js",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/common/validator.js?t=wechat&s=1655690399944&v=adbba74fa5b787d884f11a216e0e9bd4",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/@babel/runtime/helpers/typeof.js",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/common/version.js?t=wechat&s=1655690399944&v=b06a1c8917101341e6d089b50970d2e5",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/field/props.js?t=wechat&s=1655690399944&v=55755fd6f94abce0657a2257a8a2df70",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/mixins/basic.js?t=wechat&s=1655690399944&v=5bc74f9e0b4402faaa558df219144e3a",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/mixins/button.js?t=wechat&s=1655690399944&v=3a414cd9b379c61d3b4dd02a6e4f40a5",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/mixins/link.js?t=wechat&s=1655690399944&v=c834e4ce92a23737851284868269b295",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/mixins/page-scroll.js?t=wechat&s=1655690399944&v=4ffb8a830fc118f32f5cefd7c738a107",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/mixins/transition.js?t=wechat&s=1655690399944&v=e85e91aac2fdc4dba4262f8cf6df9677",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@vant/weapp/picker/shared.js?t=wechat&s=1655690399944&v=140067f2bb5421ea9ca84150a115feab",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@yantu/wxapp-common-v2/base64.js?t=wechat&s=1655690399944&v=a1b6bbbdcd082f5c6fc5119db9f48012",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@yantu/wxapp-common-v2/common.js?t=wechat&s=1655690399944&v=28370194f015c0c262800b6be6a0a3c0",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/@babel/runtime/helpers/objectWithoutProperties.js",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/@babel/runtime/helpers/objectSpread2.js",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@yantu/wxapp-common-v2/sensorsdata.min.js?t=wechat&s=1655690399944&v=97e73bd38df5449ddd514bb81cf89166",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/@babel/runtime/helpers/createForOfIteratorHelper.js",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@yantu/wxapp-common-v2/fission/index.js?t=wechat&s=1655690399944&v=e20bf9bdd465c0d003bd04e109090a53",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/miniprogram_npm/@yantu/wxapp-common-v2/fission/util/utils.js?t=wechat&s=1655690399944&v=59fec2ed05e93b7c38ea295c9148f152",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/pages/b-college-form/options.js?t=wechat&s=1655690399944&v=0b9aa79662f8d59211931349bce842e8",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/utils/canvas.js?t=wechat&s=1655690399944&v=23cdb5617ef2e395835a6f84f67a61fd",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/utils/config.js?t=wechat&s=1655690399944&v=0d72c469b2ee899d3c39cfb27bc3de40",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/@babel/runtime/helpers/interopRequireDefault.js",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/@babel/runtime/regenerator.js",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/@babel/runtime/helpers/asyncToGenerator.js",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/utils/mock.js?t=wechat&s=1655690399944&v=4618770d70449b21a74557468eb7dab4",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/utils/mockSdk.js?t=wechat&s=1655690399944&v=4643f567cb30297024191c0890231539",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/utils/NumberAnimate.js?t=wechat&s=1655690399944&v=8881fe22660d9157d952bbeac7ed945f",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/@babel/runtime/helpers/classCallCheck.js",
              "async": true
            }, {
                "src": "http://127.0.0.1:40708/appservice/@babel/runtime/helpers/createClass.js",
              "async": true
            }])
            </script>
            <!-- === the following are included in appresource, won't be used === -->
            <!-- extendedlib -->
            <!-- wxmlxcjs -->
            <!-- enableupdate -->
            <!-- wxappcode -->
            <!-- beforemaincodeready -->
            <!-- === end === -->
            <style>
              body {
                overflow: hidden;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: 0
            }
            </style>
          </head>
          <body></body>
        </html>
