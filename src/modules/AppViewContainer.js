import {connect} from 'react-redux';
import AppView from './AppView';
import {
  resetSessionStateFromSnapshot,
  initializeSessionState
} from '../reducers/SessionState';

export default connect(
  state => ({
    isReady: state.getIn(['session', 'isReady']),
    isLoggedIn: state.getIn(['auth', 'isLoggedIn'])
  })
  ,{
    resetSessionStateFromSnapshot,
    initializeSessionState,
  }
)(AppView);
