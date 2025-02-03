import { Body, Controller, Post, Res } from '@nestjs/common';
import { CalenderService } from './calender.service';
import { Response } from 'express';
import { join } from 'path';

@Controller('calender')
export class CalenderController {
  constructor(private readonly calenderService: CalenderService) {}

  @Post()
  calender(@Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'public', 'calender.html');
    return res.sendFile(filePath);
  }

  @Post('add')
  Add(
    @Body('std_num') std_num: string,
    @Body('start_day') start_day: string,
    @Body('end_day') end_day: string,
    @Res() res: Response,
  ) {
    this.calenderService.Adding(std_num, start_day, end_day);
    return res.status(200);
  }
}
