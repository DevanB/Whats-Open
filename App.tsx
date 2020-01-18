import "./i18n";

import { AppLoading, Asset } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React from "react";
import { StyleSheet, View } from "react-native";
import RootStackNavigator from "./RootStackNavigator";
import { useTranslation } from 'react-i18next';

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<Location.LocationData>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const { t } = useTranslation();

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
      // TODO translate
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
    <View style={styles.container}>
      <RootStackNavigator screenProps={{t}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
