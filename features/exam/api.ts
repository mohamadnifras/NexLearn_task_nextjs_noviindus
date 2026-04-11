import axiosInstance from "@/lib/axios";
import { ListQuestionsResponse, SubmitAnswersRequest, SubmitAnswersResponse } from "./types";

export const fetchQuestions = async (): Promise<ListQuestionsResponse> => {
    const response = await axiosInstance.get<ListQuestionsResponse>("/question/list");
    return response.data;
}

export const submitAnswers =  async (payload: SubmitAnswersRequest): Promise<SubmitAnswersResponse> => {
  const formData = new FormData();
  formData.append("answers", JSON.stringify(payload.answers));
  const response = await axiosInstance.post<SubmitAnswersResponse>("/answers/submit", formData, {
  });
  return response.data;
};