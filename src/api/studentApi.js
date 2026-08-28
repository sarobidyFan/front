import { apiRequest } from "./apiClient";

export const getStudents = () => apiRequest("/students");
export const createStudent = (studentData) =>
    apiRequest("/students", {
        method: "POST",
        body: JSON.stringify(studentData)
    });

export const updateStudent = (studentId, studentData) =>
    apiRequest(`/students/${studentId}`, {
        method: "PUT",
        body: JSON.stringify(studentData)
    });

export const deactivateStudent = (studentId) =>
    apiRequest(`/students/${studentId}`, {
        method: "DELETE"
    });

export const activateStudent = (studentId, studentData) =>
    apiRequest(`/students/${studentId}`, {
        method: "PUT",
        body: JSON.stringify({
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            email: studentData.email,
            isActive: true
        })
    });
