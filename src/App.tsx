import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import SearchBar from "./components/Search bar/SearchBar";
import "./App.css";
import NoteGrid from "./components/Notes Grid/NotesGrid";
import NoteEdit from "./components/Note Edit View/NoteEdit";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import type { Note } from "./types";

const App = () => {
  const [isNoteView, setIsNoteView] = useState(false);
  const [selectNote, setSelectNote] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab =
    location.pathname === "/" ? "notes" : location.pathname.substring(1);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notes`);
        setNotes(response.data.notes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, []);

  const handleSearchBar = (input: string) => {
    setSearchInput(input);
  };

  const handleSidebar = (tab: string) => {
    if (tab === "notes") {
      navigate("/");
    } else {
      navigate(`/${tab}`);
    }
  };

  const renderNotes = () => {
    let filterNotes: Note[] = [];
    if (activeTab === "notes") {
      filterNotes = notes.filter((note) => !note.isArchived && !note.isTrashed);
    } else if (activeTab === "archive") {
      filterNotes = notes.filter((note) => note.isArchived && !note.isTrashed);
    } else if (activeTab === "trash") {
      filterNotes = notes.filter((note) => note.isTrashed);
    }

    if (searchInput.trim().length > 0) {
      filterNotes = filterNotes.filter((note) => {
        return (
          note.title?.toLowerCase().includes(searchInput) ||
          note.content?.toLowerCase().includes(searchInput)
        );
      });
    }

    filterNotes = filterNotes.sort((a, b) => {
      if (b.isPinned !== a.isPinned) {
        return Number(b.isPinned || 0) - Number(a.isPinned || 0);
      }
      return (
        new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()
      );
    });
    return filterNotes;
  };

  const handleNewNote = () => {
    setIsNoteView(true);
    setSelectNote(null);
  };

  const noteClose = () => {
    setIsNoteView(false);
  };

  const handlePermanentlyDelete = async (deleteId: string) => {
    const newNoteArray = notes.filter((note) => {
      if (deleteId === note._id) {
        return false;
      }
      return true;
    });
    try {
      await axios.delete(`http://localhost:5000/api/notes/${deleteId}`);
    } catch (err) {
      console.error(err);
    }
    setNotes(newNoteArray);
  };

  const handleNoteRestore = async (restoreId: string) => {
    const newNoteArray = notes.map((note) => {
      if (restoreId === note._id && note.isTrashed === true) {
        return { ...note, isTrashed: false };
      }
      return { ...note };
    });
    try {
      await axios.put(`http://localhost:5000/api/notes/${restoreId}`, {
        isTrashed: false,
      });
    } catch (err) {
      console.error(err);
    }
    setNotes(newNoteArray);
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
      await axios.put(`http://localhost:5000/api/notes/${trashId}`, {
        isTrashed: true,
      });
    } catch (err) {
      console.error(err);
    }
    setNotes(newNoteArray);
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
      const newAcrhiveStatus = !noteToUpdate.isArchived;
      await axios.put(`http://localhost:5000/api/notes/${archiveId}`, {
        isArchived: newAcrhiveStatus,
      });
    } catch (err) {
      console.error(err);
    }
    setNotes(newNoteArray);
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
      if(!noteToPin){
        console.error("Note not found")
        return
      }
      const newPinStatus = !noteToPin.isPinned;
      await axios.put(`http://localhost:5000/api/notes/${pinId}`, {
        isPinned: newPinStatus,
      });
    } catch (err) {
      console.error(err);
    }
    setNotes(newNoteArray);
  };

  const handleNote = (key : string) => {
    setIsNoteView(true);
    const noteToEdit = notes.find((note) => key === note._id);
    setSelectNote(noteToEdit);
  };

  const newNoteSave = async (newData : Note) => {
    setIsNoteView(false);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/notes`,
        newData,
      );
      console.log("Backend Response:", response.data);
      if (!response.data.error) {
        setNotes([response.data.note, ...notes]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editNoteSave = async (id : string, newTitle : string, newContent : string, newColor : string) => {
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
      await axios.put(`http://localhost:5000/api/notes/${id}`, {
        title: newTitle,
        content: newContent,
        color: newColor,
        lastEdited: Date.now(),
      });
    } catch (err) {
      console.error(err);
    }
    setNotes(newNoteArray);
  };
  return (
    <div className="app">
      <Sidebar
        onClick={handleSidebar}
        tab={activeTab}
        newNote={handleNewNote}
      />
      <div className="dashboard">
        <SearchBar input={handleSearchBar} />
        <NoteGrid
          tab={activeTab}
          onClick={handleNote}
          notes={renderNotes()}
          pinId={handlePinNote}
          archiveId={handleArchiveNote}
          trashId={handleTrashNote}
          restoreId={handleNoteRestore}
          deleteId={handlePermanentlyDelete}
        />
      </div>
      <AnimatePresence>
        {isNoteView && (
          <NoteEdit
            layoutId={selectNote}
            onOpen={selectNote}
            onClose={noteClose}
            onNewSave={newNoteSave}
            onEditedSave={editNoteSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
