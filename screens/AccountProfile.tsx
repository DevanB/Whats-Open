import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import StyledTextInput from "../components/StyledTextInput";
import colors from "../constants/colors";
import { useTranslation } from 'react-i18next';

const { width: WindowWidth } = Dimensions.get("window");

// TODO
const AccountScreen: React.FC<any> = ({ data }) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ name, setName ] = useState("");
  const emailInputRef = useRef<TextInput>(null);
  const currentPasswordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const { t } = useTranslation();

  if (data.loading) return <ActivityIndicator size="large" />;

  return (
    <View>
      <Text style={styles.header}>t("my-account")</Text>
      <StyledTextInput
        clearButtonMode="while-editing"
        onChangeText={(name: string) => setName(name)}
        onSubmitEditing={() => emailInputRef && emailInputRef.current && emailInputRef.current.focus()}
        type="text"
        autoCapitalize="words"
        placeholder={t("name")}
        returnKeyType="next"
        value={data.User.name}
      />
      <StyledTextInput
        clearButtonMode="while-editing"
        onChangeText={(email: string) => setEmail(email)}
        onSubmitEditing={() => currentPasswordInputRef && currentPasswordInputRef.current && currentPasswordInputRef.current.focus()}
        ref={emailInputRef}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        type="text"
        placeholder={t("email")}
        value={data.User.email}
      />
      <StyledTextInput
        autoCapitalize="none"
        clearButtonMode="while-editing"
        onChangeText={(password: string) => setPassword(password)}
        onSubmitEditing={() => newPasswordInputRef && newPasswordInputRef.current && newPasswordInputRef.current.focus()}
        ref={currentPasswordInputRef}
        secureTextEntry={true}
        returnKeyType="next"
        type="text"
        placeholder={t("current-password")}
        value={password}
      />
      <StyledTextInput
        autoCapitalize="none"
        clearButtonMode="while-editing"
        onChangeText={(password: string) => setPassword(password)}
        onSubmitEditing={() => console.log("save")}
        ref={newPasswordInputRef}
        secureTextEntry={true}
        type="text"
        returnKeyType="go"
        placeholder={t("new-password")}
        value={password}
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
        onPress={() => {
          return null // clear user
        }}
      >
        <Text style={styles.buttonText}>{t("sign-out")}</Text>
      </TouchableOpacity>
    </View>
  );
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

// with user
export default AccountScreen;
