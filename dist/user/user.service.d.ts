import { FirebaseService } from '../firebase/firebase.service';
export declare class UserService {
    private firebase;
    constructor(firebase: FirebaseService);
    checkuser(name: string, pw: string): Promise<Number>;
    checkAuth(auth: string): number;
    change(name: string, pw: string): Promise<{
        status: number;
        message: string;
    }>;
}
