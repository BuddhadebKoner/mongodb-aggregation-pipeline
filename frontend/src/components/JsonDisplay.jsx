import React, { useState } from 'react';
import { Button } from './ui/button';
import { Copy, ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';

export const JsonDisplay = ({ data, title = "JSON Data", showHeader = true }) => {
   const [isExpanded, setIsExpanded] = useState(true);
   const [copied, setCopied] = useState(false);

   const copyToClipboard = async () => {
      try {
         const textToCopy = JSON.stringify(data, null, 2);
         await navigator.clipboard.writeText(textToCopy);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy:', err);
      }
   };

   if (!data) return null;

   return (
      <div className="border rounded-lg bg-white">
         {showHeader && (
            <div className="flex items-center justify-between p-3 border-b bg-gray-50">
               <div className="flex items-center gap-2">
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => setIsExpanded(!isExpanded)}
                  >
                     {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                  <span className="font-medium text-sm">{title}</span>
               </div>

               <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
               </Button>
            </div>
         )}

         {isExpanded && (
            <div className="p-4 bg-gray-50">
               <pre className="text-sm overflow-auto max-h-96 whitespace-pre-wrap font-mono">
                  {JSON.stringify(data, null, 2)}
               </pre>
            </div>
         )}
      </div>
   );
};

export default JsonDisplay;