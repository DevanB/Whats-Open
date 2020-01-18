import React from "react";
import { Platform } from "react-native";
// TODO types definition
import SearchLayout from "react-navigation-addon-search-layout";

// TODO: this screen needs refactoring

export const Search = () => {
  const [, setLocations ] = React.useState([]);
  const [ searchText, setSearchText ] = React.useState("");
  const [, setLoading ] = React.useState(false);

  // TODO: any
  const _handleQueryChange = (incomingSearchText: any) => {
    setSearchText(incomingSearchText);
  };

  const _executeSearch = async () => {
    if (!searchText) {
      setLocations([]);
      return;
    }

    try {
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    //TODO translate
    <SearchLayout
      headerBackgroundColor="rgb(248,205,70)"
      headerTintColor="#000"
      onChangeQuery={_handleQueryChange}
      searchInputSelectionColor="#000"
      searchInputTextColor={Platform.OS === "android" ? "#000" : "black"}
      searchInputPlaceholderTextColor={
        Platform.OS === "ios" ? "#898989" : "#fafafa"
      }
    />
  );
}

Search.navigationOptions = ({screenProps: { t }}: { screenProps: any }) => {
  return {
    title: t("search")
  };
};
