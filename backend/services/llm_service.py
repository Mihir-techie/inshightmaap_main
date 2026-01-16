import requests
import json
import os
from typing import Dict, Any

class LLMService:
    def __init__(self):
        self.api_url = os.getenv('OLLAMA_API_URL', 'http://localhost:11434')
        self.model = os.getenv('OLLAMA_MODEL', 'llama2')
    
    def analyze_content(self, content: str, content_type: str = "text") -> Dict[str, Any]:
        """
        Analyze content using Ollama LLM and return structured analysis.
        
        Args:
            content: The text content to analyze
            content_type: Type of content (text, pdf, etc.)
            
        Returns:
            Dictionary with summary, keyTopics, and topicTree
        """
        system_prompt = """You are an expert educational content analyzer. Your task is to analyze text content and extract a structured learning map.

IMPORTANT: You MUST respond with ONLY valid JSON, no markdown, no code blocks, no explanation text.

Analyze the provided content and extract:
1. A concise summary (2-3 sentences)
2. Key topics (5-8 main concepts as strings)
3. A hierarchical topic tree with the following structure

The response must be valid JSON with this exact structure:
{
  "summary": "A brief 2-3 sentence summary of the main content",
  "keyTopics": ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"],
  "topicTree": [
    {
      "id": "1",
      "label": "Main Topic 1",
      "children": [
        {
          "id": "1-1",
          "label": "Subtopic 1.1",
          "children": [
            { "id": "1-1-1", "label": "Detail 1.1.1" }
          ]
        }
      ]
    }
  ]
}

Create a comprehensive hierarchical structure that captures the relationships between concepts. Make it educational and easy to navigate."""

        user_prompt = f"Analyze this {content_type or 'text'} content and create a learning map:\n\n{content}"
        
        try:
            # Try using chat API first (supports system messages)
            # Fall back to generate API if chat is not available
            try:
                response = requests.post(
                    f"{self.api_url}/api/chat",
                    json={
                        "model": self.model,
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": user_prompt}
                        ],
                        "stream": False,
                        "options": {
                            "temperature": 0.7,
                            "top_p": 0.9
                        }
                    },
                    timeout=120  # 2 minute timeout
                )
                
                if response.status_code == 200:
                    result = response.json()
                    ai_content = result.get('message', {}).get('content', '')
                elif response.status_code == 404:
                    # Chat API not available, fall back to generate
                    raise requests.exceptions.RequestException("Chat API not available")
                else:
                    raise Exception(f"Ollama API error: {response.status_code} - {response.text}")
            except (requests.exceptions.RequestException, KeyError):
                # Fallback to generate API (older Ollama versions)
                response = requests.post(
                    f"{self.api_url}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": f"{system_prompt}\n\n{user_prompt}",
                        "stream": False,
                        "options": {
                            "temperature": 0.7,
                            "top_p": 0.9
                        }
                    },
                    timeout=120  # 2 minute timeout
                )
                
                if response.status_code != 200:
                    raise Exception(f"Ollama API error: {response.status_code} - {response.text}")
                
                result = response.json()
                ai_content = result.get('response', '')
            
            if not ai_content:
                raise Exception('No content in LLM response')
            
            # Clean the response - remove markdown code blocks if present
            cleaned_content = ai_content.strip()
            if cleaned_content.startswith('```json'):
                cleaned_content = cleaned_content[7:]
            elif cleaned_content.startswith('```'):
                cleaned_content = cleaned_content[3:]
            if cleaned_content.endswith('```'):
                cleaned_content = cleaned_content[:-3]
            cleaned_content = cleaned_content.strip()
            
            # Extract JSON from response (sometimes LLM adds text before/after JSON)
            # Try to find JSON object in the response
            json_start = cleaned_content.find('{')
            json_end = cleaned_content.rfind('}') + 1
            
            if json_start != -1 and json_end > json_start:
                cleaned_content = cleaned_content[json_start:json_end]
            
            # Parse the JSON response
            try:
                analysis_result = json.loads(cleaned_content)
            except json.JSONDecodeError as e:
                # If JSON parsing fails, try to fix common issues
                print(f"JSON parsing error: {e}")
                print(f"Cleaned content: {cleaned_content[:500]}...")
                raise Exception(f'Failed to parse LLM response as JSON: {str(e)}')
            
            # Validate the structure
            if not isinstance(analysis_result, dict):
                raise Exception('LLM response is not a dictionary')
            
            if 'summary' not in analysis_result or 'topicTree' not in analysis_result:
                raise Exception('LLM response missing required fields (summary, topicTree)')
            
            # Ensure keyTopics exists
            if 'keyTopics' not in analysis_result:
                analysis_result['keyTopics'] = []
            
            return analysis_result
            
        except requests.exceptions.ConnectionError:
            raise Exception(f'Cannot connect to Ollama API at {self.api_url}. Make sure Ollama is running.')
        except requests.exceptions.Timeout:
            raise Exception('Request to Ollama API timed out. The model may be too slow.')
        except Exception as e:
            raise Exception(f'LLM service error: {str(e)}')
