"use client"
import { useState } from 'react'
import PhoneInput from '@/features/auth/components/PhoneInput'
import Button from '@/components/Button'
import { sentOtpThunk, setMobile } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Loader from '@/components/Loader';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';


function page() {
    const [phone, setPhone] = useState("");

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading } = useAppSelector((state) => state.auth)

    //submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone) {
            toast.error("Please enter your phone number.");
            return;
        }
        dispatch(sentOtpThunk({ mobile: phone.replace(/\s/g, "") }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    dispatch(setMobile(phone));
                    toast.success(res.message);
                    router.push("/verify-otp")

                } else {
                    toast.error(res.message)
                }
            })
    }

    if(loading){
    return <Loader />
  }
    return (
        <div className="w-full h-full flex flex-col justify-between px-6 py-6 text-PrimaryBg font-poppins">
            {/* Top content */}
            <div className="space-y-4">
                <div>
                    <h2 className="text-[23px] md:text-[24px] font-semibold">Enter your phone number</h2>
                    <p className="mt-4 mb-8 text-[14px] md:text-[16px]">
                        We use your mobile number to identify your account
                    </p>
                </div>

                {/* Phone input */}
                <PhoneInput
                    label="Phone number"
                    placeholder="Enter your number"
                    value={phone}
                    onChange={setPhone}
                    required
                />

                <p className="text-[12px] font-thin text-[#5C5C5C] text-left">
                    By tapping Get Started, you agree to the{" "}
                    <span className="cursor-pointer text-PrimaryBg">Terms & Conditions</span>
                </p>
            </div>

            {/* Submit button */}
            <form onSubmit={handleSubmit} className="mt-8">
                <Button type='submit' text={loading ? "Sending..." : "Get Started"} />
            </form>
        </div>
    )
}

export default page