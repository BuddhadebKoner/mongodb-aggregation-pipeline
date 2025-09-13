import api from './axios';

// Data Loading Services
export const dataService = {
   // Load users data
   loadUsers: async (userData) => {
      try {
         const response = await api.post('/load-users', userData);
         return response.data;
      } catch (error) {
         throw new Error(error.response?.data?.message || 'Failed to load users');
      }
   },

   // Load books data
   loadBooks: async (bookData) => {
      try {
         const response = await api.post('/load-books', bookData);
         return response.data;
      } catch (error) {
         throw new Error(error.response?.data?.message || 'Failed to load books');
      }
   },

   // Load authors data
   loadAuthors: async (authorData) => {
      try {
         const response = await api.post('/load-authors', authorData);
         return response.data;
      } catch (error) {
         throw new Error(error.response?.data?.message || 'Failed to load authors');
      }
   },

   // Clear all data
   clearAllData: async () => {
      try {
         const response = await api.delete('/clear-all');
         return response.data;
      } catch (error) {
         throw new Error(error.response?.data?.message || 'Failed to clear data');
      }
   },

   // Get server status
   getServerStatus: async () => {
      try {
         const response = await api.get('/');
         return response.data;
      } catch (error) {
         throw new Error('Server is not responding');
      }
   }
};

// Aggregation Questions Services
export const aggregationService = {
   // Question 1: Get active users
   getActiveUsers: async () => {
      try {
         const response = await api.get('/questions/active-users');
         return response.data;
      } catch (error) {
         throw new Error(error.response?.data?.message || 'Failed to get active users');
      }
   },
   // question (bonus) : group based on gender and get
   getUserCountByGender: async () => {
      try {
         const response = await api.get('/questions/get-user-count-by-gender');
         return response.data;
      } catch (error) {
         throw new Error(error.response?.data?.message || 'Failed to get user count by gender');
      }
   },
   // question:2 calculate average age of users
   getAverageAge: async () => {
      try {
         const response = await api.get('/questions/get-average-age');
         return response.data;
      } catch (error) {
         throw new Error(error.response?.data?.message || 'Failed to get average age');
      }
   },
   // question (bonus) : get average age based on gender
   getAverageAgeByGender: async () => {
      try {
         const response = await api.get('/questions/get-average-age-by-gender');
         return response.data;
      } catch (error) {
         throw new Error(error.response?.data?.message || 'Failed to get average age by gender');
      }
   },
   // question:3 get 5 most favorite fruits among users
   getMostPopularFruits: async () => {
      try {
         const response = await api.get('/questions/get-most-popular-fruits');
         return response.data;
      } catch (error) {
         throw new Error(error.response?.data?.message || 'Failed to get most popular fruits');
      }
   }

};

// Utility function to parse JSON safely
export const parseJSON = (jsonString) => {
   try {
      return JSON.parse(jsonString);
   } catch (error) {
      throw new Error('Invalid JSON format');
   }
};

// Validate JSON array
export const validateJSONArray = (data) => {
   if (!Array.isArray(data)) {
      throw new Error('Data must be an array');
   }
   if (data.length === 0) {
      throw new Error('Array cannot be empty');
   }
   return true;
};