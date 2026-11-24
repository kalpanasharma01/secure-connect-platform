const EventEmitter = require("events");

const userEmitter = new EventEmitter();

userEmitter.on("userRegistered", (username) => {

  console.log(`${username} registered successfully`);
});

module.exports = userEmitter;