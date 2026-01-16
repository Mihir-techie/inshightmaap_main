# Quick Start Guide - Insight Weaver with Flask Backend

This guide will help you set up and run the Insight Weaver application with the Flask backend for text summarization and PDF generation.

## Prerequisites

1. **Node.js** (v18+) and npm
2. **Python 3.8+**
3. **Ollama** - Download from https://ollama.ai

## Setup Steps

### 1. Install Ollama and Pull a Model

```bash
# Install Ollama from https://ollama.ai, then:
ollama pull llama2
# or
ollama pull mistral
```

### 2. Install Frontend Dependencies

```bash
cd insight-weaver-main
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
FLASK_PORT=5000
FLASK_DEBUG=False
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=llama2
FRONTEND_URL=http://localhost:5173
```

### 5. Start the Application

You need to run three services:

**Terminal 1 - Start Ollama:**
```bash
ollama serve
```

**Terminal 2 - Start Flask Backend:**
```bash
cd backend
# Activate venv if not already active
python app.py
```

**Terminal 3 - Start React Frontend:**
```bash
cd insight-weaver-main
npm run dev
```

### 6. Access the Application

- Frontend: http://localhost:5173 (or http://localhost:8080 based on vite.config)
- Flask Backend: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## Testing

1. **Test Flask Backend:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Test Text Analysis:**
   - Open http://localhost:5173/upload
   - Paste some text (50+ characters)
   - Click "Generate Learning Map"
   - The Flask backend will process it via Ollama

3. **Test PDF Generation:**
   - After generating a learning map, go to Results page
   - Click "Download as PDF"
   - A PDF file should download with the summary, topics, and topic tree

## Troubleshooting

### Flask backend not starting
- Check Python version: `python --version` (should be 3.8+)
- Verify dependencies: `pip list | grep Flask`
- Check port 5000 is not in use

### Ollama connection errors
- Verify Ollama is running: `curl http://localhost:11434/api/tags`
- Check model is available: `ollama list`
- Verify OLLAMA_API_URL in `.env`

### CORS errors in browser
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL
- Check Flask CORS configuration in `backend/app.py`

### PDF generation fails
- Verify `reportlab` is installed: `pip show reportlab`
- Check Flask logs for errors

## Alternative: Use Supabase Only

If you don't want to use the Flask backend, the frontend will automatically fall back to Supabase Edge Functions. Just ensure your Supabase configuration is set up in the frontend.
