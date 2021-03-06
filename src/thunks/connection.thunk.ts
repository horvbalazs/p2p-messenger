import { Dispatch } from "@reduxjs/toolkit";
import {
  Action,
  AlertState,
  AlertTypes,
  AuthTypes,
  ConnectionResponse,
  MessageDTO,
  MessageTypes,
  WebsocketMessageData,
} from "../models";;

export const subscribe = (ws: WebSocket) => {
  return (dispatch: Dispatch<Action<AuthTypes | MessageTypes | AlertTypes>>) => {
    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as WebsocketMessageData;
      switch (data.type) {
        case "CONNECT":
          dispatch({
            type: AuthTypes.CONNECT_SUCCESS,
          });
          break;
        case "MESSAGE":
          const metadata = data.metadata as MessageDTO;

          dispatch({
            type: MessageTypes.ON_MESSAGE,
            payload: {
              ...metadata,
              body: JSON.parse(metadata.body)
            },
          });
          break;
        case "ERROR":
          const alertData: AlertState = {
            show: true,
            type: 'error',
            message: data.metadata as string,
          }
          dispatch({
            type: AlertTypes.SHOW,
            payload: alertData
          });
          break;
        case "CONTACT":
          dispatch({
            type: MessageTypes.ADD_CONTACT_SUCCESS,
            payload: {
              recipient: (data.metadata as ConnectionResponse).clientId,
            },
          })
          break;
        case "LOGIN":
          dispatch({
            type: AuthTypes.LOGIN_SUCCESS,
            payload: {
              clientId: (data.metadata as ConnectionResponse).clientId,
            }
          })
          break;
        default:
          break;
      }
    };
  };
};
