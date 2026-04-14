const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
    // Socket.io ka instance create kiya aur React app ko allow kiya
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Aapka Vite frontend URL
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Frontend connected to live logs:", socket.id);

        socket.on("disconnect", () => {
            console.log("Frontend disconnected:", socket.id);
        });
    });
};

// Yeh function humein dusri files (jaise runner) se messages bhejne mein help karega
const getIo = () => {
    if (!io) throw new Error("Socket.io is not initialized!");
    return io;
};

module.exports = { initSocket, getIo };