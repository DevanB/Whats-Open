//@ flow

import React from 'react';
import { StackNavigator } from 'react-navigation';

import MapScreen from './screens/Map';
import SearchScreen from './screens/Search';
import ReportPlaceScreen from './screens/ReportPlace';
import PlaceDetailsScreen from './screens/PlaceDetails';
import AccountScreen from './screens/Account';

const MainStack = StackNavigator(
  {
    Main: {
      screen: MapScreen
    },
    Search: {
      screen: SearchScreen,
      headerMode: 'none'
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
