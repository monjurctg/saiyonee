import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {apiSlice} from "./api/apiSlice";
import authReducer from "./slices/authSlices";

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  devTools: process.env.NODE_ENV !== "production",
});

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
