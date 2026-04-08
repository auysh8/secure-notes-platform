import React from "react";
import styles from "./NewNoteButton.module.css";
import { FaPlus } from "react-icons/fa";
import { span } from "framer-motion/client";
import { animate, AnimatePresence, delay, motion } from "framer-motion";

const NewNoteButton = ({ newNote, isSidebarCollapsed }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.newnote}
    >
      <button className={styles.newnote_button} onClick={newNote}>
        <FaPlus />
        <AnimatePresence>
          <motion.span
          className={styles.newnote}
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: isSidebarCollapsed ? 0 : 1,
              width: isSidebarCollapsed ? 0 : "auto",
              marginLeft: isSidebarCollapsed ? 0 : "10px",
              transition: {duration:0}
            }}
            // transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0 , transition: {duration: 0}}}
            style={{ 
            overflow: "hidden", 
            whiteSpace: "nowrap", 
          }}
          >
            New Note
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

export default NewNoteButton;
