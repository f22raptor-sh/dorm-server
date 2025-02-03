import { Controller, Post, Body, Res } from '@nestjs/common';
import { PointService } from './point.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Response } from 'express';
@Controller('point')
export class PointController {
  constructor(
    private readonly pointService: PointService,
    private firebase: FirebaseService,
  ) {}

  @Post('point')
  Point(
    @Body('number') number: string,
    @Body('except') except: string,
    @Body('state') state: string,
    @Body('score') score: string,
    @Body('log') log: string,
    @Res() res: Response,
  ) {
    if (number == 'select all') {
      this.pointService.pointAll(state, score, log, except);
    } else {
      this.pointService.pointSelect(state, score, log, number);
    }
    return res.status(200);
  }

  @Post('reset')
  async termReset(@Res() res: Response) {
    await this.pointService.termReset();
    return res.status(200);
  }

  @Post('resetpw')
  async authReset(@Body('name') name: string, @Res() res: Response) {
    const result = await this.pointService.authReset(name);
    return res.status(result.status).json({ message: result.message });
  }
}
