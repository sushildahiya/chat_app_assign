import React, { useEffect, useState } from 'react'
import { useRoomValue } from '../context/roomContext'
import styles from './chartSection.module.css'
import { PiUsersBold } from "react-icons/pi";
import EmojiPicker from 'emoji-picker-react'

function ChatSection() {
    const [showEmojiToolbar, setShowEmojiToolbar]= useState(false)
    const [message,setMessage]=useState('')
    const {userList,messages,currentRoom} = useRoomValue()

    const handleEmojiClicks=({emoji})=>{
        setMessage(message + emoji)
    }
   
    const handleKeyPress=(e)=>{
        console.log("+++++++++",e.target.value)
    }
  return (
    <div className={styles.chatSectionContainer}>
        <div className={styles.topHeader}>
            <div className={styles.roomDetail}>
                <div id={styles.roomName}>
                    <h3>{currentRoom.name}</h3>
                </div>
                <div id={styles.roomDescription}>
                    This Channe Is For Company Wide Chatter.
                </div>
            </div>
            <div className={styles.activeUsers}>
                <div><span>{userList.length} | 100</span>
                </div>
                <PiUsersBold id={styles.userAvatar} />
            </div>
        </div>
        <div className={styles.chatContainer}>

        </div>
        <div className={styles.inputContainer}>
            <input type="text" placeholder="Type message here." value={message} onChange={(e)=>setMessage(e.target.value)} />
            {showEmojiToolbar&&<div className={styles.emoji}>
                <EmojiPicker  searchDisabled="true" customEmoji={[{emoji:"symbols"}]} width="270px" height="300px" previewConfig={{showPreview:false}} onEmojiClick={handleEmojiClicks}/>
            </div>}

            
            <button id={styles.emojiButton} onClick={()=>setShowEmojiToolbar(!showEmojiToolbar)}>😀</button>
            
        </div>
    </div>
  )
}

export default ChatSection