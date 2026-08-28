import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ExamResult = () => {
    const { state } = useLocation();
    const examResult = state?.result;
    return (
        <>
            <Navbar />
            <Sidebar />
            <main>
                <h1>Résultat</h1>
                <p>
                    Note : {examResult?.score ?? "Non disponible"}
                    {examResult?.total_points !== undefined && ` / ${Number(examResult.total_points).toFixed(2)}`}
                </p>

                <Link to="/student/results">
                    Mes résultats
                </Link>
            </main>
        </>
    );
};

export default ExamResult;
