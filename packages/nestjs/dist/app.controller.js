"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const rxjs_1 = require("rxjs");
let AppController = class AppController {
    constructor(httpService) {
        this.httpService = httpService;
        this.root = 'http://www.t.lvcang.cn';
    }
    async findAllGet(request) {
        const url = this.root + request.url;
        console.log('*************************');
        console.log('url:' + url);
        console.log('*************************');
        const get = this.httpService.get(url, {
            headers: {
                cookie: 'SessionUserKey=vcY3nLrm8NuMhodTDKaw5gxlTIat8OEra%2f6dhlop%2bG3rFoUsmCpBiMDkp3yITSS94qCPzDiAJnlqIu5sPMq5GuT%2fdkrTXkiyoO6tU9ivV1AhsyO0%2fALf6dpAYx72wkaAXDuMfj1gxU%2f2DOHtIy44wyMqv0MPxBBHoY3y7jB7WLHaY8zULEFfUBKiRTHKRlmDwYniZACYMAjhbpR%2bcDQGziKEqYgstHuWhaUc12wmPpjt6jwCH3t1Kzik1BCYcWIZce5iZkLi7vkk3Qene5hExFBR%2frh%2f69%2ffDjVAJlMbdmznYv%2fZFVpfT2xEgVm6DJfnz5ivr%2fYx1BcLEQdaSFhqwPFJxkhLmwMusKzgym%2bbcGU%3d',
            },
        });
        const { data } = await (0, rxjs_1.firstValueFrom)(get);
        return data;
    }
    async findAllPost(request, body) {
        const url = this.root + request.url;
        console.log('*************************');
        console.log('url:' + url, 'body:' + JSON.stringify(body));
        console.log('*************************');
        const post = this.httpService.post(url, body, {
            headers: {
                cookie: 'SessionUserKey=vcY3nLrm8NuMhodTDKaw5gxlTIat8OEra%2f6dhlop%2bG3rFoUsmCpBiMDkp3yITSS94qCPzDiAJnlqIu5sPMq5GuT%2fdkrTXkiyoO6tU9ivV1AhsyO0%2fALf6dpAYx72wkaAXDuMfj1gxU%2f2DOHtIy44wyMqv0MPxBBHoY3y7jB7WLHaY8zULEFfUBKiRTHKRlmDwYniZACYMAjhbpR%2bcDQGziKEqYgstHuWhaUc12wmPpjt6jwCH3t1Kzik1BCYcWIZce5iZkLi7vkk3Qene5hExFBR%2frh%2f69%2ffDjVAJlMbdmznYv%2fZFVpfT2xEgVm6DJfnz5ivr%2fYx1BcLEQdaSFhqwPFJxkhLmwMusKzgym%2bbcGU%3d',
            },
        });
        const { data } = await (0, rxjs_1.firstValueFrom)(post);
        return data;
    }
};
__decorate([
    (0, common_1.Get)('*'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findAllGet", null);
__decorate([
    (0, common_1.Post)('*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findAllPost", null);
AppController = __decorate([
    (0, common_1.Controller)('app'),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map