# Deployment Instructions

This document contains instructions for pushing your code to GitHub.

## Current Repository

**GitHub Repository**: https://github.com/Mihir-techie/insightmain-.git

## Push to GitHub

### First Time Setup

1. **Navigate to the project directory:**
   ```bash
   cd insight-weaver-main
   ```

2. **Check Git status:**
   ```bash
   git status
   ```

3. **Push to GitHub:**
   ```bash
   git push -u origin main
   ```

   If you encounter authentication issues, you may need to:
   - Use a Personal Access Token instead of password
   - Set up SSH keys
   - Use GitHub CLI: `gh auth login`

### Subsequent Updates

After making changes:

```bash
cd insight-weaver-main

# Stage all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push
```

## Authentication

If prompted for credentials when pushing:

**Option 1: Personal Access Token**
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with `repo` permissions
3. Use the token as your password when prompted

**Option 2: SSH Keys**
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add to SSH agent: `ssh-add ~/.ssh/id_ed25519`
3. Add public key to GitHub: Settings > SSH and GPG keys
4. Change remote URL: `git remote set-url origin git@github.com:Mihir-techie/insightmain-.git`

**Option 3: GitHub CLI**
```bash
gh auth login
git push
```

## Verification

After pushing, verify on GitHub:
- Visit: https://github.com/Mihir-techie/insightmain-
- Check that all files are present
- Verify README.md shows "Insight Main"

## Notes

- The `.gitignore` file excludes sensitive files like `.env` and `node_modules`
- Backend `.env` files are excluded for security
- Python virtual environments (`venv/`) are excluded
- Build artifacts (`dist/`, `build/`) are excluded
