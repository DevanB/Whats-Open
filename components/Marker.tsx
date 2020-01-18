import React from "react";
import { StyleSheet, View } from "react-native";
import { CLOSED, LIMITED, OPEN } from "../constants/locationStatus";

// TODO any
interface MarkerProps {
  legend: any;
  status: any;
  style: any;
}

const Marker: React.FC<MarkerProps> = ({
  legend, 
  status, 
  style 
}) => (
  <View
    style={[
      styles.marker,
      legend && styles.legendMarker,
      status === CLOSED && styles.red,
      status === LIMITED && styles.yellow,
      status === OPEN && styles.green,
      { ...style }
    ]}
  />
);

const styles = StyleSheet.create({
  green: {
    backgroundColor: "rgb(48,193,73)",
    borderColor: "rgb(13, 138, 35)",
    borderWidth: 1
  },
  legendMarker: {
    height: 10,
    width: 10
  },
  marker: {
    borderRadius: 50,
    height: 15,
    width: 15
  },
  red: {
    backgroundColor: "rgb(254, 40, 81)",
    borderColor: "rgb(170, 0, 32)",
    borderWidth: 1
  },
  yellow: {
    backgroundColor: "rgb(255, 205, 0)",
    borderColor: "rgb(227, 168, 66)",
    borderWidth: 1
  }
});

export default Marker;
