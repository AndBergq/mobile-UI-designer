"use client";

import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useGenerationStore } from "@/lib/stores/generationStore";

const suggestions = [
  "A SaaS dashboard with glassmorphism theme",
  "Mobile banking app with dark mode",
  "E-commerce product page with minimal design",
  "Social media feed with Material Design",
  "Settings page with iOS style",
  "Landing page for a tech startup",
];

export function PromptSuggestions() {
  const { generate, isGenerating, apiKey } = useGenerationStore();

  const handleSuggestionClick = async (suggestion: string) => {
    if (!isGenerating && apiKey) {
      await generate(suggestion);
    }
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Lightbulb className="w-4 h-4" />
        <span className="text-sm font-medium">Try these</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={isGenerating || !apiKey}
            className="px-3 py-2 text-sm rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
