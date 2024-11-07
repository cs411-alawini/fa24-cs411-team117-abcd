import React, { useState } from 'react';

function DaySchedule({ schedule, setSchedule }) {
  const [day, setDay] = useState('');
  const [sessionName, setSessionName] = useState('');

  const handleAddSession = () => {
    const newSchedule = [...schedule, { day, sessionName }];
    setSchedule(newSchedule);
    setDay('');
    setSessionName('');
  };

  return (
    <div>
      <h2>Schedule Sessions</h2>
      <input placeholder="Day (e.g., Monday)" value={day} onChange={(e) => setDay(e.target.value)} />
      <input placeholder="Session Name" value={sessionName} onChange={(e) => setSessionName(e.target.value)} />
      <button onClick={handleAddSession}>Add Session</button>
      <ul>
        {schedule.map((item, index) => (
          <li key={index}>
            {item.day}: {item.sessionName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DaySchedule;
