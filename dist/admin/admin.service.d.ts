import { FirebaseService } from '../firebase/firebase.service';
import { EjsService } from '../ejs/ejs.service';
export declare class AdminService {
    private firebase;
    private ejs;
    constructor(firebase: FirebaseService, ejs: EjsService);
    adminInfo(): Promise<string>;
    adminDel(name: string): Promise<{
        status: number;
        message: string;
    }>;
    adminEdit(name: string, password: string): Promise<{
        status: number;
        message: string;
    }>;
    init(filePath: string): Promise<{
        status: number;
        message: string;
    }>;
}
