import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.dashboardContainer}>
            {/* Top Section */}
            <div className={styles.topSection}>
                {/* User Info Section */}
                <div className={styles.userInfo}>
                    <h2>Welcome USER</h2>
                    <p>Age: 25</p>
                    <p>Height: 6'0"</p>
                    <p>Width: 180 lbs</p>
                    <button className={styles.userButton}>Edit Info</button>
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
