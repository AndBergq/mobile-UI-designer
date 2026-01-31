"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  Settings,
  User,
  CreditCard
} from "lucide-react";
import { useGenerationStore } from "@/lib/stores/generationStore";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    prompt: "A modern SaaS dashboard with analytics cards, a sidebar navigation, and data visualization charts. Clean design with subtle shadows.",
    color: "bg-blue-500",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: ShoppingBag,
    prompt: "An e-commerce product listing page with product cards, filters sidebar, and shopping cart summary. Modern minimal design.",
    color: "bg-green-500",
  },
  {
    id: "social",
    name: "Social Feed",
    icon: MessageSquare,
    prompt: "A social media feed with post cards, user avatars, like/comment buttons, and a bottom navigation bar. Mobile-first design.",
    color: "bg-purple-500",
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    prompt: "A settings page with grouped options, toggle switches, and account management sections. Clean iOS-style design.",
    color: "bg-gray-500",
  },
  {
    id: "profile",
    name: "Profile",
    icon: User,
    prompt: "A user profile page with avatar, stats, bio section, and activity feed. Modern card-based layout.",
    color: "bg-orange-500",
  },
  {
    id: "checkout",
    name: "Checkout",
    icon: CreditCard,
    prompt: "A checkout flow with order summary, payment form, and shipping details. Trust-building design with progress indicator.",
    color: "bg-pink-500",
  },
];

export function TemplateGallery() {
  const { generate, isGenerating, apiKey } = useGenerationStore();

  const handleTemplateClick = async (template: typeof templates[0]) => {
    if (!isGenerating && apiKey) {
      await generate(template.prompt);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {templates.map((template, index) => {
        const Icon = template.icon;
        return (
          <motion.button
            key={template.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleTemplateClick(template)}
            disabled={isGenerating || !apiKey}
            className={cn(
              "flex flex-col items-center justify-center",
              "p-4 rounded-2xl border border-border",
              "bg-card hover:bg-accent/50",
              "transition-all duration-200",
              "touch-target",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "active:scale-95"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-2",
                template.color
              )}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium">{template.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
