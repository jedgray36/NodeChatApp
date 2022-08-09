//GET html elements

const output = document.getElementById("output");
const message = document.getElementById("message");
const send = document.getElementById("send");
const feedback = document.getElementById("feedback");
const roomMessage = document.querySelector(".room-message");
const users = document.querySelector(".users");

//Socket Server url
const socket = io.connect("http://localhost:3000");

//Fetch URL Params from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("username");
const roomname = urlParams.get("roomname");
console.log(username, roomname);

//Display message user connected to room X
roomMessage.innerHTML = `Connected to room ${roomname}`;

//Emitting username and roomname of new user
socket.emit("joined_user", {
  username: username,
  roomname: roomname,
});

//sending data when user clicks send
send.addEventListener("click", () => {
  socket.emit("chat", {
    username: username,
    message: message.value,
    roomname: roomname,
  });
  message.value = "";
});

//sending username if typing
message.addEventListener("keypress", () => {
  socket.emit("typing", { username: username, roomname: roomname });
});

//display if new user has joined the chat
socket.on("joined_user", (data) => {
  output.innerHTML += "<p>--> <strong><em>" + data.username + "</strong> has Joined the room :)";
});

//display message from user
socket.on("chat", (data) => {
  output.innerHTML += "<p><strong>" + data.username + "</strong>: " + data.message + "</p>";
  feedback.innerHTML = "";
  document.querySelector(".chat-message").scrollTop = document.querySelector(".chat-message").scrollHeight;
});

//display users typing
socket.on("typing", (user) => {
  feedback.innerHTML = "<p><em>" + user + " is typing...</em></p>";
});

//display online users
socket.on("online_users", (data) => {
  users.innerHTML = "";
  data.forEach((user) => {
    users.innerHTML += `<p>${user}`;
  });
});
