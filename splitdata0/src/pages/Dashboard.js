// import React from 'react';
import React, { useState, useEffect } from 'react'; // changed this
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';  // (changed this) Use the context to get the user_id
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { userId } = useUser();  // (changed this) Get user_id from context
    
    const [userInfo, setUserInfo] = useState(null);  // (changed this) State to hold the user's detailed info
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState({});


    console.log('Dashboard: userId from context:', userId);
    //added these functions
    const handleEditClick = () => {
        setIsEditing(true);
        setEditedInfo({ ...userInfo }); // Copy current user data for editing
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleSaveClick = () => {
        // Ensure weight and height are valid decimals (floats) and age is an integer
        const updatedInfo = {
            ...editedInfo,
            weight: isNaN(parseFloat(editedInfo.weight)) || parseFloat(editedInfo.weight) <= 0 ? null : parseFloat(editedInfo.weight),
            height: isNaN(parseFloat(editedInfo.height)) || parseFloat(editedInfo.height) <= 0 ? null : parseFloat(editedInfo.height),
            age: isNaN(parseInt(editedInfo.age)) || parseInt(editedInfo.age) <= 0 ? null : parseInt(editedInfo.age),
        };
    
        console.log(`Saving edited info for userId: ${userId}`, updatedInfo);
    
        fetch(`http://localhost:5005/api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInfo),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Update response:', data);
            setUserInfo(updatedInfo);  // Update the state with the new data
            setIsEditing(false);  // Exit editing mode
        })
        .catch((error) => {
            console.error('Error updating user data:', error);
        });
    };
    
    

    // changed this
    useEffect(() => {
        console.log('Dashboard: userId from context:', userId);
        if (userId) {
            // Fetch user details from the server
            fetch(`http://localhost:5005/api/user/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log('User data fetched:', data);
                    // Ensure correct data mapping
                    setUserInfo({
                        name: data.Name || 'N/A',
                        age: data.Age || 'N/A',
                        height: parseFloat(data.Height) || 'N/A', // Parse height as a number
                        weight: parseFloat(data.Weight) || 'N/A', // Parse weight as a number
                    });
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [userId]);
    //changed this
    if (!userInfo) {
        return <p>Loading user data...</p>; // Show a loading message while fetching data
    }

    return (
        <div className={styles.dashboardContainer}>
            {/* Top Section */}
            <div className={styles.topSection}>
                {/* User Info Section, updated this*/}
                <div className={styles.userInfo}>
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name="name"
                                value={editedInfo.name || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="age"
                                value={editedInfo.age || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                step="0.1"
                                name="height"
                                value={editedInfo.height || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                step="0.1"
                                name="weight"
                                value={editedInfo.weight || ''}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleSaveClick}>Save</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <h2>Welcome, {userInfo.name || 'User'}!</h2>
                            <p>Your user ID is: {userId}</p>
                            <p onClick={handleEditClick}>Age: {userInfo.age || 'N/A'}</p>
                            <p onClick={handleEditClick}>Height: {userInfo.height || 'N/A'} cm</p>
                            <p onClick={handleEditClick}>Weight: {userInfo.weight || 'N/A'} kg</p>
                            <button onClick={handleEditClick}>Edit Info</button>
                        </>
                    )}
                </div>

                {/* Create Plan Button */}
                <div className={styles.createPlan}>
                    <h2>Create a Plan</h2>
                    <button
                        onClick={() => navigate('/create-plan')}
                        className={styles.createButton}
                    >
                        Create Plan
                    </button>
                </div>

                <div className={styles.createPlan}>
                    <h2>Find Existing Plan</h2>
                    <button
                        onClick={() => navigate('/find-plan')}
                        className={styles.createButton}
                    >
                        Find a Plan
                    </button>
                </div>
            </div>

            {/* Bottom Section */}
            {/* <div className={styles.bottomSection}> */}
                {/* <h3>Your subscribed Plans:</h3> */}
                {/* Add your logic here to display subscribed plans */}
            {/* </div> */}
        </div>
    );
};

export default Dashboard;
