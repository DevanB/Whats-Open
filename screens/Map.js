import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Location, MapView, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import LocationCell from '../components/LocationCell';
import MapLegend from '../components/MapLegend';
import Marker from '../components/Marker';
import PlaceList from '../components/PlaceList';
import buildAddress from '../helpers/buildAddress';
const { height: WindowHeight } = Dimensions.get('window');

import HeaderActions from '../components/HeaderActions';
import sections from '../constants/data';

export default class Map extends React.Component {
  static navigationOptions = props => {
    return {
      headerRight: <HeaderActions.Right navigation={props.navigation} />,
      title: "What's Open?"
    };
  };

  state = {
    location: { coords: { latitude: 0, longitude: 0 } },
    errorMessage: null,
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
            showsPointsOfInterest={false}
            showsTraffic={false}
            showsUserLocation={false}
            style={{ flexShrink: 0, flexBasis: WindowHeight * 0.3 }}>
            {this.state.sections[0].data.map(marker => (
              <MapView.Marker key={marker.id} coordinate={marker.coordinates}>
                <Marker status={marker.user_defined && marker.user_defined.status} />
                <MapView.Callout onPress={() => this.props.navigation.navigate('PlaceDetails', { ...marker })}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: 225 }}>
                      <Text numberOfLines={1} style={{ fontSize: 17, fontWeight: '500' }}>
                        {marker.name}
                      </Text>
                      <Text numberOfLines={1} style={{ flex: 1 }}>
                        {buildAddress(marker.location)}
                      </Text>
                    </View>
                    <View style={{ alignSelf: 'flex-end', top: -8 }}>
                      <MaterialIcons name="chevron-right" size={20} color="lightgray" />
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
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied.'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    this.setState({ location, region });
  }
}
