import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {apiSlice} from "./api/apiSlice";
import authReducer from "./slices/authSlices";
import preferenceSlice from "./slices/preferenceSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  preference: preferenceSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
  devTools: process.env.NODE_ENV !== "production",
});

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),

  serializableCheck: false,
});

export default store;
