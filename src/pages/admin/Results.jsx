import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamResults } from "../../api/resultApi";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Results = () => {
  const { id: examId } = useParams();
  const [results, setResults] = useParams([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getExamResults(examId)
      .then(setResults)
      .catch((error) => setErrorMessage(error.message));
  }, [examId]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <h1>Resultats de l'examen</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <table>
          <thead>
            <tr>
              <th>Etudiant</th>
              <th>Email</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => {
              <tr key={result.id}>
                <td>{result.studentName}</td>
                <td>{result.email}</td>
                <td>{Number(result.score).toFixed(2)} / {Number(result.maxScore ?? 0).toFixed(2)}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Results;
