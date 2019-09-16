import React from "react";
import { SectionList } from "react-native";
import LocationCell from "./LocationCell";
import SectionHeader from "./SectionHeader";

interface PlaceListProps {
  headerText: any;
  navigate: any;
  reportScreen: any;
  sections: any;
  statusIcon: any;
}

const PlaceList: React.SFC<PlaceListProps> = ({ headerText, navigate, reportScreen, sections, statusIcon }) => (
  <SectionList
    renderItem={({ item, index }) => (
      <LocationCell
        index={index}
        item={item}
        navigateOnPress={navigate}
        reportScreen={reportScreen}
        statusIcon={statusIcon}
      />
    )}
    renderSectionHeader={() => (
      <SectionHeader text={headerText} />
    )}
    sections={sections}
    style={{ flexGrow: 1, flexBasis: "60%" }}
  />
);

export default PlaceList;
