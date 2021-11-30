import React, { useState } from 'react'
import io from 'socket.io-client'

class MessagesInput extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      value: null,
      setValue: "",
    }
    this.submitForm = this.submitForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  submitForm(e) {
    e.preventDefault()
    console.log(e);
    this.setState({ setValue: "" })
  }
  handleChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value 
    }) 
  }
  render() {
    return (
      <form onSubmit={this.submitForm}>
        
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