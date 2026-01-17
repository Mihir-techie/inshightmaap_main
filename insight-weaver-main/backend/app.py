from flask import Flask
from flask_cors import CORS
import os
import logging

# Try to load dotenv, but make it optional
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("Warning: python-dotenv not installed. Environment variables from .env file will not be loaded.")
    print("Please install it with: pip install python-dotenv")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

app = Flask(__name__)

# Configure CORS to allow frontend access
frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:5173')
CORS(app, resources={
    r"/api/*": {
        "origins": [frontend_url, "http://localhost:5173", "http://localhost:3000", "http://localhost:8080", "http://127.0.0.1:5173"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Import routes with error handling
try:
    from routes.analyze import analyze_bp
    from routes.pdf import pdf_bp
except ImportError as e:
    print(f"\n[ERROR] Failed to import routes: {e}")
    print("\nPlease install all required packages:")
    print("  python -m pip install -r requirements.txt --user")
    print("\nOr use the startup script:")
    print("  start_backend.bat")
    import sys
    sys.exit(1)

# Try to import PDF extract route (optional - requires PyPDF2)
try:
    from routes.pdf_extract import pdf_extract_bp
    app.register_blueprint(pdf_extract_bp, url_prefix='/api')
    print("PDF extraction enabled (PyPDF2 available)")
except ImportError:
    print("Warning: PDF extraction not available. Install PyPDF2 for PDF upload support: pip install PyPDF2")

# Import transcript route
try:
    from routes.transcript import transcript_bp
    app.register_blueprint(transcript_bp, url_prefix='/api')
    print("Transcript processing enabled")
except ImportError as e:
    print(f"Warning: Transcript processing not available: {e}")

# Register blueprints
app.register_blueprint(analyze_bp, url_prefix='/api')
app.register_blueprint(pdf_bp, url_prefix='/api')

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return {'status': 'ok', 'message': 'Flask backend is running'}, 200

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    logger = logging.getLogger(__name__)
    logger.info(f'Starting Flask server on port {port} (debug={debug})')
    logger.info(f'CORS enabled for: {frontend_url}')
    app.run(host='0.0.0.0', port=port, debug=debug)
