import { Controller, Get, Res, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  checkDevice(
    @Headers('user-agent') userAgent: string,
    @Res() res: Response,
  ): void {
    const isMobile = /mobile/i.test(userAgent); // 모바일 기기 여부 확인
    if (isMobile) {
      const filePath = join(__dirname, '..', 'public', 'Mindex.html');
      res.sendFile(filePath);
    } else {
      const filePath = join(__dirname, '..', 'public', 'Pindex.html');
      res.sendFile(filePath);
    }
  }
}
