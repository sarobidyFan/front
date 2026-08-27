import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => (
    <>
        <Navbar />

        <main className="dashboard-page">
            <section className="welcome-section">
                <p className="eyebrow">ADMINISTRATION</p>
                <h1>Tableau de bord administrateur</h1>
                <p className="page-description">
                    Gérez les étudiants, les cours, les examens et leurs résultats depuis cet espace.
                </p>
            </section>

            <section className="dashboard-grid dashboard-grid-admin">
                <Link className="dashboard-card" to="/admin/students">
                    <span className="dashboard-card-icon">ET</span>
                    <div>
                        <h2>Étudiants</h2>
                        <p>Créer, modifier et activer ou désactiver les comptes étudiants.</p>
                    </div>
                </Link>

                <Link className="dashboard-card" to="/admin/courses">
                    <span className="dashboard-card-icon">CO</span>
                    <div>
                        <h2>Cours</h2>
                        <p>Gérer les codes, noms et descriptions des cours.</p>
                    </div>
                </Link>

                <Link className="dashboard-card" to="/admin/exams">
                    <span className="dashboard-card-icon">EX</span>
                    <div>
                        <h2>Examens</h2>
                        <p>Créer les examens,avec leurs dates et leurs questionnaires.</p>
                    </div>
                </Link>
            </section>
        </main>
    </>
);

export default AdminDashboard;
