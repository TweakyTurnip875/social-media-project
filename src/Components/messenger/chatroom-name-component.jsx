import React, { Component } from 'react'

export default class ChatRoomNameComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null
    }
  }
  setName() {
    this.props.handleSubmitName()
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}