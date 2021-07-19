import { store } from "../redux/store";
import {
  doLogin,
  doLogout,
  doSetPermisions,
  doSetSessionTimeOut,
} from "../redux/authSlice";
import axios from "axios";

const usersMongodbUrl = "http://localhost:5001/usersMongodb";
const usersUrl = "http://localhost:5001/users";
const permissionsUrl = "http://localhost:5001/permissions";

export const permissionsTypes = {
  VIEW_SUBS: "view subscriptions",
  CREATE_SUBS: "create subscriptions",
  DELETE_SUBS: "delete subscriptions",
  UPDATE_SUBS: "update subscriptions",
  VIEW_MOVIES: "view movies",
  CREATE_MOVIES: "create movies",
  DELETE_MOVIES: "delete movies",
  UPDATE_MOVIES: "update movies",
};

//TODO: move all fetch requests to redux reducer?

export const logState = () => {
  console.log(store.getState());
};

const getPermissionsFromServer = async (id) => {
  const response = await axios.get(permissionsUrl + "/" + id);
  return response?.data?.permissions;
};

const checkUserPasswordInServerAndGetId = async (username, password) => {
  const response = await axios.get(usersMongodbUrl, {
    params: {
      username: username,
    },
  });
  const userData = response.data[0];
  if (userData.password === password) {
    return userData._id;
  } else return undefined;
};

const getIdOfNewUsernameInDB = async (username) => {
  const response = await axios.get(
    usersMongodbUrl + "?username=" + username
    // ,  {    username,  }
  );
  const userData = response.data[0];
  return userData && userData.password === undefined ? userData._id : undefined;
};

const getSessionTimeOutFromServer = async (id) => {
  const response = await axios.get(usersUrl + "/" + id);
  return +response?.data?.sessionTimeOut;
};

export const authenticateAndLogin = async (
  username,
  password,
  onFulfilled,
  onRejected
) => {
  try {
    const id = await checkUserPasswordInServerAndGetId(username, password);
    if (id) {
      store.dispatch(doLogin({ username, id }));
      const permissions = await getPermissionsFromServer(id);
      if (permissions) {
        store.dispatch(doSetPermisions(permissions));
      }
      const sessionTimeOut = await getSessionTimeOutFromServer(id);
      if (sessionTimeOut) {
        store.dispatch(doSetSessionTimeOut(sessionTimeOut));
      }
      onFulfilled();
    } else {
      onRejected();
    }
  } catch (error) {
    onRejected(error);
  }
};

export const logout = (callback) => {
  store.dispatch(doLogout());
  if (callback) {
    callback();
  }
};

export const isAuthenticated = () => {
  logState();
  return store.getState().auth?.authenticated;
};

export const isAdmin = () => {
  logState();
  return store.getState().auth?.isAdmin;
  // return false;
};

export const HasPermission = (permission) => {
  return (
    store.getState().auth?.isAdmin ||
    store.getState().auth?.permissions.includes(permission)
  );
};

export const createAccount = async (
  username,
  password,
  onFulfilled,
  onRejected
) => {
  const id = await getIdOfNewUsernameInDB(username);
  try {
    if (id) {
      axios.put(`${usersMongodbUrl}/${id}`, { password });
      onFulfilled();
    } else {
      onRejected();
    }
  } catch (error) {
    onRejected(error);
  }
};
