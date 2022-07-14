import { Action, AlertState, AlertTypes } from "../models"

const initialState: AlertState = {
  show: false,
  type: 'error',
}

const alertReducer = (
  state = initialState, 
  action: Action<AlertTypes>,
): AlertState => {
  switch(action.type) {
    case AlertTypes.HIDE:
      return {
        ...state,
        show: false,
      };
    case AlertTypes.SHOW:
      return {
        ...state,
        show: true,
        type: action.payload.type,
        message: action.payload.message,
      }
    default:
      return state;
  }
}

export default alertReducer;