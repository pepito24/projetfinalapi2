const mongoose = require("mongoose");
const { server, database } = require("../config");

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(`${server}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      console.log("connected to database");
    } catch (e) {
      console.log(e, "Connection error");
    }
  }
}

module.exports = new Database();
