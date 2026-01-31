"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Share2,
  Copy,
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  Code,
  Palette,
  X,
} from "lucide-react";
import { useGenerationStore } from "@/lib/stores/generationStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DesignCanvas } from "@/components/preview/DesignCanvas";

type ViewportSize = "mobile" | "tablet" | "desktop";

const viewportSizes: Record<ViewportSize, { width: number; height: number; icon: typeof Smartphone }> = {
  mobile: { width: 375, height: 812, icon: Smartphone },
  tablet: { width: 768, height: 1024, icon: Tablet },
  desktop: { width: 1440, height: 900, icon: Monitor },
};

export function GenerationPreview() {
  const { currentDesign, clearDesign } = useGenerationStore();
  const [viewport, setViewport] = useState<ViewportSize>("mobile");
  const [showCode, setShowCode] = useState(false);

  if (!currentDesign) return null;

  const handleExport = () => {
    const json = JSON.stringify(currentDesign, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `design-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    const json = JSON.stringify(currentDesign, null, 2);
    navigator.clipboard.writeText(json);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "PenpotAI Design",
        text: currentDesign.meta.interpretation,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">Your Design</h2>
          <p className="text-sm text-muted-foreground">
            {currentDesign.meta.interpretation}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={clearDesign}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Viewport Switcher */}
      <div className="flex items-center justify-center gap-2 p-1 bg-muted rounded-xl">
        {(Object.keys(viewportSizes) as ViewportSize[]).map((size) => {
          const Icon = viewportSizes[size].icon;
          return (
            <Button
              key={size}
              variant={viewport === size ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewport(size)}
              className="flex-1"
            >
              <Icon className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline capitalize">{size}</span>
            </Button>
          );
        })}
      </div>

      {/* Preview Canvas */}
      <motion.div
        layout
        className="relative bg-muted rounded-2xl p-4 overflow-hidden"
      >
        <div
          className={cn(
            "mx-auto bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl",
            "transition-all duration-300"
          )}
          style={{
            width: Math.min(viewportSizes[viewport].width, 343),
            height: Math.min(viewportSizes[viewport].height * 0.6, 500),
          }}
        >
          <DesignCanvas design={currentDesign} viewport={viewport} />
        </div>
      </motion.div>

      {/* Design Info */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-primary">
            {currentDesign.components.length}
          </p>
          <p className="text-xs text-muted-foreground">Components</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center">
          <p className="text-2xl font-bold capitalize">
            {currentDesign.meta.theme}
          </p>
          <p className="text-xs text-muted-foreground">Theme</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center">
          <p className="text-2xl font-bold capitalize">
            {currentDesign.meta.pageType}
          </p>
          <p className="text-xs text-muted-foreground">Type</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={handleExport} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Export JSON
        </Button>
        <Button variant="outline" onClick={handleCopyCode} className="w-full">
          <Copy className="w-4 h-4 mr-2" />
          Copy Code
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={handleShare} className="w-full">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button variant="outline" onClick={() => setShowCode(!showCode)} className="w-full">
          <Code className="w-4 h-4 mr-2" />
          {showCode ? "Hide" : "View"} Code
        </Button>
      </div>

      {/* Code Preview */}
      {showCode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-900 rounded-xl p-4 overflow-auto max-h-96"
        >
          <pre className="text-xs text-green-400 font-mono">
            {JSON.stringify(currentDesign, null, 2)}
          </pre>
        </motion.div>
      )}

      {/* Tokens Preview */}
      <div className="bg-card rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">Color Tokens</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(currentDesign.tokens.colors).slice(0, 8).map(([name, color]) => (
            <div
              key={name}
              className="flex items-center gap-2 px-2 py-1 bg-muted rounded-lg"
            >
              <div
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
