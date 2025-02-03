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
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const point_module_1 = require("./point/point.module");
const list_module_1 = require("./list/list.module");
const ejs_service_1 = require("./ejs/ejs.service");
const calender_module_1 = require("./calender/calender.module");
const admin_module_1 = require("./admin/admin.module");
const kakao_module_1 = require("./kakao/kakao.module");
const android_module_1 = require("./android/android.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            point_module_1.PointModule,
            list_module_1.ListModule,
            calender_module_1.CalenderModule,
            admin_module_1.AdminModule,
            kakao_module_1.KakaoModule,
            android_module_1.AndroidModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, ejs_service_1.EjsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map