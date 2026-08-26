import { apiRequest } from "./apiClient";

export const getExamResults = (examId) =>
    apiRequest(`/exams/${examId}/results`);

export const getMyResults = () =>
    apiRequest("/my/results");
