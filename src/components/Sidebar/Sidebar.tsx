import styles from "./Sidebar.module.css";
import { MdOutlineLogout } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { useEffect, useState } from "react";
import NewNoteButton from "../New Note Button/NewNoteButton";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onClick: (value: string) => void;
  tab: string;
  newNote: () => void;
}

const Sidebar = ({ onClick, tab, newNote }: SidebarProps) => {
  const userName = localStorage.getItem("name") || "User";
  console.log(userName);
  const navigate = useNavigate();
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(
    !window.matchMedia("(min-width : 1024px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsSideBarCollapsed(false);
      } else {
        setIsSideBarCollapsed(true);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <motion.div
      className={styles.sidebar}
      animate={{
        width: isSideBarCollapsed ? "5.25rem" : "15rem",
      }}
      transition={{ duration: 0.2 }}
    >
      <span className={styles.logo_newnote}>
        <Logo
          sidebarCollapsed={isSideBarCollapsed}
          setIsSidebarCollapsed={setIsSideBarCollapsed}
        />
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
      <div className={styles.profile_container}>
        <div className={styles.avatar}>
          <img src={`https://ui-avatars.com/api/?name=${userName}`} alt="" />
        </div>

        <motion.div
          className={styles.username_logout}
          animate={{
            opacity: isSideBarCollapsed ? 0 : 1,
            pointerEvents: isSideBarCollapsed ? "none" : "auto",
          }}
          transition={{ duration: 0.2 }}
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <span className={styles.username}>{userName}</span>
          <button className={styles.logout_button} onClick={handleLogout}>
            <MdOutlineLogout />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
