"use client";

import { useState } from "react";
import { Key, Trash2, Check, ExternalLink, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGenerationStore } from "@/lib/stores/generationStore";
import { validateApiKey } from "@/lib/gemini/client";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { apiKey, setApiKey, clearHistory, history } = useGenerationStore();
  const [inputKey, setInputKey] = useState(apiKey);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSaveKey = async () => {
    if (!inputKey.trim()) return;

    setIsValidating(true);
    setIsValid(null);

    try {
      const valid = await validateApiKey(inputKey);
      setIsValid(valid);

      if (valid) {
        setApiKey(inputKey);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear all generation history?")) {
      clearHistory();
    }
  };

  return (
    <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your PenpotAI experience</p>
      </div>

      {/* API Key Section */}
      <section className="bg-card rounded-2xl border border-border p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Key className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">Gemini API Key</h2>
            <p className="text-sm text-muted-foreground">
              Required for AI generation
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <input
              type="password"
              value={inputKey}
              onChange={(e) => {
                setInputKey(e.target.value);
                setIsValid(null);
              }}
              placeholder="Enter your Gemini API key"
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-background",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                isValid === true && "border-green-500",
                isValid === false && "border-red-500"
              )}
            />
            {isValid !== null && (
              <div
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2",
                  isValid ? "text-green-500" : "text-red-500"
                )}
              >
                {isValid ? "✓ Valid" : "✗ Invalid"}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSaveKey}
              disabled={!inputKey.trim() || isValidating}
              className="flex-1"
            >
              {isValidating ? (
                "Validating..."
              ) : saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Saved!
                </>
              ) : (
                "Save Key"
              )}
            </Button>
            <Button
              variant="outline"
              asChild
            >
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Key
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Your API key is stored locally in your browser and never sent to our servers.
          </p>
        </div>
      </section>

      {/* Data Section */}
      <section className="bg-card rounded-2xl border border-border p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h2 className="font-semibold">Data Management</h2>
            <p className="text-sm text-muted-foreground">
              {history.length} designs in history
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleClearHistory}
          disabled={history.length === 0}
          className="w-full text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Generation History
        </Button>
      </section>

      {/* About Section */}
      <section className="bg-card rounded-2xl border border-border p-4 space-y-4">
        <h2 className="font-semibold">About PenpotAI</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            PenpotAI transforms natural language prompts into production-ready UI
            mockups using Google Gemini AI and the Penpot design system.
          </p>
          <p>
            Version 1.0.0 • Built with Next.js 14, TypeScript, and Tailwind CSS
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/penpot/penpot"
              target="_blank"
              rel="noopener noreferrer"
            >
              Penpot
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://ai.google.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gemini AI
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
