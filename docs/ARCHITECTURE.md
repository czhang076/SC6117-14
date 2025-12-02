# Architecture Overview

High-level architecture for the Intelligent Knowledge Base with Auto-Clustering

```
Frontend (UI)  ->  API Gateway  ->  Services: Search | Clustering | Ingestion
                          \->  Vector DB + Document Store
```

Key components:

- Frontend: React/Next.js with visualizations (graph/tree)
- Backend/API: FastAPI providing search, cluster, ingestion endpoints
- Services:
  - Search: grep-style + vector retriever (hybrid)
  - Clustering: embedding clustering + LLM-based naming
  - Ingestion: markdown parser, metadata extraction, embedding pipeline
- Data stores: vector DB (Qdrant/Weaviate/FAISS), relational/metadata DB (Postgres/SQLite)

Design notes:

- Keep exact-match search (ripgrep/FTS) as a fast first pass
- Use embeddings for semantic similarity and clustering
- Perform incremental indexing and re-clustering to avoid full recompute
