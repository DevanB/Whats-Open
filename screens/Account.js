// @flow

import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from 'react-native-platform-button';
import StyledTextInput from '../components/StyledTextInput';
import { setUser, withUser } from 'react-native-authentication-helpers';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
const { height: WindowHeight, width: WindowWidth } = Dimensions.get('window');

import AccountProfile from './AccountProfile';
import SignUp from './SignUp';
import SignIn from './SignIn';

function inSignUpState(navigationState) {
  return !!(navigationState.params && navigationState.params.signUp);
}

function inAccountDetails(navigationState) {
  return !!(navigationState.params && navigationState.params.accountDetails);
}

class AccountScreen extends React.Component {
  static navigationOptions = ({ navigation, user }) => {
    const { params } = navigation.state;
    return {
      headerLeft: <Button title="Cancel" onPress={() => navigation.goBack()} color="black" />,
      title: user ? 'Account' : inSignUpState(navigation.state) ? 'Sign Up' : 'Sign In'
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

    if (this.props.user) {
      return <AccountProfile />;
    }
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        {showSignUpForm ? (
          <SignUp
            name={this.state.name}
            email={this.state.email}
            password={this.state.password}
            onSubmit={this._confirm}
            navigation={this.props.navigation}
            showSignUpForm={showSignUpForm}
            showAccountDetails={showAccountDetails}
            setEmail={this._setEmail}
            setPassword={this._setPassword}
            setName={this._setName}
          />
        ) : (
          <SignIn
            email={this.state.email}
            password={this.state.password}
            onForgotPassword={() => console.log('forgot password')}
            onSubmit={this._confirm}
            navigation={this.props.navigation}
            showSignUpForm={showSignUpForm}
            showAccountDetails={showAccountDetails}
            setEmail={this._setEmail}
            setPassword={this._setPassword}
          />
        )}
      </ScrollView>
    );
  }

  _confirm = async () => {
    const signUp = inSignUpState(this.props.navigation.state);
    console.log(signUp);
    const { name, email, password } = this.state;
    if (!email || !password || (signUp && !name)) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      if (signUp) {
        const result = await this.props.createUserMutation({
          variables: {
            name,
            email,
            password
          }
        });
        const id = result.data.signinUser.user.id;
        const token = result.data.signinUser.token;
        this._saveUserData(id, token);
      } else {
        const result = await this.props.signinUserMutation({
          variables: {
            email,
            password
          }
        });
        const id = result.data.signinUser.user.id;
        const token = result.data.signinUser.token;
        this._saveUserData(id, token);
      }

      this.props.navigation.goBack();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  _saveUserData = (id, token) => {
    setUser({ id, token });
  };

  _setEmail = (email: string) => {
    this.setState({ email });
  };

  _setPassword = (password: string) => {
    this.setState({ password });
  };

  _setName = (name: string) => {
    this.setState({ name });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const CREATE_USER_MUTATION = gql`
  mutation CreatUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, authProvider: { email: { email: $email, password: $password } }) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

export default withUser(
  compose(
    graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
    graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
  )(AccountScreen)
);
