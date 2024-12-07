import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePlan from './components/CreatePlan';
import DaySelector from './components/DaySelector';
import WeeklySummary from './components/WeeklySummary';
import styles from './App.module.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [plan, setPlan] = useState(null);
    const [workoutsByDay, setWorkoutsByDay] = useState({
        M: [],
        T: [],
        W: [],
        Th: [],
        F: [],
        Sa: [],
        Su: [],
    });

    const handleLogin = (username, password) => {
        axios.post('http://localhost:5005/api/login', { username, password })
            .then((response) => {
                if (response.status === 200) {
                    alert('Login successful!');
                    setIsAuthenticated(true);
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
                alert('Invalid username or password');
            });
    };

    const handleRegister = (email, username, password) => {
        axios.post('http://localhost:5005/api/register', { email, username, password })
            .then((response) => {
                if (response.status === 201) {
                    alert('Account created successfully! Please log in.');
                }
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                alert('Error creating account. Try again.');
            });
    };

    const handleCreatePlan = (planDetails) => {
        setPlan(planDetails);
    };

    const handleAddWorkout = (day, workout) => {
        setWorkoutsByDay((prev) => ({
            ...prev,
            [day]: [...prev[day], workout],
        }));
    };

    return (
        <Router>
            <div className={styles.container}>
                <Routes>
                    <Route
                        path="/"
                        element={<LoginPage onLogin={handleLogin} />}
                    />
                    <Route
                        path="/register"
                        element={<RegisterPage onRegister={handleRegister} />}
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                {!plan ? (
                                    <CreatePlan onCreate={handleCreatePlan} />
                                ) : (
                                    <>
                                        <DaySelector onAddWorkout={handleAddWorkout} />
                                        <WeeklySummary workoutsByDay={workoutsByDay} />
                                    </>
                                )}
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
