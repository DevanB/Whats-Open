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
        size: 33
      },
      search: {
        name: "ios-search",
        size: 25
      }
    },
    android: {
      person: {
        name: "md-person",
        size: 25
      },
      search: {
        name: "md-search",
        size: 25
      }
    }
  }),
  authenticate: {
    name: "md-key",
    size: 25
  },
  user: {
    name: "md-person",
    size: 25
  }
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginLeft: Platform.OS === "ios" ? 12 : 17
  }
});
