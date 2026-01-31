import { X, Key, ExternalLink, AlertCircle, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { initializeGemini, isInitialized } from '../lib/gemini';

export default function SettingsModal() {
  const { showSettings, setShowSettings, apiKey, setApiKey } = useStore();
  const [inputKey, setInputKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setInputKey(apiKey);
  }, [apiKey]);

  if (!showSettings) return null;

  const handleSave = () => {
    const trimmedKey = inputKey.trim();

    if (!trimmedKey) {
      setError('Please enter an API key');
      return;
    }

    if (!trimmedKey.startsWith('AIza')) {
      setError('Invalid API key format. Keys should start with "AIza"');
      return;
    }

    setApiKey(trimmedKey);
    initializeGemini(trimmedKey);
    setError('');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowSettings(false);
    }, 1500);
  };

  const handleClose = () => {
    setInputKey(apiKey);
    setError('');
    setShowSettings(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md glass rounded-t-3xl sm:rounded-3xl p-6 animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 safe-bottom">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl">Settings</h2>
          <button
            onClick={handleClose}
            className="p-2 -mr-2 rounded-xl hover:bg-surface-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* API Key Section */}
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Key className="w-4 h-4 text-primary-400" />
              Google AI Studio API Key
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => {
                setInputKey(e.target.value);
                setError('');
              }}
              placeholder="AIza..."
              className="input-field font-mono text-sm"
            />
            {error && (
              <p className="flex items-center gap-1.5 text-red-400 text-sm mt-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-surface-800/50 border border-surface-700/50">
            <p className="text-sm text-surface-300 mb-3">
              To get your free API key:
            </p>
            <ol className="text-sm text-surface-400 space-y-2 ml-4 list-decimal">
              <li>Go to Google AI Studio</li>
              <li>Sign in with your Google account</li>
              <li>Click "Get API key" in the sidebar</li>
              <li>Create a new API key and paste it above</li>
            </ol>
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary-400 hover:text-primary-300 text-sm mt-3"
            >
              Get your API key
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={handleSave}
            disabled={saved}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <Check className="w-5 h-5" />
                Saved!
              </>
            ) : (
              'Save API Key'
            )}
          </button>

          {isInitialized() && (
            <p className="text-center text-sm text-green-400 flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" />
              API key configured
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-surface-800">
          <p className="text-xs text-surface-500 text-center">
            Your API key is stored locally in your browser and never sent to our servers.
          </p>
        </div>
      </div>
    </div>
  );
}
