import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import SearchBar from "./components/Search bar/SearchBar";
import "./App.css";
import NoteGrid from "./components/Notes Grid/NotesGrid";
import NewNoteButton from "./components/New Note Button/NewNoteButton";
import NoteEdit from "./components/Note Edit View/NoteEdit";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
const App = () => {
  const [isNoteView, setIsNoteView] = useState(false);
  const [selectNote, setSelectNote] = useState<any>(null);
  const [notes, setNotes] = useState([]);
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
    let filterNotes = [];
    if (activeTab === "notes") {
      filterNotes = notes.filter((note) => !note.isArchived && !note.isTrashed);
    } else if (activeTab === "archive") {
      filterNotes = notes.filter((note) => note.isArchived && !note.isTrashed);
    } else if (activeTab === "trash") {
      filterNotes = notes.filter((note) => note.isTrashed);
    }

    if (searchInput.trim().length > 0) {
      filterNotes = filterNotes.filter((note: any) => {
        return (
          note.title?.toLowerCase().includes(searchInput) ||
          note.content?.toLowerCase().includes(searchInput)
        );
      });
    }

    filterNotes = filterNotes.sort((a: any, b: any) => {
      if (b.isPinned !== a.isPinned) {
        return Number(b.isPinned || 0) - Number(a.isPinned || 0);
      }
      return b.lastEdited - a.lastEdited;
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

  const handlePermanentlyDelete = async (deleteId: any) => {
    const newNoteArray = notes.filter((note: any) => {
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

  const handleNoteRestore = async (restoreId: any) => {
    const newNoteArray = notes.map((note: any) => {
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

  const handleTrashNote = async (trashId: any) => {
    const newNoteArray = notes.map((note: any) => {
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

  const handleArchiveNote = async (archiveId: any) => {
    const newNoteArray = notes.map((note: any) => {
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
      const newAcrhiveStatus = !noteToUpdate.isArchived;
      await axios.put(`http://localhost:5000/api/notes/${archiveId}`, {
        isArchived: newAcrhiveStatus,
      });
    } catch (err) {
      console.error(err);
    }
    setNotes(newNoteArray);
  };

  const handlePinNote = async (pinId) => {
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
      const newPinStatus = !noteToPin.isPinned;
      await axios.put(`http://localhost:5000/api/notes/${pinId}`, {
        isPinned: newPinStatus,
      });
    } catch (err) {
      console.error(err);
    }
    setNotes(newNoteArray);
  };

  const handleNote = (key: any) => {
    setIsNoteView(true);
    const noteToEdit = notes.find((note: any) => key === note._id);
    setSelectNote(noteToEdit);
  };

  const newNoteSave = async (newData: any) => {
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

  const editNoteSave = async (
    id: any,
    newTitle: any,
    newContent: any,
    newColor: any,
  ) => {
    setIsNoteView(false);
    const newNoteArray = notes.map((note: any) => {
      if (note._id === id) {
        return {
          ...note,
          title: newTitle,
          content: newContent,
          color: newColor,
          lastEdited: Date.now(),
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
