"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidModule = void 0;
const common_1 = require("@nestjs/common");
const android_service_1 = require("./android.service");
const android_controller_1 = require("./android.controller");
const firebase_module_1 = require("../firebase/firebase.module");
const axios_1 = require("@nestjs/axios");
let AndroidModule = class AndroidModule {
};
exports.AndroidModule = AndroidModule;
exports.AndroidModule = AndroidModule = __decorate([
    (0, common_1.Module)({
        imports: [firebase_module_1.FirebaseModule, axios_1.HttpModule],
        controllers: [android_controller_1.AndroidController],
        providers: [android_service_1.AndroidService],
    })
], AndroidModule);
//# sourceMappingURL=android.module.js.map