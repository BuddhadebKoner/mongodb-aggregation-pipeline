import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../api/services';
import { Database, Brain, Upload, Play, CheckCircle, AlertCircle, ArrowRight, Users, BookOpen, PenTool } from 'lucide-react';

const Home = () => {
   const navigate = useNavigate();
   const [stats, setStats] = useState({ users: 0, books: 0, authors: 0, loading: true });
   const [serverStatus, setServerStatus] = useState({ connected: false, loading: true });

   useEffect(() => {
      checkServerStatus();
      fetchDataStats();
   }, []);

   const checkServerStatus = async () => {
      try {
         await dataService.getServerStatus();
         setServerStatus({ connected: true, loading: false });
      } catch (error) {
         setServerStatus({ connected: false, loading: false });
      }
   };

   const fetchDataStats = async () => {
      try {
         // This would need to be implemented in your backend
         // For now, we'll show placeholder stats
         setStats({ users: 0, books: 0, authors: 0, loading: false });
      } catch (error) {
         setStats({ users: 0, books: 0, authors: 0, loading: false });
      }
   };

   const features = [
      {
         icon: Database,
         title: 'Data Management',
         description: 'Load and manage your MongoDB collections with ease',
         action: 'Load Data',
         route: '/data-loader',
         color: 'blue'
      },
      {
         icon: Brain,
         title: 'Practice Questions',
         description: 'Master aggregation pipelines with guided exercises',
         action: 'Start Practice',
         route: '/practice',
         color: 'green'
      }
   ];

   return (
      <div className="space-y-8">
         {/* Hero Section */}
         <div className="text-center">
            <div className="flex justify-center mb-4">
               <div className="p-4 bg-blue-100 rounded-full">
                  <Database className="h-12 w-12 text-blue-600" />
               </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
               MongoDB Aggregation Pipeline
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
               Master MongoDB aggregation pipelines through hands-on practice. Load sample data,
               test queries, and learn with interactive exercises designed for beginners.
            </p>

            {/* Server Status */}
            <div className="flex justify-center mb-8">
               <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${serverStatus.loading
                     ? 'bg-yellow-100 text-yellow-700'
                     : serverStatus.connected
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                  }`}>
                  {serverStatus.loading ? (
                     <>
                        <div className="animate-spin h-4 w-4 border-2 border-yellow-600 rounded-full border-t-transparent" />
                        Checking server connection...
                     </>
                  ) : serverStatus.connected ? (
                     <>
                        <CheckCircle className="h-4 w-4" />
                        Server Connected • MongoDB Ready
                     </>
                  ) : (
                     <>
                        <AlertCircle className="h-4 w-4" />
                        Server Disconnected • Please start your server
                     </>
                  )}
               </div>
            </div>
         </div>

         {/* Feature Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
               <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200">
                  <CardHeader className="pb-4">
                     <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-full ${feature.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                           }`}>
                           <feature.icon className={`h-8 w-8 ${feature.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                              }`} />
                        </div>
                        <Badge variant="outline" className="text-xs">
                           {index === 0 ? 'Setup' : 'Practice'}
                        </Badge>
                     </div>
                     <CardTitle className="text-xl">{feature.title}</CardTitle>
                     <CardDescription className="text-base">
                        {feature.description}
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <Button
                        onClick={() => navigate(feature.route)}
                        className="w-full flex items-center justify-center gap-2"
                        variant={feature.color === 'blue' ? 'default' : 'default'}
                     >
                        {feature.action}
                        <ArrowRight className="h-4 w-4" />
                     </Button>
                  </CardContent>
               </Card>
            ))}
         </div>

         {/* Getting Started Section */}
         <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
               <CardTitle className="text-2xl text-center">Getting Started</CardTitle>
               <CardDescription className="text-center text-base">
                  Follow these simple steps to begin your aggregation pipeline journey
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                     <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                           1
                        </div>
                     </div>
                     <h3 className="font-semibold mb-2">Load Sample Data</h3>
                     <p className="text-sm text-gray-600">
                        Start by loading users, books, and authors data into your MongoDB collections
                     </p>
                  </div>

                  <div className="text-center">
                     <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                           2
                        </div>
                     </div>
                     <h3 className="font-semibold mb-2">Practice Queries</h3>
                     <p className="text-sm text-gray-600">
                        Execute aggregation pipelines and see results in both table and JSON format
                     </p>
                  </div>

                  <div className="text-center">
                     <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                           3
                        </div>
                     </div>
                     <h3 className="font-semibold mb-2">Master Pipelines</h3>
                     <p className="text-sm text-gray-600">
                        Learn each aggregation stage and build complex queries step by step
                     </p>
                  </div>
               </div>

               <div className="flex justify-center mt-8">
                  <Button
                     onClick={() => navigate('/data-loader')}
                     size="lg"
                     className="flex items-center gap-2"
                  >
                     <Upload className="h-5 w-5" />
                     Start with Data Loading
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default Home;