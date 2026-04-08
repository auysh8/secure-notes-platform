import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import SearchBar from "./components/Search bar/SearchBar";
import "./App.css";
import NoteGrid from "./components/Notes Grid/NotesGrid";
import NewNoteButton from "./components/New Note Button/NewNoteButton";
import NoteEdit from "./components/Note Edit View/NoteEdit";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
const App = () => {
  const [isNoteView, setIsNoteView] = useState(false);
  const [selectNote, setSelectNote] = useState<any>(null);
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("myNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const countArchves = notes.filter((note) => note.isArchived);
  const countTrashed = notes.filter((note) => note.isTrashed);

  const activeTab =
    location.pathname === "/" ? "notes" : location.pathname.substring(1);
  useEffect(() => {
    localStorage.setItem("myNotes", JSON.stringify(notes));
  }, [notes]);

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
    setSelectNote(null); // Fix: don't use {} for selectNote if it's meant to be a note object or null
  };

  const noteClose = () => {
    setIsNoteView(false);
  };

  const handlePermanentlyDelete = (deleteId: any) => {
    const newNoteArray = notes.filter((note: any) => {
      if (deleteId === note.id) {
        return false;
      }
      return true;
    });
    setNotes(newNoteArray);
  };

  const handleNoteRestore = (restoreId: any) => {
    const newNoteArray = notes.map((note: any) => {
      if (restoreId === note.id && note.isTrashed === true) {
        return { ...note, isTrashed: false };
      }
      return { ...note };
    });
    setNotes(newNoteArray);
  };

  const handleTrashNote = (trashId: any) => {
    const newNoteArray = notes.map((note: any) => {
      if (note.id === trashId && note.isTrashed === false) {
        return { ...note, isTrashed: true };
      }
      if (
        note.id === trashId &&
        note.isTrashed === false &&
        note.isArchived === true
      ) {
        return { ...note, isTrashed: true };
      }
      return { ...note };
    });
    setNotes(newNoteArray);
  };

  const handleArchiveNote = (archiveId: any) => {
    const newNoteArray = notes.map((note: any) => {
      if (archiveId === note.id && note.isArchived === false) {
        return { ...note, isArchived: true };
      }
      if (archiveId === note.id && note.isArchived === true) {
        return { ...note, isArchived: false };
      }
      return { ...note };
    });
    setNotes(newNoteArray);
  };

  const handlePinNote = (pinId) => {
    const newNoteArray = notes.map((note) => {
      if (note.id === pinId && note.isPinned === false) {
        return { ...note, isPinned: true };
      }
      if (note.id === pinId && note.isPinned === true) {
        return { ...note, isPinned: false };
      }
      return { ...note };
    });
    setNotes(newNoteArray);
  };

  const handleNote = (key: any) => {
    setIsNoteView(true);
    const noteToEdit = notes.find((note: any) => key === note.id);
    setSelectNote(noteToEdit);
  };

  const newNoteSave = (newData: any) => {
    setIsNoteView(false);
    setNotes([newData, ...notes]);
  };
  const editNoteSave = (
    id: any,
    newTitle: any,
    newContent: any,
    newColor: any,
  ) => {
    setIsNoteView(false);
    const newNoteArray = notes.map((note: any) => {
      if (note.id === id) {
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
    setNotes(newNoteArray);
  };
  return (
    <div className="app">
      <Sidebar onClick={handleSidebar} tab={activeTab} newNote={handleNewNote}/>
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
        {/* {activeTab === "notes" ? (
          <NewNoteButton onClick={handleNewNote} />
        ) : null} */}
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
