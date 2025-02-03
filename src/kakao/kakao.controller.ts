import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import { Request, Response } from 'express';

@Controller('kakao')
export class KakaoController {
  constructor(private readonly kakaoService: KakaoService) {}

  @Post()
  Chatbot(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    const method = req.get('method');
    const user_id = body.userRequest?.user?.id;
    const user_input = body.userRequest?.utterance;

    const text = this.kakaoService.kakaoRes(method, user_id, user_input);
    return res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: text,
            },
          },
        ],
      },
    });
  }
}
