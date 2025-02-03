"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoModule = void 0;
const common_1 = require("@nestjs/common");
const kakao_service_1 = require("./kakao.service");
const kakao_controller_1 = require("./kakao.controller");
const firebase_module_1 = require("../firebase/firebase.module");
let KakaoModule = class KakaoModule {
};
exports.KakaoModule = KakaoModule;
exports.KakaoModule = KakaoModule = __decorate([
    (0, common_1.Module)({
        imports: [firebase_module_1.FirebaseModule],
        controllers: [kakao_controller_1.KakaoController],
        providers: [kakao_service_1.KakaoService],
    })
], KakaoModule);
//# sourceMappingURL=kakao.module.js.map