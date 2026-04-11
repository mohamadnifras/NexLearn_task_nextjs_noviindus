import Image from "next/image";
import React from "react";

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    remainingTime: string;
    totalQuestions: number;
    answered: number;
    review: number;
}

function SubmitModal({
    isOpen,
    onClose,
    onConfirm,
    remainingTime,
    totalQuestions,
    answered,
    review,
}: SubmitModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

            {/* Modal Box */}
            <div className="bg-white rounded-xl shadow-lg w-[400px] p-5">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[15px] font-medium">
                        Are you sure you want to submit the test?
                    </h2>
                    <button onClick={onClose} className="text-gray-500 text-lg">
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-4">

                    {/* Remaining Time */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#1C3141] p-2 rounded-md flex items-center justify-center">
                                <Image src="/exam/timer.svg" width={20} height={20} alt="answered" />
                            </div>
                            <span>Remaining Time:</span>
                        </div>
                        <span className="font-semibold">{remainingTime}</span>
                    </div>

                    {/* Total Questions */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#DDA428] p-2 rounded-md flex items-center justify-center">
                                <Image src="/exam/question.svg" width={20} height={20} alt="answered" />
                            </div>
                            <span>Total Questions:</span>
                        </div>
                        <span className="font-semibold">{totalQuestions}</span>
                    </div>

                    {/* Answered */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-green-500 p-2 rounded-md flex items-center justify-center">
                                <Image src="/exam/question.svg" width={20} height={20} alt="answered" />
                            </div>
                            <span>Questions Answered:</span>
                        </div>
                        <span className="font-semibold">
                            {String(answered).padStart(3, "0")}
                        </span>
                    </div>

                    {/* Review */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#800080] p-2 rounded-md flex items-center justify-center">
                                <Image src="/exam/question.svg" width={20} height={20} alt="answered" />
                            </div>
                            <span>Marked for review:</span>
                        </div>
                        <span className="font-semibold">
                            {String(review).padStart(3, "0")}
                        </span>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={onConfirm}
                    className="mt-5 w-full bg-[#1C3141] text-white py-2 rounded-md font-medium hover:opacity-90"
                >
                    Submit Test
                </button>
            </div>
        </div>
    );
}

export default SubmitModal;