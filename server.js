//dependencies
var express = require("express");
var path = require("path");
const fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// static path 
app.use(express.static(path.join(__dirname, "public")));

//GET route for homepage
app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname,'public/index.html'));
  });
//GET route for notes page
  app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname,'public/notes.html'));
  });
  
  // Read db.json file 
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'db/db.json'));
  });

// GET /notes 
app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/notes.html"));
// GET *
app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);