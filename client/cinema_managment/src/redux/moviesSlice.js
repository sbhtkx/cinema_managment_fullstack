import { produce } from "immer";
import axios from "axios";
import { createSelector } from "reselect";
import { dateToString } from "../helpers/utils";
// import cloneDeep from "clone-deep";

// Types
const FETCH_MOVIES_DATA_REQUEST = "FETCH_USERS_MOVIES_REQUEST";
const FETCH_MOVIES_DATA_SUCCESS = "FETCH_USERS_MOVIES_SUCCESS";
const FETCH_MOVIES_DATA_FAILURE = "FETCH_USERS_MOVIES_FAILURE";

// Actions
const MOVIES_URL = "http://localhost:5000/movies";

const doFetchMoviesDataRequest = () => ({
  type: FETCH_MOVIES_DATA_REQUEST,
});

const doFetchMoviesDataSuccess = (moviesData) => ({
  type: FETCH_MOVIES_DATA_SUCCESS,
  payload: moviesData,
});

const doFetchMoviesDataFailure = (error) => ({
  type: FETCH_MOVIES_DATA_FAILURE,
  payload: error,
});

export const doFetchMoviesData = () => {
  return (dispatch) => {
    dispatch(doFetchMoviesDataRequest());
    axios
      .get(MOVIES_URL)
      .then((response) => {
        const moviesData = response.data;
        moviesData.forEach(
          (movie) => (movie.premiered = dateToString(new Date(movie.premiered)))
        );
        dispatch(doFetchMoviesDataSuccess(moviesData));
      })
      .catch((error) => {
        console.log(error.message);
        const errorMsg = error.message;
        dispatch(doFetchMoviesDataFailure(errorMsg));
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
  moviesData: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_DATA_REQUEST:
      return produce(state, (draft) => {
        draft.status = statusEnum.LOADING;
      });
    case FETCH_MOVIES_DATA_SUCCESS:
      return produce(state, (draft) => {
        draft.status = statusEnum.SUCCEEDED;
        draft.moviesData = action.payload; // TODO: should I clonedeep?
        draft.error = "";
      });
    case FETCH_MOVIES_DATA_FAILURE:
      return produce(state, (draft) => {
        draft.moviesData = []; // TODO: not sure if I want to delete previous data
        draft.status = statusEnum.FAILED;
        draft.error = action.payload;
      });
    default:
      return state;
  }
};

export default reducer;

// Selectors
export const selectMoviesIdsAndNames = createSelector(
  (state) => {
    return state.movies.moviesData;
  },
  (movies) => {
    return movies?.map((movie) => ({ id: movie?._id, name: movie?.name }));
  }
);

export const selectMovieById = (id) => {
  return (state) => {
    return state.movies.moviesData.find((movie) => movie._id === id);
  };
};
