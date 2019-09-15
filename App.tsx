import ApolloClient from "apollo-boost";
import { AppLoading, Asset } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { StyleSheet, View } from "react-native";
import RootStackNavigator from "./RootStackNavigator";
import i18n from "./i18n";

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cj7m9tx4e09lq0153rj77r7ex"
});

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<Location.LocationData>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    _getLocationAsync();
  }, []);

  const _loadAppAsync = async (): Promise<void> => {
    // require any images like icons in this below array like so:
    // require('./assets/images/whatever-icon.png
    const images: string[] = [];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    Promise.all(cacheImages);
    return;
  };

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied.");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: false
    });
    setLocation(location);
  };

  if (!appIsReady) {
    return (
      <AppLoading
        startAsync={_loadAppAsync}
        onError={console.warn}
        onFinish={() => setAppIsReady(true)}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <RootStackNavigator screenProps={i18n}/>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
