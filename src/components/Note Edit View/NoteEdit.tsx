import { useState } from "react";
import styles from "./NoteEdit.module.css";
import { motion } from "framer-motion";
import type { Note } from "../../types";

interface NoteEditProps {
  onOpen: Note | null;
  onNewSave: (newNote: Note) => void;
  onEditedSave: (
    id: string,
    title: string,
    content: string,
    color: string,
  ) => void;
  onClose: () => void;
  layoutId: Note;
}

const NoteEdit = ({
  onOpen,
  onNewSave,
  onEditedSave,
  onClose,
  layoutId,
}: NoteEditProps) => {
  const [id] = useState(onOpen?._id || "");
  const [title, setTitle] = useState(onOpen?.title || "");
  const [content, setContent] = useState(onOpen?.content || "");
  const [color, setColor] = useState(onOpen?.color || "");

  const handleSaveNote = () => {
    if (id) {
      onEditedSave(id, title, content, color);
    } else {
      const newNote = {
        _id: Date.now().toString(),
        title: title,
        content: content,
        color: color,
        isPinned: false,
        isArchived: false,
        lastEdited: Date.now().toString(),
        isTrashed: false,
      };
      onNewSave(newNote);
    }
  };
  return (
    <motion.div
      className={styles.note_writing_view}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }} // Fast fade for background
    >
      <motion.div
        layoutId={layoutId?._id ? `note-${layoutId._id}` : undefined}
        className={styles.note_container}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: color }}
      >
        <input
          type="text"
          placeholder="Note Title..."
          className={styles.note_header}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="Write your Note here.."
          className={styles.note_content}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={styles.note_footer}>
          <div className={styles.note_colorpicker}>
            <button onClick={() => setColor("#Fcf7c1")}>
              <i className={`fa-solid fa-circle ${styles.yellow_button}`}></i>
            </button>
            <button onClick={() => setColor("#F8dcdc")}>
              <i className={`fa-solid fa-circle ${styles.red_button}`}></i>
            </button>
            <button onClick={() => setColor("#d6e4f8")}>
              <i className={`fa-solid fa-circle ${styles.blue_button}`}></i>
            </button>
            <button onClick={() => setColor("#dcfce7")}>
              <i className={`fa-solid fa-circle ${styles.green_button}`}></i>
            </button>
          </div>
          <button className={styles.done_button} onClick={handleSaveNote}>
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NoteEdit;
