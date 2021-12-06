import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'

import Messages from './messenger/Messages'
import MessagesInput from './messenger/MessagesInput'

const Socket = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(`https://${window.location.hostname}/:3400`)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])
  return (
    <div>
      {socket ? (
        <div>
        <Messages socket={socket} />
        <MessagesInput socket={socket} />
        </div>
      ) : (
        <div>disconnected</div>
      )}
     
    </div>
  )
}
export default Socket;