#!/bin/bash

echo "🚀 Deploying Wedding Invite to GitHub Pages..."

# Add all changes
git add .

# Commit with timestamp
git commit -m "Deploy updates - $(date)"

# Push to main branch
git push origin main

echo "✅ Deployment triggered! Check https://eliasroebl.github.io/wedding-invite/ in a few minutes."
echo "📊 Monitor deployment progress at: https://github.com/eliasroebl/wedding-invite/actions"
echo ""
echo "🔧 Deployment complete!"
echo "   - All changes have been deployed to GitHub Pages"