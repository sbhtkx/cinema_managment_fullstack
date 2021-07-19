const { json } = require("express");
const express = require("express");
const members = require("../services/memberService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    return res.json(await members.getAllMembers());
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    return res.json(await members.getMemberById(id));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const newMember = req.body;
    return res.json(await members.addMember(newMember));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const memberChanges = req.body;
    return res.json(await members.updateMember(id, memberChanges));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    return res.json(await members.deleteMember(id));
  } catch (er) {
    return res.json(er);
  }
});

module.exports = router;
