import styles from "./Sidebar.module.css";
import { MdOutlineArchive } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { animate, AnimatePresence, motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { useEffect, useRef, useState } from "react";
import NewNoteButton from "../New Note Button/NewNoteButton";

const Sidebar = ({ onClick, tab, newNote }) => {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(
    !window.matchMedia("(min-width : 1024px)").matches,
  );
  const [isLaptop, setIsLaptop] = useState(
    window.matchMedia("(min-width : 1024px)").matches,
  );
  const timeRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e) => {
      setIsLaptop(e.matches);

      if (e.matches) {
        setIsSideBarCollapsed(false);
      } else {
        setIsSideBarCollapsed(true);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);


  return (
    <motion.div
      className={styles.sidebar}
      animate={{
        width: isSideBarCollapsed ? "5.25rem" : "15rem",
      }}
      transition={{ duration: 0.2 }}

    >
      <span className={styles.logo_newnote}>
        <Logo sidebarCollapsed={isSideBarCollapsed} />
        <NewNoteButton
          isSidebarCollapsed={isSideBarCollapsed}
          newNote={newNote}
        />
      </span>
      <ul className={styles.sidebar_items}>
        <li
          onClick={() => onClick("notes")}
          className={`${styles.sidebar_item} ${tab === "notes" ? styles.active : ""}`}
        >
          {tab === "notes" && (
            <motion.div
              layoutId="active-pill"
              className={styles.active_pill}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.4,
              }}
            />
          )}

          <FaRegNoteSticky size={20} />

          <AnimatePresence>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isSideBarCollapsed ? 0 : 1 }}
              exit={{ opacity: 0 }}
            >
              Notes
            </motion.span>
          </AnimatePresence>
        </li>
        <li
          onClick={() => onClick("archive")}
          className={`${styles.sidebar_item} ${tab === "archive" ? styles.active : ""}`}
        >
          {tab === "archive" && (
            <motion.div
              layoutId="active-pill"
              className={styles.active_pill}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.4,
              }}
            />
          )}
          <MdOutlineArchive size={20} />
          <AnimatePresence>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isSideBarCollapsed ? 0 : 1 }}
              exit={{ opacity: 0 }}
            >
              Archive
            </motion.span>
          </AnimatePresence>
        </li>
        <li
          onClick={() => onClick("trash")}
          className={`${styles.sidebar_item} ${tab === "trash" ? styles.active : ""}`}
        >
          {tab === "trash" && (
            <motion.div
              layoutId="active-pill"
              className={styles.active_pill}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.4,
              }}
            />
          )}
          <FaRegTrashAlt size={20} />
          <AnimatePresence>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isSideBarCollapsed ? 0 : 1 }}
              exit={{ opacity: 0 }}
            >
              Trash
            </motion.span>
          </AnimatePresence>
        </li>
      </ul>
    </motion.div>
  );
};

export default Sidebar;
