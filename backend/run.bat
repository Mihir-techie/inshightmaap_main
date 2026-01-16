@echo off
REM Script to start the Flask backend on Windows
REM Make sure Ollama is running before starting this script

echo ========================================
echo Starting Flask Backend for Insight Weaver
echo ========================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

REM Verify dependencies
echo Checking dependencies...
python verify_installation.py >nul 2>&1
if errorlevel 1 (
    echo.
    echo WARNING: Some dependencies may be missing.
    echo Installing dependencies...
    python -m pip install -r requirements.txt --user
    echo.
)

echo.
echo Make sure Ollama is running on http://localhost:11434
echo (If not, start it with: ollama serve)
echo.

REM Activate virtual environment if it exists
if exist venv\Scripts\activate.bat (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
)

REM Load environment variables
if exist .env (
    echo Loading environment variables from .env
) else (
    echo Info: .env file not found. Using default configuration.
    echo (Create .env file for custom settings)
)

echo.
echo Starting Flask backend...
echo Backend will be available at: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

REM Start Flask
python app.py

pause
