import React from 'react'
import Timer from './Timer'
import { Question } from '../../types';

interface Props {
    questions: Question[];
    activeIndex: number;
    status: Record<number, "answered" | "unanswered" | "review">;
    onQuestionClick: (index: number) => void;
    totalTime: number;
    onTimeUp: () => void;
    onTimeUpdate: (timeString: string) => void;
}

function NavigaterQ({ questions, activeIndex, status, onQuestionClick, totalTime, onTimeUp, onTimeUpdate }: Props) {
    const getColor = (qid: number) => {
        const currentStatus = status[qid];
        if (currentStatus === "answered") return "bg-green-500 text-white";
        if (currentStatus === "review") return "bg-[#800080] text-white";
        if (currentStatus === "unanswered") return "bg-red-500 text-white";
        return "bg-white border border-gray-300 text-black";
    };
    return (
        <div className='flex flex-col justify-between h-full'>
            <div>
                {/** Question Timer */}
                <div className="flex justify-between w-full">
                    <h2 className="text-[16px] font-medium mb-4 ">Question No. Sheet:</h2>
                    <div className='flex  gap-2'>
                        <h2 className='text-[16px] font-medium'> Remaining Time: </h2>
                        <Timer totalTime={totalTime} onTimeUp={onTimeUp} onTimeUpdate={onTimeUpdate} />
                    </div>
                </div>
                {/** Question Number Sheet */}
                <div className="grid grid-cols-5 gap-2 place-items-center">
                    {questions.map((q, index) => (
                        <button
                            key={q.question_id}
                            className={`w-11 h-11 flex border-[#CECECE] font-semibold items-center justify-center rounded ${getColor(
                                q.question_id
                            )} ${activeIndex === index ? "ring-4 ring-[#800080]" : ""}`}
                            onClick={() => onQuestionClick(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            {/* Question Status */}
            <div className="mt-6 text-[12px] flex justify-between">
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-[#4CAF50] border border-[#CECECE] rounded"></div> Attended
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-[#EE3535] border border-[#CECECE] rounded"></div> Not Attended
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-[#800080] border border-[#CECECE] rounded"></div> Marked for Review
                </div>
            </div>
        </div>
    )
}

export default NavigaterQ