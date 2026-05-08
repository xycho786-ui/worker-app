# Set the remote URL with the token again to ensure permissions
git remote set-url origin https://xycho786-ui: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@github.com/xycho786-ui/workerapp.git

# Final Push
Write-Host "Pushing to base..."
git push origin base -f

Write-Host "Success! Your code and the merged dev branch are now live."
Read-Host -Prompt "Press Enter to close"
