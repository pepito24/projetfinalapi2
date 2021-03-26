const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  message: String,
  date: Date,
  active: Boolean,
  read: Boolean,
});

messageSchema.pre("save", function (next) {
  const now = new Date(Date.now());

  if (!this.date) {
    this.date = now;
  }

  next();
});

messageSchema.statics.updateMessage = function (id, body) {
  return new Promise((resolve, reject) => {
    this.findByIdAndUpdate(id, body, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(doc);
    });
  });
};

messageSchema.statics.findMessages = function (id) {
  return new Promise((resolve, reject) => {
    this.find(
      { $or: [{ from: id }, { to: id }] },
      null,
      { sort: { date: -1 } },
      (err, doc) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(doc);
      }
    );
  });
};

messageSchema.statics.findSpecificPersonMessages = function ({ from, to }) {
  return new Promise((resolve, reject) => {
    this.find(
      {
        $or: [
          { from: from, to: to },
          { to: to, from: from },
        ],
      },
      null,
      { sort: { date: -1 } },
      (err, doc) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(doc);
      }
    );
  });
};

messageSchema.statics.addMessage = function (body) {
  return new Promise((resolve, reject) => {
    this.create(body, (err, doc) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(doc);
    });
  });
};

module.exports = mongoose.model("Message", messageSchema);
