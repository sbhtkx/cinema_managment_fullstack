const { json } = require("express");
const express = require("express");
const users = require("../services/usersService");

const keys = [
  "id",
  "firstName",
  "lastName",
  "username",
  "email",
  "createdDate",
  "sessionTimeOut",
];

const router = express.Router();

router.route("/").get((req, res) => {
  try {
    const query = {};
    keys.forEach((key) => {
      if (req.query[key]) {
        query[key] = req.query[key];
      }
    });
    return res.json(users.getAllUsers(query));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").get((req, res) => {
  try {
    const id = req.params.id;
    return res.json(users.getUserById(id));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/").post((req, res) => {
  try {
    const newUser = req.body;

    return res.json(users.addUser(newUser));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").put((req, res) => {
  try {
    const id = req.params.id;
    const userChanges = req.body;
    return res.json(users.updateUser(id, userChanges));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").delete((req, res) => {
  try {
    const id = req.params.id;
    return res.json(users.deleteUser(id));
  } catch (er) {
    return res.json(er);
  }
});

module.exports = router;
