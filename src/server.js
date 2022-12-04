const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended:true
}));
const { PeerServer } = require('peer');

const peerServer = PeerServer({ port: 9000, path: '/myapp' });

const users = [
  {
    username: 'Admin',
    password: 'Admin',
    isLogin: false
  }
]

app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
 cors: {
   origin: "*",
 },
});

const PORT = process.env.PORT || 8080;

io.on("connection", (socket) => {
 // Get nickname and channel.
 const { username } = socket.handshake.query;
 // Join the user to the channel.
 var tmp = users.filter((user) => user.username === username);
 if (tmp.length > 0) users[users.indexOf(tmp[0])].isLogin = true;


 // Handle disconnect
 socket.on("disconnect", () => {
  
  if (tmp.length > 0) users[users.indexOf(tmp[0])].isLogin = false;

 });
  socket.on('register', (data) => {
    //{username, password}
    console.log(data);
    var tmp = users.filter((user) => user.username === data.username);
    if (tmp.length == 0)
      users.push(data);
  });
});


app.get("/users", (req, res) => {
  return res.json(users);
});

app.post('/login', function(req, res) {
  console.log(req.body);
  var usr = req.body.usr;
  var psw = req.body.psw;
  let result = users.find((e) => e.username === usr && e.password === psw);
  console.log(result);
  if (result !== undefined)
  {
    var tmp = users.findIndex((e) => e.username === usr && e.password === psw);
    res.redirect('/');
  }
  else
    {
      return res.status(422).send({
        error: 'Your username or password is wrong!',
        statusCode: 422
    });
    }
});

server.listen(PORT, () => console.log(`Server listening to port ${PORT}`));