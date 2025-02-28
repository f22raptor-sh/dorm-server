"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListModule = void 0;
const common_1 = require("@nestjs/common");
const list_service_1 = require("./list.service");
const list_controller_1 = require("./list.controller");
const firebase_module_1 = require("../firebase/firebase.module");
const ejs_service_1 = require("../ejs/ejs.service");
const calender_module_1 = require("../calender/calender.module");
let ListModule = class ListModule {
};
exports.ListModule = ListModule;
exports.ListModule = ListModule = __decorate([
    (0, common_1.Module)({
        imports: [firebase_module_1.FirebaseModule, calender_module_1.CalenderModule],
        controllers: [list_controller_1.ListController],
        providers: [list_service_1.ListService, ejs_service_1.EjsService],
    })
], ListModule);
//# sourceMappingURL=list.module.js.map