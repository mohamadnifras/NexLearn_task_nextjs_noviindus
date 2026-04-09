"use client"
import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    placeholder: string;
}
function Input({ label, id, value, onChange, placeholder, required }: InputProps) {
    return (
         <div className="relative w-full">
      {/* Floating Label */}
      <label
        htmlFor={id}
        className="absolute text-gray-500 bg-white px-1 text-[13px] left-4 -top-[10px]"
      >
        {label}
      </label>

      {/* Input wrapper */}
      <div className="flex items-center border border-gray-300 rounded-lg w-full bg-white mt-4">
        {/* Actual input */}
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-[56px] px-4 text-PrimaryBg text-[16px] bg-transparent outline-none peer"
          required={required}
        />
      </div>
       
    </div>
    )
}

export default Input