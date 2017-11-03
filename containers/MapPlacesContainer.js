import React from 'react';
import { graphql, gql } from 'react-apollo';

export default graphql(PLACES_QUERY, {
  name: 'placesQuery'
});
