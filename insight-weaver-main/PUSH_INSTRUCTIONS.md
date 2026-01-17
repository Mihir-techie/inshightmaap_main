# How to Push to GitHub - Step by Step Guide

## Quick Push (If GitHub CLI is installed)

```bash
cd "C:\Users\HP\Downloads\insight-weaver-main\insight-weaver-main"
gh auth login
git push -u origin main
```

## Manual Push with Personal Access Token

### Step 1: Generate Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Insight Main Push"
4. Select scopes: **Check `repo`** (this gives full repository access)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Push Using Token

Open terminal in VS Code or Command Prompt and run:

```bash
cd "C:\Users\HP\Downloads\insight-weaver-main\insight-weaver-main"
git push -u origin main
```

When prompted:
- **Username**: Enter your GitHub username (`Mihir-techie`)
- **Password**: **Paste the token** (not your GitHub password!)

## Alternative: Use GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository
4. Select: `C:\Users\HP\Downloads\insight-weaver-main\insight-weaver-main`
5. Click "Publish repository" button

## Alternative: Use SSH Key

### Step 1: Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for default location
# Press Enter for no passphrase (or set one)
```

### Step 2: Add SSH Key to GitHub

1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Or on Windows:
   type C:\Users\HP\.ssh\id_ed25519.pub
   ```

2. Go to: https://github.com/settings/keys
3. Click "New SSH key"
4. Paste the key and save

### Step 3: Change Remote to SSH

```bash
cd "C:\Users\HP\Downloads\insight-weaver-main\insight-weaver-main"
git remote set-url origin git@github.com:Mihir-techie/insightmain-.git
git push -u origin main
```

## Troubleshooting

### Error: "Authentication failed"

**Solution**: Use Personal Access Token (see Step 2 above)

### Error: "Repository not found"

**Solution**: Make sure the repository exists at https://github.com/Mihir-techie/insightmain-

### Error: "Permission denied"

**Solution**: Check that you have write access to the repository

### Error: "Could not resolve hostname"

**Solution**: Check your internet connection

## Quick Command Summary

```bash
# Navigate to project
cd "C:\Users\HP\Downloads\insight-weaver-main\insight-weaver-main"

# Check status
git status

# Push to GitHub (will prompt for credentials)
git push -u origin main
```

**When prompted, use your GitHub username and Personal Access Token (not password)!**
