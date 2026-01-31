"use client";

import { useState, useRef } from "react";
import { Mic, ChevronUp, Loader2, Wand2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGenerationStore } from "@/lib/stores/generationStore";
import { ModifierChips } from "./ModifierChips";
import { VoiceInput } from "./VoiceInput";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const [showModifiers, setShowModifiers] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { generate, isGenerating, progress } = useGenerationStore();

  const handleSubmit = async () => {
    if (!prompt.trim() || isGenerating) return;
    await generate(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleVoiceResult = (text: string) => {
    setPrompt((prev) => (prev ? `${prev} ${text}` : text));
    setIsVoiceActive(false);
  };

  const addModifier = (modifier: string) => {
    setPrompt((prev) => (prev ? `${prev} ${modifier}` : modifier));
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 z-40">
      {/* Modifier Chips */}
      <AnimatePresence>
        {showModifiers && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 overflow-hidden"
          >
            <ModifierChips onSelect={addModifier} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Input Container */}
      <motion.div
        layout
        className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden"
      >
        {/* Progress Bar */}
        {isGenerating && (
          <div className="h-1 bg-muted">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-end p-3 gap-2">
          {/* Modifiers Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowModifiers(!showModifiers)}
            className={cn(
              "touch-target shrink-0",
              showModifiers && "bg-primary/10 text-primary"
            )}
          >
            <ChevronUp
              className={cn(
                "w-5 h-5 transition-transform duration-200",
                showModifiers && "rotate-180"
              )}
            />
          </Button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your design..."
              disabled={isGenerating}
              className={cn(
                "w-full resize-none bg-transparent text-base",
                "placeholder:text-muted-foreground",
                "focus:outline-none",
                "min-h-[44px] max-h-32 py-2.5",
                "disabled:opacity-50"
              )}
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height =
                  Math.min(target.scrollHeight, 128) + "px";
              }}
            />
          </div>

          {/* Voice Input */}
          <VoiceInput
            isActive={isVoiceActive}
            onStart={() => setIsVoiceActive(true)}
            onResult={handleVoiceResult}
            onCancel={() => setIsVoiceActive(false)}
          />

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isGenerating}
            size="icon"
            className={cn(
              "touch-target shrink-0 rounded-full",
              "bg-primary text-primary-foreground",
              "disabled:bg-muted disabled:text-muted-foreground"
            )}
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Wand2 className="w-5 h-5" />
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
