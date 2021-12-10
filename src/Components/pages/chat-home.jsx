import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class ChatHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "e",
      roomname: "general",
    }
    this.sendData = this.sendData.bind(this)
  }
  sendData() {
    const { username, roomname } = this.state
    if(username !== null) {
      this.props.socket.emit("joinRoom", { username, roomname })
    } else {
      alert("username is missing")
      window.location.reload()
    }
  }
  render() {
    return (
      <div>
        <Link to={`/chat-room/${this.state.username}`}>
          <div>hello</div>
        </Link>
      </div>
    )
  }
}