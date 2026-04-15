const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note.model");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error", err));

app.use(cors());
app.use(express.json());

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({ notes, message: "Notes retrieved successfully" });
  } catch (err) {
    console.error(err);
    res.json({ message: "Internal Server Error" });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const {
      title,
      content,
      color,
      isPinned,
      isArchived,
      lastEdited,
      isTrashed,
    } = req.body;

    const note = new Note({
      title,
      content,
      color,
      isPinned,
      isArchived,
      lastEdited,
      isTrashed,
    });

    const savedNote = await note.save();
    res.json({ error: false, message: "Note saved", note: savedNote });
  } catch (err) {
    res.json({ message: "Internal Server error" });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    await Note.findByIdAndDelete(noteId);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal server error" });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });
    res.json({ updatedNote, message: "Note updated successfully" });
    console.log("Note updated");
  } catch (err) {
    res.json({ message: "Internal server error" });
    console.error(err);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`The backend is live at ${PORT}`);
});