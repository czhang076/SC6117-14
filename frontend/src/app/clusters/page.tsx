"use client";

import { useEffect, useState } from 'react';
import { getClusters, Cluster } from '@/lib/api';
import ClusterGroup from '@/components/ClusterGroup';
import { Loader2, Network } from 'lucide-react';

export default function ClustersPage() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const data = await getClusters();
        setClusters(data);
      } catch (error) {
        console.error("Failed to fetch clusters", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClusters();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Analyzing knowledge graph...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-100 rounded-lg">
          <Network className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Graph</h1>
          <p className="text-gray-600">Automatically clustered topics from your documents</p>
        </div>
      </div>

      {clusters.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No clusters found. Try ingesting some data first.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clusters.map((cluster, index) => (
            <ClusterGroup key={index} cluster={cluster} />
          ))}
        </div>
      )}
    </div>
  );
}
