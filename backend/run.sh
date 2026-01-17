#!/bin/bash

# Script to start the Flask backend
# Make sure Ollama is running before starting this script

echo "Starting Flask Backend for Insight Weaver..."
echo "Make sure Ollama is running on http://localhost:11434"

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo "Activating virtual environment..."
    source venv/bin/activate
fi

# Load environment variables
if [ -f ".env" ]; then
    echo "Loading environment variables from .env"
else
    echo "Warning: .env file not found. Using defaults."
fi

# Start Flask
python app.py
