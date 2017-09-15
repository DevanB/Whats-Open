import React from 'react';
import { ScrollView, Text } from 'react-native';
import { MapView } from 'expo';

export default class MapScreen extends React.Component {
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 28.544397,
          longitude: -81.372749,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    );
  }
}
