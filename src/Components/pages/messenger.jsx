import React, { useEffect, useState } from 'react'
import MessagesInput from '../messenger/MessagesInput'
import io from 'socket.io-client'

import Socket from '../socket'

const Messenger = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(`https://${window.location.hostname}:3500`)
    setSocket(newSocket)
    return () => newSocket.close();
  }, [setSocket])
  return (
    <div>
      {socket ? (
        <Socket />
      ) : (
        <div>disconnected</div>
      )}
    </div>
  )
}
export default Messenger;