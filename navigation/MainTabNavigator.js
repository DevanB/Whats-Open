import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import AccountScreen from '../screens/Account';
import MapScreen from '../screens/Map';
import PlaceDetailsScreen from '../screens/PlaceDetails';
import ReportScreen from '../screens/Report';

const MapTabNavigator = StackNavigator(
  {
    Map: {
      screen: MapScreen
    },
    PlaceDetails: {
      screen: PlaceDetailsScreen
    }
  },
  {
    initialRouteName: 'Map',
    navigationOptions: () => ({
      gesturesEnabled: true,
      headerBackTitle: 'Back',
      headerBackTitleStyle: {
        color: 'black'
      },
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

const ReportTabNavigator = StackNavigator(
  {
    Report: {
      screen: ReportScreen
    },
    PlaceDetails: {
      screen: PlaceDetailsScreen
    }
  },
  {
    initialRouteName: 'Report',
    navigationOptions: () => ({
      gesturesEnabled: true,
      headerBackTitle: 'Back',
      headerBackTitleStyle: {
        color: 'black'
      },
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

export default TabNavigator(
  {
    Map: {
      screen: MapTabNavigator,
      navigationOptions: {
        tabBarLabel: "What's Open?"
      }
    },
    Report: {
      screen: ReportTabNavigator,
      navigationOptions: {
        tabBarLabel: 'Report'
      }
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        tabBarLabel: 'Account'
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Map':
            iconName = Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map';
            break;
          case 'Report':
            iconName = Platform.OS === 'ios' ? `ios-add-circle${focused ? '' : '-outline'}` : 'md-add-circle';
            break;
          case 'Account':
            iconName = Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);
