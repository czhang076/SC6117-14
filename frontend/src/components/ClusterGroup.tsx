import { Cluster } from '@/lib/api';
import { FolderOpen, File } from 'lucide-react';

interface ClusterGroupProps {
  cluster: Cluster;
}

export default function ClusterGroup({ cluster }: ClusterGroupProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="bg-indigo-50 px-5 py-4 border-b border-indigo-100">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-indigo-900 text-lg">{cluster.cluster_name}</h3>
        </div>
        <p className="text-indigo-600/70 text-xs mt-1 font-medium uppercase tracking-wider">
          {cluster.doc_count} Documents
        </p>
      </div>
      
      <div className="p-4">
        <ul className="space-y-2">
          {cluster.docs.map((doc, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer group">
              <File className="w-4 h-4 mt-0.5 text-gray-400 group-hover:text-indigo-400" />
              <span className="break-all">{doc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
