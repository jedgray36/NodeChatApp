const { getUsers, users } = require("./getUsers");

//Socket Connection
function socket(io) {
  io.on("connection", (socket) => {
    socket.on("joined-user", (data) => {
      //store users connected in a room in memory
      var user = {};
      user[socket.id] = data.username;
      if (users[data.roomname]) {
        users[data.roomname].push(user);
      } else {
        users[data.roomname] = [user];
      }

      //Joining the socket room
      socket.join(data.roomname);

      //Emmiting new Username to clients
      io.to(data.roomname).emit("joined-user", { username: data.username });

      //send online users
      io.to(data.roomname).emit("online-users", getUsers(users[data.roomname]));
    });
    //emmiting messages to clients
    socket.on("chat", (data) => {
      io.to(data.roomname).emit("chat", { username: data.username, message: data.message });
    });

    //broadcasting the typing user
    socket.on("typing", (data) => {
      socket.broadcast.to(data.roomname).emit("typing", data.username);
    });

    //remove a disconnected user from memory
    socket.on("disconnecting", () => {
      var rooms = Object.keys(socket.rooms);
      var socketId = rooms[0];
      var roomname = rooms[1];
      users[roomname].forEach((user, index) => {
        if (user[socketId]) {
          users[roomname].splice(index, 1);
        }
      });

      //send online users array
      io.to(roomname).emit("online-users", getUsers(users[roomname]));
    });
  });
}

module.exports = socket;
