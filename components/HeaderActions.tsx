import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useNavigation } from 'react-navigation-hooks'
import HeaderIconButton from "./HeaderIconButton";
import { useTranslation } from 'react-i18next';

const isSmallDevice = Dimensions.get("window").width < 375;

// TODO any
const HeaderActionsLeft: React.FC<any> = ({ user }) => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  if (Platform.OS === "android") {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={() => navigate("Account")}>
      <View style={styles.container}>
        <Text style={styles.inner}>
          {user ? t("account") : t("sign-in")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const HeaderActionsRight = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <HeaderIconButton name="search" onPress={() => navigate("Search")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: isSmallDevice ? 5 : 10
  },
  inner: {
    fontSize: 21
  }
});

export default {
  Left: HeaderActionsLeft, //with user
  Right: HeaderActionsRight
};
