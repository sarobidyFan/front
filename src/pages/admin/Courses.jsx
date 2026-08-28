import { useEffect, useState } from "react";
import { createCourse, deleteCourse, getCourses, updateCourse } from "../../api/courseApi";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const emptyCourse = {
    code: "",
    name: "",
    description: ""
};

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [courseData, setCourseData] = useState(emptyCourse);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const loadCourses = async () => {
        try {
            setCourses(await getCourses());
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        try {
            if (selectedCourseId) {
                await updateCourse(selectedCourseId, courseData);
            } else {
                await createCourse(courseData);
            }

            setCourseData(emptyCourse);
            setSelectedCourseId(null);
            await loadCourses();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleEdit = (course) => {
        setSelectedCourseId(course.id);
        setCourseData({
            code: course.code || "",
            name: course.name || "",
            description: course.description || ""
        });
    };

    const handleDelete = async (courseId) => {
        try {
            await deleteCourse(courseId);
            await loadCourses();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main>
                <h1>Gestion des cours</h1>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        name="code"
                        placeholder="Code du cours"
                        value={courseData.code}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="name"
                        placeholder="Nom du cours"
                        value={courseData.name}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={courseData.description}
                        onChange={handleChange}
                        required
                    />

                    <button className="form-submit-button" type="submit">
                        {selectedCourseId ? "Modifier" : "Ajouter"}
                    </button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.code}</td>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>
                                    <button onClick={() => handleEdit(course)}>
                                        Modifier
                                    </button>

                                    <button onClick={() => handleDelete(course.id)}>
                                        Supprimer
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

export default Courses;
