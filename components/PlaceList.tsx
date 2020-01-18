import React, { FC } from "react";
import { SectionList } from "react-native";
import LocationCell from "./LocationCell";
import SectionHeader from "./SectionHeader";

// TODO any
interface PlaceListProps {
  headerText: string;
  sections: any;
  statusIcon: boolean;
  style?: any;
}

const PlaceList: FC<PlaceListProps> = ({ 
  headerText, 
  sections, 
  statusIcon,
  style
}) => (
  <SectionList
    renderItem={({ item }) => (
      <LocationCell
        item={item}
        statusIcon={statusIcon}
      />
    )}
    renderSectionHeader={() => (
      <SectionHeader text={headerText} />
    )}
    sections={sections}
    style={style}
  />
);

export default PlaceList;
