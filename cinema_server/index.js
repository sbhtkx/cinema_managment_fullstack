const connectUsersDB = require("./configs/UsersMongoDB");
const cors = require("cors");
const express = require("express"); // use express module

const app = express();
connectUsersDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 5001;

// api
app.use("/users", require("./controllers/usersController"));
app.use("/permissions", require("./controllers/permissionsController"));
app.use("/usersMongodb", require("./controllers/usersMongodbController"));

// listen
app.listen(PORT, () => console.log(`1. Server started on port ${PORT}`));

// TODO: find solution for the problem of two 'users' database
