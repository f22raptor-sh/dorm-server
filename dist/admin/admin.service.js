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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const ejs_service_1 = require("../ejs/ejs.service");
const xlsx = require("xlsx");
let AdminService = class AdminService {
    constructor(firebase, ejs) {
        this.firebase = firebase;
        this.ejs = ejs;
    }
    async adminInfo() {
        const res = await this.firebase.get('/manager');
        const data = res['data'];
        let man_temp = '';
        const dataList = Object.keys(data).map((key) => ({
            key,
            value: data[key],
        }));
        for (var i in dataList) {
            const child_data = dataList[i];
            if (child_data['key'] != 'std_list' && child_data['key'] != 'master') {
                man_temp += await this.ejs.render('man_card', {
                    name: child_data['key'],
                    password: child_data['value'],
                });
            }
        }
        return man_temp;
    }
    async adminDel(name) {
        return await this.firebase.remove('/manager/' + name);
    }
    async adminEdit(name, password) {
        const updates = {};
        updates[name] = password;
        return await this.firebase.update('/manager', updates);
    }
    async init(filePath) {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const range = xlsx.utils.decode_range(sheet['!ref']);
        let updates = {};
        let updates2 = {};
        const ref = await this.firebase.get('manager/std_list');
        const data = ref['data'];
        for (let std_num in data) {
            this.firebase.remove('/' + std_num);
        }
        for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
            const cellA = sheet[xlsx.utils.encode_cell({ r: rowNum, c: 0 })];
            const cellB = sheet[xlsx.utils.encode_cell({ r: rowNum, c: 1 })];
            if (cellA && cellB) {
                const dataA = cellA.v;
                const dataB = cellB.v;
                const temp = {};
                temp['number'] = dataA;
                temp['name'] = dataB;
                temp['log'] = { '0000-00-00-00:00:00': '상벌점 초기화됨' };
                temp['plus_point'] = 0;
                temp['minus_point'] = 0;
                temp['extra_plus_point'] = 0;
                temp['extra_minus_point'] = 0;
                temp['state'] = 0;
                temp['start_day'] = 0;
                temp['end_day'] = 0;
                updates[dataA] = temp;
                updates2[dataA] = '';
            }
        }
        await this.firebase.update('/', updates);
        return await this.firebase.set('/manager/std_list', updates2);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        ejs_service_1.EjsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map