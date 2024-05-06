import React from "react";
import { useRoomValue } from "../context/roomContext";
import { CiCirclePlus } from "react-icons/ci";
import styles from "./sideBar.module.css";
function SideBar() {
  const { user, rooms, currentRoom, changeRoom } = useRoomValue();
  return (
    <div className={styles.sidebarSection}>
      <div className={styles.userSection}>
        <div
          id={styles.userProfileImage}
          style={{ backgroundColor: `${user.color}` }}
        >
          <span className="">{user.name.slice(0, 2).toUpperCase()}</span>
          <div id={styles.userActive}></div>
        </div>
        <div className={styles.userNameSection}>
          <h3>{user.name}</h3>
          <p>Software Engineer</p>
        </div>
      </div>
      <div className={styles.conversationSection}>
        <h4>Conversations</h4>
        <CiCirclePlus className={styles.circlePlus} />
      </div>
      <div className={styles.roomSection}>
        {rooms.map((room, index) => (
          <div
            className={`${styles.roomContainer} ${
              currentRoom.id === room.id ? styles.active : ""
            }`}
            key={room.id}
            onClick={() => changeRoom(room.id)}
          >
            <div id={styles.hash}>
              <span>#</span>
            </div>
            <div id={styles.roomName}>
              <span>{room.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
