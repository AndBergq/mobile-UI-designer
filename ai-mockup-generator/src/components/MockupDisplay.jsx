import { Download, Share2, Heart, RefreshCw, Expand, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import useStore from '../store/useStore';

export default function MockupDisplay({ mockup, onRegenerate }) {
  const { toggleFavorite, isFavorite } = useStore();
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!mockup) return null;

  const handleDownload = async () => {
    try {
      const link = document.createElement('a');
      link.href = mockup.image;
      link.download = `mockup-${mockup.id || Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const blob = await fetch(mockup.image).then(r => r.blob());
        const file = new File([blob], 'mockup.png', { type: 'image/png' });
        await navigator.share({
          title: 'AI Generated Mockup',
          text: mockup.prompt,
          files: [file],
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    } else {
      // Fallback: copy image to clipboard
      handleCopyImage();
    }
  };

  const handleCopyImage = async () => {
    try {
      const blob = await fetch(mockup.image).then(r => r.blob());
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const favorite = mockup.id ? isFavorite(mockup.id) : false;

  return (
    <>
      <div className="px-4 pb-4">
        <div className="card overflow-hidden">
          {/* Phone frame mockup */}
          <div className="flex justify-center py-6 bg-gradient-to-b from-surface-800/50 to-transparent rounded-2xl">
            <div className="phone-frame">
              <div className="phone-screen">
                <img
                  src={mockup.image}
                  alt="Generated mockup"
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setIsFullscreen(true)}
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-surface-800 mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => mockup.id && toggleFavorite(mockup.id)}
                className={`p-2.5 rounded-xl transition-all ${
                  favorite
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-surface-800 hover:bg-surface-700'
                }`}
                title={favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={onRegenerate}
                className="p-2.5 rounded-xl bg-surface-800 hover:bg-surface-700 transition-colors"
                title="Generate variation"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsFullscreen(true)}
                className="p-2.5 rounded-xl bg-surface-800 hover:bg-surface-700 transition-colors"
                title="Fullscreen"
              >
                <Expand className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyImage}
                className="p-2.5 rounded-xl bg-surface-800 hover:bg-surface-700 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-surface-800 hover:bg-surface-700 transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={handleDownload}
                className="btn-primary py-2.5 px-4 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          {/* Prompt used */}
          <div className="mt-4 pt-4 border-t border-surface-800">
            <p className="text-xs text-surface-400 mb-1">Prompt used:</p>
            <p className="text-sm text-surface-300 line-clamp-3">
              {mockup.prompt}
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-surface-800/80 hover:bg-surface-700 transition-colors"
          >
            <span className="sr-only">Close</span>
            ×
          </button>
          <img
            src={mockup.image}
            alt="Generated mockup"
            className="max-w-full max-h-full object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
