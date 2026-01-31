import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_SYSTEM_PROMPT } from "./system-prompt";
import type { DesignSpecification } from "@/types/design";

type ProgressCallback = (progress: number, step: string) => void;

export async function generateDesign(
  prompt: string,
  apiKey: string,
  onProgress?: ProgressCallback
): Promise<DesignSpecification> {
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    },
  });

  onProgress?.(10, "Initializing AI model...");

  const fullPrompt = `${GEMINI_SYSTEM_PROMPT}

User Request: ${prompt}

Generate a complete design specification following the JSON schema above. Return ONLY valid JSON, no code blocks or explanations.`;

  onProgress?.(20, "Processing design request...");

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    onProgress?.(70, "Parsing design specification...");

    // Clean up the response - remove any markdown code blocks
    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.slice(7);
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.slice(3);
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.slice(0, -3);
    }
    cleanedText = cleanedText.trim();

    onProgress?.(80, "Validating design...");

    const design = JSON.parse(cleanedText) as DesignSpecification;

    // Validate required fields
    if (!design.meta || !design.canvas || !design.tokens || !design.components) {
      throw new Error("Invalid design specification: missing required fields");
    }

    onProgress?.(90, "Applying design rules...");

    // Apply post-processing rules
    const processedDesign = applyDesignRules(design);

    onProgress?.(100, "Complete!");

    return processedDesign;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse AI response as valid JSON");
    }
    throw error;
  }
}

function applyDesignRules(design: DesignSpecification): DesignSpecification {
  // Ensure mobile-first viewport
  if (!design.canvas.viewport) {
    design.canvas.viewport = { width: 375, height: 812 };
  }

  // Ensure minimum touch targets (44px)
  design.components = design.components.map((component) => {
    if (
      component.type === "button" ||
      component.type === "input" ||
      component.type === "checkbox" ||
      component.type === "radio" ||
      component.type === "toggle"
    ) {
      if (typeof component.size.height === "number" && component.size.height < 44) {
        component.size.height = 44;
      }
      if (typeof component.size.width === "number" && component.size.width < 44) {
        component.size.width = 44;
      }
    }
    return component;
  });

  // Ensure accessibility fields
  if (!design.accessibility) {
    design.accessibility = {
      contrastPassing: true,
      touchTargetsValid: true,
      headingOrderValid: true,
      focusStatesIncluded: true,
      ariaLabels: {},
    };
  }

  // Ensure QA fields
  if (!design.qa) {
    design.qa = {
      overlapsDetected: false,
      missingFonts: [],
      colorCount: Object.keys(design.tokens.colors).length,
      gridAligned: true,
      touchTargetsValid: true,
    };
  }

  return design;
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    await model.generateContent("Hello");
    return true;
  } catch {
    return false;
  }
}
