const { json } = require("express");
const express = require("express");
const permissions = require("../services/permissionsService");

const router = express.Router();

router.route("/").get((req, res) => {
  try {
    return res.json(permissions.getAllPermissions());
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").get((req, res) => {
  try {
    const id = req.params.id;
    return res.json(permissions.getPermissionsById(id));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/").post((req, res) => {
  try {
    const newPermissions = req.body;
    return res.json(permissions.addPermissions(newPermissions));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").put((req, res) => {
  try {
    const id = req.params.id;
    const permissionsChanges = req.body;
    return res.json(permissions.updatePermissions(id, permissionsChanges));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").delete((req, res) => {
  try {
    const id = req.params.id;
    return res.json(permissions.deletePermissions(id));
  } catch (er) {
    return res.json(er);
  }
});

module.exports = router;
