import React from 'react';
import { StyleSheet, View } from 'react-native';

import { OPEN, LIMITED, CLOSED } from '../constants/LocationStatus';

export default class Marker extends React.PureComponent {
  render() {
    return (
      <View
        style={[
          styles.marker,
          this.props.legend && styles.legendMarker,
          this.props.status === CLOSED && styles.red,
          this.props.status == LIMITED && styles.yellow,
          this.props.status === OPEN && styles.green,
          { ...this.props.style }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  legendMarker: {
    height: 10,
    width: 10
  },
  marker: {
    borderRadius: 50,
    height: 15,
    width: 15
  },
  green: {
    backgroundColor: 'rgb(48,193,73)',
    borderColor: 'rgb(13, 138, 35)',
    borderWidth: 1
  },
  red: {
    backgroundColor: 'rgb(254, 40, 81)',
    borderColor: 'rgb(170, 0, 32)',
    borderWidth: 1
  },
  yellow: {
    backgroundColor: 'rgb(255, 205, 0)',
    borderColor: 'rgb(227, 168, 66)',
    borderWidth: 1
  }
});
