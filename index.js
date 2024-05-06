require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const socketIO = require('socket.io')
const crypto = require('crypto')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const port = process.env.PORT || 8000
function generateRoomId() {
    return crypto.randomBytes(6).toString('hex')
}


let rooms = [
    { name: "Poland Office", id: generateRoomId() ,messages:[]},
    { name: "India Office", id: generateRoomId() ,messages:[]},
    { name: "Introductions", id: generateRoomId() ,messages:[]}
]
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get('/rooms',(req,res)=>res.status(200).json(rooms))

app.post('/room',(req,res)=>{
    try{
    let room = {
        name:req.body.name,
        id:generateRoomId(),
        messages:[]
    }
    rooms.push(room)
    res.status(200).json({"msg":"success"})
    
}catch(err){
    res.status(500).json({"msg":"something went wrong"})
}
    
})


io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`)

    socket.on('joinRoom', (roomId) => {
        const room = rooms.find(r => r.id === roomId)
        if (room) {
            socket.join(roomId)
            console.log(`Client ${socket.id} joined room ${roomId}`)
        } else {
            console.log(`Room ${roomId} not found`)
        }
    })

    socket.on('sendMessage', (data) => {
        const { roomId, message, username } = data;
        const room = rooms.find(r => r.id === roomId);
        if (room) {
            const newMessage = {
                from: username,
                message: message,
                timestamp: new Date()
            };
            room.messages.push(newMessage);
            io.to(roomId).emit('message', newMessage);
        } else {
            console.log(`Room ${roomId} not found`);
        }
    })

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`)
    })
})

server.listen(port,(err)=> {
    if(err){
        console.log("Error while creating the server : ",err)
        return
    }
    console.log(`Server running on port ${port}`)})

