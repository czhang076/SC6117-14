from fastapi import FastAPI, BackgroundTasks, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
import sys
import os

# Add parent directory to path to allow importing services if running locally
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(os.path.join(os.path.dirname(__file__), "../.."))

try:
    from services.ingestion import processor
    from services.search import engine
    from services.clustering import manager
except ImportError as e:
    print(f"Warning: Could not import services: {e}")

app = FastAPI(title="MetaNotes")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/ingest")
def ingest_data(background_tasks: BackgroundTasks):
    """Trigger background ingestion of files."""
    background_tasks.add_task(processor.process_files)
    return {"message": "Ingestion started in background"}

@app.post("/ingest/upload")
async def ingest_upload(files: List[UploadFile] = File(...), background_tasks: BackgroundTasks = None):
    """Ingest uploaded files."""
    # We process files immediately or in background. 
    # Since we need to read file content from UploadFile which is an async stream, 
    # it's better to read them here and then pass content to processor.
    # However, for large number of files, this might be heavy.
    # Let's read and process sequentially for now.
    
    processor.init_collection()
    
    # Ensure data directory exists
    os.makedirs("/app/data", exist_ok=True)
    
    count = 0
    for file in files:
        if file.filename.endswith(".md"):
            try:
                # Save file to disk to enable grep/keyword search
                # Note: This flattens the directory structure if only filename is provided
                file_location = os.path.join("/app/data", os.path.basename(file.filename))
                
                content = await file.read()
                with open(file_location, "wb") as f:
                    f.write(content)
                
                # Ingest from the saved file
                processor.ingest_file(file_location)
                count += 1
            except Exception as e:
                print(f"Error processing uploaded file {file.filename}: {e}")
                
    return {"message": f"Successfully ingested {count} files"}

@app.get("/search")
def search(query: str):
    """Hybrid search endpoint."""
    if not query:
        raise HTTPException(status_code=400, detail="Query is required")
    try:
        results = engine.hybrid_search(query)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/clusters")
def get_clusters():
    """Get document clusters."""
    try:
        clusters = manager.perform_clustering()
        return {"clusters": clusters}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
