import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
