import produce from "immer";

// Types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_PERMISSIONS = "SET_PERMISSIONS";
const SET_SESSION_TIME_OUT = "SET_SESSION_TIME_OUT";

// Actions
export const doLogin = ({ username, id }) => {
  return { type: LOGIN, payload: { username, id } };
};

export const doLogout = () => {
  return { type: LOGOUT };
};

export const doSetPermisions = (permissions) => {
  return { type: SET_PERMISSIONS, payload: permissions };
};

export const doSetSessionTimeOut = (sessionTimeOut) => {
  return { type: SET_SESSION_TIME_OUT, payload: sessionTimeOut };
};

// Reducer
const initialState = {
  username: "",
  id: "",
  authenticated: false,
  isAdmin: false,
  permissions: [],
  timeEntered: "",
  sessionTimeOut: 60,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      // TODO: decide how to recognise admin users

      return {
        username: action.payload.username,
        id: action.payload.id,
        authenticated: true,
        isAdmin: action.payload.username === "admin",
        permissions: [],
        timeEntered: new Date(),
        sessionTimeOut: 60,
      };
    case LOGOUT:
      return initialState;

    case SET_PERMISSIONS:
      // const { id, username, authenticated, isAdmin, timeEntered } = state;
      // console.log("timeEntered1");
      // console.log(timeEntered);
      // return {
      //   id,
      //   username,
      //   authenticated,
      //   isAdmin,
      //   permissions: action.payload,
      //   timeEntered,
      // };
      return produce(state, (draftState) => {
        draftState.permissions = action.payload;
      });

    case SET_SESSION_TIME_OUT:
      return produce(state, (draftState) => {
        draftState.sessionTimeOut = action.payload;
      });

    default:
      return state;
  }
};
export default reducer;
