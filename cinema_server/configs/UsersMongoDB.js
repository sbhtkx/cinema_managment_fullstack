const mongoose = require("mongoose");

const connectUsersDB = () => {
  const uri = "mongodb://localhost:27017/usersDB";
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

module.exports = connectUsersDB;
