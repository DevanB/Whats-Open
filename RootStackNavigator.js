import { createAppContainer, createStackNavigator } from "react-navigation";
import AccountScreen from "./screens/Account";
import MapScreen from "./screens/Map";
import PlaceDetailsScreen from "./screens/PlaceDetails";
import ReportPlaceScreen from "./screens/ReportPlace";
import SearchScreen from "./screens/Search";

const MainScreens = createStackNavigator(
  {
    Main: MapScreen,
    PlaceDetails: PlaceDetailsScreen
  },
  {
    initialRouteName: "Main",
    headerMode: "screen",
    defaultNavigationOptions: {
      headerTintColor: "black",
      headerTitleStyle: {
        color: "black",
        fontWeight: "normal"
      },
      headerStyle: {
        backgroundColor: "rgb(248,205,70)"
      }
    },
    navigationOptions: () => ({
      gesturesEnabled: true
    })
  }
);

const MainStack = createStackNavigator(
  {
    Main: MainScreens,
    Search: SearchScreen
  },
  {
    initialRouteName: "Main",
    headerMode: "none",
    defaultNavigationOptions: {
      headerTintColor: "black",
      headerTitleStyle: {
        color: "black",
        fontWeight: "normal"
      },
      headerStyle: {
        backgroundColor: "rgb(248,205,70)"
      }
    },
    navigationOptions: () => ({
      gesturesEnabled: true
    })
  }
);

const ModalNavigator = createStackNavigator(
  {
    MainStack: {
      screen: MainStack,
      navigationOptions: {
        header: null
      }
    },
    ReportPlace: ReportPlaceScreen,
    Account: AccountScreen
  },
  {
    initialRouteName: "MainStack",
    headerMode: "screen",
    mode: "modal",
    defaultNavigationOptions: {
      headerTintColor: "black",
      headerTitleStyle: {
        color: "black",
        fontWeight: "normal"
      },
      headerStyle: {
        backgroundColor: "rgb(248,205,70)"
      }
    },
    navigationOptions: () => ({
      gesturesEnabled: false
    })
  }
);

const AppContainer = createAppContainer(ModalNavigator);

export default AppContainer;
