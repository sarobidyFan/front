import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createExam, deleteExam, getExams, updateExam } from "../../api/examApi";
import { getCourses } from "../../api/courseApi";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const emptyExam = {
    name: "",
    courseId: "",
    startDate: "",
    endDate: ""
};

const toDateTimeLocal = (dateValue) => {
    if (!dateValue) {
        return "";
    }

    const date = new Date(dateValue);
    const pad = (value) => String(value).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const formatDate = (dateValue) => {
    if (!dateValue) {
        return "-";
    }

    return new Date(dateValue).toLocaleString("fr-FR");
};

const Exams = () => {
    const [exams, setExams] = useState([]);
    const [courses, setCourses] = useState([]);
    const [examData, setExamData] = useState(emptyExam);
    const [selectedExamId, setSelectedExamId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const loadData = async () => {
        try {
            const [examDataResponse, courseDataResponse] =
                await Promise.all([getExams(), getCourses()]);

            setExams(examDataResponse);
            setCourses(courseDataResponse);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExamData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        const dataToSend = {
            name: examData.name,
            courseId: Number(examData.courseId),
            startDate: examData.startDate,
            endDate: examData.endDate
        };

        try {
            if (selectedExamId) {
                await updateExam(selectedExamId, dataToSend);
            } else {
                await createExam(dataToSend);
            }

            setExamData(emptyExam);
            setSelectedExamId(null);
            await loadData();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleEdit = (exam) => {
        setSelectedExamId(exam.id);
        setExamData({
            name: exam.name,
            courseId: String(exam.courseId),
            startDate: toDateTimeLocal(exam.startDate),
            endDate: toDateTimeLocal(exam.endDate)
        });
    };

    const handleDelete = async (examId) => {
        try {
            await deleteExam(examId);
            await loadData();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main>
                <h1>Gestion des examens</h1>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Nom de l'examen"
                        value={examData.name}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="courseId"
                        value={examData.courseId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Choisir un cours</option>

                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.code}
                            </option>
                        ))}
                    </select>

                    <label>
                        Date de début
                        <input
                            name="startDate"
                            type="datetime-local"
                            value={examData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Date de fin
                        <input
                            name="endDate"
                            type="datetime-local"
                            value={examData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button className="form-submit-button" type="submit">
                        {selectedExamId ? "Modifier" : "Ajouter"}
                    </button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Cours</th>
                            <th>Date début</th>
                            <th>Date fin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {exams.map((exam) => (
                            <tr key={exam.id}>
                                <td>{exam.name}</td>
                                <td>{exam.courseName}</td>
                                <td>{formatDate(exam.startDate)}</td>
                                <td>{formatDate(exam.endDate)}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(exam)}
                                        disabled={exam.hasAttempt}
                                    >
                                        Modifier
                                    </button>

                                    <button
                                        onClick={() => handleDelete(exam.id)}
                                        disabled={exam.hasAttempt}
                                    >
                                        Supprimer
                                    </button>


                                    <Link to={`/admin/exams/${exam.id}/questions`}>
                                        Questions
                                    </Link>

                                    <Link to={`/admin/exams/${exam.id}/results`}>
                                        Résultats
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
};

export default Exams;
