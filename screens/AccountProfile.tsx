import gql from "graphql-tag";
import React from "react";
import { graphql } from "react-apollo";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { clearUser, withUser } from "react-native-authentication-helpers";
import StyledTextInput from "../components/StyledTextInput";
import colors from "../constants/colors";
import i18n from "../i18n"

const { height: WindowHeight, width: WindowWidth } = Dimensions.get("window");
const { t } = i18n;

class AccountScreen extends React.Component {
  state = {
    email: "",
    password: "",
    name: ""
  };

  render() {
    if (this.props.data.loading) return <ActivityIndicator size="large" />;
    return (
      <View>
        <Text style={styles.header}>t("my-account")</Text>

        <StyledTextInput
          clearButtonMode="while-editing"
          onChangeText={name => this.setState({ name })}
          onSubmitEditing={() => this._emailInput.focus()}
          type="text"
          autoCaptialize="words"
          placeholder={t("name")}
          returnKeyType="next"
          value={this.props.data.User.name}
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
          placeholder={t("email")}
          value={this.props.data.User.email}
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
          placeholder={t("current-password")}
          value={this.state.password}
        />
        <StyledTextInput
          clearButtonMode="while-editing"
          onChangeText={password => this.setState({ password })}
          onSubmitEditing={() => console.log("save")}
          ref={view => {
            this._newPasswordInput = view;
          }}
          secureTextEntry={true}
          type="text"
          returnKeyType="go"
          placeholder={t("new-password")}
          value={this.state.password}
          lastStyledTextInputInGroup={true}
        />
        <TouchableOpacity
          style={[styles.button, { marginTop: 16 }]}
          onPress={() => console.log("save")}
        >
          <Text style={styles.buttonText}>{t("save")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { borderTopWidth: 0, marginBottom: 12 }]}
          onPress={() => clearUser()}
        >
          <Text style={styles.buttonText}>{t("sign-out")}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.black,
    borderBottomColor: colors.lightGray,
    borderTopColor: colors.lightGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 11,
    paddingTop: 11,
    width: WindowWidth
  },
  buttonText: {
    color: colors.blue,
    fontSize: 17,
    letterSpacing: -0.4,
    textAlign: "center"
  },
  header: {
    color: colors.black,
    fontSize: 15,
    letterSpacing: -0.2,
    marginBottom: 3.5,
    marginLeft: 14.5,
    marginTop: 24.5
  }
});

const USER_DETAILS_QUERY = gql`
  query UserQuery($userId: ID!) {
    User(id: $userId) {
      id
      name
      email
    }
  }
`;

export default withUser(
  graphql(USER_DETAILS_QUERY, {
    options: ({ user: { id } }) => {
      return {
        variables: {
          userId: id
        }
      };
    },
    skip: ownProps => !ownProps.user.id
  })(AccountScreen)
);
