const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  createNewNote,
  deleteNote,
  updateNote,
} = require("../controller/notes.controller");

router.get("/", getAllNotes);

router.post("/", createNewNote);

router.delete("/:id", deleteNote);

router.put("/:id", updateNote);

module.exports = router;
