import React from "react";
import { SectionList } from "react-native";
import LocationCell from "./LocationCell";
import SectionHeader from "./SectionHeader";

export default class PlaceList extends React.Component {
  render() {
    return (
      <SectionList
        renderItem={({ item, index }) => (
          <LocationCell
            statusIcon={this.props.statusIcon}
            item={item}
            index={index}
            navigateOnPress={this.props.navigate}
            reportScreen={this.props.reportScreen}
          />
        )}
        renderSectionHeader={({ section }) => (
          <SectionHeader text={this.props.headerText} />
        )}
        sections={this.props.sections}
        style={{ flexGrow: 1, flexBasis: "60%" }}
      />
    );
  }
}
