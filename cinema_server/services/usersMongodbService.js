const User = require("../models/UserModel");

const getAllUsers = (query) => {
  return new Promise((resolve, reject) => {
    User.find(query, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const addUser = (newUser) => {
  return new Promise((resolve, reject) => {
    const newUserDoc = new User(newUser);
    newUserDoc.save((err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const updateUser = (id, userChanges) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, userChanges, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(id, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
