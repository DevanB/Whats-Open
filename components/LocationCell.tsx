import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Touchable from "react-native-platform-touchable";
import { CLOSED, LIMITED, OPEN, LocationStatus } from "../constants/locationStatus";
import buildAddress from "../helpers/buildAddress";

interface Item {
  location: string;
  name: string;
  user_defined: {
    status: LocationStatus;
  },
  updatedAt: string;
}

interface LocationCellProps {
  index: number;
  item: Item;
  navigateOnPress: any;
  reportScreen: any;
  statusIcon: string;
}

const LocationCell: React.SFC<LocationCellProps> = ({item, navigateOnPress, reportScreen, statusIcon}) => (
  <Touchable
    onPress={() =>
      navigateOnPress("PlaceDetails", {
        ...item,
        reportScreen: reportScreen
      })
    }
  >
    <View style={styles.container}>
      {statusIcon && (
        <View style={styles.statusIndicator}>
          <View
            style={[
              styles.status,
              item.user_defined &&
                item.user_defined.status === CLOSED &&
                styles.red,
              item.user_defined &&
                item.user_defined.status === LIMITED &&
                styles.yellow,
              item.user_defined &&
                item.user_defined.status === OPEN &&
                styles.green
            ]}
          />
        </View>
      )}
      <View style={styles.locationDetails}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.name}>
            {item.name}
          </Text>
          <Text style={styles.lastUpdatedDate}>
            {item.updatedAt}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text numberOfLines={1} style={styles.address}>
            {buildAddress(item.location)}
          </Text>
        </View>
      </View>
      <View style={styles.detailsIndicator}>
        <MaterialIcons name="chevron-right" size={20} color="gray" />
      </View>
    </View>
  </Touchable>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "rgba(250,250,250,0.8)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(178,178,178,0.5)",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 13,
    paddingLeft: 15,
    paddingRight: 8,
    paddingTop: 13
  },
  statusIndicator: {
    flexBasis: 15
  },
  status: {
    borderRadius: 5,
    height: 34,
    width: 5
  },
  green: {
    backgroundColor: "rgb(48,193,73)"
  },
  red: {
    backgroundColor: "rgb(254, 40, 81)"
  },
  yellow: {
    backgroundColor: "rgb(255, 205, 0)"
  },
  locationDetails: {
    flex: 1
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
  name: {
    flex: 1,
    fontSize: 17,
    letterSpacing: -0.4,
    marginBottom: 3
  },
  lastUpdatedDate: {
    alignSelf: "flex-end",
    color: "rgb(143,142,148)",
    fontSize: 11,
    letterSpacing: -0.2,
    top: -8
  },
  footer: {},
  address: {
    color: "rgb(143,142,148)",
    flex: 1,
    fontSize: 13,
    letterSpacing: -0.2
  },
  detailsIndicator: {},
  indicator: {}
});

export default LocationCell;
