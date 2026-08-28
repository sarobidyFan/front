import { apiRequest } from "./apiClient";

export const getCourses = () => apiRequest("/courses");
export const createCourse = (courseData) =>
    apiRequest("/courses", {
        method: "POST",
        body: JSON.stringify(courseData)
    });

export const updateCourse = (courseId, courseData) =>
    apiRequest(`/courses/${courseId}`, {
        method: "PUT",
        body: JSON.stringify(courseData)
    });

export const deleteCourse = (courseId) =>
    apiRequest(`/courses/${courseId}`, {
        method: "DELETE"
    });
