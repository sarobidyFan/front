import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExamToTake, submitExam } from "../../api/examApi";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const TakeExam = () => {
    const { id: examId } = useParams();
    const navigate = useNavigate();

    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getExamToTake(examId)
            .then(setExam)
            .catch((error) => setErrorMessage(error.message));
    }, [examId]);

    const handleAnswerChange = (questionId, choiceId) => {
        setAnswers((currentAnswers) => ({
            ...currentAnswers,
            [questionId]: choiceId
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await submitExam(examId, answers);
            navigate(`/student/exams/${examId}/result`, {
                state: { result }
            });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main>
                <section className="page-header exam-taking-header">
                    <p className="eyebrow">PASSAGE DE L'EXAMEN</p>
                    <h1>{exam?.name || "Examen"}</h1>
                    {exam && (
                        <p className="page-description">
                            Répondez aux questions puis validez votre copie. Chaque question peut rester sans réponse.
                        </p>
                    )}
                </section>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {exam && (
                    <form className="exam-form" onSubmit={handleSubmit}>
                        {exam.questions?.map((question, index) => (
                            <fieldset className="question-card" key={question.id}>
                                <legend>
                                    <span className="question-number">{index + 1}</span>
                                    <span>{question.statement}</span>
                                    <small>{question.points} point{question.points > 1 ? "s" : ""}</small>
                                </legend>

                                <div className="choice-list">
                                    {question.choices?.map((choice) => (
                                        <label className="choice-label" key={choice.id}>
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value={choice.id}
                                                checked={answers[question.id] === choice.id}
                                                onChange={() => handleAnswerChange(question.id, choice.id)}
                                            />
                                            <span>{choice.content}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        ))}

                        <div className="form-actions">
                            <button className="primary-button" type="submit">
                                Valider l'examen
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </>
    );
};

export default TakeExam;
