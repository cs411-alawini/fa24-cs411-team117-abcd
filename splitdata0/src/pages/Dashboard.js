import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Dashboard;
