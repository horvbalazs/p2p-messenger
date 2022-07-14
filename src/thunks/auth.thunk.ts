import { Dispatch } from "react";
import { Action, AuthTypes, WebsocketMessageData } from "../models";

export const logInAsGuest = (ws?: WebSocket, guestId?: string) => {
  return (dispatch: Dispatch<Action<AuthTypes>>) => {
    dispatch({
      type: AuthTypes.LOGIN,
    });

    if (!ws || !guestId) {
      dispatch({
        type: AuthTypes.LOGIN_FAILURE,
      })
    } else {
      const data: WebsocketMessageData = {
        type: "LOGIN",
        metadata: {
          clientId: undefined,
          guestId,
        },
      };

      try {
        ws.send(JSON.stringify(data));
        dispatch({
          type: AuthTypes.LOGIN_SUCCESS,
        });
      } catch (e) {
        dispatch({
          type: AuthTypes.LOGIN_FAILURE,
        });
      }
    }
  };
};

export const logout = (ws?: WebSocket) => {
  return (dispatch: Dispatch<Action<AuthTypes>>) => {
    if (!ws) {
      dispatch({
        type: AuthTypes.LOGOUT_SUCCESS,
      })
    } else {
      const data: WebsocketMessageData = {
        type: "LOGOUT",
        metadata: undefined,
      };

      dispatch({
        type: AuthTypes.LOGOUT,
      })

      try {
        ws.send(JSON.stringify(data));
        dispatch({
          type: AuthTypes.LOGOUT_SUCCESS,
        })
        ws.close();
      } catch (e) {
        dispatch({
          type: AuthTypes.LOGOUT_FAILURE,
        })
      }
    }
  }
}
