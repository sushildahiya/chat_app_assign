import { createContext, useContext, useEffect, useState } from "react";

const roomContext = createContext()

function useRoomValue(){
    return useContext(roomContext)
}

function CustomRoomContext({children}){
    const userList = [{name:"Alan",color:"#c64a44"},{name:"Bob",color:"#6497b1"},{name:"Carol",color:"#a1b65e"},{name:"Dean",color:"#914c3d"},{name:"Elin",color:"#e19239"}]
    const [user,setUser]=useState({name:'',color:''})
    const [currentRoom,setCurrentRoom]=useState({})
    const [rooms,setRooms]=useState([])
    const [messages,setMessage]=useState([])
    

    useEffect(()=>{
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            const selectedUser = selectUser();
            sessionStorage.setItem("user", JSON.stringify(selectedUser));
            setUser(selectedUser);
        }
    },[])

    useEffect(()=>{
        const fetchRooms = async ()=>{
            const response = await fetch('http://localhost:8000/rooms',{method:'GET'})
            const rooms = await response.json()
            setRooms(rooms)
            setCurrentRoom(rooms[0])
        }
        fetchRooms()
    },[])

    useEffect(()=>{
        const fetchRooms = async ()=>{
            const response = await fetch(`http://localhost:8000/room/${currentRoom.id}`,{method:'GET'})
            const messagesResp = await response.json()
            setMessage(messagesResp)
        }
        if(currentRoom.id){
            fetchRooms()
        }
    },[currentRoom])

    function selectUser(){
        return userList[Math.floor(Math.random()*userList.length)]
    }


    const changeRoom=(id)=>{
        const roomOb = rooms.filter((item)=>item.id===id)[0]
        setCurrentRoom(roomOb)
    }
    return(
        <roomContext.Provider value={{user,rooms,currentRoom,messages,changeRoom, userList}}>
            {children}
        </roomContext.Provider>
    )
}

export {useRoomValue}
export default CustomRoomContext