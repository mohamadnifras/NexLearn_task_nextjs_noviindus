import axiosInstance from "@/lib/axios";
import {SendOtpRequest} from "./types"

export const sentOtp = async(data:SendOtpRequest)=>{
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    const response = await axiosInstance.post("/auth/send-otp", formData);
    return response.data
};

// export const verifyOtp = async (data: VerifyOtpRequest) => {
//   const formData = new FormData();
//   formData.append("mobile", data.mobile);
//   formData.append("otp", data.otp);
//   const response = await api.post("/auth/verify-otp", formData);
//   return response.data;
// };