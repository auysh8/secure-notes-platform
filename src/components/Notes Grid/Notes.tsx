import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VscPinned } from "react-icons/vsc";
import { TbPinnedFilled } from "react-icons/tb";
import { RiInboxArchiveLine } from "react-icons/ri";
import { RiInboxArchiveFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRestore } from "react-icons/md";
import styles from "./Notes.module.css";
// import { button } from "framer-motion/client";

const Notes = ({
  onClick,
  noteData,
  pinId,
  archiveId,
  trashId,
  restoreId,
  deleteId,
}: any) => {
  // const notePinned = noteData.isPinned;
  // const noteArchived = noteData.isArchived;
  const [popup, setPopup] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popup && menuRef.current && !menuRef.current.contains(event.target)) {
        setPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[popup]);

  const handlePopup = () => {
    setPopup(!popup);
  };
  const formatTimeAgo = () => {
    if (!noteData) {
      return "";
    }
    const secounds = Math.floor((Date.now() - noteData.lastEdited) / 1000);
    let interval = Math.floor(secounds / 31536000);
    if (interval >= 1) return interval + "y ago";

    interval = Math.floor(secounds / 2592000);
    if (interval >= 1) return interval + "m ago";

    interval = Math.floor(secounds / 86400);
    if (interval >= 1) return interval + "d ago";

    interval = Math.floor(secounds / 3600);
    if (interval >= 1) return interval + "h ago";

    interval = Math.floor(secounds / 60);
    if (interval >= 1) return interval + "min ago";

    return "just now";
  };
  return (
    <motion.div
      className={styles.note}
      onClick={onClick}
      style={{ backgroundColor: `${noteData.color}` }}
      whileHover={{ y: -3, boxShadow: "0 10px 18px rgba(0, 0, 0, 0.14)" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className={styles.notes_header}>
        <span className={styles.notes_heading}>{noteData.title}</span>
        <button
          className={styles.pin_button}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            pinId(noteData._id);
          }}
        >
          {noteData.isPinned ? (
            <TbPinnedFilled size={20} color="#4f4f4fff" />
          ) : (
            <VscPinned size={20} color="#4f4f4fff" />
          )}
        </button>
      </div>
      <span className={styles.note_content}>{noteData.content}</span>
      <div className={styles.note_footer}>
        <div className={styles.note_time_edited}>
          <span>Edited {formatTimeAgo()}</span>
        </div>
        <div
          className={styles.extras_container}
          ref={menuRef}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <AnimatePresence>
            {popup ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className={styles.popup_container}
              >
                <ul className={styles.extras_list}>
                  <li>
                    {noteData.isTrashed ? (
                      <button
                        className={styles.restore_button}
                        onClick={() => restoreId(noteData._id)}
                      >
                        <span>Restore</span>
                        <MdOutlineRestore size={20} color="#4f4f4fff" />
                      </button>
                    ) : (
                      <button
                        className={styles.archive_button}
                        onClick={() => archiveId(noteData._id)}
                      >
                        {noteData.isArchived ? (
                          <span>Unarchive</span>
                        ) : (
                          <span>Archive</span>
                        )}

                        {noteData.isArchived ? (
                          <RiInboxArchiveFill size={20} color="#4f4f4fff" />
                        ) : (
                          <RiInboxArchiveLine size={20} color="#4f4f4fff" />
                        )}
                      </button>
                    )}
                  </li>
                  <li>
                    {noteData.isTrashed ? (
                      <button
                        className={styles.permanent_delete_button}
                        onClick={() => deleteId(noteData._id)}
                      >
                        <span style={{ color: "#ff0000ff" }}>
                          Delete Permanently
                        </span>
                        <FaRegTrashAlt size={20} color="#ff0000ff" />
                      </button>
                    ) : (
                      <button
                        className={styles.trash_button}
                        onClick={() => trashId(noteData._id)}
                      >
                        <span style={{ color: "#ff0000ff" }}>Trash</span>
                        <FaRegTrashAlt size={20} color="#ff0000ff" />
                      </button>
                    )}
                  </li>
                </ul>
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
          <button onClick={handlePopup} className={styles.three_dot_menu}>
            <BsThreeDotsVertical size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Notes;
