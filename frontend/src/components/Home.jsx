import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../api/services';
import { Database, Brain, Upload, Play, CheckCircle, AlertCircle, ArrowRight, Users, BookOpen, PenTool, Github, Star, GitFork, Code2 } from 'lucide-react';

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
   const handleFeatureClick = (feature) => {
      if (feature.isExternal) {
         window.open(feature.route, '_blank');
      } else {
         navigate(feature.route);
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
         icon: Code2,
         title: 'Learning Modules',
         description: 'Explore 8 structured questions from basic filtering to advanced operations',
         action: 'View Questions',
         route: '/practice',
         color: 'purple',
         isQuestionPreview: true
      },
      {
         icon: Github,
         title: 'GitHub Repository',
         description: 'Fork this project and practice MongoDB pipelines on your own',
         action: 'View on GitHub',
         route: 'https://github.com/BuddhadebKoner/mongodb-aggregation-pipeline',
         color: 'gray',
         isExternal: true
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
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
               <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200">
                  <CardHeader className="pb-4">
                     <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-full ${feature.color === 'blue' ? 'bg-blue-100' :
                              feature.color === 'green' ? 'bg-green-100' :
                                 feature.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
                           }`}>
                           <feature.icon className={`h-8 w-8 ${feature.color === 'blue' ? 'text-blue-600' :
                                 feature.color === 'green' ? 'text-green-600' :
                                    feature.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                              }`} />
                        </div>
                        <Badge variant="outline" className="text-xs">
                           {feature.isExternal ? 'External' :
                              feature.isQuestionPreview ? 'Learning' :
                                 index === 0 ? 'Setup' : 'Practice'}
                        </Badge>
                     </div>
                     <CardTitle className="text-lg">{feature.title}</CardTitle>
                     <CardDescription className="text-sm">
                        {feature.description}
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     {feature.isQuestionPreview ? (
                        <div className="space-y-3">
                           <Button
                              onClick={() => handleFeatureClick(feature)}
                              className="w-full flex items-center justify-center gap-2"
                              size="sm"
                           >
                              {feature.action}
                              <ArrowRight className="h-4 w-4" />
                           </Button>
                        </div>
                     ) : feature.isExternal ? (
                        <div className="space-y-3">
                           <Button
                              onClick={() => handleFeatureClick(feature)}
                              className="w-full flex items-center justify-center gap-2"
                              variant="outline"
                              size="sm"
                           >
                              <Github className="h-4 w-4" />
                              {feature.action}
                           </Button>
                        </div>
                     ) : (
                        <Button
                           onClick={() => handleFeatureClick(feature)}
                           className="w-full flex items-center justify-center gap-2"
                           size="sm"
                        >
                           {feature.action}
                           <ArrowRight className="h-4 w-4" />
                        </Button>
                     )}
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

         {/* Project Information Section */}
         <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
            <CardHeader>
               <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <Github className="h-6 w-6" />
                  Open Source Learning
               </CardTitle>
               <CardDescription className="text-center text-base">
                  This is a complete open-source project designed for MongoDB aggregation pipeline learning
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                     <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        What's Included
                     </h3>
                     <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                           <CheckCircle className="h-4 w-4 text-green-500" />
                           Complete React frontend with modern UI
                        </li>
                        <li className="flex items-center gap-2">
                           <CheckCircle className="h-4 w-4 text-green-500" />
                           Node.js backend with MongoDB integration
                        </li>
                        <li className="flex items-center gap-2">
                           <CheckCircle className="h-4 w-4 text-green-500" />
                           20 structured learning questions
                        </li>
                        <li className="flex items-center gap-2">
                           <CheckCircle className="h-4 w-4 text-green-500" />
                           Sample data and setup scripts
                        </li>
                        <li className="flex items-center gap-2">
                           <CheckCircle className="h-4 w-4 text-green-500" />
                           Pipeline visualization and explanation
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <GitFork className="h-5 w-5 text-blue-500" />
                        Get Started
                     </h3>
                     <div className="space-y-3">
                        <Button
                           onClick={() => window.open('https://github.com/BuddhadebKoner/mongodb-aggregation-pipeline', '_blank')}
                           className="w-full flex items-center justify-center gap-2"
                           variant="outline"
                        >
                           <Github className="h-4 w-4" />
                           View on GitHub
                        </Button>
                        <Button
                           onClick={() => window.open('https://github.com/BuddhadebKoner/mongodb-aggregation-pipeline/fork', '_blank')}
                           className="w-full flex items-center justify-center gap-2"
                        >
                           <GitFork className="h-4 w-4" />
                           Fork Repository
                        </Button>
                        <p className="text-xs text-gray-500 text-center">
                           Star ⭐ the repo if you find it helpful for learning!
                        </p>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default Home;