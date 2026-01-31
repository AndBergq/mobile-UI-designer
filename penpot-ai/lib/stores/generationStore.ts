import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DesignSpecification, GenerationState } from "@/types/design";
import { generateDesign } from "@/lib/gemini/client";

interface GenerationStore {
  // State
  isGenerating: boolean;
  progress: number;
  currentStep: string;
  currentDesign: DesignSpecification | null;
  error: string | null;

  // History
  history: GenerationState[];

  // Settings
  apiKey: string;

  // Actions
  generate: (prompt: string) => Promise<void>;
  setProgress: (progress: number, step: string) => void;
  setDesign: (design: DesignSpecification) => void;
  setError: (error: string | null) => void;
  clearDesign: () => void;
  setApiKey: (key: string) => void;

  // History actions
  addToHistory: (state: GenerationState) => void;
  clearHistory: () => void;
  loadFromHistory: (id: string) => void;
}

export const useGenerationStore = create<GenerationStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isGenerating: false,
      progress: 0,
      currentStep: "",
      currentDesign: null,
      error: null,
      history: [],
      apiKey: "",

      // Generate design from prompt
      generate: async (prompt: string) => {
        const { apiKey } = get();

        if (!apiKey) {
          set({ error: "Please set your Gemini API key in settings" });
          return;
        }

        set({
          isGenerating: true,
          progress: 0,
          currentStep: "Interpreting prompt...",
          error: null,
        });

        try {
          // Step 1: Interpret prompt
          set({ progress: 10, currentStep: "Analyzing design requirements..." });

          // Step 2: Generate design
          set({ progress: 30, currentStep: "Generating UI components..." });

          const design = await generateDesign(prompt, apiKey, (progress, step) => {
            set({ progress: 30 + progress * 0.6, currentStep: step });
          });

          // Step 3: Validate design
          set({ progress: 90, currentStep: "Validating accessibility..." });

          // Step 4: Complete
          set({
            progress: 100,
            currentStep: "Complete!",
            currentDesign: design,
            isGenerating: false,
          });

          // Add to history
          get().addToHistory({
            id: `gen-${Date.now()}`,
            prompt,
            design,
            createdAt: new Date().toISOString(),
          });

        } catch (error) {
          set({
            isGenerating: false,
            error: error instanceof Error ? error.message : "Generation failed",
            progress: 0,
            currentStep: "",
          });
        }
      },

      setProgress: (progress, step) => set({ progress, currentStep: step }),

      setDesign: (design) => set({ currentDesign: design }),

      setError: (error) => set({ error }),

      clearDesign: () => set({ currentDesign: null, progress: 0, currentStep: "" }),

      setApiKey: (apiKey) => set({ apiKey }),

      addToHistory: (state) =>
        set((s) => ({
          history: [state, ...s.history].slice(0, 50), // Keep last 50
        })),

      clearHistory: () => set({ history: [] }),

      loadFromHistory: (id) => {
        const item = get().history.find((h) => h.id === id);
        if (item) {
          set({ currentDesign: item.design });
        }
      },
    }),
    {
      name: "penpot-ai-generation",
      partialize: (state) => ({
        history: state.history,
        apiKey: state.apiKey,
      }),
    }
  )
);
