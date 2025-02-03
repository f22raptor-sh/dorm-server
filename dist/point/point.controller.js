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
exports.PointController = void 0;
const common_1 = require("@nestjs/common");
const point_service_1 = require("./point.service");
const firebase_service_1 = require("../firebase/firebase.service");
let PointController = class PointController {
    constructor(pointService, firebase) {
        this.pointService = pointService;
        this.firebase = firebase;
    }
    Point(number, except, state, score, log, res) {
        if (number == 'select all') {
            this.pointService.pointAll(state, score, log, except);
        }
        else {
            this.pointService.pointSelect(state, score, log, number);
        }
        return res.status(200);
    }
    async termReset(res) {
        await this.pointService.termReset();
        return res.status(200);
    }
    async authReset(name, res) {
        const result = await this.pointService.authReset(name);
        return res.status(result.status).json({ message: result.message });
    }
};
exports.PointController = PointController;
__decorate([
    (0, common_1.Post)('point'),
    __param(0, (0, common_1.Body)('number')),
    __param(1, (0, common_1.Body)('except')),
    __param(2, (0, common_1.Body)('state')),
    __param(3, (0, common_1.Body)('score')),
    __param(4, (0, common_1.Body)('log')),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], PointController.prototype, "Point", null);
__decorate([
    (0, common_1.Post)('reset'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PointController.prototype, "termReset", null);
__decorate([
    (0, common_1.Post)('resetpw'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PointController.prototype, "authReset", null);
exports.PointController = PointController = __decorate([
    (0, common_1.Controller)('point'),
    __metadata("design:paramtypes", [point_service_1.PointService,
        firebase_service_1.FirebaseService])
], PointController);
//# sourceMappingURL=point.controller.js.map