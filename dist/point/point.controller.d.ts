import { PointService } from './point.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Response } from 'express';
export declare class PointController {
    private readonly pointService;
    private firebase;
    constructor(pointService: PointService, firebase: FirebaseService);
    Point(number: string, except: string, state: string, score: string, log: string, res: Response): Response<any, Record<string, any>>;
    termReset(res: Response): Promise<Response<any, Record<string, any>>>;
    authReset(name: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
