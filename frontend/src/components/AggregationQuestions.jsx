import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { aggregationService } from '../api/services';
import { JsonDisplay } from './JsonDisplay';
import DataTableDisplay from './DataTableDisplay';
import { Play, Code, Users, Eye, EyeOff, Globe, Clock, CheckCircle, AlertCircle, Copy } from 'lucide-react';

const AggregationQuestions = () => {
   const [results, setResults] = useState({});
   const [loading, setLoading] = useState({});
   const [showPipeline, setShowPipeline] = useState({});
   const [requestHistory, setRequestHistory] = useState([]);

   // API Testing State
   const [selectedEndpoint, setSelectedEndpoint] = useState('');
   const [customUrl, setCustomUrl] = useState('');
   const [responseTime, setResponseTime] = useState(null);

   // Available endpoints - MongoDB Aggregation Pipeline Learning Questions
   // Organized from basic to advanced concepts
   const endpoints = [
      // BASIC FILTERING & PROJECTION
      {
         id: 'active-users',
         name: '🎯 Filter Active Users',
         method: 'GET',
         url: '/questions/active-users',
         description: 'Learn $match and $project stages - Filter documents based on conditions and select specific fields. This demonstrates the fundamental building blocks of aggregation pipelines.',
         service: aggregationService.getActiveUsers,
         level: 'Beginner',
         concepts: ['$match', '$project']
      },

      // BASIC GROUPING & COUNTING
      {
         id: 'user-count-by-gender',
         name: '👥 Count Users by Gender',
         method: 'GET',
         url: '/questions/get-user-count-by-gender',
         description: 'Master $group stage with counting - Group documents by a field and count occurrences. Essential for generating summary statistics and understanding data distribution.',
         service: aggregationService.getUserCountByGender,
         level: 'Beginner',
         concepts: ['$group', '$sum', '$project']
      },

      // AGGREGATION OPERATORS
      {
         id: 'average-age',
         name: '📊 Calculate Average Age',
         method: 'GET',
         url: '/questions/get-average-age',
         description: 'Explore $avg operator - Calculate numerical averages across your entire dataset. Learn how aggregation operators work within the $group stage.',
         service: aggregationService.getAverageAge,
         level: 'Beginner',
         concepts: ['$group', '$avg']
      },

      {
         id: 'average-age-by-gender',
         name: '📈 Average Age by Gender',
         method: 'GET',
         url: '/questions/get-average-age-by-gender',
         description: 'Combine grouping with calculations - Group by gender and calculate average age for each group. Shows how to create meaningful analytical insights.',
         service: aggregationService.getAverageAgeByGender,
         level: 'Intermediate',
         concepts: ['$group', '$avg', '$project']
      },

      // UNIQUE VALUES & DISTRIBUTION
      {
         id: 'unique-eye-colors',
         name: '👁️ Unique Eye Colors Distribution',
         method: 'GET',
         url: '/questions/get-unique-eye-colors',
         description: 'Find unique values and their frequency - Discover all distinct values in a field and count their occurrences. Perfect for understanding data variety and distribution patterns.',
         service: aggregationService.getUniqueEyeColors,
         level: 'Intermediate',
         concepts: ['$group', '$sum', '$project']
      },

      // ADVANCED: UNWIND & COMPLEX GROUPING
      {
         id: 'most-popular-fruits',
         name: '🍎 Top 5 Favorite Fruits',
         method: 'GET',
         url: '/questions/get-most-popular-fruits',
         description: 'Learn $unwind, $sort, and $limit - Deconstruct arrays, count elements, sort by popularity, and limit results. Essential for working with array fields and creating top-N reports.',
         service: aggregationService.getMostPopularFruits,
         level: 'Advanced',
         concepts: ['$unwind', '$group', '$sort', '$limit']
      },

      {
         id: 'top-countries-by-user-count',
         name: '🌍 Top 5 Countries by User Count',
         method: 'GET',
         url: '/questions/get-top-countries-by-user-count',
         description: 'Navigate nested objects - Access nested fields (company.location.country), group by them, and find top performers. Learn dot notation in aggregation pipelines.',
         service: aggregationService.getTopCountriesByUserCount,
         level: 'Advanced',
         concepts: ['$group', '$sort', '$limit', 'nested fields']
      },

      // COMPLEX CALCULATIONS
      {
         id: 'average-number-of-tags-per-user',
         name: '🏷️ Average Tags per User (Method 1)',
         method: 'GET',
         url: '/questions/get-average-number-of-tags-per-user',
         description: 'Multi-stage calculation with $unwind - Unwind arrays, count per user, then calculate overall average. Demonstrates complex multi-step aggregation logic.',
         service: aggregationService.getAverageNumberOfTagsPerUser,
         level: 'Advanced',
         concepts: ['$unwind', '$group', '$avg', 'multi-stage']
      },

      {
         id: 'average-number-of-tags-per-user-alternative',
         name: '🏷️ Average Tags per User (Method 2)',
         method: 'GET',
         url: '/questions/get-average-number-of-tags-per-user-alternative',
         description: 'Alternative approach using $addFields and $size - Add calculated fields using array operators, then group. Compare different approaches to solve the same problem efficiently.',
         service: aggregationService.getAverageNumberOfTagsPerUserAlternative,
         level: 'Advanced',
         concepts: ['$addFields', '$size', '$ifNull', '$avg']
      }
   ];

   const executeEndpoint = async (endpoint) => {
      const startTime = Date.now();
      setLoading(prev => ({ ...prev, [endpoint.id]: true }));
      setResults(prev => ({ ...prev, [endpoint.id]: null }));
      setResponseTime(null);

      try {
         const result = await endpoint.service();
         const endTime = Date.now();
         const duration = endTime - startTime;

         setResults(prev => ({ ...prev, [endpoint.id]: result }));
         setResponseTime(duration);

         // Add to request history
         setRequestHistory(prev => [{
            id: Date.now(),
            endpoint: endpoint.name,
            url: endpoint.url,
            method: endpoint.method,
            timestamp: new Date().toLocaleTimeString(),
            success: result.success,
            duration,
            recordCount: result.success ? result.totalResults : 0
         }, ...prev.slice(0, 9)]); // Keep only last 10 requests

      } catch (error) {
         const endTime = Date.now();
         const duration = endTime - startTime;

         setResults(prev => ({
            ...prev,
            [endpoint.id]: {
               success: false,
               error: error.message
            }
         }));
         setResponseTime(duration);

         setRequestHistory(prev => [{
            id: Date.now(),
            endpoint: endpoint.name,
            url: endpoint.url,
            method: endpoint.method,
            timestamp: new Date().toLocaleTimeString(),
            success: false,
            duration,
            error: error.message
         }, ...prev.slice(0, 9)]);

      } finally {
         setLoading(prev => ({ ...prev, [endpoint.id]: false }));
      }
   };

   const executeCustomUrl = async () => {
      if (!customUrl) return;

      const startTime = Date.now();
      setLoading(prev => ({ ...prev, custom: true }));
      setResults(prev => ({ ...prev, custom: null }));
      setResponseTime(null);

      try {
         const baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
         const response = await fetch(`${baseURL}${customUrl}`);
         const endTime = Date.now();
         const duration = endTime - startTime;

         const result = await response.json();

         setResults(prev => ({ ...prev, custom: result }));
         setResponseTime(duration);

         setRequestHistory(prev => [{
            id: Date.now(),
            endpoint: 'Custom Request',
            url: customUrl,
            method: 'GET',
            timestamp: new Date().toLocaleTimeString(),
            success: response.ok,
            duration,
            recordCount: result.success ? (result.totalResults || result.data?.length || 0) : 0
         }, ...prev.slice(0, 9)]);

      } catch (error) {
         const endTime = Date.now();
         const duration = endTime - startTime;

         setResults(prev => ({
            ...prev,
            custom: {
               success: false,
               error: error.message
            }
         }));
         setResponseTime(duration);

         setRequestHistory(prev => [{
            id: Date.now(),
            endpoint: 'Custom Request',
            url: customUrl,
            method: 'GET',
            timestamp: new Date().toLocaleTimeString(),
            success: false,
            duration,
            error: error.message
         }, ...prev.slice(0, 9)]);

      } finally {
         setLoading(prev => ({ ...prev, custom: false }));
      }
   };

   const copyUrl = async (url) => {
      try {
         const baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
         await navigator.clipboard.writeText(`${baseURL}${url}`);
      } catch (error) {
         console.error('Failed to copy URL:', error);
      }
   };

   const togglePipeline = (questionId) => {
      setShowPipeline(prev => ({
         ...prev,
         [questionId]: !prev[questionId]
      }));
   };

   const PipelineExplanation = ({ pipeline, explanation }) => {
      return (
         <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
               <Code className="h-4 w-4" />
               Aggregation Pipeline
            </h4>
            <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
               {JSON.stringify(pipeline, null, 2)}
            </pre>

            {explanation && (
               <div className="mt-3">
                  <h5 className="font-medium text-sm mb-2">Stage Explanations:</h5>
                  <div className="space-y-2">
                     {explanation.stages.map((stage, index) => (
                        <div key={index} className="text-xs">
                           <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                              {stage.stage}
                           </span>
                           <span className="ml-2 text-gray-600">{stage.purpose}</span>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      );
   };

   const ResultDisplay = ({ result, endpointId, endpoint }) => {
      if (!result) return null;

      if (!result.success) {
         return (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
               <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="font-medium text-red-700">Request Failed</span>
                  {responseTime && (
                     <Badge variant="outline" className="text-xs">
                        {responseTime}ms
                     </Badge>
                  )}
               </div>
               <p className="text-red-700 text-sm font-mono">{result.error}</p>
            </div>
         );
      }

      return (
         <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-700">
                     Success: {result.totalResults || result.data?.length || 0} records
                  </span>
                  {responseTime && (
                     <Badge variant="outline" className="text-xs">
                        {responseTime}ms
                     </Badge>
                  )}
               </div>

               {endpoint && (
                  <div className="flex items-center gap-2">
                     <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyUrl(endpoint.url)}
                        className="flex items-center gap-1 text-xs"
                     >
                        <Copy className="h-3 w-3" />
                        Copy URL
                     </Button>
                     <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePipeline(endpointId)}
                        className="flex items-center gap-1"
                     >
                        {showPipeline[endpointId] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        {showPipeline[endpointId] ? 'Hide' : 'Show'} Pipeline
                     </Button>
                  </div>
               )}
            </div>

            {showPipeline[endpointId] && result.pipeline && (
               <PipelineExplanation
                  pipeline={result.pipeline}
                  explanation={result.explanation}
               />
            )}

            <DataTableDisplay
               data={result.data}
               title={`API Response (${result.totalResults || result.data?.length || 0} records)`}
               type="success"
            />
         </div>
      );
   };

   return (
      <div className="space-y-6">
         {/* API Testing Interface */}
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  MongoDB Aggregation Pipeline Interactive Learning
               </CardTitle>
               <CardDescription>
                  Learn MongoDB aggregation pipelines through hands-on practice. Execute real queries and see how each pipeline stage works.
                  Perfect for understanding aggregation concepts from basic filtering to advanced operations.
               </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

               {/* Custom URL Testing */}
               <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                     <Code className="h-4 w-4" />
                     Custom URL Testing
                  </h3>
                  <div className="flex gap-2">
                     <Badge variant="outline" className="px-2 py-1">GET</Badge>
                     <div className="flex-1 flex gap-2">
                        <span className="text-sm text-gray-600 flex items-center">
                           {import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'}
                        </span>
                        <Input
                           placeholder="/questions/active-users"
                           value={customUrl}
                           onChange={(e) => setCustomUrl(e.target.value)}
                           className="font-mono text-sm"
                        />
                        <Button
                           onClick={executeCustomUrl}
                           disabled={loading.custom || !customUrl}
                           className="flex items-center gap-2"
                        >
                           <Play className="h-4 w-4" />
                           {loading.custom ? 'Testing...' : 'Test'}
                        </Button>
                     </div>
                  </div>

                  <ResultDisplay result={results.custom} endpointId="custom" />
               </div>

               {/* Predefined Endpoints */}
               <div className="space-y-3">
                  <div className="flex items-center justify-between">
                     <h3 className="font-semibold flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        MongoDB Aggregation Pipeline Learning Questions
                     </h3>
                     <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                           <div className="w-2 h-2 bg-green-400 rounded"></div>
                           <span>Beginner</span>
                        </div>
                        <div className="flex items-center gap-1">
                           <div className="w-2 h-2 bg-yellow-400 rounded"></div>
                           <span>Intermediate</span>
                        </div>
                        <div className="flex items-center gap-1">
                           <div className="w-2 h-2 bg-red-400 rounded"></div>
                           <span>Advanced</span>
                        </div>
                     </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                     Explore MongoDB aggregation pipelines through practical examples. Each question demonstrates different concepts
                     and stages, from basic filtering to complex multi-stage operations. Execute them to see the pipeline in action!
                  </p>

                  {endpoints.map(endpoint => (
                     <div key={endpoint.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                           <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                 <Badge
                                    variant={endpoint.method === 'GET' ? 'default' : 'secondary'}
                                    className="text-xs px-2 py-1"
                                 >
                                    {endpoint.method}
                                 </Badge>
                                 <Badge
                                    variant="outline"
                                    className={`text-xs px-2 py-1 ${endpoint.level === 'Beginner' ? 'bg-green-50 text-green-700 border-green-200' :
                                       endpoint.level === 'Intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                          'bg-red-50 text-red-700 border-red-200'
                                       }`}
                                 >
                                    {endpoint.level}
                                 </Badge>
                                 <h4 className="font-semibold">{endpoint.name}</h4>
                              </div>
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block mb-2">
                                 {import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'}{endpoint.url}
                              </code>
                              <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                              {endpoint.concepts && (
                                 <div className="flex flex-wrap gap-1 mb-2">
                                    <span className="text-xs text-gray-500 mr-2">Concepts:</span>
                                    {endpoint.concepts.map((concept, idx) => (
                                       <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0.5">
                                          {concept}
                                       </Badge>
                                    ))}
                                 </div>
                              )}
                           </div>
                           <Button
                              onClick={() => executeEndpoint(endpoint)}
                              disabled={loading[endpoint.id]}
                              className="flex items-center gap-2"
                           >
                              <Play className="h-4 w-4" />
                              {loading[endpoint.id] ? 'Running...' : 'Execute'}
                           </Button>
                        </div>

                        <ResultDisplay
                           result={results[endpoint.id]}
                           endpointId={endpoint.id}
                           endpoint={endpoint}
                        />
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Request History */}
         {requestHistory.length > 0 && (
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Clock className="h-5 w-5" />
                     Request History
                  </CardTitle>
                  <CardDescription>
                     Recent API requests and their results
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="space-y-2">
                     {requestHistory.map(request => (
                        <div key={request.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                           <div className="flex items-center gap-3">
                              {request.success ? (
                                 <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                 <AlertCircle className="h-4 w-4 text-red-500" />
                              )}
                              <Badge variant="outline" className="text-xs">{request.method}</Badge>
                              <span className="text-sm font-mono">{request.url}</span>
                           </div>
                           <div className="flex items-center gap-3 text-xs text-gray-500">
                              {request.success && (
                                 <span>{request.recordCount} records</span>
                              )}
                              <span>{request.duration}ms</span>
                              <span>{request.timestamp}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         )}
      </div>
   );
};

export default AggregationQuestions;