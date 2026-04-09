"use client";

import { InputHTMLAttributes, forwardRef } from "react";


interface OtpInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="relative w-full">
      {label && (
        <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
          {label}
        </label>
      )}
      <input
        ref={ref}
        maxLength={7} // 6 digits + 1 space
        inputMode="numeric"
        {...props}
        className="w-full h-[56px] font-poppins rounded-md border border-gray-300 px-3 text-[16px] text-gray-800 outline-none focus:ring-2 focus:ring-PrimaryBg"
        placeholder="Enter the OTP"
        onInput={(e) => {
          const input = e.currentTarget;
          let value = input.value.replace(/\D/g, ""); // Remove non-digits
          if (value.length > 3) {
            value = value.slice(0, 3) + " " + value.slice(3, 6);
          }
          input.value = value;
          if (props.onInput) props.onInput(e);
        }}
      />
    </div>
    );
  }
);

OtpInput.displayName = "OtpInput";

export default OtpInput;