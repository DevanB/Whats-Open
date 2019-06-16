// @flow

import gql from "graphql-tag";
import { graphql } from "react-apollo";

const PLACE_FRAGMENT = gql`
  fragment YelpFields on Business {
    business {
      id
      key: id
      name
      coordinates {
        latitude
        longitude
      }
      location {
        address1
        city
        state
        zip_code
      }
      hours {
        open {
          end
          start
          day
        }
      }
    }
  }
`;

const WHATS_OPEN_FRAGMENT = gql`
  fragment UserHours on Business {
    userHours {
      schedule {
        end
        start
        day
      }
      status
      updatedAt
    }
  }
`;

const SEARCH_QUERY = gql`
  query AllPlacesSearchQuery($searchText: String!, $userLocation: String!) {
    search(name: $searchText, location: $userLocation) {
      business {
        id
        key: id
        name
      }
    }
  }
`;

export default graphql(SEARCH_QUERY, {
  name: "placesQuery"
});
