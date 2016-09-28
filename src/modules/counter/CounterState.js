import { Map } from 'immutable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/map';

import makeActionCreator from '../../utils/ActionHelpers';

// Actions
const INCREMENT = 'CounterState/INCREMENT';
const RESET = 'CounterState/RESET';
const RANDOM = 'CounterState/RANDOM';
const RANDOM_DONE = 'CounterState/RANDOM_DONE';

export const increment   = makeActionCreator(INCREMENT);
export const reset       = makeActionCreator(RESET);
export const random      = makeActionCreator(RANDOM);
export const randomDone  = makeActionCreator(RANDOM_DONE, 'number');


// Initial state
const initialState = Map({
  value: 0,
  loading: false
});

const randomCountEpic = action$ =>
  action$.ofType(RANDOM)
    .debounce(ev => Observable.interval(1000))
    .map( (/*action*/) =>
      randomDone(Math.floor(Math.random() * 100))
    )

export const counterEpic = [
  randomCountEpic,
];

// Reducer
export const counterReducer = (_ = initialState, action = {}) => {
  switch (action.type) {
    case INCREMENT:
      return _.update('value', value => value + 1);

    case RESET:
      return initialState;

    case RANDOM:
      return _.set('loading', true);

    case RANDOM_DONE:
      return _
        .set('loading', false)
        .set('value', action.number);

    default:
      return _;
  }
}
