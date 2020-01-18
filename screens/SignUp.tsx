import React, { useRef } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import StyledTextInput from "../components/StyledTextInput";
import i18n from "../i18n";
const { width: WindowWidth } = Dimensions.get("window");
const { t } = i18n;

const SignUpScreen = ({
  name,
  email,
  password,
  navigation,
  onSubmit,
  setEmail,
  setName,
  setPassword,
  showSignUpForm
}: {
  name: string,
  email: string,
  password: string,
  navigation: any,
  onSubmit: any,
  setEmail: any,
  setName: any,
  setPassword: any,
  showSignUpForm: boolean
}) => {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <View>
      <Text style={styles.header}>{t("create-an-account")}</Text>
      <StyledTextInput
        clearButtonMode="while-editing"
        autoCapitalize="words"
        onChangeText={(name: string) => setName(name)}
        onSubmitEditing={() => emailInputRef && emailInputRef.current && emailInputRef.current.focus()}
        returnKeyType="next"
        type="text"
        placeholder={t("name")}
        value={name}
      />
      <StyledTextInput
        clearButtonMode="while-editing"
        onChangeText={(email: string) => setEmail(email)}
        onSubmitEditing={() => passwordInputRef && passwordInputRef.current && passwordInputRef.current.focus()}
        ref={emailInputRef}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        type="text"
        placeholder={t("email")}
        value={email}
      />
      <StyledTextInput
        clearButtonMode="while-editing"
        onChangeText={(password: string) => setPassword(password)}
        onSubmitEditing={() => onSubmit()}
        secureTextEntry={true}
        ref={passwordInputRef}
        returnKeyType="go"
        type="text"
        placeholder={t("password")}
        value={password}
        lastStyledTextInputInGroup={true}
      />
      <TouchableOpacity
        style={[styles.button, { marginTop: 16, marginBottom: 12 }]}
        onPress={() => onSubmit()}
      >
        <Text style={styles.buttonText}>{t("create-account-button")}</Text>
      </TouchableOpacity>
      {/* TODO Fix Button fontSize */}
      <Button
        color="#777777"
        fontSize={15}
        onPress={() =>
          navigation.setParams({ accountDetails: false, signUp: !showSignUpForm })
        }
        // TODO translate
        title={"Already have an account?"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    borderBottomColor: "rgb(200, 199, 204)",
    borderTopColor: "rgb(200, 199, 204)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 11,
    paddingTop: 11,
    width: WindowWidth
  },
  buttonText: {
    color: "rgb(0, 118, 255)",
    fontSize: 17,
    letterSpacing: -0.4,
    textAlign: "center"
  },
  header: {
    color: "rgb(3, 3, 3)",
    fontSize: 15,
    letterSpacing: -0.2,
    marginBottom: 3.5,
    marginLeft: 14.5,
    marginTop: 24.5
  }
});

export default SignUpScreen;
