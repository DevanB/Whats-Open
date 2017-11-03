import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { StyleSheet, View } from 'react-native';
import { AppLoading, Location, Permissions } from 'expo';
import { getUser, loadUserAsync } from 'react-native-authentication-helpers';
import RootStackNavigator from './navigation/RootStackNavigator';

const client = new ApolloClient({
  link: new HttpLink('https://5xxlqvm39.lp.gql.zone/graphql'),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  state = {
    appIsReady: false,
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={loadUserAsync}
          conError={console.warn}
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
