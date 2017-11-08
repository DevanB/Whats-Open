// @flow

import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from 'react-native-platform-button';
import StyledTextInput from '../components/StyledTextInput';
const { height: WindowHeight, width: WindowWidth } = Dimensions.get('window');

import SignUp from './SignUp';
import SignIn from './SignIn';

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
            onSubmit={() => console.log('submitted')}
            navigation={this.props.navigation}
            showSignUpForm={showSignUpForm}
            showAccountDetails={showAccountDetails}
            setEmail={this.setEmail}
            setPassword={this.setPassword}
            setName={this.setName}
          />
        ) : (
          <SignIn
            email={this.state.email}
            password={this.state.password}
            onForgotPassword={() => console.log('forgot password')}
            onSubmit={() => console.log('submitted')}
            navigation={this.props.navigation}
            showSignUpForm={showSignUpForm}
            showAccountDetails={showAccountDetails}
            setEmail={this.setEmail}
            setPassword={this.setPassword}
          />
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
  container: {
    flex: 1
  }
});
