const connectDB = require("../configs/usersDB");

const db = connectDB();

const checkKeys = (user) => {
  const keys = [
    "id",
    "firstName",
    "lastName",
    "username",
    "createdDate",
    "sessionTimeOut",
    "email",
  ];
  for (const key in user) {
    if (!keys.includes(key)) {
      return false;
    }
  }
  return true;
};

const getAllUsers = (query) => {
  db.reload();
  const dataArr = Object.values(db.getData("/"));
  const ans = dataArr.filter((user) => {
    for (const property in query) {
      if (query[property] !== user[property]) {
        return false;
      }
    }
    return true;
  });
  return ans;
};

const getUserById = (id) => {
  db.reload();
  try {
    return db.getData("/" + id);
  } catch (err) {
    return "ID doesn't exist";
  }
};

const addUser = (newUser) => {
  db.reload();
  if (!checkKeys(newUser)) {
    return "Wrong keys in object, didn't add";
  }
  // check if id doesn't exist
  try {
    db.getData("/" + newUser.id);
    return "ID already exists, didn't add";
  } catch (error) {
    db.push("/" + newUser.id, newUser);
    return getUserById(newUser.id);
  }
};

const addUserWithoutKey = (newUser) => {
  //TODO: the ids can be strings, but here I treat it as number
  db.reload();
  if (!checkKeys(newUser)) {
    return "Wrong keys in object, didn't add";
  }
  const maxId = getAllUsers().reduce((acc, user) => {
    return acc > +user.id ? acc : +user.id;
  }, 0);
  newUser.id = maxId + 1;

  db.push("/" + newUser.id, newUser);
  return getUserById(newUser.id);
};

const updateUser = (id, userChanges) => {
  db.reload();
  const response = "";

  if (!checkKeys(userChanges)) {
    response = "Wrong keys in object, didn't add";
    return response;
  }

  // check if id exists
  try {
    const path = "/" + id;
    const user = db.getData("/" + id);
    for (const key in userChanges) {
      if (Object.hasOwnProperty.call(userChanges, key)) {
        user[key] = userChanges[key];
      }
    }
    db.push(path, user);
    return getUserById(id);
  } catch (error) {
    return "ID doesn't exists, didn't update";
  }
};

const deleteUser = (id) => {
  db.reload();
  // check if id exists
  try {
    const response = db.getData("/" + id);
    db.delete("/" + id);
    return response;
  } catch (error) {
    return "ID doesn't exists, didn't delete";
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
