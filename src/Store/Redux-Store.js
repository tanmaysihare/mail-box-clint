import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-Slice";
import uiReducer from "./ui-slice";
const ReduxStore = configureStore({
  reducer: { auth: authReducer, ui: uiReducer },
});

export default ReduxStore;
