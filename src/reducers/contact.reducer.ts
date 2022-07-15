import { Action, ContactState, ContactTypes, MessageTypes } from "../models"

const initialState: ContactState = {
  selectedContact: '',
}

const contactReducer = (
  state = initialState, 
  action: Action<ContactTypes | MessageTypes>,
): ContactState => {
  switch(action.type) {
    case ContactTypes.SELECT:
      return {
        ...state,
        selectedContact: action.payload.clientId,
      };
    case MessageTypes.ADD_CONTACT_SUCCESS:
      return {
        ...state,
        selectedContact: action.payload.recipient,
      };
    case ContactTypes.CLEAR:
      return {
        ...state,
        selectedContact: '',
      }
    default:
      return state;
  }
}

export default contactReducer;