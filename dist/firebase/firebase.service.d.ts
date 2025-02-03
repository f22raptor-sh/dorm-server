export declare class FirebaseService {
    private database;
    constructor();
    push(path: string, data: any): Promise<{
        status: number;
        message: string;
    }>;
    set(path: string, data: any): Promise<{
        status: number;
        message: string;
    }>;
    update(path: string, data: any): Promise<{
        status: number;
        message: string;
    }>;
    remove(path: string): Promise<{
        status: number;
        message: string;
    }>;
    get(path: string): Promise<{
        status: number;
        message: string;
        data: any;
    } | {
        status: number;
        message: string;
        data?: undefined;
    }>;
    private getRef;
}
