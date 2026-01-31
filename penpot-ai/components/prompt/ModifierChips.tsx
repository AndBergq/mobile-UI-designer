"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ModifierChipsProps {
  onSelect: (modifier: string) => void;
}

const modifiers = [
  { label: "Dark Mode", value: "with dark mode theme" },
  { label: "Glassmorphism", value: "with glassmorphism style" },
  { label: "Minimal", value: "with minimalist design" },
  { label: "Material", value: "following Material Design 3" },
  { label: "iOS Style", value: "with iOS/Apple design style" },
  { label: "Neubrutalism", value: "with neubrutalist style" },
  { label: "Mobile", value: "optimized for mobile" },
  { label: "Desktop", value: "optimized for desktop" },
  { label: "Dashboard", value: "as a dashboard layout" },
  { label: "Landing", value: "as a landing page" },
  { label: "E-commerce", value: "for e-commerce" },
  { label: "Social", value: "for social media" },
];

export function ModifierChips({ onSelect }: ModifierChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-1">
      {modifiers.map((modifier, index) => (
        <motion.button
          key={modifier.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          onClick={() => onSelect(modifier.value)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium",
            "bg-secondary text-secondary-foreground",
            "hover:bg-secondary/80",
            "active:scale-95 transition-transform",
            "touch-target"
          )}
        >
          {modifier.label}
        </motion.button>
      ))}
    </div>
  );
}
