import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_SYSTEM_PROMPT } from "@/lib/gemini/system-prompt";

export async function POST(request: NextRequest) {
  try {
    const { prompt, apiKey } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (!apiKey || typeof apiKey !== "string") {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

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

    const fullPrompt = `${GEMINI_SYSTEM_PROMPT}

User Request: ${prompt}

Generate a complete design specification following the JSON schema above. Return ONLY valid JSON, no code blocks or explanations.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    let text = response.text().trim();

    // Clean up markdown code blocks
    if (text.startsWith("```json")) {
      text = text.slice(7);
    } else if (text.startsWith("```")) {
      text = text.slice(3);
    }
    if (text.endsWith("```")) {
      text = text.slice(0, -3);
    }
    text = text.trim();

    // Parse and validate
    const design = JSON.parse(text);

    if (!design.meta || !design.canvas || !design.tokens || !design.components) {
      throw new Error("Invalid design specification");
    }

    return NextResponse.json({ success: true, design });
  } catch (error) {
    console.error("Generation error:", error);

    const message = error instanceof Error ? error.message : "Generation failed";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
