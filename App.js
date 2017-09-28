import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Location, Permissions } from 'expo';
import RootStackNavigator from './navigation/RootStackNavigator';

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <RootStackNavigator />
      </View>
    );
  }

  async _getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ errorMessage: 'Permission to access location was denied.' });
    }

    let location = await Location.getCurrentPositionAsync();
    this.setState({ location });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
