import axiosInstance from "@/lib/axios";
import { ListQuestionsResponse } from "./types";

export const fetchQuestions = async (): Promise<ListQuestionsResponse> => {
    const response = await axiosInstance.get<ListQuestionsResponse>("/question/list");
    return response.data;
}