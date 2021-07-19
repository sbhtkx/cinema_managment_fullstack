import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import logger from "redux-logger";
import thunk from "redux-thunk";
import authReducer from "./authSlice";
import usersDataReducer from "./usersDataSlice";
import moviesReducer from "./moviesSlice";
import membersReducer from "./membersSlice";
import subscriptionsReducer from "./subscriptionsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const middlewares = [logger, thunk];

const reducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    usersAllData: usersDataReducer,
    movies: moviesReducer,
    members: membersReducer,
    subscriptions: subscriptionsReducer,
  })
);

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export const persistor = persistStore(store);

const stores = { store, persistor };
export default stores;
