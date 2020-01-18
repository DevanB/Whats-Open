import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  InteractionManager,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import MapView from "react-native-maps";
import Touchable from "react-native-platform-touchable";
import Marker from "../components/Marker";
import HeaderActions from "../components/ReportHeaderActions";
import { CLOSED, LIMITED, OPEN } from "../constants/locationStatus";
import buildAddress from "../helpers/buildAddress";
import colors from "../constants/colors";
import i18n from "../i18n";
import { useNavigation } from 'react-navigation-hooks'
const { height: WindowHeight } = Dimensions.get("window");
const { t } = i18n;

const PlaceDetails: React.FC<any> = () => {
    //TODO translate
  const [hours] = useState<any[]>([
      { day: "Open Today", hours: "7:00 AM to 10:00 PM" },
      { day: "Saturday", hours: "7:00 AM to 10:00 PM" },
      { day: "Sunday", hours: "7:00 AM to 10:00 PM" },
      { day: "Monday", hours: "7:00 AM to 10:00 PM" },
      { day: "Tuesday", hours: "7:00 AM to 10:00 PM" },
      { day: "Wednesday", hours: "7:00 AM to 10:00 PM" },
      { day: "Thursday", hours: "7:00 AM to 10:00 PM" }
    ]);
  const [shouldRenderMap, setShouldRenderMap] = useState<boolean>(false);
  const [shouldRenderOverlay, setShouldRenderOverlay] = useState<boolean>(false);
  const [, setRegion] = useState<any>(null);
  const [regionSet, setRegionSet] = useState<boolean>(false);
  const navigation = useNavigation();
  const { state: { params } } = navigation;

  useEffect(() => {
    let _isMounted = true;

    InteractionManager.runAfterInteractions(() => {
      _isMounted && setShouldRenderMap(true);
      setTimeout(() => {
        _isMounted && setShouldRenderOverlay(false);
      }, 500);
    });

    return () => {
      _isMounted = false;
    }
  }, [])

  const _maybeRenderOverlay = () => {
    if (!shouldRenderOverlay) return;

    if (shouldRenderMap) {
      return (
        <ActivityIndicator
          size="large"
          style={[
            styles.map,
            {
              backgroundColor: "#f9f5ed",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0
            }
          ]}
        />
      );
    } else {
      return <View style={[styles.map, { backgroundColor: "#f9f5ed" }]} />;
    }
  }

  const _maybeRenderMap = () => {
    if (!shouldRenderMap) return;

    return (
      <MapView
        region={{
          ...params.coordinates,
          latitudeDelta: 0.0119,
          longitudeDelta: 0.0119
        }}
        cacheEnabled={true}
        onRegionChangeComplete={region => {
          if (regionSet) setRegion(region);
        }}
        onMapReady={() => {
          setRegionSet(true);
        }}
        showsPointsOfInterest={false}
        showsTraffic={false}
        style={styles.map}
      >
        <MapView.Marker
          title={params.name}
          description={buildAddress(params.location)}
          coordinate={params.coordinates}
        >
          <Marker status={params.user_defined.status} />
        </MapView.Marker>
      </MapView>
    );
  }

  const _openDirections = () => {
    const { location } = params;
    let daddr = encodeURIComponent(buildAddress(location));
    Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
  }

  return (
    <ScrollView style={styles.container}>
      {_maybeRenderMap()}
      {_maybeRenderOverlay()}
      <View style={styles.informationHeader}>
        <Text style={styles.headerName}>{params.name}</Text>
        <Text style={styles.addressText}>
          {buildAddress(params.location)}
        </Text>
        <Touchable
          style={[
            styles.button,
            params.user_defined.status === CLOSED && styles.red,
            params.user_defined.status === LIMITED && styles.yellow,
            params.user_defined.status === OPEN && styles.green
          ]}
          onPress={_openDirections}
        >
          <Text
            style={[
              styles.buttonText,
              params.user_defined.status === LIMITED && styles.blackText
            ]}
          >
            {t(params.user_defined.status)}
          </Text>
        </Touchable>
      </View>
      <View style={styles.informationView}>
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursText}>{t("hours").toUpperCase()}</Text>
          {hours.map((hour, index) => (
            <View key={index} style={styles.hoursListing}>
              <Text style={styles.day}>
                {/* TODO translate */}
                {t(hour.day)}
                {": "}
              </Text>
              <Text style={styles.hours}>{hour.hours}</Text>
            </View>
          ))}
        </View>
        <View
          style={{
            borderBottomColor: "rgba(0, 0, 0, 0.15)",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 20
          }}
        />
        <View style={styles.recentCommentsContainer}>
          <Text style={styles.recentCommentsHeader}>{t("recent-comments").toUpperCase()}</Text>
          {/* <Text style={styles.recentCommentsEmpty}>Looks like no one has commented on this location. Have you visited here in the past 24 hours?</Text>
          <Touchable
            style={styles.recentCommentButton}
            onPress={() => navigate('ReportPlace', { ...this.props.navigation.state.params })}
          >
            <Text style={styles.recentCommentButtonText}>Leave a comment</Text>
          </Touchable> */}
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </View>
      </View>
    </ScrollView>
  );
}

PlaceDetails.navigationOptions = (props: any) => {
  return {
    title: props.navigation.state.params.name,
    headerRight: <HeaderActions.Right />
  };
};

export default PlaceDetails

const Comment: React.FC = () => (
  <View style={styles.comment}>
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <View style={styles.commentInitialsContainer}>
          <Text style={styles.commentInitials}>GS</Text>
        </View>
        <View>
          <Text style={styles.commentName}>Geauxtrude Suedemont</Text>
          <Text style={styles.commentMeta}>July 25, 2017</Text>
        </View>
      </View>
      <Text style={styles.commentText}>
        Maecenas sed diam eget risus varius blandit sit amet non magna.
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
        eget risus varius blandit sit amet non magna. Morbi leo risus, porta
        ac consectetur ac, vestibulum at eros. Duis mollis, est non commodo
        luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
        Cras mattis consectetur purus sit amet fermentum.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  addressText: {
    color: colors.gray,
    letterSpacing: -0.2,
    fontSize: 13
  },
  blackText: {
    color: colors.black
  },
  button: {
    borderRadius: 4,
    marginBottom: 25,
    marginTop: 13,
    paddingBottom: 12,
    paddingTop: 12,
    width: "100%"
  },
  buttonText: {
    color: colors.offWhite,
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: -0.3,
    textAlign: "center"
  },
  comment: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 10,
    marginTop: 10
  },
  commentContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexShrink: 1,
    paddingBottom: 16,
    paddingLeft: 18,
    paddingTop: 16
  },
  commentHeader: {
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 14,
    paddingBottom: 14
  },
  commentInitialsContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 40,
    display: "flex",
    flexShrink: 0,
    height: 40,
    justifyContent: "center",
    marginLeft: -2,
    marginRight: 12,
    width: 40
  },
  commentInitials: {
    color: "#777777",
    fontSize: 17
  },
  commentMeta: {
    color: "#888888",
    fontSize: 13
  },
  commentName: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3
  },
  commentText: {
    color: "#777777",
    fontSize: 15,
    lineHeight: 20,
    paddingRight: 18
  },
  container: {
    backgroundColor: "rgba(250, 250, 250, 0.8)",
    flex: 1
  },
  day: {
    color: "rgb(3, 3, 3)",
    flexBasis: 105,
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: -0.1,
    marginRight: 10
  },
  green: {
    backgroundColor: "rgb(48,193,73)"
  },
  headerName: {
    color: "rgb(3, 3, 3)",
    fontSize: 17,
    letterSpacing: -0.4,
    marginBottom: 3
  },
  hours: {
    color: "rgb(109, 109, 114)",
    fontSize: 13,
    letterSpacing: -0.1
  },
  hoursContainer: {
    marginBottom: 18
  },
  hoursListing: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    marginBottom: 3
  },
  hoursText: {
    color: "rgb(109, 109, 114)",
    fontSize: 11,
    letterSpacing: 0.3,
    marginBottom: 7.5
  },
  informationHeader: {
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 18
    // shadowColor: 'black',
    // shadowOffset: {height: StyleSheet.hairlineWidth, width: 0},
    // shadowOpacity: 0.2,
    // shadowRadius: 0
  },
  informationView: {
    flexGrow: 1,
    flexBasis: "60%",
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 17
  },
  map: {
    height: WindowHeight * 0.3
  },
  recentCommentButton: {
    backgroundColor: "#0099ff",
    borderRadius: 4,
    marginBottom: 40,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 13,
    paddingBottom: 12,
    paddingTop: 12,
    width: 170
  },
  recentCommentButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: -0.3,
    textAlign: "center"
  },
  recentCommentsContainer: {
    marginBottom: 18
  },
  recentCommentsEmpty: {
    fontSize: 17,
    marginTop: 40,
    textAlign: "center"
  },
  recentCommentsHeader: {
    color: "rgb(109, 109, 114)",
    fontSize: 11,
    letterSpacing: 0.3,
    marginBottom: 7.5
  },
  red: {
    backgroundColor: "rgb(254, 40, 81)"
  },
  yellow: {
    backgroundColor: "rgb(255, 205, 0)"
  }
});
