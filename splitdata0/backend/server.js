console.log("somethings happening");
const express = require('express');
const mysql = require('mysql2'); // MySQL client
const cors = require('cors'); // Middleware to enable CORS

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json()); // Parse JSON requests

// Create a MySQL connection
const db = mysql.createConnection({
    host: '34.46.65.98', // Public IP from the screenshot
    user: 'kazzy', // Replace with your database username
    password: '', // Replace with your database password
    database: 'splitdata', // Replace with the specific database name you're using
  });
  

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to Google Cloud SQL database');
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
  }

  const query = 'SELECT User_ID FROM Users WHERE username = ? AND password = ?';
  const params = [username, password];

  db.query(query, params, (err, results) => {
      if (err) {
          console.error('Error during login query:', err);
          return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Return the User_ID if login is successful
      const userId = results[0].User_ID;
      res.json({ message: 'Login successful', userId });
  });
});

app.post("/api/register", (req, res) => {
  const {
      name,
      age,
      gender,
      height,
      weight,
      fitnessLevel,
      goal,
      username,
      password,
  } = req.body;

  // Parse numerical fields with validation
  const parsedAge = age ? parseInt(age, 10) : null;
  const parsedHeight = height ? parseFloat(height).toFixed(1) : null;
  const parsedWeight = weight ? parseFloat(weight).toFixed(1) : null;

  // Validate fields
  if (parsedAge && (parsedAge < 18 || parsedAge > 150)) {
      return res.status(400).json({ error: "Age must be between 18 and 150." });
  }
  if (parsedHeight && (parsedHeight <= 0 || isNaN(parsedHeight))) {
      return res.status(400).json({ error: "Height must be a positive number." });
  }
  if (parsedWeight && (parsedWeight <= 0 || isNaN(parsedWeight))) {
      return res.status(400).json({ error: "Weight must be a positive number." });
  }

  // Prepare the query to insert the user into the database
  const query = `
      INSERT INTO Users (Name, Age, Gender, Height, Weight, Fitness_level, Goal, username, password) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
      name || null,
      parsedAge,
      gender || null,
      parsedHeight,
      parsedWeight,
      fitnessLevel || null,
      goal || null,
      username,
      password,
  ];

  // Query the database
  db.query(query, values, (err, result) => {
      if (err) {
          console.error("Error inserting user into database:", err);
          return res.status(500).json({ error: "Error creating user" });
      }

      console.log("User created successfully, ID:", result.insertId);
      res.status(201).json({ message: "User created successfully", userId: result.insertId });
  });
});


app.get('/api/exercises', (req, res) => {
    const muscleGroup = req.query.muscleGroup;
  
    let query = 'SELECT * FROM Exercises';
    const params = [];
  
    if (muscleGroup) {
      query += ' WHERE Muscle_Group = ?';
      params.push(muscleGroup);
    }
  
    db.query(query, params, (err, results) => {
      if (err) {
        console.error('Error fetching exercises:', err);
        res.status(500).send('Error fetching exercises');
      } else {
        res.json(results);
      }
    });
  });

 app.post('/api/save-plan', (req, res) => {
  const { userId, planName, sessions } = req.body;

  console.log('Received plan data:', { userId, planName, sessions });

  if (!userId || !planName || !sessions || !sessions.length) {
    return res.status(400).json({ error: 'Incomplete data to save plan' });
  }

  // Start transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Transaction error:', err);
      return res.status(500).json({ error: 'Failed to start transaction' });
    }

    // Insert into Plan table
    const insertPlanQuery = 'INSERT INTO Plan (Plan_Name, User_ID) VALUES (?, ?)';
    db.query(insertPlanQuery, [planName, userId], (err, planResult) => {
      if (err) {
        console.error('Error inserting plan:', err);
        db.rollback(() => res.status(500).json({ error: 'Error saving plan' }));
        return;
      }

      const planId = planResult.insertId;
      console.log(`Plan inserted with ID: ${planId}`);

      // Proceed to insert sessions and other related data
      const insertSessionQuery = 'INSERT INTO Session (Session_Name, User_ID) VALUES (?, ?)';
      const sessionPromises = sessions.map((session) => {
        return new Promise((resolve, reject) => {
          db.query(insertSessionQuery, [session.name, userId], (err, sessionResult) => {
            if (err) return reject(err);
            const sessionId = sessionResult.insertId;
            console.log(`Session inserted with ID: ${sessionId} for Plan ID: ${planId}`);

            // Insert related data (Plan_Contains, Sets, Exercises, etc.)
            resolve();
          });
        });
      });

      Promise.all(sessionPromises)
        .then(() => {
          db.commit((err) => {
            if (err) {
              db.rollback(() => res.status(500).json({ error: 'Error committing transaction' }));
              return;
            }
            console.log('Plan and related data saved successfully');
            res.status(201).json({ message: 'Plan saved successfully', planId });
          });
        })
        .catch((err) => {
          console.error('Error saving plan sessions:', err);
          db.rollback(() => res.status(500).json({ error: 'Error saving plan sessions' }));
        });
    });
  });
});

app.post('/api/save-plan', (req, res) => {
  const { userId, planName, sessions } = req.body;

  console.log('Received data:', { userId, planName, sessions });

  // Placeholder logic to verify API call
  if (!userId || !planName || !sessions) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  // Respond with success for testing
  res.status(201).json({ message: 'Plan saved successfully', data: { userId, planName, sessions } });
});


  
  
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
