import io from "socket.io-client";

let socket;
const SOCKET_URL = "http://localhost:8080";//connect~

export const initiateSocket = (username) => {
 socket = io(SOCKET_URL, {
   query: { username },
 });

 console.log("Connecting to socket");
};

export const register = (data) => {
  if (!socket) {
    return;
  }
  console.log(data);
  socket.emit("register", data);
};
