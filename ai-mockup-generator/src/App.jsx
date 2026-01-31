import { useEffect, useState, useCallback } from 'react';
import {
  Header,
  PromptInput,
  MockupDisplay,
  Gallery,
  SettingsModal,
  LoadingState,
  ErrorDisplay,
} from './components';
import useStore from './store/useStore';
import { initializeGemini, generateMockup, isInitialized } from './lib/gemini';
import { Key, Sparkles, Image, Zap, Shield } from 'lucide-react';

function App() {
  const {
    apiKey,
    isGenerating,
    setIsGenerating,
    addMockup,
    setSelectedMockup,
    selectedMockup,
    error,
    setError,
    clearError,
    currentPrompt,
    options,
    setShowSettings,
  } = useStore();

  const [currentView, setCurrentView] = useState('generate'); // 'generate' | 'gallery'
  const [latestMockup, setLatestMockup] = useState(null);

  // Initialize Gemini on mount if API key exists
  useEffect(() => {
    if (apiKey) {
      initializeGemini(apiKey);
    }
  }, [apiKey]);

  const handleGenerate = useCallback(async (prompt) => {
    if (!isInitialized()) {
      setShowSettings(true);
      return;
    }

    clearError();
    setIsGenerating(true);
    setLatestMockup(null);

    try {
      const result = await generateMockup(prompt, options);

      if (result.success) {
        const mockup = {
          image: result.image,
          prompt: result.prompt,
          options: { ...options },
        };

        addMockup(mockup);
        setLatestMockup(mockup);
      } else {
        throw new Error(result.error || 'Failed to generate mockup');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err);
    } finally {
      setIsGenerating(false);
    }
  }, [options, clearError, setIsGenerating, addMockup, setError, setShowSettings]);

  const handleRegenerate = useCallback(() => {
    if (currentPrompt) {
      handleGenerate(currentPrompt);
    }
  }, [currentPrompt, handleGenerate]);

  const handleSelectFromGallery = useCallback((mockup) => {
    setSelectedMockup(mockup);
    setLatestMockup(mockup);
    setCurrentView('generate');
  }, [setSelectedMockup]);

  // Show welcome screen if no API key
  if (!apiKey) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="max-w-md w-full text-center">
            {/* Hero */}
            <div className="glow mb-8">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-primary-500/30">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              <span className="gradient-text">AI Mockup Generator</span>
            </h1>

            <p className="text-surface-400 text-lg mb-8">
              Create stunning, ultra-realistic mobile app screenshots with AI. Just describe your design, and watch it come to life.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="card p-4">
                <div className="w-10 h-10 mx-auto rounded-xl bg-primary-500/20 flex items-center justify-center mb-2">
                  <Image className="w-5 h-5 text-primary-400" />
                </div>
                <p className="text-xs text-surface-400">8K Quality</p>
              </div>
              <div className="card p-4">
                <div className="w-10 h-10 mx-auto rounded-xl bg-cyan-500/20 flex items-center justify-center mb-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-xs text-surface-400">Instant</p>
              </div>
              <div className="card p-4">
                <div className="w-10 h-10 mx-auto rounded-xl bg-green-500/20 flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-xs text-surface-400">Private</p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setShowSettings(true)}
              className="btn-primary w-full flex items-center justify-center gap-2 text-base"
            >
              <Key className="w-5 h-5" />
              Set Up API Key to Start
            </button>

            <p className="text-xs text-surface-500 mt-4">
              Free to use with your Google AI Studio API key
            </p>
          </div>
        </main>
        <SettingsModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Tab navigation */}
      <div className="sticky top-[57px] z-40 glass">
        <div className="flex border-b border-surface-800">
          <button
            onClick={() => setCurrentView('generate')}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              currentView === 'generate'
                ? 'text-white'
                : 'text-surface-400 hover:text-surface-300'
            }`}
          >
            Generate
            {currentView === 'generate' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setCurrentView('gallery')}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              currentView === 'gallery'
                ? 'text-white'
                : 'text-surface-400 hover:text-surface-300'
            }`}
          >
            Gallery
            {currentView === 'gallery' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      <main className="flex-1 pb-safe">
        {currentView === 'generate' ? (
          <>
            <PromptInput
              onGenerate={handleGenerate}
              disabled={isGenerating}
            />

            {error && (
              <ErrorDisplay
                error={error}
                onRetry={handleRegenerate}
              />
            )}

            {isGenerating && <LoadingState />}

            {!isGenerating && !error && latestMockup && (
              <MockupDisplay
                mockup={latestMockup}
                onRegenerate={handleRegenerate}
              />
            )}
          </>
        ) : (
          <Gallery onSelect={handleSelectFromGallery} />
        )}
      </main>

      <SettingsModal />
    </div>
  );
}

export default App;
