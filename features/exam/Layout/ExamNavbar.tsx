"use client"
import { logout } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import Image from 'next/image'
import { useRouter } from 'next/navigation';


function ExamNavbar() {
    const dispatch = useAppDispatch()
    const router = useRouter()

     const handleLogout = () => {
        dispatch(logout());
        router.push("/login");
    };
  return (
     <nav className="w-full flex items-center justify-between px-4 py-2 border-b h-[70px] border-gray-200 bg-white relative">
            {/* Logo and Name */}
            <div className="flex items-center justify-center space-x-2 md:absolute md:left-1/2 md:-translate-x-1/2">
                <Image src="/exam/logoNavbar.png" alt="Logo" width={44} height={44} />
                <div className="flex flex-col font-poppins">
                        <span className="font-bold text-[23px] md:text-[25px] bg-gradient-to-r from-[#0A93BA] to-[#0B3A4B] bg-clip-text text-transparent">
                            NexLearn
                        </span>
                    <span className="text-[11px] font-medium bg-gradient-to-r from-[#0A93BA] to-[#0B3A4B] bg-clip-text text-transparent -mt-2">futuristic learning</span>
                </div>
            </div>

            {/* Logout Button */}
            <div className="ml-auto">
                <button
                    onClick={handleLogout}
                    className="bg-[#177A9C] hover:bg-[#2894B9] text-white px-4 py-2 rounded-[6px] text-[14px] font-poppins font-semibold"
                >
                    Logout
                </button>
            </div>
        </nav>
  )
}

export default ExamNavbar