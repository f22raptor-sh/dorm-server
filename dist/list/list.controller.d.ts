import { ListService } from './list.service';
import { Response } from 'express';
import { CalenderService } from 'src/calender/calender.service';
export declare class ListController {
    private readonly listService;
    private calenderService;
    constructor(listService: ListService, calenderService: CalenderService);
    listRend(): Promise<{
        btn_ara: String;
        std_ara: String;
    }>;
    changePoint(action: string, amount: string, std_number: string, res: Response): Promise<Response<any, Record<string, any>>>;
    changeOut(std_number: string, start_day: string, end_day: string, res: Response): Promise<Response<any, Record<string, any>>>;
    showLog(std_number: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
