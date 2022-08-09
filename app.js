//Require modules
const express = require("express");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const io = socket(server);
require("./utils/socket")(io);

//Create express object
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//port number
var PORT = process.env.PORT || 3000;

//Handle get requests
// app.get("/", (req, res) => {
//   res.send("A node app is running on this server");
//   res.end();
// });

//index page
app.get("/", (req, res) => {
  res.render("index");
});

//Server Setup
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

//Check on http://localhost:5000/

//Get Usernames and roomname from form and pass to room
app.post("/room", (req, res) => {
  roomname = req.body.roomname;
  username = req.body.username;
  res.redirect(`/room?username=${username}&roomname=${roomname}`);
});

//Rooms
app.get("/room", (req, res) => {
  res.render("room");
});
