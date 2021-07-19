const { json } = require("express");
const express = require("express");
const users = require("../services/usersMongodbService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const query = req.query.username ? { username: req.query.username } : {};
    return res.json(await users.getAllUsers(query));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    return res.json(await users.getUserById(id));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const newUser = req.body;
    return res.json(await users.addUser(newUser));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const userChanges = req.body;
    return res.json(await users.updateUser(id, userChanges));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    return res.json(await users.deleteUser(id));
  } catch (er) {
    return res.json(er);
  }
});

module.exports = router;
