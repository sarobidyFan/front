import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) =>
    isAuthenticated()
        ? children
        : <Navigate to="/login" replace />;

export default ProtectedRoute;
