// Demo data for MongoDB aggregation pipeline practice
// 50 users, 100 books, 10 authors with varied data for complex queries

export const demoData = {
   users: [
      {

         "index": 0,
         "name": "Aurelia Gonzales",
         "isActive": false,
         "registered": "2015-02-11T04:22:39.000Z",
         "age": 20,
         "gender": "female",
         "eyeColor": "green",
         "favoriteFruit": "banana",
         "company": {
            "title": "YURTURE",
            "email": "aureliagonzales@yurture.com",
            "phone": "+1 (940) 501-3963",
            "location": {
               "country": "USA",
               "address": "694 Hewes Street"
            }
         },
         "tags": ["enim", "id", "velit", "ad", "consequat"]
      },
      {

         "index": 1,
         "name": "Kitty Snow",
         "isActive": false,
         "registered": "2018-01-23T04:46:15.000Z",
         "age": 38,
         "gender": "female",
         "eyeColor": "blue",
         "favoriteFruit": "apple",
         "company": {
            "title": "DIGITALUS",
            "email": "kittysnow@digitalus.com",
            "phone": "+1 (949) 568-3470",
            "location": {
               "country": "Italy",
               "address": "154 Arlington Avenue"
            }
         },
         "tags": ["ut", "voluptate", "consequat", "consequat"]
      },
      {

         "index": 2,
         "name": "Hays Wise",
         "isActive": false,
         "registered": "2015-02-23T10:22:15.000Z",
         "age": 24,
         "gender": "male",
         "eyeColor": "green",
         "favoriteFruit": "strawberry",
         "company": {
            "title": "EXIAND",
            "email": "hayswise@exiand.com",
            "phone": "+1 (801) 583-3393",
            "location": {
               "country": "France",
               "address": "795 Borinquen Pl"
            }
         },
         "tags": ["amet", "ad", "elit", "ipsum"]
      },
      {

         "index": 3,
         "name": "Karyn Rhodes",
         "isActive": true,
         "registered": "2014-03-11T03:02:33.000Z",
         "age": 39,
         "gender": "female",
         "eyeColor": "green",
         "favoriteFruit": "strawberry",
         "company": {
            "title": "RODEMCO",
            "email": "karynrhodes@rodemco.com",
            "phone": "+1 (801) 505-3760",
            "location": {
               "country": "USA",
               "address": "521 Seigel Street"
            }
         },
         "tags": ["cillum", "exercitation", "excepteur"]
      },
      {

         "index": 4,
         "name": "Alison Farmer",
         "isActive": false,
         "registered": "2018-01-22T10:05:45.000Z",
         "age": 33,
         "gender": "female",
         "eyeColor": "brown",
         "favoriteFruit": "banana",
         "company": {
            "title": "OTHERSIDE",
            "email": "alisonfarmer@otherside.com",
            "phone": "+1 (902) 572-3954",
            "location": {
               "country": "Italy",
               "address": "356 Newkirk Placez"
            }
         },
         "tags": ["deserunt", "et", "duis", "dolor"]
      },
      {

         "index": 5,
         "name": "Grace Larson",
         "isActive": true,
         "registered": "2014-04-20T11:37:23.000Z",
         "age": 20,
         "gender": "female",
         "eyeColor": "blue",
         "favoriteFruit": "apple",
         "company": {
            "title": "OVOLO",
            "email": "gracelarson@ovolo.com",
            "phone": "+1 (930) 510-3310",
            "location": {
               "country": "USA",
               "address": "932 Linden Street"
            }
         },
         "tags": ["fugiat", "minim"]
      },
      {

         "index": 6,
         "name": "Carmella Morse",
         "isActive": false,
         "registered": "2014-06-08T11:20:22.000Z",
         "age": 39,
         "gender": "female",
         "eyeColor": "green",
         "favoriteFruit": "apple",
         "company": {
            "title": "SHEPARD",
            "email": "carmellamorse@shepard.com",
            "phone": "+1 (829) 478-3744",
            "location": {
               "country": "Germany",
               "address": "379 Tabor Court"
            }
         },
         "tags": ["amet", "cillum"]
      },
      {

         "index": 7,
         "name": "Anastasia Blake",
         "isActive": true,
         "registered": "2016-07-01T02:32:46.000Z",
         "age": 40,
         "gender": "female",
         "eyeColor": "brown",
         "favoriteFruit": "strawberry",
         "company": {
            "title": "ZERBINA",
            "email": "anastasiablake@zerbina.com",
            "phone": "+1 (867) 563-3788",
            "location": {
               "country": "Italy",
               "address": "147 Montague Terrace"
            }
         },
         "tags": ["Lorem", "consequat", "ex", "pariatur", "labore"]
      },
      {

         "index": 8,
         "name": "Michael Johnson",
         "isActive": true,
         "registered": "2017-05-15T08:15:30.000Z",
         "age": 28,
         "gender": "male",
         "eyeColor": "brown",
         "favoriteFruit": "apple",
         "company": {
            "title": "TECHCORP",
            "email": "michael.johnson@techcorp.com",
            "phone": "+1 (555) 123-4567",
            "location": {
               "country": "USA",
               "address": "123 Tech Street"
            }
         },
         "tags": ["technology", "programming", "innovation"]
      },
      {

         "index": 9,
         "name": "Sarah Williams",
         "isActive": false,
         "registered": "2019-08-22T14:30:45.000Z",
         "age": 31,
         "gender": "female",
         "eyeColor": "green",
         "favoriteFruit": "strawberry",
         "company": {
            "title": "DESIGNCO",
            "email": "sarah.williams@designco.com",
            "phone": "+1 (555) 987-6543",
            "location": {
               "country": "Canada",
               "address": "456 Design Avenue"
            }
         },
         "tags": ["design", "creative", "art"]
      },
      {

         "index": 10,
         "name": "David Chen",
         "isActive": true,
         "registered": "2020-03-10T09:22:15.000Z",
         "age": 29,
         "gender": "male",
         "eyeColor": "brown",
         "favoriteFruit": "orange",
         "company": {
            "title": "INNOVATECH",
            "email": "david.chen@innovatech.com",
            "phone": "+1 (555) 234-5678",
            "location": {
               "country": "Singapore",
               "address": "789 Innovation Drive"
            }
         },
         "tags": ["innovation", "startup", "fintech"]
      },
      {

         "index": 11,
         "name": "Emma Rodriguez",
         "isActive": false,
         "registered": "2016-11-05T15:18:22.000Z",
         "age": 35,
         "gender": "female",
         "eyeColor": "hazel",
         "favoriteFruit": "grape",
         "company": {
            "title": "GLOBALSOFT",
            "email": "emma.rodriguez@globalsoft.com",
            "phone": "+1 (555) 345-6789",
            "location": {
               "country": "Spain",
               "address": "321 Global Plaza"
            }
         },
         "tags": ["software", "international", "consulting"]
      },
      {

         "index": 12,
         "name": "James Wilson",
         "isActive": true,
         "registered": "2015-07-20T12:45:30.000Z",
         "age": 42,
         "gender": "male",
         "eyeColor": "blue",
         "favoriteFruit": "mango",
         "company": {
            "title": "DATAFLOW",
            "email": "james.wilson@dataflow.com",
            "phone": "+1 (555) 456-7890",
            "location": {
               "country": "Australia",
               "address": "654 Data Street"
            }
         },
         "tags": ["data", "analytics", "ai"]
      },
      {

         "index": 13,
         "name": "Lisa Park",
         "isActive": false,
         "registered": "2018-09-14T07:30:45.000Z",
         "age": 26,
         "gender": "female",
         "eyeColor": "green",
         "favoriteFruit": "kiwi",
         "company": {
            "title": "CLOUDTECH",
            "email": "lisa.park@cloudtech.com",
            "phone": "+1 (555) 567-8901",
            "location": {
               "country": "South Korea",
               "address": "987 Cloud Avenue"
            }
         },
         "tags": ["cloud", "devops", "security"]
      },
      {

         "index": 14,
         "name": "Robert Martinez",
         "isActive": true,
         "registered": "2019-12-03T16:20:10.000Z",
         "age": 37,
         "gender": "male",
         "eyeColor": "brown",
         "favoriteFruit": "pineapple",
         "company": {
            "title": "MOBILITYX",
            "email": "robert.martinez@mobilityx.com",
            "phone": "+1 (555) 678-9012",
            "location": {
               "country": "Mexico",
               "address": "147 Mobility Lane"
            }
         },
         "tags": ["mobile", "automotive", "iot"]
      },
      {

         "index": 15,
         "name": "Amanda Foster",
         "isActive": false,
         "registered": "2017-04-18T11:15:55.000Z",
         "age": 32,
         "gender": "female",
         "eyeColor": "blue",
         "favoriteFruit": "peach",
         "company": {
            "title": "ECOTECH",
            "email": "amanda.foster@ecotech.com",
            "phone": "+1 (555) 789-0123",
            "location": {
               "country": "Norway",
               "address": "258 Green Valley"
            }
         },
         "tags": ["sustainability", "clean", "energy"]
      },
      {

         "index": 16,
         "name": "Kevin Lee",
         "isActive": true,
         "registered": "2020-01-25T08:40:20.000Z",
         "age": 25,
         "gender": "male",
         "eyeColor": "black",
         "favoriteFruit": "watermelon",
         "company": {
            "title": "GAMEDEV",
            "email": "kevin.lee@gamedev.com",
            "phone": "+1 (555) 890-1234",
            "location": {
               "country": "Japan",
               "address": "369 Gaming Street"
            }
         },
         "tags": ["gaming", "entertainment", "vr"]
      },
      {

         "index": 17,
         "name": "Nicole Thompson",
         "isActive": false,
         "registered": "2016-08-12T13:25:35.000Z",
         "age": 34,
         "gender": "female",
         "eyeColor": "gray",
         "favoriteFruit": "cherry",
         "company": {
            "title": "HEALTHTECH",
            "email": "nicole.thompson@healthtech.com",
            "phone": "+1 (555) 901-2345",
            "location": {
               "country": "Switzerland",
               "address": "741 Health Plaza"
            }
         },
         "tags": ["healthcare", "medical", "biotech"]
      },
      {

         "index": 18,
         "name": "Daniel Garcia",
         "isActive": true,
         "registered": "2021-06-07T10:50:45.000Z",
         "age": 27,
         "gender": "male",
         "eyeColor": "green",
         "favoriteFruit": "coconut",
         "company": {
            "title": "FINANCEAI",
            "email": "daniel.garcia@financeai.com",
            "phone": "+1 (555) 012-3456",
            "location": {
               "country": "Brazil",
               "address": "852 Finance Tower"
            }
         },
         "tags": ["finance", "blockchain", "trading"]
      },
      {

         "index": 19,
         "name": "Rachel Kim",
         "isActive": false,
         "registered": "2018-02-28T14:35:15.000Z",
         "age": 30,
         "gender": "female",
         "eyeColor": "brown",
         "favoriteFruit": "pomegranate",
         "company": {
            "title": "EDTECH",
            "email": "rachel.kim@edtech.com",
            "phone": "+1 (555) 123-4567",
            "location": {
               "country": "Canada",
               "address": "963 Education Boulevard"
            }
         },
         "tags": ["education", "learning", "online"]
      },
      {

         "index": 20,
         "name": "Christopher Brown",
         "isActive": true,
         "registered": "2019-10-15T09:12:30.000Z",
         "age": 41,
         "gender": "male",
         "eyeColor": "blue",
         "favoriteFruit": "lemon",
         "company": {
            "title": "RETAILTECH",
            "email": "christopher.brown@retailtech.com",
            "phone": "+1 (555) 234-5678",
            "location": {
               "country": "UK",
               "address": "174 Retail Row"
            }
         },
         "tags": ["retail", "ecommerce", "logistics"]
      },
      {

         "index": 21,
         "name": "Michelle Davis",
         "isActive": false,
         "registered": "2017-12-01T16:45:50.000Z",
         "age": 36,
         "gender": "female",
         "eyeColor": "hazel",
         "favoriteFruit": "lime",
         "company": {
            "title": "TRAVELTECH",
            "email": "michelle.davis@traveltech.com",
            "phone": "+1 (555) 345-6789",
            "location": {
               "country": "Thailand",
               "address": "285 Travel Lane"
            }
         },
         "tags": ["travel", "hospitality", "booking"]
      },
      {

         "index": 22,
         "name": "Brandon Taylor",
         "isActive": true,
         "registered": "2020-05-20T12:18:25.000Z",
         "age": 28,
         "gender": "male",
         "eyeColor": "brown",
         "favoriteFruit": "blueberry",
         "company": {
            "title": "SPORTTECH",
            "email": "brandon.taylor@sporttech.com",
            "phone": "+1 (555) 456-7890",
            "location": {
               "country": "USA",
               "address": "396 Sports Center"
            }
         },
         "tags": ["sports", "fitness", "wearables"]
      },
      {

         "index": 23,
         "name": "Jennifer Wilson",
         "isActive": false,
         "registered": "2016-09-08T07:55:40.000Z",
         "age": 33,
         "gender": "female",
         "eyeColor": "green",
         "favoriteFruit": "raspberry",
         "company": {
            "title": "FASHIONTECH",
            "email": "jennifer.wilson@fashiontech.com",
            "phone": "+1 (555) 567-8901",
            "location": {
               "country": "France",
               "address": "507 Fashion Street"
            }
         },
         "tags": ["fashion", "style", "ai"]
      },
      {

         "index": 24,
         "name": "Steven Anderson",
         "isActive": true,
         "registered": "2021-03-12T15:30:10.000Z",
         "age": 29,
         "gender": "male",
         "eyeColor": "blue",
         "favoriteFruit": "blackberry",
         "company": {
            "title": "ROBOTICS",
            "email": "steven.anderson@robotics.com",
            "phone": "+1 (555) 678-9012",
            "location": {
               "country": "Germany",
               "address": "618 Robotics Avenue"
            }
         },
         "tags": ["robotics", "automation", "manufacturing"]
      },
      {

         "index": 25,
         "name": "Ashley Moore",
         "isActive": false,
         "registered": "2018-07-25T11:42:20.000Z",
         "age": 31,
         "gender": "female",
         "eyeColor": "brown",
         "favoriteFruit": "papaya",
         "company": {
            "title": "BIOTECH",
            "email": "ashley.moore@biotech.com",
            "phone": "+1 (555) 789-0123",
            "location": {
               "country": "USA",
               "address": "729 Bio Lab Drive"
            }
         },
         "tags": ["biotech", "research", "pharmaceuticals"]
      },
      {

         "index": 26,
         "name": "Matthew Jackson",
         "isActive": true,
         "registered": "2019-04-03T08:20:35.000Z",
         "age": 38,
         "gender": "male",
         "eyeColor": "gray",
         "favoriteFruit": "dragon fruit",
         "company": {
            "title": "SPACETECH",
            "email": "matthew.jackson@spacetech.com",
            "phone": "+1 (555) 890-1234",
            "location": {
               "country": "USA",
               "address": "840 Space Center"
            }
         },
         "tags": ["aerospace", "satellites", "exploration"]
      },
      {

         "index": 27,
         "name": "Jessica White",
         "isActive": false,
         "registered": "2017-11-18T13:15:45.000Z",
         "age": 32,
         "gender": "female",
         "eyeColor": "blue",
         "favoriteFruit": "passion fruit",
         "company": {
            "title": "AGRITECH",
            "email": "jessica.white@agritech.com",
            "phone": "+1 (555) 901-2345",
            "location": {
               "country": "Netherlands",
               "address": "951 Agricultural Park"
            }
         },
         "tags": ["agriculture", "sustainability", "drones"]
      },
      {

         "index": 28,
         "name": "Ryan Harris",
         "isActive": true,
         "registered": "2020-08-14T10:05:55.000Z",
         "age": 26,
         "gender": "male",
         "eyeColor": "green",
         "favoriteFruit": "star fruit",
         "company": {
            "title": "NANOTECH",
            "email": "ryan.harris@nanotech.com",
            "phone": "+1 (555) 012-3456",
            "location": {
               "country": "Switzerland",
               "address": "162 Nano Valley"
            }
         },
         "tags": ["nanotechnology", "materials", "innovation"]
      },
      {

         "index": 29,
         "name": "Stephanie Clark",
         "isActive": false,
         "registered": "2016-05-30T17:25:40.000Z",
         "age": 35,
         "gender": "female",
         "eyeColor": "hazel",
         "favoriteFruit": "lychee",
         "company": {
            "title": "QUANTUM",
            "email": "stephanie.clark@quantum.com",
            "phone": "+1 (555) 123-4567",
            "location": {
               "country": "Canada",
               "address": "273 Quantum Street"
            }
         },
         "tags": ["quantum", "computing", "physics"]
      },
      {

         "index": 30,
         "name": "Jason Lewis",
         "isActive": true,
         "registered": "2021-01-07T14:40:15.000Z",
         "age": 30,
         "gender": "male",
         "eyeColor": "brown",
         "favoriteFruit": "guava",
         "company": {
            "title": "CYBERSEC",
            "email": "jason.lewis@cybersec.com",
            "phone": "+1 (555) 234-5678",
            "location": {
               "country": "Israel",
               "address": "384 Security Plaza"
            }
         },
         "tags": ["cybersecurity", "encryption", "privacy"]
      },
      {

         "index": 31,
         "name": "Lauren Robinson",
         "isActive": false,
         "registered": "2018-12-22T09:12:25.000Z",
         "age": 34,
         "gender": "female",
         "eyeColor": "blue",
         "favoriteFruit": "rambutan",
         "company": {
            "title": "CLEANTECH",
            "email": "lauren.robinson@cleantech.com",
            "phone": "+1 (555) 345-6789",
            "location": {
               "country": "Denmark",
               "address": "495 Clean Energy Way"
            }
         },
         "tags": ["clean energy", "wind", "solar"]
      },
      {

         "index": 32,
         "name": "Tyler Walker",
         "isActive": true,
         "registered": "2019-07-09T11:55:30.000Z",
         "age": 27,
         "gender": "male",
         "eyeColor": "green",
         "favoriteFruit": "durian",
         "company": {
            "title": "MEDIATECH",
            "email": "tyler.walker@mediatech.com",
            "phone": "+1 (555) 456-7890",
            "location": {
               "country": "USA",
               "address": "506 Media Hub"
            }
         },
         "tags": ["media", "streaming", "content"]
      },
      {

         "index": 33,
         "name": "Megan Young",
         "isActive": false,
         "registered": "2017-03-16T16:30:45.000Z",
         "age": 33,
         "gender": "female",
         "eyeColor": "brown",
         "favoriteFruit": "jackfruit",
         "company": {
            "title": "FOODTECH",
            "email": "megan.young@foodtech.com",
            "phone": "+1 (555) 567-8901",
            "location": {
               "country": "Singapore",
               "address": "617 Food Innovation Center"
            }
         },
         "tags": ["food", "nutrition", "sustainable"]
      },
      {

         "index": 34,
         "name": "Anthony King",
         "isActive": true,
         "registered": "2020-11-28T12:45:20.000Z",
         "age": 29,
         "gender": "male",
         "eyeColor": "blue",
         "favoriteFruit": "persimmon",
         "company": {
            "title": "OCEANTECH",
            "email": "anthony.king@oceantech.com",
            "phone": "+1 (555) 678-9012",
            "location": {
               "country": "Australia",
               "address": "728 Ocean Drive"
            }
         },
         "tags": ["ocean", "marine", "conservation"]
      },
      {

         "index": 35,
         "name": "Kimberly Scott",
         "isActive": false,
         "registered": "2016-10-05T08:18:35.000Z",
         "age": 36,
         "gender": "female",
         "eyeColor": "gray",
         "favoriteFruit": "pomelo",
         "company": {
            "title": "INSURTECH",
            "email": "kimberly.scott@insurtech.com",
            "phone": "+1 (555) 789-0123",
            "location": {
               "country": "UK",
               "address": "839 Insurance Square"
            }
         },
         "tags": ["insurance", "risk", "actuarial"]
      },
      {

         "index": 36,
         "name": "Jonathan Green",
         "isActive": true,
         "registered": "2021-09-12T15:22:10.000Z",
         "age": 25,
         "gender": "male",
         "eyeColor": "hazel",
         "favoriteFruit": "elderberry",
         "company": {
            "title": "PROPTECH",
            "email": "jonathan.green@proptech.com",
            "phone": "+1 (555) 890-1234",
            "location": {
               "country": "USA",
               "address": "940 Property Lane"
            }
         },
         "tags": ["real estate", "property", "smart homes"]
      },
      {

         "index": 37,
         "name": "Samantha Adams",
         "isActive": false,
         "registered": "2018-04-07T13:35:50.000Z",
         "age": 31,
         "gender": "female",
         "eyeColor": "green",
         "favoriteFruit": "cranberry",
         "company": {
            "title": "LEGALTECH",
            "email": "samantha.adams@legaltech.com",
            "phone": "+1 (555) 901-2345",
            "location": {
               "country": "USA",
               "address": "151 Legal Plaza"
            }
         },
         "tags": ["legal", "compliance", "contracts"]
      },
      {

         "index": 38,
         "name": "Eric Baker",
         "isActive": true,
         "registered": "2019-01-14T10:48:15.000Z",
         "age": 32,
         "gender": "male",
         "eyeColor": "brown",
         "favoriteFruit": "gooseberry",
         "company": {
            "title": "LOGISTECH",
            "email": "eric.baker@logistech.com",
            "phone": "+1 (555) 012-3456",
            "location": {
               "country": "Germany",
               "address": "262 Logistics Center"
            }
         },
         "tags": ["logistics", "supply chain", "optimization"]
      },
      {

         "index": 39,
         "name": "Rebecca Nelson",
         "isActive": false,
         "registered": "2017-08-21T07:25:40.000Z",
         "age": 34,
         "gender": "female",
         "eyeColor": "blue",
         "favoriteFruit": "mulberry",
         "company": {
            "title": "ARTTECH",
            "email": "rebecca.nelson@arttech.com",
            "phone": "+1 (555) 123-4567",
            "location": {
               "country": "Italy",
               "address": "373 Art District"
            }
         },
         "tags": ["art", "digital", "nft"]
      },
      {

         "index": 40,
         "name": "Gregory Carter",
         "isActive": true,
         "registered": "2020-06-18T14:15:25.000Z",
         "age": 28,
         "gender": "male",
         "eyeColor": "green",
         "favoriteFruit": "boysenberry",
         "company": {
            "title": "MUSICTECH",
            "email": "gregory.carter@musictech.com",
            "phone": "+1 (555) 234-5678",
            "location": {
               "country": "USA",
               "address": "484 Music Row"
            }
         },
         "tags": ["music", "audio", "streaming"]
      },
      {

         "index": 41,
         "name": "Crystal Mitchell",
         "isActive": false,
         "registered": "2016-12-02T11:38:50.000Z",
         "age": 37,
         "gender": "female",
         "eyeColor": "hazel",
         "favoriteFruit": "cloudberry",
         "company": {
            "title": "CHEMTECH",
            "email": "crystal.mitchell@chemtech.com",
            "phone": "+1 (555) 345-6789",
            "location": {
               "country": "Switzerland",
               "address": "595 Chemical Valley"
            }
         },
         "tags": ["chemistry", "materials", "research"]
      },
      {

         "index": 42,
         "name": "Brian Perez",
         "isActive": true,
         "registered": "2021-04-25T09:52:35.000Z",
         "age": 26,
         "gender": "male",
         "eyeColor": "brown",
         "favoriteFruit": "acai",
         "company": {
            "title": "WELLNESS",
            "email": "brian.perez@wellness.com",
            "phone": "+1 (555) 456-7890",
            "location": {
               "country": "Brazil",
               "address": "606 Wellness Way"
            }
         },
         "tags": ["wellness", "mental health", "meditation"]
      },
      {

         "index": 43,
         "name": "Tiffany Roberts",
         "isActive": false,
         "registered": "2018-08-10T16:12:45.000Z",
         "age": 30,
         "gender": "female",
         "eyeColor": "blue",
         "favoriteFruit": "goji berry",
         "company": {
            "title": "BEAUTYTECH",
            "email": "tiffany.roberts@beautytech.com",
            "phone": "+1 (555) 567-8901",
            "location": {
               "country": "South Korea",
               "address": "717 Beauty Boulevard"
            }
         },
         "tags": ["beauty", "cosmetics", "skincare"]
      },
      {

         "index": 44,
         "name": "Andrew Turner",
         "isActive": true,
         "registered": "2019-05-08T12:28:20.000Z",
         "age": 33,
         "gender": "male",
         "eyeColor": "gray",
         "favoriteFruit": "physalis",
         "company": {
            "title": "ENERGYTECH",
            "email": "andrew.turner@energytech.com",
            "phone": "+1 (555) 678-9012",
            "location": {
               "country": "USA",
               "address": "828 Energy Plaza"
            }
         },
         "tags": ["energy", "grid", "smart"]
      },
      {

         "index": 45,
         "name": "Diana Phillips",
         "isActive": false,
         "registered": "2017-06-26T08:42:15.000Z",
         "age": 35,
         "gender": "female",
         "eyeColor": "green",
         "favoriteFruit": "cacao",
         "company": {
            "title": "SOCIALTECH",
            "email": "diana.phillips@socialtech.com",
            "phone": "+1 (555) 789-0123",
            "location": {
               "country": "USA",
               "address": "939 Social Square"
            }
         },
         "tags": ["social media", "networking", "community"]
      },
      {

         "index": 46,
         "name": "Mark Campbell",
         "isActive": true,
         "registered": "2020-12-15T15:55:30.000Z",
         "age": 29,
         "gender": "male",
         "eyeColor": "blue",
         "favoriteFruit": "miracle fruit",
         "company": {
            "title": "WEATHERTECH",
            "email": "mark.campbell@weathertech.com",
            "phone": "+1 (555) 890-1234",
            "location": {
               "country": "USA",
               "address": "150 Weather Station"
            }
         },
         "tags": ["weather", "climate", "prediction"]
      },
      {

         "index": 47,
         "name": "Vanessa Parker",
         "isActive": false,
         "registered": "2016-07-11T13:20:45.000Z",
         "age": 38,
         "gender": "female",
         "eyeColor": "brown",
         "favoriteFruit": "longan",
         "company": {
            "title": "PACKTECH",
            "email": "vanessa.parker@packtech.com",
            "phone": "+1 (555) 901-2345",
            "location": {
               "country": "Germany",
               "address": "261 Packaging Park"
            }
         },
         "tags": ["packaging", "sustainable", "design"]
      },
      {

         "index": 48,
         "name": "Jacob Evans",
         "isActive": true,
         "registered": "2021-02-03T10:08:25.000Z",
         "age": 24,
         "gender": "male",
         "eyeColor": "hazel",
         "favoriteFruit": "ackee",
         "company": {
            "title": "SMARTCITY",
            "email": "jacob.evans@smartcity.com",
            "phone": "+1 (555) 012-3456",
            "location": {
               "country": "Singapore",
               "address": "372 Smart City Center"
            }
         },
         "tags": ["smart city", "urban", "sensors"]
      },
      {

         "index": 49,
         "name": "Heather Edwards",
         "isActive": false,
         "registered": "2018-11-19T17:45:10.000Z",
         "age": 32,
         "gender": "female",
         "eyeColor": "blue",
         "favoriteFruit": "breadfruit",
         "company": {
            "title": "TEXTILETECH",
            "email": "heather.edwards@textiletech.com",
            "phone": "+1 (555) 123-4567",
            "location": {
               "country": "India",
               "address": "483 Textile Hub"
            }
         },
         "tags": ["textiles", "fashion", "sustainable"]
      }
   ],
   books: [
      { "_id": 1, "title": "The Great Gatsby", "author_id": 100, "genre": "Classic" },
      { "_id": 2, "title": "Nineteen Eighty-Four", "author_id": 101, "genre": "Dystopian" },
      { "_id": 3, "title": "To Kill a Mockingbird", "author_id": 102, "genre": "Classic" },
      { "_id": 4, "title": "Pride and Prejudice", "author_id": 103, "genre": "Romance" },
      { "_id": 5, "title": "The Catcher in the Rye", "author_id": 104, "genre": "Coming-of-age" },
      { "_id": 6, "title": "Animal Farm", "author_id": 101, "genre": "Political Satire" },
      { "_id": 7, "title": "Lord of the Flies", "author_id": 105, "genre": "Dystopian" },
      { "_id": 8, "title": "The Hobbit", "author_id": 106, "genre": "Fantasy" },
      { "_id": 9, "title": "Fahrenheit 451", "author_id": 107, "genre": "Science Fiction" },
      { "_id": 10, "title": "Brave New World", "author_id": 108, "genre": "Science Fiction" },
      { "_id": 11, "title": "One Hundred Years of Solitude", "author_id": 109, "genre": "Magical Realism" },
      { "_id": 12, "title": "The Lord of the Rings", "author_id": 106, "genre": "Fantasy" },
      { "_id": 13, "title": "Jane Eyre", "author_id": 103, "genre": "Gothic Romance" },
      { "_id": 14, "title": "Wuthering Heights", "author_id": 103, "genre": "Gothic Romance" },
      { "_id": 15, "title": "The Chronicles of Narnia", "author_id": 110, "genre": "Fantasy" },
      { "_id": 16, "title": "Dune", "author_id": 111, "genre": "Science Fiction" },
      { "_id": 17, "title": "Foundation", "author_id": 112, "genre": "Science Fiction" },
      { "_id": 18, "title": "The Martian Chronicles", "author_id": 107, "genre": "Science Fiction" },
      { "_id": 19, "title": "Slaughterhouse-Five", "author_id": 113, "genre": "War Fiction" },
      { "_id": 20, "title": "Catch-22", "author_id": 114, "genre": "Dark Comedy" },
      { "_id": 21, "title": "The Grapes of Wrath", "author_id": 115, "genre": "Social Realism" },
      { "_id": 22, "title": "Of Mice and Men", "author_id": 115, "genre": "Tragedy" },
      { "_id": 23, "title": "The Old Man and the Sea", "author_id": 116, "genre": "Literary Fiction" },
      { "_id": 24, "title": "For Whom the Bell Tolls", "author_id": 116, "genre": "War Fiction" },
      { "_id": 25, "title": "A Farewell to Arms", "author_id": 116, "genre": "War Romance" },
      { "_id": 26, "title": "The Sun Also Rises", "author_id": 116, "genre": "Modernist" },
      { "_id": 27, "title": "On the Road", "author_id": 117, "genre": "Beat Literature" },
      { "_id": 28, "title": "The Bell Jar", "author_id": 118, "genre": "Confessional" },
      { "_id": 29, "title": "Beloved", "author_id": 119, "genre": "Historical Fiction" },
      { "_id": 30, "title": "Song of Solomon", "author_id": 119, "genre": "Magical Realism" },
      { "_id": 31, "title": "The Color Purple", "author_id": 120, "genre": "Epistolary" },
      { "_id": 32, "title": "Their Eyes Were Watching God", "author_id": 121, "genre": "Harlem Renaissance" },
      { "_id": 33, "title": "Invisible Man", "author_id": 122, "genre": "Social Commentary" },
      { "_id": 34, "title": "The Sound and the Fury", "author_id": 123, "genre": "Stream of Consciousness" },
      { "_id": 35, "title": "As I Lay Dying", "author_id": 123, "genre": "Southern Gothic" },
      { "_id": 36, "title": "Light in August", "author_id": 123, "genre": "Southern Gothic" },
      { "_id": 37, "title": "The Adventures of Huckleberry Finn", "author_id": 124, "genre": "Adventure" },
      { "_id": 38, "title": "The Adventures of Tom Sawyer", "author_id": 124, "genre": "Adventure" },
      { "_id": 39, "title": "A Connecticut Yankee in King Arthur's Court", "author_id": 124, "genre": "Satire" },
      { "_id": 40, "title": "Moby Dick", "author_id": 125, "genre": "Adventure" },
      { "_id": 41, "title": "Bartleby, the Scrivener", "author_id": 125, "genre": "Short Story" },
      { "_id": 42, "title": "Billy Budd", "author_id": 125, "genre": "Novella" },
      { "_id": 43, "title": "The Scarlet Letter", "author_id": 126, "genre": "Historical Romance" },
      { "_id": 44, "title": "The House of Seven Gables", "author_id": 126, "genre": "Gothic Fiction" },
      { "_id": 45, "title": "Young Goodman Brown", "author_id": 126, "genre": "Dark Romantic" },
      { "_id": 46, "title": "Walden", "author_id": 127, "genre": "Transcendentalist" },
      { "_id": 47, "title": "Civil Disobedience", "author_id": 127, "genre": "Political Philosophy" },
      { "_id": 48, "title": "Self-Reliance", "author_id": 128, "genre": "Essay" },
      { "_id": 49, "title": "Nature", "author_id": 128, "genre": "Transcendentalist" },
      { "_id": 50, "title": "The American Scholar", "author_id": 128, "genre": "Philosophy" },
      { "_id": 51, "title": "Leaves of Grass", "author_id": 129, "genre": "Poetry" },
      { "_id": 52, "title": "Song of Myself", "author_id": 129, "genre": "Free Verse" },
      { "_id": 53, "title": "O Captain! My Captain!", "author_id": 129, "genre": "Elegy" },
      { "_id": 54, "title": "The Raven", "author_id": 130, "genre": "Gothic Poetry" },
      { "_id": 55, "title": "The Tell-Tale Heart", "author_id": 130, "genre": "Horror" },
      { "_id": 56, "title": "The Fall of the House of Usher", "author_id": 130, "genre": "Gothic Horror" },
      { "_id": 57, "title": "The Murders in the Rue Morgue", "author_id": 130, "genre": "Detective Fiction" },
      { "_id": 58, "title": "Little Women", "author_id": 131, "genre": "Family Saga" },
      { "_id": 59, "title": "Little Men", "author_id": 131, "genre": "Children's Literature" },
      { "_id": 60, "title": "Jo's Boys", "author_id": 131, "genre": "Children's Literature" },
      { "_id": 61, "title": "Uncle Tom's Cabin", "author_id": 132, "genre": "Anti-slavery" },
      { "_id": 62, "title": "The Minister's Wooing", "author_id": 132, "genre": "Regional Fiction" },
      { "_id": 63, "title": "Oldtown Folks", "author_id": 132, "genre": "New England Fiction" },
      { "_id": 64, "title": "The Age of Innocence", "author_id": 133, "genre": "Social Commentary" },
      { "_id": 65, "title": "Ethan Frome", "author_id": 133, "genre": "Tragedy" },
      { "_id": 66, "title": "The House of Mirth", "author_id": 133, "genre": "Social Satire" },
      { "_id": 67, "title": "Sister Carrie", "author_id": 134, "genre": "Naturalism" },
      { "_id": 68, "title": "An American Tragedy", "author_id": 134, "genre": "Social Realism" },
      { "_id": 69, "title": "The Financier", "author_id": 134, "genre": "Business Fiction" },
      { "_id": 70, "title": "The Call of the Wild", "author_id": 135, "genre": "Adventure" },
      { "_id": 71, "title": "White Fang", "author_id": 135, "genre": "Adventure" },
      { "_id": 72, "title": "The Sea-Wolf", "author_id": 135, "genre": "Sea Adventure" },
      { "_id": 73, "title": "Martin Eden", "author_id": 135, "genre": "Autobiographical" },
      { "_id": 74, "title": "The Iron Heel", "author_id": 135, "genre": "Dystopian" },
      { "_id": 75, "title": "The Jungle", "author_id": 136, "genre": "Social Reform" },
      { "_id": 76, "title": "Oil!", "author_id": 136, "genre": "Political Fiction" },
      { "_id": 77, "title": "Dragon's Teeth", "author_id": 136, "genre": "Historical Fiction" },
      { "_id": 78, "title": "Main Street", "author_id": 137, "genre": "Social Satire" },
      { "_id": 79, "title": "Babbitt", "author_id": 137, "genre": "Satirical" },
      { "_id": 80, "title": "Arrowsmith", "author_id": 137, "genre": "Medical Fiction" },
      { "_id": 81, "title": "It Can't Happen Here", "author_id": 137, "genre": "Political Dystopia" },
      { "_id": 82, "title": "Elmer Gantry", "author_id": 137, "genre": "Religious Satire" },
      { "_id": 83, "title": "Look Homeward, Angel", "author_id": 138, "genre": "Autobiographical" },
      { "_id": 84, "title": "Of Time and the River", "author_id": 138, "genre": "Coming-of-age" },
      { "_id": 85, "title": "You Can't Go Home Again", "author_id": 138, "genre": "Social Commentary" },
      { "_id": 86, "title": "The Web and the Rock", "author_id": 138, "genre": "Literary Fiction" },
      { "_id": 87, "title": "Native Son", "author_id": 139, "genre": "Social Protest" },
      { "_id": 88, "title": "Black Boy", "author_id": 139, "genre": "Autobiography" },
      { "_id": 89, "title": "The Outsider", "author_id": 139, "genre": "Existential" },
      { "_id": 90, "title": "Uncle Tom's Children", "author_id": 139, "genre": "Short Stories" },
      { "_id": 91, "title": "Go Tell It on the Mountain", "author_id": 140, "genre": "Coming-of-age" },
      { "_id": 92, "title": "Giovanni's Room", "author_id": 140, "genre": "LGBTQ+" },
      { "_id": 93, "title": "Another Country", "author_id": 140, "genre": "Social Commentary" },
      { "_id": 94, "title": "The Fire Next Time", "author_id": 140, "genre": "Essay Collection" },
      { "_id": 95, "title": "If Beale Street Could Talk", "author_id": 140, "genre": "Social Drama" },
      { "_id": 96, "title": "The Maltese Falcon", "author_id": 141, "genre": "Detective Fiction" },
      { "_id": 97, "title": "The Thin Man", "author_id": 141, "genre": "Mystery" },
      { "_id": 98, "title": "Red Harvest", "author_id": 141, "genre": "Crime Fiction" },
      { "_id": 99, "title": "The Glass Key", "author_id": 141, "genre": "Hard-boiled" },
      { "_id": 100, "title": "The Dain Curse", "author_id": 141, "genre": "Mystery" }
   ],
   authors: [
      { "_id": 100, "name": "F. Scott Fitzgerald", "birth_year": 1896 },
      { "_id": 101, "name": "George Orwell", "birth_year": 1903 },
      { "_id": 102, "name": "Harper Lee", "birth_year": 1926 },
      { "_id": 103, "name": "Charlotte Brontë", "birth_year": 1816 },
      { "_id": 104, "name": "J.D. Salinger", "birth_year": 1919 },
      { "_id": 105, "name": "William Golding", "birth_year": 1911 },
      { "_id": 106, "name": "J.R.R. Tolkien", "birth_year": 1892 },
      { "_id": 107, "name": "Ray Bradbury", "birth_year": 1920 },
      { "_id": 108, "name": "Aldous Huxley", "birth_year": 1894 },
      { "_id": 109, "name": "Gabriel García Márquez", "birth_year": 1927 },
      { "_id": 110, "name": "C.S. Lewis", "birth_year": 1898 },
      { "_id": 111, "name": "Frank Herbert", "birth_year": 1920 },
      { "_id": 112, "name": "Isaac Asimov", "birth_year": 1920 },
      { "_id": 113, "name": "Kurt Vonnegut", "birth_year": 1922 },
      { "_id": 114, "name": "Joseph Heller", "birth_year": 1923 },
      { "_id": 115, "name": "John Steinbeck", "birth_year": 1902 },
      { "_id": 116, "name": "Ernest Hemingway", "birth_year": 1899 },
      { "_id": 117, "name": "Jack Kerouac", "birth_year": 1922 },
      { "_id": 118, "name": "Sylvia Plath", "birth_year": 1932 },
      { "_id": 119, "name": "Toni Morrison", "birth_year": 1931 },
      { "_id": 120, "name": "Alice Walker", "birth_year": 1944 },
      { "_id": 121, "name": "Zora Neale Hurston", "birth_year": 1891 },
      { "_id": 122, "name": "Ralph Ellison", "birth_year": 1914 },
      { "_id": 123, "name": "William Faulkner", "birth_year": 1897 },
      { "_id": 124, "name": "Mark Twain", "birth_year": 1835 },
      { "_id": 125, "name": "Herman Melville", "birth_year": 1819 },
      { "_id": 126, "name": "Nathaniel Hawthorne", "birth_year": 1804 },
      { "_id": 127, "name": "Henry David Thoreau", "birth_year": 1817 },
      { "_id": 128, "name": "Ralph Waldo Emerson", "birth_year": 1803 },
      { "_id": 129, "name": "Walt Whitman", "birth_year": 1819 },
      { "_id": 130, "name": "Edgar Allan Poe", "birth_year": 1809 },
      { "_id": 131, "name": "Louisa May Alcott", "birth_year": 1832 },
      { "_id": 132, "name": "Harriet Beecher Stowe", "birth_year": 1811 },
      { "_id": 133, "name": "Edith Wharton", "birth_year": 1862 },
      { "_id": 134, "name": "Theodore Dreiser", "birth_year": 1871 },
      { "_id": 135, "name": "Jack London", "birth_year": 1876 },
      { "_id": 136, "name": "Upton Sinclair", "birth_year": 1878 },
      { "_id": 137, "name": "Sinclair Lewis", "birth_year": 1885 },
      { "_id": 138, "name": "Thomas Wolfe", "birth_year": 1900 },
      { "_id": 139, "name": "Richard Wright", "birth_year": 1908 },
      { "_id": 140, "name": "James Baldwin", "birth_year": 1924 },
      { "_id": 141, "name": "Dashiell Hammett", "birth_year": 1894 }
   ]
};
