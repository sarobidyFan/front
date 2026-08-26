import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

const Navbar = () => {
    const navigate = useNavigate();
    const currentUser = getUser();
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <header className="navbar">
            <div className="navbar-brand">
                <span className="navbar-brand-mark">GE</span>
                <h2>Gestion des examens</h2>
            </div>
            <div className="navbar-user">
                <span className="navbar-email">{currentUser?.email}</span>
                <button className="logout-button" onClick={handleLogout}>
                    Déconnexion
                </button>
            </div>
        </header>
    );
};

export default Navbar;