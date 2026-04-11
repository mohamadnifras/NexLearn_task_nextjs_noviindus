import React, { useState } from 'react'
import { Question } from '@/features/exam/types'
import ComprehensiveButton from './ComprehensiveButton';
import ComprehensiveModal from '../Modal/ComprehensiveModal';
import OptionList from './OptionList';
import ActionButton from './ActionButton';

interface QuestionCardProps {
    question: Question;
    selectedOptionId: number | null;
    onSelectOption: (optionId: number) => void;
    onNext: () => void;
    onPrevious: () => void;
    onMarkForReview: () => void;
    isLast: boolean;
}

function QuestionCard({ question, selectedOptionId, onSelectOption, onNext, onPrevious, onMarkForReview, isLast }: QuestionCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    console.log(question, "question")
    return (
        <div className='flex flex-col justify-between relative h-full'>
            <div className="overflow-y-auto flex flex-col gap-4">
                {/* question and options */}
                <div className='bg-white p-4 border border-[#E9EBEC] rounded-md flex flex-col gap-4'>
                    {question.comprehension && (
                        <>
                            <div className='w-fit'>
                                <ComprehensiveButton onClick={() => { setIsOpen(true) }} />
                            </div>
                            <ComprehensiveModal isOpen={isOpen} onClose={() => setIsOpen(false)} comprehension={question.comprehension} />
                        </>
                    )}

                    <h2 className='text-[16px] font-semibold'>{question.number}. {question.question}</h2>
                </div>
                <h2 className="ml-3 text-[12px] text-gray-500 font-medium">Choose the answer:</h2>
                {/* options */}
                <div>
                    <div className='space-y-4'>
                        {question.options.length > 0 && (
                            <OptionList options={question.options} selectedOptionId={selectedOptionId} onSelectOption={onSelectOption} />
                        )}
                    </div>
                </div>
            </div>
            {/* Action buttons */}
            <div className='flex gap-4 mt-8'>
                <ActionButton
                    onClick={onMarkForReview}
                    text="Mark for review"
                    bgColor="bg-[#800080]"
                    className="text-white"
                />
                <ActionButton
                    onClick={onPrevious}
                    text="Previous"
                    bgColor="bg-[#CECECE]"
                    disabled={question.number === 1}
                    className="text-black"
                />
                <ActionButton
                    onClick={onNext}
                    text={isLast ? "Submit" : "Next"}
                    bgColor="bg-[#1C3141]"
                    className="text-white"
                />
            </div>

        </div>
    )
}

export default QuestionCard