@echo off
echo 🚀 Setting up MongoDB Aggregation Pipeline Practice Environment...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version

REM Setup Backend
echo 📦 Setting up backend...
cd server
call npm install

if not exist ".env" (
    copy .env.example .env
    echo 📝 Created .env file in server directory. Please edit it with your MongoDB connection string.
)

REM Setup Frontend
echo 📦 Setting up frontend...
cd ..\frontend
call npm install

if not exist ".env" (
    copy .env.example .env
    echo 📝 Created .env file in frontend directory.
)

echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo 1. Edit server\.env with your MongoDB connection string
echo 2. Start backend: cd server ^&^& npm run dev
echo 3. Start frontend: cd frontend ^&^& npm run dev
echo 4. Open http://localhost:5173 in your browser
echo.
echo 🎉 Happy learning with MongoDB Aggregation Pipelines!
pause