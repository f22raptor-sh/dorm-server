import { Controller, Post, Render, Body, Res } from '@nestjs/common';
import { ListService } from './list.service';
import { Response } from 'express';
import { CalenderService } from 'src/calender/calender.service';

@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    private calenderService: CalenderService,
  ) {}

  @Post()
  @Render('list_layout')
  async listRend() {
    const stdTemp = await this.listService.stdInfo();
    const classTemp = await this.listService.classInfo();
    return { btn_ara: classTemp, std_ara: stdTemp };
  }

  @Post('change')
  async changePoint(
    @Body('action') action: string,
    @Body('amount') amount: string,
    @Body('std_number') std_number: string,
    @Res() res: Response,
  ) {
    const result = await this.listService.update(
      action,
      parseFloat(amount),
      std_number,
    );
    return res.status(result.status).json({ message: result.message });
  }

  @Post('out')
  async changeOut(
    @Body('std_number') std_number: string,
    @Body('start_day') start_day: string,
    @Body('end_day') end_day: string,
    @Res() res: Response,
  ) {
    const result = await this.listService.out(std_number, start_day, end_day);
    await this.calenderService.Adding(std_number, start_day, end_day);
    return res.status(result.status).json({ message: result.message });
  }

  @Post('log')
  async showLog(@Body('std_number') std_number: string, @Res() res: Response) {
    const logjson = await this.listService.log(std_number);
    return res.json(logjson);
  }
}
