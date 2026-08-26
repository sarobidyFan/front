import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const StudentDashboard = () => (
    <>
        <Navbar />

        <main className="dashboard-page">
            <section className="welcome-section">
                <p className="eyebrow">ESPACE ÉTUDIANT</p>
                <h1>Espace étudiant</h1>
                <p className="page-description">
                    Retrouvez vos examens disponibles et consultez vos résultats depuis votre espace personnel.
                </p>
            </section>

            <section className="dashboard-grid">
                <Link className="dashboard-card" to="/student/exams">
                    <span className="dashboard-card-icon">EX</span>
                    <div>
                        <h2>Examens disponibles</h2>
                        <p>Consulter les examens ouverts et passer une épreuve.</p>
                    </div>
                </Link>

                <Link className="dashboard-card" to="/student/results">
                    <span className="dashboard-card-icon">R</span>
                    <div>
                        <h2>Mes résultats</h2>
                        <p>Voir vos notes, votre moyenne et votre historique.</p>
                    </div>
                </Link>
            </section>
        </main>
    </>
);

export default StudentDashboard;
