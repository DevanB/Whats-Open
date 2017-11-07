// @flow

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Location, Permissions } from 'expo';
import { getUser, loadUserAsync } from 'react-native-authentication-helpers';
import RootStackNavigator from './RootStackNavigator';

const client = new ApolloClient({
  link: new HttpLink('https://5xxlqvm39.lp.gql.zone/graphql'),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  state = {
    appIsReady: false,
    location: null,
    errorMessage: ''
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this._loadAppAsync}
          onError={console.warn}
          onFinish={() => this.setState({ appIsReady: true })}
        />
      );
    }
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <RootStackNavigator />
        </View>
      </ApolloProvider>
    );
  }

  async _loadAppAsync() {
    // require any images like icons in this below array like so:
    // require('./assets/images/whatever-icon.png
    const images = [];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  async _getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ errorMessage: 'Permission to access location was denied.' });
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });
    this.setState({ location });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
