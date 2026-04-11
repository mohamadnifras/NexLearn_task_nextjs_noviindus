import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse, CreateProfileRequest, SendOtpRequest, VerifyOtpRequest } from './types'
import { sentOtp, verifyOtp, createProfile } from "./api"

interface AuthState {
    loading: boolean;
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    mobile: string;
    message: string;
    sendOtpSuccess: boolean;
    verifyOtpSuccess: boolean;
}

const initialState: AuthState = {
    loading: false,
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    mobile: "",
    message: "",
    sendOtpSuccess: false,
    verifyOtpSuccess: false,
};

//Thunk
export const sentOtpThunk = createAsyncThunk("auth/sentOtpThunk", async (data: SendOtpRequest) => {
    const response: AuthResponse = await sentOtp(data)
    return response
});

//verify otp thunk
export const verifyOtpThunk = createAsyncThunk(
    "auth/verifyOtpThunk",
    async (data: VerifyOtpRequest) => {
        const response: AuthResponse = await verifyOtp(data);
        return response;
    }
);

//createProfile
export const createProfileThunk = createAsyncThunk("auth/create-Profile", async (data: CreateProfileRequest) => {
    const response: AuthResponse = await createProfile(data);
    console.log(response);
    return response;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.mobile = "";
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            localStorage.removeItem("mobile")
        },

        setMobile: (state, action) => {
            state.mobile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sentOtpThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(sentOtpThunk.fulfilled, (state, { payload }) => {
                console.log(payload, "otp response")
                state.loading = false;
                state.message = payload.message;
                state.sendOtpSuccess = payload.success;
            })
            .addCase(verifyOtpThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtpThunk.fulfilled, (state, { payload }) => {
                console.log(payload, "otp verification response")
                state.loading = false;
                state.verifyOtpSuccess = payload.success;
                state.message = payload.message;

                if (payload.login && payload.access_token && payload.refresh_token) {
                    state.isAuthenticated = true;
                    state.accessToken = payload.access_token;
                    state.refreshToken = payload.refresh_token;
                    Cookies.set("access_token", payload.access_token);
                    Cookies.set("refresh_token", payload.refresh_token);
                }
            })
            .addCase(createProfileThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(createProfileThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.accessToken = payload.access_token ?? null;
                state.refreshToken = payload.refresh_token ?? null;
                state.message = payload.message;

                // Set cookies
                if (payload.access_token && payload.refresh_token) {
                    Cookies.set("access_token", payload.access_token);
                    Cookies.set("refresh_token", payload.refresh_token);
                }
            });

    },
});

export const { logout, setMobile } = authSlice.actions;
export default authSlice.reducer;