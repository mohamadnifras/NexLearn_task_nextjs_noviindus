import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse, SendOtpRequest } from './types'
import {sentOtp} from "./api"

interface AuthState {
    loading: boolean;
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    mobile: string;
    message: string;
    success: boolean;
}

const initialState: AuthState = {
    loading: false,
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    success: false,
    mobile: "",
    message: "",
};

//Thunk
export const sentOtpThunk = createAsyncThunk("auth/sentOtpThunk", async(data:SendOtpRequest)=>{
const response: AuthResponse = await sentOtp(data)
return response
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
        .addCase(sentOtpThunk.pending, (state)=>{
            state.loading = true;
        })
        .addCase(sentOtpThunk.fulfilled, (state, {payload})=>{
            state.loading = false;
            state.message = payload.message;
            state.success = payload.success;
        })

    },
});

export const {logout, setMobile} = authSlice.actions;
export default authSlice.reducer;