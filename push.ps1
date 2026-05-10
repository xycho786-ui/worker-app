# Push script - reads token from environment variable
# Set GITHUB_TOKEN in your system environment or run:
#   $env:GITHUB_TOKEN = "your_token_here"
# before running this script.

if (-not $env:GITHUB_TOKEN) {
    Write-Error "GITHUB_TOKEN environment variable is not set."
    exit 1
}

$remote = "https://xycho786-ui:$($env:GITHUB_TOKEN)@github.com/xycho786-ui/workerapp.git"
git remote set-url origin $remote

Write-Host "Pushing to base..."
git push origin base -f

Write-Host "Success! Your code is now live."
Read-Host -Prompt "Press Enter to close"
