import { Settings, Sparkles, Menu } from 'lucide-react';
import useStore from '../store/useStore';

export default function Header({ onMenuClick }) {
  const { setShowSettings } = useStore();

  return (
    <header className="sticky top-0 z-50 glass safe-top">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-xl hover:bg-surface-800 transition-colors lg:hidden"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-lg leading-tight">
              AI Mockup
            </h1>
            <p className="text-xs text-surface-400 -mt-0.5">
              Powered by Gemini
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSettings(true)}
          className="p-2 -mr-2 rounded-xl hover:bg-surface-800 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
