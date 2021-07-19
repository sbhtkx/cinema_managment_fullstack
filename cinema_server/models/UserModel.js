const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const passwordSchema = new Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("user", passwordSchema);

// TODO: find solution for the problem of two 'users' database
