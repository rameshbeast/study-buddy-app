CREATE DATABASE IF NOT EXISTS studybuddy;
USE studybuddy;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  course VARCHAR(50),
  subjects VARCHAR(50),
  availability VARCHAR(50),
  bio TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT,
  date DATETIME,
  location VARCHAR(50),
  user_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS session_tags (
  session_id INT,
  tag_id INT,
  FOREIGN KEY (session_id) REFERENCES sessions(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

INSERT INTO users (name, email, password, course, subjects, availability, bio) VALUES
('Jane Doe','jane@uni.edu','hashed_pw','Bachelor of Information Technology','Databases,Web Dev,Python,SQL','Mon/Wed afternoons','Second year Information Technology student.'),
('Alex Smith','alex@uni.edu','hashed_pw','Computer Science','Python,Algorithms,OOP','Tue/Thu','CS student who loves Python.'),
('Mia Kim','mia@uni.edu','hashed_pw','Software Engineering','React,Node.js,Express','Fridays','Software Eng student.');

INSERT INTO sessions (title, description, date, location, user_id) VALUES
('Database Design Study Group','Review ER diagrams and SQL.','2025-03-24 15:00:00','Library Room 2B',1),
('Python OOP Review','Practice OOP concepts.','2025-03-25 17:00:00','Online (Zoom)',2),
('Web Dev Sprint Prep','Work through Express and PUG.','2025-03-26 14:00:00','Online',3);

INSERT INTO tags (name) VALUES ('Databases'),('SQL'),('MySQL'),('Python'),('OOP'),('Express'),('Pug');

INSERT INTO session_tags (session_id, tag_id) VALUES (1,1),(1,2),(1,3),(2,4),(2,5),(3,6),(3,7);
