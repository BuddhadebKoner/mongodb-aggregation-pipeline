import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { loadUsers, loadBooks, loadAuthors, clearAllData } from './controllers/dataController.js';
import { getActiveUsers, getAverageAge, getAverageAgeByGender, getMostPopularFruits, getUserCountByGender } from './controllers/aggregationController.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ MongoDB Connected Successfully');
   } catch (error) {
      console.error('❌ MongoDB Connection Error:', error.message);
      process.exit(1);
   }
};

// Connect to database
connectDB();

// Middleware
app.use(cors({
   origin: [
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000', // Alternative local
      'https://*.vercel.app',  // Vercel deployments
      process.env.FRONTEND_URL // Production frontend URL
   ].filter(Boolean), // Remove undefined values
   credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' })); // Increased limit for bulk data loading

// Basic route
app.get('/', (req, res) => {
   res.json({
      message: 'MongoDB Aggregation Pipeline Practice Server',
      status: 'Running',
      endpoints: {
         'POST /load-users': 'Load user data',
         'POST /load-books': 'Load book data',
         'POST /load-authors': 'Load author data',
         'DELETE /clear-all': 'Clear all data',
         'GET /questions/active-users': 'Get all active users (Aggregation Practice)',
      }
   });
});

// Data loading routes
app.post('/load-users', loadUsers);
app.post('/load-books', loadBooks);
app.post('/load-authors', loadAuthors);
app.delete('/clear-all', clearAllData);

// Aggregation Practice Routes
app.get('/questions/active-users', getActiveUsers);
app.get('/questions/get-user-count-by-gender', getUserCountByGender);
app.get('/questions/get-average-age', getAverageAge);
app.get('/questions/get-average-age-by-gender', getAverageAgeByGender);
app.get('/questions/get-most-popular-fruits', getMostPopularFruits);

// Start server
app.listen(PORT, () => {
   console.log(`🚀 Server running on port ${PORT}`);
   console.log(`📚 MongoDB Aggregation Practice Environment Ready!`);
});