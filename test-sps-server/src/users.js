const fs = require("fs");

const filePath = "./users.json";

function readUsers() {
  let data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users));
}

module.exports = { readUsers, writeUsers };