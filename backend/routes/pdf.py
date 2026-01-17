from flask import Blueprint, request, send_file
from services.pdf_service import PDFService
import logging
from io import BytesIO

logger = logging.getLogger(__name__)
pdf_bp = Blueprint('pdf', __name__)
pdf_service = PDFService()

@pdf_bp.route('/generate-pdf', methods=['POST', 'OPTIONS'])
def generate_pdf():
    """Generate PDF from analysis results"""
    
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json()
        
        if not data:
            return {'error': 'No JSON data provided'}, 400
        
        # Validate required fields
        if 'summary' not in data and 'topicTree' not in data:
            return {'error': 'Missing required fields: summary or topicTree'}, 400
        
        logger.info('Generating PDF from analysis data')
        
        # Generate PDF
        pdf_buffer = pdf_service.generate_pdf(data)
        
        # Create filename
        filename = 'learning_map_analysis.pdf'
        
        logger.info(f'PDF generated successfully: {filename}')
        
        # Return PDF file
        return send_file(
            pdf_buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=filename
        )
        
    except Exception as e:
        logger.error(f'Error generating PDF: {str(e)}', exc_info=True)
        return {'error': f'Failed to generate PDF: {str(e)}'}, 500
