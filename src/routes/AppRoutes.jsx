import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleRoute from "../components/RoleRoute";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Students from "../pages/admin/Students";
import Courses from "../pages/admin/Courses";
import Exams from "../pages/admin/Exams";
import Questions from "../pages/admin/Questions";
import AdminResults from "../pages/admin/Results";

import StudentDashboard from "../pages/student/StudentDashboard";
import StudentExams from "../pages/student/Exams";
import TakeExam from "../pages/student/TakeExam";
import StudentResults from "../pages/student/Results";
import ExamResult from "../pages/student/ExamResult";

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />

        <Route
            path="/admin"
            element={
                <ProtectedRoute>
                    <RoleRoute allowedRole="ADMIN">
                        <AdminDashboard />
                    </RoleRoute>
                </ProtectedRoute>
            }
        />

        <Route
            path="/admin/students"
            element={
                <ProtectedRoute>
                    <RoleRoute allowedRole="ADMIN">
                        <Students />
                    </RoleRoute>
                </ProtectedRoute>
            }
        />

        <Route
            path="/admin/courses"
            element={
                <ProtectedRoute>
                    <RoleRoute allowedRole="ADMIN">
                        <Courses />
                    </RoleRoute>
                </ProtectedRoute>
            }
        />

        <Route
            path="/admin/exams"
            element={
                <ProtectedRoute>
                    <RoleRoute allowedRole="ADMIN">
                        <Exams />
                    </RoleRoute>
                </ProtectedRoute>
            }
        />

        <Route
            path="/admin/exams/:id/questions"
            element={
                <ProtectedRoute>
                    <RoleRoute allowedRole="ADMIN">
                        <Questions />
                    </RoleRoute>
                </ProtectedRoute>
            }
        />

        <Route
            path="/admin/exams/:id/results"
            element={
                <ProtectedRoute>
                    <RoleRoute allowedRole="ADMIN">
                        <AdminResults />
                    </RoleRoute>
                </ProtectedRoute>
            }
        />

        <Route
            path="/student"
            element={
                <ProtectedRoute>
                    <RoleRoute allowedRole="STUDENT">
                        <StudentDashboard />
                    </RoleRoute>
                </ProtectedRoute>
            }
        />

        <Route
            path="/student/exams"
            element={
                <ProtectedRoute>
                    <RoleRoute allowedRole="STUDENT">
                        <StudentExams />
                    </RoleRoute>
                </ProtectedRoute>
            }
        />

        <Route
            path="/student/exams/:id"
            element={
                <ProtectedRoute>
                    <RoleRoute allowedRole="STUDENT">
                        <TakeExam />
                    </RoleRoute>
                </ProtectedRoute>
            }
        />

        <Route
            path="/student/exams/:id/result"
            element={
                <ProtectedRoute>
                    <RoleRoute allowedRole="STUDENT">
                        <ExamResult />
                    </RoleRoute>
                </ProtectedRoute>
            }
        />

        <Route
            path="/student/results"
            element={
                <ProtectedRoute>
                    <RoleRoute allowedRole="STUDENT">
                        <StudentResults />
                    </RoleRoute>
                </ProtectedRoute>
            }
        />

        <Route path="*" element={<Login />} />
    </Routes>
);

export default AppRoutes;
