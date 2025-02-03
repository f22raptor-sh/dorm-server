import { CalenderService } from './calender.service';
import { Response } from 'express';
export declare class CalenderController {
    private readonly calenderService;
    constructor(calenderService: CalenderService);
    calender(res: Response): void;
    Add(std_num: string, start_day: string, end_day: string, res: Response): Response<any, Record<string, any>>;
}
