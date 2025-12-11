"use client";

import Link from 'next/link';
import { Brain, RefreshCw, Upload } from 'lucide-react';
import { triggerIngest, uploadFiles } from '@/lib/api';
import toast from 'react-hot-toast';
import { useState, useRef, ChangeEvent } from 'react';

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReIndex = async () => {
    // Trigger file input click
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    const toastId = toast.loading('Uploading and indexing files...');

    try {
      await uploadFiles(files);
      toast.success('Files ingested successfully!', { id: toastId });
    } catch (error) {
      toast.error('Failed to ingest files.', { id: toastId });
      console.error(error);
    } finally {
      setLoading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
          <Brain className="w-8 h-8" />
          <span>MetaNotes</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium">
            Search
          </Link>
          <Link href="/clusters" className="text-gray-600 hover:text-indigo-600 font-medium">
            Knowledge Graph
          </Link>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            // @ts-ignore
            webkitdirectory="" 
            directory=""
          />

          <button
            onClick={handleReIndex}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm font-medium disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {loading ? 'Indexing...' : 'Upload Notes'}
          </button>
        </div>
      </div>
    </nav>
  );
}
