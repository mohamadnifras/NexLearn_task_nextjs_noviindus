export interface SendOtpRequest {
    mobile: string;
}

export interface VerifyOtpRequest {
    otp: string;
    mobile: string;
}

export interface CreateProfileRequest {
    name: string;
    email: string;
    qualification: string;
    profile_image: File;
    mobile: string
}

export interface AuthResponse {
    success: boolean;
    message: string;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    login?: boolean;
}
