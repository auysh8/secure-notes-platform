"use client";
import { Suspense, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import SearchBar from "../components/Search bar/SearchBar";
import styles from "./Dashboard.module.css";
import NoteGrid from "../components/Notes Grid/NotesGrid";
import NoteEdit from "../components/Note Edit View/NoteEdit";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import type { Note } from "../types";
import { useNotes } from "../hooks/useNotes";
const DashboardContent = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
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
    handleNote,
    noteClose,
  } = useNotes();

  const activeTab = searchParams.get("tab") || "notes";

  const handleSearchBar = (input: string) => {
    setSearchInput(input);
  };

  const handleSidebar = (tab: string) => {
    if (tab === "notes") {
      router.push("/");
    } else {
      router.push(`/?tab=${tab}`);
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
  return (
    <div className={styles.app}>
      <Sidebar
        onClick={handleSidebar}
        tab={activeTab}
        newNote={handleNewNote}
      />
      <div className={styles.dashboard}>
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

export default function Dashboard() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
