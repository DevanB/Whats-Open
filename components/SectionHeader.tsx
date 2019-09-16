import React from "react";
import { StyleSheet, Text } from "react-native";

interface SectionHeaderProps {
  text: string;
}

const SectionHeader: React.SFC<SectionHeaderProps> = ({text}) => <Text style={styles.sectionHeader}>{text}</Text>;

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderBottomWidth: 2,
    borderColor: "red",
    color: "rgb(109,109,114)",
    fontSize: 11,
    letterSpacing: 0.3,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingTop: 8,
    shadowColor: "black",
    shadowOffset: { height: StyleSheet.hairlineWidth, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 0
  }
});

export default SectionHeader;
