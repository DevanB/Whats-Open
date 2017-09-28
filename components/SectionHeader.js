import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default class SectionHeader extends React.PureComponent {
  render() {
    return <Text style={styles.sectionHeader}>{this.props.text}</Text>;
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: 'rgba(250,250,250,0.8)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(178,178,178,0.5)',
    color: 'rgb(109,109,114)',
    letterSpacing: 0.3,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingTop: 8,
    fontSize: 11
  }
});
