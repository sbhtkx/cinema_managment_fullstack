import { produce } from "immer";
import axios from "axios";
// import cloneDeep from "clone-deep";

// Types
const FETCH_SUBSCRIPTIONS_DATA_REQUEST = "FETCH_USERS_SUBSCRIPTIIONS_REQUEST";
const FETCH_SUBSCRIPTIIONS_DATA_SUCCESS = "FETCH_USERS_SUBSCRIPTIIONS_SUCCESS";
const FETCH_SUBSCRIPTIIONS_DATA_FAILURE = "FETCH_USERS_SUBSCRIPTIIONS_FAILURE";

// Actions
const SUBSCRIPTIONS_URL = "http://localhost:5000/subscriptions";

const doFetchSubscriptionsDataRequest = () => ({
  type: FETCH_SUBSCRIPTIONS_DATA_REQUEST,
});

const doFetchSubscriptionsDataSuccess = (subscriptionsData) => ({
  type: FETCH_SUBSCRIPTIIONS_DATA_SUCCESS,
  payload: subscriptionsData,
});

const doFetchSubscriptionsDataFailure = (error) => ({
  type: FETCH_SUBSCRIPTIIONS_DATA_FAILURE,
  payload: error,
});

export const doFetchSubscriptionsData = () => {
  return (dispatch) => {
    dispatch(doFetchSubscriptionsDataRequest());
    axios
      .get(SUBSCRIPTIONS_URL)
      .then((response) => {
        const subscriptionsData = response.data;
        dispatch(doFetchSubscriptionsDataSuccess(subscriptionsData));
      })
      .catch((error) => {
        console.log(error.message);
        const errorMsg = error.message;
        dispatch(doFetchSubscriptionsDataFailure(errorMsg));
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
  subscriptionsData: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_DATA_REQUEST:
      return produce(state, (draft) => {
        draft.status = statusEnum.LOADING;
      });
    case FETCH_SUBSCRIPTIIONS_DATA_SUCCESS:
      return produce(state, (draft) => {
        draft.status = statusEnum.SUCCEEDED;
        draft.subscriptionsData = action.payload.map((subscriptions) => {
          return {
            memberId: subscriptions.memberId,
            movies: subscriptions.movies.map((movie) => {
              return { movieId: movie.movieId, date: movie.date };
            }),
          };
        }); // TODO: should I clonedeep?
        draft.error = "";
      });
    case FETCH_SUBSCRIPTIIONS_DATA_FAILURE:
      return produce(state, (draft) => {
        draft.subscriptionsData = []; // TODO: not sure if I want to delete previous data
        draft.status = statusEnum.FAILED;
        draft.error = action.payload;
      });
    default:
      return state;
  }
};

export default reducer;

// export const selectMoviesWat

export const selectMoviesWatchedNameIdAndDateByMemberId =
  (memberId) => (state) => {
    const subscriptions = state.subscriptions?.subscriptionsData.find(
      (subs) => {
        return subs.memberId === memberId;
      }
    );
    const movies = state.movies?.moviesData;
    if (!subscriptions) return [];
    const moviesWithNames = subscriptions?.movies?.map((movie1) => {
      const foundMovie = movies.find((movie2) => {
        return movie2._id === movie1.movieId;
      });
      return {
        movieId: movie1.movieId,
        date: movie1.date,
        movieName: foundMovie?.name,
      };
    });
    return moviesWithNames;
  };

export const selectMoviesNotWatchedNameAndIdByMemberId =
  (memberId) => (state) => {
    const subscriptions = state.subscriptions?.subscriptionsData.find(
      (subs) => {
        return subs.memberId === memberId;
      }
    )?.movies;
    const movies = state.movies?.moviesData;
    const notWatchedMovies = movies.filter((movie1) => {
      return !subscriptions?.find((movie2) => movie1._id === movie2.movieId);
    });
    const moviesWithNames = notWatchedMovies?.map((movie) => {
      return {
        id: movie._id,
        name: movie.name,
      };
    });
    return moviesWithNames;
  };

export const selectWatchesByMovieIdWithMemberNames = (movieId) => (state) => {
  const subscriptions = state.subscriptions?.subscriptionsData
    .filter((subscriptions) => {
      return subscriptions.movies.find((watch) => watch.movieId === movieId);
    })
    .map((subscriptions) => {
      return {
        memberId: subscriptions?.memberId,
        date: subscriptions?.movies[0].date,
      };
    });
  const members = state.members?.membersData;
  return subscriptions?.map((subs) => {
    const foundMember = members.find(
      (member2) => member2._id === subs?.memberId
    );
    return {
      memberName: foundMember?.name,
      memberId: subs?.memberId,
      date: subs?.date,
    };
  });
};
