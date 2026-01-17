# Flask Backend for Insight Weaver

This Flask backend provides text summarization using local Ollama LLM and PDF generation capabilities for the Insight Weaver application.

## Prerequisites

1. **Python 3.8+** - Make sure Python is installed
2. **Ollama** - Install and run Ollama locally
   - Download from: https://ollama.ai
   - After installation, pull a model:
     ```bash
     ollama pull llama2
     # or
     ollama pull mistral
     # or any other model you prefer
     ```

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   
   # On Windows:
   venv\Scripts\activate
   
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create a `.env` file** (copy from `.env.example` if it exists, or create manually):
   ```env
   FLASK_PORT=5000
   FLASK_DEBUG=False
   OLLAMA_API_URL=http://localhost:11434
   OLLAMA_MODEL=llama2
   FRONTEND_URL=http://localhost:5173
   ```

## Running the Backend

1. **Make sure Ollama is running:**
   ```bash
   ollama serve
   ```
   This should start Ollama on `http://localhost:11434`

2. **Start the Flask server:**
   ```bash
   python app.py
   ```
   
   Or using Flask CLI:
   ```bash
   flask run --port 5000
   ```

   The backend will be available at `http://localhost:5000`

3. **Test the health endpoint:**
   ```bash
   curl http://localhost:5000/api/health
   ```

## API Endpoints

### POST /api/analyze
Analyze text content and return structured learning map.

**Request:**
```json
{
  "content": "Your text content here...",
  "type": "text"
}
```

**Response:**
```json
{
  "summary": "Brief summary...",
  "keyTopics": ["Topic 1", "Topic 2", ...],
  "topicTree": [
    {
      "id": "1",
      "label": "Main Topic",
      "children": [...]
    }
  ]
}
```

### POST /api/generate-pdf
Generate PDF from analysis results.

**Request:**
```json
{
  "summary": "...",
  "keyTopics": [...],
  "topicTree": [...]
}
```

**Response:** PDF file (binary)

## Configuration

### Environment Variables

- `FLASK_PORT` - Port for Flask server (default: 5000)
- `FLASK_DEBUG` - Enable debug mode (default: False)
- `OLLAMA_API_URL` - Ollama API URL (default: http://localhost:11434)
- `OLLAMA_MODEL` - Model name to use (default: llama2)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

### Changing the LLM Model

Edit the `.env` file and set `OLLAMA_MODEL` to your preferred model:

```env
OLLAMA_MODEL=mistral
# or
OLLAMA_MODEL=llama2
# or
OLLAMA_MODEL=codellama
```

Make sure you've pulled the model first:
```bash
ollama pull <model-name>
```

## Troubleshooting

### "Cannot connect to Ollama"
- Make sure Ollama is running: `ollama serve`
- Check that `OLLAMA_API_URL` in `.env` matches your Ollama instance

### "Model not found"
- Pull the model first: `ollama pull <model-name>`
- Verify the model name in `.env` matches the pulled model

### CORS errors in frontend
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL
- Check that CORS is properly configured in `app.py`

### PDF generation errors
- Ensure `reportlab` is installed: `pip install reportlab`
- Check that the analysis data structure is valid

## Development

To run in development mode with auto-reload:

```bash
export FLASK_DEBUG=True
python app.py
```

Or use Flask's built-in development server:
```bash
flask run --debug --port 5000
```

## Production Deployment

For production, consider using:
- **Gunicorn** with multiple workers
- **Nginx** as a reverse proxy
- **Systemd** or **supervisord** for process management
- Environment-specific `.env` files

Example with Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```
