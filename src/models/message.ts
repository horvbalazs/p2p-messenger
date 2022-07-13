interface MessageBody {
  senderUserName: string;
  date: string;
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
  messages: Message[];
}

export enum MessageTypes {
  ON_MESSAGE = "ON_MESSAGE",
  SEND_MESSAGE = "SEND_MESSAGE",
  SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS",
  SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE",
}
