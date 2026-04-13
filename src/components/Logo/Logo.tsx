import React, { useState } from "react";
import styles from "./Logo.module.css";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { FaRegNoteSticky } from "react-icons/fa6";
const Logo = ({ sidebarCollapsed , setIsSidebarCollapsed}) => {
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);
  return (
    <div className={styles.logo}>
      <button
        className={styles.icon}
        onMouseEnter={() => setIsSidebarToggle(true)}
        onMouseLeave={() => setIsSidebarToggle(false)}
        onClick={() => setIsSidebarCollapsed(false)}
      >
        {sidebarCollapsed && isSidebarToggle && <TbLayoutSidebarRightCollapse size={25} />}
        {(!sidebarCollapsed || !isSidebarToggle) && <FaRegNoteSticky size={25} />}
      </button>
      {!sidebarCollapsed && <span className={styles.app_name}>Notes</span>}
      {!sidebarCollapsed && (
        <button className={styles.minimize} onClick={() => setIsSidebarCollapsed(true)}>
          <TbLayoutSidebarLeftCollapse size={25} />
        </button>
      )}
    </div>
  );
};

export default Logo;
