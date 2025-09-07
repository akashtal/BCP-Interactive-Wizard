#!/bin/bash

echo "🚀 Starting BCP Interactive Wizard Development Environment"
echo "=================================================="

# Check if MongoDB is running
echo "📊 Checking MongoDB connection..."
if ! nc -z localhost 27017 2>/dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   - On macOS with Homebrew: brew services start mongodb-community"
    echo "   - On Ubuntu: sudo systemctl start mongod"
    echo "   - Or start MongoDB manually"
    echo ""
    read -p "Press Enter to continue anyway (API will fail without MongoDB)..."
fi

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm run install-all

# Seed database with sample data
echo "🌱 Seeding database with sample data..."
cd server
node seed.js
cd ..

# Start the development servers
echo "🎯 Starting development servers..."
echo "   - Backend: http://localhost:5000"
echo "   - Frontend: http://localhost:3000"
echo "   - API Health: http://localhost:5000/api/health"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

npm run dev