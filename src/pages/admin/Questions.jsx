import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {createQuestion, deleteQuestion, getQuestions, getExams, updateQuestion} from "../../api/examApi";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const emptyQuestion = {
    statement: "",
    points: 1,
    choices: [
        { content: "", isCorrect: false },
        { content: "", isCorrect: false }
    ]
};

const Questions = () => {
    const { id: examId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [questionData, setQuestionData] = useState(emptyQuestion);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [hasAttempt, setHasAttempt] = useState(false);

    const loadQuestions = async () => {
        try {
            setQuestions(await getQuestions(examId));
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const [questionsData, examsData] = await Promise.all([
                    getQuestions(examId),
                    getExams()
                ]);

                setQuestions(questionsData);
                const currentExam = examsData.find(
                    (exam) => Number(exam.id) === Number(examId)
                );
                setHasAttempt(Boolean(currentExam?.hasAttempt));
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        loadData();
    }, [examId]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setQuestionData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const handleChoiceChange = (index, value) => {
        setQuestionData((currentData) => ({
            ...currentData,
            choices: currentData.choices.map((choice, choiceIndex) =>
                choiceIndex === index
                    ? { ...choice, content: value }
                    : choice
            )
        }));
    };

    const handleCorrectChoiceChange = (index) => {
        setQuestionData((currentData) => ({
            ...currentData,
            choices: currentData.choices.map((choice, choiceIndex) => ({
                ...choice,
                isCorrect: choiceIndex === index
            }))
        }));
    };

    const addChoice = () => {
        if (questionData.choices.length >= 6) return;

        setQuestionData((currentData) => ({
            ...currentData,
            choices: [...currentData.choices, { content: "", isCorrect: false }]
        }));
    };

    const removeChoice = (index) => {
        if (questionData.choices.length <= 2) return;

        setQuestionData((currentData) => ({
            ...currentData,
            choices: currentData.choices.filter((_, choiceIndex) => choiceIndex !== index)
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSend = {
            statement: questionData.statement,
            points: Number(questionData.points),
            choices: questionData.choices.map((choice) => ({
                ...(choice.id ? { id: choice.id } : {}),
                content: choice.content,
                isCorrect: choice.isCorrect
            }))
        };

        try {
            if (selectedQuestionId) {
                await updateQuestion(selectedQuestionId, dataToSend);
            } else {
                await createQuestion(examId, dataToSend);
            }

            setQuestionData(emptyQuestion);
            setSelectedQuestionId(null);
            await loadQuestions();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleEdit = (question) => {
        setSelectedQuestionId(question.id);
        setQuestionData({
            statement: question.statement,
            points: question.points,
            choices: question.choices.map((choice) => ({
                id: choice.id,
                content: choice.content,
                isCorrect: choice.isCorrect
            }))
        });
    };

    const handleDelete = async (questionId) => {
        try {
            await deleteQuestion(questionId);
            await loadQuestions();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main>
                <h1>Questions de l'examen</h1>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <textarea
                        name="statement"
                        placeholder="Énoncé de la question"
                        value={questionData.statement}
                        onChange={handleChange}
                        required
                        disabled={hasAttempt}
                    />

                    <input
                        name="points"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={questionData.points}
                        onChange={handleChange}
                        required
                        disabled={hasAttempt}
                    />

                    <div>
                        <h3>Choix de réponse</h3>

                        {questionData.choices.map((choice, index) => (
                            <div className="question-choice-row" key={choice.id ?? index}>
                                <input
                                    type="text"
                                    placeholder={`Choix ${index + 1}`}
                                    value={choice.content}
                                    onChange={(event) =>
                                        handleChoiceChange(index, event.target.value)
                                    }
                                    required
                                    disabled={hasAttempt}
                                />

                                <label className="correct-choice-label">
                                    <input
                                        type="radio"
                                        name="correctChoice"
                                        checked={choice.isCorrect}
                                        onChange={() => handleCorrectChoiceChange(index)}
                                        disabled={hasAttempt}
                                    />
                                    Bonne réponse
                                </label>

                                {questionData.choices.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removeChoice(index)}
                                        disabled={hasAttempt}
                                    >
                                        Retirer
                                    </button>
                                )}
                            </div>
                        ))}

                        {questionData.choices.length < 6 && (
                            <button type="button" onClick={addChoice} disabled={hasAttempt}>
                                Ajouter un choix
                            </button>
                        )}
                    </div>

                    <button type="submit" disabled={hasAttempt}>
                        {selectedQuestionId ? "Modifier" : "Ajouter"}
                    </button>
                </form>

                {questions.map((question, index) => (
                    <article key={question.id}>
                        <h3>
                            {index + 1}. {question.statement}
                        </h3>

                        <p>Points : {question.points}</p>

                        {question.choices?.map((choice) => (
                            <p key={choice.id}>{choice.content}</p>
                        ))}

                        <button onClick={() => handleEdit(question)} disabled={hasAttempt}>
                            Modifier
                        </button>

                        <button onClick={() => handleDelete(question.id)} disabled={hasAttempt}>
                            Supprimer
                        </button>
                    </article>
                ))}
            </main>
        </>
    );
};

export default Questions;
