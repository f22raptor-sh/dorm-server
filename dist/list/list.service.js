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
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const ejs_service_1 = require("../ejs/ejs.service");
let ListService = class ListService {
    constructor(firebase, ejs) {
        this.firebase = firebase;
        this.ejs = ejs;
    }
    async stdInfo() {
        let std_temp = '';
        let res = await this.firebase.get('/manager/std_list');
        const std_list = Object.keys(res['data']);
        res = await this.firebase.get('/');
        const std_data = res['data'];
        for (var i in std_list) {
            const std_num = std_list[i];
            const currentPlus = std_data[std_num]['plus_point'];
            const currentMinus = std_data[std_num]['minus_point'];
            const currentEPlus = std_data[std_num]['extra_plus_point'];
            const currentEMinus = std_data[std_num]['extra_minus_point'];
            let sum_point = currentPlus - currentMinus + currentEPlus - currentEMinus;
            if (std_data[std_num]['state'] == '1') {
                var state = '퇴사 상태';
                var class_name = 'state_out';
                var display1 = true;
                var display2 = false;
                var display3 = true;
            }
            else if (std_data[std_num]['state'] == '2') {
                var state = '퇴사 주의';
                var class_name = 'state_alt';
                var display1 = false;
                var display2 = true;
                var display3 = false;
            }
            else if (std_data[std_num]['state'] == '3') {
                var state = '퇴사 예정';
                var class_name = 'state_target';
                var display1 = true;
                var display2 = true;
                var display3 = false;
            }
            else {
                var state = '';
                var class_name = 'state_nan';
                var display1 = false;
                var display2 = true;
                var display3 = false;
            }
            std_temp += await this.ejs.render('std_card', {
                name: std_data[std_num].name,
                number: std_num,
                state: state,
                point: Math.round(sum_point * 10) / 10,
                class_num: std_num.substring(0, 3),
                class_state: class_name,
                display1: display1,
                display2: display2,
                display3: display3,
                plus: Math.round(currentPlus * 10) / 10,
                minus: Math.round(currentMinus * 10) / 10,
                Eplus: Math.round(currentEPlus * 10) / 10,
                Eminus: Math.round(currentEMinus * 10) / 10,
                Splus: Math.round((currentEPlus + currentPlus) * 10) / 10,
                Sminus: Math.round((currentEMinus + currentMinus) * 10) / 10,
            });
        }
        return std_temp;
    }
    async classInfo() {
        const res = await this.firebase.get('/manager/std_list');
        const data_keys = Object.keys(res['data']);
        const unique_keys = Array.from(new Set(data_keys.map((item) => item.substring(0, 3))));
        const room_keys = Array.from(new Set(data_keys.map((item) => `${item[0]}-${item.substring(2, 3)}`)));
        let btn_temp = '';
        for (let i = 0; i < unique_keys.length; i++) {
            const temp = {};
            if (room_keys[i] != '학-' && room_keys[i] != 'm-n') {
                temp['room_name'] = room_keys[i];
                temp['room_num'] = unique_keys[i];
                btn_temp += await this.ejs.render('school_btn', {
                    room_num: temp['room_num'],
                    room_name: temp['room_name'],
                });
            }
        }
        btn_temp += await this.ejs.render('school_btn', {
            room_num: 'out',
            room_name: '퇴사',
        });
        return btn_temp;
    }
    async update(action, amount, std_number) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const date = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        const day = `${year}-${month}-${date}-${hours}:${minutes}:${seconds}`;
        const ref = await this.firebase.get('/' + std_number);
        const data = ref['data'];
        let updates = {};
        if (action == 'extra_plus') {
            updates['extra_plus_point'] = data['extra_plus_point'] + amount;
            updates[`log/${day}`] = '+ ' + amount + '점 : 추가 상점';
        }
        else if (action == 'extra_minus') {
            updates['extra_minus_point'] = data['extra_minus_point'] + amount;
            updates[`log/${day}`] = '- ' + amount + '점 : 추가 벌점';
        }
        return await this.firebase.update('/' + std_number, updates);
    }
    async out(std_number, start_day, end_day) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const date = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        const day = `${year}-${month}-${date}-${hours}:${minutes}:${seconds}`;
        const ref = await this.firebase.get('/' + std_number);
        const data = ref['data'];
        let updates = {};
        const end_date = new Date(end_day);
        const nextDay = new Date(end_date.getTime());
        updates['state'] = 3;
        updates['start_day'] = start_day;
        updates['end_day'] = nextDay.toISOString().split('T')[0];
        updates['extra_plus_point'] =
            data['extra_plus_point'] -
                (data['extra_plus_point'] +
                    data['plus_point'] -
                    data['extra_minus_point'] -
                    data['minus_point']);
        updates[`log/${day}`] = '* 퇴사 ';
        return await this.firebase.update('/' + std_number, updates);
    }
    async log(std_number) {
        const ref = await this.firebase.get('/' + std_number);
        const data = ref['data'];
        return data['log'];
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        ejs_service_1.EjsService])
], ListService);
//# sourceMappingURL=list.service.js.map