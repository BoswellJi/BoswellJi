"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const file_controller_1 = require("./file.controller");
const axios_1 = require("@nestjs/axios");
const server_controller_1 = require("./server.controller");
function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('test22');
        }, 1000);
    });
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [app_controller_1.AppController, file_controller_1.FileController, server_controller_1.ServerController],
        providers: [
            {
                provide: 'ASYNC_CONNECTION',
                useFactory: async () => {
                    const data = await sleep();
                    return data;
                },
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map