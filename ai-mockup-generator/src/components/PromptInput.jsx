import { useState } from 'react';
import { Wand2, ChevronDown, Smartphone, Apple, Palette, Bookmark, X } from 'lucide-react';
import useStore from '../store/useStore';

const EXAMPLE_PROMPTS = [
  {
    title: 'Bento Grid Dashboard',
    prompt: 'A high-fidelity fullscreen Android app screenshot in dark mode, featuring a Bento 2.0 grid layout. The background is a deep charcoal (#121212). The interface consists of asymmetrical rounded rectangular tiles with a 24dp corner radius. The grid features: a large primary tile with a glowing neon cyan circular "Focus Timer"; a medium tile with a biometric "Heart Rate" wave graph; and smaller square tiles for "Weather" and "Calendar". The design follows Material Design 3 principles, including a 80dp bottom Navigation Bar with 4 minimalist icons. Professional UI/UX design, Google Sans typography, soft inner glows, depth-based layering, 8k resolution.',
  },
  {
    title: 'Finance App',
    prompt: 'Ultra-realistic iOS finance app screenshot with dark glassmorphism design. Features a large balance card with frosted glass effect showing "$24,650.00", animated gradient background in purple and blue. Below shows transaction list with merchant logos, timestamps, and amounts. Bottom navigation with 5 icons. SF Pro typography, proper iOS status bar with notch.',
  },
  {
    title: 'Social Media Feed',
    prompt: 'Modern social media app feed screenshot for Android. Clean white background with subtle shadows. Shows 2 post cards with user avatars, usernames, timestamps, high-quality photos, like/comment/share buttons. Floating action button in bottom right. Material Design 3, rounded corners, proper spacing.',
  },
  {
    title: 'E-commerce Product',
    prompt: 'Luxury e-commerce product detail page screenshot. Large product image taking 60% of screen, showing premium sneakers. Below: product name in bold, price with discount badge, color selector dots, size grid buttons, prominent "Add to Cart" button with gradient. Clean minimal design, 8k resolution.',
  },
  {
    title: 'Music Player',
    prompt: 'Spotify-style music player now playing screen. Large album artwork with subtle shadow, song title and artist below. Progress bar with timestamps. Control buttons: shuffle, previous, play/pause, next, repeat. Volume slider. Dark theme with green accent color. Smooth gradients.',
  },
  {
    title: 'Weather App',
    prompt: 'Beautiful weather app screenshot showing sunny weather. Large temperature "72°F" with animated sun icon. Location name, "Partly Cloudy" description. Hourly forecast horizontal scroll. 7-day forecast list below. Gradient background from light blue to white. Smooth rounded cards.',
  },
];

const STYLES = [
  { id: 'photorealistic', label: 'Photorealistic', icon: '📸' },
  { id: 'minimal', label: 'Minimal', icon: '✨' },
  { id: 'vibrant', label: 'Vibrant', icon: '🎨' },
  { id: 'glassmorphism', label: 'Glass', icon: '🔮' },
  { id: 'neumorphism', label: 'Neumorphic', icon: '🌙' },
];

export default function PromptInput({ onGenerate, disabled }) {
  const { currentPrompt, setCurrentPrompt, options, setOptions, savedPrompts, savePrompt, removeSavedPrompt } = useStore();
  const [showExamples, setShowExamples] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPrompt.trim() && !disabled) {
      onGenerate(currentPrompt);
    }
  };

  const handleExampleClick = (prompt) => {
    setCurrentPrompt(prompt);
    setShowExamples(false);
  };

  const handleSavePrompt = () => {
    if (currentPrompt.trim()) {
      savePrompt(currentPrompt);
    }
  };

  return (
    <div className="px-4 py-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main textarea */}
        <div className="relative">
          <textarea
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
            placeholder="Describe your mockup in detail...

Example: A dark mode fitness app dashboard with a circular progress ring showing daily steps, heart rate card, and weekly activity chart..."
            className="input-field min-h-[140px] resize-none pr-12"
            disabled={disabled}
          />
          {currentPrompt && (
            <button
              type="button"
              onClick={handleSavePrompt}
              className="absolute top-3 right-3 p-2 rounded-lg hover:bg-surface-700 transition-colors"
              title="Save prompt"
            >
              <Bookmark className="w-5 h-5 text-surface-400" />
            </button>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowExamples(!showExamples)}
            className="btn-secondary text-sm flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Examples
            <ChevronDown className={`w-4 h-4 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
          </button>

          {savedPrompts.length > 0 && (
            <button
              type="button"
              onClick={() => setShowSaved(!showSaved)}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              <Bookmark className="w-4 h-4" />
              Saved ({savedPrompts.length})
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="btn-secondary text-sm flex items-center gap-2 ml-auto"
          >
            <Palette className="w-4 h-4" />
            Options
          </button>
        </div>

        {/* Examples dropdown */}
        {showExamples && (
          <div className="glass-light rounded-2xl p-3 space-y-2 animate-in fade-in slide-in-from-top-2">
            <p className="text-xs text-surface-400 px-2">Click to use:</p>
            {EXAMPLE_PROMPTS.map((example, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleExampleClick(example.prompt)}
                className="w-full text-left p-3 rounded-xl bg-surface-800/50 hover:bg-surface-700/50 transition-colors"
              >
                <span className="font-medium text-sm">{example.title}</span>
                <p className="text-xs text-surface-400 mt-1 line-clamp-2">
                  {example.prompt}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Saved prompts dropdown */}
        {showSaved && (
          <div className="glass-light rounded-2xl p-3 space-y-2 animate-in fade-in slide-in-from-top-2">
            <p className="text-xs text-surface-400 px-2">Your saved prompts:</p>
            {savedPrompts.map((saved) => (
              <div
                key={saved.id}
                className="flex items-start gap-2 p-3 rounded-xl bg-surface-800/50 hover:bg-surface-700/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPrompt(saved.text);
                    setShowSaved(false);
                  }}
                  className="flex-1 text-left"
                >
                  <p className="text-sm line-clamp-2">{saved.text}</p>
                </button>
                <button
                  type="button"
                  onClick={() => removeSavedPrompt(saved.id)}
                  className="p-1 rounded-lg hover:bg-surface-600 transition-colors"
                >
                  <X className="w-4 h-4 text-surface-400" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Options panel */}
        {showOptions && (
          <div className="glass-light rounded-2xl p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
            {/* Platform selection */}
            <div>
              <label className="text-xs text-surface-400 mb-2 block">Platform</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOptions({ platform: 'android' })}
                  className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    options.platform === 'android'
                      ? 'bg-primary-500/20 border-2 border-primary-500 text-primary-400'
                      : 'bg-surface-800 border-2 border-transparent'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Android
                </button>
                <button
                  type="button"
                  onClick={() => setOptions({ platform: 'ios' })}
                  className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    options.platform === 'ios'
                      ? 'bg-primary-500/20 border-2 border-primary-500 text-primary-400'
                      : 'bg-surface-800 border-2 border-transparent'
                  }`}
                >
                  <Apple className="w-4 h-4" />
                  iOS
                </button>
              </div>
            </div>

            {/* Style selection */}
            <div>
              <label className="text-xs text-surface-400 mb-2 block">Style</label>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setOptions({ style: style.id })}
                    className={`py-2 px-3 rounded-xl text-sm flex items-center gap-1.5 transition-all ${
                      options.style === style.id
                        ? 'bg-primary-500/20 border-2 border-primary-500 text-primary-400'
                        : 'bg-surface-800 border-2 border-transparent'
                    }`}
                  >
                    <span>{style.icon}</span>
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Generate button */}
        <button
          type="submit"
          disabled={!currentPrompt.trim() || disabled}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base"
        >
          {disabled ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate Mockup
            </>
          )}
        </button>
      </form>
    </div>
  );
}
