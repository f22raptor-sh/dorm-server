import { FirebaseService } from '../firebase/firebase.service';
import { EjsService } from '../ejs/ejs.service';
export declare class ListService {
    private firebase;
    private ejs;
    constructor(firebase: FirebaseService, ejs: EjsService);
    stdInfo(): Promise<String>;
    classInfo(): Promise<String>;
    update(action: string, amount: number, std_number: string): Promise<{
        status: number;
        message: string;
    }>;
    out(std_number: string, start_day: string, end_day: string): Promise<{
        status: number;
        message: string;
    }>;
    log(std_number: string): Promise<any>;
}
