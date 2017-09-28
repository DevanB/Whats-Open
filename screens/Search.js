import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Constants } from 'expo';
import SearchLayout from 'react-navigation-addon-search-layout';

import Colors from '../constants/Colors';

export default class Search extends React.Component {
  static navigationOptions = props => {
    return {
      title: 'Search'
    };
  };

  state = {
    locations: [],
    searchText: '',
    loading: false
  };

  render() {
    return (
      <SearchLayout
        headerBackgroundColor="rgb(248,205,70)"
        headerTintColor="#000"
        onChangeQuery={this._handleQueryChange}
        searchInputSelectionColor="#000"
        searchInputTextColor={Platform.OS === 'android' ? '#000' : 'black'}
        searchInputPlaceholderTextColor={Platform.OS === 'ios' ? '#898989' : '#fafafa'}
      />
    );
  }

  _handleQueryChange = searchText => {
    this.setState({ searchText });
  };

  _executeSearch = async () => {
    const { searchText } = this.state;
    if (!searchText) {
      this.setState({ locations: [] });
      return;
    }

    try {
      this.setState({ loading: true });
    } finally {
      this.setState({ loading: false });
    }
  };
}
