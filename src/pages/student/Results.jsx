import { useEffect, useState } from "react";
import { getMyResults } from "../../api/resultApi";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Results = () => {
    const [results, setResults] = useState([]);
    const [average, setAverage] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getMyResults()
            .then((data) => {
                setResults(Array.isArray(data) ? data : data?.results ?? []);
                setAverage(Number(data?.average ?? 0));
            })
            .catch((error) => setErrorMessage(error.message));
    }, []);

    return (
        <>
            <Navbar />
            <Sidebar />

            <main>
                <h1>Mes résultats</h1>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}

                <p>Moyenne : {average}</p>

                <table>
                    <thead>
                        <tr>
                            <th>Examen</th>
                            <th>Note</th>
                        </tr>
                    </thead>

                    <tbody>
                        {results.map((result) => (
                            <tr key={result.id}>
                                <td>{result.examName}</td>
                                <td>{Number(result.score).toFixed(2)} / {Number(result.maxScore ?? 0).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
};

export default Results;
