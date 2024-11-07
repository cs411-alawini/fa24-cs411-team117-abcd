import React, { useState } from 'react';
import styles from './UserProfile.module.css';

function UserProfile({ onSubmit }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = () => {
    onSubmit({ name, age, goal });
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <div className={styles.form}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input placeholder="Goal (e.g., Weight Loss)" value={goal} onChange={(e) => setGoal(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default UserProfile;
