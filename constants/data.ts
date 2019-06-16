import { CLOSED, LIMITED, OPEN } from "./locationStatus";

const sections = [
  {
    data: [
      {
        id: 1,
        name: "Wawa",
        key: "Wawa",
        coordinates: { latitude: 28.551393, longitude: -81.5839652 },
        location: {
          address1: "13501 W Colonial Drive",
          city: "Winter Garden",
          state: "FL",
          zip_code: "34787"
        },
        description: "",
        user_defined: {
          status: OPEN,
          updatedAt: "Today at 1:09pm"
        }
      },
      {
        id: 2,
        name: "Walmart",
        key: "Walmart",
        coordinates: { latitude: 28.4761048, longitude: -81.6330373 },
        location: {
          address1: "16313 New Independence Pkwy",
          city: "Winter Garden",
          state: "FL",
          zip_code: "34787"
        },
        description: "",
        user_defined: {
          status: OPEN,
          updatedAt: "Today at 3:23pm"
        }
      },
      {
        id: 3,
        name: "Party City",
        key: "Party City",
        coordinates: { latitude: 28.5250509, longitude: -81.5815283 },
        location: {
          address1: "3089 Daniels Road",
          city: "Winter Garden",
          state: "FL",
          zip_code: "34787"
        },
        description: "",
        user_defined: {
          status: LIMITED,
          updatedAt: "Today at 7:39pm"
        }
      },
      {
        id: 4,
        name: "Yellow Dog Eats",
        key: "Yellow Dog Eats",
        coordinates: { latitude: 28.5275914, longitude: -81.5251728 },
        location: {
          address1: "1236 Hempel Avenue",
          city: "Windermere",
          state: "FL",
          zip_code: "34786"
        },
        description: "",
        user_defined: {
          status: CLOSED,
          updatedAt: "Yesterday at 11:57am"
        }
      },
      {
        id: 5,
        name: "Publix Super Market at Hamlin Cove",
        key: "Publix Super Market at Hamlin Cove",
        coordinates: { latitude: 28.4732197, longitude: -81.6289228 },
        location: {
          address1: "5400 Hamlin Groves Trail",
          city: "Winter Garden",
          state: "FL",
          zip_code: "34787"
        },
        description: "",
        user_defined: {
          status: LIMITED,
          updatedAt: "Yesterday at 6:48pm"
        }
      },
      {
        id: 6,
        name: "33 & Melt - A Grilled Cheese Bar in Orlando",
        key: "33 & Melt - A Grilled Cheese Bar in Orlando",
        coordinates: { latitude: 28.479, longitude: -81.591584 },
        location: {
          address1: "13790 Bridgewater Crossings Blvd #1000",
          city: "Windermere",
          state: "FL",
          zip_code: "34786"
        },
        description: "",
        user_defined: {
          status: CLOSED,
          updatedAt: "Today at 9:13am"
        }
      },
      {
        id: 7,
        name: "Casabella at Windermere",
        key: "Casabella at Windermere",
        coordinates: { latitude: 28.495216, longitude: -81.573352 },
        location: {
          address1: "4326 Isabella Cir",
          city: "Windermere",
          state: "FL",
          zip_code: "34786"
        },
        description: "",
        user_defined: {
          status: OPEN,
          updatedAt: "Today at 2:24pm"
        }
      },
      {
        id: "tadu-ethiopian-kitchen-san-francisco-3",
        key: "tadu-ethiopian-kitchen-san-francisco-3",
        name: "Tadu Ethiopian Kitchen",
        coordinates: {
          latitude: 37.7848298,
          longitude: -122.4142271
        },
        location: {
          address1: "484 Ellis St",
          city: "San Francisco",
          state: "CA",
          zip_code: "94102"
        },
        user_defined: {
          status: LIMITED,
          updatedAt: "Today at 2:24pm",
          comments: [
            {
              id: 1,
              createdAt: "Yesterday at 15:23",
              author: "Devan Beitel",
              comment: "Limited hours for the next few days"
            }
          ]
        },
        hours: [
          {
            open: [
              {
                end: "2100",
                start: "1130",
                day: 0
              },
              {
                end: "2100",
                start: "1130",
                day: 1
              },
              {
                end: "2100",
                start: "1130",
                day: 2
              },
              {
                end: "2100",
                start: "1130",
                day: 3
              },
              {
                end: "2100",
                start: "1130",
                day: 4
              },
              {
                end: "2100",
                start: "1130",
                day: 5
              },
              {
                end: "2100",
                start: "1130",
                day: 6
              }
            ]
          }
        ]
      },
      {
        id: "bowld-acai-san-francisco-2",
        key: "bowld-acai-san-francisco-2",
        name: "Bowl'D Acai",
        coordinates: {
          latitude: 37.782619,
          longitude: -122.407949
        },
        location: {
          address1: "14 Mint Plz",
          city: "San Francisco",
          state: "CA",
          zip_code: "94103"
        },
        user_defined: {
          status: OPEN,
          updatedAt: "Today at 1:09pm"
        },
        hours: [
          {
            open: [
              {
                end: "1430",
                start: "0800",
                day: 0
              },
              {
                end: "1430",
                start: "0800",
                day: 1
              },
              {
                end: "1430",
                start: "0800",
                day: 2
              },
              {
                end: "1430",
                start: "0800",
                day: 3
              },
              {
                end: "1430",
                start: "0800",
                day: 4
              },
              {
                end: "1500",
                start: "0900",
                day: 5
              }
            ]
          }
        ]
      },
      {
        id: "mariannes-san-francisco",
        key: "mariannes-san-francisco",
        name: "Marianne's",
        coordinates: {
          latitude: 37.7833456546068,
          longitude: -122.406836226583
        },
        location: {
          address1: "360 Jessie St",
          city: "San Francisco",
          state: "CA",
          zip_code: "94103"
        },
        user_defined: {
          status: CLOSED,
          updatedAt: "Today at 1:09pm"
        },
        hours: [
          {
            open: [
              {
                end: "0130",
                start: "1730",
                day: 3
              },
              {
                end: "0130",
                start: "1730",
                day: 4
              },
              {
                end: "0130",
                start: "1730",
                day: 5
              }
            ]
          }
        ]
      },
      {
        id: "un-cafecito-san-francisco",
        key: "un-cafecito-san-francisco",
        name: "Un Cafecito",
        coordinates: {
          latitude: 37.784424,
          longitude: -122.412989
        },
        location: {
          address1: "335 Jones St",
          city: "San Francisco",
          state: "CA",
          zip_code: "94102"
        },
        user_defined: {
          status: CLOSED,
          updatedAt: "Today at 1:09pm"
        },
        hours: [
          {
            open: [
              {
                end: "1700",
                start: "0600",
                day: 0
              },
              {
                end: "1700",
                start: "0600",
                day: 1
              },
              {
                end: "1700",
                start: "0600",
                day: 2
              },
              {
                end: "1700",
                start: "0600",
                day: 3
              },
              {
                end: "1700",
                start: "0600",
                day: 4
              },
              {
                end: "1300",
                start: "0700",
                day: 5
              }
            ]
          }
        ]
      },
      {
        id: "fresh-brew-coffee-san-francisco",
        key: "fresh-brew-coffee-san-francisco",
        name: "Fresh Brew Coffee",
        coordinates: {
          latitude: 37.79001,
          longitude: -122.41177
        },
        location: {
          address1: "882 Bush St",
          city: "San Francisco",
          state: "CA",
          zip_code: "94108"
        },
        user_defined: {
          status: LIMITED,
          updatedAt: "Today at 1:09pm"
        },
        hours: [
          {
            open: [
              {
                end: "1700",
                start: "0700",
                day: 0
              },
              {
                end: "1700",
                start: "0700",
                day: 1
              },
              {
                end: "1700",
                start: "0700",
                day: 3
              },
              {
                end: "1700",
                start: "0700",
                day: 4
              },
              {
                end: "1700",
                start: "0800",
                day: 5
              },
              {
                end: "1700",
                start: "0800",
                day: 6
              }
            ]
          }
        ]
      },
      {
        id: "hookers-sweet-treats-san-francisco",
        key: "hookers-sweet-treats-san-francisco",
        name: "Hooker's Sweet Treats",
        coordinates: {
          latitude: 37.7852285,
          longitude: -122.4160527
        },
        location: {
          address1: "442 Hyde St",
          city: "San Francisco",
          state: "CA",
          zip_code: "94109"
        },
        user_defined: {
          status: OPEN,
          updatedAt: "Today at 1:09pm"
        },
        hours: [
          {
            open: [
              {
                end: "1500",
                start: "0800",
                day: 1
              },
              {
                end: "1500",
                start: "0800",
                day: 2
              },
              {
                end: "1500",
                start: "0800",
                day: 3
              },
              {
                end: "1400",
                start: "0800",
                day: 4
              },
              {
                end: "1400",
                start: "1000",
                day: 5
              }
            ]
          }
        ]
      },
      {
        id: "waystone-san-francisco-2",
        key: "waystone-san-francisco-2",
        name: "Waystone",
        coordinates: {
          latitude: 37.7824109615308,
          longitude: -122.410308346152
        },
        location: {
          address1: "992 Market St",
          city: "San Francisco",
          state: "CA",
          zip_code: "94102"
        },
        user_defined: {
          status: OPEN,
          updatedAt: "Today at 1:09pm"
        },
        hours: [
          {
            open: [
              {
                end: "2100",
                start: "1130",
                day: 0
              },
              {
                end: "2200",
                start: "1130",
                day: 1
              },
              {
                end: "2200",
                start: "1130",
                day: 2
              },
              {
                end: "2200",
                start: "1130",
                day: 3
              },
              {
                end: "2200",
                start: "1130",
                day: 4
              },
              {
                end: "2000",
                start: "1200",
                day: 5
              },
              {
                end: "2000",
                start: "1200",
                day: 6
              }
            ]
          }
        ]
      }
    ]
  }
];

export default sections;
