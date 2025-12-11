import axios from 'axios';

// In Docker, frontend talks to backend via browser, so localhost is correct if ports are mapped.
// If SSR, we might need internal docker name, but for client-side fetching, localhost:8000 is fine.
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface SearchResult {
  file_path: string;
  content: string;
  score: number;
  type: 'keyword' | 'semantic';
  payload?: any;
}

export interface Cluster {
  cluster_name: string;
  doc_count: number;
  docs: string[];
}

export const searchNotes = async (query: string): Promise<SearchResult[]> => {
  const response = await api.get(`/search`, { params: { query } });
  return response.data.results;
};

export const getClusters = async (): Promise<Cluster[]> => {
  const response = await api.get(`/clusters`);
  return response.data.clusters;
};

export const triggerIngest = async (): Promise<void> => {
  await api.post(`/ingest`);
};

export const uploadFiles = async (files: FileList): Promise<void> => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  
  await api.post(`/ingest/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
