from flask import Blueprint, request, jsonify
from services.llm_service import LLMService
import logging
from datetime import datetime
import uuid

logger = logging.getLogger(__name__)
transcript_bp = Blueprint('transcript', __name__)
llm_service = LLMService()

@transcript_bp.route('/process-transcript', methods=['POST', 'OPTIONS'])
def process_transcript():
    """Process voice transcript from Zoom/Google Meet"""
    
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        transcript_text = data.get('transcript')
        title = data.get('title', 'Meeting Transcript')
        duration = data.get('duration', 0)  # in minutes
        source = data.get('source', 'manual')  # 'zoom', 'meet', or 'manual'
        
        if not transcript_text:
            return jsonify({'error': 'Transcript text is required'}), 400
        
        if len(transcript_text.strip()) < 50:
            return jsonify({'error': 'Transcript must be at least 50 characters'}), 400
        
        logger.info(f'Processing transcript from {source}: {title}, length: {len(transcript_text)}')
        
        # Analyze transcript using LLM service
        analysis_result = llm_service.analyze_content(transcript_text, source)
        
        # Create transcript summary object
        transcript_summary = {
            'id': str(uuid.uuid4()),
            'title': title,
            'date': datetime.now().isoformat(),
            'duration': str(duration),
            'summary': analysis_result.get('summary', ''),
            'keyTopics': analysis_result.get('keyTopics', []),
            'transcriptType': source,
            'analysisResult': analysis_result,
            'rawTranscript': transcript_text[:500],  # Store first 500 chars for preview
        }
        
        logger.info(f'Transcript processed successfully: {transcript_summary["id"]}')
        
        return jsonify({
            'success': True,
            'transcriptSummary': transcript_summary,
            'message': 'Transcript processed successfully'
        }), 200
        
    except Exception as e:
        logger.error(f'Error processing transcript: {str(e)}', exc_info=True)
        error_message = str(e)
        
        if 'Cannot connect to Ollama' in error_message:
            return jsonify({
                'error': 'Cannot connect to Ollama. Please ensure Ollama is running.',
                'details': error_message
            }), 503
        
        return jsonify({
            'error': 'Failed to process transcript',
            'details': error_message
        }), 500
