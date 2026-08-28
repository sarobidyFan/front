import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

const RoleRoute = ({ allowedRole, children }) => {
    const currentUser = getUser();
    return currentUser?.role === allowedRole
        ? children
        : <Navigate to="/login" replace />;
};

export default RoleRoute;
