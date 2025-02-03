import { AdminService } from './admin.service';
import { Response } from 'express';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    adminInfo(): Promise<{
        manager_ara: string;
    }>;
    adminDel(res: Response, name: string): Promise<Response<any, Record<string, any>>>;
    adminEdit(res: Response, name: string, password: string): Promise<Response<any, Record<string, any>>>;
    pointReset(file: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
