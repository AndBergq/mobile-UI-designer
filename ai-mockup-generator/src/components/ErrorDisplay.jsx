import { AlertTriangle, RefreshCw, Settings } from 'lucide-react';
import useStore from '../store/useStore';

export default function ErrorDisplay({ error, onRetry }) {
  const { setShowSettings } = useStore();

  const isApiKeyError = error?.message?.toLowerCase().includes('api') ||
                        error?.message?.toLowerCase().includes('key') ||
                        error?.message?.toLowerCase().includes('unauthorized');

  return (
    <div className="px-4 py-4">
      <div className="card border-red-500/30 bg-red-500/5">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center mb-4">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>

          <h3 className="font-semibold text-lg mb-2">
            {isApiKeyError ? 'API Key Issue' : 'Generation Failed'}
          </h3>

          <p className="text-surface-400 text-sm mb-6 max-w-sm">
            {error?.message || 'An error occurred while generating your mockup. Please try again.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {isApiKeyError ? (
              <button
                onClick={() => setShowSettings(true)}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Configure API Key
              </button>
            ) : (
              <button
                onClick={onRetry}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            )}
          </div>

          {/* Tips */}
          <div className="mt-6 pt-6 border-t border-surface-800 w-full text-left">
            <p className="text-xs text-surface-500 mb-2">Troubleshooting tips:</p>
            <ul className="text-xs text-surface-400 space-y-1">
              <li>• Make sure your API key is valid and has quota remaining</li>
              <li>• Try simplifying your prompt if it's very long</li>
              <li>• Check your internet connection</li>
              <li>• The AI may refuse certain content - try rephrasing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
