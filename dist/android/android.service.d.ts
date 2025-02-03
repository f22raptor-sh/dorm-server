import { HttpService } from '@nestjs/axios';
import { FirebaseService } from '../firebase/firebase.service';
export declare class AndroidService {
    private readonly httpService;
    private firebase;
    constructor(httpService: HttpService, firebase: FirebaseService);
    data(std_number: string): Promise<any>;
    food(): Promise<any>;
    time(room: string): Promise<any>;
}
