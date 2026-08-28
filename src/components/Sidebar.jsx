import { NavLink } from "react-router-dom";
import { getUser } from "../utils/auth";

const Sidebar = () => {
    const currentUser = getUser();
    const getLinkClassName = ({ isActive }) =>
        isActive ? "sub-navbar-link active" : "sub-navbar-link";
    return (
        <nav className="sub-navbar">
            {currentUser?.role === "ADMIN" && (
                <>
                    <span className="sub-navbar-title">Administration</span>
                    <div className="sub-navbar-links">
                        <NavLink to="/admin" className={getLinkClassName} end>
                            Tableau de bord
                        </NavLink>
                        <NavLink to="/admin/students" className={getLinkClassName}>
                            Étudiants
                        </NavLink>
                        <NavLink to="/admin/courses" className={getLinkClassName}>
                            Cours
                        </NavLink>
                        <NavLink to="/admin/exams" className={getLinkClassName}>
                            Examens
                        </NavLink>
                    </div>
                </>
            )}

            {currentUser?.role === "STUDENT" && (
                <>
                    <span className="sub-navbar-title">Étudiant</span>
                    <div className="sub-navbar-links">
                        <NavLink to="/student" className={getLinkClassName} end>
                            Tableau de bord
                        </NavLink>
                        <NavLink to="/student/exams" className={getLinkClassName}>
                            Examens
                        </NavLink>
                        <NavLink to="/student/results" className={getLinkClassName}>
                            Mes résultats
                        </NavLink>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Sidebar;
