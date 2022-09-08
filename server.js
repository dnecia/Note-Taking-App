//adding npm package
const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();
const fs = require("fs");

const path = require("path");

const theNotes = require("./db/db.json");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//getting the API's
app.get("/api/notes", (req, res) => {
  res.json(theNotes.slice(1));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//adding a function to create a note
function creatingNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray)) notesArray = [];

  if (notesArray.length === 0) notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}
//deleting the note function
//adding a listner
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
