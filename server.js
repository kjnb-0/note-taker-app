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
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
//GET route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Read db.json file
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

app.get("/api/notes/:note", function (req, res) {
  var selectedNote = req.params.note;
  res.json(selectedNote);
});

// POST /api/notes
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  //adding ID so we can delete later
  newNote.id = Date.now();
  // Add to the db.json file
  let noteData = fs.readFileSync("./db/db.json");
  let noteTaker = JSON.parse(noteData);
  // Push to array
  noteTaker.push(req.body);
  // Stringify new array
  fs.writeFileSync("./db/db.json", JSON.stringify(noteTaker), (err, data) => {
    if (err) throw err;
    res.json(noteTaker);
  });

  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete.

app.delete("/api/notes/:id", (req, res) => {
  // Read all notes from db.json file
  let notedata = fs.readFileSync("./db/db.json");
  let noteTaker = JSON.parse(notedata);
  
  const savedNotes = noteTaker.find((n) => n.id === parseInt(req.params.id));
  const notesIndex = noteTaker.indexOf(savedNotes);
  noteTaker.splice(notesIndex);

  fs.writeFile(
    __dirname + "/db/db.json",
    JSON.stringify(noteTaker),
    (err, data) => {
      if (err) throw err;
      res.json(noteTaker);
    }
  );
});

// GET /notes
app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/notes.html"));
// GET *
app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);