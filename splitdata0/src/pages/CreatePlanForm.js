import React, { useState } from 'react';
import DaySelector from '../components/DaySelector';
import WeeklySummary from '../components/WeeklySummary';
import styles from './CreatePlanForm.module.css';

const CreatePlanForm = () => {
    const [planName, setPlanName] = useState(''); // Track the plan name
    const [workoutsByDay, setWorkoutsByDay] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    });

    // Handle adding workouts
    const handleAddWorkout = (day, workout) => {
        setWorkoutsByDay((prev) => ({
            ...prev,
            [day]: [...(prev[day] || []), workout], // Ensure prev[day] is an array
        }));
    };
    

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Create Your Plan</h2>
                <input
                    placeholder="Enter Plan Name"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    className={styles.input}
                />
            </div>
            <DaySelector onAddWorkout={handleAddWorkout} />
            <WeeklySummary workoutsByDay={workoutsByDay} />
        </div>
    );
};

export default CreatePlanForm;
