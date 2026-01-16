@echo off
REM Comprehensive startup script that ensures all dependencies are installed
REM This script will automatically install missing packages before starting Flask

echo ========================================
echo Flask Backend Startup Script
echo ========================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    echo.
    pause
    exit /b 1
)

echo [INFO] Python found:
python --version
echo.

REM Get Python executable path for clearer messages
for /f "tokens=*" %%i in ('python -c "import sys; print(sys.executable)"') do set PYTHON_EXE=%%i
echo [INFO] Using Python at: %PYTHON_EXE%
echo.

REM Check and install required packages
echo [INFO] Checking and installing required packages...
echo.

python -m pip install --upgrade pip --user --quiet
python -m pip install Flask Flask-CORS requests reportlab python-dotenv --user --quiet

if errorlevel 1 (
    echo [ERROR] Failed to install packages. Trying without --user flag...
    python -m pip install Flask Flask-CORS requests reportlab python-dotenv --upgrade --quiet
    if errorlevel 1 (
        echo [ERROR] Failed to install packages. Please run as administrator or use a virtual environment.
        pause
        exit /b 1
    )
)

echo [SUCCESS] All packages installed successfully!
echo.

REM Verify critical packages
echo [INFO] Verifying installation...
python -c "import flask; import flask_cors; import requests; import reportlab; print('[OK] All critical packages are available')" 2>nul
if errorlevel 1 (
    echo [WARNING] Some packages may not be properly installed.
    echo Trying to continue anyway...
)

REM Check for virtual environment and activate if exists
if exist venv\Scripts\activate.bat (
    echo [INFO] Virtual environment found. Activating...
    call venv\Scripts\activate.bat
)

echo.
echo ========================================
echo Starting Flask Backend
echo ========================================
echo.
echo [INFO] Backend will be available at: http://localhost:5000
echo [INFO] Health check: http://localhost:5000/api/health
echo [INFO] Press Ctrl+C to stop the server
echo.
echo [NOTE] Make sure Ollama is running (ollama serve) for text analysis
echo.

REM Start Flask
python app.py

pause
