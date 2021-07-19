const connectPermissionsDB = require("../configs/permissionsDB");

const db = connectPermissionsDB();

const checkKeys = (permissions) => {
  const keys = ["id", "permissions"];
  for (const key in permissions) {
    if (!keys.includes(key)) {
      return false;
    }
  }
  return true;
};

const checkMutableKeys = (permissions) => {
  const keys = ["permissions"];
  for (const key in permissions) {
    if (!keys.includes(key)) {
      return false;
    }
  }
  return true;
};

const getAllPermissions = () => {
  return Object.values(db.getData("/"));
};

const getPermissionsById = (id) => {
  return db.getData("/" + id);
};

const addPermissions = (newPermissions) => {
  let response = "";
  if (!checkKeys(newPermissions)) {
    response = "Wrong keys in object, didn't add";
    return response;
  }
  // check if id doesn't exist
  try {
    db.getData("/" + newPermissions.id);
    response = "ID already exists, didn't add";
  } catch (error) {
    db.push("/" + newPermissions.id, newPermissions);
    response = getPermissionsById(newPermissions.id);
  }
  console.log("db1");
  console.log(db);
  return response;
};

const addPermissionsWithoutKey = (newPermissions) => {
  //TODO: the ids can be strings, but here I treat it as number
  const response = "";
  if (!checkKeys(newPermissions)) {
    response = "Wrong keys in object, didn't add";
    return response;
  }
  newPermissions.id =
    getAllPermissions().reduce((acc, user) => {
      return acc > +user.id ? acc : +user.id;
    }, 0) + 1;
  db.push("/" + newPermissions.id, newPermissions);
  response = getPermissionsById(newPermissions.id);

  return response;
};

const updatePermissions = (id, permissionsChanges) => {
  let response = "";

  if (!checkMutableKeys(permissionsChanges)) {
    response = "Wrong keys in object, didn't add";
    return response;
  }

  // check if id exists
  try {
    const permissions = db.getData("/" + id);
    for (const key in permissionsChanges) {
      if (Object.hasOwnProperty.call(permissionsChanges, key)) {
        permissions[key] = permissionsChanges[key];
      }
    }
    db.push("/" + id + "/permissions", permissions.permissions);
    response = getPermissionsById(id);
  } catch (error) {
    response = "ID doesn't exists, didn't update";
  }
  return response;
};

const deletePermissions = (id) => {
  let response = "";
  // check if id exists
  try {
    response = db.getData("/" + id);
    db.delete("/" + id);
    return response;
  } catch (error) {
    response = "ID doesn't exists, didn't delete";
    return response;
  }
};

module.exports = {
  getAllPermissions,
  getPermissionsById,
  addPermissions,
  updatePermissions,
  deletePermissions,
};
