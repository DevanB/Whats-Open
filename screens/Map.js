import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import MapView from "react-native-maps";
import HeaderActions from "../components/HeaderActions";
import MapLegend from "../components/MapLegend";
import Marker from "../components/Marker";
import PlaceList from "../components/PlaceList";
import sections from "../constants/data";
import buildAddress from "../helpers/buildAddress";
const { height: WindowHeight } = Dimensions.get("window");

type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
};

type Props = {};

type State = {
  errorMessage: string,
  region: Region,
  location: {}
};

export default class Map extends React.Component {
  static navigationOptions = ({screenProps: { t }, navigation}) => {
    return {
      headerLeft: <HeaderActions.Left navigation={navigation} />,
      headerRight: <HeaderActions.Right navigation={navigation} />,
      title: t("whats-open")
    };
  };

  state: State = {
    errorMessage: null,
    location: { coords: { latitude: 0, longitude: 0 } },
    regionSet: false,
    sections
  };

  componentWillMount() {
    this._followLocationAsync();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <MapView
            region={this.state.region}
            onRegionChangeComplete={region => {
              if (this.state.regionSet) this.setState({ region });
            }}
            onMapReady={() => {
              this.setState({ regionSet: true });
            }}
            showsUserLocation={true}
            showsPointsOfInterest={false}
            showsTraffic={false}
            style={{ flexShrink: 0, flexBasis: WindowHeight * 0.3 }}
          >
            {this.state.sections[0].data.map(marker => (
              <MapView.Marker key={marker.id} coordinate={marker.coordinates}>
                <Marker
                  status={marker.user_defined && marker.user_defined.status}
                />
                <MapView.Callout
                  onPress={() =>
                    this.props.navigation.navigate("PlaceDetails", {
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
          statusIcon={true}
          headerText="LOCATIONS"
          sections={this.state.sections}
          style={{ flexGrow: 1, flexBasis: WindowHeight * 0.7 }}
          navigate={this.props.navigation.navigate}
        />
      </View>
    );
  }

  async _followLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied."
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0119,
      longitudeDelta: 0.0119
    };
    this.setState({ location, region });
  }
}
