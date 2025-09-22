const mongoose = require("mongoose");
const keys = require("./keys");

async function ConnectDb() {
  try {
    await mongoose.connect(keys.database.url);
    console.log("connected to server");
  } catch (error) {
    console.log(error);
  }
}
module.exports = ConnectDb;
