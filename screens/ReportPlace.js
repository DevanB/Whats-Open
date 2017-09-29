import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class ReportPlace extends React.Component {
  static navigationOptions = props => {
    return {
      headerLeft: <Button title="Cancel" onPress={() => props.navigation.goBack()} color="black" />,
      headerRight: <Button title="Save" onPress={() => props.navigation.goBack()} color="black" />,
      title: `Report • ${props.navigation.state.params.title}`
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Report Place Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
