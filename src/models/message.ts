interface MessageBody {
  senderUserName: string;
  date: number;
  text: string;
}

export interface Message {
  recipient: string;
  sender: string;
  body: MessageBody;
}

export interface MessageDTO {
  recipient: string;
  sender: string;
  body: string;
}

export interface MessagesState {
  messages: Map<string, Message[]>;
}

export enum MessageTypes {
  ON_MESSAGE = "ON_MESSAGE",
  SEND_MESSAGE = "SEND_MESSAGE",
  ADD_CONTACT = "ADD_CONTACT",
  ADD_CONTACT_SUCCESS = "ADD_CONTACT_SUCCESS",
  ADD_CONTACT_FAILURE = "ADD_CONTACT_FAILURE",
  SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS",
  SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE",
}
