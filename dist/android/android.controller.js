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
exports.AndroidController = void 0;
const common_1 = require("@nestjs/common");
const android_service_1 = require("./android.service");
let AndroidController = class AndroidController {
    constructor(androidService) {
        this.androidService = androidService;
    }
    async stdData(number) {
        return await this.androidService.data(number);
    }
    async foodData() {
        return await this.androidService.food();
    }
    async timdData(room) {
        return await this.androidService.time(room);
    }
};
exports.AndroidController = AndroidController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AndroidController.prototype, "stdData", null);
__decorate([
    (0, common_1.Get)('food'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AndroidController.prototype, "foodData", null);
__decorate([
    (0, common_1.Get)('time'),
    __param(0, (0, common_1.Query)('room')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AndroidController.prototype, "timdData", null);
exports.AndroidController = AndroidController = __decorate([
    (0, common_1.Controller)('android'),
    __metadata("design:paramtypes", [android_service_1.AndroidService])
], AndroidController);
//# sourceMappingURL=android.controller.js.map