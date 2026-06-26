@echo off
REM Installation script for AI Resume Builder (Windows)

echo 🚀 AI Resume Builder - Installation Guide
echo ==========================================
echo.

REM Check Node.js version
echo 📋 Checking Node.js version...
node -v
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    exit /b 1
)
echo.

REM Check npm version
echo 📋 Checking npm version...
npm -v
echo.

REM Install dependencies
echo 📦 Installing dependencies...
echo This may take a few minutes...
echo.

npm install

if errorlevel 1 (
    echo.
    echo ❌ Installation failed. Please check the error messages above.
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.
echo 📝 Next steps:
echo.
echo 1. Set up environment variables:
echo    copy .env.example .env.local
echo.
echo 2. Configure your .env.local with:
echo    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
echo    - CLERK_SECRET_KEY
echo    - NEXT_PUBLIC_SUPABASE_URL
echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY
echo    - OPENAI_API_KEY
echo.
echo 3. Run development server:
echo    npm run dev
echo.
echo 4. Open your browser:
echo    http://localhost:3000
echo.
