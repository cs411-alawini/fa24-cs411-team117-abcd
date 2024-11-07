import React, { useState } from 'react';
import FilteredWorkoutList from './FilteredWorkoutList';
import styles from './DaySelector.module.css';

const days = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

function DaySelector({ onAddWorkout }) {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleAddWorkout = (workout) => {
    onAddWorkout(selectedDay, workout);
  };

  return (
    <div className={styles.container}>
      <h2>Select Day</h2>
      <div className={styles.dayButtons}>
        {days.map((day) => (
          <button
            key={day}
            className={`${styles.dayButton} ${selectedDay === day ? styles.selected : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      {selectedDay && <FilteredWorkoutList onAddWorkout={handleAddWorkout} />}
    </div>
  );
}

export default DaySelector;