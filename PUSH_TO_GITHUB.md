# Push to GitHub - Quick Guide

## ✅ Repository Setup Complete!

The Git repository has been initialized and the remote has been added.

**Repository**: https://github.com/Mihir-techie/insightmain-.git

## 🚀 To Push Your Code

Run these commands in your terminal:

```bash
cd "C:\Users\HP\Downloads\insight-weaver-main\insight-weaver-main"
git push -u origin main
```

## 📝 If You Need to Set Git User Info First

```bash
git config user.name "Mihir-techie"
git config user.email "your-email@example.com"
```

## 🔐 Authentication

When you push, GitHub will prompt for credentials. You have two options:

### Option 1: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` permissions
3. Copy the token
4. Use the token as your password when prompted

### Option 2: GitHub CLI
```bash
gh auth login
git push -u origin main
```

## ✅ Verify After Pushing

Visit: https://github.com/Mihir-techie/insightmain-

You should see:
- All your project files
- README.md showing "Insight Main"
- Frontend and backend folders
- All documentation files

## 📌 Summary of Changes

✅ Replaced "Lovable" with "Insight Main" in:
   - `index.html` (page title and meta tags)
   - `README.md` (project name and descriptions)

✅ Git repository initialized
✅ All files committed
✅ Remote repository configured

**Ready to push!** 🎉
