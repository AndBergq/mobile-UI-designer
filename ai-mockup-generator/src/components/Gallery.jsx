import { Image, Trash2, Heart, Clock } from 'lucide-react';
import useStore from '../store/useStore';

export default function Gallery({ onSelect }) {
  const { mockups, removeMockup, isFavorite, clearMockups } = useStore();

  if (mockups.length === 0) {
    return (
      <div className="px-4 py-8">
        <div className="card flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-800 flex items-center justify-center mb-4">
            <Image className="w-8 h-8 text-surface-500" />
          </div>
          <h3 className="font-semibold text-lg mb-1">No mockups yet</h3>
          <p className="text-surface-400 text-sm">
            Generate your first mockup to see it here
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-surface-400" />
          <h2 className="font-semibold">Recent ({mockups.length})</h2>
        </div>
        {mockups.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Clear all mockups?')) {
                clearMockups();
              }
            }}
            className="text-sm text-surface-400 hover:text-red-400 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {mockups.map((mockup) => (
          <div
            key={mockup.id}
            className="group relative rounded-2xl overflow-hidden bg-surface-800 aspect-[9/16] cursor-pointer"
            onClick={() => onSelect(mockup)}
          >
            <img
              src={mockup.image}
              alt="Generated mockup"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Favorite indicator */}
            {isFavorite(mockup.id) && (
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80">
                <Heart className="w-3.5 h-3.5 text-white fill-current" />
              </div>
            )}

            {/* Actions on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-white/80">
                {formatDate(mockup.createdAt)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Delete this mockup?')) {
                    removeMockup(mockup.id);
                  }
                }}
                className="p-2 rounded-lg bg-red-500/80 hover:bg-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
