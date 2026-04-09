import axiosInstance from "@/lib/axios";
import { SendOtpRequest, VerifyOtpRequest, CreateProfileRequest } from "./types"

export const sentOtp = async (data: SendOtpRequest) => {
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    const response = await axiosInstance.post("/auth/send-otp", formData);
    return response.data
};

export const verifyOtp = async (data: VerifyOtpRequest) => {
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    formData.append("otp", data.otp);
    const response = await axiosInstance.post("/auth/verify-otp", formData);
    return response.data;
};

export const createProfile = async (data: CreateProfileRequest) => {
const formData = new FormData();
 formData.append("mobile", data.mobile);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("qualification", data.qualification);
  formData.append("profile_image", data.profile_image);
  const response = await axiosInstance.post("/auth/create-profile", formData);
  return response.data
}