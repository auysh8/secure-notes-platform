const express = require("express");
const Note = require("../models/note.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({ notes, message: "Notes retrieved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
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
    res.status(500).json({ message: "Internal Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    await Note.findByIdAndDelete(noteId);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });
    res.json({ updatedNote, message: "Note updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
