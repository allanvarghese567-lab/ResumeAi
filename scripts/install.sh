#!/bin/bash
# Installation script for AI Resume Builder

echo "🚀 AI Resume Builder - Installation Guide"
echo "=========================================="
echo ""

# Check Node.js version
echo "📋 Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "✓ Node.js $NODE_VERSION installed"
echo ""

# Check npm version
echo "📋 Checking npm version..."
NPM_VERSION=$(npm -v)
echo "✓ npm $NPM_VERSION installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
echo ""

npm install

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Dependencies installed successfully!"
  echo ""
  echo "📝 Next steps:"
  echo ""
  echo "1. Set up environment variables:"
  echo "   cp .env.example .env.local"
  echo ""
  echo "2. Configure your .env.local with:"
  echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
  echo "   - CLERK_SECRET_KEY"
  echo "   - NEXT_PUBLIC_SUPABASE_URL"
  echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
  echo "   - OPENAI_API_KEY"
  echo ""
  echo "3. Run development server:"
  echo "   npm run dev"
  echo ""
  echo "4. Open your browser:"
  echo "   http://localhost:3000"
  echo ""
else
  echo ""
  echo "❌ Installation failed. Please check the error messages above."
  exit 1
fi
