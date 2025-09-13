import User from '../model/user.js';
import Book from '../model/books.js';
import Author from '../model/author.js';

// Load Users Data
export const loadUsers = async (req, res) => {
   try {
      const userData = req.body;

      if (!Array.isArray(userData)) {
         return res.status(400).json({
            success: false,
            message: 'Data should be an array of user objects'
         });
      }

      // Clear existing users
      await User.deleteMany({});

      // Insert new users
      const result = await User.insertMany(userData);

      res.status(200).json({
         success: true,
         message: `Successfully loaded ${result.length} users`,
         count: result.length
      });
   } catch (error) {
      console.error('Error loading users:', error);
      res.status(500).json({
         success: false,
         message: 'Error loading user data',
         error: error.message
      });
   }
};

// Load Books Data
export const loadBooks = async (req, res) => {
   try {
      const bookData = req.body;

      if (!Array.isArray(bookData)) {
         return res.status(400).json({
            success: false,
            message: 'Data should be an array of book objects'
         });
      }

      // Clear existing books
      await Book.deleteMany({});

      // Insert new books
      const result = await Book.insertMany(bookData);

      res.status(200).json({
         success: true,
         message: `Successfully loaded ${result.length} books`,
         count: result.length
      });
   } catch (error) {
      console.error('Error loading books:', error);
      res.status(500).json({
         success: false,
         message: 'Error loading book data',
         error: error.message
      });
   }
};

// Load Authors Data
export const loadAuthors = async (req, res) => {
   try {
      const authorData = req.body;

      if (!Array.isArray(authorData)) {
         return res.status(400).json({
            success: false,
            message: 'Data should be an array of author objects'
         });
      }

      // Clear existing authors
      await Author.deleteMany({});

      // Insert new authors
      const result = await Author.insertMany(authorData);

      res.status(200).json({
         success: true,
         message: `Successfully loaded ${result.length} authors`,
         count: result.length
      });
   } catch (error) {
      console.error('Error loading authors:', error);
      res.status(500).json({
         success: false,
         message: 'Error loading author data',
         error: error.message
      });
   }
};

// Clear All Data
export const clearAllData = async (req, res) => {
   try {
      const userResult = await User.deleteMany({});
      const bookResult = await Book.deleteMany({});
      const authorResult = await Author.deleteMany({});

      res.status(200).json({
         success: true,
         message: 'All data cleared successfully',
         deletedCounts: {
            users: userResult.deletedCount,
            books: bookResult.deletedCount,
            authors: authorResult.deletedCount
         }
      });
   } catch (error) {
      console.error('Error clearing data:', error);
      res.status(500).json({
         success: false,
         message: 'Error clearing data',
         error: error.message
      });
   }
};