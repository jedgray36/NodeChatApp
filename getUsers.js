//stored connected users
var users = {};

//function to get users online in a room
function getUsers(arr) {
  onlineUsers = [];
  arr.forEach((onlineUser) => {
    onlineUser.push(Object.values(onlineUser[0]));
  });
  return onlineUser;
}

module.exports = { getUsers, users };
