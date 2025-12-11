import os
from typing import List, Dict, Any
from qdrant_client import QdrantClient
from openai import OpenAI
from sklearn.cluster import KMeans
import numpy as np
import dotenv

dotenv.load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL", "http://qdrant:6333")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

qdrant_client = QdrantClient(url=QDRANT_URL)
openai_client = OpenAI(api_key=OPENAI_API_KEY)

COLLECTION_NAME = "documents"

def perform_clustering(n_clusters: int = 5) -> List[Dict[str, Any]]:
    # Fetch all vectors
    points = []
    offset = None
    
    try:
        if not qdrant_client.collection_exists(COLLECTION_NAME):
            return []

        while True:
            scroll_result = qdrant_client.scroll(
                collection_name=COLLECTION_NAME,
                scroll_filter=None,
                limit=100,
                with_payload=True,
                with_vectors=True,
                offset=offset
            )
            batch, next_offset = scroll_result
            points.extend(batch)
            offset = next_offset
            if offset is None:
                break
    except Exception as e:
        print(f"Error fetching points: {e}")
        return []
            
    if not points:
        return []
        
    vectors = [p.vector for p in points]
    
    # Adjust n_clusters if we have fewer documents
    if len(vectors) < n_clusters:
        n_clusters = max(1, len(vectors))
        
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    kmeans.fit(vectors)
    labels = kmeans.labels_
    
    clusters = {}
    for i, label in enumerate(labels):
        label = int(label)
        if label not in clusters:
            clusters[label] = []
        clusters[label].append(points[i])
        
    results = []
    for label, cluster_points in clusters.items():
        # Summarize
        docs_content = [p.payload.get("content", "")[:500] for p in cluster_points[:5]]
        combined_text = "\n---\n".join(docs_content)
        
        prompt = f"Summarize the common topic of these notes in a short phrase (3-5 words) in English:\n{combined_text}"
        
        try:
            response = openai_client.chat.completions.create(
                model="gpt-4o-mini", 
                messages=[
                    {"role": "system", "content": "You are a helpful assistant. Respond only in English."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=50
            )
            cluster_name = response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Error generating cluster name: {e}")
            cluster_name = f"Cluster {label}"
        
        results.append({
            "cluster_name": cluster_name,
            "doc_count": len(cluster_points),
            "docs": [p.payload.get("file_path") for p in cluster_points]
        })
        
    return results
