import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAvailableExams } from "../../api/examApi";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Exams = () => {
    const [availableExams, setAvailableExams] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getAvailableExams()
            .then(setAvailableExams)
            .catch((error) => setErrorMessage(error.message));
    }, []);

    const isExamOpen = (exam) => {
        const now = new Date();
        return now >= new Date(exam.startDate) && now <= new Date(exam.endDate);
    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main>
                <section className="page-header">
                    <p className="eyebrow">ÉTUDIANT</p>
                    <h1>Examens disponibles</h1>
                    <p className="page-description">
                        Consultez les épreuves disponibles et leurs périodes d'ouverture.
                    </p>
                </section>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {availableExams.length === 0 && !errorMessage && (
                    <div className="empty-state">
                        <h2>Aucun examen disponible</h2>
                        <p>Les examens ouverts pour votre compte apparaîtront ici.</p>
                    </div>
                )}

                <section className="exam-grid">
                    {availableExams.map((exam) => {
                        const open = isExamOpen(exam);

                        return (
                            <article className="exam-card" key={exam.id}>
                                <div className="exam-card-topline">
                                    <span className={open ? "status-badge status-open" : "status-badge status-upcoming"}>
                                        {open ? "En cours" : "À venir"}
                                    </span>
                                </div>

                                <h2>{exam.name}</h2>
                                <p className="exam-course">{exam.courseName}</p>

                                <div className="exam-dates">
                                    <div>
                                        <span>Début</span>
                                        <strong>{new Date(exam.startDate).toLocaleString("fr-FR")}</strong>
                                    </div>
                                    <div>
                                        <span>Fin</span>
                                        <strong>{new Date(exam.endDate).toLocaleString("fr-FR")}</strong>
                                    </div>
                                </div>

                                {open ? (
                                    <Link className="primary-button exam-action" to={`/student/exams/${exam.id}`}>
                                        Passer l'examen
                                    </Link>
                                ) : (
                                    <span className="disabled-action">Examen pas encore ouvert</span>
                                )}
                            </article>
                        );
                    })}
                </section>
            </main>
        </>
    );
};

export default Exams;
