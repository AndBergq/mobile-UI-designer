"use client";

import { Home, FolderOpen, Plus, LayoutTemplate, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/projects", icon: FolderOpen, label: "Projects" },
  { href: "/create", icon: Plus, label: "Create", primary: true },
  { href: "/templates", icon: LayoutTemplate, label: "Templates" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.primary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex items-center justify-center"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center justify-center",
                    "w-14 h-14 -mt-6 rounded-full",
                    "bg-primary text-primary-foreground",
                    "shadow-lg shadow-primary/25",
                    "touch-target"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center",
                "w-16 h-full touch-target",
                "transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
