@echo off
REM Quick installation script - Run this once to install all dependencies

echo Installing Flask Backend Dependencies...
echo.

python -m pip install --upgrade pip --user
python -m pip install Flask==3.0.0 Flask-CORS==4.0.0 requests==2.31.0 reportlab==4.0.7 python-dotenv==1.0.0 --user

echo.
echo Installation complete!
echo.
echo You can now run the backend with:
echo   python app.py
echo or
echo   start_backend.bat
echo.
pause
