import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { withUser } from "react-native-authentication-helpers";
import HeaderIconButton from "./HeaderIconButton";
import i18n from "../i18n";

const { t } = i18n;
const isSmallDevice = Dimensions.get("window").width < 375;

class HeaderActionsLeft extends React.PureComponent {
  render() {
    const { navigate } = this.props.navigation;

    if (Platform.OS === "android") {
      return null;
    }

    return (
      <TouchableWithoutFeedback onPress={() => navigate("Account")}>
        <View style={styles.container}>
          <Text style={styles.inner}>
            {this.props.user ? t("account") : t("sign-in")}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class HeaderActionsRight extends React.PureComponent {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <HeaderIconButton name="search" onPress={() => navigate("Search")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: isSmallDevice ? 5 : 10,
    flexDirection: "row",
    alignItems: "center"
  },
  inner: {
    fontSize: 21
  }
});

export default {
  Left: withUser(HeaderActionsLeft),
  Right: HeaderActionsRight
};
