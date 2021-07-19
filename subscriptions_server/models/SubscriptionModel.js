const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  memberId: mongoose.ObjectId,
  movies: [{ movieId: mongoose.ObjectId, date: Date }],
});

module.exports = mongoose.model("subscription", subscriptionSchema);
