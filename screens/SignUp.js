// @flow

import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from 'react-native-platform-button';
import StyledTextInput from '../components/StyledTextInput';
const { height: WindowHeight, width: WindowWidth } = Dimensions.get('window');

const SignUpScreen = ({
  name,
  email,
  password,
  navigation,
  setEmail,
  setName,
  setPassword,
  showAccountDetails,
  showSignUpForm
}: {
  name: string,
  email: string,
  password: string,
  navigation: any,
  setEmail: any,
  setName: any,
  setPassword: any,
  showAccountDetails: boolean,
  showSignUpForm: boolean
}) => (
  <View>
    <Text style={styles.header}>Create an Account</Text>
    <StyledTextInput
      onChangeText={name => setName(name)}
      onSubmitEditing={() => this._emailInput.focus()}
      returnKeyType="next"
      type="text"
      placeholder="Name"
      value={name}
    />
    <StyledTextInput
      onChangeText={email => setEmail(email)}
      onSubmitEditing={() => this._passwordInput.focus()}
      ref={view => {
        this._emailInput = view;
      }}
      keyboardType="email-address"
      returnKeyType="next"
      type="text"
      placeholder="Email"
      value={email}
    />
    <StyledTextInput
      onChangeText={password => setPassword(password)}
      secureTextEntry={true}
      ref={view => {
        this._passwordInput = view;
      }}
      returnKeyType="send"
      type="text"
      placeholder={'Password'}
      value={password}
      lastStyledTextInputInGroup={true}
    />
    <TouchableOpacity style={[styles.button, { marginTop: 16, marginBottom: 12 }]}>
      <Text style={styles.buttonText}>Create Account</Text>
    </TouchableOpacity>
    <Button
      color="#777777"
      fontSize={15}
      onPress={() => navigation.setParams({ accountDetails: false, signUp: !showSignUpForm })}
      title={'Already have an account?'}
    />
    <Button
      color="#777777"
      fontSize={15}
      onPress={() => navigation.setParams({ accountDetails: !showAccountDetails, signUp: false })}
      title={showAccountDetails ? 'Hide account details' : 'Show account details'}
    />
  </View>
);

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
  header: {
    color: 'rgb(3, 3, 3)',
    fontSize: 15,
    letterSpacing: -0.2,
    marginBottom: 3.5,
    marginLeft: 14.5,
    marginTop: 24.5
  }
});

export default SignUpScreen;
