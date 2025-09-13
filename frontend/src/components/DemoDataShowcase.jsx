import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Copy, FileText, Users, BookOpen, User } from 'lucide-react';

// Demo data
const demoData = {
   users: [
      {
         "_id": "68c4dffa2a8b0b4b87f664d1",
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
         "tags": [
            "enim",
            "id",
            "velit",
            "ad",
            "consequat"
         ]
      },
      {
         "_id": "68c4dffa2a8b0b4b87f664d2",
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
         "tags": [
            "ut",
            "voluptate",
            "consequat",
            "consequat"
         ]
      },
      {
         "_id": "68c4dffa2a8b0b4b87f664d3",
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
         "tags": [
            "amet",
            "ad",
            "elit",
            "ipsum"
         ]
      },
      {
         "_id": "68c4dffa2a8b0b4b87f664d4",
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
         "tags": [
            "cillum",
            "exercitation",
            "excepteur"
         ]
      },
      {
         "_id": "68c4dffa2a8b0b4b87f664d5",
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
         "tags": [
            "deserunt",
            "et",
            "duis",
            "dolor"
         ]
      },
      {
         "_id": "68c4dffa2a8b0b4b87f664d6",
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
         "tags": [
            "fugiat",
            "minim"
         ]
      },
      {
         "_id": "68c4dffa2a8b0b4b87f664d7",
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
         "tags": [
            "amet",
            "cillum"
         ]
      },
      {
         "_id": "68c4dffa2a8b0b4b87f664d8",
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
         "tags": [
            "Lorem",
            "consequat",
            "ex",
            "pariatur",
            "labore"
         ]
      },
      {
         "_id": "68c4dffa2a8b0b4b87f664d9",
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
         "tags": [
            "technology",
            "programming",
            "innovation"
         ]
      },
      {
         "_id": "68c4dffa2a8b0b4b87f664da",
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
         "tags": [
            "design",
            "creative",
            "art"
         ]
      }
   ],
   books: [
      {
         "_id": 1,
         "title": "The Great Gatsby",
         "author_id": 100,
         "genre": "Classic"
      },
      {
         "_id": 2,
         "title": "Nineteen Eighty-Four",
         "author_id": 101,
         "genre": "Dystopian"
      },
      {
         "_id": 3,
         "title": "To Kill a Mockingbird",
         "author_id": 102,
         "genre": "Classic"
      }
   ],
   authors: [
      {
         "_id": 100,
         "name": "F. Scott Fitzgerald",
         "birth_year": 1896
      },
      {
         "_id": 101,
         "name": "George Orwell",
         "birth_year": 1903
      },
      {
         "_id": 102,
         "name": "Harper Lee",
         "birth_year": 1926
      }
   ]
};

const DemoDataShowcase = ({ onLoadDemo }) => {
   const [copiedType, setCopiedType] = useState(null);

   const copyToClipboard = async (data, type) => {
      try {
         await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
         setCopiedType(type);
         setTimeout(() => setCopiedType(null), 2000);
      } catch (err) {
         console.error('Failed to copy text: ', err);
      }
   };

   const dataTypes = [
      {
         key: 'users',
         title: 'Users Data',
         description: '3 sample users with mixed active/inactive status',
         icon: Users,
         color: 'text-blue-600',
         bgColor: 'bg-blue-50',
         borderColor: 'border-blue-200'
      },
      {
         key: 'books',
         title: 'Books Data',
         description: '3 books across different genres with author references',
         icon: BookOpen,
         color: 'text-green-600',
         bgColor: 'bg-green-50',
         borderColor: 'border-green-200'
      },
      {
         key: 'authors',
         title: 'Authors Data',
         description: '3 famous authors from different time periods',
         icon: User,
         color: 'text-purple-600',
         bgColor: 'bg-purple-50',
         borderColor: 'border-purple-200'
      }
   ];

   return (
      <Card className="mt-6">
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <FileText className="h-5 w-5" />
               Demo Data Templates
            </CardTitle>
            <CardDescription>
               Quick-start with sample data. Click "Copy JSON" to get the data, then paste it into the corresponding loader above.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {dataTypes.map(({ key, title, description, icon: Icon, color, bgColor, borderColor }) => (
                  <div key={key} className={`border ${borderColor} rounded-lg p-4 ${bgColor}`}>
                     <div className="flex items-center gap-2 mb-3">
                        <Icon className={`h-5 w-5 ${color}`} />
                        <h3 className="font-semibold text-sm">{title}</h3>
                     </div>

                     <p className="text-xs text-gray-600 mb-3">{description}</p>

                     <div className="text-xs text-gray-500 mb-3">
                        <strong>Records:</strong> {demoData[key].length} items
                     </div>

                     <div className="space-y-2">
                        <Button
                           size="sm"
                           variant="outline"
                           onClick={() => copyToClipboard(demoData[key], key)}
                           className="w-full flex items-center gap-2 text-xs"
                        >
                           <Copy className="h-3 w-3" />
                           {copiedType === key ? 'Copied!' : 'Copy JSON'}
                        </Button>

                        <Button
                           size="sm"
                           onClick={() => onLoadDemo(key, demoData[key])}
                           className="w-full text-xs"
                        >
                           Load to Form
                        </Button>
                     </div>

                     {/* Sample preview */}
                     <details className="mt-3">
                        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                           Preview first record →
                        </summary>
                        <pre className="text-xs bg-white p-2 rounded border mt-2 overflow-x-auto">
                           {JSON.stringify(demoData[key][0], null, 2)}
                        </pre>
                     </details>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   );
};

export default DemoDataShowcase;