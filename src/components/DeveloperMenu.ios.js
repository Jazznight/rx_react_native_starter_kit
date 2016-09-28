import React from 'react';
import * as snapshot from '../utils/Snapshot';
import * as auth0 from '../services/auth0';

import {
  TouchableOpacity,
  ActionSheetIOS,
  StyleSheet
} from 'react-native';

/**
 * Simple developer menu, which allows e.g. to clear the app state.
 * It can be accessed through a tiny button in the bottom right corner of the screen.
 * ONLY FOR DEVELOPMENT MODE!
 */
const DeveloperMenu = React.createClass({
  displayName: 'DeveloperMenu',

  showDeveloperMenu() {
    const options = {
      clearState: 0,
      showLogin: 1,
      cancel: 2
    };

    const callback = async index => {
      if (index === options.clearState) {
        await snapshot.clearSnapshot();
        console.warn('(╯°□°）╯︵ ┻━┻ \nState cleared, Cmd+R to reload the application now');
      }
      else if (index === options.showLogin) {
        await auth0.showLogin();
        console.log('Show auth0 login screen');
      }
    };

    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        'Clear state',
        'Show login',
        'Cancel'
      ],
      cancelButtonIndex: options.cancel
    }, callback);
  },

  render() {
    if (!__DEV__) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.circle}
        onPress={this.showDeveloperMenu}
        />
    );
  }
});

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff'
  }
});

export default DeveloperMenu;
