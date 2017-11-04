import React from 'react';
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
} from 'react-native';
import { MapView } from 'expo';
import Marker from '../components/Marker';
import StyledTextInput from '../components/StyledTextInput';
import buildAddress from '../helpers/buildAddress';
const { width: WindowWidth, height: WindowHeight } = Dimensions.get('window');

import { OPEN, LIMITED, CLOSED } from '../constants/LocationStatus';

export default class ReportPlace extends React.Component {
  static navigationOptions = props => {
    return {
      headerLeft: <Button title="Cancel" onPress={() => props.navigation.goBack()} color="black" />,
      headerRight: <Button title="Save" onPress={() => props.navigation.goBack()} color="black" />,
      title: `Report • ${props.navigation.state.params.name}`
    };
  };

  state = {
    comments: '',
    shouldRenderMap: false,
    shouldRenderOverlay: true,
    status: 'Closed',
    modalIsVisible: false,
    modalAnimatedValue: new Animated.Value(0)
  };

  componentDidMount() {
    this._isMounted = true;

    InteractionManager.runAfterInteractions(() => {
      this._isMounted && this.setState({ shouldRenderMap: true });
      setTimeout(() => {
        this._isMounted && this.setState({ shouldRenderOverlay: false });
      }, 500);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { navigation: { state: { params } } } = this.props;
    return (
      <View style={styles.outer}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {this._maybeRenderMap()}
          {this._maybeRenderOverlay()}
          <View style={styles.informationView}>
            <Text numberOfLines={1} style={styles.headerName}>
              {params.name}
            </Text>
            <Text numberOfLines={1} style={styles.addressText}>
              {buildAddress(params.location)}
            </Text>
            <TouchableWithoutFeedback onPress={() => this._handlePressOpen()}>
              <View style={styles.statusView}>
                <Text
                  style={{
                    color: 'rgb(3, 3, 3)',
                    fontSize: 19,
                    letterSpacing: -0.4,
                    paddingBottom: 15,
                    paddingTop: 15
                  }}>
                  Status
                </Text>
                <Text
                  style={{
                    color: 'rgb(128, 127, 148)',
                    fontSize: 19,
                    letterSpacing: -0.4,
                    paddingBottom: 15,
                    paddingTop: 15,
                    position: 'absolute',
                    right: 18
                  }}
                  onPress={() => this._handlePressOpen()}>
                  {this.state.status}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TextInput
              autoCorrect={false}
              onChangeText={comment => this.setState({ comment })}
              type="text"
              multiline={true}
              numberOfLines={4}
              placeholder="Comments"
              ref={view => {
                this._input = view;
              }}
              selectionColor="black"
              underlineColorAndroid="#888"
              value={this.state.comment}
              style={[styles.input, { marginTop: 18 }]}
            />
          </View>
        </ScrollView>
        {this._maybeRenderModal()}
      </View>
    );
  }

  _handlePressDone = () => {
    Animated.timing(this.state.modalAnimatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start(() => {
      this.setState({ modalIsVisible: false });
    });
  };

  _handlePressOpen = () => {
    if (this.state.modalIsVisible) {
      return;
    }

    this.setState({ modalIsVisible: true }, () => {
      Animated.timing(this.state.modalAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    });
  };

  _maybeRenderOverlay() {
    if (!this.state.shouldRenderOverlay) return;

    if (this.state.shouldRenderMap) {
      return (
        <ActivityIndicator
          size="large"
          style={[
            styles.map,
            {
              backgroundColor: '#f9f5ed',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }
          ]}
        />
      );
    } else {
      return <View style={[styles.map, { backgroundColor: '#f9f5ed' }]} />;
    }
  }

  _maybeRenderMap() {
    const { navigation: { state: { params } } } = this.props;

    if (!this.state.shouldRenderMap) return;

    return (
      <MapView
        region={{
          ...params.coordinates,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        cacheEnabled={true}
        showsPointsOfInterest={false}
        showsTraffic={false}
        style={styles.map}>
        <MapView.Marker title={params.name} description={buildAddress(params.location)} coordinate={params.coordinates}>
          <Marker status={params.user_defined.status} />
        </MapView.Marker>
      </MapView>
    );
  }

  _maybeRenderModal = () => {
    if (!this.state.modalIsVisible) {
      return null;
    }

    const { modalAnimatedValue } = this.state;
    const translateY = modalAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0]
    });

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents={this.state.modalIsVisible ? 'auto' : 'none'}>
        <TouchableWithoutFeedback onPress={this._handlePressDone}>
          <Animated.View />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: [{ translateY }]
          }}>
          <View style={styles.toolbar}>
            <Button title="Next" onPress={this._handlePressDone} />
            <Button title="Done" onPress={this._handlePressDone} />
          </View>
          <Picker
            style={{ width: WindowWidth, backgroundColor: '#e1e1e1' }}
            selectedValue={this.state.status}
            onValueChange={itemValue => this.setState({ status: itemValue })}>
            <Picker.Item label={OPEN} value={OPEN} />
            <Picker.Item label={LIMITED} value={LIMITED} />
            <Picker.Item label={CLOSED} value={CLOSED} />
          </Picker>
        </Animated.View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  addressText: {
    color: 'rgb(143, 142, 148)',
    flex: 1,
    fontSize: 13,
    letterSpacing: -0.2,
    paddingLeft: 18,
    paddingRight: 18
  },
  container: {
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    display: 'flex',
    flex: 1
  },
  contentContainer: {
    height: WindowHeight,
    justifyContent: 'flex-end'
  },
  headerName: {
    color: 'rgb(3, 3, 3)',
    flex: 1,
    fontSize: 17,
    letterSpacing: -0.4,
    marginBottom: 3,
    paddingLeft: 18,
    paddingRight: 18
  },
  informationView: {
    flexGrow: 1,
    flexBasis: WindowHeight * 0.7,
    paddingTop: 17
  },
  input: {
    backgroundColor: '#fff',
    color: 'rgb(143, 142, 148)',
    fontSize: 19,
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
    backgroundColor: 'white',
    marginTop: 18,
    paddingLeft: 18
  },
  toolbar: {
    backgroundColor: '#f1f1f1',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  }
});
