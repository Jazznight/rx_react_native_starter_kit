import {Provider} from 'react-redux';
import store from './src/store';
import AppViewContainer from './src/modules/AppViewContainer';

import React from 'react';
import { AppRegistry } from 'react-native';

const App = React.createClass({
  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
});

AppRegistry.registerComponent('RxReactNativeBoilerplate', () => App);
