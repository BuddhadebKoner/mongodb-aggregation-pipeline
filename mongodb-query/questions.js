// Question 1: Fetch all users where isActive = true
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