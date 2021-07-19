import { produce } from "immer";
import axios from "axios";
// import cloneDeep from "clone-deep";

// Types
const FETCH_USERS_DATA_REQUEST = "FETCH_USERS_DATA_REQUEST";
const FETCH_USERS_DATA_SUCCESS = "FETCH_USERS_DATA_SUCCESS";
const FETCH_USERS_DATA_FAILURE = "FETCH_USERS_DATA_FAILURE";

const FETCH_PERMISSIONS_DATA_REQUEST = "FETCH_USERS_PERMISSIONS_REQUEST";
const FETCH_PERMISSIONS_DATA_SUCCESS = "FETCH_USERS_PERMISSIONS_SUCCESS";
const FETCH_PERMISSIONS_DATA_FAILURE = "FETCH_USERS_PERMISSIONS_FAILURE";

// Actions
const USERS_URL = "http://localhost:5001/users";
const PERMISSIONS_URL = "http://localhost:5001/permissions";

const doFetchUsersDataRequest = () => ({
  type: FETCH_USERS_DATA_REQUEST,
});

const doFetchUsersDataSuccess = (usersData) => ({
  type: FETCH_USERS_DATA_SUCCESS,
  payload: usersData,
});

const doFetchUsersDataFailure = (error) => ({
  type: FETCH_USERS_DATA_FAILURE,
  payload: error,
});

export const doFetchUsersData = () => {
  return (dispatch) => {
    dispatch(doFetchUsersDataRequest());
    axios
      .get(USERS_URL)
      .then((response) => {
        const usersData = response.data;
        dispatch(doFetchUsersDataSuccess(usersData));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(doFetchUsersDataFailure(errorMsg));
      });
  };
};

const doFetchPermissionsDataRequest = () => ({
  type: FETCH_PERMISSIONS_DATA_REQUEST,
});

const doFetchPermissionsDataSuccess = (permissionsData) => ({
  type: FETCH_PERMISSIONS_DATA_SUCCESS,
  payload: permissionsData,
});

const doFetchPermissionsDataFailure = (error) => ({
  type: FETCH_PERMISSIONS_DATA_FAILURE,
  payload: error,
});

export const doFetchPermissionsData = () => {
  return (dispatch) => {
    dispatch(doFetchPermissionsDataRequest());
    axios
      .get(PERMISSIONS_URL)
      .then((response) => {
        const permissionsData = response.data;
        dispatch(doFetchPermissionsDataSuccess(permissionsData));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(doFetchPermissionsDataFailure(errorMsg));
      });
  };
};

// Reducer
const initialState = {
  usersDataLoading: false,
  usersData: [],
  usersDataError: "",
  permissionsDataLoading: false,
  permissionsData: [],
  permissionsDataError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_DATA_REQUEST:
      return produce(state, (draft) => {
        draft.usersDataLoading = true;
      });
    case FETCH_USERS_DATA_SUCCESS:
      return produce(state, (draft) => {
        draft.usersDataLoading = false;
        draft.usersData = action.payload; // TODO: should I clonedeep?
        draft.usersDataError = "";
      });
    case FETCH_USERS_DATA_FAILURE:
      return produce(state, (draft) => {
        draft.usersData = []; // TODO: not sure if I want to delete previous data
        draft.usersDataLoading = false;
        draft.usersDataError = action.payload;
      });

    case FETCH_PERMISSIONS_DATA_REQUEST:
      return produce(state, (draft) => {
        draft.permissionsDataLoading = true;
      });
    case FETCH_PERMISSIONS_DATA_SUCCESS:
      return produce(state, (draft) => {
        draft.permissionsDataLoading = false;
        draft.permissionsData = action.payload; // TODO: should I clonedeep?
        draft.permissionsDataError = "";
      });

    case FETCH_PERMISSIONS_DATA_FAILURE:
      return produce(state, (draft) => {
        draft.permissionsData = []; // TODO: not sure if I want to delete previous data
        draft.permissionsDataLoading = false;
        draft.permissionsDataError = action.payload;
      });

    default:
      return state;
  }
};
export default reducer;
