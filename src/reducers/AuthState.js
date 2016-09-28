import {Map} from 'immutable';
import makeActionCreator from '../utils/ActionHelpers';


// Actions
const LOGIN_DONE  = 'AppState/LOGIN_DONE';
const LOGIN_FAIL  = 'AppState/LOGIN_FAIL';

export const loginDone = makeActionCreator(LOGIN_DONE, 'profile', 'token');
export const loginFail = makeActionCreator(LOGIN_FAIL, 'error');

// Reducer
// Initial state
const initialState = Map({
  isLoggedIn: false,
  currentUser: null,
  authenticationToken: null
});
export const authStateReducer = (_ = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_DONE:
      console.log('authReducer.......', action)
      return _
        .set('isLoggedIn', true)
        .set('currentUser', Map(action.profile) )
        .set('authenticationToken', Map(action.token) );
    case LOGIN_FAIL:
      return initialState;
    default:
      return _;
  }
}
