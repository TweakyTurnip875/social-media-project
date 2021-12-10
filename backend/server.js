var express = require('express');
var app = express()
var socket = require('socket.io')
const { getCurrUser, userDisconnect, joinUser } = require("./dummyusers");

app.use(express())

const port = 8000;

var server = app.listen(
  port,
  console.log(
    `server: ${port}`
  )
)

const io = socket(server)

io.on("connection", (socket) => {
  socket.on('joinRoom', (username, roomname) => {
     const p_users = joinUser(socket.id, username, roomname)

     socket.join(p_users.room)

     socket.emit('message', {
       userId: p_users.id,
       username: p_users.username,
       text: `Welcome ${p_users.username}`,
     })

     socket.broadcast.to(p_users.room).emit('message', {
       userId: p_users.id,
       username: p_users.name,
       text: `${p_users.username} has entered the room`,
     })
  })
  socket.on('chat', (text) => {
    const p_users = getCurrUser(socket.id)
    
    io.to(p_users.room).emit('message', {
      userId: p_users.id,
      username: p_users.username,
      text: text,
    })
  })
  socket.on("disconnect", () => {
    const p_users = userDisconnect(socket.id)

    if(p_users) {
      io.to(p_users.room).emit('message', {
        userId: p_users.id,
        username: p_users.username,
        text: `${p_users.username} has left`
      })
    }
  })
})