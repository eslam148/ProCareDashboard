export interface LoginResponse {
    status: number;
    message: string;
    internalMessage: string | null;
    data: {
        token: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        birthOfDate: string | null;
        role: number;
        loginStatus: number;
    };
    subStatus: number;
}

export interface ApiResponse<T> {
    status: number;
    message: string;
    internalMessage: string | null;
    data: T;
    subStatus: number;
}

export interface RefreshTokenResponse {
    status: number;
    message: string;
    internalMessage: string | null;
    data: {
        token: string;
    };
    subStatus: number;
}

export interface UserDetails {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthOfDate: string | null;
    role: number;
    loginStatus: number;
}





