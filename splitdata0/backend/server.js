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

app.post('/api/register', (req, res) => {
  const { name, age, gender, height, weight, fitnessLevel, goal, username, password } = req.body;

  // Insert the new user into the Users table
  const query = `
      INSERT INTO Users (Name, Age, Gender, Height, Weight, Fitness_level, Goal, username, password) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [name, age, gender, height, weight, fitnessLevel, goal, username, password];

  db.query(query, values, (err, result) => {
      if (err) {
          console.error('Error inserting user into database:', err);
          return res.status(500).send('Error creating user');
      }

      // Respond with a success message or the new user ID if needed
      res.status(201).send({ message: 'User created successfully', userId: result.insertId });
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
  
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
