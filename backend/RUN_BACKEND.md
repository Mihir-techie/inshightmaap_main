# How to Run the Flask Backend

## Quick Start (Easiest Method)

**Double-click `start_backend.bat`** - This script will:
- Automatically check for Python
- Install all missing dependencies
- Start the Flask backend

## Manual Method

### Step 1: Install Dependencies (One Time Setup)

**Option A: Use the installation script**
```bash
quick_install.bat
```

**Option B: Manual installation**
```bash
python -m pip install Flask Flask-CORS requests reportlab python-dotenv --user
```

**Option C: From requirements.txt**
```bash
python -m pip install -r requirements.txt --user
```

### Step 2: Start the Backend

```bash
python app.py
```

The backend will start at: **http://localhost:5000**

### Step 3: Verify It's Running

Open in browser or run:
```bash
curl http://localhost:5000/api/health
```

You should see: `{"message":"Flask backend is running","status":"ok"}`

## Troubleshooting

### If you get "ModuleNotFoundError"

1. **Use the startup script:**
   ```bash
   start_backend.bat
   ```
   This automatically installs missing packages.

2. **Manually install packages:**
   ```bash
   python -m pip install Flask Flask-CORS requests reportlab python-dotenv --user --upgrade
   ```

3. **Check which Python VS Code is using:**
   - Press `Ctrl+Shift+P` in VS Code
   - Type "Python: Select Interpreter"
   - Make sure it matches the Python where packages are installed

### If packages install but still not found

Your Python might be using a different path. Check:
```bash
python -c "import sys; print(sys.executable)"
python -c "import sys; print('\n'.join(sys.path))"
```

Make sure packages are installed for that specific Python:
```bash
python -m pip install Flask Flask-CORS requests reportlab python-dotenv --upgrade
```

### If port 5000 is already in use

Change the port by creating a `.env` file:
```
FLASK_PORT=5001
```

Or modify `app.py` to use a different port.

## Running with Ollama (For Text Analysis)

1. **Install Ollama** from https://ollama.ai

2. **Start Ollama:**
   ```bash
   ollama serve
   ```

3. **Pull a model:**
   ```bash
   ollama pull llama2
   ```

4. **Start Flask backend:**
   ```bash
   python app.py
   ```

## Quick Commands

| Command | Description |
|---------|-------------|
| `start_backend.bat` | Auto-install dependencies and start Flask |
| `quick_install.bat` | Install all dependencies |
| `python app.py` | Start Flask backend |
| `python verify_installation.py` | Check if all packages are installed |
| `python test_endpoints.py` | Test Flask endpoints (after starting) |

## What Should Work

✅ Flask backend starts without errors  
✅ Health endpoint responds: `http://localhost:5000/api/health`  
✅ Analyze endpoint available: `POST http://localhost:5000/api/analyze`  
✅ PDF generation endpoint available: `POST http://localhost:5000/api/generate-pdf`  

If all these work, your backend is ready! 🎉
