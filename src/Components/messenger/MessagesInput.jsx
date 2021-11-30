import React, { useState } from 'react'
import io from 'socket.io-client'

const MessagesInput = () => {
  const [value, setValue] = useState(null)

  // const submitForm = (e) => {
  //   e.preventDefault()
  //   console.log(e);
  //   setValue('')
  // }
  return (
    <form>
      <input />
    </form>
  )
}
export default MessagesInput;