import os
import hashlib
import frontmatter
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
from openai import OpenAI
import dotenv

dotenv.load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL", "http://qdrant:6333")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Initialize clients
# Note: In a real app, you might want to handle connection errors or lazy loading
qdrant_client = QdrantClient(url=QDRANT_URL)
openai_client = OpenAI(api_key=OPENAI_API_KEY)

COLLECTION_NAME = "documents"

def init_collection():
    if not qdrant_client.collection_exists(COLLECTION_NAME):
        qdrant_client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
        )

def process_files(data_dir: str = "/app/data"):
    print(f"Starting ingestion from {data_dir}")
    init_collection()
    
    if not os.path.exists(data_dir):
        print(f"Data directory {data_dir} does not exist.")
        return

    for root, dirs, files in os.walk(data_dir):
        for file in files:
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                try:
                    ingest_file(file_path)
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

def ingest_file(file_path: str):
    with open(file_path, "r", encoding="utf-8") as f:
        content_str = f.read()
    
    ingest_content(file_path, content_str)

def ingest_content(file_path: str, raw_content: str):
    post = frontmatter.loads(raw_content)
    
    content = post.content
    metadata = post.metadata
    
    if not content.strip():
        print(f"Skipping empty file: {file_path}")
        return

    # Generate embedding
    try:
        response = openai_client.embeddings.create(
            input=content,
            model="text-embedding-3-small"
        )
        embedding = response.data[0].embedding
        
        file_id = hashlib.md5(file_path.encode()).hexdigest()
        
        # Store in Qdrant
        qdrant_client.upsert(
            collection_name=COLLECTION_NAME,
            points=[
                PointStruct(
                    id=file_id,
                    vector=embedding,
                    payload={
                        "file_path": file_path,
                        "content": content,
                        "metadata": metadata
                    }
                )
            ]
        )
        print(f"Ingested: {file_path}")
    except Exception as e:
        print(f"Error ingesting {file_path}: {e}")
