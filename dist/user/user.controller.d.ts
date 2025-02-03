import { UserService } from './user.service';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    checkUser(session: Record<string, any>, name: string, password: string, res: Response): Promise<void>;
    checkAuth(session: Record<string, any>, res: Response): void;
    changePW(session: Record<string, any>, pw: string, res: Response): Promise<void | Response<any, Record<string, any>>>;
}
