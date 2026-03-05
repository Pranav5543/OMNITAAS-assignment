import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Remember username — load from localStorage on mount
    useEffect(() => {
        const rememberedUser = localStorage.getItem("rememberedUsername");
        if (rememberedUser) {
            setUsername(rememberedUser);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Client-side validation
        if (!username.trim() || !password.trim()) {
            setError("Please enter both username and password.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.trim(), password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save username for future logins
                localStorage.setItem("rememberedUsername", data.username);
                // Navigate to Welcome page with username
                navigate("/welcome", { state: { username: data.username } });
            } else {
                // Display error from server (401 or 400)
                setError(data.message);
            }
        } catch (err) {
            setError("Unable to connect to the server. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo-icon">
                        <img src={logo} alt="Logo" className="app-logo" />
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message" role="alert">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                autoFocus={!username}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                autoFocus={!!username}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`login-button ${isLoading ? "loading" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="spinner"></span>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        Use Username: <strong>admin</strong> and Password: <strong>admin</strong> to sign in
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
