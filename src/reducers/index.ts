import { combineReducers } from "@reduxjs/toolkit";
import { AuthTypes } from "../models";
import alertReducer from "./alert.reducer";
import authReducer from "./auth.reducer";
import contactReducer from "./contact.reducer";
import messageReducer from "./message.reducer";

const appReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  alert: alertReducer,
  contact: contactReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === AuthTypes.LOGOUT_SUCCESS) {
    return appReducer({
      ...state,
      contact: {
        selectedContact: '',
      },
      message: {
        messages: new Map(),
      }
    }, action);
  }

  return appReducer(state, action);
}

export default rootReducer;
