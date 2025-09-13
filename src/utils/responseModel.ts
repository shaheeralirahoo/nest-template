export interface ResponseModel<T> {
    message: string;
    success: boolean;
    data?: T;
    error?: {
        name: string;
        message: string;
        stack?: string;
    };
}
