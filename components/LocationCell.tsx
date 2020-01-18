import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Touchable from "react-native-platform-touchable";
import { CLOSED, LIMITED, OPEN, LocationStatus } from "../constants/locationStatus";
import buildAddress from "../helpers/buildAddress";
import { useNavigation } from "react-navigation-hooks";

interface Item {
  location: string;
  name: string;
  user_defined: {
    status: LocationStatus;
  },
  updatedAt: string;
}

// TODO any
interface LocationCellProps {
  item: Item;
  statusIcon: boolean;
}

const LocationCell: React.FC<LocationCellProps> = ({
  item,
  statusIcon
}) => {
  const { navigate } = useNavigation()

  return (
    <Touchable
      onPress={() =>
        navigate("PlaceDetails", {
          ...item
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
          <View>
            <Text numberOfLines={1} style={styles.address}>
              {buildAddress(item.location)}
            </Text>
          </View>
        </View>
        <View>
          <MaterialIcons name="chevron-right" size={20} color="gray" />
        </View>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  address: {
    color: "rgb(143,142,148)",
    flex: 1,
    fontSize: 13,
    letterSpacing: -0.2
  },
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
  green: {
    backgroundColor: "rgb(48,193,73)"
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
  lastUpdatedDate: {
    alignSelf: "flex-end",
    color: "rgb(143,142,148)",
    fontSize: 11,
    letterSpacing: -0.2,
    top: -8
  },
  locationDetails: {
    flex: 1
  },
  name: {
    flex: 1,
    fontSize: 17,
    letterSpacing: -0.4,
    marginBottom: 3
  },
  red: {
    backgroundColor: "rgb(254, 40, 81)"
  },
  status: {
    borderRadius: 5,
    height: 34,
    width: 5
  },
  statusIndicator: {
    flexBasis: 15
  },
  yellow: {
    backgroundColor: "rgb(255, 205, 0)"
  }
});

export default LocationCell;
