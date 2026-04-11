"use client"
import React, { useEffect, useState } from 'react'
import { fetchQuestionsThunk, submitQuestionAnswersThunk } from "@/features/exam/examSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import QuestionCard from '@/features/exam/components/QuestionSection/QuestionCard';
import NavigaterQ from '@/features/exam/components/QuestionNaviget/NavigaterQ';
import mapInitialToUnanswered from '@/lib/helpers';
import SubmitModal from '@/features/exam/components/Modal/SubmitModal';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';

function page() {
  const dispatch = useAppDispatch();
  const { questions, loading, totalTime } = useAppSelector((state) => state.exam);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [status, setStatus] = useState<Record<number, "answered" | "unanswered" | "review" | "initial">>({});
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState<string>("00:00");
  const router = useRouter();
  useEffect(() => {
    dispatch(fetchQuestionsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (questions.length > 0) {
      const initialAnswers: Record<number, number | null> = {};
      const initialStatus: Record<number, "answered" | "unanswered" | "review" | "initial"> = {};
      questions.forEach((q) => {
        initialAnswers[q.question_id] = null;
        initialStatus[q.question_id] = "initial";
      });
      setAnswers(initialAnswers);
      setStatus(initialStatus);
    }
  }, [questions]);

  const handleSelectOption = (optionId: number) => {
    const qis = questions[currentIndex].question_id;
    setAnswers((prev) => ({ ...prev, [qis]: optionId }));
    setStatus((prev) => ({ ...prev, [qis]: "answered" }));
  }

  const handleNext = () => {
    const qid = questions[currentIndex].question_id;
    if (answers[qid] === null && status[qid] !== "review") {
      setStatus((prev) => ({ ...prev, [qid]: "unanswered" }));
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmitExam();
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  const handleMarkForReview = () => {
    const qis = questions[currentIndex].question_id;
    setStatus((prev) => ({ ...prev, [qis]: "review" }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  const handleQuestionClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSubmitExam = () => {
    setSubmitModalOpen(true);
  };

  const submitExam = () => {
   const formattedAnswers = Object.entries(answers).map(([questionId, selectedOptionId]) => ({
            question_id: Number(questionId),
            selected_option_id: selectedOptionId,
        }));
        dispatch(submitQuestionAnswersThunk({ answers: formattedAnswers }));
        setSubmitModalOpen(false);
        router.push("/result");
  }
if(loading){
  return <Loader />
}
  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-1 flex-col md:flex-row gap-6 p-6 overflow-hidden'>

        {/* Question left-side */}
        <div className='flex-1 flex flex-col overflow-hidden'>
          {/* Question header */}
          <div className='flex items-center justify-between mb-3'>
            <h1 className='font-medium text-[18px]'>Ancient Indian History MCQ</h1>
            <div className="bg-white px-3 rounded-sm shadow-sm">
              <h2 className="font-medium">
                {questions.length > 0 ? `${currentIndex + 1} / ${questions.length}` : "0 / 0"}
              </h2>
            </div>
          </div>

          {/* Question content */}
          {loading ? (
            <div className='flex items-center justify-center flex-1'>
              <p className='font-semibold text-lg'>Loading questions...</p>
            </div>
          ) : (
            questions?.length > 0 && (
              <div className='flex-1 overflow-auto'>
                <QuestionCard
                  question={questions[currentIndex]}
                  selectedOptionId={answers[questions[currentIndex].question_id] ?? null}
                  onSelectOption={handleSelectOption}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onMarkForReview={handleMarkForReview}
                  isLast={currentIndex === questions.length - 1}
                />
              </div>
            )
          )}
        </div>

        <div className="md:border-r border-b-2 md:border-b-0 border-[#E9EBEC]"></div>

        {/* Question right-side */}
        <div className='w-full md:w-1/3 flex flex-col overflow-hidden'>
          <div className='flex-1 overflow-auto'>
            <NavigaterQ
              questions={questions}
              activeIndex={currentIndex}
              status={mapInitialToUnanswered(status)}
              onQuestionClick={handleQuestionClick}
              totalTime={totalTime}
              onTimeUp={handleSubmitExam}
              onTimeUpdate={(timeString) => setRemainingTime(timeString)}
            />
          </div>
        </div>



      </div>
      {/* Submit Modal */}
      <SubmitModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onConfirm={submitExam}
        remainingTime={remainingTime} 
        totalQuestions={questions.length}
        answered={Object.values(status).filter((s) => s === "answered").length}
        review={Object.values(status).filter((s) => s === "review").length} />
    </div>
  )
}

export default page