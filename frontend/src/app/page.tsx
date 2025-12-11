"use client";

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ResultCard from '@/components/ResultCard';
import { searchNotes, SearchResult } from '@/lib/api';
import { Loader2, SearchX } from 'lucide-react';

export default function Home() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const data = await searchNotes(query);
      setResults(data);
    } catch (error) {
      console.error("Search failed", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4 mt-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Unlock Your <span className="text-indigo-600">Knowledge</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Instantly search through your notes using hybrid keyword and semantic search technology.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          </div>
        ) : hasSearched && results.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <SearchX className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No results found</h3>
            <p className="text-gray-500">Try adjusting your search terms or re-indexing your data.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {results.map((result, index) => (
              <ResultCard key={index} result={result} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
