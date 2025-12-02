# Ingestion Service

Responsibilities:

- Parse Markdown files and extract metadata (frontmatter, tags, links)
- Normalize and chunk long documents for embeddings
- Watch filesystem for new/updated notes and enqueue indexing jobs

Implementation notes: Watchdog (Python) or Chokidar (Node) are useful for file watching.
