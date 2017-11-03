import React from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import Touchable from 'react-native-platform-touchable';
import Marker from '../components/Marker';
import HeaderActions from '../components/ReportHeaderActions';
import buildAddress from '../helpers/buildAddress';
const { height: WindowHeight } = Dimensions.get('window');

import { CLOSED, LIMITED, OPEN } from '../constants/LocationStatus';

export default class PlaceDetails extends React.Component {
  static navigationOptions = props => {
    return {
      title: props.navigation.state.params.name,
      headerRight: props.navigation.state.params.reportScreen && <HeaderActions.Right navigation={props.navigation} />
    };
  };

  state = {
    hours: [
      { day: 'Open Today', hours: '7:00 AM to 10:00 PM' },
      { day: 'Saturday', hours: '7:00 AM to 10:00 PM' },
      { day: 'Sunday', hours: '7:00 AM to 10:00 PM' },
      { day: 'Monday', hours: '7:00 AM to 10:00 PM' },
      { day: 'Tuesday', hours: '7:00 AM to 10:00 PM' },
      { day: 'Wednesday', hours: '7:00 AM to 10:00 PM' },
      { day: 'Thursday', hours: '7:00 AM to 10:00 PM' }
    ]
  };

  render() {
    const { navigation: { state: { params } } } = this.props;
    return (
      <ScrollView style={styles.container}>
        <MapView
          region={{
            ...params.coordinates,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsPointsOfInterest={false}
          showsTraffic={false}
          style={{ height: WindowHeight * 0.3 }}>
          <MapView.Marker
            title={params.name}
            description={buildAddress(params.location)}
            coordinate={params.coordinates}>
            <Marker status={params.user_defined.status} />
          </MapView.Marker>
        </MapView>
        <View style={styles.informationView}>
          <Text style={styles.headerName}>{params.name}</Text>
          <Text style={styles.addressText}>{buildAddress(params.location)}</Text>
          <Touchable
            style={[
              styles.button,
              params.user_defined.status === CLOSED && styles.red,
              params.user_defined.status === LIMITED && styles.yellow,
              params.user_defined.status === OPEN && styles.green
            ]}>
            <Text style={[styles.buttonText, params.user_defined.status === LIMITED && styles.blackText]}>
              {params.user_defined.status}
            </Text>
          </Touchable>
          <View
            style={{
              borderBottomColor: 'rgb(200, 199, 204)',
              borderBottomWidth: 1,
              marginBottom: 20
            }}
          />
          <View style={styles.hoursContainer}>
            <Text style={styles.hoursText}>HOURS</Text>
            {this.state.hours.map((hour, index) => (
              <View key={index} style={styles.hoursListing}>
                <Text style={styles.day}>
                  {hour.day}
                  {': '}
                </Text>
                <Text style={styles.hours}>{hour.hours}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              borderBottomColor: 'rgb(200, 199, 204)',
              borderBottomWidth: 1,
              marginBottom: 20
            }}
          />
          <View style={styles.recentCommentsContainer}>
            <Text style={styles.recentCommentsHeader}>RECENT COMMENTS</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  addressText: {
    color: 'rgb(143, 142, 148)',
    letterSpacing: -0.2,
    fontSize: 13
  },
  button: {
    borderRadius: 8,
    marginBottom: 25,
    marginTop: 13,
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%'
  },
  buttonText: {
    color: 'rgb(251, 251, 251)',
    fontSize: 13,
    letterSpacing: -0.3,
    textAlign: 'center'
  },
  day: {
    color: 'rgb(3, 3, 3)',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: -0.1,
    marginRight: 10
  },
  headerName: {
    color: 'rgb(3, 3, 3)',
    fontSize: 17,
    letterSpacing: -0.4,
    marginBottom: 3
  },
  hours: {
    color: 'rgb(109, 109, 114)',
    fontSize: 13,
    letterSpacing: -0.1
  },
  hoursContainer: {
    marginBottom: 18
  },
  hoursListing: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between'
  },
  hoursText: {
    color: 'rgb(109, 109, 114)',
    fontSize: 11,
    letterSpacing: 0.3,
    marginBottom: 7.5
  },
  informationView: {
    flexGrow: 1,
    flexBasis: '60%',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 17
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
  blackText: {
    color: 'black'
  },
  recentCommentsContainer: {
    marginBottom: 18
  },
  recentCommentsHeader: {
    color: 'rgb(109, 109, 114)',
    fontSize: 11,
    letterSpacing: 0.3,
    marginBottom: 7.5
  },
  container: {
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    flex: 1
  }
});
