import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Question, SubmitAnswersRequest, SubmitAnswersResponse } from "./types";
import { fetchQuestions, submitAnswers } from "./api";
import { RootState } from "@/redux/store";


interface ExamState {
    loading: boolean;
    error: string | null;
    questions: Question[];
    totalMarks: number;
    totalTime: number;
    instruction: string;
    examHistoryId: string | null;
    score: number | null;
    correct: number | null;
    wrong: number | null;
    notAttended: number | null;
    submittedAt: string | null;
    submissionDetails: SubmitAnswersResponse["details"];
}

const initialState: ExamState = {
    loading: false,
    error: null,
    questions: [],
    totalMarks: 0,
    totalTime: 0,
    instruction: "",
    examHistoryId: null,
    score: null,
    correct: null,
    wrong: null,
    notAttended: null,
    submittedAt: null,
    submissionDetails: [],
};

export const fetchQuestionsThunk = createAsyncThunk("exam/fetchQuestions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchQuestions()
            return response
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Something went wrong");
        }
    }
);
//submitAnswers
export const submitQuestionAnswersThunk = createAsyncThunk<SubmitAnswersResponse, SubmitAnswersRequest>("exam/submitQuestionAnswersThunk", async (answers, { rejectWithValue }) => {
    try {
        const response = await submitAnswers(answers);
        console.log(response, "ans");
        return response;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("Something went wrong");
    }
})

const examSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Questions
            .addCase(fetchQuestionsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestionsThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.questions = payload.questions;
                state.totalMarks = payload.total_marks;
                state.totalTime = payload.total_time;
                state.instruction = payload.instruction;
            })
            .addCase(fetchQuestionsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || "Failed to fetch questions.";
            })
            // Submit Answers
            .addCase(submitQuestionAnswersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitQuestionAnswersThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.examHistoryId = payload.exam_history_id;
                state.score = payload.score;
                state.correct = payload.correct;
                state.wrong = payload.wrong;
                state.notAttended = payload.not_attended;
                state.submittedAt = payload.submitted_at;
                state.submissionDetails = payload.details;
            })
            .addCase(submitQuestionAnswersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || "Failed to submit answers.";
            });
    },
});

export const selectExam = (state: RootState) => state.exam;
export default examSlice.reducer;