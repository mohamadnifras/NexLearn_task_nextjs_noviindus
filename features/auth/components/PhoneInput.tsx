import React from 'react'
import PhoneInputLib from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface PhoneInputProps {
  id?: string;
  label: string;
  placeholder: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

function PhoneInput({id, label, value, onChange, placeholder, required}: PhoneInputProps) {
    return (
        <div className='relative w-full'>
            {/* Floating Label */}
            <label htmlFor={id} className='absolute text-gray-500 bg-white px-1 text-[13px] left-4 -top-[10px]'>{label}</label>
            {/* Input wrapper */}
            <div className="flex items-center border border-gray-300 rounded-lg w-full bg-white mt-4">
                <PhoneInputLib
                    id={id}
                    international
                    defaultCountry="IN"
                    value={value}
                    onChange={(value) => onChange(value ?? "")}
                    placeholder={placeholder}
                    className="w-full h-[56px] pr-4 text-PrimaryB font-poppins text-[18px] px-4 bg-transparent outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                    required={required}
                />

            </div>
        </div>
    )
}

export default PhoneInput