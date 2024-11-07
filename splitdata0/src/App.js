import React, { useState } from 'react';
import CreatePlan from './components/CreatePlan';
import DaySelector from './components/DaySelector';
import WeeklySummary from './components/WeeklySummary';
import styles from './App.module.css';

function App() {
  const [plan, setPlan] = useState(null);
  const [workoutsByDay, setWorkoutsByDay] = useState({
    M: [],
    T: [],
    W: [],
    Th: [],
    F: [],
    Sa: [],
    Su: []
  });

  const handleCreatePlan = (planDetails) => {
    setPlan(planDetails);
  };

  const handleAddWorkout = (day, workout) => {
    setWorkoutsByDay((prev) => ({
      ...prev,
      [day]: [...prev[day], workout]
    }));
  };

  return (
    <div className={styles.container}>
      {!plan ? (
        <CreatePlan onCreate={handleCreatePlan} />
      ) : (
        <>
          <DaySelector onAddWorkout={handleAddWorkout} />
          <WeeklySummary workoutsByDay={workoutsByDay} />
        </>
      )}
    </div>
  );
}

export default App;
