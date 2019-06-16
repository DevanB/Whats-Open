import { graphql } from "react-apollo";

export default graphql(PLACES_QUERY, {
  name: "placesQuery"
});
