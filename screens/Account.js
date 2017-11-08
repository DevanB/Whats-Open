import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from 'react-native-platform-button';
import StyledTextInput from '../components/StyledTextInput';
const { height: WindowHeight, width: WindowWidth } = Dimensions.get('window');

function inSignUpState(navigationState) {
  return !!(navigationState.params && navigationState.params.signUp);
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
    let showSignUpForm = inSignUpState(this.props.navigation.state);

    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <View>
          <Text style={styles.header}>{showSignUpForm ? 'Create an Account' : 'Sign In'}</Text>
          {showSignUpForm && (
            <StyledTextInput
              onChangeText={name => this.setState({ name })}
              onSubmitEditing={() => this._emailInput.focus()}
              type="text"
              placeholder="Name"
              value={this.state.name}
            />
          )}
          <View>
            <StyledTextInput
              onChangeText={email => this.setState({ email })}
              onSubmitEditing={() => this._passwordInput.focus()}
              keyboardType="email-address"
              type="text"
              placeholder="Email"
              value={this.state.email}
            />
            <StyledTextInput
              onChangeText={password => this.setState({ password })}
              secureTextEntry={true}
              type="text"
              placeholder="Password"
              value={this.state.password}
              lastStyledTextInputInGroup={true}
            />
            {showSignUpForm ? (
              <TouchableOpacity style={[styles.button, { marginTop: 16, marginBottom: 12 }]}>
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity style={[styles.button, { marginTop: 16 }]}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { borderTopWidth: 0, marginBottom: 12 }]}>
                  <Text style={styles.buttonText}>Forgot Password</Text>
                </TouchableOpacity>
              </View>
            )}
            <Button
              color="#777777"
              fontSize={15}
              onPress={() => this.props.navigation.setParams({ signUp: !showSignUpForm })}
              title={showSignUpForm ? 'Already have an account?' : 'Need to create an account?'}
            />
          </View>
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
