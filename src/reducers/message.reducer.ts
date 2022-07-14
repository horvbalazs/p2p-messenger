import { Action, Message, MessagesState, MessageTypes } from "../models";

const initialState: MessagesState = {
  messages: new Map<string, Message[]>(),
};

const messageReducer = (
  state: MessagesState = initialState,
  action: Action<MessageTypes, Message>
): MessagesState => {
  switch (action.type) {
    case MessageTypes.ON_MESSAGE:
      if (action.payload) {
        const stateMessages = state.messages;
        const messages = state.messages.get(action.payload.sender) || [];
        messages.unshift(action.payload);
        stateMessages.set(action.payload.sender, messages);

        return {
          ...state,
          messages: stateMessages,
        };
      }

      return state;
    case MessageTypes.SEND_MESSAGE_SUCCESS:
      if (action.payload) {
        const stateMessages = state.messages;
        const messages = state.messages.get(action.payload.recipient) || [];
        messages.unshift(action.payload);
        stateMessages.set(action.payload.recipient, messages);

        return {
          ...state,
          messages: stateMessages,
        };
      }

      return state;
    case MessageTypes.REMOVE_CONTACT:
      if (action.payload) {
        const stateMessages = state.messages;
        stateMessages.delete(action.payload.recipient,);

        return {
          ...state,
          messages: stateMessages,
        };
      }

      return state;
    case MessageTypes.ADD_CONTACT_SUCCESS:
      if (action.payload) {
        if (!state.messages.has(action.payload.recipient)) {
          const stateMessages = state.messages;
          stateMessages.set(action.payload.recipient, []);

          return {
            ...state,
            messages: stateMessages,
          };
        }
      }
      return state;

    default:
      return state;
  }
};

export default messageReducer;
