import {Map} from 'immutable';
import makeActionCreator from '../utils/ActionHelpers';


export const RESET_STATE = 'SessionState/RESET';
export const INITIALIZE_STATE = 'SessionState/INITIALIZE';

export const resetSessionStateFromSnapshot = makeActionCreator(RESET_STATE,'payload');
export const initializeSessionState = makeActionCreator(INITIALIZE_STATE);


// Initial state
const initialState = Map({isReady: false});
export const sessionStateReducer = (_ = initialState, action = {}) => {
  switch (action.type) {
    case INITIALIZE_STATE:
    case RESET_STATE:
      return _.set('isReady', true);
    default:
      return _;
  }
}
