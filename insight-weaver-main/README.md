# inshightmaap_main - AI-Powered Learning Map Generator

## Project Overview

Insight Main is an AI-powered application that analyzes text content and generates structured learning maps with hierarchical topic trees, summaries, and key topics. It features a Flask backend with Ollama LLM integration for text summarization and PDF generation capabilities.

**Repository**: https://github.com/Mihir-techie/inshightmaap_main.git

## How can I edit this code?

You can edit the code using any of these methods:

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Backend Setup (Flask + Ollama)

This project includes a Flask backend for text summarization and PDF generation. To run the full application:

### Prerequisites

1. **Python 3.8+** installed
2. **Ollama** installed and running
   - Download from: https://ollama.ai
   - After installation, pull a model:
     ```bash
     ollama pull llama2
     ```

### Backend Setup Steps

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended):**
   ```bash
   python -m venv venv
   
   # On Windows:
   venv\Scripts\activate
   
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file** in the `backend` directory:
   ```env
   FLASK_PORT=5000
   FLASK_DEBUG=False
   OLLAMA_API_URL=http://localhost:11434
   OLLAMA_MODEL=llama2
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start Ollama (in a separate terminal):**
   ```bash
   ollama serve
   ```

6. **Start Flask backend:**
   ```bash
   # On Windows:
   python app.py
   # or
   run.bat
   
   # On macOS/Linux:
   python app.py
   # or
   chmod +x run.sh
   ./run.sh
   ```

The backend will be available at `http://localhost:5000`

### Running Frontend and Backend Together

1. **Terminal 1 - Start Ollama:**
   ```bash
   ollama serve
   ```

2. **Terminal 2 - Start Flask backend:**
   ```bash
   cd backend
   python app.py
   ```

3. **Terminal 3 - Start React frontend:**
   ```bash
   npm run dev
   ```

For more detailed backend documentation, see [backend/README.md](backend/README.md)

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

**Frontend:**
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

**Backend:**
- Flask (Python)
- Ollama (Local LLM)
- ReportLab (PDF generation)
- Flask-CORS

## How can I deploy this project?

### Frontend Deployment

You can deploy the frontend to any static hosting service:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Use GitHub Actions to build and deploy

### Backend Deployment

For the Flask backend, deploy to:
- **Heroku**: Use Procfile and requirements.txt
- **Railway**: Push to GitHub, connect repository
- **Render**: Connect GitHub repository, set Python environment
- **AWS/GCP/Azure**: Use container services or serverless functions

See [backend/README.md](backend/README.md) for detailed deployment instructions.
