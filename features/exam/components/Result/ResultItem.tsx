import React from 'react'
import Image from 'next/image'

interface ResultItemProps {
    bgColor: string;
    value: string | number;
    label: string;
    icon: string;
}

function ResultItem({ bgColor, value, label, icon }: ResultItemProps) {
    return (
        <div className="flex items-center">
            <div className={`p-2 rounded-md flex items-center justify-center ${bgColor}`}>
                <Image src={icon} width={20} height={20} alt={label} />
            </div>
            <span className="flex-1 ml-4 text-[#1C3141] text-sm font-medium">
                {label}
            </span>
            <span className="font-bold text-[#1C3141]">

                {value}
            </span>
        </div>
    )
}

export default ResultItem