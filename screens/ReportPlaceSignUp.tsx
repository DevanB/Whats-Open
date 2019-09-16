import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Touchable from "react-native-platform-touchable";
import colors from "../constants/colors";
import i18n from "../i18n";
const { t } = i18n;

export default class ReportPlace extends React.Component {
  render() {
    const {
      navigation: {
        state: { params }
      }
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.reportSignUpText}>
          {t("report-create-account")}
        </Text>
        <Touchable
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Account")}
        >
          <Text style={styles.buttonText}>{t("create-an-account")}</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0099ff",
    borderRadius: 4,
    marginBottom: 40,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 13,
    paddingBottom: 12,
    paddingTop: 12,
    width: 170
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: -0.3,
    textAlign: "center"
  },
  container: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    justifyContent: "center"
  },
  reportSignUpText: {
    color: "rgb(143, 142, 148)",
    fontSize: 17,
    letterSpacing: -0.4,
    marginBottom: 16,
    textAlign: "center",
    width: 300
  }
});
