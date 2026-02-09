const http = require("http");

const studyGroups = [
  { id: 1, name: "Math Study Group" },
  { id: 2, name: "Science Study Group" }
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/groups") {
    res.end(JSON.stringify(studyGroups));
  } else {
    res.end(JSON.stringify({ message: "Study Buddy Backend Running ✅" }));
  }
});

server.listen(3000);
