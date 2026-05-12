@echo off
echo =========================================
echo       Fixing and Restarting Server
echo =========================================
echo.
echo 1. Stopping stuck server processes...
taskkill /F /IM node.exe /T >nul 2>&1

echo.
echo 2. Removing duplicate middleware...
if exist "src\middleware.ts" del /f "src\middleware.ts"

echo.
echo 3. Cleaning old Next.js cache (Force)...
if exist ".next" (
    echo Attempting to remove .next directory...
    rmdir /s /q ".next"
    if exist ".next" (
        echo Warning: .next still exists. Try deleting it manually.
    )
)

echo.
echo 4. Installing missing dependencies...
call npm install

echo.
echo 5. Repairing database client and pushing schema...
call npx prisma generate
call npx prisma db push

echo.
echo 6. Starting a fresh server...
call npm run dev

pause
