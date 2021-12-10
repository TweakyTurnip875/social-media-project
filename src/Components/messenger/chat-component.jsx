import React, { Component } from 'react'

import ChatRoomComponent from './chatroom-component'
import ChatRoomNameComponent from './chatroom-name-component'

export default class ChatComponent extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: null
    }
    this.handleSubmitName = this.handleSubmitName.bind(this)
  }
  handleSubmitName(name) {
    this.setState({
      name
    })
  }
  render() {
    return (
      <div>
        <ChatRoomNameComponent 
          handleSubmitName={this.handleSubmitName}
        />
        <ChatRoomComponent 
          name={this.state.name}
        />
      </div>
    )
  }
}