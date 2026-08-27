import { useEffect, useState } from "react";
import {
    activateStudent,
    createStudent,
    deactivateStudent,
    getStudents,
    updateStudent
} from "../../api/studentApi";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const emptyStudent = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

const Students = () => {
    const [students, setStudents] = useState([]);
    const [studentData, setStudentData] = useState(emptyStudent);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const loadStudents = async () => {
        try {
            setStudents(await getStudents());
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setStudentData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        try {
            if (selectedStudentId) {
                await updateStudent(selectedStudentId, {
                    firstName: studentData.firstName,
                    lastName: studentData.lastName,
                    email: studentData.email
                });
            } else {
                await createStudent(studentData);
            }

            setStudentData(emptyStudent);
            setSelectedStudentId(null);
            await loadStudents();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleEdit = (student) => {
        setSelectedStudentId(student.id);
        setStudentData({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            password: ""
        });
    };

    const handleToggleStatus = async (student) => {
        try {
            if (student.isActive) {
                await deactivateStudent(student.id);
            } else {
                await activateStudent(student.id, student);
            }

            await loadStudents();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main>
                <h1>Gestion des étudiants</h1>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        name="firstName"
                        placeholder="Prénom"
                        value={studentData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="lastName"
                        placeholder="Nom"
                        value={studentData.lastName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={studentData.email}
                        onChange={handleChange}
                        required
                    />

                    {!selectedStudentId && (
                        <input
                            name="password"
                            type="password"
                            placeholder="Mot de passe"
                            value={studentData.password}
                            onChange={handleChange}
                            required
                        />
                    )}

                    <button className="form-submit-button" type="submit">
                        {selectedStudentId ? "Modifier" : "Ajouter"}
                    </button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.email}</td>
                                <td>{student.isActive ? "Actif" : "Inactif"}</td>
                                <td>
                                    <button onClick={() => handleEdit(student)}>
                                        Modifier
                                    </button>

                                    <button onClick={() => handleToggleStatus(student)}>
                                        {student.isActive ? "Désactiver" : "Activer"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
};

export default Students;
