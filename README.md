# 🍃 MongoDB Aggregation Pipeline Practice Hub

**Master MongoDB aggregation pipelines through hands-on practice with real-world schemas**

A focused learning environment designed to help developers practice MongoDB aggregation pipelines using three interconnected collections: **Users**, **Books**, and **Authors**. Perfect for beginners to advanced developers who want to master complex aggregation operations.

## 🎯 What You'll Learn

### **Core Aggregation Stages**
- `$match` - Filter documents based on conditions
- `$project` - Select and transform fields
- `$group` - Group documents and perform calculations
- `$sort` - Order your results
- `$limit` / `$skip` - Implement pagination
- `$lookup` - Join collections (SQL-like joins)
- `$unwind` - Deconstruct arrays
- `$addFields` - Add computed fields
- `$facet` - Multiple parallel pipelines

### **Advanced Operations**
- Complex multi-stage pipelines
- Nested object manipulation
- Array operations and transformations
- Conditional expressions with `$cond`, `$switch`
- Date operations and grouping
- Text search and regex patterns
- Performance optimization techniques

## 📊 Practice Schemas

### 👥 **Users Collection**
```javascript
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com", 
  "isActive": true,
  "age": 28,
  "city": "New York",
  "registrationDate": ISODate("2023-01-15"),
  "preferences": {
    "notifications": true,
    "theme": "dark"
  },
  "tags": ["premium", "verified"]
}
```

### 📚 **Books Collection**
```javascript
{
  "_id": 1,
  "title": "The Great Gatsby",
  "author_id": 100,
  "genre": "Classic",
  "publishedYear": 1925,
  "pages": 180,
  "rating": 4.5,
  "price": 12.99,
  "inStock": true,
  "reviews": [
    { "user": "alice", "rating": 5, "comment": "Masterpiece!" },
    { "user": "bob", "rating": 4, "comment": "Great read" }
  ]
}
```

### ✍️ **Authors Collection**
```javascript
{
  "_id": 100,
  "name": "F. Scott Fitzgerald",
  "birth_year": 1896,
  "death_year": 1940,
  "nationality": "American",
  "genres": ["Classic", "Fiction", "Drama"],
  "awards": ["Pulitzer Prize"],
  "biography": "American novelist and short story writer..."
}
```

## 🚀 Quick Start

### 1. **Clone & Setup**
```bash
git clone https://github.com/BuddhadebKoner/mongodb-aggregation-pipeline.git
cd mongodb-aggregation-pipeline

# Setup backend
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string

# Setup frontend (optional - for visual interface)
cd ../frontend  
npm install
```

### 2. **Start the Environment**
```bash
# Start backend server
cd server && npm run dev

# Start frontend (optional)
cd frontend && npm run dev
```

### 3. **Load Sample Data**
Visit `http://localhost:5173` and use the **Data Loader** tab to populate your database with sample data, or use MongoDB Compass/CLI.

## 🎓 Aggregation Practice Examples

### **Beginner Level**

#### 1. **Find Active Users**
```javascript
db.users.aggregate([
  { $match: { isActive: true } },
  { $project: { name: 1, email: 1, city: 1 } }
])
```

#### 2. **Books by Genre**
```javascript
db.books.aggregate([
  { $match: { genre: "Fiction" } },
  { $sort: { rating: -1 } },
  { $limit: 5 }
])
```

### **Intermediate Level**

#### 3. **Users by City with Count**
```javascript
db.users.aggregate([
  { $group: { 
      _id: "$city", 
      userCount: { $sum: 1 },
      avgAge: { $avg: "$age" }
  }},
  { $sort: { userCount: -1 } }
])
```

#### 4. **Books with Author Information**
```javascript
db.books.aggregate([
  { $lookup: {
      from: "authors",
      localField: "author_id", 
      foreignField: "_id",
      as: "authorInfo"
  }},
  { $unwind: "$authorInfo" },
  { $project: {
      title: 1,
      "authorInfo.name": 1,
      "authorInfo.nationality": 1,
      rating: 1
  }}
])
```

### **Advanced Level**

#### 5. **Complex Analytics Pipeline**
```javascript
db.books.aggregate([
  // Join with authors
  { $lookup: {
      from: "authors", 
      localField: "author_id",
      foreignField: "_id", 
      as: "author"
  }},
  { $unwind: "$author" },
  
  // Add computed fields
  { $addFields: {
      decade: { $subtract: [ 
        "$publishedYear", 
        { $mod: ["$publishedYear", 10] }
      ]},
      reviewCount: { $size: "$reviews" },
      avgReviewRating: { $avg: "$reviews.rating" }
  }},
  
  // Group by decade and author nationality
  { $group: {
      _id: {
        decade: "$decade",
        nationality: "$author.nationality"
      },
      bookCount: { $sum: 1 },
      avgRating: { $avg: "$rating" },
      totalPages: { $sum: "$pages" },
      authors: { $addToSet: "$author.name" }
  }},
  
  // Sort and format results
  { $sort: { "_id.decade": 1 } },
  { $project: {
      decade: "$_id.decade",
      nationality: "$_id.nationality", 
      bookCount: 1,
      avgRating: { $round: ["$avgRating", 2] },
      totalPages: 1,
      uniqueAuthors: { $size: "$authors" },
      _id: 0
  }}
])
```

#### 6. **Multi-Pipeline Faceted Search**
```javascript
db.books.aggregate([
  { $facet: {
      // Books by rating ranges
      "byRating": [
        { $bucket: {
            groupBy: "$rating",
            boundaries: [0, 2, 3, 4, 5],
            default: "Other",
            output: { count: { $sum: 1 } }
        }}
      ],
      
      // Top genres
      "topGenres": [
        { $group: { _id: "$genre", count: { $sum: 1 } }},
        { $sort: { count: -1 } },
        { $limit: 5 }
      ],
      
      // Publication timeline
      "timeline": [
        { $group: { 
            _id: { $subtract: [ "$publishedYear", { $mod: ["$publishedYear", 10] } ] },
            books: { $sum: 1 }
        }},
        { $sort: { "_id": 1 } }
      ]
  }}
])
```

## 🛠️ Available Practice Endpoints

### **Data Management**
- `POST /load-users` - Load sample user data
- `POST /load-books` - Load sample book data  
- `POST /load-authors` - Load sample author data
- `DELETE /clear-all` - Reset all collections

### **Practice Questions**
- `GET /questions/active-users` - Get active users with aggregation
- Add more endpoints by contributing!

## 🎯 Learning Path

### **Week 1: Foundations**
- Master `$match`, `$project`, `$sort`, `$limit`
- Practice basic filtering and field selection
- Work with simple grouping operations

### **Week 2: Data Relationships** 
- Learn `$lookup` for joining collections
- Practice `$unwind` for array operations
- Combine books with author information

### **Week 3: Advanced Grouping**
- Complex `$group` operations with multiple fields
- Use `$bucket` and `$bucketAuto` for data distribution
- Calculate statistics and aggregations

### **Week 4: Production Patterns**
- Multi-stage pipelines for real scenarios
- Performance optimization with indexes
- `$facet` for parallel pipeline execution

## 💡 Practice Challenges

### **Challenge 1: User Analytics**
Create a pipeline that shows:
- Users per city
- Average age by city
- Most active registration months

### **Challenge 2: Book Recommendation Engine**
Build a pipeline that:
- Finds books similar to a given book
- Groups by genre and rating
- Includes author information

### **Challenge 3: Sales Dashboard**
Develop analytics showing:
- Revenue by genre and year
- Top-performing authors
- Seasonal reading patterns

### **Challenge 4: Search & Filter**
Implement a system that:
- Searches books by title/author
- Filters by multiple criteria
- Supports pagination and sorting

## 📈 MongoDB Skills You'll Master

- **Pipeline Design**: Structure complex multi-stage operations
- **Performance**: Optimize queries with proper indexing
- **Data Modeling**: Understand document relationships
- **Aggregation Operators**: Master 50+ aggregation operators
- **Real-world Patterns**: Apply aggregation in production scenarios

## 🔧 Contributing Practice Questions

Add new aggregation challenges:

1. **Create Controller Function** (`server/controllers/aggregationController.js`):
```javascript
export const yourNewQuestion = async (req, res) => {
  try {
    const pipeline = [
      // Your aggregation pipeline here
    ];
    
    const result = await YourModel.aggregate(pipeline);
    
    res.json({
      success: true,
      totalResults: result.length,
      data: result,
      pipeline: pipeline,
      explanation: {
        stages: [
          { stage: "$match", purpose: "Filter documents" },
          // ... more explanations
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

2. **Add Route** (`server/server.js`):
```javascript
app.get('/questions/your-new-question', yourNewQuestion);
```

3. **Update Frontend** (optional) - Add endpoint to the practice interface

## 🎓 Why This Approach Works

- **Real Schemas**: Practice with realistic, interconnected data
- **Progressive Learning**: Start simple, build complexity gradually  
- **Visual Feedback**: See results immediately in table/JSON format
- **Production Ready**: Learn patterns used in real applications
- **Community Driven**: Contribute and learn from others

## � Additional Resources

- [MongoDB Aggregation Documentation](https://docs.mongodb.com/manual/aggregation/)
- [Aggregation Pipeline Quick Reference](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/)
- [MongoDB University](https://university.mongodb.com/) - Free courses

---

**🚀 Start practicing now and become a MongoDB aggregation expert!**

*This environment provides everything you need to master MongoDB aggregation pipelines through hands-on practice with realistic data structures.*