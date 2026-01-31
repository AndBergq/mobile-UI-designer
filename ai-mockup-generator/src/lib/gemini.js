import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;

export const initializeGemini = (apiKey) => {
  genAI = new GoogleGenerativeAI(apiKey);
};

export const isInitialized = () => genAI !== null;

// System prompt for generating UI mockups
const SYSTEM_PROMPT = `You are an expert UI/UX designer specializing in creating ultra-realistic, pixel-perfect mobile app screenshots.
Your task is to generate detailed, photorealistic mockup images based on the user's description.

When generating mockups, follow these principles:
- Use modern design systems (Material Design 3, iOS Human Interface Guidelines, or custom design systems as specified)
- Pay attention to typography, spacing, and visual hierarchy
- Include realistic UI elements like status bars, navigation bars, and proper touch targets
- Apply appropriate shadows, gradients, and depth effects for realism
- Consider accessibility with proper contrast ratios
- Generate images at high resolution (1080x2400 for mobile, or as specified)

Always generate images that look like real app screenshots that could be featured on app stores.`;

// Generate mockup using Gemini's Imagen 3 integration
export const generateMockup = async (prompt, options = {}) => {
  if (!genAI) {
    throw new Error('Gemini API not initialized. Please set your API key.');
  }

  const {
    aspectRatio = '9:19.5',
    style = 'photorealistic',
    platform = 'android',
  } = options;

  // Enhanced prompt for better mockup generation
  const enhancedPrompt = buildEnhancedPrompt(prompt, { aspectRatio, style, platform });

  try {
    // Use Gemini 2.0 Flash for image generation (supports native image output)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        responseModalities: ['image', 'text'],
      },
    });

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: enhancedPrompt }
    ]);

    const response = await result.response;

    // Extract image from response
    const parts = response.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData) {
        return {
          success: true,
          image: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
          prompt: enhancedPrompt,
        };
      }
    }

    // If no image was generated, try using Imagen 3 directly
    return await generateWithImagen(enhancedPrompt);

  } catch (error) {
    console.error('Error generating mockup:', error);

    // Fallback to Imagen 3 if available
    if (error.message?.includes('not supported')) {
      return await generateWithImagen(prompt);
    }

    throw error;
  }
};

// Generate using Imagen 3 model
const generateWithImagen = async (prompt) => {
  if (!genAI) {
    throw new Error('Gemini API not initialized');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-002' });

    const result = await model.generateImages({
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '9:16',
        safetyFilterLevel: 'BLOCK_ONLY_HIGH',
      },
    });

    if (result.images && result.images.length > 0) {
      const image = result.images[0];
      return {
        success: true,
        image: `data:image/png;base64,${image.bytesBase64Encoded}`,
        prompt: prompt,
      };
    }

    throw new Error('No image generated');
  } catch (error) {
    console.error('Imagen generation failed:', error);
    throw error;
  }
};

// Build an enhanced prompt for better results
const buildEnhancedPrompt = (userPrompt, options) => {
  const { style, platform } = options;

  const platformDefaults = {
    android: {
      statusBar: '24dp status bar with time, battery, wifi icons',
      navBar: 'Material Design 3 bottom navigation bar',
      typography: 'Google Sans or Roboto typography',
      corners: '16-28dp corner radius',
    },
    ios: {
      statusBar: 'iOS status bar with Dynamic Island or notch',
      navBar: 'iOS tab bar with SF Symbols',
      typography: 'SF Pro typography',
      corners: '10-20pt corner radius',
    },
  };

  const defaults = platformDefaults[platform] || platformDefaults.android;

  const styleModifiers = {
    photorealistic: 'Ultra-realistic, photographic quality, 8K resolution, professional UI/UX design',
    minimal: 'Clean, minimal design, lots of whitespace, subtle shadows',
    vibrant: 'Bold colors, dynamic gradients, energetic design',
    glassmorphism: 'Glass morphism effects, frosted glass backgrounds, subtle transparency',
    neumorphism: 'Soft shadows, neumorphic design, subtle depth',
  };

  const stylePrefix = styleModifiers[style] || styleModifiers.photorealistic;

  return `Generate a ${stylePrefix} mobile app screenshot:

${userPrompt}

Technical specifications:
- ${defaults.statusBar}
- ${defaults.navBar}
- ${defaults.typography}
- ${defaults.corners}
- Pixel-perfect rendering
- Proper spacing and alignment following 8dp grid
- Realistic shadows and elevation
- High contrast for accessibility
- Native platform look and feel

This should look like a real screenshot from a production app on the App Store or Play Store.`;
};

// Generate variations of a mockup
export const generateVariations = async (originalPrompt, count = 4) => {
  const variations = [];
  const styles = ['photorealistic', 'minimal', 'vibrant', 'glassmorphism'];

  for (let i = 0; i < Math.min(count, styles.length); i++) {
    try {
      const result = await generateMockup(originalPrompt, { style: styles[i] });
      variations.push({ ...result, style: styles[i] });
    } catch (error) {
      console.error(`Failed to generate ${styles[i]} variation:`, error);
    }
  }

  return variations;
};

// Refine a mockup based on feedback
export const refineMockup = async (originalPrompt, feedback) => {
  const refinedPrompt = `${originalPrompt}

Additional refinements requested:
${feedback}

Please generate an improved version incorporating this feedback while maintaining the original design intent.`;

  return generateMockup(refinedPrompt);
};
