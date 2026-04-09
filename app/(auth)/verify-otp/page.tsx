"use client"
import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Loader from '@/components/Loader';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import OtpInput from '@/features/auth/components/OtpInput';
import { sentOtpThunk, setMobile, verifyOtpThunk } from '@/features/auth/authSlice';


function page() {
  const [otp, setOtp] = useState("");

  const dispatch = useAppDispatch();
  const { loading, mobile, success, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  // Load mobile from localStorage if not available
  useEffect(() => {
    if (mobile) return;
    const storedMobile = localStorage.getItem("mobile");
    if (storedMobile) {
      dispatch(setMobile(storedMobile));
    } else {
      router.push("/login");
    }
  }, [mobile, dispatch, router])

  // After OTP verification navigation
  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      localStorage.removeItem("mobile");
      router.push("/instruction");
    } else if (success) {
      router.push("/create-profile");
    }
  }, [loading, success, isAuthenticated, router]);

  const handleResend = () => {
    if (!mobile) {
      toast.error("Mobile number not found. Please login again.");
      router.push("/login");
      return;
    }
    dispatch(sentOtpThunk({ mobile }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success("OTP resent successfully!");
        } else {
          toast.error(res.message || "Failed to resend OTP.");
        }
      });
  };
  //submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.replace(/\s/g, "").length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    dispatch(verifyOtpThunk({ otp: otp.replace(/\s/g, ""), mobile }));
  }

  if (loading) {
    return <Loader />
  }


  return (
    <div className="w-full h-full flex flex-col justify-between px-6 py-6 text-PrimaryBg font-poppins">
      {/* Top content */}
      <div className="space-y-4">
        <div>
          <h2 className="text-[23px] md:text-[24px] font-semibold">Enter the code we texted you</h2>
          <p className="mt-4 mb-8 text-[14px] md:text-[16px]">
            We&apos;ve sent an SMS to {mobile}
          </p>
        </div>

        {/* Otp input */}
        <OtpInput
          label="SMS code"
          placeholder="Enter your 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <p className="text-[12px] font-thin text-[#5C5C5C] text-left">
          Your 6 digit code is on its way. This can sometimes take a few moments to arrive.
        </p>

        <p onClick={handleResend} className="font-semibold text-[14px] underline cursor-pointer">
          Resend Code
        </p>
      </div>

      {/* Submit button */}
      <form onSubmit={handleSubmit} className="mt-8">
        <Button type='submit' text={loading ? "Verifying..." : "Verify OTP"} />
      </form>
    </div>
  )
}

export default page