import { Action, MessagesState, MessageTypes } from "../models";

const initialState: MessagesState = {
  messages: [],
};

const messageReducer = (
  state: MessagesState = initialState,
  action: Action<MessageTypes>
): MessagesState => {
  return state;
  switch (action.type) {
  }
};

export default messageReducer;
