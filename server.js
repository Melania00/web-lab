const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files from www directory
app.use(express.static('www'));

// Connect to SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Create fridges table
db.run(`CREATE TABLE IF NOT EXISTS fridges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  brand TEXT,
  price REAL
)`);

// CRUD API for fridges

// CREATE a new fridge
app.post('/api/fridges', (req, res) => {
  const { name, description, brand, price } = req.body;
  const sql = `INSERT INTO fridges (name, description, brand, price) VALUES (?, ?, ?, ?)`;
  const params = [name, description, brand, price];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, name, description, brand, price });
  });
});

// READ all fridges
app.get('/api/fridges', (req, res) => {
  const sql = `SELECT * FROM fridges`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// READ a single fridge by id
app.get('/api/fridges/:id', (req, res) => {
  const sql = `SELECT * FROM fridges WHERE id = ?`;
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// UPDATE a fridge by id
app.put('/api/fridges/:id', (req, res) => {
  const { name, description, brand, price } = req.body;
  const sql = `UPDATE fridges SET name = ?, description = ?, brand = ?, price = ? WHERE id = ?`;
  const params = [name, description, brand, price, req.params.id];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: req.params.id, name, description, brand, price });
  });
});

// DELETE a fridge by id
app.delete('/api/fridges/:id', (req, res) => {
  const sql = `DELETE FROM fridges WHERE id = ?`;
  const params = [req.params.id];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(204).send();
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});