import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class ReportPlace extends React.Component {
  static navigationOptions = props => {
    return {
      title: `Report • ${props.navigation.state.params.title}`
    };
  };
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Report Place Screen</Text>
        <Button onPress={() => goBack()} title="Go Back" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
