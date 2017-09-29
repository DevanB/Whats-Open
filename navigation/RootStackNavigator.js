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
      screen: MainStack,
      navigationOptions: {
        header: null
      }
    },
    ReportPlace: {
      screen: ReportPlaceScreen
    }
  },
  {
    initialRouteName: 'MainStack',
    headerMode: 'screen',
    mode: 'modal',
    navigationOptions: () => ({
      gesturesEnabled: true,
      headerTintColor: 'black',
      headerTitleStyle: {
        color: 'black',
        fontWeight: 'normal'
      },
      headerStyle: {
        backgroundColor: 'rgb(248,205,70)'
      }
    })
  }
);

export default class RootStackNavigator extends React.Component {
  render() {
    return <ModalNavigator />;
  }
}
