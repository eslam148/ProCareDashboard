export interface LoginResponse {
    data: {
        birthOfDate: string | null;
        firstName: string;
        lastName: string;
        loginStatus: number;
        phoneNumber: string;
        role: number;
        token: string;
    };
    internalMessage: string | null;
    message: string;
    status: number;
    subStatus: number;
}





