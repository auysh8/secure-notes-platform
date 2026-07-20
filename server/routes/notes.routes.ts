import express from "express";
const router = express.Router();
import {
  getAllNotes,
  createNewNote,
  deleteNote,
  updateNote,
} from "../controller/notes.controller";

router.get("/", getAllNotes);

router.post("/", createNewNote);

router.delete("/:id", deleteNote);

router.put("/:id", updateNote);

module.exports = router;
