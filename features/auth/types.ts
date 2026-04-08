export interface SendOtpRequest {
    mobile: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    login?: boolean;
}
