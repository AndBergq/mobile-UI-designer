"use client";

import { useState, useEffect, useCallback } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceInputProps {
  isActive: boolean;
  onStart: () => void;
  onResult: (text: string) => void;
  onCancel: () => void;
}

export function VoiceInput({
  isActive,
  onStart,
  onResult,
  onCancel,
}: VoiceInputProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = "en-US";

        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          onResult(transcript);
        };

        recognitionInstance.onerror = () => {
          onCancel();
        };

        recognitionInstance.onend = () => {
          onCancel();
        };

        setRecognition(recognitionInstance);
      }
    }
  }, [onResult, onCancel]);

  const handleStart = useCallback(() => {
    if (recognition && !isActive) {
      onStart();
      recognition.start();
    }
  }, [recognition, isActive, onStart]);

  const handleStop = useCallback(() => {
    if (recognition && isActive) {
      recognition.stop();
      onCancel();
    }
  }, [recognition, isActive, onCancel]);

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={isActive ? handleStop : handleStart}
        className={cn(
          "touch-target shrink-0 rounded-full",
          isActive && "bg-red-100 text-red-600 dark:bg-red-900/30"
        )}
      >
        {isActive ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </Button>

      {/* Recording indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-full h-full bg-red-500 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
