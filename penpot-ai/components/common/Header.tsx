"use client";

import { Sparkles, Menu, Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <span className="font-bold text-lg hidden sm:block">PenpotAI</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="touch-target">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="touch-target sm:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
