"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalenderModule = void 0;
const common_1 = require("@nestjs/common");
const calender_service_1 = require("./calender.service");
const calender_controller_1 = require("./calender.controller");
let CalenderModule = class CalenderModule {
};
exports.CalenderModule = CalenderModule;
exports.CalenderModule = CalenderModule = __decorate([
    (0, common_1.Module)({
        controllers: [calender_controller_1.CalenderController],
        providers: [calender_service_1.CalenderService],
    })
], CalenderModule);
//# sourceMappingURL=calender.module.js.map