const mongoose = require("mongoose");
const Subscription = require("../models/SubscriptionModel");

const getAllSubscription = (query) => {
  return new Promise((resolve, reject) => {
    Subscription.find({}, (err, subscription) => {
      if (err) {
        reject(err);
      } else {
        if (query && query["memberId"]) {
          const filtered = subscription.filter((s) => {
            return s.memberId.toString() === query["memberId"].toString();
          });
          resolve(filtered);
        } else {
          resolve(subscription);
        }
      }
    });
  });
};

const getSubscriptionById = (id) => {
  return new Promise((resolve, reject) => {
    Subscription.findById(id, (err, subscription) => {
      if (err) {
        reject(err);
      } else {
        resolve(subscription);
      }
    });
  });
};

const addSubscription = (newSubscription) => {
  return new Promise((resolve, reject) => {
    const newSubscriptionDoc = new Subscription({
      memberId: mongoose.Types.ObjectId(newSubscription.memberId),
      movies: newSubscription.movies,
    });
    newSubscriptionDoc.save((err, subscription) => {
      if (err) {
        reject(err);
      } else {
        resolve(subscription);
      }
    });
  });
};

const updateSubscription = (id, subscriptionChanges) => {
  return new Promise((resolve, reject) => {
    Subscription.findByIdAndUpdate(
      id,
      subscriptionChanges,
      (err, subscription) => {
        if (err) {
          reject(err);
        } else {
          resolve(subscription);
        }
      }
    );
  });
};

const deleteSubscription = (id) => {
  return new Promise((resolve, reject) => {
    Subscription.findByIdAndDelete(id, (err, subscription) => {
      if (err) {
        reject(err);
      } else {
        resolve(subscription);
      }
    });
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    Subscription.remove({}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getAllSubscription,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  deleteAll,
};
