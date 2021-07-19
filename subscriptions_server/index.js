const connectDB = require("./configs/db");
const cors = require("cors");
const express = require("express"); // use express module

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 5000;

// api
app.use("/members", require("./controllers/membersController"));
app.use("/movies", require("./controllers/moviesController"));
app.use("/subscriptions", require("./controllers/subscriptionController"));

// listen
app.listen(PORT, () => console.log(`1. Server started on port ${PORT}`));
