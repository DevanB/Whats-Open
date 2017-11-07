import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';
import buildAddress from '../helpers/buildAddress';

import { OPEN, CLOSED, LIMITED } from '../constants/LocationStatus';
import Colors from '../constants/Colors';

export default class LocationCell extends React.PureComponent {
  render() {
    return (
      <Touchable
        onPress={() =>
          this.props.navigateOnPress('PlaceDetails', { ...this.props.item, reportScreen: this.props.reportScreen })}>
        <View style={styles.container}>
          <View style={styles.statusIndicator}>
            {this.props.statusIcon && (
              <View
                style={[
                  styles.circle,
                  this.props.item.user_defined && this.props.item.user_defined.status === CLOSED && styles.red,
                  this.props.item.user_defined && this.props.item.user_defined.status === LIMITED && styles.yellow,
                  this.props.item.user_defined && this.props.item.user_defined.status === OPEN && styles.green
                ]}
              />
            )}
          </View>
          <View style={styles.locationDetails}>
            <View style={styles.header}>
              <Text numberOfLines={1} style={styles.name}>
                {this.props.item.name}
              </Text>
              <Text style={styles.lastUpdatedDate}>{this.props.item.updatedAt}</Text>
            </View>
            <View style={styles.footer}>
              <Text numberOfLines={1} style={styles.address}>
                {buildAddress(this.props.item.location)}
              </Text>
            </View>
          </View>
          <View style={styles.detailsIndicator}>
            <MaterialIcons name="chevron-right" size={20} color="lightgray" />
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(250,250,250,0.8)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(178,178,178,0.5)',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 11
  },
  statusIndicator: {
    flexBasis: 20
  },
  circle: {
    borderRadius: 50,
    height: 12,
    width: 12
  },
  green: {
    backgroundColor: 'rgb(48,193,73)'
  },
  red: {
    backgroundColor: 'rgb(254, 40, 81)'
  },
  yellow: {
    backgroundColor: 'rgb(255, 205, 0)'
  },
  locationDetails: {
    flex: 1
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between'
  },
  name: {
    flex: 1,
    fontSize: 17,
    letterSpacing: -0.4,
    marginBottom: 3
  },
  lastUpdatedDate: {
    alignSelf: 'flex-end',
    color: 'rgb(143,142,148)',
    fontSize: 11,
    letterSpacing: -0.2,
    top: -8
  },
  footer: {},
  address: {
    color: 'rgb(143,142,148)',
    flex: 1,
    fontSize: 13,
    letterSpacing: -0.2
  },
  detailsIndicator: {},
  indicator: {}
});
