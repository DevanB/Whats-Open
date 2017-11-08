// @flow

import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from 'react-native-platform-button';
import StyledTextInput from '../components/StyledTextInput';
const { height: WindowHeight, width: WindowWidth } = Dimensions.get('window');

const SignUpScreen = ({
  email,
  password,
  navigation,
  onForgotPassword,
  onSubmit,
  setEmail,
  setPassword,
  showAccountDetails,
  showSignUpForm
}: {
  email: string,
  password: string,
  navigation: any,
  onForgotPassword: any,
  onSubmit: any,
  setEmail: any,
  setPassword: any,
  showAccountDetails: boolean,
  showSignUpForm: boolean
}) => (
  <View>
    <Text style={styles.header}>Sign In</Text>
    <StyledTextInput
      onChangeText={email => setEmail(email)}
      onSubmitEditing={() => this._passwordInput.focus()}
      keyboardType="email-address"
      returnKeyType="next"
      type="text"
      placeholder="Email"
      value={email}
    />
    <StyledTextInput
      onChangeText={password => setPassword(password)}
      onSubmitEditing={() => onSubmit()}
      secureTextEntry={true}
      ref={view => {
        this._passwordInput = view;
      }}
      returnKeyType="go"
      type="text"
      placeholder={'Password'}
      value={password}
      lastStyledTextInputInGroup={true}
    />
    <TouchableOpacity style={[styles.button, { marginTop: 16 }]} onPress={() => onSubmit()}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, { borderTopWidth: 0, marginBottom: 12 }]}
      onPress={() => onForgotPassword()}
    >
      <Text style={styles.buttonText}>Forgot Password</Text>
    </TouchableOpacity>
    <Button
      color="#777777"
      fontSize={15}
      onPress={() => navigation.setParams({ accountDetails: false, signUp: !showSignUpForm })}
      title="Need to create an account?"
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
