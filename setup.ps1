Write-Host "Killing all existing Node.js processes..." -ForegroundColor Cyan
taskkill /F /IM node.exe /T 2>$null

Write-Host "Clearing Next.js cache..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}

Write-Host "Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate

Write-Host "Starting the development server..." -ForegroundColor Green
npm run dev
