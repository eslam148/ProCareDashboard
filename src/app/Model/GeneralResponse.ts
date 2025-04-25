export interface GeneralResponse<T> {
    data: T
    internalMessage: string | null;
    message: string;
    status: number;
    subStatus: number;
}