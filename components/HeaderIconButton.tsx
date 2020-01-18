import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import Touchable from "react-native-platform-touchable";

const IconNames: any = {
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

interface HeaderIconButtonProps {
  name: string;
  onPress: any;
}

const HeaderIconButton: React.FC<HeaderIconButtonProps> = ({ name, onPress }) => {
  let presetIconName = name;
  let presetIconSize = 25;

  let presetIcon = IconNames[name];
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
      onPress={onPress}
    >
        {/* TODO translate */}
      <Ionicons
        name={presetIconName}
        style={{ color: "#000" }}
        size={presetIconSize}
      />
    </Touchable>
  );
}


const styles = StyleSheet.create({
  button: {
    marginLeft: Platform.OS === "ios" ? 12 : 17,
    paddingHorizontal: 5,
    paddingVertical: 5
  }
});

export default HeaderIconButton;
