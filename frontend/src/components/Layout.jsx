import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { dataService } from '../api/services';
import { Database, Brain, Home, Wifi, WifiOff, Upload } from 'lucide-react';

const Layout = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const [serverStatus, setServerStatus] = useState({ connected: false, loading: true });

   useEffect(() => {
      checkServerConnection();
      // Check server connection every 30 seconds
      const interval = setInterval(checkServerConnection, 30000);
      return () => clearInterval(interval);
   }, []);

   const checkServerConnection = async () => {
      try {
         await dataService.getServerStatus();
         setServerStatus({ connected: true, loading: false });
      } catch (error) {
         setServerStatus({ connected: false, loading: false });
      }
   };

   const navigationItems = [
      {
         id: 'home',
         label: 'Home',
         icon: Home,
         path: '/',
         description: 'Overview and getting started'
      },
      {
         id: 'data-loader',
         label: 'Data Loader',
         icon: Database,
         path: '/data-loader',
         description: 'Load sample data into MongoDB'
      },
      {
         id: 'practice',
         label: 'Practice Questions',
         icon: Brain,
         path: '/practice',
         description: 'Practice aggregation pipelines'
      }
   ];

   const ServerStatus = () => (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${serverStatus.loading
            ? 'bg-yellow-100 text-yellow-700'
            : serverStatus.connected
               ? 'bg-green-100 text-green-700'
               : 'bg-red-100 text-red-700'
         }`}>
         {serverStatus.loading ? (
            <>
               <div className="animate-spin h-3 w-3 border border-yellow-600 rounded-full border-t-transparent" />
               Checking...
            </>
         ) : serverStatus.connected ? (
            <>
               <Wifi className="h-3 w-3" />
               Connected
            </>
         ) : (
            <>
               <WifiOff className="h-3 w-3" />
               Disconnected
            </>
         )}
      </div>
   );

   const isActiveRoute = (path) => {
      if (path === '/') {
         return location.pathname === '/';
      }
      return location.pathname.startsWith(path);
   };

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                     <Database className="h-8 w-8 text-blue-600" />
                     <div>
                        <h1 className="text-xl font-bold text-gray-900">
                           MongoDB Aggregation Practice
                        </h1>
                        <p className="text-xs text-gray-600 hidden sm:block">
                           Learn aggregation pipelines with hands-on practice
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <ServerStatus />
                     <Button
                        onClick={checkServerConnection}
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                     >
                        Refresh
                     </Button>
                  </div>
               </div>
            </div>
         </header>

         {/* Navigation */}
         <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex space-x-1 py-2">
                  {navigationItems.map((item) => (
                     <Button
                        key={item.id}
                        variant={isActiveRoute(item.path) ? 'default' : 'ghost'}
                        onClick={() => navigate(item.path)}
                        className="flex items-center gap-2 px-4 py-2"
                        size="sm"
                     >
                        <item.icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{item.label}</span>
                        <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                     </Button>
                  ))}
               </div>
            </div>
         </nav>

         {/* Server Connection Alert */}
         {!serverStatus.connected && !serverStatus.loading && (
            <div className="bg-red-50 border-b border-red-200">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                  <Card className="border-red-200 bg-red-50">
                     <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <WifiOff className="h-5 w-5 text-red-500" />
                              <div>
                                 <p className="font-medium text-red-700">Server Connection Error</p>
                                 <p className="text-sm text-red-600">
                                    Cannot connect to MongoDB server at http://localhost:3000
                                 </p>
                              </div>
                           </div>
                           <Button
                              onClick={checkServerConnection}
                              variant="outline"
                              size="sm"
                              className="border-red-300 text-red-700 hover:bg-red-100"
                           >
                              Retry Connection
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         )}

         {/* Main Content */}
         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <Outlet />
         </main>

         {/* Footer */}
         <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                     <p>MongoDB Aggregation Pipeline Practice Environment</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                     <span>Built with React + Vite</span>
                     <span>•</span>
                     <span>ShadCN UI + Tailwind CSS</span>
                     <span>•</span>
                     <span>Express + MongoDB</span>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default Layout;