// @flow

import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import HeaderIconButton from './HeaderIconButton';
const isSmallDevice = Dimensions.get('window').width < 375;

class HeaderActionsLeft extends React.PureComponent {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <TouchableWithoutFeedback onPress={() => navigate('Account')}>
        <View style={styles.container}>
          <Text>Sign In</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class HeaderActionsRight extends React.PureComponent {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <HeaderIconButton name="search" onPress={() => navigate('Search')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: isSmallDevice ? 5 : 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default {
  Left: HeaderActionsLeft,
  Right: HeaderActionsRight
};
