import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { Dispatch } from "react";
import { Action, AuthTypes, WebsocketMessageData } from "../models";

export const login = (ws?: WebSocket) => {
  return (dispatch: Dispatch<Action<AuthTypes>>) => {
    dispatch({
      type: AuthTypes.LOGIN,
    });

    if (!ws) {
      dispatch({
        type: AuthTypes.LOGIN_FAILURE,
      })
    } else {
      const data: WebsocketMessageData = {
        type: "LOGIN",
        metadata: {
          userId: undefined,
        },
      };

      try {
        ws.send(JSON.stringify(data));
      } catch (e) {
        dispatch({
          type: AuthTypes.LOGIN_FAILURE,
        });
      }
    }
  };
};

export const authenticateWithOauth = (ws?: WebSocket) => {
  return (dispatch: Dispatch<Action<AuthTypes>>) => {
    dispatch({
      type: AuthTypes.LOGIN_WITH_OAUTH,
    });

    if (!ws) {
      dispatch({
        type: AuthTypes.LOGIN_WITH_OAUTH_FAILURE,
      })
    } else {
      const provider = new GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const auth = getAuth();
      signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        console.log(result);
        dispatch({
          type: AuthTypes.CHANGE_NAME,
          payload: {
            username: result.user.displayName,
          }
        });

        const data: WebsocketMessageData = {
          type: "LOGIN",
          metadata: {
            userId: result.user.uid,
          },
        };
  
        try {
          ws.send(JSON.stringify(data));
        } catch (e) {
          dispatch({
            type: AuthTypes.LOGIN_WITH_OAUTH_FAILURE,
          });
        }
      })
      .catch((_error) => {
        // const errorMessage = error.message;
        dispatch({
          type: AuthTypes.LOGIN_WITH_OAUTH_FAILURE,
        });
      })
    }
  }
}

export const logout = (clientId: string, ws?: WebSocket) => {
  return (dispatch: Dispatch<Action<AuthTypes>>) => {
    if (!ws) {
      dispatch({
        type: AuthTypes.LOGOUT_SUCCESS,
      })
    } else {
      const data: WebsocketMessageData = {
        type: "LOGOUT",
        metadata: {
          clientId,
        },
      };

      dispatch({
        type: AuthTypes.LOGOUT,
      })

      try {
        ws.send(JSON.stringify(data));
        dispatch({
          type: AuthTypes.LOGOUT_SUCCESS,
        })
      } catch (e) {
        dispatch({
          type: AuthTypes.LOGOUT_FAILURE,
        })
      }
    }
  }
}
