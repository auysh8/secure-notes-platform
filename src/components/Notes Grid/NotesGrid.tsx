import Notes from "./Notes";
import styles from "./NotesGrid.module.css";
import { motion, AnimatePresence } from "framer-motion";
import empty_notes_state from "../../assets/Notes.svg";
import empty_archive_state from "../../assets/Archive.svg";
import empty_trash_state from "../../assets/Trash.svg";
import type { Note } from "../../types";

interface NotesGridProps {
  tab: string;
  onClick: (value: string) => void;
  notes: Note[];
  pinId: (value: string) => void;
  archiveId: (value: string) => void;
  trashId: (value: string) => void;
  restoreId: (value: string) => void;
  deleteId: (value: string) => void;
}

const NotesGrid = ({
  tab,
  onClick,
  notes,
  pinId,
  archiveId,
  trashId,
  restoreId,
  deleteId,
}: NotesGridProps) => {
  return (
    <div className={styles.notesContainer}>
      {Object.keys(notes).length == 0 && tab == "notes" ? (
        <div className={styles.empty_state}>
          <img src={empty_notes_state} alt="" />
          <h2 className={styles.empty_title}>Your thoughts start here</h2>
          <p className={styles.empty_desc}>
            Capture ideas, organize tasks, and keep track of your daily
            inspirations. Start by creating your first note.
          </p>
        </div>
      ) : null}
      {Object.keys(notes).length == 0 && tab == "archive" ? (
        <div className={styles.empty_state}>
          <img src={empty_archive_state} alt="No Notes" />
          <h2 className={styles.empty_title}>A quiet place</h2>
          <p className={styles.empty_desc}>
            Select notes you don't need right now but want to keep for later.
            They will be safe here.
          </p>
        </div>
      ) : null}
      {Object.keys(notes).length == 0 && tab == "trash" ? (
        <div className={styles.empty_state}>
          <img src={empty_trash_state} alt="No Notes" />
          <h2 className={styles.empty_title}>Trash is empty</h2>
          <p className={styles.empty_desc}>
            Notes you delete move here. You can restore them anytime or delete
            them forever.
          </p>
        </div>
      ) : null}
      <AnimatePresence mode="popLayout">
        {notes.map((note) => (
          <motion.div
            key={note._id}
            layout
            layoutId={`note-${note._id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 },
            }}
            className={styles.noteItem}
          >
            <Notes
              onClick={() => onClick(note._id)}
              noteData={note}
              archiveId={archiveId}
              pinId={pinId}
              trashId={trashId}
              restoreId={restoreId}
              deleteId={deleteId}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotesGrid;
