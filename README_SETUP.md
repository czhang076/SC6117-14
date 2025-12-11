# Setup Guide

## 1. Environment Configuration

Create a `.env` file in the `backend/` directory based on `.env.example`.

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and fill in your OpenAI API Key:

```ini
OPENAI_API_KEY=sk-your-api-key-here
QDRANT_URL=http://qdrant:6333
```

## 2. Start the System

Run the following command from the project root (where `infra/` is located, or adjust path):

```bash
# If running from project root
docker-compose -f infra/docker-compose.yml up --build
```

## 3. Usage

- **Ingest Data**: POST `http://localhost:8000/ingest`
- **Search**: GET `http://localhost:8000/search?query=your_query`
- **Clusters**: GET `http://localhost:8000/clusters`
- **Health**: GET `http://localhost:8000/health`

## 4. Notes

- Ensure your data files (.md) are in the `data/` directory at the project root.
- The Qdrant data is persisted in `infra/qdrant_data`.
