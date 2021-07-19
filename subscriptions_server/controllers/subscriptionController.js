const { json } = require("express");
const ObjectID = require("mongodb").ObjectID;
const express = require("express");
const subscription = require("../services/subscriptionService");

const router = express.Router();

// new ObjectId("4f91bfcfaa7c5687a0c686d4")

router.route("/").get(async (req, res) => {
  try {
    let query = {};
    try {
      if (req.query["memberId"]) {
        query = { memberId: new ObjectID(req.query["memberId"]) };
      }
    } catch (error) {
      console.log(error.message);
    }
    return res.json(await subscription.getAllSubscription(query));
  } catch (er) {
    console.log(er.message);
    return res.json(er);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    return res.json(await subscription.getSubscriptionById(id));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/").post(async (req, res) => {
  try {
    return res.json(await subscription.addSubscription(req.body));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const subscriptionChanges = req.body;
    return res.json(
      await subscription.updateSubscription(id, subscriptionChanges)
    );
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    return res.json(await subscription.deleteSubscription(id));
  } catch (er) {
    return res.json(er);
  }
});

module.exports = router;
