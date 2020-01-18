import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import Touchable from "react-native-platform-touchable";
import i18n from "../i18n";
import { useNavigation } from "react-navigation-hooks";

const isSmallDevice = Dimensions.get("window").width < 375;
const { t } = i18n;

// TODO handle any
const HeaderActionsRight: React.FC<any> = () => {
  const { state: { params }, navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Touchable
        hitSlop={{
          top: 15,
          bottom: 15,
          left: 10,
          right: 10
        }}
        background={Touchable.Ripple("#fff", true)}
        style={styles.button}
        onPress={() =>
          navigate("ReportPlace", { ...params })
        }
      >
        <Text style={styles.inner}>{t("report")}</Text>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: Platform.OS === "ios" ? 12 : 17
  },
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
  Right: HeaderActionsRight
};
