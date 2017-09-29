import React from 'react';
import { Text, View } from 'react-native';
import { Location, MapView, Permissions } from 'expo';
import LocationCell from '../components/LocationCell';
import MapLegend from '../components/MapLegend';
import Marker from '../components/Marker';
import PlaceList from '../components/PlaceList';

import HeaderActions from '../components/HeaderActions';

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
    sections: [
      {
        data: [
          {
            latlng: { latitude: 28.551393, longitude: -81.5839652 },
            title: 'Wawa',
            address: '13501 W Colonial Drive, Winter Garden, FL 34787',
            description: 'Convenience store chain known for sandwiches & coffee. Many offer fuel & are open 24/7.',
            status: 'open',
            updatedAt: 'Today at 1:09pm',
            key: 1
          },
          {
            latlng: { latitude: 28.4761048, longitude: -81.6330373 },
            title: 'Wal-Mart',
            address: '16313 New Independence Pkwy, Winter Garden, FL 34787',
            description: "Men's clothing · Women's clothing · Men's shoes",
            status: 'open',
            updatedAt: 'Today at 3:23pm',
            key: 2
          },
          {
            latlng: { latitude: 28.5250509, longitude: -81.5815283 },
            title: 'Party City',
            address: '3089 Daniels Road, Winter Garden, FL 34787',
            description:
              'Retail chain stocking a wide range of themed party supplies plus costumes & holiday decorations',
            status: 'limited',
            updatedAt: 'Today at 7:39pm',
            key: 3
          },
          {
            latlng: { latitude: 28.5275914, longitude: -81.5251728 },
            title: 'Yellow Dog Eats',
            address: '1236 Hempel Avenue, Windermere, FL 34786',
            description:
              'Eclectic, pet-friendly hangout in a historic building features sandwiches, wraps & housemade BBQ.',
            status: 'closed',
            updatedAt: 'Yesterday at 11:57am',
            key: 4
          },
          {
            latlng: { latitude: 28.4732197, longitude: -81.6289228 },
            title: 'Publix Super Market at Hamlin Cove',
            address: '5400 Hamlin Groves Trail, Winter Garden, FL 34787',
            description: 'Organic products · Great produce',
            status: 'limited',
            updatedAt: 'Yesterday at 6:48pm',
            key: 5
          },
          {
            latlng: { latitude: 28.479, longitude: -81.591584 },
            title: '33 & Melt - A Grilled Cheese Bar in Orlando',
            address: '13790 Bridgewater Crossings Blvd #1000, Windermere, FL 34786',
            description:
              'Creative comfort food, craft beer & wine served in an upbeat venue with TVs & outdoor tables.',
            status: 'closed',
            updatedAt: 'Today at 9:13am',
            key: 6
          },
          {
            latlng: { latitude: 28.495216, longitude: -81.573352 },
            title: 'Casabella at Windermere',
            address: '4326 Isabella Cir, Windermere, FL 34786',
            description: 'Home Builder',
            status: 'open',
            updatedAt: 'Today at 2:24pm',
            key: 7
          }
        ]
      }
    ]
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
            showsUserLocation={true}
            style={{ flexShrink: 0, flexBasis: '40%' }}>
            {this.state.sections[0].data.map(marker => (
              <MapView.Marker
                key={marker.title}
                title={marker.title}
                description={marker.description}
                coordinate={marker.latlng}>
                <Marker status={marker.status} />
              </MapView.Marker>
            ))}
          </MapView>
          <MapLegend />
        </View>
        <PlaceList
          statusIcon={true}
          headerText="LOCATIONS"
          sections={this.state.sections}
          style={{ flexGrow: 1, flexBasis: '60%' }}
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
