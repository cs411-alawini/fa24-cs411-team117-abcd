import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreatePlanForm from './pages/CreatePlanForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import styles from './App.module.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // For simplicity, assume user is authenticated

    const handleLogin = () => setIsAuthenticated(true);

    const handleRegister = () => alert('Account registered successfully!');

    const handleCreatePlan = (planDetails) => {
        console.log('Plan created:', planDetails);
        alert('Plan created successfully!');
    };

    return (
        <Router>
            <div className={styles.container}>
                <Routes>
                    {/* <Route path="/" element={<LoginPage onLogin={handleLogin} />} /> */}
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create-plan"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <CreatePlanForm onCreate={handleCreatePlan} />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
