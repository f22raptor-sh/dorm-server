"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalenderService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const googleapis_1 = require("googleapis");
const keyPath = (0, path_1.join)(__dirname, '../../key/helloworld-bsis-5f39a784a561.json');
const auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/calendar'],
});
const calendar = googleapis_1.google.calendar({ version: 'v3', auth: auth });
let CalenderService = class CalenderService {
    async Adding(std_num, start_day, end_day) {
        const end_date = new Date(end_day);
        const nextDay = new Date(end_date.getTime());
        nextDay.setDate(nextDay.getDate() + 1);
        const event = {
            summary: std_num,
            start: {
                dateTime: `${start_day}T00:00:00`,
                timeZone: 'Asia/Seoul',
            },
            end: {
                dateTime: `${nextDay.toISOString().split('T')[0]}T00:00:00`,
                timeZone: 'Asia/Seoul',
            },
        };
        calendar.events.insert({
            calendarId: 'bsishelloworld@gmail.com',
            requestBody: event,
        });
    }
};
exports.CalenderService = CalenderService;
exports.CalenderService = CalenderService = __decorate([
    (0, common_1.Injectable)()
], CalenderService);
//# sourceMappingURL=calender.service.js.map