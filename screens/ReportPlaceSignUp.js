// @flow

import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Button,
  Dimensions,
  InteractionManager,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { MapView } from 'expo';
import Marker from '../components/Marker';
import StyledTextInput from '../components/StyledTextInput';
import buildAddress from '../helpers/buildAddress';
const { width: WindowWidth, height: WindowHeight } = Dimensions.get('window');

import { OPEN, LIMITED, CLOSED } from '../constants/LocationStatus';

export default class ReportPlace extends React.Component {
  static navigationOptions = props => {
    return {
      headerLeft: <Button title="Cancel" onPress={() => props.navigation.goBack()} color="black" />,
      title: `Report • ${props.navigation.state.params.name}`
    };
  };

  render() {
    const { navigation: { state: { params } } } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.reportSignUpText}>To report a business, please create an account and/or sign in.</Text>
        <Touchable style={styles.button} onPress={() => this.props.navigation.navigate('Account')}>
          <Text style={styles.buttonText}>Create an Account</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0099ff',
    borderRadius: 4,
    marginBottom: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 13,
    paddingBottom: 12,
    paddingTop: 12,
    width: 170
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.3,
    textAlign: 'center'
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  },
  reportSignUpText: {
    color: 'rgb(143, 142, 148)',
    fontSize: 17,
    letterSpacing: -0.4,
    marginBottom: 16,
    textAlign: 'center',
    width: 300
  }
});
