import React from "react";
import { Platform, StyleSheet, TextInput } from "react-native";

interface StyledTextInputProps {
  autoCapitalize: any;
  clearButtonMode: any;
  keyboardType: any;
  lastStyledTextInputInGroup?: any;
  onChangeText: any;
  onSubmitEditing: any;
  placeholder: any;
  returnKeyType: any;
  secureTextEntry?: boolean;
  style?: any;
  type: any;
  value: any;
}

const StyledTextInput: React.FC<StyledTextInputProps> = ({ lastStyledTextInputInGroup, style, ...props }) => {
  const focus = () => {
    this._input.focus();
  }

  return (
    <TextInput
      autoCorrect={false}
      ref={view => {
        this._input = view;
      }}
      selectionColor="rgb(248,205,70)"
      underlineColorAndroid="#888"
      placeholderTextColor="#bababa"
      {...props}
      style={[
        styles.input,
        lastStyledTextInputInGroup && styles.lastInGroup,
        style
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      ios: {
        padding: 15,
        backgroundColor: "#fff",
        color: "#333333",
        borderColor: "rgba(0, 0, 0, 0.25)",
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0
      },
      android: {
        color: "#333333",
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginHorizontal: 5
      }
    })
  },
  lastInGroup: {
    borderBottomWidth: Platform.OS === "ios" ? StyleSheet.hairlineWidth : 0,
    marginBottom: 10
  }
});

export default StyledTextInput;
