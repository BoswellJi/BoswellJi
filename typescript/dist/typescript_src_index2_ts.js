/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcomputer_science"] = self["webpackChunkcomputer_science"] || []).push([["typescript_src_index2_ts"],{

/***/ "./typescript/src/index2.ts":
/*!**********************************!*\
  !*** ./typescript/src/index2.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ \"./node_modules/inversify/lib/inversify.js\");\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reflect-metadata */ \"./node_modules/reflect-metadata/Reflect.js\");\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_1__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (undefined && undefined.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\n\r\n\r\nvar TYPES = {\r\n    Katana: Symbol.for(\"Katana\"),\r\n    Shuriken: Symbol.for(\"Shuriken\"),\r\n};\r\nvar Katana = /** @class */ (function () {\r\n    function Katana() {\r\n    }\r\n    Katana.prototype.hit = function () {\r\n        console.log('cut');\r\n        return \"cut!\";\r\n    };\r\n    Katana = __decorate([\r\n        (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()\r\n    ], Katana);\r\n    return Katana;\r\n}());\r\nvar Shuriken = /** @class */ (function () {\r\n    function Shuriken(katana, katana2) {\r\n        this.katana = katana;\r\n        this.katana2 = katana2;\r\n    }\r\n    Shuriken.prototype.throw = function () {\r\n        return \"hit!\";\r\n    };\r\n    Shuriken = __decorate([\r\n        (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(),\r\n        __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)(TYPES.Katana)),\r\n        __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)(TYPES.Katana)),\r\n        __metadata(\"design:paramtypes\", [Katana,\r\n            Katana])\r\n    ], Shuriken);\r\n    return Shuriken;\r\n}());\r\n/**\r\n * ioc容器：\r\n *\r\n * 1. 将所有类都注入到容器中，作为依赖使用\r\n */\r\nvar myContainer = new inversify__WEBPACK_IMPORTED_MODULE_0__.Container();\r\nmyContainer.bind(TYPES.Shuriken).to(Shuriken);\r\nmyContainer.bind(TYPES.Katana).to(Katana);\r\n/**\r\n * 从容器中获取到指定token的依赖的实例\r\n */\r\nvar shuriken = myContainer.get(TYPES.Shuriken);\r\nshuriken.katana.hit();\r\nvar Test = /** @class */ (function () {\r\n    function Test() {\r\n    }\r\n    return Test;\r\n}());\r\nconsole.log(Reflect.getMetadataKeys(Test));\r\n\n\n//# sourceURL=webpack://computer-science/./typescript/src/index2.ts?");

/***/ })

}]);