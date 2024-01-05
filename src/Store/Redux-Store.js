import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-Slice";
import uiReducer from "./ui-slice";
import composeReducer from "./Compose-Slice";

const ReduxStore = configureStore({
  reducer: { auth: authReducer, ui: uiReducer, compose: composeReducer },
});

export default ReduxStore;
