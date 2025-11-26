import { useState, useEffect } from "react";
import io from "socket.io-client";
import { SocketContext } from "./SocketContext.jsx";
import PropTypes from "prop-types";

const SOCKET_URL = import.meta.env.VITE_API_URL;

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("SocketProvider: creating socket to", SOCKET_URL);
    const newSocket = io(SOCKET_URL);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    setSocket(newSocket);

    return () => {
      console.log("SocketProvider: disconnecting socket");
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
