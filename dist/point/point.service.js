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
exports.PointService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
let PointService = class PointService {
    constructor(firebase) {
        this.firebase = firebase;
    }
    async pointAll(state, score, log, except) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const date = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        const day = `${year}-${month}-${date}-${hours}:${minutes}:${seconds}`;
        const except_num = except.match(/\d+/g);
        const res = await this.firebase.get('/manager/std_list');
        const std_list = res['data'];
        for (const std_number in std_list) {
            if (std_number != 'manager' &&
                (Array.isArray(except_num) ? !except_num.includes(std_number) : true)) {
                const res = await this.firebase.get('/' + std_number);
                const std_data = res['data'];
                const currentPlus = std_data['plus_point'];
                const currentMinus = std_data['minus_point'];
                let updatedValue, updatetext;
                let updates = {};
                if (state == '"상점"') {
                    updatedValue = currentPlus + parseFloat(score);
                    updatetext = '+ ' + log;
                    updates['/plus_point'] = updatedValue;
                }
                else {
                    updatedValue = currentMinus + parseFloat(score);
                    updatetext = '- ' + log;
                    updates['/minus_point'] = updatedValue;
                }
                updates[`/log/${day}`] = updatetext;
                this.firebase.update('/' + std_number, updates);
            }
        }
        return 0;
    }
    async pointSelect(state, score, log, number) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const date = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        const day = `${year}-${month}-${date}-${hours}:${minutes}:${seconds}`;
        const res = await this.firebase.get('/manager/std_list');
        const std_list = Object.keys(res['data']);
        const selected_list = number.match(/\d+/g);
        let updatedValue, updatetext;
        let updates = {};
        for (var index in selected_list) {
            const child_num = selected_list[index];
            if (std_list.includes(child_num)) {
                const res = await this.firebase.get('/' + child_num);
                const std_data = res['data'];
                const currentPlus = std_data['plus_point'];
                const currentMinus = std_data['minus_point'];
                if (state == '"상점"') {
                    updatedValue = currentPlus + parseFloat(score);
                    updatetext = '+ ' + log;
                    updates['/plus_point'] = updatedValue;
                }
                else {
                    updatedValue = currentMinus + parseFloat(score);
                    updatetext = '- ' + log;
                    updates['/minus_point'] = updatedValue;
                }
                let updateValue = currentPlus - currentMinus;
                if (updateValue <= -6) {
                    updates['/state'] = 2;
                }
                updates[`/log/${day}`] = updatetext;
                this.firebase.update('/' + child_num, updates);
            }
        }
        return 0;
    }
    async termReset() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const date = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        const day = `${year}-${month}-${date}-${hours}:${minutes}:${seconds}`;
        const res = await this.firebase.get('/manager/std_list');
        const std_list = res['data'];
        for (const std_number in std_list) {
            if (std_number != 'manager') {
                const res = await this.firebase.get('/' + std_number);
                const std_data = res['data'];
                const currentPlus = std_data['plus_point'];
                const currentMinus = std_data['minus_point'];
                const excurrentPlus = std_data['extra_plus_point'];
                const excurrentMinus = std_data['extra_minus_point'];
                let updates = {};
                let updatedValue = currentPlus - currentMinus + excurrentPlus - excurrentMinus;
                if (updatedValue > 0) {
                    updates['/extra_minus_point'] =
                        std_data['extra_minus_point'] + updatedValue;
                    updates[`/log/${day}`] =
                        '2학기 시작 상점 상쇄 (' + updatedValue + ')';
                }
                this.firebase.update('/' + std_number, updates);
            }
        }
    }
    async authReset(std_num) {
        let updates = {};
        updates[std_num] = '';
        return await this.firebase.update('/manager/std_list', updates);
    }
};
exports.PointService = PointService;
exports.PointService = PointService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], PointService);
//# sourceMappingURL=point.service.js.map