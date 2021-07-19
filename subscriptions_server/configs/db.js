const mongoose = require("mongoose");

const connectDB = () => {
  const uri = "mongodb://localhost:27017/subscriptionDB";
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  mongoose
    .connect(uri, options)
    .then((res) => {
      console.log("Connected successfully...");
    })
    .catch(console.log);
};

module.exports = connectDB;
