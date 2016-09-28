import {fromJS} from 'immutable';

import {NavigationExperimental} from 'react-native';
const {StateUtils: NavigationStateUtils} = NavigationExperimental;

import makeActionCreator from '../../utils/ActionHelpers';

// Actions
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const SWITCH_TAB = 'NavigationState/SWITCH_TAB';

export const switchTab = makeActionCreator(SWITCH_TAB, 'index');
export const pushRoute = makeActionCreator(PUSH_ROUTE, 'route');
export const popRoute  = makeActionCreator(POP_ROUTE);

// reducers for tabs and scenes are separate
const initialState = fromJS({
  tabs: {
    index: 0,
    routes: [
      {key: 'HomeTab', title: 'HOME'},
      {key: 'ProfileTab', title: 'PROFILE'}
    ]
  },
  // Scenes for the `HomeTab` tab.
  HomeTab: {
    index: 0,
    routes: [{key: 'Counter', title: 'Counter screen'}]
    //routes: [{key: 'Home', title: 'Home screen'}]
  },
  // Scenes for the `ProfileTab` tab.
  ProfileTab: {
    index: 0,
    routes: [{key: 'Profile', title: 'User profile screen'}]
  }
});

export const routeReducer = (_ = initialState, action) => {

    switch (action.type) {
      case PUSH_ROUTE: {
        // Push a route into the scenes stack.
        const route = action.route;
        const tabs = _.get('tabs');
        const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
        const scenes = _.get(tabKey).toJS();
        let nextScenes;
        // fixes issue #52
        // the try/catch block prevents throwing an error when the route's key pushed
        // was already present. This happens when the same route is pushed more than once.
        try {
          nextScenes = NavigationStateUtils.push(scenes, route);
        } catch (e) {
          nextScenes = scenes;
        }
        if (scenes !== nextScenes) {
          return _.set(tabKey, fromJS(nextScenes));
        }
        return _;
      }
      case POP_ROUTE: {
        // Pops a route from the scenes stack.
        const tabs = _.get('tabs');
        const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
        const scenes = _.get(tabKey).toJS();
        const nextScenes = NavigationStateUtils.pop(scenes);
        if (scenes !== nextScenes) {
          return _.set(tabKey, fromJS(nextScenes));
        }
        return _;
      }
      case SWITCH_TAB: {
        // Switches the tab.
        const tabs = NavigationStateUtils.jumpToIndex(_.get('tabs').toJS(), action.index);
        if (tabs !== _.get('tabs')) {
          return _.set('tabs', fromJS(tabs));
        }
        return _;
      }
      default:
        return _;
    }
}
