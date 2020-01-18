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
import { useTranslation } from 'react-i18next';
import colors from "../constants/colors";
const { width: WindowWidth } = Dimensions.get("window");

interface SignUpScreenProps {
  email: string,
  password: string,
  navigation: any,
  onForgotPassword: any,
  onSubmit: any,
  setEmail: any,
  setPassword: any,
  showSignUpForm: boolean
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({
  email,
  password,
  navigation,
  onForgotPassword,
  onSubmit,
  setEmail,
  setPassword,
  showSignUpForm
}) => {
  const passwordInputRef = useRef<TextInput>(null);
  const { t } = useTranslation();

  return (
    <View>
      <Text style={styles.header}>{t("sign-in")}</Text>
      <StyledTextInput
        clearButtonMode="while-editing"
        onChangeText={(email: string) => setEmail(email)}
        onSubmitEditing={() => passwordInputRef && passwordInputRef.current && passwordInputRef.current.focus()}
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
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
        style={[styles.button, { marginTop: 16 }]}
        onPress={() => onSubmit()}
      >
        <Text style={styles.buttonText}>{t("sign-in")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { borderTopWidth: 0, marginBottom: 12 }]}
        onPress={() => onForgotPassword()}
      >
        <Text style={styles.buttonText}>{t("forgot-password")}</Text>
      </TouchableOpacity>
      {/* TODO: Fix button fontSize */}
      <Button
        color="#777777"
        onPress={() =>
          navigation.setParams({ accountDetails: false, signUp: !showSignUpForm })
        }
        title={t("create-account-question")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderBottomColor: colors.lightGray,
    borderTopColor: colors.lightGray,
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
