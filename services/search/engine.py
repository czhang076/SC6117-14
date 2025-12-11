import os
import subprocess
from typing import List, Dict, Any
from qdrant_client import QdrantClient
from openai import OpenAI
import dotenv

dotenv.load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL", "http://qdrant:6333")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

qdrant_client = QdrantClient(url=QDRANT_URL)
openai_client = OpenAI(api_key=OPENAI_API_KEY)

COLLECTION_NAME = "documents"

def keyword_search(query: str, data_dir: str = "/app/data") -> List[Dict[str, Any]]:
    results = []
    try:
        # grep -r -i "query" /app/data
        # We use -l to get filenames, but we might want context.
        # Let's use default output to get matching lines.
        command = ["grep", "-r", "-i", query, data_dir]
        process = subprocess.run(command, capture_output=True, text=True)
        
        if process.returncode == 0:
            lines = process.stdout.strip().split('\n')
            for line in lines:
                # grep output format: filename:match (if multiple files)
                # If only one file, it might not show filename unless -H is used.
                # We should use -H to ensure filename is printed.
                if ':' in line:
                    parts = line.split(':', 1)
                    file_path = parts[0]
                    content_snippet = parts[1]
                    results.append({
                        "file_path": file_path,
                        "content": content_snippet.strip(),
                        "score": 1.0, 
                        "type": "keyword"
                    })
    except Exception as e:
        print(f"Grep failed: {e}")
        
    return results

def semantic_search(query: str, limit: int = 5) -> List[Dict[str, Any]]:
    try:
        response = openai_client.embeddings.create(
            input=query,
            model="text-embedding-3-small"
        )
        embedding = response.data[0].embedding
        
        search_result = qdrant_client.search(
            collection_name=COLLECTION_NAME,
            query_vector=embedding,
            limit=limit
        )
        
        results = []
        for hit in search_result:
            results.append({
                "file_path": hit.payload.get("file_path"),
                "content": hit.payload.get("content", "")[:200] + "...",
                "score": hit.score,
                "type": "semantic",
                "payload": hit.payload
            })
        return results
    except Exception as e:
        print(f"Semantic search failed: {e}")
        return []

def hybrid_search(query: str) -> List[Dict[str, Any]]:
    kw_results = keyword_search(query)
    sem_results = semantic_search(query)
    
    # Merge results
    # We want to prioritize exact matches (keyword)
    
    merged_results = []
    seen_files = set()
    
    # Add keyword results first
    for res in kw_results:
        file_path = res['file_path']
        if file_path not in seen_files:
            merged_results.append(res)
            seen_files.add(file_path)
            
    # Add semantic results if not already present
    for res in sem_results:
        file_path = res['file_path']
        if file_path not in seen_files:
            merged_results.append(res)
            seen_files.add(file_path)
            
    return merged_results
