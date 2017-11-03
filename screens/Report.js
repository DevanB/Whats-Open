import React from 'react';
import { View } from 'react-native';
import { Location, Permissions } from 'expo';
import PlaceList from '../components/PlaceList';
import HeaderActions from '../components/HeaderActions';

import sections from '../constants/data';

export default class Report extends React.Component {
  static navigationOptions = props => {
    return {
      title: 'Report',
      headerRight: <HeaderActions.Right navigation={props.navigation} />
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
        <PlaceList
          statusIcon={false}
          headerText="NEARBY LOCATIONS"
          sections={this.state.sections}
          navigate={this.props.navigation.navigate}
          reportScreen={true}
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
