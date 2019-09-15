import * as Icon from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import Touchable from "react-native-platform-touchable";

export default class HeaderIconButton extends React.PureComponent {
  render() {
    let presetIconName = this.props.name;
    let presetIconSize = 25;

    let presetIcon = IconNames[this.props.name];
    if (presetIcon) {
      presetIconName = presetIcon.name;
      presetIconSize = presetIcon.size;
    }

    return (
      <Touchable
        hitSlop={{
          top: 15,
          bottom: 15,
          left: 10,
          right: 10
        }}
        background={Touchable.Ripple("#fff", true)}
        style={styles.button}
        onPress={this.props.onPress}
      >
        <Icon.Ionicons
          name={presetIconName}
          style={{ color: "#000" }}
          size={presetIconSize}
        />
      </Touchable>
    );
  }
}

const IconNames = {
  ...Platform.select({
    ios: {
      person: {
        name: "ios-person-outline",
        size: 29
      },
      search: {
        name: "ios-search",
        size: 21
      }
    },
    android: {
      person: {
        name: "md-person",
        size: 21
      },
      search: {
        name: "md-search",
        size: 21
      }
    }
  }),
  authenticate: {
    name: "md-key",
    size: 21
  },
  user: {
    name: "md-person",
    size: 21
  }
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: Platform.OS === "ios" ? 12 : 17
  }
});
