import { apiRequest } from "./apiClient";

export const getExams = () => apiRequest("/exams");
export const getAvailableExams = () => apiRequest("/my/exams");
export const getExamById = (examId) =>
    apiRequest(`/exams/${examId}`);

export const getExamToTake = (examId) =>
    apiRequest(`/my/exams/${examId}`);

export const createExam = (examData) =>
    apiRequest("/exams", {
        method: "POST",
        body: JSON.stringify(examData)
    });

export const updateExam = (examId, examData) =>
    apiRequest(`/exams/${examId}`, {
        method: "PUT",
        body: JSON.stringify(examData)
    });

export const deleteExam = (examId) =>
    apiRequest(`/exams/${examId}`, {
        method: "DELETE"
    });

export const getQuestions = (examId) =>
    apiRequest(`/exams/${examId}/questions`);

export const createQuestion = (examId, questionData) =>
    apiRequest(`/exams/${examId}/questions`, {
        method: "POST",
        body: JSON.stringify(questionData)
    });

export const updateQuestion = (questionId, questionData) =>
    apiRequest(`/questions/${questionId}`, {
        method: "PUT",
        body: JSON.stringify(questionData)
    });

export const deleteQuestion = (questionId) =>
    apiRequest(`/questions/${questionId}`, {
        method: "DELETE"
    });

export const submitExam = (examId, answers) => {
    const formattedAnswers = Array.isArray(answers)
        ? answers.map((answer) => ({
            question_id: Number(answer.question_id ?? answer.questionId),
            choice_id: Number(answer.choice_id ?? answer.choiceId)
        }))
        : Object.entries(answers).map(([questionId, choiceId]) => ({
            question_id: Number(questionId),
            choice_id: Number(choiceId)
        }));

    return apiRequest(`/my/exams/${examId}/submit`, {
        method: "POST",
        body: JSON.stringify({ answers: formattedAnswers })
    });
};
