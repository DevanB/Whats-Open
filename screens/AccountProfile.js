// @flow

import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from 'react-native-platform-button';
import StyledTextInput from '../components/StyledTextInput';
import { clearUser } from 'react-native-authentication-helpers';
const { height: WindowHeight, width: WindowWidth } = Dimensions.get('window');

function inSignUpState(navigationState) {
  return !!(navigationState.params && navigationState.params.signUp);
}

function inAccountDetails(navigationState) {
  return !!(navigationState.params && navigationState.params.accountDetails);
}

export default class AccountScreen extends React.Component {
  static navigationOptions = props => {
    return {
      headerLeft: <Button title="Cancel" onPress={() => props.navigation.goBack()} color="black" />,
      title: 'Account'
    };
  };

  state = {
    email: '',
    password: '',
    name: ''
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <View>
          <Text style={styles.header}>My Account</Text>

          <StyledTextInput
            clearButtonMode="while-editing"
            onChangeText={name => this.setState({ name })}
            onSubmitEditing={() => this._emailInput.focus()}
            type="text"
            autoCaptialize="words"
            placeholder="Name"
            returnKeyType="next"
            value="Geauxtrude Suedemont"
          />
          <StyledTextInput
            clearButtonMode="while-editing"
            onChangeText={email => this.setState({ email })}
            onSubmitEditing={() => this._currentPasswordInput.focus()}
            ref={view => {
              this._emailInput = view;
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            type="text"
            placeholder="Email"
            value="geauxtrude@apple.com"
          />
          <StyledTextInput
            clearButtonMode="while-editing"
            onChangeText={password => this.setState({ password })}
            onSubmitEditing={() => this._newPasswordInput.focus()}
            ref={view => {
              this._currentPasswordInput = view;
            }}
            secureTextEntry={true}
            returnKeyType="next"
            type="text"
            placeholder="Current password"
            value={this.state.password}
          />
          <StyledTextInput
            clearButtonMode="while-editing"
            onChangeText={password => this.setState({ password })}
            onSubmitEditing={() => console.log('save')}
            ref={view => {
              this._newPasswordInput = view;
            }}
            secureTextEntry={true}
            type="text"
            returnKeyType="go"
            placeholder="New password"
            value={this.state.password}
            lastStyledTextInputInGroup={true}
          />
          <TouchableOpacity style={[styles.button, { marginTop: 16 }]} onPress={() => console.log('save')}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderTopWidth: 0, marginBottom: 12 }]}
            onPress={() => clearUser()}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderBottomColor: 'rgb(200, 199, 204)',
    borderTopColor: 'rgb(200, 199, 204)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 11,
    paddingTop: 11,
    width: WindowWidth
  },
  buttonText: {
    color: 'rgb(0, 118, 255)',
    fontSize: 17,
    letterSpacing: -0.4,
    textAlign: 'center'
  },
  container: {
    flex: 1
  },
  header: {
    color: 'rgb(3, 3, 3)',
    fontSize: 15,
    letterSpacing: -0.2,
    marginBottom: 3.5,
    marginLeft: 14.5,
    marginTop: 24.5
  }
});
