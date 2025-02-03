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
exports.CalenderController = void 0;
const common_1 = require("@nestjs/common");
const calender_service_1 = require("./calender.service");
const path_1 = require("path");
let CalenderController = class CalenderController {
    constructor(calenderService) {
        this.calenderService = calenderService;
    }
    calender(res) {
        const filePath = (0, path_1.join)(__dirname, '..', '..', 'public', 'calender.html');
        return res.sendFile(filePath);
    }
    Add(std_num, start_day, end_day, res) {
        this.calenderService.Adding(std_num, start_day, end_day);
        return res.status(200);
    }
};
exports.CalenderController = CalenderController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CalenderController.prototype, "calender", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)('std_num')),
    __param(1, (0, common_1.Body)('start_day')),
    __param(2, (0, common_1.Body)('end_day')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], CalenderController.prototype, "Add", null);
exports.CalenderController = CalenderController = __decorate([
    (0, common_1.Controller)('calender'),
    __metadata("design:paramtypes", [calender_service_1.CalenderService])
], CalenderController);
//# sourceMappingURL=calender.controller.js.map