import { combineReducers } from "@reduxjs/toolkit";
import alertReducer from "./alert.reducer";
import authReducer from "./auth.reducer";
import contactReducer from "./contact.reducer";
import messageReducer from "./message.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  alert: alertReducer,
  contact: contactReducer,
});

export default rootReducer;
