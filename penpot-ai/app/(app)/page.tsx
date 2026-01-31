"use client";

import { PromptInput } from "@/components/prompt/PromptInput";
import { PromptSuggestions } from "@/components/prompt/PromptSuggestions";
import { TemplateGallery } from "@/components/prompt/TemplateGallery";
import { RecentProjects } from "@/components/common/RecentProjects";
import { useGenerationStore } from "@/lib/stores/generationStore";
import { GenerationProgress } from "@/components/generation/GenerationProgress";
import { GenerationPreview } from "@/components/generation/GenerationPreview";

export default function HomePage() {
  const { isGenerating, currentDesign } = useGenerationStore();

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Main Content */}
      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Welcome Section */}
        {!isGenerating && !currentDesign && (
          <>
            <section className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                What would you like to create?
              </h1>
              <p className="text-muted-foreground">
                Describe your design and let AI bring it to life
              </p>
            </section>

            {/* Quick Suggestions */}
            <PromptSuggestions />

            {/* Templates */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Start from a template</h2>
              <TemplateGallery />
            </section>

            {/* Recent Projects */}
            <RecentProjects />
          </>
        )}

        {/* Generation Progress */}
        {isGenerating && <GenerationProgress />}

        {/* Design Preview */}
        {!isGenerating && currentDesign && <GenerationPreview />}
      </div>

      {/* Fixed Prompt Input */}
      <PromptInput />
    </div>
  );
}
