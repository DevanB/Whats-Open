import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SearchScreen from '../screens/Search';
import ReportPlaceScreen from '../screens/ReportPlace';

const MainStack = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator
    },
    Search: {
      screen: SearchScreen
    }
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    navigationOptions: () => ({
      gesturesEnabled: true
    })
  }
);

const ModalNavigator = StackNavigator(
  {
    MainStack: {
      screen: MainStack
    },
    ReportPlace: {
      screen: ReportPlaceScreen
    }
  },
  {
    initialRouteName: 'MainStack',
    headerMode: 'none',
    mode: 'modal'
  }
);

export default class RootStackNavigator extends React.Component {
  render() {
    return <ModalNavigator />;
  }
}
