const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  genres: [String],
  image: String,
  premiered: Date,
});

module.exports = mongoose.model("movie", movieSchema);
