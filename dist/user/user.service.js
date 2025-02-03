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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
let UserService = class UserService {
    constructor(firebase) {
        this.firebase = firebase;
    }
    async checkuser(name, pw) {
        const res = await this.firebase.get('/manager');
        const manager = res['data'];
        if (name in manager) {
            if (pw === manager[name]) {
                if (name === 'master') {
                    return 2;
                }
                else {
                    return 1;
                }
            }
            else {
                console.log(pw);
            }
        }
        else {
            console.log(name);
        }
        return 0;
    }
    checkAuth(auth) {
        if (!auth) {
            return 4;
        }
        if (auth == 'master') {
            return 2;
        }
        else {
            return 1;
        }
    }
    async change(name, pw) {
        var updates = {};
        updates[name] = pw;
        return await this.firebase.update('manager', updates);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], UserService);
//# sourceMappingURL=user.service.js.map