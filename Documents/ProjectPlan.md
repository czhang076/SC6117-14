# Project Plan: Intelligent Knowledge Base with Auto-Clustering

## **Team Size:** 6 Developers

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (UI)                          │
│         (Search Interface, Cluster Visualization)           │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway                             │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
┌────────────────┐  ┌─────────────────┐  ┌────────────────────┐
│  Search Engine │  │ Clustering Svc  │  │  File Parser Svc   │
│ (Grep+Semantic)│  │  (LLM/Embed)    │  │   (MD, OneNote)    │
└────────────────┘  └─────────────────┘  └────────────────────┘
         │                    │                    │
┌─────────────────────────────────────────────────────────────┐
│              Vector DB + Document Store                     │
│         (Embeddings, Metadata, Full-text Index)             │
└─────────────────────────────────────────────────────────────┘
```

---

## 👥 Team Roles & Responsibilities

| Developer | Role                     | Primary Responsibilities                                            |
| --------- | ------------------------ | ------------------------------------------------------------------- |
| **Dev 1** | Frontend Lead            | UI/UX, search interface, cluster visualization, note viewer         |
| **Dev 2** | Search Engine Lead       | Traditional search (grep-style), full-text indexing, search ranking |
| **Dev 3** | Semantic Search Lead     | Embedding generation, vector search, hybrid search fusion           |
| **Dev 4** | Clustering Lead          | Auto-clustering algorithm, LLM integration, cluster management      |
| **Dev 5** | File Parser & Ingestion  | Markdown parser, OneNote support, file watcher, metadata extraction |
| **Dev 6** | Backend & Infrastructure | API gateway, database setup, deployment, DevOps, integration        |

---

## 📅 Sprint Plan (6-8 Week Timeline)

### **Phase 1: Foundation (Weeks 1-2)**

| Task                                                            | Owner | Deliverable                            |
| --------------------------------------------------------------- | ----- | -------------------------------------- |
| Set up project repo, CI/CD, dev environment                     | Dev 6 | Working dev environment                |
| Design database schema (documents, clusters, embeddings)        | Dev 6 | DB schema + migrations                 |
| Build Markdown file parser & ingestion pipeline                 | Dev 5 | Parse `.md` files, extract frontmatter |
| Create basic REST API structure                                 | Dev 6 | API endpoints scaffold                 |
| Design UI wireframes & component library                        | Dev 1 | Figma/mockups + UI kit                 |
| Research embedding models (e.g., OpenAI, Sentence-Transformers) | Dev 3 | Model selection doc                    |
| Research clustering approaches (LLM-based, hierarchical)        | Dev 4 | Algorithm proposal                     |

### **Phase 2: Core Search (Weeks 3-4)**

| Task                                                       | Owner         | Deliverable                   |
| ---------------------------------------------------------- | ------------- | ----------------------------- |
| Implement grep-style full-text search                      | Dev 2         | Fast exact-match search       |
| Implement vector DB integration (Pinecone/Weaviate/Qdrant) | Dev 3         | Embedding storage & retrieval |
| Build embedding pipeline (batch + real-time)               | Dev 3         | Auto-embed new notes          |
| Create hybrid search (combine grep + semantic)             | Dev 2 + Dev 3 | Unified search API            |
| Build search UI with filters & results display             | Dev 1         | Functional search page        |
| Add file watcher for auto-indexing new notes               | Dev 5         | Real-time sync                |

### **Phase 3: Auto-Clustering (Weeks 5-6)**

| Task                                                                  | Owner         | Deliverable                      |
| --------------------------------------------------------------------- | ------------- | -------------------------------- |
| Implement clustering algorithm (e.g., K-means on embeddings, HDBSCAN) | Dev 4         | Initial clustering               |
| Add LLM-based cluster naming/summarization                            | Dev 4         | Human-readable cluster labels    |
| Build cluster management API (view, merge, split, rename)             | Dev 4 + Dev 6 | Cluster CRUD                     |
| Create cluster visualization UI (graph/tree view)                     | Dev 1         | Interactive cluster explorer     |
| Implement context-aware suggestions ("related notes")                 | Dev 3 + Dev 4 | Recommendation engine            |
| OneNote format support                                                | Dev 5         | Parse `.one` or exported formats |

### **Phase 4: Polish & Scale (Weeks 7-8)**

| Task                                             | Owner         | Deliverable             |
| ------------------------------------------------ | ------------- | ----------------------- |
| Performance optimization for 10K+ notes          | All           | Benchmarking results    |
| Caching layer for frequent queries               | Dev 6         | Redis/cache integration |
| Incremental re-clustering (avoid full recompute) | Dev 4         | Efficient updates       |
| User settings & preferences                      | Dev 1 + Dev 6 | Config UI               |
| End-to-end testing & bug fixes                   | All           | Stable release          |
| Documentation & demo                             | All           | README, demo video      |

---

## 🛠️ Recommended Tech Stack

| Component            | Technology Options                                     |
| -------------------- | ------------------------------------------------------ |
| **Frontend**         | React/Next.js, Tailwind CSS, D3.js (for visualization) |
| **Backend**          | Python (FastAPI) or Node.js (Express)                  |
| **Full-text Search** | SQLite FTS5, Elasticsearch, or Ripgrep                 |
| **Vector Database**  | Qdrant, Weaviate, Pinecone, or ChromaDB                |
| **Embeddings**       | OpenAI `text-embedding-3-small`, Sentence-Transformers |
| **Clustering**       | HDBSCAN, K-Means, or LLM-guided clustering             |
| **LLM**              | OpenAI GPT-4, Claude, or local models (Ollama)         |
| **Database**         | PostgreSQL + pgvector, or SQLite                       |
| **File Watching**    | Chokidar (Node) or Watchdog (Python)                   |

---

## 🎯 Key Success Metrics

1. **Search latency**: < 200ms for grep, < 500ms for semantic (up to 10K notes)
2. **Clustering accuracy**: Related notes grouped together (manual validation)
3. **Scalability**: Handle 10,000+ markdown files without degradation
4. **User experience**: 5x faster knowledge retrieval (user testing)

---

## ⚠️ Risks & Mitigations

| Risk                      | Mitigation                                                    |
| ------------------------- | ------------------------------------------------------------- |
| Embedding costs at scale  | Use local models (Sentence-Transformers) or cache embeddings  |
| Clustering quality        | Combine algorithmic + LLM approaches; allow manual refinement |
| OneNote format complexity | Start with exported HTML/Markdown; native `.one` is complex   |
| Performance bottlenecks   | Index incrementally; use async processing                     |

---

## 📂 Repository Skeleton & Folder Ownership

The project repository has been scaffolded with the following structure. Each folder is mapped to the responsible developer(s) and linked to sprint tasks.

```
Capstone/
├── backend/                 # Dev 6 (Backend & Infrastructure)
│   ├── app/
│   │   └── main.py          # FastAPI entry point
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/                # Dev 1 (Frontend Lead)
│   └── package.json
├── services/
│   ├── search/              # Dev 2 + Dev 3 (Search Engine + Semantic Search)
│   │   └── README.md
│   ├── clustering/          # Dev 4 (Clustering Lead)
│   │   └── README.md
│   └── ingestion/           # Dev 5 (File Parser & Ingestion)
│       └── README.md
├── infra/                   # Dev 6 (Backend & Infrastructure)
│   └── docker-compose.yml
├── docs/                    # All (shared documentation)
│   ├── ARCHITECTURE.md
│   └── REFERENCES.md
├── scripts/                 # Dev 6 (setup helpers)
│   └── setup_env.ps1
├── data/                    # Dev 5 (sample data for ingestion)
│   ├── raw/
│   └── processed/
├── tests/                   # All (unit + integration tests)
│   └── README.md
├── Documents/               # Project planning docs
│   ├── Project.md
│   └── ProjectPlan.md
├── README.md
└── .gitignore
```

### Folder → Owner → Sprint Task Mapping

| Folder                 | Owner(s)      | Primary Sprint Tasks                                                      |
| ---------------------- | ------------- | ------------------------------------------------------------------------- |
| `backend/`             | Dev 6         | Phase 1: API scaffold, DB schema; Phase 4: caching, config                |
| `frontend/`            | Dev 1         | Phase 1: wireframes; Phase 2: search UI; Phase 3: cluster visualization   |
| `services/search/`     | Dev 2 + Dev 3 | Phase 2: grep search, vector DB, hybrid search                            |
| `services/clustering/` | Dev 4         | Phase 3: clustering algo, LLM naming, cluster CRUD                        |
| `services/ingestion/`  | Dev 5         | Phase 1: Markdown parser; Phase 2: file watcher; Phase 3: OneNote support |
| `infra/`               | Dev 6         | Phase 1: docker-compose, CI/CD; Phase 4: deployment                       |
| `docs/`                | All           | Ongoing: architecture notes, references, ADRs                             |
| `scripts/`             | Dev 6         | Phase 1: setup helpers (venv, deps)                                       |
| `data/`                | Dev 5         | Phase 1–2: sample Markdown notes for testing ingestion                    |
| `tests/`               | All           | Phase 4: unit tests, integration tests, benchmarks                        |

---

## 📋 Next Steps

1. ✅ Repository skeleton created — folders and starter files are in place
2. Assign team members to roles (use table above)
3. Each developer clones repo and runs `scripts/setup_env.ps1` to set up local environment
4. Schedule kick-off meeting to align on tech stack decisions
5. Create detailed task backlog in project management tool (Jira/Linear/GitHub Projects)
6. Begin Phase 1 foundation work — each dev starts in their assigned folder(s)
