"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { selectExam } from '@/features/exam/examSlice'
import ResultItem from '@/features/exam/components/Result/ResultItem';
import Loader from '@/components/Loader';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
function page() {
    const exam = useSelector(selectExam);
    const router = useRouter();
    if (exam.score === null) return null;

    const totalQuestions = (exam.correct ?? 0) + (exam.wrong ?? 0) + (exam.notAttended ?? 0);

    if (exam.loading) {
        return <Loader />
    }
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center px-4'>
            {/* Marks Obtained: */}
            <div className='w-full max-w-md rounded-2xl shadow-lg bg-gradient-to-r from-[#32748F] to-[#20445A] px-8 py-4 text-white text-center'>
                <h2 className='text-white text-[18px] font-medium mb-3'>Marks Obtained:</h2>
                <h1 className="text-[68px] font-bold">{exam.score} / {exam.questions.length}</h1>
            </div>
            {/* Result Details */}
            <div className='rounded-2xl w-full max-w-md px-1 py-6 flex flex-col gap-4'>
                <ResultItem
                    icon="/exam/question.svg"
                    bgColor="bg-[#DDA428]"
                    label="Total Questions:"
                    value={totalQuestions}
                />
                <ResultItem
                    icon="/exam/correctAnswers.svg"
                    bgColor="bg-[#4CAF50]"
                    label="Correct Answers:"
                    value={String(exam.correct ?? 0).padStart(3, "0")}
                />
                <ResultItem
                    icon="/exam/incorrectAnswer.svg"
                    bgColor="bg-[#EE3535]"
                    label="Wrong Answers:"
                    value={String(exam.wrong ?? 0).padStart(3, "0")}
                />
                <ResultItem
                    icon="/exam/question.svg"
                    bgColor="bg-[#5C5C5C]"
                    label="Not Attended Questions:"
                    value={String(exam.notAttended ?? 0).padStart(3, "0")}
                />
            </div>

            {/* Done Button */}
            <div className="w-full max-w-md">
                <Button text="Done" onClick={() => router.push("/instruction")} />
            </div>
        </div>
    )
}

export default page