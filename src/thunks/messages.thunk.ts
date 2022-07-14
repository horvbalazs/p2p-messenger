import { Dispatch } from "react"
import { Action, Message, MessageDTO, MessageTypes, WebsocketMessageData } from "../models"

export const sendMessage = (message: Message, ws?: WebSocket) => {
  return (dispatch: Dispatch<Action<MessageTypes, Message>>) => {
    if (!ws) {
      dispatch({
        type: MessageTypes.SEND_MESSAGE_FAILURE,
      })
    } else {
      try {
        dispatch({
          type: MessageTypes.SEND_MESSAGE,
        });

        const data: WebsocketMessageData = {
          type: "MESSAGE",
          metadata: buildMessageBody(message),
        };
        ws.send(JSON.stringify(data));

        dispatch({
          type: MessageTypes.SEND_MESSAGE_SUCCESS,
          payload: message,
        });
      } catch (e) {
        dispatch({
          type: MessageTypes.SEND_MESSAGE_FAILURE,
        });
      }
    }
  }
}

export const addContact = (clientId: string, ws?: WebSocket) => {
  return (dispatch: Dispatch<Action<MessageTypes>>) => {
    if (!ws) {
      dispatch({
        type: MessageTypes.ADD_CONTACT_FAILURE,
      })
    } else {
      try {
        dispatch({
          type: MessageTypes.ADD_CONTACT,
          payload: clientId,
        })
        ws.send(JSON.stringify({
          type: "CONTACT",
          metadata: {
            clientId,
          }
        }))
      } catch (e) {
        dispatch({
          type: MessageTypes.ADD_CONTACT_FAILURE,
        });
      }
    }
  }
}

const buildMessageBody = (message: Message): MessageDTO => {
  return {
    ...message,
    body: JSON.stringify(message.body),
  }
}