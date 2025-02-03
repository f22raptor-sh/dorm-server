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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const fs = require("fs");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async adminInfo() {
        const man_template = await this.adminService.adminInfo();
        return { manager_ara: man_template };
    }
    async adminDel(res, name) {
        const result = await this.adminService.adminDel(name);
        return res.status(result.status).json({ message: result.message });
    }
    async adminEdit(res, name, password) {
        const result = await this.adminService.adminEdit(name, password);
        return res.status(result.status).json({ message: result.message });
    }
    async pointReset(file, res) {
        const filePath = (0, path_1.join)('./uploads', file.filename);
        const result = await this.adminService.init(filePath);
        if (result.status != 200) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Failed to delete file: ${filePath}`, err);
                }
            });
            return res.status(result.status).json({ message: result.message });
        }
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${filePath}`, err);
                return res.status(500);
            }
            else {
                console.log(`File deleted: ${filePath}`);
                return res.status(200);
            }
        });
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Render)('manager_layout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminInfo", null);
__decorate([
    (0, common_1.Post)('del'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminDel", null);
__decorate([
    (0, common_1.Post)('edit'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminEdit", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const filename = `${uniqueSuffix}-${file.originalname}`;
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "pointReset", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map