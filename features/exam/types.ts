export interface Option {
  id: number;
  option: string;
  is_correct: boolean;
}


export interface Question {
  question_id: number;
  question: string;
  comprehension?: string;
  image?: string | null;
  number: number;
  options: Option[];
}



export interface ListQuestionsResponse {
  success: boolean;
  questions_count: number;
  total_marks: number;
  total_time: number;
  time_for_each_question: number;
  mark_per_each_answer: number;
  instruction: string;
  questions: Question[];
}

export interface Answer {
  question_id: number;
  selected_option_id: number | null;
}

export interface SubmitAnswersRequest {
  answers: Answer[];
}

export interface QuestionResultDetail {
  question_id: number;
  is_correct: boolean;
  correct_option_id: number;
  selected_option_id: number | null;
}

export interface SubmitAnswersResponse {
  success: boolean;
  exam_history_id: string;
  score: number;
  correct: number;
  wrong: number;
  not_attended: number;
  submitted_at: string; // datetime string
  details: QuestionResultDetail[];
}
