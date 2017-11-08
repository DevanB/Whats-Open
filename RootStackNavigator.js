//@ flow

import React from 'react';
import { StackNavigator } from 'react-navigation';

import MapScreen from './screens/Map';
import SearchScreen from './screens/Search';
import ReportPlaceScreen from './screens/ReportPlace';
import ReportPlaceSignUpScreen from './screens/ReportPlaceSignUp';
import PlaceDetailsScreen from './screens/PlaceDetails';
import AccountScreen from './screens/Account';

const MainScreens = StackNavigator(
  {
    Main: {
      screen: MapScreen
    },
    PlaceDetails: {
      screen: PlaceDetailsScreen
    }
  },
  {
    headerMode: 'screen',
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

const MainStack = StackNavigator(
  {
    Main: {
      screen: MainScreens
    },
    Search: {
      screen: SearchScreen
    }
  },
  {
    headerMode: 'none',
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

export default (ModalNavigator = StackNavigator(
  {
    MainStack: {
      screen: MainStack,
      navigationOptions: {
        header: null
      }
    },
    ReportPlace: {
      screen: ReportPlaceSignUpScreen
    },
    Account: {
      screen: AccountScreen
    }
  },
  {
    initialRouteName: 'MainStack',
    headerMode: 'screen',
    mode: 'modal',
    navigationOptions: () => ({
      gesturesEnabled: false,
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
));
