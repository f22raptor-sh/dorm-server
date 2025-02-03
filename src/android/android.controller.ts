import { Controller, Get, Res, Query } from '@nestjs/common';
import { AndroidService } from './android.service';
import { Response } from 'express';

@Controller('android')
export class AndroidController {
  constructor(private readonly androidService: AndroidService) {}
  @Get()
  async stdData(@Query('number') number: string) {
    return await this.androidService.data(number);
  }

  @Get('food')
  async foodData() {
    return await this.androidService.food();
  }

  @Get('time')
  async timdData(@Query('room') room: string) {
    return await this.androidService.time(room);
  }
}
