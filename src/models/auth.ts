import { MessageDTO } from "./message";

export interface AuthState {
  username: string;
  clientId?: string;
  loggedIn: boolean;
}

export interface ConnectionResponse {
  clientId: string;
}

export interface LoginMetaData {
  userId?: string,
}

export interface WebsocketMessageData {
  type: "MESSAGE" | "CONNECT" | "ERROR" | "LOGOUT" | "LOGIN" | "CONTACT";
  metadata: MessageDTO | ConnectionResponse | LoginMetaData | string | undefined;
}

export enum AuthTypes {
  CONNECT = "CONNECT",
  CONNECT_SUCCESS = "CONNECT_SUCCESS",
  CONNECT_FAILURE = "CONNECT_FAILURE",
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGIN_WITH_OAUTH = "LOGIN_WITH_OAUTH",
  LOGIN_WITH_OAUTH_FAILURE = "LOGIN_WITH_OAUTH_FAILURE",
  LOGOUT = "LOGOUT",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAILURE = "LOGOUT_FAILURE",
  CHANGE_NAME = "CHANGE_NAME",
}
