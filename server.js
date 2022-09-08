//adding npm package
const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 3001;
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
