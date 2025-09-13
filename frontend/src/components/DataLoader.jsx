import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { dataService, parseJSON, validateJSONArray } from '../api/services';
import { Upload, Database, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import DemoDataShowcase from './DemoDataShowcase';
import JsonDisplay from './JsonDisplay';
import DataTableDisplay from './DataTableDisplay';

const DataLoader = () => {
   const [usersData, setUsersData] = useState('');
   const [booksData, setBooksData] = useState('');
   const [authorsData, setAuthorsData] = useState('');
   const [loading, setLoading] = useState({});
   const [results, setResults] = useState({});

   const handleDataLoad = async (type, data, loadFunction) => {
      setLoading(prev => ({ ...prev, [type]: true }));
      setResults(prev => ({ ...prev, [type]: null }));

      try {
         // Parse and validate JSON
         const parsedData = parseJSON(data);
         validateJSONArray(parsedData);

         // Load data
         const result = await loadFunction(parsedData);
         setResults(prev => ({
            ...prev,
            [type]: {
               success: true,
               message: result.message,
               count: result.count,
               data: parsedData
            }
         }));
      } catch (error) {
         setResults(prev => ({
            ...prev,
            [type]: { success: false, message: error.message }
         }));
      } finally {
         setLoading(prev => ({ ...prev, [type]: false }));
      }
   };

   const handleClearAll = async () => {
      setLoading(prev => ({ ...prev, clear: true }));
      setResults(prev => ({ ...prev, clear: null }));

      try {
         const result = await dataService.clearAllData();
         setResults(prev => ({
            ...prev,
            clear: { success: true, message: result.message, deletedCounts: result.deletedCounts }
         }));
         // Clear form data
         setUsersData('');
         setBooksData('');
         setAuthorsData('');
         // Clear results
         setResults({});
      } catch (error) {
         setResults(prev => ({
            ...prev,
            clear: { success: false, message: error.message }
         }));
      } finally {
         setLoading(prev => ({ ...prev, clear: false }));
      }
   };

   const handleLoadDemo = (type, demoData) => {
      const jsonString = JSON.stringify(demoData, null, 2);

      switch (type) {
         case 'users':
            setUsersData(jsonString);
            break;
         case 'books':
            setBooksData(jsonString);
            break;
         case 'authors':
            setAuthorsData(jsonString);
            break;
      }
   };

   const ResultMessage = ({ result, type }) => {
      if (!result) return null;

      return (
         <div className="space-y-3">
            <div className={`flex items-center gap-2 p-3 rounded-md text-sm ${result.success
               ? 'bg-green-50 text-green-700 border border-green-200'
               : 'bg-red-50 text-red-700 border border-red-200'
               }`}>
               {result.success ? (
                  <CheckCircle className="h-4 w-4" />
               ) : (
                  <AlertCircle className="h-4 w-4" />
               )}
               <span>{result.message}</span>
               {result.count && <span className="font-semibold">({result.count} records)</span>}
            </div>

            {result.success && result.data && Array.isArray(result.data) && result.data.length > 0 && (
               <DataTableDisplay
                  data={result.data}
                  title={`Loaded ${type} data (${result.data.length} records)`}
                  type="success"
               />
            )}

            {result.success && result.deletedCounts && (
               <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-2">Deletion Summary:</h4>
                  <div className="text-sm text-blue-700">
                     <div>Users: {result.deletedCounts.users} deleted</div>
                     <div>Books: {result.deletedCounts.books} deleted</div>
                     <div>Authors: {result.deletedCounts.authors} deleted</div>
                  </div>
               </div>
            )}
         </div>
      );
   };

   return (
      <div className="space-y-6">
         {/* Demo Data Showcase */}
         <DemoDataShowcase onLoadDemo={handleLoadDemo} />

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Loading Center
               </CardTitle>
               <CardDescription>
                  Load your sample data to practice MongoDB aggregation pipelines. Use demo data above or paste your own JSON arrays below.
               </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
               {/* Users Data */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <label className="text-sm font-medium">Users Data (JSON Array)</label>
                     <span className="text-xs text-gray-500">
                        {usersData ? `${usersData.length} characters` : 'No data'}
                     </span>
                  </div>
                  <Textarea
                     placeholder='[{"_id":"...","name":"John Doe","isActive":true,"age":25,...}]'
                     value={usersData}
                     onChange={(e) => setUsersData(e.target.value)}
                     className="min-h-[120px] font-mono text-xs"
                  />
                  <div className="flex gap-2">
                     <Button
                        onClick={() => handleDataLoad('users', usersData, dataService.loadUsers)}
                        disabled={loading.users || !usersData.trim()}
                        className="flex items-center gap-2"
                     >
                        <Upload className="h-4 w-4" />
                        {loading.users ? 'Loading...' : 'Load Users'}
                     </Button>
                     {usersData && (
                        <Button
                           variant="outline"
                           onClick={() => setUsersData('')}
                           size="sm"
                        >
                           Clear
                        </Button>
                     )}
                  </div>
                  <ResultMessage result={results.users} type="users" />
               </div>

               {/* Books Data */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <label className="text-sm font-medium">Books Data (JSON Array)</label>
                     <span className="text-xs text-gray-500">
                        {booksData ? `${booksData.length} characters` : 'No data'}
                     </span>
                  </div>
                  <Textarea
                     placeholder='[{"_id":1,"title":"The Great Gatsby","author_id":100,"genre":"Classic"}]'
                     value={booksData}
                     onChange={(e) => setBooksData(e.target.value)}
                     className="min-h-[120px] font-mono text-xs"
                  />
                  <div className="flex gap-2">
                     <Button
                        onClick={() => handleDataLoad('books', booksData, dataService.loadBooks)}
                        disabled={loading.books || !booksData.trim()}
                        className="flex items-center gap-2"
                     >
                        <Upload className="h-4 w-4" />
                        {loading.books ? 'Loading...' : 'Load Books'}
                     </Button>
                     {booksData && (
                        <Button
                           variant="outline"
                           onClick={() => setBooksData('')}
                           size="sm"
                        >
                           Clear
                        </Button>
                     )}
                  </div>
                  <ResultMessage result={results.books} type="books" />
               </div>

               {/* Authors Data */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <label className="text-sm font-medium">Authors Data (JSON Array)</label>
                     <span className="text-xs text-gray-500">
                        {authorsData ? `${authorsData.length} characters` : 'No data'}
                     </span>
                  </div>
                  <Textarea
                     placeholder='[{"_id":100,"name":"F. Scott Fitzgerald","birth_year":1896}]'
                     value={authorsData}
                     onChange={(e) => setAuthorsData(e.target.value)}
                     className="min-h-[120px] font-mono text-xs"
                  />
                  <div className="flex gap-2">
                     <Button
                        onClick={() => handleDataLoad('authors', authorsData, dataService.loadAuthors)}
                        disabled={loading.authors || !authorsData.trim()}
                        className="flex items-center gap-2"
                     >
                        <Upload className="h-4 w-4" />
                        {loading.authors ? 'Loading...' : 'Load Authors'}
                     </Button>
                     {authorsData && (
                        <Button
                           variant="outline"
                           onClick={() => setAuthorsData('')}
                           size="sm"
                        >
                           Clear
                        </Button>
                     )}
                  </div>
                  <ResultMessage result={results.authors} type="authors" />
               </div>

               {/* Clear All Data */}
               <div className="pt-4 border-t">
                  <Button
                     onClick={handleClearAll}
                     disabled={loading.clear}
                     variant="destructive"
                     className="flex items-center gap-2"
                  >
                     <Trash2 className="h-4 w-4" />
                     {loading.clear ? 'Clearing...' : 'Clear All Data'}
                  </Button>
                  <ResultMessage result={results.clear} type="clear" />
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default DataLoader;