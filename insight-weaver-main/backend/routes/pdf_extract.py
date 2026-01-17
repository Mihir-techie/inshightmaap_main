from flask import Blueprint, request, jsonify
import logging

logger = logging.getLogger(__name__)

try:
    from services.pdf_extract_service import PDFExtractService
    pdf_service = PDFExtractService()
    PDF_EXTRACT_AVAILABLE = True
except ImportError:
    PDF_EXTRACT_AVAILABLE = False
    logger.warning("PDF extraction service not available. Install PyPDF2 for PDF upload support.")

pdf_extract_bp = Blueprint('pdf_extract', __name__)

@pdf_extract_bp.route('/extract-pdf', methods=['POST', 'OPTIONS'])
def extract_pdf():
    """Extract text from PDF file"""
    
    if request.method == 'OPTIONS':
        return '', 200
    
    if not PDF_EXTRACT_AVAILABLE:
        return jsonify({'error': 'PDF extraction not available. Please install PyPDF2.'}), 503
    
    try:
        # Check if file is in request
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.endswith('.pdf'):
            return jsonify({'error': 'File must be a PDF'}), 400
        
        logger.info(f'Extracting text from PDF: {file.filename}')
        
        # Extract text from PDF
        text_content = pdf_service.extract_text(file)
        
        if not text_content or len(text_content.strip()) < 50:
            return jsonify({'error': 'Could not extract sufficient text from PDF (minimum 50 characters required)'}), 400
        
        logger.info(f'PDF text extracted successfully. Length: {len(text_content)} characters')
        
        return jsonify({
            'content': text_content,
            'length': len(text_content)
        }), 200
        
    except Exception as e:
        logger.error(f'Error extracting PDF text: {str(e)}', exc_info=True)
        error_message = str(e)
        
        if 'PDF' in error_message or 'pdf' in error_message:
            return jsonify({
                'error': 'Failed to read PDF file. Please ensure it is a valid PDF.',
                'details': error_message
            }), 400
        
        return jsonify({
            'error': 'Failed to extract text from PDF',
            'details': error_message
        }), 500
