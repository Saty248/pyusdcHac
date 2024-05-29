import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  userReducer: persistReducer(persistConfig, userReducer),
  // Add other reducers here...
});

export default rootReducer;
