import { createContext, useContext, useState } from "react";

const roomContext = createContext()
function getRoomValue(){
    return useContext(roomContext)
}

function CustomRoomContext({children}){
    const [user,setUser]=useState()
    const [currentRoom,setCurrentRoom]=useState()
    const [messages,setMessage]=useState()
    return(
        <CustomRoomContext.Provider value={{}}>
            {children}
        </CustomRoomContext.Provider>
    )
}

export {getRoomValue}
export default CustomRoomContext