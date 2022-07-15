import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";
import { Action, AuthState, AuthTypes } from "../models";

const getRandomName = () => uniqueNamesGenerator({ dictionaries: [colors, animals] })
  .split("_")
  .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
  .join(" ");

const initialState: AuthState = {
  username: '',
  loggedIn: false,
};

const authReducer = (
  state: AuthState = initialState,
  action: Action<AuthTypes>
): AuthState => {
  switch (action.type) {
    case AuthTypes.CONNECT_SUCCESS:
      return {
        ...state,
        clientId: action.payload?.clientId,
      };
    case AuthTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        username: state.username || getRandomName(),
        clientId: action.payload?.clientId ?? state.clientId,
      };
    case AuthTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        clientId: undefined,
      };
    case AuthTypes.CHANGE_NAME:
      return {
        ...state,
        username: action.payload.username,
      }
    default:
      return state;
  }
};

export default authReducer;
