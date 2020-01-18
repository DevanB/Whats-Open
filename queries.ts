// const PLACE_FRAGMENT = gql`
//   fragment YelpFields on Business {
//     business {
//       id
//       key: id
//       name
//       coordinates {
//         latitude
//         longitude
//       }
//       location {
//         address1
//         city
//         state
//         zip_code
//       }
//       hours {
//         open {
//           end
//           start
//           day
//         }
//       }
//     }
//   }
// `;

// const WHATS_OPEN_FRAGMENT = gql`
//   fragment UserHours on Business {
//     userHours {
//       schedule {
//         end
//         start
//         day
//       }
//       status
//       updatedAt
//     }
//   }
// `;

// const SEARCH_QUERY = gql`
//   query AllPlacesSearchQuery($searchText: String!, $userLocation: String!) {
//     search(name: $searchText, location: $userLocation) {
//       business {
//         id
//         key: id
//         name
//       }
//     }
//   }
// `;

// const CREATE_USER_MUTATION = gql`
//   mutation CreatUserMutation(
//     $name: String!
//     $email: String!
//     $password: String!
//   ) {
//     createUser(
//       name: $name
//       authProvider: { email: { email: $email, password: $password } }
//     ) {
//       id
//     }
//     signinUser(email: { email: $email, password: $password }) {
//       token
//       user {
//         id
//       }
//     }
//   }
// `;

// const SIGNIN_USER_MUTATION = gql`
//   mutation SigninUserMutation($email: String!, $password: String!) {
//     signinUser(email: { email: $email, password: $password }) {
//       token
//       user {
//         id
//       }
//     }
//   }
// `;

// const CREATE_PLACE_MUTATION = gql`
//   mutation CreatPlaceMutation($place: ID!, $status: String, $comment: String) {
//     createPlace(id: $place, status: $status) {
//       id
//     }
//   }
// `;

// const UPDATE_PLACE_MUTATION = gql`
//   mutation CreatPlaceMutation($place: ID!, $status: String, $comment: String) {
//     createPlace(id: $place, status: $status) {
//       id
//     }
//   }
// `;

// const USER_DETAILS_QUERY = gql`
//   query UserQuery($userId: ID!) {
//     User(id: $userId) {
//       id
//       name
//       email
//     }
//   }
// `;

