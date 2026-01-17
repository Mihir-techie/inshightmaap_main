# Troubleshooting Guide

## Common Issues and Solutions

### Issue: `ModuleNotFoundError: No module named 'dotenv'` (or other modules)

**Problem:** VS Code is using a different Python interpreter than the one where packages are installed.

**Solution 1: Use the correct Python interpreter in VS Code**

1. Open VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Python: Select Interpreter"
4. Choose the Python interpreter that has the packages installed
   - Look for one that shows Python 3.x.x (the same version you used to install packages)
   - If you installed with `pip install --user`, make sure VS Code uses that Python

**Solution 2: Install packages for the current interpreter**

1. In VS Code terminal, check which Python is being used:
   ```bash
   python --version
   where python  # Windows
   which python  # Mac/Linux
   ```

2. Install packages explicitly for that interpreter:
   ```bash
   python -m pip install -r requirements.txt --user
   ```

3. Or use the installation script:
   ```bash
   install_dependencies.bat
   ```

**Solution 3: Use a virtual environment (Recommended)**

1. Create a virtual environment in the backend folder:
   ```bash
   python -m venv venv
   ```

2. Activate it:
   ```bash
   # Windows:
   venv\Scripts\activate
   
   # Mac/Linux:
   source venv/bin/activate
   ```

3. Install packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Select this virtual environment in VS Code:
   - Press `Ctrl+Shift+P`
   - Type "Python: Select Interpreter"
   - Choose the interpreter from `./venv/Scripts/python.exe`

### Issue: Flask app won't start

**Check:**
1. Verify all packages are installed:
   ```bash
   python verify_installation.py
   ```

2. Check if port 5000 is already in use:
   ```bash
   netstat -ano | findstr :5000  # Windows
   lsof -i :5000  # Mac/Linux
   ```

3. Try a different port:
   - Create a `.env` file with: `FLASK_PORT=5001`
   - Or modify `app.py` to use a different port

### Issue: "Cannot connect to Ollama"

**Problem:** Ollama is not running or not accessible.

**Solution:**
1. Install Ollama from https://ollama.ai
2. Start Ollama:
   ```bash
   ollama serve
   ```
3. Verify it's running:
   ```bash
   curl http://localhost:11434/api/tags
   ```
4. Pull a model:
   ```bash
   ollama pull llama2
   ```

### Issue: CORS errors in browser

**Solution:**
1. Make sure `FRONTEND_URL` in `.env` matches your frontend URL
2. Check that Flask backend allows the frontend origin in `app.py`
3. Verify both frontend and backend are running

### Issue: PDF generation fails

**Check:**
1. Verify reportlab is installed:
   ```bash
   python -c "import reportlab; print('OK')"
   ```

2. Check Flask logs for specific errors

### Quick Verification Steps

1. **Check Python version:**
   ```bash
   python --version
   ```
   Should be Python 3.8 or higher.

2. **Verify all packages:**
   ```bash
   python verify_installation.py
   ```

3. **Test Flask backend:**
   ```bash
   python app.py
   ```
   Then in another terminal:
   ```bash
   python test_endpoints.py
   ```

## Still Having Issues?

1. Check VS Code Python extension is installed
2. Make sure you're using the correct terminal in VS Code
3. Try running commands directly in a system terminal (not VS Code terminal)
4. Check that Python is in your system PATH
5. Restart VS Code after installing packages
