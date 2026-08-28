import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamResults } from "../../api/resultApi";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Results = () => {
    const { id: examId } = useParams();
    const [results, setResults] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [average, setAverage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getExamResults(examId)
            .then((data) => {
                setResults(Array.isArray(data) ? data : data?.results ?? []);
                setTotalPoints(Number(data?.total_points ?? 0));
                setAverage(data?.average ?? null);
            })
            .catch((error) => setErrorMessage(error.message));
    }, [examId]);

    return (
        <>
            <Navbar />
            <Sidebar />
            <main>
                <h1>Résultats de l'examen</h1>
                {average !== null && <p>Moyenne : {Number(average).toFixed(2)} / {totalPoints.toFixed(2)}</p>}
                {errorMessage && (<p className="error-message">{errorMessage}</p>)}
                <table>
                    <thead>
                        <tr>
                            <th>Étudiant</th>
                            <th>Email</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result.student_id}>
                                <td>{result.name}</td>
                                <td>{result.email ?? "-"}</td>
                                <td>{Number(result.score).toFixed(2)} / {totalPoints.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
};

export default Results;
