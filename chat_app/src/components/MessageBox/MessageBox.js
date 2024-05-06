import React from 'react'
import styles from './messageBox.module.css'
function MessageBox({message}) {
  return (
    <div className={styles.messageBoxContainer}>
        <div className={styles.userProfileAvatar} style={{backgroundColor:`${message.userName.color}`}}>
            <span>{message.userName.name.slice(0,2).toUpperCase()}</span>
        </div>
        <div className={styles.messageContainer}>
            <div className={styles.userNameContainer}>
                <h3>{message.userName.name}</h3>
                <span>{message.timeHour}:{message.timeMinute}</span>
            </div>
            <div className={styles.messageBox}>
                {message.message}
            </div>
        </div>
    </div>
  )
}

export default MessageBox