import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Copy, FileText, Users, BookOpen, User } from 'lucide-react';
import { demoData } from '../data/data.js';

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
         description: '50 sample users with mixed active/inactive status, diverse locations and companies',
         icon: Users,
         color: 'text-blue-600',
         bgColor: 'bg-blue-50',
         borderColor: 'border-blue-200'
      },
      {
         key: 'books',
         title: 'Books Data',
         description: '100 books across multiple genres with author references spanning literature history',
         icon: BookOpen,
         color: 'text-green-600',
         bgColor: 'bg-green-50',
         borderColor: 'border-green-200'
      },
      {
         key: 'authors',
         title: 'Authors Data',
         description: '42 famous authors from different time periods and literary movements',
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
               Comprehensive dataset with 50 users, 100 books, and 42 authors for practicing complex MongoDB aggregation queries. Click "Copy JSON" to get the data, then paste it into the corresponding loader above.
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