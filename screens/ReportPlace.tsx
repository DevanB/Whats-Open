import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Button,
  Dimensions,
  InteractionManager,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import MapView from "react-native-maps";
import Marker from "../components/Marker";
import { CLOSED, LIMITED, OPEN } from "../constants/locationStatus";
import buildAddress from "../helpers/buildAddress";
import { ReportPlace as ReportPlaceSignUpScreen } from "./ReportPlaceSignUp";
import colors from "../constants/colors";
import { useTranslation } from 'react-i18next';
import { useNavigation } from 'react-navigation-hooks'
const { width: WindowWidth, height: WindowHeight } = Dimensions.get("window");

const ReportPlace: React.FC<any> = ({ user }) => {
  const [comments, setComments] = useState<string>("");
  const [shouldRenderMap, setShouldRenderMap] = useState<boolean>(false);
  const [shouldRenderOverlay, setShouldRenderOverlay] = useState<boolean>(true);
  const [status] = useState<string>("Closed");
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [modalAnimatedValue] = useState<any>(new Animated.Value(0));
  const [regionSet, setRegionSet] = useState<boolean>(false);
  const [, setRegion] = useState<any>(null);
  const [, setItemValue] = useState<any>(null);
  const navigation = useNavigation();
  const { state: { params } } = navigation;
  const commentsInputRef = useRef<TextInput>(null);
  const { t } = useTranslation();

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

  const _handlePressDone = () => {
    Animated.timing(modalAnimatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start(() => {
      setModalIsVisible(false)
    });
  };

  const _handlePressNext = () => {
    commentsInputRef && commentsInputRef.current && commentsInputRef.current.focus()
  };

  const _handlePressOpen = () => {
    if (modalIsVisible) return;

    setModalIsVisible(true)
    Animated.timing(modalAnimatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

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
          setRegionSet(true)
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

  const _maybeRenderModal = () => {
    if (!modalIsVisible) return null;

    const translateY = modalAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0]
    });

    return (
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={modalIsVisible ? "auto" : "none"}
      >
        <TouchableWithoutFeedback onPress={_handlePressDone}>
          <Animated.View />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            transform: [{ translateY }]
          }}
        >
          <View style={styles.toolbar}>
            <Button title={t("next")} onPress={_handlePressNext} />
            <Button title={t("done")} onPress={_handlePressDone} />
          </View>
          <Picker
            style={{ width: WindowWidth, backgroundColor: "#e1e1e1" }}
            selectedValue={status}
            onValueChange={itemValue => setItemValue(itemValue)}
          >
            <Picker.Item label={t(OPEN)} value={OPEN} />
            <Picker.Item label={t(LIMITED)} value={LIMITED} />
            <Picker.Item label={t(CLOSED)} value={CLOSED} />
          </Picker>
        </Animated.View>
      </View>
    );
  };

  if (user) {
    return (
      <View style={styles.outer}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {_maybeRenderMap()}
          {_maybeRenderOverlay()}
          <View style={styles.informationView}>
            <Text numberOfLines={1} style={styles.headerName}>
              {params.name}
            </Text>
            <Text numberOfLines={1} style={styles.addressText}>
              {buildAddress(params.location)}
            </Text>
            <TouchableWithoutFeedback onPress={_handlePressOpen}>
              <View style={styles.statusView}>
                <Text
                  style={{
                    color: "rgb(3, 3, 3)",
                    fontSize: 19,
                    letterSpacing: -0.4,
                    paddingBottom: 15,
                    paddingTop: 15
                  }}
                >
                  t("status")
                </Text>
                <Text
                  style={{
                    color: "rgb(128, 127, 148)",
                    fontSize: 19,
                    letterSpacing: -0.4,
                    paddingBottom: 15,
                    paddingTop: 15,
                    position: "absolute",
                    right: 18
                  }}
                  onPress={_handlePressOpen}
                >
                  {t(status)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            {/* TODO */}
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(comment: string) => setComments(comment)}
              type="text"
              multiline={true}
              placeholder={t("comment")}
              placeholderTextColor="#bababa"
              ref={commentsInputRef}
              selectionColor="rgb(248,205,70)"
              underlineColorAndroid="#888"
              value={comments}
              style={[styles.input, { marginTop: 18 }]}
            />
          </View>
        </ScrollView>
        {_maybeRenderModal()}
      </View>
    );
  }

  return <ReportPlaceSignUpScreen />;
}

ReportPlace.navigationOptions = ({ screenProps: { t }, navigation, user }: { screenProps: any, navigation: any, user: any }) => {
  return {
    // TODO fix fontSize
    headerLeft: () =>
      <Button
        title={t("cancel")}
        onPress={() => navigation.goBack()}
        color="black"
      />,
    headerRight: () => user && (
      <Button
        title={t("save")}
        onPress={() => navigation.goBack()}
        color="black"
      />
    ),
    title: `${t("report")} • ${navigation.state.params.name}`
  };
};

const styles = StyleSheet.create({
  addressText: {
    color: "rgb(143, 142, 148)",
    fontSize: 13,
    letterSpacing: -0.2,
    paddingLeft: 18,
    paddingRight: 18
  },
  container: {
    backgroundColor: "rgba(250, 250, 250, 0.8)",
    display: "flex",
    flex: 1
  },
  contentContainer: {
    height: WindowHeight,
    justifyContent: "flex-end"
  },
  headerName: {
    color: "rgb(3, 3, 3)",
    fontSize: 17,
    letterSpacing: -0.4,
    marginBottom: 3,
    paddingLeft: 18,
    paddingRight: 18
  },
  informationView: {
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderTopWidth: StyleSheet.hairlineWidth,
    flexGrow: 1,
    flexBasis: WindowHeight * 0.7,
    paddingTop: 17
  },
  input: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderTopWidth: StyleSheet.hairlineWidth,
    color: "#333333",
    fontSize: 17,
    letterSpacing: -0.4,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15
  },
  map: {
    height: WindowHeight * 0.3
  },
  outer: {
    height: WindowHeight
  },
  statusView: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 18,
    paddingLeft: 18
  },
  toolbar: {
    backgroundColor: "#f1f1f1",
    display: "flex",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "space-between"
  }
});

// with user
export default ReportPlace;
