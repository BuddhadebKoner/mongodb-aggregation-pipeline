#!/bin/bash

# MongoDB Aggregation Pipeline Practice Environment Setup Script

echo "🚀 Setting up MongoDB Aggregation Pipeline Practice Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Setup Backend
echo "📦 Setting up backend..."
cd server
npm install

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "📝 Created .env file in server directory. Please edit it with your MongoDB connection string."
fi

# Setup Frontend
echo "📦 Setting up frontend..."
cd ../frontend
npm install

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "📝 Created .env file in frontend directory."
fi

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit server/.env with your MongoDB connection string"
echo "2. Start backend: cd server && npm run dev"
echo "3. Start frontend: cd frontend && npm run dev"
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "🎉 Happy learning with MongoDB Aggregation Pipelines!"