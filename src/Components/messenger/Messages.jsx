import React, {Component} from 'react'

import MessagesInput from './MessagesInput'
import Message from './Message'

class Messages extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: {},
      setMessages: {},
    }
  }
  messageListener(msg) {
    this.setState({
      setMessages: (prevMsgs) => {
        const newMsgs = {...prevMsgs}
        newMsgs[msg.id] = msg
        return newMsgs;
      }
    })
  }

  componentDidMount() {

  }
  componentDidUpdate() {

  }
  render() {
    return (
      <div>
        <div className="messages-container">
          
        </div>
      </div>
    )
  }
}
export default Messages;