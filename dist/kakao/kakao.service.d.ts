import { FirebaseService } from '../firebase/firebase.service';
export declare class KakaoService {
    private firebase;
    constructor(firebase: FirebaseService);
    kakaoRes(method: string, user_id: string, user_input: string): Promise<string>;
}
