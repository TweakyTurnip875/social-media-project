import React, {Component} from 'react'

import MessagesInput from './MessagesInput'

class Messages extends Component {
  render() {
    return (
      <div>
        <div className="messages-container">
          message
        </div>

        <div className="message-input">
          <MessagesInput />
        </div>
      </div>
    )
  }
}
export default Messages;