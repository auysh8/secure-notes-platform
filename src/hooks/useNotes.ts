import {
  deleteNote,
  restoreNote,
  trashNote,
  archiveNote,
  pinNote,
  saveNote,
  editNote,
  getNotes,
} from "../services/notesApi";
import { useState, useEffect } from "react";
import type { Note } from "../types";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isNoteView, setIsNoteView] = useState(false);
  const [selectNote, setSelectNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();
        setNotes(response.data.notes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, []);

  const handlePermanentlyDelete = async (deleteId: string) => {
    const newNoteArray = notes.filter((note) => {
      if (deleteId === note._id) {
        return false;
      }
      return true;
    });
    try {
      await deleteNote(deleteId);
      setNotes(newNoteArray);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNoteRestore = async (restoreId: string) => {
    const newNoteArray = notes.map((note) => {
      if (restoreId === note._id && note.isTrashed === true) {
        return { ...note, isTrashed: false };
      }
      return { ...note };
    });
    try {
      await restoreNote(restoreId);
      setNotes(newNoteArray);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTrashNote = async (trashId: string) => {
    const newNoteArray = notes.map((note) => {
      if (note._id === trashId && note.isTrashed === false) {
        return { ...note, isTrashed: true };
      }
      if (
        note._id === trashId &&
        note.isTrashed === false &&
        note.isArchived === true
      ) {
        return { ...note, isTrashed: true };
      }
      return { ...note };
    });
    try {
      await trashNote(trashId);
      setNotes(newNoteArray);
    } catch (err) {
      console.error(err);
    }
  };

  const handleArchiveNote = async (archiveId: string) => {
    const newNoteArray = notes.map((note) => {
      if (archiveId === note._id && note.isArchived === false) {
        return { ...note, isArchived: true };
      }
      if (archiveId === note._id && note.isArchived === true) {
        return { ...note, isArchived: false };
      }
      return { ...note };
    });
    try {
      const noteToUpdate = notes.find((note) => note._id === archiveId);
      if (!noteToUpdate) {
        console.error("Note not found");
        return;
      }
      const newArchiveStatus = !noteToUpdate.isArchived;
      await archiveNote(archiveId, newArchiveStatus);
      setNotes(newNoteArray);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePinNote = async (pinId: string) => {
    const newNoteArray = notes.map((note) => {
      if (note._id === pinId && note.isPinned === false) {
        return { ...note, isPinned: true };
      }
      if (note._id === pinId && note.isPinned === true) {
        return { ...note, isPinned: false };
      }
      return { ...note };
    });
    try {
      const noteToPin = notes.find((note) => note._id === pinId);
      if (!noteToPin) {
        console.error("Note not found");
        return;
      }
      const newPinStatus = !noteToPin.isPinned;
      await pinNote(pinId, newPinStatus);
      setNotes(newNoteArray);
    } catch (err) {
      console.error(err);
    }
  };

  const newNoteSave = async (newData: Note) => {
    setIsNoteView(false);
    try {
      const response = await saveNote(newData);
      console.log("Backend Response:", response.data);
      if (!response.data.error) {
        setNotes([response.data.note, ...notes]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editNoteSave = async (
    id: string,
    newTitle: string,
    newContent: string,
    newColor: string,
  ) => {
    setIsNoteView(false);
    const newNoteArray = notes.map((note) => {
      if (note._id === id) {
        return {
          ...note,
          title: newTitle,
          content: newContent,
          color: newColor,
          lastEdited: new Date().toISOString(),
        };
      }
      return note;
    });
    try {
      await editNote(id, newTitle, newContent, newColor);
      setNotes(newNoteArray);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewNote = () => {
    setIsNoteView(true);
    setSelectNote(null);
  };

  const noteClose = () => {
    setIsNoteView(false);
  };

  const handleNote = (key: string) => {
    setIsNoteView(true);
    const noteToEdit = notes.find((note) => key === note._id);
    setSelectNote(noteToEdit);
  };

  return {
    notes,
    isNoteView,
    selectNote,
    handlePermanentlyDelete,
    handleNoteRestore,
    handleTrashNote,
    handleArchiveNote,
    handlePinNote,
    newNoteSave,
    editNoteSave,
    handleNewNote,
    noteClose,
    handleNote,
  };
};
