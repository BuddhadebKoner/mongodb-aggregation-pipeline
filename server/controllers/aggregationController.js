import User from '../model/user.js';
import Book from '../model/books.js';
import Author from '../model/author.js';

// Question 1: Fetch all users where isActive = true
export const getActiveUsers = async (req, res) => {
   try {
      console.log('🔍 Executing Aggregation Pipeline: Find Active Users');

      // Aggregation Pipeline
      const pipeline = [
         {
            $match: {
               isActive: true
            }
         },
         {
            $project: {
               _id: 1,
               name: 1,
               isActive: 1,
               age: 1,
               gender: 1,
               eyeColor: 1,
               favoriteFruit: 1,
               'company.title': 1,
               'company.email': 1,
               registered: 1
            }
         }
      ];

      // Execute aggregation
      const result = await User.aggregate(pipeline);

      res.status(200).json({
         success: true,
         question: "Fetch all users where isActive = true",
         pipeline: pipeline,
         explanation: {
            stages: [
               {
                  stage: "$match",
                  purpose: "Filter documents where isActive field equals true",
                  syntax: "{ $match: { isActive: true } }"
               },
               {
                  stage: "$project",
                  purpose: "Select specific fields to return in the result",
                  syntax: "{ $project: { field1: 1, field2: 1, ... } }"
               }
            ]
         },
         totalResults: result.length,
         data: result
      });

      console.log(`✅ Found ${result.length} active users`);
   } catch (error) {
      console.error('❌ Error in getActiveUsers:', error);
      res.status(500).json({
         success: false,
         message: 'Error executing aggregation pipeline',
         error: error.message
      });
   }
};