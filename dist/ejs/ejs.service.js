"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EjsService = void 0;
const common_1 = require("@nestjs/common");
const ejs_1 = require("ejs");
const path_1 = require("path");
let EjsService = class EjsService {
    async render(templateName, data) {
        const filePath = (0, path_1.join)(__dirname, '..', '..', 'views', `${templateName}.ejs`);
        return new Promise((resolve, reject) => {
            (0, ejs_1.renderFile)(filePath, data, (err, html) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(html);
                }
            });
        });
    }
};
exports.EjsService = EjsService;
exports.EjsService = EjsService = __decorate([
    (0, common_1.Injectable)()
], EjsService);
//# sourceMappingURL=ejs.service.js.map