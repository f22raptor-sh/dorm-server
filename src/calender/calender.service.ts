import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { google } from 'googleapis';
const keyPath = join(__dirname, '../../key/helloworld-bsis-5f39a784a561.json');

const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth: auth });

@Injectable()
export class CalenderService {
  async Adding(std_num: string, start_day: string, end_day: string) {
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
}
