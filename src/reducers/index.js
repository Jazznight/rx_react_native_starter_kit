import {
	combineReducers
} from 'redux-immutable';

import {
	combineEpics
} from 'redux-observable';

import {
  sessionStateReducer,
} from './SessionState' 
import {
  authStateReducer,
} from './AuthState'

import {
  routeReducer,
} from '../modules/navigation/NavigationState'

import {
  counterEpic,
  counterReducer,
} from '../modules/counter/CounterState'

import {RESET_STATE} from './SessionState';


const epics = [
  ...counterEpic,
];

const namespacedReducer = combineReducers({
  session: sessionStateReducer,
  auth:    authStateReducer,
  routing: routeReducer,
  counter: counterReducer,
});

export default function mainReducer(state, action) {
  if (action.type === RESET_STATE) {
    return namespacedReducer(action.payload, action);
  }
  return namespacedReducer(state || void 0, action);
}

export const Epics = combineEpics(...epics);
//export const Reducers = combineReducers( reducers );
export const Reducers = mainReducer
