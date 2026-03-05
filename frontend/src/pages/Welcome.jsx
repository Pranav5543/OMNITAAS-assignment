import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

function Welcome() {
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Get username from navigation state or localStorage
        const stateUsername = location.state?.username;
        const storedUsername = localStorage.getItem("rememberedUsername");

        if (stateUsername) {
            setUsername(stateUsername);
        } else if (storedUsername) {
            setUsername(storedUsername);
        } else {
            // No username available, redirect to login
            navigate("/", { replace: true });
        }
    }, [location.state, navigate]);

    const handleLogout = () => {
        // Navigate back to login (username remains in localStorage for "remember" feature)
        navigate("/", { replace: true });
    };

    if (!username) return null;

    return (
        <div className="welcome-container">
            <div className="welcome-card">
                <div className="welcome-avatar">
                    <img src={logo} alt="Logo" className="app-logo" />
                </div>

                <div className="welcome-content">
                    <h1>Welcome,&nbsp;<span className="username-highlight">{username}</span>!</h1>
                    <p>You have successfully logged in to the application.</p>
                </div>

                <div className="welcome-stats">
                    <div className="stat-item">
                        <div className="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </div>
                        <span>Session Active</span>
                    </div>
                    <div className="stat-item">
                        <div className="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <span>Authenticated</span>
                    </div>
                </div>

                <button onClick={handleLogout} className="logout-button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Welcome;
