#!/usr/bin/env python
"""
Test script to verify Flask endpoints are working.
Run this after starting the Flask backend: python test_endpoints.py
"""

import requests
import json
import sys

BASE_URL = "http://localhost:5000/api"

def test_health():
    """Test health check endpoint"""
    print("Testing /api/health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Health check passed: {data.get('message')}")
            return True
        else:
            print(f"✗ Health check failed: Status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to Flask backend. Is it running?")
        print("  Start it with: python app.py")
        return False
    except Exception as e:
        print(f"✗ Health check error: {e}")
        return False

def test_analyze():
    """Test analyze endpoint with sample text"""
    print("\nTesting /api/analyze endpoint...")
    test_content = """
    Machine Learning is a subset of artificial intelligence that enables computers to learn 
    from data without being explicitly programmed. It uses algorithms to identify patterns 
    in data and make predictions or decisions. There are three main types: supervised learning, 
    unsupervised learning, and reinforcement learning. Neural networks are a popular approach 
    that mimics the human brain's structure to process information.
    """
    
    payload = {
        "content": test_content.strip(),
        "type": "text"
    }
    
    try:
        print("  Sending test content...")
        response = requests.post(
            f"{BASE_URL}/analyze",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=60  # LLM processing can take time
        )
        
        if response.status_code == 200:
            data = response.json()
            if 'summary' in data and 'topicTree' in data:
                print(f"✓ Analysis successful!")
                print(f"  Summary: {data['summary'][:100]}...")
                print(f"  Key Topics: {len(data.get('keyTopics', []))} topics found")
                print(f"  Topic Tree: {len(data.get('topicTree', []))} main branches")
                return True
            else:
                print(f"✗ Invalid response structure: {data}")
                return False
        elif response.status_code == 503:
            print("⚠ Flask backend is running, but Ollama is not available.")
            print("  Start Ollama with: ollama serve")
            return False
        else:
            print(f"✗ Analysis failed: Status {response.status_code}")
            print(f"  Response: {response.text[:200]}")
            return False
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to Flask backend.")
        return False
    except Exception as e:
        print(f"✗ Analysis error: {e}")
        return False

def main():
    print("=" * 60)
    print("Flask Backend Endpoint Tests")
    print("=" * 60)
    print()
    
    health_ok = test_health()
    
    if not health_ok:
        print("\n⚠ Cannot test other endpoints - backend is not running.")
        print("   Please start Flask backend first: python app.py")
        sys.exit(1)
    
    analyze_ok = test_analyze()
    
    print("\n" + "=" * 60)
    if health_ok and analyze_ok:
        print("✓ All tests passed! Flask backend is working correctly.")
        print("=" * 60)
        return 0
    elif health_ok:
        print("⚠ Backend is running, but analysis endpoint needs Ollama.")
        print("   Install and start Ollama to enable text summarization.")
        print("=" * 60)
        return 0
    else:
        print("✗ Some tests failed.")
        print("=" * 60)
        return 1

if __name__ == "__main__":
    sys.exit(main())
