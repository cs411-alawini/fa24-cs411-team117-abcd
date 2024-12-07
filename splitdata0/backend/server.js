console.log("Server starting...");
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: '34.46.65.98', // Replace with your DB host
    user: 'kazzy',       // Replace with your DB username
    password: '',         // Replace with your DB password
    database: 'splitdata' // Replace with your DB name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to Google Cloud SQL database');
  }
});

// LOGIN
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username);

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password.' });
  }

  // In production, you'd use a hashed password check with bcrypt
  const query = 'SELECT * FROM Users WHERE username = ? AND password = ? LIMIT 1';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

// REGISTER
app.post('/api/register', (req, res) => {
  const { email, username, password } = req.body;
  console.log('Registration attempt:', email, username);

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Email, username and password are required.' });
  }

  // Check if email or username already exist
  const checkQuery = 'SELECT * FROM Users WHERE email = ? OR username = ? LIMIT 1';
  db.query(checkQuery, [email, username], (err, results) => {
    if (err) {
      console.error('Error checking existing users:', err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0) {
      // If email or username is taken
      const existingUser = results[0];
      if (existingUser.email === email) {
        return res.status(409).json({ message: 'Email already in use.' });
      }
      if (existingUser.username === username) {
        return res.status(409).json({ message: 'Username already exists.' });
      }
    }

    // In production, hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = 'INSERT INTO Users (email, username, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [email, username, password], (err) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).send('Server error');
      }

      res.status(201).json({ message: 'User registered successfully.' });
    });
  });
});

// Example routes for exercises or users listing
app.get('/api/exercises', (req, res) => {
  const query = 'SELECT * FROM Exercises';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching exercises:', err);
      res.status(500).send('Error fetching exercises');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM Users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
