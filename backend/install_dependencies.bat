@echo off
REM Script to install all Python dependencies for Flask backend
REM Run this script to ensure all packages are installed

echo ========================================
echo Installing Flask Backend Dependencies
echo ========================================
echo.

REM Check Python version
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

echo.
echo Installing packages from requirements.txt...
python -m pip install --upgrade pip
python -m pip install -r requirements.txt --user

echo.
echo ========================================
echo Verifying installation...
echo ========================================
python verify_installation.py

echo.
echo ========================================
echo Installation complete!
echo ========================================
echo.
echo You can now run the Flask backend with:
echo   python app.py
echo.
pause
