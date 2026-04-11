"use client"
import Image from 'next/image';
import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import Input from '@/components/Input';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { toast } from 'sonner';
import { createProfileThunk } from '@/features/auth/authSlice';

function page() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        qualification: "",
    });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, mobile, verifyOtpSuccess } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!verifyOtpSuccess) {
            router.push("/login");
        }
    }, [router, verifyOtpSuccess]);

     const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.qualification) {
            toast.error("Name and Qualification are required.");
            return;
        }

        if (!mobile) {
            toast.error("Something went wrong. Please login again.");
            router.push("/login");
            return;
        }

        if (!profileImage) {
            toast.error("Please upload your profile image.");
            return;
        }

        const payload = {
            name: formData.name,
            email: formData.email,
            qualification: formData.qualification,
            mobile: mobile,
            profile_image: profileImage,
        };

        try {
            const result = await dispatch(createProfileThunk(payload)).unwrap();

            if (result.success) {
                toast.success(result.message || "Profile created successfully!");
                router.push("/instruction");
            }
        } catch (error) {
            const errorMessage = (error as { message?: string })?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        }
    };
    return (
        <form 
        onSubmit={handleSubmit}
        className='w-full h-full flex flex-col justify-between px-6 py-6 text-PrimaryBg font-poppins'>
            <h1 className='text-[24px] font-semibold'>Add Your Details</h1>
            <div className="flex-1 overflow-auto no-scrollbar space-y-6">
                {/* Profile Picture Upload */}
                <label
                    htmlFor="profileImage"
                    className="flex flex-col items-center justify-center w-36 h-36 mx-auto border-2 border-dashed border-gray-300 rounded-lg cursor-pointer overflow-hidden"
                >
                    {profileImage ? (
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                                src={URL.createObjectURL(profileImage)}
                                alt="Profile Preview"
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <>
                            <div className="relative w-8 h-8">
                                <Image src="/auth/cameraPlus.png" alt="Add Profile" fill className="object-contain" />
                            </div>
                            <p className="mt-2 text-[10px] text-gray-400 text-center">Add Your Profile picture</p>
                        </>
                    )}
                    <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>

                {/* Input Fields */}
                <div className="space-y-6">
                    <Input
                        id="name"
                        label="Name"
                        placeholder="Enter your Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        id="email"
                        label="Email"
                        placeholder="Enter your Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <Input
                        id="qualification"
                        label="Your qualification"
                        placeholder="Enter your Qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

             {/* Profile Button*/}
            <div className="mt-6">
                <Button type="submit" text={loading ? "Saving..." : "Get Started"} />
            </div>
        </form>
    )
}

export default page