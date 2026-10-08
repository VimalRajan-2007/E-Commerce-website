import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success' || !toast.type;
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-xl backdrop-blur-md border transition-all duration-300 animate-slideUp ${
              isSuccess
                ? 'bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 border-slate-800 dark:border-slate-100'
                : isError
                ? 'bg-rose-950/95 text-rose-100 border-rose-800'
                : 'bg-slate-900/95 text-slate-100 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600 shrink-0" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              ) : (
                <Info className="w-5 h-5 text-cyan-400 shrink-0" />
              )}
              <span className="text-xs font-semibold leading-snug">
                {toast.message}
              </span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 dark:hover:bg-slate-900/10 transition-colors ml-2"
            >
              <X className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
