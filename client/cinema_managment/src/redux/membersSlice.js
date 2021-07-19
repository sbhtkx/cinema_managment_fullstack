import { produce } from "immer";
import axios from "axios";
// import cloneDeep from "clone-deep";

// Types
const FETCH_MEMBERS_DATA_REQUEST = "FETCH_MEMBERS_DATA_REQUEST";
const FETCH_MEMBERS_DATA_SUCCESS = "FETCH_MEMBERS_DATA_SUCCESS";
const FETCH_MEMBERS_DATA_FAILURE = "FETCH_MEMBERS_DATA_FAILURE";

// Actions
const MEMBERS_URL = "http://localhost:5000/members";

const doFetchMembersDataRequest = () => ({
  type: FETCH_MEMBERS_DATA_REQUEST,
});

const doFetchMenbersDataSuccess = (membersData) => ({
  type: FETCH_MEMBERS_DATA_SUCCESS,
  payload: membersData,
});

const doFetchMembersDataFailure = (error) => ({
  type: FETCH_MEMBERS_DATA_FAILURE,
  payload: error,
});

export const doFetchMembersData = () => {
  return (dispatch) => {
    dispatch(doFetchMembersDataRequest());
    axios
      .get(MEMBERS_URL)
      .then((response) => {
        const membersData = response.data;
        dispatch(doFetchMenbersDataSuccess(membersData));
      })
      .catch((error) => {
        console.log(error.message);
        const errorMsg = error.message;
        dispatch(doFetchMembersDataFailure(errorMsg));
      });
  };
};

// Reducer
export const statusEnum = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};
const initialState = {
  status: statusEnum.IDLE,
  membersData: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEMBERS_DATA_REQUEST:
      return produce(state, (draft) => {
        draft.status = statusEnum.LOADING;
      });
    case FETCH_MEMBERS_DATA_SUCCESS:
      return produce(state, (draft) => {
        draft.status = statusEnum.SUCCEEDED;
        draft.membersData = action.payload; // TODO: should I clonedeep?
        draft.error = "";
      });
    case FETCH_MEMBERS_DATA_FAILURE:
      return produce(state, (draft) => {
        draft.membersData = []; // TODO: not sure if I want to delete previous data
        draft.status = statusEnum.FAILED;
        draft.error = action.payload;
      });
    default:
      return state;
  }
};

export default reducer;

// Selectors

export const selectMemberById = (id) => {
  return (state) => {
    return state.members.membersData.find((member) => member._id === id);
  };
};
