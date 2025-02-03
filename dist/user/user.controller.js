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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const path_1 = require("path");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async checkUser(session, name, password, res) {
        var state = await this.userService.checkuser(name, password);
        if (state === 1) {
            session.user = {
                manager_name: name,
            };
            res.render('point_layout', { display: false });
        }
        else if (state === 2) {
            session.user = {
                manager_name: 'master',
            };
            res.render('point_layout', { display: true });
        }
        else if (state === 0) {
            return res.redirect('/');
        }
        else {
            const filePath = (0, path_1.join)(__dirname, '..', '..', 'public', 'err404.html');
            return res.sendFile(filePath);
        }
    }
    checkAuth(session, res) {
        const Auth = session?.user?.manager_name;
        var state = this.userService.checkAuth(Auth);
        if (state === 1) {
            res.render('point_layout', { display: false });
        }
        else if (state === 2) {
            res.render('point_layout', { display: true });
        }
        else if (state === 0) {
            return res.redirect('/');
        }
        else {
            const filePath = (0, path_1.join)(__dirname, '..', '..', 'public', 'err404.html');
            return res.sendFile(filePath);
        }
    }
    async changePW(session, pw, res) {
        if (session.user?.manager_name) {
            const result = await this.userService.change(session.user.manager_name, pw);
            return res.status(result.status).json({ message: result.message });
        }
        else {
            const filePath = (0, path_1.join)(__dirname, '..', '..', 'public', 'err404.html');
            return res.sendFile(filePath);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('pw')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkAuth", null);
__decorate([
    (0, common_1.Post)('change'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePW", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map