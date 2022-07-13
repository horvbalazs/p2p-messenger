import { Dispatch } from "@reduxjs/toolkit";
import {
  Action,
  AuthTypes,
  ConnectionResponse,
  MessageDTO,
  MessageTypes,
  WebsocketMessageData,
} from "../models";

export const connect = (websocket: WebSocket) => {
  return (dispatch: Dispatch<Action<AuthTypes>>) => {
    dispatch({
      type: AuthTypes.CONNECT,
    });

    try {
      websocket.onopen = () => {
        dispatch({
          type: AuthTypes.CONNECT_SUCCESS,
        });
      };
    } catch {
      dispatch({
        type: AuthTypes.CONNECT_FAILURE,
      });
    }
  };
};

export const subscribe = (ws: WebSocket) => {
  return (dispatch: Dispatch<Action<AuthTypes | MessageTypes>>) => {
    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as WebsocketMessageData;
      switch (data.type) {
        case "CONNECT":
          dispatch({
            type: AuthTypes.CONNECT_SUCCESS,
            payload: {
              clientId: (data.metadata as ConnectionResponse).clientId,
            },
          });
          break;
        case "MESSAGE":
          dispatch({
            type: MessageTypes.ON_MESSAGE,
            payload: data.metadata as MessageDTO,
          });
          break;
        case "ERROR":
          // dispatch({});
          break;
        default:
          break;
      }
    };
  };
};
