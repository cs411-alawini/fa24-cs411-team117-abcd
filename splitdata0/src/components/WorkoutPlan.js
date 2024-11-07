import React, { useState } from 'react';
import styles from './WorkoutPlan.module.css';

function WorkoutPlan({ user, onCreatePlan }) {
  const [planName, setPlanName] = useState('');

  const handleCreatePlan = () => {
    onCreatePlan({ planName, user });
  };

  return (
    <div>
      <h2>Create a Workout Plan for {user.name}</h2>
      <div className={styles.planForm}>
        <input
          placeholder="Plan Name (e.g., Beginner Strength)"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
        />
        <button onClick={handleCreatePlan}>Create Plan</button>
      </div>
    </div>
  );
}

export default WorkoutPlan;
