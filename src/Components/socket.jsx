import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'

import Messages from './messenger/Messages'

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
        <Messages />
      ) : (
        <div>disconnected</div>
      )}
     
    </div>
  )
}
export default Socket;