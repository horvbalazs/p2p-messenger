import { Action, ContactState, ContactTypes } from "../models"

const initialState: ContactState = {
  selectedContact: '',
}

const contactReducer = (
  state = initialState, 
  action: Action<ContactTypes>,
): ContactState => {
  switch(action.type) {
    case ContactTypes.SELECT:
      return {
        ...state,
        selectedContact: action.payload.clientId,
      };
    default:
      return state;
  }
}

export default contactReducer;