# Set the remote URL with the token
git remote set-url origin https://xycho786-ui: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@github.com/xycho786-ui/workerapp.git

# Push to the base branch
git push origin base -f

Write-Host "Git push completed! You can delete this script now."
Read-Host -Prompt "Press Enter to close"
