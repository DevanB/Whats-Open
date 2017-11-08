// @flow

import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from 'react-native-platform-button';
import StyledTextInput from '../components/StyledTextInput';
const { height: WindowHeight, width: WindowWidth } = Dimensions.get('window');

import SignUp from './SignUp';

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
    let showAccountDetails = inAccountDetails(this.props.navigation.state);
    let showSignUpForm = inSignUpState(this.props.navigation.state);

    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        {showSignUpForm ? (
          <SignUp
            name={this.state.name}
            email={this.state.email}
            password={this.state.password}
            navigation={this.props.navigation}
            showSignUpForm={showSignUpForm}
            showAccountDetails={showAccountDetails}
            setEmail={this.setEmail}
            setPassword={this.setPassword}
            setName={this.setName}
          />
        ) : (
          <View>
            <Text>Yo</Text>
            <Button
              color="#777777"
              fontSize={15}
              onPress={() => this.props.navigation.setParams({ accountDetails: false, signUp: !showSignUpForm })}
              title={showSignUpForm ? 'Already have an account?' : 'Need to create an account?'}
            />
            <Button
              color="#777777"
              fontSize={15}
              onPress={() => this.props.navigation.setParams({ accountDetails: !showAccountDetails, signUp: false })}
              title={showAccountDetails ? 'Hide account details' : 'Show account details'}
            />
          </View>
        )}
      </ScrollView>
    );
  }

  setEmail = (email: string) => {
    this.setState({ email });
  };

  setPassword = (password: string) => {
    this.setState({ password });
  };

  setName = (name: string) => {
    this.setState({ name });
  };
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
