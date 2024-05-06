import React, { useEffect, useState, useMemo,useCallback} from 'react'
import { useRoomValue } from '../context/roomContext'
import styles from './chartSection.module.css'
import { PiUsersBold } from "react-icons/pi";
import EmojiPicker from 'emoji-picker-react'
import { BsSend } from "react-icons/bs";
import socketIO from 'socket.io-client';
import MessageBox from './MessageBox/MessageBox';
const date = new Date();
const hour = date.getHours();
const minutes = date.getMinutes();

function ChatSection() {
    const [showEmojiToolbar, setShowEmojiToolbar]= useState(false)
    const [message,setMessage]=useState('')
    const {userList,user,addMessage,messages,currentRoom} = useRoomValue()
    
    const socket = useMemo(() => socketIO('http://localhost:8000/'), []);

      const joinRoom = () => {
        if (socket && currentRoom) {
       socket.emit('joinRoom', currentRoom.id);
        }
        
      };

      useEffect(() => {
          joinRoom(); // Call joinRoom after socket is set
          return () => {
            if (socket) {
              socket.disconnect();
            }
          };
      }, [socket,currentRoom]); // Depend on the socket state

  // Handle incoming messages
  useEffect(() => {
    if (socket) {
      socket.on('message', (newMessage) => {
        // Handle incoming message here
        console.log('New message:', newMessage);
        addMessage(newMessage)
      });
    }
  }, [])


  const handleEmojiClicks = useCallback(({ emoji }) => {
    setMessage((prevMessage) => prevMessage + emoji);
  }, []);

  const handleSentMessage =() => {
    setShowEmojiToolbar(false);
    if (message.trim().length==0) {
      return;
    }
    const newMessage = {
      userName: user,
      message: message,
      likes: 0,
      timeHour: hour,
      timeMinute: minutes
    };
    if (socket) {
      socket.emit('sendMessage', { roomId: currentRoom.id, message: newMessage });
    }
    setMessage('');
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
            {messages.map((message,index)=>
              <MessageBox message={message} key={index}/>
            )}
        </div>
        <div className={styles.inputContainer}>
            <input type="text" placeholder="Type message here." value={message} onChange={(e)=>setMessage(e.target.value)} />
            {showEmojiToolbar&&<div className={styles.emoji}>
                <EmojiPicker  searchDisabled="true" customEmoji={[{emoji:"symbols"}]} width="270px" height="300px" previewConfig={{showPreview:false}} onEmojiClick={handleEmojiClicks}/>
            </div>}

            <button id={styles.sendButton} onClick={()=>handleSentMessage()}>
                <BsSend className="send-icon" />
            </button>
            
            <button id={styles.emojiButton} onClick={()=>setShowEmojiToolbar(!showEmojiToolbar)}>😀</button>
            
        </div>
    </div>
  )
}

export default ChatSection