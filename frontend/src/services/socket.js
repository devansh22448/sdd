import { io } from "socket.io-client";

const rawApiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || rawApiUrl.replace(/\/api\/?$/, "");

export const createSocket = () => {
  return io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: false,
  });
};
