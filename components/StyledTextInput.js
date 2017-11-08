import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';

export default class StyledTextInput extends React.Component {
  render() {
    let { lastStyledTextInputInGroup, ...props } = this.props;

    return (
      <TextInput
        autoCorrect={false}
        ref={view => {
          this._input = view;
        }}
        selectionColor="rgb(248,205,70)"
        underlineColorAndroid="#888"
        placeholderTextColor="#bababa"
        {...props}
        style={[styles.input, lastStyledTextInputInGroup && styles.lastInGroup, this.props.style]}
      />
    );
  }

  focus() {
    this._input.focus();
  }
}

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      ios: {
        padding: 15,
        backgroundColor: '#fff',
        color: '#333333',
        borderColor: 'rgba(0, 0, 0, 0.25)',
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0
      },
      android: {
        color: '#333333',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginHorizontal: 5
      }
    })
  },
  lastInGroup: {
    borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
    marginBottom: 10
  }
});
