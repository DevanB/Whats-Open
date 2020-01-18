import gql from "graphql-tag";
import React, { FC, useState } from "react";
import { compose, graphql } from "react-apollo";
import { Button, ScrollView, StyleSheet } from "react-native";
// TODO add declaration file
import { setUser, withUser } from "react-native-authentication-helpers";
import AccountProfile from "./AccountProfile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigation } from "react-navigation-hooks";

// TODO any
function inSignUpState(navigationState: any) {
  return !!(navigationState.params && navigationState.params.signUp);
}

// TODO any props
const AccountScreen: FC<any> = ({ 
  createUserMutation, 
  user, 
  signinUserMutation 
}) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ name, setName ] = useState("");
  const navigation = useNavigation();

  let showSignUpForm = inSignUpState(navigation.state);

  const _saveUserData = (id: string , token: string) => {
    setUser({ id, token });
  };

  const _setEmail = (email: string) => {
    setEmail(email);
  };

  const _setPassword = (password: string) => {
    setPassword(password);
  };

  const _setName = (name: string) => {
    setName(name);
  };

  const _confirm = async () => {
    const signUp = inSignUpState(navigation.state);
    if (!email || !password || (signUp && !name)) {
      //TODO translate
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (signUp) {
        const result = await createUserMutation({
          variables: {
            name,
            email,
            password
          }
        });
        const id = result.data.signinUser.user.id;
        const token = result.data.signinUser.token;
        _saveUserData(id, token);
      } else {
        const result = await signinUserMutation({
          variables: {
            email,
            password
          }
        });
        const id = result.data.signinUser.user.id;
        const token = result.data.signinUser.token;
        _saveUserData(id, token);
      }

      navigation.goBack();
    } catch (e) {
      alert(e.message);
    }
  };


  if (user) {
    return <AccountProfile />;
  }
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      {showSignUpForm ? (
        <SignUp
          name={name}
          email={email}
          password={password}
          onSubmit={_confirm}
          navigation={navigation}
          showSignUpForm={showSignUpForm}
          setEmail={_setEmail}
          setPassword={_setPassword}
          setName={_setName}
        />
      ) : (
        <SignIn
          email={email}
          password={password}
          //TODO handle
          onForgotPassword={() => console.log("forgot password")}
          onSubmit={_confirm}
          navigation={navigation}
          showSignUpForm={showSignUpForm}
          setEmail={_setEmail}
          setPassword={_setPassword}
        />
      )}
    </ScrollView>
  );

}

// TODO handle any
AccountScreen.navigationOptions = ({
  screenProps: { t }, 
  navigation, 
  user 
}: { 
  screenProps: { t: any }, 
  navigation: any,
  user: any 
}) => {
  return {
    headerLeft: (
      // TODO fix fontSize
      <Button
        title={t("cancel")}
        onPress={() => navigation.goBack()}
        color="black"
      />
    ),
    title: user
      ? t("account")
      : inSignUpState(navigation.state)
      ? t("create-an-account")
      : t("sign-in")
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const CREATE_USER_MUTATION = gql`
  mutation CreatUserMutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      name: $name
      authProvider: { email: { email: $email, password: $password } }
    ) {
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
    graphql(CREATE_USER_MUTATION, { name: "createUserMutation" }),
    graphql(SIGNIN_USER_MUTATION, { name: "signinUserMutation" })
  )(AccountScreen)
);
