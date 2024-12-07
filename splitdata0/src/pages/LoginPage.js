import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Using a regular CSS file

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        onLogin(username, password);
        navigate('/dashboard');
    };
    
    return (
        <div className="login-root">
            <div className="hero-background">
                <div className="overlay">
                    <div className="login-panel">
                        <h1 className="login-title">Sign in to Your Account</h1>
                        <div className="social-login-options">
                        </div>
                        <p className="or-divider">or</p>
                        <input
                            type="text"
                            placeholder="Email or Username"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="cta-btn" onClick={handleLogin}>Login</button>
                        <div className="register-text">
                            Don’t have an account? <Link to="/register" className="link highlighted-link">Register Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
