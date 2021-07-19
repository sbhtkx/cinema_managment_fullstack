const mongoose = require("mongoose");
const connectSubscriptionDB = require("../subscriptions_server/configs/db");
const connectUsersMongodb = require("../cinema_server/configs/UsersMongoDB");
const { getAll } = require("../subscriptions_server/utils/utils");
const { addMember } = require("../subscriptions_server/services/memberService");
const { addMovie } = require("../subscriptions_server/services/movieService");
const {
  addUser: addUserMongodb,
} = require("../cinema_server/services/usersMongodbService");
const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const moviesUrl = "https://api.tvmaze.com/shows";

const USERS_MONGODB_URL = "http://localhost:5001/usersMongodb";
const USERS_URL = "http://localhost:5001/users";
const PERMISSIONS_URL = "http://localhost:5001/permissions";

const pullDataFromTvmazeAndTypicode = async () => {
  try {
    connectSubscriptionDB();

    const { data: usersData } = await getAll(usersUrl);
    const members = usersData.map((user) => {
      return { name: user.name, email: user.email, city: user.address.city };
    });
    for (const member of members) {
      const res = await addMember(member);
    }

    const { data: moviesData } = await getAll(moviesUrl);
    const movies = moviesData.map((movie) => {
      return {
        name: movie.name,
        genres: [...movie.genres],
        image: movie.image.medium,
        premiered: movie.premiered,
      };
    });
    for (const movie of movies) {
      const res = await addMovie(movie);
    }
    console.log("Finish part 1/2.");
  } catch (error) {
    console.log(error);
  }
};

const dateToString = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const usersDB = new JsonDB(
  new Config("../cinema_server/database/users", true, true, "/")
);

const checkKeysUser = (user) => {
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

const getUserById = (id) => {
  usersDB.reload();
  try {
    return usersDB.getData("/" + id);
  } catch (err) {
    return "ID doesn't exist";
  }
};

const addUser = (newUser) => {
  usersDB.reload();
  if (!checkKeysUser(newUser)) {
    return "Wrong keys in object, didn't add";
  }
  // check if id doesn't exist
  try {
    usersDB.getData("/" + newUser.id);
    return "ID already exists, didn't add";
  } catch (error) {
    usersDB.push("/" + newUser.id, newUser);
    return getUserById(newUser.id);
  }
};

const permissionsDB = new JsonDB(
  new Config("../cinema_server/database/permissions", true, true, "/")
);
const checkKeysPermissions = (permissions) => {
  const keys = ["id", "permissions"];
  for (const key in permissions) {
    if (!keys.includes(key)) {
      return false;
    }
  }
  return true;
};

const getPermissionsById = (id) => {
  return permissionsDB.getData("/" + id);
};

const addPermissions = (newPermissions) => {
  let response = "";
  if (!checkKeysPermissions(newPermissions)) {
    response = "Wrong keys in object, didn't add";
    return response;
  }
  // check if id doesn't exist
  try {
    permissionsDB.getData("/" + newPermissions.id);
    response = "ID already exists, didn't add";
  } catch (error) {
    permissionsDB.push("/" + newPermissions.id, newPermissions);
    response = getPermissionsById(newPermissions.id);
  }

  return response;
};

const addAdminToServer = async () => {
  connectUsersMongodb();
  const res1 = await addUserMongodb({
    username: "admin",
    password: "admin",
  });
  const createdDate = dateToString(new Date());
  const id = res1?._id;

  // Add to users with the same id
  const res2 = await addUser({
    firstName: "admin",
    lastName: "admin",
    username: "admin",
    email: "admin@cinema.co.il",
    createdDate,
    id,
    sessionTimeOut: 10,
  });
  const permissions = [
    "view subscriptions",
    "create subscriptions",
    "delete subscriptions",
    "update subscriptions",
    "view movies",
    "create movies",
    "delete movies",
    "update movies",
  ];
  const res3 = await addPermissions({ id, permissions });

  console.log("Finish part 2/2.");
};

pullDataFromTvmazeAndTypicode();
addAdminToServer();
