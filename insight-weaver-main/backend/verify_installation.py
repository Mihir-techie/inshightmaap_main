#!/usr/bin/env python
"""
Script to verify all required packages are installed correctly.
Run this before starting the Flask app: python verify_installation.py
"""

import sys

def check_import(module_name, package_name=None):
    """Check if a module can be imported."""
    if package_name is None:
        package_name = module_name
    try:
        __import__(module_name)
        print(f"✓ {package_name} is installed")
        return True
    except ImportError as e:
        print(f"✗ {package_name} is NOT installed: {e}")
        print(f"  Install with: pip install {package_name}")
        return False

def main():
    print("Checking Flask backend dependencies...\n")
    
    all_ok = True
    
    # Core dependencies
    all_ok &= check_import("flask", "Flask")
    all_ok &= check_import("flask_cors", "Flask-CORS")
    all_ok &= check_import("requests", "requests")
    all_ok &= check_import("reportlab", "reportlab")
    all_ok &= check_import("dotenv", "python-dotenv")
    
    print("\nChecking Python version...")
    print(f"Python version: {sys.version}")
    
    if sys.version_info < (3, 8):
        print("✗ Python 3.8+ is required")
        all_ok = False
    else:
        print("✓ Python version is compatible")
    
    print("\n" + "="*50)
    if all_ok:
        print("✓ All dependencies are installed correctly!")
        print("You can now run: python app.py")
        return 0
    else:
        print("✗ Some dependencies are missing.")
        print("Install missing packages with: pip install -r requirements.txt")
        return 1

if __name__ == "__main__":
    sys.exit(main())
