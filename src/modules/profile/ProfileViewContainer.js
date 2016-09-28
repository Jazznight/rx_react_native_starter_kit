import {connect} from 'react-redux';
import ProfileView from './ProfileView';
import { pushRoute } from '../../modules/navigation/NavigationState';

export default connect(
  state => ({
    auth: state.getIn(['auth', 'currentUser']),
    userName: state.getIn(['auth', 'currentUser', 'name']),
    userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture'])
  }),
  {
    pushRoute,
  }
)(ProfileView);
