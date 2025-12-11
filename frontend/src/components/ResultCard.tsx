import { SearchResult } from '@/lib/api';
import { FileText, Zap, BrainCircuit } from 'lucide-react';
import clsx from 'clsx';

interface ResultCardProps {
  result: SearchResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const isExact = result.type === 'keyword';

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 text-gray-700">
          <FileText className="w-5 h-5" />
          <span className="font-bold text-lg truncate max-w-[300px]">{result.file_path}</span>
        </div>
        <span
          className={clsx(
            "px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1",
            isExact
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          )}
        >
          {isExact ? <Zap className="w-3 h-3" /> : <BrainCircuit className="w-3 h-3" />}
          {isExact ? "Exact Match" : "Semantic Match"}
        </span>
      </div>
      
      <div className="text-sm text-gray-500 mb-2">
        Score: {result.score.toFixed(4)}
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 bg-gray-50 p-3 rounded-md font-mono">
        {result.content}
      </p>
    </div>
  );
}
