#!/bin/bash

echo "🚀 QR Attendance App - Quick Start"
echo "=================================="
echo ""

# Check if MongoDB is running
echo "📊 Checking MongoDB status..."
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB is not running"
    echo ""
    echo "To start MongoDB:"
    echo "  • macOS (Homebrew): brew services start mongodb-community"
    echo "  • Linux: sudo systemctl start mongod"
    echo "  • Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
    echo ""
    read -p "Press Enter to continue anyway or Ctrl+C to exit..."
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Backend
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Frontend
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "To run the application:"
echo ""
echo "1. Start the backend:"
echo "   cd backend && npm run dev"
echo ""
echo "2. In a new terminal, start the frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Open http://localhost:5173 in your browser"
echo ""
