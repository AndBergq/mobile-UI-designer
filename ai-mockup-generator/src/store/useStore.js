import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // API Key
      apiKey: '',
      setApiKey: (key) => set({ apiKey: key }),

      // Generated mockups history
      mockups: [],
      addMockup: (mockup) => set((state) => ({
        mockups: [
          {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...mockup,
          },
          ...state.mockups,
        ].slice(0, 50), // Keep last 50 mockups
      })),
      removeMockup: (id) => set((state) => ({
        mockups: state.mockups.filter((m) => m.id !== id),
      })),
      clearMockups: () => set({ mockups: [] }),

      // Current generation state
      isGenerating: false,
      setIsGenerating: (value) => set({ isGenerating: value }),

      generationProgress: 0,
      setGenerationProgress: (value) => set({ generationProgress: value }),

      currentPrompt: '',
      setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),

      // Generation options
      options: {
        platform: 'android',
        style: 'photorealistic',
        aspectRatio: '9:19.5',
      },
      setOptions: (newOptions) => set((state) => ({
        options: { ...state.options, ...newOptions },
      })),

      // UI State
      selectedMockup: null,
      setSelectedMockup: (mockup) => set({ selectedMockup: mockup }),

      showSettings: false,
      setShowSettings: (value) => set({ showSettings: value }),

      // Favorites
      favorites: [],
      toggleFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id)
          ? state.favorites.filter((fid) => fid !== id)
          : [...state.favorites, id],
      })),
      isFavorite: (id) => get().favorites.includes(id),

      // Saved prompts
      savedPrompts: [],
      savePrompt: (prompt) => set((state) => ({
        savedPrompts: [
          { id: Date.now(), text: prompt, createdAt: new Date().toISOString() },
          ...state.savedPrompts,
        ].slice(0, 20),
      })),
      removeSavedPrompt: (id) => set((state) => ({
        savedPrompts: state.savedPrompts.filter((p) => p.id !== id),
      })),

      // Error handling
      error: null,
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'ai-mockup-generator',
      partialize: (state) => ({
        apiKey: state.apiKey,
        mockups: state.mockups,
        favorites: state.favorites,
        savedPrompts: state.savedPrompts,
        options: state.options,
      }),
    }
  )
);

export default useStore;
