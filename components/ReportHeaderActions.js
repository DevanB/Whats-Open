import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import HeaderIconButton from './HeaderIconButton';
const isSmallDevice = Dimensions.get('window').width < 375;

class HeaderActionsRight extends React.PureComponent {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Touchable
          hitSlop={{
            top: 15,
            bottom: 15,
            left: 10,
            right: 10
          }}
          background={Touchable.Ripple('#fff', true)}
          style={styles.button}
          onPress={() => navigate('ReportPlace', { ...this.props.navigation.state.params })}
        >
          <Text style={styles.inner}>Report</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginLeft: Platform.OS === 'ios' ? 12 : 17
  },
  container: {
    flex: 1,
    paddingHorizontal: isSmallDevice ? 5 : 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inner: {
    fontSize: 17
  }
});

export default {
  Right: HeaderActionsRight
};
