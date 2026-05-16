$Password = Read-Host "Please enter your new Supabase database password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($Password)
$PlainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

if ([string]::IsNullOrWhiteSpace($PlainPassword)) {
    Write-Host "Password cannot be empty!" -ForegroundColor Red
    exit 1
}

$EnvFiles = @(".env", ".env.local")

foreach ($file in $EnvFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file
        $content = $content -replace "\[YOUR-PASSWORD\]", $PlainPassword
        Set-Content -Path $file -Value $content
        Write-Host "Updated $file successfully." -ForegroundColor Green
    } else {
        Write-Host "$file not found." -ForegroundColor Yellow
    }
}

Write-Host "All done! Now you can restart your server." -ForegroundColor Cyan
