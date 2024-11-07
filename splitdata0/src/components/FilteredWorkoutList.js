import React, { useState, useEffect } from 'react';
import styles from './FilteredWorkoutList.module.css';

function FilteredWorkoutList({ onAddWorkout }) {
  // Hardcoded list of exercises
  const exercisesData = [
    { id: 1, name: 'Push-up', muscleGroup: 'Chest', difficulty: 'Easy' },
    { id: 2, name: 'Squat', muscleGroup: 'Legs', difficulty: 'Medium' },
    { id: 3, name: 'Deadlift', muscleGroup: 'Back', difficulty: 'Hard' },
    { id: 4, name: 'Bench Press', muscleGroup: 'Chest', difficulty: 'Medium' },
    { id: 5, name: 'Lunges', muscleGroup: 'Legs', difficulty: 'Easy' },
    { id: 6, name: 'Pull-up', muscleGroup: 'Back', difficulty: 'Hard' },
    // Add more exercises as needed
  ];

  const [muscleGroup, setMuscleGroup] = useState('');
  const [search, setSearch] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    const filtered = exercisesData.filter((exercise) => {
      return (
        (muscleGroup === '' || exercise.muscleGroup === muscleGroup) &&
        exercise.name.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredExercises(filtered);
  }, [muscleGroup, search]);

  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  const handleAdd = (exercise) => {
    if (reps && sets) {
      onAddWorkout({
        name: exercise.name,
        reps: parseInt(reps),
        sets: parseInt(sets),
      });
      setReps('');
      setSets('');
    } else {
      alert('Please specify reps and sets.');
    }
  };

  return (
    <div className={styles.filteredWorkoutList}>
      <h3>Select Workout</h3>

      {/* Scrollable Exercise List with Filter Buttons and Search */}
      <div className={styles.exerciseContainer}>
        {/* Muscle Group Filter Buttons */}
        <div className={styles.filterButtons}>
          {['All', 'Chest', 'Legs', 'Back'].map((group) => (
            <button
              key={group}
              className={`${styles.filterButton} ${muscleGroup === group ? styles.active : ''}`}
              onClick={() => setMuscleGroup(group === 'All' ? '' : group)}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Search Input Inside Scrollable Box */}
        <input
          type="text"
          placeholder="Search exercises"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        {/* Exercise List */}
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className={styles.exerciseItem}>
            <span>{exercise.name}</span>
            <span>{exercise.muscleGroup}</span>
            <span>({exercise.difficulty})</span>
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
            <button onClick={() => handleAdd(exercise)} className={styles.addButton}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilteredWorkoutList;
