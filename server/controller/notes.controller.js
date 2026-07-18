const asyncHandler = require("express-async-handler");
const Note = require("../models/note.model");

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ userId: req.user });
  res.json({ notes, message: "Notes retrieved successfully" });
});

const createNewNote = asyncHandler(async (req, res) => {
  const { title, content, color, isPinned, isArchived, lastEdited, isTrashed } =
    req.body;

  const note = new Note({
    title,
    content,
    color,
    isPinned,
    isArchived,
    lastEdited,
    isTrashed,
    userId: req.user,
  });

  const savedNote = await note.save();
  res.json({ error: false, message: "Note saved", note: savedNote });
});

const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const deleteNote = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user,
  });
  if (!deleteNote) {
    res.status(404);
    throw new Error("Unable to delete note");
  }
  res.json({ message: "Note deleted successfully" });
});

const updateNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const updatedNote = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user },
    req.body,
    {
      new: true,
    },
  );
  if (!updatedNote) {
    res.status(404);
    throw new Error("Unable to update note");
  }
  res.json({ updatedNote, message: "Note updated successfully" });
});
module.exports = { getAllNotes, createNewNote, deleteNote, updateNote };
