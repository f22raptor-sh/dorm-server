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
exports.ListController = void 0;
const common_1 = require("@nestjs/common");
const list_service_1 = require("./list.service");
let ListController = class ListController {
    constructor(listService) {
        this.listService = listService;
    }
    async listRend() {
        const stdTemp = await this.listService.stdInfo();
        const classTemp = await this.listService.classInfo();
        return { btn_ara: classTemp, std_ara: stdTemp };
    }
    async changePoint(action, amount, std_number, res) {
        const result = await this.listService.update(action, parseFloat(amount), std_number);
        return res.status(result.status).json({ message: result.message });
    }
    async changeOut(std_number, start_day, end_day, res) {
        const result = await this.listService.out(std_number, start_day, end_day);
        return res.status(result.status).json({ message: result.message });
    }
    async showLog(std_number, res) {
        const logjson = await this.listService.log(std_number);
        res.json(logjson);
    }
};
exports.ListController = ListController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Render)('list_layout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListController.prototype, "listRend", null);
__decorate([
    (0, common_1.Post)('change'),
    __param(0, (0, common_1.Body)('action')),
    __param(1, (0, common_1.Body)('amount')),
    __param(2, (0, common_1.Body)('std_number')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "changePoint", null);
__decorate([
    (0, common_1.Post)('out'),
    __param(0, (0, common_1.Body)('std_number')),
    __param(1, (0, common_1.Body)('start_day')),
    __param(2, (0, common_1.Body)('end_day')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "changeOut", null);
__decorate([
    (0, common_1.Post)('log'),
    __param(0, (0, common_1.Body)('std_number')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "showLog", null);
exports.ListController = ListController = __decorate([
    (0, common_1.Controller)('list'),
    __metadata("design:paramtypes", [list_service_1.ListService])
], ListController);
//# sourceMappingURL=list.controller.js.map