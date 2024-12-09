import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FindPlanPage.module.css';

const FindPlanPage = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Fetch plans from the API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/plans');
        setPlans(response.data);
        setFilteredPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  // Filter plans based on the search term
  useEffect(() => {
    setFilteredPlans(
      plans.filter((plan) =>
        plan.planName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, plans]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Find Plan</h2>
      <input
        type="text"
        placeholder="Search for a plan"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.planList}>
        {filteredPlans.map((plan) => (
          <div
            key={plan.planId}
            className={styles.planItem}
            onClick={() => setSelectedPlan(plan)}
          >
            {plan.planName || 'Unnamed Plan'}
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className={styles.planDetails}>
          <h3>Plan: {selectedPlan.planName || 'Unnamed Plan'}</h3>
          <h4>Day-by-Day Sessions:</h4>
          <ul>
            {selectedPlan.sessions && selectedPlan.sessions.length > 0 ? (
              selectedPlan.sessions.map((session, index) => (
                <li key={index}>
                  <strong>{session.day || 'No Day Assigned'}:</strong>{' '}
                  {session.name || 'No Name'}
                </li>
              ))
            ) : (
              <li>No sessions available for this plan.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FindPlanPage;
