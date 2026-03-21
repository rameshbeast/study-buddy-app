const express = require("express");
const app = express();
const mysql = require("mysql2");

app.set("view engine", "pug");
app.set("views", "./backend/views");

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "password",
  database: "studybuddy"
});

db.connect();

// USERS
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    res.render("users", { users: result });
  });
});

// PROFILE
app.get("/profile/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id=?", [req.params.id], (err, result) => {
    res.render("profile", { user: result[0] });
  });
});

// SESSIONS
app.get("/sessions", (req, res) => {
  db.query("SELECT * FROM sessions", (err, result) => {
    res.render("sessions", { sessions: result });
  });
});

// DETAIL
app.get("/sessions/:id", (req, res) => {
  db.query("SELECT * FROM sessions WHERE id=?", [req.params.id], (err, result) => {
    res.render("detail", { session: result[0] });
  });
});

// TAGS
app.get("/tags", (req, res) => {
  db.query("SELECT * FROM tags", (err, result) => {
    res.render("tags", { tags: result });
  });
});

app.listen(3000);
