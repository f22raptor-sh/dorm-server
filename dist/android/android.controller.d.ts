import { AndroidService } from './android.service';
export declare class AndroidController {
    private readonly androidService;
    constructor(androidService: AndroidService);
    stdData(number: string): Promise<any>;
    foodData(): Promise<any>;
    timdData(room: string): Promise<any>;
}
