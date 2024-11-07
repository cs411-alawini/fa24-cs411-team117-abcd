import React, { useState } from 'react';
import styles from './CreatePlan.module.css';

function CreatePlan({ onCreate }) {
  const [showForm, setShowForm] = useState(false);
  const [planName, setPlanName] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = () => {
    onCreate({ planName, userName });
  };

  return (
    <div className={styles.createPlan}>
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className={styles.createButton}>
          Create Plan
        </button>
      ) : (
        <div className={styles.form}>
          <input
            placeholder="Plan Name"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
          <input
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={handleSubmit} className={styles.submitButton}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default CreatePlan;
