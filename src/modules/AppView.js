import React, {PropTypes, component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import * as auth0 from '../services/auth0';
import * as snapshotUtil from '../utils/Snapshot';
import DeveloperMenu from '../components/DeveloperMenu';
import store from '../store';

const AppView = React.createClass({
  propTypes: {
    isReady: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    resetSessionStateFromSnapshot: PropTypes.func.isRequired,
    initializeSessionState: PropTypes.func.isRequired
  },

  componentDidMount() {
    snapshotUtil.resetSnapshot()
      .then(snapshot => {
        const {dispatch} = this.props;
        if (snapshot) {
          this.props.resetSessionStateFromSnapshot(snapshot);
        } else {
          this.props.initializeSessionState();
        }

        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  },

  componentWillReceiveProps({isReady, isLoggedIn}) {
    if (!this.props.isReady) {
      if (isReady && !isLoggedIn) {
        auth0.showLogin();
      }
    }
  },

  render() {
    if (!this.props.isReady) {
      return (
        <View>
          <ActivityIndicator style={styles.centered}/>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <NavigationViewContainer />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default AppView;
