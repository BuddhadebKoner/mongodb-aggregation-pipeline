import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { JsonDisplay } from './JsonDisplay';
import { Table as TableIcon, Code, RotateCcw, Copy, CheckCircle, AlertCircle } from 'lucide-react';

const DataTableDisplay = ({ data, title, type = 'response' }) => {
   const [viewMode, setViewMode] = useState('table');
   const [copiedType, setCopiedType] = useState(null);

   // Process data to extract table structure
   const { tableData, columns, hasData } = useMemo(() => {
      if (!data || !Array.isArray(data) || data.length === 0) {
         return { tableData: [], columns: [], hasData: false };
      }

      // Get all unique keys from all objects
      const allKeys = new Set();
      data.forEach(item => {
         if (typeof item === 'object' && item !== null) {
            Object.keys(item).forEach(key => allKeys.add(key));
         }
      });

      const columns = Array.from(allKeys);
      return { tableData: data, columns, hasData: true };
   }, [data]);

   const handleCopy = async (copyType) => {
      try {
         let textToCopy = '';

         if (copyType === 'json') {
            textToCopy = JSON.stringify(data, null, 2);
         } else if (copyType === 'csv') {
            // Create CSV format
            if (hasData && columns.length > 0) {
               const header = columns.join(',');
               const rows = tableData.map(row =>
                  columns.map(col => {
                     const value = row[col];
                     // Handle nested objects/arrays and escape commas
                     if (typeof value === 'object' && value !== null) {
                        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
                     }
                     return `"${String(value || '').replace(/"/g, '""')}"`;
                  }).join(',')
               );
               textToCopy = [header, ...rows].join('\n');
            }
         }

         await navigator.clipboard.writeText(textToCopy);
         setCopiedType(copyType);
         setTimeout(() => setCopiedType(null), 2000);
      } catch (error) {
         console.error('Failed to copy:', error);
      }
   };

   const renderCellValue = (value) => {
      if (value === null || value === undefined) {
         return <span className="text-gray-400 italic">null</span>;
      }

      if (typeof value === 'boolean') {
         return (
            <Badge variant={value ? 'default' : 'secondary'}>
               {String(value)}
            </Badge>
         );
      }

      if (typeof value === 'number') {
         return <span className="font-mono text-blue-600">{value}</span>;
      }

      if (typeof value === 'object') {
         return (
            <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
               {JSON.stringify(value)}
            </code>
         );
      }

      if (typeof value === 'string' && value.length > 50) {
         return (
            <span className="block max-w-xs truncate" title={value}>
               {value}
            </span>
         );
      }

      return String(value);
   };

   const getColumnType = (columnName, data) => {
      const sample = data.find(row => row[columnName] !== null && row[columnName] !== undefined);
      if (!sample) return 'text';

      const value = sample[columnName];
      if (typeof value === 'number') return 'number';
      if (typeof value === 'boolean') return 'boolean';
      if (typeof value === 'object') return 'object';
      return 'text';
   };

   if (!data) {
      return null;
   }

   return (
      <Card className="mt-4">
         <CardHeader>
            <div className="flex items-center justify-between">
               <CardTitle className="flex items-center gap-2 text-lg">
                  {type === 'success' ? (
                     <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : type === 'error' ? (
                     <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                     <TableIcon className="h-5 w-5" />
                  )}
                  {title || 'Data Results'}
                  {hasData && (
                     <Badge variant="outline" className="ml-2">
                        {tableData.length} record{tableData.length !== 1 ? 's' : ''}
                     </Badge>
                  )}
               </CardTitle>

               {hasData && (
                  <div className="flex items-center gap-2">
                     <Button
                        variant={viewMode === 'table' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                        className="flex items-center gap-1"
                     >
                        <TableIcon className="h-4 w-4" />
                        Table
                     </Button>
                     <Button
                        variant={viewMode === 'json' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('json')}
                        className="flex items-center gap-1"
                     >
                        <Code className="h-4 w-4" />
                        JSON
                     </Button>

                     <div className="border-l pl-2 ml-2 flex gap-1">
                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => handleCopy('json')}
                           className="flex items-center gap-1"
                        >
                           {copiedType === 'json' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                           ) : (
                              <Copy className="h-4 w-4" />
                           )}
                           JSON
                        </Button>
                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => handleCopy('csv')}
                           className="flex items-center gap-1"
                        >
                           {copiedType === 'csv' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                           ) : (
                              <Copy className="h-4 w-4" />
                           )}
                           CSV
                        </Button>
                     </div>
                  </div>
               )}
            </div>
         </CardHeader>

         <CardContent>
            {!hasData ? (
               <div className="text-center py-8 text-gray-500">
                  <TableIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No data to display</p>
               </div>
            ) : viewMode === 'table' ? (
               <div className="space-y-4">
                  {/* Column type indicators */}
                  <div className="flex flex-wrap gap-2 text-xs">
                     {columns.map(col => (
                        <Badge key={col} variant="outline" className="text-xs">
                           {col}
                           <span className="ml-1 opacity-60">
                              ({getColumnType(col, tableData)})
                           </span>
                        </Badge>
                     ))}
                  </div>

                  {/* Table */}
                  <div className="border rounded-lg overflow-hidden">
                     <div className="max-h-96 overflow-auto">
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 {columns.map(column => (
                                    <TableHead key={column} className="font-medium">
                                       {column}
                                    </TableHead>
                                 ))}
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {tableData.map((row, index) => (
                                 <TableRow key={index}>
                                    {columns.map(column => (
                                       <TableCell key={column} className="max-w-xs">
                                          {renderCellValue(row[column])}
                                       </TableCell>
                                    ))}
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </div>
                  </div>

                  {tableData.length > 10 && (
                     <p className="text-sm text-gray-500 text-center">
                        Showing {tableData.length} records
                     </p>
                  )}
               </div>
            ) : (
               <JsonDisplay data={data} />
            )}
         </CardContent>
      </Card>
   );
};

export default DataTableDisplay;