import { KakaoService } from './kakao.service';
import { Request, Response } from 'express';
export declare class KakaoController {
    private readonly kakaoService;
    constructor(kakaoService: KakaoService);
    Chatbot(body: any, req: Request, res: Response): Response<any, Record<string, any>>;
}
