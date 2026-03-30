import { createContext, useState, useEffect, useCallback } from "react";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // In a real implementation, you'd connect to your Socket.io server
    // const newSocket = io('http://localhost:3000');
    // setSocket(newSocket);
    //
    // newSocket.on('connect', () => setConnected(true));
    // newSocket.on('disconnect', () => setConnected(false));
    //
    // return () => newSocket.close();

    setConnected(true); // Mock connection for now
  }, []);

  const emit = useCallback(
    (event, data) => {
      if (socket) {
        socket.emit(event, data);
      }
    },
    [socket],
  );

  const on = useCallback(
    (event, callback) => {
      if (socket) {
        socket.on(event, callback);
      }
    },
    [socket],
  );

  const off = useCallback(
    (event, callback) => {
      if (socket) {
        socket.off(event, callback);
      }
    },
    [socket],
  );

  const value = {
    socket,
    connected,
    emit,
    on,
    off,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
