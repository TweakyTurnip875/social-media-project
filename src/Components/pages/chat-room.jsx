import React, { Component } from 'react'
import io from 'socket.io-client'

import Chat from '../messenger/Chat'

export default class ChatRoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      roomname: "",

    }
  }
  render() {
    return (
      <div>
        <Chat 
          username={this.props.match.params.slug}
        />
      </div>
    )
  }
}
