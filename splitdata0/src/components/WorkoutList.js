import React, { useState } from 'react';
import styles from './WorkoutList.module.css';

const workouts = ['Push-up', 'Squat', 'Deadlift'];

function WorkoutList({ onAddWorkout }) {
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  const handleAdd = () => {
    if (selectedWorkout && reps && sets) {
      onAddWorkout({
        name: selectedWorkout,
        reps: parseInt(reps),
        sets: parseInt(sets)
      });
      setSelectedWorkout('');
      setReps('');
      setSets('');
    } else {
      alert('Please select a workout and specify reps and sets.');
    }
  };

  return (
    <div className={styles.workoutList}>
      <h3>Add Exercise for Selected Day</h3>
      <select
        value={selectedWorkout}
        onChange={(e) => setSelectedWorkout(e.target.value)}
      >
        <option value="">-- Select Exercise --</option>
        {workouts.map((workout) => (
          <option key={workout} value={workout}>
            {workout}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        min="1"
      />
      <input
        type="number"
        placeholder="Sets"
        value={sets}
        onChange={(e) => setSets(e.target.value)}
        min="1"
      />
      <button onClick={handleAdd} className={styles.addButton}>
        Add Exercise
      </button>
    </div>
  );
}

export default WorkoutList;
