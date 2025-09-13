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

// question (bonus) : group based on gender and get
export const getUserCountByGender = async (req, res) => {
   try {
      console.log('🔍 Executing Aggregation Pipeline: Group Users by Gender');
      // Aggregation Pipeline
      const pipeline = [
         {
            $group: {
               _id: '$gender',
               count: { $sum: 1 }
            }
         },
         {
            $project: {
               _id: 0,
               gender: '$_id',
               count: 1
            }
         }
      ];

      // Execute aggregation
      const result = await User.aggregate(pipeline);

      res.status(200).json({
         success: true,
         question: "Group users by gender and get count",
         pipeline: pipeline,
         explanation: {
            stages: [
               {
                  stage: "$group",
                  purpose: "Group documents by gender and count them",
                  syntax: "{ $group: { _id: '$gender', count: { $sum: 1 } } }"
               },
               {
                  stage: "$project",
                  purpose: "Format the output document",
                  syntax: "{ $project: { _id: 0, gender: '$_id', count: 1 } }"
               }
            ]
         },
         totalResults: result.length,
         data: result
      });

      console.log(`✅ Found ${result.length} users by gender`);
   } catch (error) {
      console.error('❌ Error in getUserCountByGender:', error);
      res.status(500).json({
         success: false,
         message: 'Error executing aggregation pipeline',
         error: error.message
      });
   }
};

// question:2 calculate average age of users
export const getAverageAge = async (req, res) => {
   try {
      console.log('🔍 Executing Aggregation Pipeline: Calculate Average Age of Users');
      // Aggregation Pipeline
      const pipeline = [
         {
            $group: {
               _id: "null",
               averageAge: { $avg: '$age' }
            }
         }
      ];

      // Execute aggregation
      const result = await User.aggregate(pipeline);

      res.status(200).json({
         success: true,
         question: "Calculate average age of users",
         pipeline: pipeline,
         totalResults: result.length,
         data: result
      });
   } catch (error) {
      console.error('❌ Error in getAverageAge:', error);
      res.status(500).json({
         success: false,
         message: 'Error executing aggregation pipeline',
         error: error.message
      });
   }
};

// question (bonus) : get average age based on gender
export const getAverageAgeByGender = async (req, res) => {
   try {
      console.log('🔍 Executing Aggregation Pipeline: Calculate Average Age by Gender');
      // Aggregation Pipeline
      const pipeline = [
         {
            $group: {
               _id: '$gender',
               averageAge: { $avg: '$age' }
            }
         },
         {
            $project: {
               _id: 0,
               gender: '$_id',
               averageAge: 1
            }
         }
      ];

      // Execute aggregation
      const result = await User.aggregate(pipeline);

      res.status(200).json({
         success: true,
         question: "Get average age of users by gender",
         pipeline: pipeline,
         totalResults: result.length,
         data: result
      });

      console.log(`✅ Found ${result.length} average ages by gender`);
   } catch (error) {
      console.error('❌ Error in getAverageAgeByGender:', error);
      res.status(500).json({
         success: false,
         message: 'Error executing aggregation pipeline',
         error: error.message
      });
   }
};

// question:3 get 5 most favorite fruits among users
export const getMostPopularFruits = async (req, res) => {
   try {
      console.log('🔍 Executing Aggregation Pipeline: Get Most Popular Fruits');
      // Aggregation Pipeline
      const pipeline = [
         {
            $unwind: '$favoriteFruit'
         },
         {
            $group: {
               _id: '$favoriteFruit',
               count: { $sum: 1 }
            }
         },
         {
            $sort: { count: -1 }
         },
         {
            $limit: 5
         }
      ];

      // Execute aggregation
      const result = await User.aggregate(pipeline);

      res.status(200).json({
         success: true,
         question: "Get 5 most favorite fruits among users",
         pipeline: pipeline,
         totalResults: result.length,
         data: result
      });

      console.log(`✅ Found ${result.length} most popular fruits`);
   } catch (error) {
      console.error('❌ Error in getMostPopularFruits:', error);
      res.status(500).json({
         success: false,
         message: 'Error executing aggregation pipeline',
         error: error.message
      });
   }
};