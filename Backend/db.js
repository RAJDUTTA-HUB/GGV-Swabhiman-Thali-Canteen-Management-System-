const mongoose = require("mongoose");

function connectedToDb() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("Db connect:'", err));
}
module.exports = connectedToDb;
