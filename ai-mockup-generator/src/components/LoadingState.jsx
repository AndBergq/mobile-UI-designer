import { Sparkles } from 'lucide-react';

const LOADING_MESSAGES = [
  'Crafting your design...',
  'Applying design principles...',
  'Rendering UI elements...',
  'Adding finishing touches...',
  'Optimizing for perfection...',
  'Generating pixels...',
  'Building your mockup...',
];

export default function LoadingState() {
  const message = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

  return (
    <div className="px-4 py-8">
      <div className="card overflow-hidden">
        {/* Phone frame skeleton */}
        <div className="flex justify-center py-6 bg-gradient-to-b from-surface-800/50 to-transparent rounded-2xl">
          <div className="phone-frame">
            <div className="phone-screen relative overflow-hidden">
              <div className="absolute inset-0 loading-shimmer" />

              {/* Animated icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="glow">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center animate-pulse-slow">
                    <Sparkles className="w-8 h-8 text-white animate-float" />
                  </div>
                </div>
                <p className="text-sm text-surface-400 mt-4 animate-pulse">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" style={{ width: '60%' }} />
          </div>
          <p className="text-xs text-surface-500 text-center mt-2">
            This may take a few moments...
          </p>
        </div>
      </div>
    </div>
  );
}
