import { FirebaseService } from '../firebase/firebase.service';
export declare class PointService {
    private firebase;
    constructor(firebase: FirebaseService);
    pointAll(state: string, score: string, log: string, except: string): Promise<number>;
    pointSelect(state: string, score: string, log: string, number: string): Promise<number>;
    termReset(): Promise<void>;
    authReset(std_num: string): Promise<{
        status: number;
        message: string;
    }>;
}
