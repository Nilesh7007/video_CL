const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const {  v4: uuidV4} = require("uuid")
app.set("view engine", "ejs")
app.use(express.static("public"));

app.get('/', (req,res)=>{
res.redirect(`/${uuidV4()}`)

// edb031cd-a0cd-438a-b453-16d2de101642
// 86c590a3-b689-479e-934f-e22d8a71a413
})

app.get('/:room', (req,res) =>{
res.render("room", {roomId: req.params.room})
})

io.on('connection', socket =>{
    socket.on('join-room', (roomId, userId) =>{
    //   console.log(roomId,userId) 
    socket.join(roomId)
    socket.broadcast.to(roomId).emit("user-connected", userId);


    socket.on('disconnect', ()=>{
        socket.broadcast.to(roomId).emit("user-disconnected", userId);
    })
    })
})



server.listen(3000)