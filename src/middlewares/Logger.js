import createLogger from 'redux-logger';

export default createLogger({
  collapsed: true,

  // only log in development mode
  predicate: () => (process.env.NODE_ENV != 'production'),

  // transform immutable state to plain objects
  stateTransformer: state => state.toJS(),

  // transform immutable action payloads to plain objects
  actionTransformer: action =>
    action && action.payload && action.payload.toJS
      ? {...action, payload: action.payload.toJS()}
      : action
});
