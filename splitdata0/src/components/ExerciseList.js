import React from 'react';
import styles from './ExerciseList.module.css';

function ExerciseList({ exercises }) {
  return (
    <div>
      <h2>Exercise List</h2>
      <ul className={styles.list}>
        {exercises.map((exercise) => (
          <li key={exercise.id} className={styles.listItem}>
            {exercise.name} - {exercise.muscleGroup} ({exercise.difficulty})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseList;
