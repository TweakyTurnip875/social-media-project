import React, { Component } from 'react'

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.username,
      roomname: this.props.roomname,
    }
  }
  render() {
    return (
      <div>
        {this.state.username}
      </div>
    )
  }
}