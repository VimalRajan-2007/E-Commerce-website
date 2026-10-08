import React from 'react';
import { WifiOff, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onBackToHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBackToHome }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-[75vh] flex items-center justify-center py-20 px-4 transition-colors">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center mx-auto text-cyan-500 shadow-sm">
          <WifiOff className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-500 uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display">
            Looks like this page got disconnected.
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            The requested hardware catalog route or product specification is not available or has been reassigned.
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};
