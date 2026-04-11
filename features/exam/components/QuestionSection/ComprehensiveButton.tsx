"use client"
import Image from 'next/image'
import { IoMdArrowDropright } from 'react-icons/io'

interface ComprehensiveButtonProps {
    onClick: () => void
}
function ComprehensiveButton({ onClick }: ComprehensiveButtonProps) {
    return (
        <button onClick={onClick}
            className='flex items-center justify-between gap-3 bg-[#177A9C] hover:bg-[#2894B9] text-white px-3 py-2 rounded-md '
        >
            <Image src="/exam/comprehensionLogo.svg" alt="comprehensive" width={20} height={20} />
            <p className='text-white'>Read Comprehensive Paragraph</p>
            <IoMdArrowDropright className="text-white w-5 h-5 ml-1"/>
        </button>
    )
}

export default ComprehensiveButton