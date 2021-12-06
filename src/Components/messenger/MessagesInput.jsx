import React, { useState } from 'react'
import io from 'socket.io-client'

class MessagesInput extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      value: null,
      setValue: "",
    }
    this.handleNewMessageSubmit = this.handleNewMessageSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleNewMessageSubmit(e) {
    e.preventDefault()
    this.props.socket.emit('message', this.state.setValue)
    this.setState({ setValue: "" })
  }
  handleChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value 
    }) 
  }
  render() {
    return (
      <form onSubmit={this.handleNewMessageSubmit}>
        
        <input 
          placeholder="Message"
          onChange={this.handleChange}
          name="setValue"
          value={this.state.setValue}
        />
        

        <button className="btn" type="submit">Send</button>
      </form>
    )
  }
}
export default MessagesInput;