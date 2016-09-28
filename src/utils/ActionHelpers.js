import _ from 'lodash';

const makeActionCreator =
  (type, ...keys) => (...vals) =>
    _.assign({ type }, _.zipObject(keys, vals));

export default makeActionCreator;
