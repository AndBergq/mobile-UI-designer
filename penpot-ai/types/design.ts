// Design Specification Types - Based on 445 Design Rules

export interface DesignSpecification {
  meta: DesignMeta;
  canvas: CanvasConfig;
  tokens: DesignTokens;
  components: ComponentConfig[];
  interactions: InteractionConfig[];
  content: ContentConfig;
  accessibility: AccessibilityConfig;
  qa: QAConfig;
}

export interface DesignMeta {
  interpretation: string;
  pageType: PageType;
  theme: ThemeType;
  complexity: "simple" | "moderate" | "complex";
}

export type PageType =
  | "dashboard"
  | "landing"
  | "auth"
  | "settings"
  | "feed"
  | "detail"
  | "empty"
  | "error"
  | "loading"
  | "wizard";

export type ThemeType =
  | "glass"
  | "neubrutalism"
  | "material"
  | "saas"
  | "minimalist"
  | "gaming"
  | "corporate"
  | "playful"
  | "cyberpunk"
  | "apple";

// Canvas Configuration (Rules 001-010)
export interface CanvasConfig {
  viewport: { width: number; height: number };
  dpi: 72 | 144 | 326 | 458;
  canvasMode: "infinite" | "fixed";
  showGrid: boolean;
  gridGutter: number;
  gridMargin: number;
  gridColumns: number;
  layoutDirection: "ltr" | "rtl";
  unitConversion: "px" | "rem-to-px";
  backgroundColor: string;
  clipContent: boolean;
}

// Design Tokens (Rules 231-240)
export interface DesignTokens {
  colors: ColorTokens;
  spacing: SpacingTokens;
  radii: RadiiTokens;
  typography: TypographyTokens;
  shadows: ShadowTokens;
}

export interface ColorTokens {
  primary: string;
  secondary: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  [key: string]: string;
}

export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  [key: string]: number;
}

export interface RadiiTokens {
  sm: number;
  md: number;
  lg: number;
  full: number;
  [key: string]: number;
}

export interface TypographyTokens {
  fontFamily: string;
  scale: number;
  sizes: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    "2xl": number;
    "3xl": number;
    "4xl": number;
    [key: string]: number;
  };
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
  [key: string]: string;
}

// Component Configuration
export interface ComponentConfig {
  id: string;
  type: ComponentType;
  name: string;
  position: { x: number; y: number };
  size: { width: number | "auto"; height: number | "auto" };
  layout: FlexConfig;
  style: StyleConfig;
  variant: VariantConfig;
  props: Record<string, unknown>;
  responsive: ResponsiveConfig;
  accessibility: ComponentAccessibility;
  children: ComponentConfig[];
}

export type ComponentType =
  | "frame"
  | "rectangle"
  | "ellipse"
  | "text"
  | "image"
  | "icon"
  | "button"
  | "input"
  | "checkbox"
  | "radio"
  | "toggle"
  | "slider"
  | "select"
  | "navbar"
  | "sidebar"
  | "tabbar"
  | "card"
  | "list"
  | "modal"
  | "toast"
  | "badge"
  | "avatar"
  | "progress"
  | "chart"
  | "divider"
  | "spacer";

// Flex Configuration (Rules 061-075)
export interface FlexConfig {
  mode: "none" | "flex";
  direction: "row" | "column";
  justify: "start" | "center" | "end" | "space-between";
  align: "start" | "center" | "end" | "baseline" | "stretch";
  gap: number;
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  wrap: boolean;
  horizontalSizing: "fixed" | "hug" | "fill";
  verticalSizing: "fixed" | "hug" | "fill";
}

// Style Configuration (Rules 026-045)
export interface StyleConfig {
  fill: FillConfig;
  stroke?: StrokeConfig;
  cornerRadius: CornerRadius;
  shadow?: string;
  effects?: EffectsConfig;
  blendMode?: BlendMode;
}

export interface FillConfig {
  type: "solid" | "linear-gradient" | "radial-gradient" | "image" | "none";
  color?: string;
  opacity?: number;
  gradientStops?: Array<{ color: string; position: number }>;
  gradientAngle?: number;
  imageUrl?: string;
}

export interface StrokeConfig {
  color: string;
  weight: number;
  alignment: "inside" | "center" | "outside";
  style: "solid" | "dashed" | "dotted";
  cap?: "round" | "square" | "butt";
  join?: "miter" | "round" | "bevel";
}

export interface CornerRadius {
  all?: number;
  topLeft?: number;
  topRight?: number;
  bottomLeft?: number;
  bottomRight?: number;
}

export interface EffectsConfig {
  dropShadow?: {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
  };
  innerShadow?: {
    x: number;
    y: number;
    blur: number;
    color: string;
  };
  layerBlur?: number;
  backdropBlur?: number;
}

export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten";

// Variant Configuration (Rules 311-320)
export interface VariantConfig {
  size: "sm" | "md" | "lg";
  style: "primary" | "secondary" | "tertiary" | "ghost" | "destructive";
  state: "default" | "hover" | "active" | "focus" | "disabled";
}

// Responsive Configuration (Rules 321-330)
export interface ResponsiveConfig {
  mobile: ViewportConfig;
  tablet: ViewportConfig;
  desktop: ViewportConfig;
}

export interface ViewportConfig {
  visible: boolean;
  position?: { x: number; y: number };
  size?: { width: number | "auto"; height: number | "auto" };
  layout?: Partial<FlexConfig>;
}

// Accessibility Configuration (Rules 261-270)
export interface ComponentAccessibility {
  role?: string;
  label?: string;
  description?: string;
}

export interface AccessibilityConfig {
  contrastPassing: boolean;
  touchTargetsValid: boolean;
  headingOrderValid: boolean;
  focusStatesIncluded: boolean;
  ariaLabels: Record<string, string>;
}

// Interaction Configuration (Rules 251-260)
export interface InteractionConfig {
  triggerId: string;
  trigger: "click" | "hover" | "focus";
  action: "navigate" | "overlay" | "state-change" | "scroll-to";
  target?: string;
  transition: TransitionConfig;
}

export interface TransitionConfig {
  type: "smart-animate" | "fade" | "slide" | "none";
  duration: number;
  curve: string;
}

// Content Configuration (Rules 351-360)
export interface ContentConfig {
  people: string[];
  companies: string[];
  paragraphs: {
    short: string[];
    long: string[];
  };
  dates: {
    future: string[];
    past: string[];
  };
  prices: string[];
  statuses: string[];
}

// QA Configuration (Rules 331-340)
export interface QAConfig {
  overlapsDetected: boolean;
  missingFonts: string[];
  colorCount: number;
  gridAligned: boolean;
  touchTargetsValid: boolean;
}

// Generation State
export interface GenerationState {
  id: string;
  prompt: string;
  design: DesignSpecification;
  createdAt: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description?: string;
  design: DesignSpecification;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
}
