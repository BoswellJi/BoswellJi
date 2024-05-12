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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const axios_1 = require("axios");
let FileController = class FileController {
    async getFile(res) {
        const { data } = await axios_1.default.request({
            method: 'get',
            url: 'https://file.40017.cn/feresource/pdf/lcfwxy.pdf',
            responseType: 'arraybuffer',
        });
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="test.pdf"',
        });
        return new common_1.StreamableFile(data);
    }
    getStaticFile() {
        const file = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), 'package.json'));
        return new common_1.StreamableFile(file);
    }
};
__decorate([
    (0, common_1.Get)('/test1'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFile", null);
__decorate([
    (0, common_1.Get)('/test2'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    (0, common_1.Header)('Content-Disposition', 'attachment; filename="package.json"'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", common_1.StreamableFile)
], FileController.prototype, "getStaticFile", null);
FileController = __decorate([
    (0, common_1.Controller)('file')
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map