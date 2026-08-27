import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { saveAuthentication } from "../utils/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        try {
            const authenticationData = await login(email, password);

            saveAuthentication(
                authenticationData.token,
                authenticationData.user
            );

            navigate(
                authenticationData.user.role === "ADMIN"
                    ? "/admin"
                    : "/student"
            );
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <main className="login-page">
            <section className="login-header">
                <p className="eyebrow">GESTION DES EXAMENS</p>
                <h1>Connexion</h1>
                <p className="login-description">
                    Connectez-vous pour accéder à votre espace et gérer vos examens.
                </p>
            </section>

            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <button className="form-submit-button" type="submit">Se connecter</button>
            </form>

            {errorMessage && (
                <p className="error-message">{errorMessage}</p>
            )}
        </main>
    );
};

export default Login;
