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
exports.AndroidService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const firebase_service_1 = require("../firebase/firebase.service");
let AndroidService = class AndroidService {
    constructor(httpService, firebase) {
        this.httpService = httpService;
        this.firebase = firebase;
    }
    async data(std_number) {
        const ref = await this.firebase.get('/' + std_number);
        const data = ref['data'];
        return data;
    }
    async food() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const date = `20241224`;
        const url = 'https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=7d76814a6d8f43e59d0413b6712748b5&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7150532&MLSV_YMD=' +
            date;
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
            const data = response.data;
            const breakfast = data.mealServiceDietInfo?.[1].row?.[0]?.DDISH_NM.replace(/\<br\/\>/g, '\n').replace(/\(일\)|\(일\)|\(일과고\)/g, '');
            const lunch = data.mealServiceDietInfo?.[1].row?.[1]?.DDISH_NM.replace(/\<br\/\>/g, '\n').replace(/\(일\)|\(일\)|\(일과고\)/g, '');
            const dinner = data.mealServiceDietInfo?.[1].row?.[2]?.DDISH_NM.replace(/\<br\/\>/g, '\n').replace(/\(일\)|\(일\)|\(일과고\)/g, '');
            return {
                breakfast: breakfast ?? '아침 식사가\n제공되지 않습니다.',
                lunch: lunch ?? '점심 식사가\n제공되지 않습니다.',
                dinner: dinner ?? '저녁 식사가\n제공되지 않습니다.',
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch meal data', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async time(room) {
        return {
            message: '<table style="width:380px; margin:3px 0px;"><tbody>' +
                '<tr><td class="내용2" style="border:0px; text-align:left;"><input type="button" onclick="ba_NextDisp(-1);" value="◀"></td>' +
                '<td style="border:0px;" colspan="4" class="내용2">제 2 학년 3 반 시간표 </td>' +
                '<td class="내용2" style="border:0px; text-align:right;"><input type="button" onclick="ba_NextDisp(1);" value="▶"></td></tr>' +
                '<tr><td class="교시">교시</td><td class="제목">월(3)</td><td class="제목">화(4)</td><td class="제목">수(5)</td><td class="제목">목(6)</td><td class="제목">금(7)</td></tr>' +
                '<tr><td class="교시">1(08:40)</td><td class="변경" style="padding:4px 0px 4px 0px;">영어<br>진달</td><td class="내용" style="padding:4px 0px 4px 0px;">물리<br>강준</td><td class="변경"></td><td class="변경"></td><td class="변경"></td></tr>' +
                '<tr><td class="교시">2(09:40)</td><td class="변경" style="padding:4px 0px 4px 0px;">화학Ⅱ<br>주민</td><td class="내용" style="padding:4px 0px 4px 0px;">물리<br>강준</td><td class="변경"></td><td class="변경"></td><td class="변경"></td></tr>' +
                '<tr><td class="교시">3(10:40)</td><td class="변경" style="padding:4px 0px 4px 0px;">정보<br>이수</td><td class="내용" style="padding:4px 0px 4px 0px;">한국<br>남재</td><td class="변경"></td><td class="변경"></td><td class="변경"></td></tr>' +
                '<tr><td class="교시">4(11:40)</td><td class="변경" style="padding:4px 0px 4px 0px;">정보<br>이수</td><td class="내용" style="padding:4px 0px 4px 0px;">체육<br>안성</td><td class="변경"></td><td class="변경"></td><td class="변경"></td></tr>' +
                '<tr><td class="교시">5(13:45)</td><td class="변경" style="padding:4px 0px 4px 0px;">고수Ⅰ<br>조영</td><td class="내용" style="padding:4px 0px 4px 0px;">고수Ⅰ<br>한재</td><td class="변경"></td><td class="변경"></td><td class="내용"></td></tr>' +
                '<tr><td class="교시">6(14:45)</td><td class="변경" style="padding:4px 0px 4px 0px;">고수Ⅰ<br>조영</td><td class="내용" style="padding:4px 0px 4px 0px;">생물<br>박상</td><td class="변경"></td><td class="변경"></td><td class="내용"></td></tr>' +
                '<tr><td class="교시">7(15:45)</td><td class="변경" style="padding:4px 0px 4px 0px;">생물<br>박상</td><td class="내용" style="padding:4px 0px 4px 0px;">생물<br>박상</td><td class="변경"></td><td class="변경"></td><td class="내용"></td></tr>' +
                '<tr><td class="교시">8(16:45)</td><td class="내용"></td><td class="내용"></td><td class="내용"></td><td class="내용"></td><td class="내용"></td></tr>' +
                '</tbody></table>',
        };
    }
};
exports.AndroidService = AndroidService;
exports.AndroidService = AndroidService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        firebase_service_1.FirebaseService])
], AndroidService);
//# sourceMappingURL=android.service.js.map