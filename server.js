//dependencies
var express = require("express");
var path = require("path");
const fs = require("fs");
// app should have db.json file on the backend used to store and retrieve notes using the fs module.

//sets up express server and initial port for listeners
var app = express();
var PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static path 
app.use(express.static(path.join(__dirname, "public")));


// GET /notes 
app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/notes.html"));
// GET *
app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);