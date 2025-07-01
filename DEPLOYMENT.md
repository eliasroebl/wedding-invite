# GitHub Pages Deployment Instructions

## 🚨 Manual Setup Required

If you're seeing deployment errors, you need to manually enable GitHub Pages first:

## Step-by-Step Setup:

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### 2. Set Repository Permissions
1. In repository **Settings**
2. Go to **Actions** → **General**
3. Under **Workflow permissions**, ensure:
   - ✅ **Read and write permissions** is selected
   - ✅ **Allow GitHub Actions to create and approve pull requests** is checked
4. Click **Save**

### 3. Trigger Deployment
1. Push any change to the `main` branch, or
2. Go to **Actions** tab and manually run the "Deploy to GitHub Pages" workflow

## 🎉 After Setup

Your wedding invitation will be available at:
**`https://[your-github-username].github.io/wedding-invite/`**

## 🔧 Troubleshooting

- **404 Error**: Make sure GitHub Pages is enabled and set to GitHub Actions
- **Build Fails**: Check the Actions tab for detailed error logs
- **Permissions Error**: Ensure workflow permissions are set correctly

## 📝 Notes

- Deployment happens automatically on every push to `main`
- Build takes ~2-3 minutes
- Changes may take a few minutes to appear on the live site