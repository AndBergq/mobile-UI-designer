"use client";

import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import { useGenerationStore } from "@/lib/stores/generationStore";
import { formatDate, truncate } from "@/lib/utils";
import Link from "next/link";

export function RecentProjects() {
  const { history, loadFromHistory } = useGenerationStore();

  if (history.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Recent</h2>
        </div>
        <Link
          href="/projects"
          className="text-sm text-primary flex items-center gap-1 hover:underline"
        >
          View all
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-2">
        {history.slice(0, 3).map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => loadFromHistory(item.id)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors text-left"
          >
            {/* Preview */}
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{
                backgroundColor: item.design.tokens.colors.primary,
              }}
            >
              {item.design.meta.pageType.slice(0, 2).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {truncate(item.prompt, 40)}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.design.meta.theme} • {formatDate(item.createdAt)}
              </p>
            </div>

            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
