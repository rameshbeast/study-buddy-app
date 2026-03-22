const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'studybuddy',
  waitForConnections: true,
  connectionLimit: 10,
});

app.use((req, res, next) => { req.db = db; next(); });

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, users) => {
    if (err) throw err;
    res.render('users', { users });
  });
});

app.get('/users/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) throw err;
    res.render('profile', { user: rows[0] });
  });
});

app.get('/sessions', (req, res) => {
  db.query('SELECT s.*, u.name AS author FROM sessions s JOIN users u ON s.user_id = u.id', (err, sessions) => {
    if (err) throw err;
    res.render('sessions', { sessions });
  });
});

app.get('/sessions/:id', (req, res) => {
  db.query('SELECT s.*, u.name AS author FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.id = ?', [req.params.id], (err, rows) => {
    if (err) throw err;
    db.query('SELECT t.name FROM tags t JOIN session_tags st ON t.id = st.tag_id WHERE st.session_id = ?', [req.params.id], (err2, tags) => {
      if (err2) throw err2;
      res.render('session-detail', { session: rows[0], tags });
    });
  });
});

app.get('/tags', (req, res) => {
  db.query('SELECT * FROM tags', (err, tags) => {
    if (err) throw err;
    res.render('tags', { tags });
  });
});

app.get('/', (req, res) => res.redirect('/sessions'));
app.listen(3000, () => console.log('Study Buddy running at http://localhost:3000'));
```

Then scroll down and in the commit message box type:
```
Add main Express server app.js
