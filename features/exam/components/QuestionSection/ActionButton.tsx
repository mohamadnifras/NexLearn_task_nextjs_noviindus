"use client";

import { ButtonHTMLAttributes } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor: string;
  text: string;
}

export default function ActionButton({ bgColor, text, className = "", ...props }: ActionButtonProps) {
  return (
    <button
      {...props}
      className={`${bgColor} w-full md:px-6 md:py-2 text-[15px] rounded-sm font-medium disabled:opacity-50 ${className}`}
    >
      {text}
    </button>
  );
}