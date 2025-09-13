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

   // Available endpoints
   const endpoints = [
      {
         id: 'active-users',
         name: 'Active Users',
         method: 'GET',
         url: '/questions/active-users',
         description: 'Get all active users using aggregation pipeline',
         service: aggregationService.getActiveUsers
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
                  MongoDB Aggregation API Tester
               </CardTitle>
               <CardDescription>
                  Test MongoDB aggregation endpoints directly. Like Postman but for your aggregation practice.
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
                  <h3 className="font-semibold flex items-center gap-2">
                     <Users className="h-4 w-4" />
                     Available Aggregation Endpoints
                  </h3>

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
                                 <h4 className="font-semibold">{endpoint.name}</h4>
                              </div>
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                                 {import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'}{endpoint.url}
                              </code>
                              <p className="text-sm text-gray-600 mt-2">{endpoint.description}</p>
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