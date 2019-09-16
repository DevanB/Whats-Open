import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TextFieldHolder from "./TextFieldHolder";
import FloatingLabel from "./FloatingLabel";
import i18n from "../i18n";

const { t } = i18n;

interface FloatingLabelPicker {
  leftPadding: number;
  noBorder: boolean;
  placeholder: any;
  value: any;
}

const FloatingLabelPicker: React.FC<FloatingLabelPicker> = ({ leftPadding, noBorder, placeholder, value }) => {
  const [focused] = React.useState<boolean>(false)
  const [text, setText] = React.useState<string>("");
  const [status, setStatus] = React.useState<any>(undefined);

  React.useEffect(() => {
    setText(value);
  }, [value])

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={[styles.paddingView, { width: leftPadding || 0 }]} />
        <View style={[styles.fieldContainer, noBorder ? styles.withBorder : {}]}>
          <FloatingLabel visible={text}>
            <Text style={[styles.fieldLabel, focused ? styles.focused : {}]}>
              {text ? placeholder : null}
            </Text>
          </FloatingLabel>
          <TextFieldHolder withValue={text}>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue: any) => setStatus(itemValue)}
            >
              <Picker.Item label={t("normal")} value="normal" />
              <Picker.Item label={t("limited")} value="limited" />
              <Picker.Item label={t("closed")} value="closed" />
            </Picker>
          </TextFieldHolder>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 45,
    backgroundColor: "white",
    justifyContent: "center"
  },
  viewContainer: {
    flex: 1,
    flexDirection: "row"
  },
  paddingView: {
    width: 15
  },
  fieldLabel: {
    height: 15,
    fontSize: 10,
    color: "#B1B1B1"
  },
  fieldContainer: {
    flex: 1,
    justifyContent: "center",
    position: "relative"
  },
  withBorder: {
    borderBottomWidth: 1 / 2,
    borderColor: "#C8C7CC"
  },
  focused: {
    color: "#1482fe"
  }
});

export default FloatingLabelPicker;
