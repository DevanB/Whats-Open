import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import MapView from "react-native-maps";
import HeaderActions from "../components/HeaderActions";
import MapLegend from "../components/MapLegend";
import Marker from "../components/Marker";
import PlaceList from "../components/PlaceList";
import incomingSections from "../constants/data";
import buildAddress from "../helpers/buildAddress";
import i18n from "../i18n"
import { useNavigation } from "react-navigation-hooks";
const { height: WindowHeight } = Dimensions.get("window");
const { t } = i18n;

interface Region {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
};

const Map: React.FC<any> = () => {
  const [, setErrorMessage ] = useState<string | undefined>(undefined);
  const [, setLocation ] = useState<{}>({
    coords: {
      latitude: 0,
      longitude: 0
    }
  });
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [regionSet, setRegionSet] = useState<boolean>(false);
  const [sections] = useState<any>(incomingSections);
  const { navigate } = useNavigation()

  useEffect(() => {
    _followLocationAsync();
  }, []);

  const _followLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      //TODO add translation
      setErrorMessage("Permission to access location was denied.")
    }

    let location = await Location.getCurrentPositionAsync({});
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0119,
      longitudeDelta: 0.0119
    };
    setLocation(location);
    setRegion(region);
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        <MapView
          region={region}
          onRegionChangeComplete={region => {
            if (regionSet) setRegion(region);
          }}
          onMapReady={() => setRegionSet(true)}
          showsUserLocation={true}
          showsPointsOfInterest={false}
          showsTraffic={false}
          style={{ flexShrink: 0, flexBasis: WindowHeight * 0.3 }}
        >
          {sections[0].data.map((marker: any) => (
            <MapView.Marker key={marker.id} coordinate={marker.coordinates}>
              <Marker
                status={marker.user_defined && marker.user_defined.status}
              />
              <MapView.Callout
                onPress={() =>
                  navigate("PlaceDetails", {
                    ...marker
                  })
                }
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View style={{ width: 225 }}>
                    <Text
                      numberOfLines={1}
                      style={{ fontSize: 17, fontWeight: "500" }}
                    >
                      {marker.name}
                    </Text>
                    <Text numberOfLines={1} style={{ flex: 1 }}>
                      {buildAddress(marker.location)}
                    </Text>
                  </View>
                  <View style={{ alignSelf: "flex-end", top: -8 }}>
                    <MaterialIcons
                      name="chevron-right"
                      size={20}
                      color="lightgray"
                    />
                  </View>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <MapLegend />
      </View>
      <PlaceList
        headerText={t("locations").toUpperCase()}
        sections={sections}
        statusIcon={true}
        style={{ flexGrow: 1, flexBasis: WindowHeight * 0.7 }}
      />
    </View>
  );
}

Map.navigationOptions = ({screenProps: { t }}: {screenProps: { t: any }}) => {
  return {
    headerLeft: <HeaderActions.Left />,
    headerRight: <HeaderActions.Right />,
    title: t("whats-open")
  };
};

export default Map;
