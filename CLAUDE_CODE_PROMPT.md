# PenpotAI - Claude Code Implementation Prompt

## 🎯 Project Mission

Build **PenpotAI**, a mobile-first web application that transforms natural language prompts into production-ready UI mockups. The app uses **Google Gemini AI** for design interpretation and **Penpot** (open-source) for rendering.

**Core Flow:** User types "Create a SaaS dashboard with glassmorphism theme" → Gemini interprets → Engine applies 445 design rules → Penpot renders → User downloads/exports

---

## 📱 CRITICAL: Mobile-First Architecture

This app MUST be built mobile-first. Every component, layout, and interaction should be designed for touch devices first, then enhanced for larger screens.

### Mobile-First Principles
1. **Touch targets**: Minimum 44x44px for all interactive elements
2. **Bottom navigation**: Primary actions within thumb reach
3. **Swipe gestures**: Support for common mobile patterns
4. **Viewport units**: Use `dvh` for full-height layouts
5. **Progressive disclosure**: Show essential UI first, reveal complexity on demand
6. **Offline support**: Cache generated designs locally

---

## 🛠 Tech Stack

```yaml
Frontend:
  Framework: Next.js 14+ (App Router)
  Language: TypeScript (strict mode)
  Styling: Tailwind CSS (mobile-first utilities)
  UI Library: shadcn/ui (accessible components)
  State: Zustand (lightweight, mobile-friendly)
  Forms: React Hook Form + Zod
  Animations: Framer Motion (60fps mobile)
  Icons: Lucide React

Backend:
  Runtime: Node.js 20+
  API: Next.js Route Handlers
  AI: Google Gemini 1.5 Pro (@google/generative-ai)
  Design Rendering: Penpot API
  Real-time: Server-Sent Events (SSE) for generation progress

Database:
  Primary: Supabase (PostgreSQL + Auth + Storage)
  Cache: Upstash Redis (rate limiting, session)

Infrastructure:
  Hosting: Vercel (Edge Functions)
  CDN: Vercel Edge Network
  Storage: Supabase Storage (designs, exports)
  Analytics: Vercel Analytics
```

---

## 📁 Project Structure

```
penpot-ai/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx
│   ├── (app)/
│   │   ├── layout.tsx              # Mobile shell with bottom nav
│   │   ├── page.tsx                # Main prompt interface
│   │   ├── create/page.tsx         # Full-screen creation mode
│   │   ├── projects/
│   │   │   ├── page.tsx            # Project gallery (grid)
│   │   │   └── [id]/page.tsx       # Single project view
│   │   ├── preview/[id]/page.tsx   # Full-screen preview
│   │   ├── export/[id]/page.tsx    # Export options
│   │   └── settings/page.tsx       # User preferences
│   ├── api/
│   │   ├── generate/
│   │   │   ├── route.ts            # Main generation endpoint
│   │   │   └── stream/route.ts     # SSE streaming endpoint
│   │   ├── penpot/
│   │   │   ├── create/route.ts
│   │   │   ├── export/route.ts
│   │   │   └── templates/route.ts
│   │   ├── projects/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── auth/
│   │       └── callback/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                    # Landing/marketing page
│
├── components/
│   ├── ui/                         # shadcn/ui components
│   ├── mobile/
│   │   ├── BottomNav.tsx           # Fixed bottom navigation
│   │   ├── BottomSheet.tsx         # Swipeable bottom panel
│   │   ├── SwipeableCard.tsx       # Gesture-enabled cards
│   │   ├── PullToRefresh.tsx       # Pull refresh pattern
│   │   ├── FloatingAction.tsx      # FAB button
│   │   └── SafeAreaView.tsx        # Notch/home indicator safe
│   ├── prompt/
│   │   ├── PromptInput.tsx         # Main text input
│   │   ├── VoiceInput.tsx          # Speech-to-text
│   │   ├── ModifierChips.tsx       # Theme/style quick picks
│   │   ├── PromptHistory.tsx       # Recent prompts
│   │   ├── PromptSuggestions.tsx   # AI-powered suggestions
│   │   └── TemplateGallery.tsx     # Starting templates
│   ├── preview/
│   │   ├── DesignCanvas.tsx        # Zoomable/pannable preview
│   │   ├── DeviceFrame.tsx         # iPhone/Android/Desktop frames
│   │   ├── LayerPanel.tsx          # Layer tree (collapsible)
│   │   ├── ResponsiveToggle.tsx    # Viewport switcher
│   │   ├── ZoomControls.tsx        # Pinch-to-zoom support
│   │   └── AnnotationLayer.tsx     # Design notes overlay
│   ├── export/
│   │   ├── ExportPanel.tsx         # Export options sheet
│   │   ├── CodePreview.tsx         # Generated code viewer
│   │   ├── TokensPanel.tsx         # Design tokens list
│   │   ├── AssetGallery.tsx        # Downloadable assets
│   │   └── ShareSheet.tsx          # Native share integration
│   ├── generation/
│   │   ├── GenerationProgress.tsx  # Step-by-step progress
│   │   ├── GenerationPreview.tsx   # Live preview during gen
│   │   ├── ErrorRecovery.tsx       # Retry/modify on failure
│   │   └── IterationPanel.tsx      # Version history
│   └── common/
│       ├── Header.tsx
│       ├── LoadingStates.tsx
│       ├── EmptyStates.tsx
│       └── ErrorBoundary.tsx
│
├── lib/
│   ├── gemini/
│   │   ├── client.ts               # Gemini API client
│   │   ├── system-prompt.ts        # Complete system prompt
│   │   ├── parser.ts               # Response parser
│   │   └── validator.ts            # Schema validation
│   ├── penpot/
│   │   ├── client.ts               # Penpot API client
│   │   ├── shapes.ts               # Shape primitives
│   │   ├── components.ts           # Component builders
│   │   ├── layouts.ts              # Layout generators
│   │   └── exporter.ts             # Export formatters
│   ├── engine/
│   │   ├── index.ts                # Main engine orchestrator
│   │   ├── interpreter.ts          # Prompt → Config
│   │   ├── composer.ts             # Config → Layer Tree
│   │   ├── validator.ts            # QA checks
│   │   ├── renderer.ts             # Layer Tree → Penpot
│   │   └── rules/
│   │       ├── 001-010-canvas.ts
│   │       ├── 011-025-geometry.ts
│   │       ├── 026-045-styles.ts
│   │       ├── 046-060-typography.ts
│   │       ├── 061-075-flexbox.ts
│   │       ├── 076-095-inputs.ts
│   │       ├── 096-110-navigation.ts
│   │       ├── 111-125-containers.ts
│   │       ├── 126-140-charts.ts
│   │       ├── 141-150-media.ts
│   │       ├── 151-160-states.ts
│   │       ├── 161-170-feedback.ts
│   │       ├── 171-180-forms.ts
│   │       ├── 181-190-patterns.ts
│   │       ├── 191-200-themes.ts
│   │       ├── 201-210-advanced-flex.ts
│   │       ├── 211-220-data.ts
│   │       ├── 221-230-advanced-type.ts
│   │       ├── 231-240-tokens.ts
│   │       ├── 241-250-complex-components.ts
│   │       ├── 251-260-prototyping.ts
│   │       ├── 261-270-accessibility.ts
│   │       ├── 271-280-export.ts
│   │       ├── 281-290-graphics.ts
│   │       ├── 291-300-templates.ts
│   │       ├── 301-310-backend.ts
│   │       ├── 311-320-variants.ts
│   │       ├── 321-330-responsive.ts
│   │       ├── 331-340-qa.ts
│   │       ├── 341-350-motion.ts
│   │       ├── 351-360-content.ts
│   │       ├── 361-370-icons.ts
│   │       ├── 371-380-pages.ts
│   │       ├── 381-390-visual-themes.ts
│   │       ├── 391-400-micro.ts
│   │       ├── 401-410-utils.ts
│   │       ├── 411-420-layout-tokens.ts
│   │       ├── 421-430-border-tokens.ts
│   │       ├── 431-440-constraints.ts
│   │       └── 441-445-compliance.ts
│   ├── hooks/
│   │   ├── useGeneration.ts
│   │   ├── usePreview.ts
│   │   ├── usePenpot.ts
│   │   ├── useGestures.ts          # Mobile gestures
│   │   ├── useOffline.ts           # Offline support
│   │   └── useVoiceInput.ts
│   ├── stores/
│   │   ├── generationStore.ts
│   │   ├── projectStore.ts
│   │   ├── previewStore.ts
│   │   └── settingsStore.ts
│   ├── utils/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   ├── responsive.ts
│   │   └── accessibility.ts
│   └── db/
│       ├── client.ts               # Supabase client
│       ├── schema.sql
│       └── types.ts
│
├── types/
│   ├── design.ts                   # Design specification types
│   ├── penpot.ts                   # Penpot API types
│   ├── generation.ts               # Generation state types
│   └── engine.ts                   # Engine rule types
│
├── public/
│   ├── icons/
│   ├── templates/
│   └── manifest.json               # PWA manifest
│
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🧠 Complete Design Engine (445 Rules)

The engine must implement ALL 445 design rules. Below is the complete specification organized by category.

### Section 1: Canvas & Environment (001-010)

```typescript
// lib/engine/rules/001-010-canvas.ts

export interface CanvasConfig {
  // 001. Workspace.Root
  viewport: {
    width: number;   // px
    height: number;  // px
  };
  
  // 002. Workspace.DPI
  dpi: 72 | 144 | 326 | 458;
  
  // 003. Workspace.Mode
  canvasMode: 'infinite' | 'fixed';
  
  // 004. Grid.Overlay
  showGrid: boolean;
  
  // 005. Grid.Gutter
  gridGutter: number; // px
  
  // 006. Grid.Margin
  gridMargin: number; // px
  
  // 007. Layout.Direction
  layoutDirection: 'ltr' | 'rtl';
  
  // 008. Unit.System
  unitConversion: 'px' | 'rem-to-px';
  
  // 009. Background.Fill
  backgroundColor: string; // hex/rgba
  
  // 010. Clipping.Mask
  clipContent: boolean;
}
```

### Section 2: Geometry & Shapes (011-025)

```typescript
// lib/engine/rules/011-025-geometry.ts

export interface ShapeConfig {
  // 011. Shape.Type
  type: 'rectangle' | 'ellipse' | 'polygon' | 'path';
  
  // 012-013. Dimensions
  width: number | 'auto';
  height: number | 'auto';
  
  // 014-015. Coordinates
  x: number;
  y: number;
  
  // 016-019. Corner Radius (individual)
  cornerRadius: {
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bottomRight: number;
  };
  
  // 020. Corner.Smoothing (iOS continuous corners)
  cornerSmoothing: number; // 0-100%
  
  // 021. Rotation.Angle
  rotation: number; // 0-360
  
  // 022-023. Flip
  flipHorizontal: boolean;
  flipVertical: boolean;
  
  // 024. Aspect.Lock
  aspectLocked: boolean;
  
  // 025. Path.Data (SVG d attribute)
  pathData?: string;
}
```

### Section 3: Color & Styles (026-045)

```typescript
// lib/engine/rules/026-045-styles.ts

export interface StyleConfig {
  // 026. Fill.Type
  fill: {
    type: 'solid' | 'linear-gradient' | 'radial-gradient' | 'image';
    
    // 027. Fill.Color
    color?: string;
    
    // 028. Fill.Opacity
    opacity?: number;
    
    // 029. Gradient.Stops
    gradientStops?: Array<{ color: string; position: number }>;
    
    // 030. Gradient.Angle
    gradientAngle?: number;
  };
  
  stroke: {
    // 031. Stroke.Color
    color: string;
    
    // 032. Stroke.Weight
    weight: number;
    
    // 033. Stroke.Alignment
    alignment: 'inside' | 'center' | 'outside';
    
    // 034. Stroke.Style
    style: 'solid' | 'dashed' | 'dotted';
    
    // 035. Stroke.Cap
    cap: 'round' | 'square' | 'butt';
    
    // 036. Stroke.Join
    join: 'miter' | 'round' | 'bevel';
  };
  
  // 037-041. Effects
  effects: {
    dropShadow?: {
      x: number;      // 037
      y: number;      // 038
      blur: number;   // 039
      spread: number; // 040
      color: string;
    };
    innerShadow?: {   // 041
      x: number;
      y: number;
      blur: number;
      color: string;
    };
    layerBlur?: number;    // 042
    backdropBlur?: number; // 043
  };
  
  // 044. Blend.Mode
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';
  
  // 045. Token.Mapping
  tokenName?: string; // semantic name like 'Surface-Primary'
}
```

### Section 4: Typography Engine (046-060)

```typescript
// lib/engine/rules/046-060-typography.ts

export interface TypographyConfig {
  // 046. Font.Family
  fontFamily: string;
  
  // 047. Font.Weight
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  
  // 048. Font.Size
  fontSize: number;
  
  // 049. Font.Style
  fontStyle: 'normal' | 'italic';
  
  // 050. Line.Height
  lineHeight: number | string; // px or %
  
  // 051. Letter.Spacing
  letterSpacing: number;
  
  // 052. Text.Decoration
  textDecoration: 'none' | 'underline' | 'strikethrough';
  
  // 053. Text.Case
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  
  // 054. Text.Align.H
  textAlignH: 'left' | 'center' | 'right' | 'justify';
  
  // 055. Text.Align.V
  textAlignV: 'top' | 'middle' | 'bottom';
  
  // 056. Text.AutoResize
  autoResize: 'width' | 'height' | 'fixed';
  
  // 057. Text.Truncation
  truncate: boolean;
  
  // 058. Text.Columns
  columns?: number;
  
  // 059. Paragraph.Spacing
  paragraphSpacing: number;
  
  // 060. List.Type
  listType: 'none' | 'bulleted' | 'numbered';
}
```

### Section 5: Flex & Auto-Layout (061-075)

```typescript
// lib/engine/rules/061-075-flexbox.ts

export interface FlexConfig {
  // 061. Layout.Mode
  layoutMode: 'none' | 'flex';
  
  // 062. Flex.Direction
  flexDirection: 'row' | 'column';
  
  // 063. Flex.Spacing (gap)
  gap: number;
  
  // 064-067. Flex.Padding
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  
  // 068. Flex.Justify
  justifyContent: 'start' | 'center' | 'end' | 'space-between';
  
  // 069. Flex.AlignItems
  alignItems: 'start' | 'center' | 'end' | 'baseline';
  
  // 070. Flex.Wrap
  flexWrap: boolean;
  
  // 071. Sizing.Horizontal
  horizontalSizing: 'fixed' | 'hug' | 'fill';
  
  // 072. Sizing.Vertical
  verticalSizing: 'fixed' | 'hug' | 'fill';
  
  // 073. Z-Index
  zIndex: number;
  
  // 074. Parent.ID
  parentId?: string;
  
  // 075. Order.Index
  orderIndex: number;
}
```

### Section 6: Atomic Components - Inputs (076-095)

```typescript
// lib/engine/rules/076-095-inputs.ts

export interface ButtonConfig {
  // 076. Button.Base
  container: ShapeConfig;
  
  // 077. Button.Label
  label: string;
  
  // 078. Button.Icon.Leading
  iconLeading?: string;
  
  // 079. Button.Icon.Trailing
  iconTrailing?: string;
}

export interface InputConfig {
  // 080. Input.Field
  field: ShapeConfig;
  
  // 081. Input.Placeholder
  placeholder: string;
  
  // 082. Input.Label
  label: string;
  
  // 083. Input.Helper
  helperText?: string;
  
  // 084. Input.Border.Focus
  focusBorderColor: string;
}

export interface CheckboxConfig {
  // 085. Checkbox.Box
  box: ShapeConfig;
  
  // 086. Checkbox.Check
  checkPath: string;
}

export interface RadioConfig {
  // 087. Radio.Outer
  outer: ShapeConfig;
  
  // 088. Radio.Inner
  inner: ShapeConfig;
}

export interface ToggleConfig {
  // 089. Toggle.Track
  track: ShapeConfig;
  
  // 090. Toggle.Thumb
  thumb: ShapeConfig;
}

export interface SliderConfig {
  // 091. Slider.Track
  track: ShapeConfig;
  
  // 092. Slider.Thumb
  thumb: ShapeConfig;
  
  // 093. Slider.Progress
  progress: ShapeConfig;
}

export interface StepperConfig {
  // 094. Stepper.Buttons
  buttons: { plus: ShapeConfig; minus: ShapeConfig };
  
  // 095. Stepper.Value
  value: TypographyConfig;
}
```

### Section 7: Navigation Components (096-110)

```typescript
// lib/engine/rules/096-110-navigation.ts

export interface NavbarConfig {
  // 096. Navbar.Container
  container: ShapeConfig & FlexConfig;
  
  // 097. Navbar.Logo
  logo: ShapeConfig | string;
  
  // 098. Navbar.Links
  links: Array<{ label: string; href: string }>;
}

export interface SidebarConfig {
  // 099. Sidebar.Container
  container: ShapeConfig & FlexConfig;
  
  // 100. Sidebar.Header
  header: ShapeConfig;
  
  // 101. Sidebar.Footer
  footer: ShapeConfig;
}

export interface TabBarConfig {
  // 102. TabBar.Container
  container: ShapeConfig;
  
  // 103. Tab.Item
  items: Array<{ icon: string; label: string }>;
  
  // 104. Tab.Indicator
  indicator: ShapeConfig;
}

export interface BreadcrumbConfig {
  // 105. Breadcrumb.Crumbs
  crumbs: string[];
  
  // 106. Breadcrumb.Separator
  separator: string;
}

export interface PaginationConfig {
  // 107. Pagination.Dots
  dots: ShapeConfig;
  
  // 108. Pagination.Arrows
  arrows: { prev: ShapeConfig; next: ShapeConfig };
}

export interface MenuConfig {
  // 109. Menu.Dropdown
  dropdown: ShapeConfig;
  
  // 110. Menu.Item
  item: ShapeConfig & TypographyConfig;
}
```

### Section 8: Content Containers (111-125)

```typescript
// lib/engine/rules/111-125-containers.ts

export interface CardConfig {
  // 111. Card.Container
  container: ShapeConfig;
  
  // 112. Card.Media
  media?: ShapeConfig;
  
  // 113. Card.Body
  body: ShapeConfig;
  
  // 114. Card.Title
  title: TypographyConfig;
  
  // 115. Card.Subtitle
  subtitle?: TypographyConfig;
  
  // 116. Card.Footer
  footer?: ShapeConfig;
  
  // 117. Card.Header
  header?: ShapeConfig;
}

export interface ListConfig {
  // 118. List.Item
  item: ShapeConfig & FlexConfig;
  
  // 119. List.Divider
  divider: ShapeConfig;
}

export interface AccordionConfig {
  // 120. Accordion.Header
  header: ShapeConfig;
  
  // 121. Accordion.Content
  content: ShapeConfig;
}

export interface ModalConfig {
  // 122. Modal.Overlay
  overlay: ShapeConfig;
  
  // 123. Modal.Window
  window: ShapeConfig;
  
  // 124. Modal.Close
  closeButton: ShapeConfig;
}

// 125. Toast.Container
export interface ToastConfig {
  container: ShapeConfig;
}
```

### Section 9: Data Visualization (126-140)

```typescript
// lib/engine/rules/126-140-charts.ts

export interface ChartConfig {
  // 126-127. Axes
  axisX: ShapeConfig;
  axisY: ShapeConfig;
  
  // 128. Chart.Gridlines
  gridlines: ShapeConfig;
}

export interface BarChartConfig extends ChartConfig {
  // 129. Bar.Rect
  bars: ShapeConfig[];
  
  // 130. Bar.Value
  values: TypographyConfig[];
}

export interface LineChartConfig extends ChartConfig {
  // 131. Line.Path
  linePath: string;
  
  // 132. Line.Point
  points: ShapeConfig[];
  
  // 133. Area.Fill
  areaFill?: ShapeConfig;
}

export interface PieChartConfig {
  // 134. Pie.Segment
  segments: ShapeConfig[];
  
  // 135. Pie.Center (donut hole)
  centerRadius?: number;
}

export interface ChartExtras {
  // 136. Legend.Indicator
  legend: Array<{ color: string; label: string }>;
  
  // 137. Tooltip.Container
  tooltip: ShapeConfig;
  
  // 138. Heatmap.Cell
  heatmapCell?: ShapeConfig;
  
  // 139. Progress.Circular
  circularProgress?: { radius: number; strokeWidth: number; percent: number };
  
  // 140. Progress.Linear
  linearProgress?: { width: number; height: number; percent: number };
}
```

### Section 10: Imagery & Media (141-150)

```typescript
// lib/engine/rules/141-150-media.ts

export interface ImageConfig {
  // 141. Image.Source
  source: string;
  
  // 142. Image.Fit
  fit: 'cover' | 'contain' | 'fill' | 'tile';
  
  // 143. Image.Transform
  crop?: { x: number; y: number; width: number; height: number };
}

export interface AvatarConfig {
  // 144. Avatar.Container
  container: ShapeConfig;
  
  // 145. Avatar.Initials
  initials?: string;
}

export interface IconConfig {
  // 146. Icon.Set
  iconSet: 'lucide' | 'material' | 'feather' | 'heroicons';
  
  // 147. Icon.Size
  size: number;
  
  // 148. Icon.Weight
  strokeWeight: number;
}

export interface VideoConfig {
  // 149. Video.Poster
  poster: string;
  
  // 150. Video.Controls
  showControls: boolean;
}
```

### Section 11: Interactive States (151-160)

```typescript
// lib/engine/rules/151-160-states.ts

export interface StateConfig {
  // 151. State.Default
  default: StyleConfig;
  
  // 152. State.Hover
  hover: Partial<StyleConfig>;
  
  // 153. State.Active
  active: Partial<StyleConfig>;
  
  // 154. State.Focus
  focus: Partial<StyleConfig>;
  
  // 155. State.Disabled
  disabled: Partial<StyleConfig> & { pointerEvents: 'none' };
  
  // 156. State.Error
  error: Partial<StyleConfig>;
  
  // 157. State.Success
  success: Partial<StyleConfig>;
  
  // 158. State.Warning
  warning: Partial<StyleConfig>;
  
  // 159. State.Loading
  loading: { showSpinner: boolean; replaceContent: boolean };
  
  // 160. State.Selected
  selected: Partial<StyleConfig>;
}
```

### Section 12: Feedback & Notifications (161-170)

```typescript
// lib/engine/rules/161-170-feedback.ts

export interface BadgeConfig {
  // 161. Badge.Container
  container: ShapeConfig;
  
  // 162. Badge.Text
  text: string;
}

export interface BannerConfig {
  // 163. Banner.Root
  root: ShapeConfig;
  
  // 164. Banner.Action
  action?: { label: string; onClick: string };
}

export interface AnimationConfig {
  // 165. Pulse.Animation
  pulse?: { scale: number; duration: number };
}

export interface SkeletonConfig {
  // 166. Skeleton.Base
  base: ShapeConfig;
  
  // 167. Skeleton.Shimmer
  shimmer: { angle: number; speed: number };
}

export interface TooltipConfig {
  // 168. Tooltip.Arrow
  arrow: ShapeConfig;
  
  // 169. Tooltip.Position
  position: 'top' | 'bottom' | 'left' | 'right';
}

export interface PopoverConfig {
  // 170. Popover.Anchor
  anchorId: string;
}
```

### Section 13: Form Design (171-180)

```typescript
// lib/engine/rules/171-180-forms.ts

export interface FormConfig {
  // 171. Form.Group
  group: ShapeConfig;
  
  // 172. Form.Section
  section: { header: TypographyConfig; fields: ShapeConfig };
  
  // 173. Form.Progress
  progress: { currentStep: number; totalSteps: number };
}

export interface RangeConfig {
  // 174. Range.Min
  minLabel: string;
  
  // 175. Range.Max
  maxLabel: string;
}

export interface InputExtras {
  // 176. Input.Mask
  mask?: string; // e.g., "(___) ___-____"
}

export interface SelectConfig {
  // 177. Select.Box
  box: ShapeConfig;
  
  // 178. Select.Chevron
  chevron: ShapeConfig;
}

export interface DatePickerConfig {
  // 179. DatePicker.Grid
  grid: { rows: 6; columns: 7 };
  
  // 180. DatePicker.Selected
  selectedStyle: StyleConfig;
}
```

### Section 14: Layout Patterns (181-190)

```typescript
// lib/engine/rules/181-190-patterns.ts

export interface LayoutPatterns {
  // 181. Pattern.Bento
  bento: { columns: number; gaps: number };
  
  // 182. Pattern.Hero
  hero: { alignment: 'center' | 'left'; hasImage: boolean };
  
  // 183. Pattern.Features
  features: { columns: 3; iconSize: number };
  
  // 184. Pattern.Pricing
  pricing: { tiers: number; highlightedTier?: number };
  
  // 185. Pattern.Footer
  footer: { columns: number; hasNewsletter: boolean };
  
  // 186. Pattern.SidebarNav
  sidebarNav: { width: number; collapsible: boolean };
  
  // 187. Pattern.SplitScreen
  splitScreen: { ratio: '50/50' | '40/60' | '60/40' };
  
  // 188. Pattern.Masonry
  masonry: { columns: number; gap: number };
  
  // 189. Pattern.Feed
  feed: { cardStyle: 'full' | 'compact' };
  
  // 190. Pattern.Dashboard
  dashboard: { hasSidebar: boolean; hasTopNav: boolean };
}
```

### Section 15: System Overrides & Themes (191-200)

```typescript
// lib/engine/rules/191-200-themes.ts

export interface ThemeSystem {
  // 191. Theme.Mode
  mode: 'light' | 'dark';
  
  // 192. Theme.Contrast
  highContrast: boolean;
  
  // 193. Theme.Spacing
  spacingScale: 'compact' | 'cozy' | 'comfortable';
  
  // 194. Theme.Brand
  brandColor: string;
  
  // 195. Theme.Font
  fontPrimary: string;
  fontSecondary?: string;
  
  // 196. Platform.Target
  platform: 'ios' | 'android' | 'web';
  
  // 197. Device.Frame
  deviceFrame?: 'iphone-15' | 'pixel-8' | 'none';
  
  // 198. Export.Format
  exportFormat: 'svg' | 'png' | 'pdf' | 'jpg';
  
  // 199. Export.Scale
  exportScale: 1 | 2 | 3;
  
  // 200. Component.Sync
  syncEndpoint?: string;
}
```

### Section 16: Advanced Flex Properties (201-210)

```typescript
// lib/engine/rules/201-210-advanced-flex.ts

export interface AdvancedFlexConfig {
  // 201. Flex.Basis.Auto
  flexBasis: 'auto' | number;
  
  // 202. Flex.Shrink.Zero
  flexShrink: 0 | 1;
  
  // 203. Flex.Grow.Unitary
  flexGrow: number;
  
  // 204. Layout.Overlay.Order
  overlayOrder: number; // z-index for modals, tooltips, FAB
  
  // 205. Layout.VisualStack
  visualStack?: { overlap: number }; // negative margin for avatar stacks
  
  // 206. Layout.Constraint.Proportional
  proportionalWidth?: number; // percentage of parent
  
  // 207. Layout.Container.MaxWidth
  maxWidth?: number; // reading width limit
  
  // 208. Layout.Breakpoints.Custom
  customBreakpoints?: Record<string, number>;
  
  // 209. Layout.IntrinsicSizing
  intrinsicSizing: 'fit-content' | 'min-content' | 'max-content';
  
  // 210. Layout.AspectRatio.Force
  aspectRatio?: string; // "16/9", "1/1", etc.
}
```

### Section 17: Data-Driven Design (211-220)

```typescript
// lib/engine/rules/211-220-data.ts

export interface DataConfig {
  // 211. Data.Iteration.Count
  iterationCount: number;
  
  // 212. Data.Variability
  variability: 'short' | 'medium' | 'long' | 'mixed';
  
  // 213. Data.Type.Mapping
  typeMapping: Record<string, 'name' | 'price' | 'date' | 'email' | 'phone'>;
  
  // 214. Data.Placeholder.Avatar
  avatarStyle: 'initials' | 'photos' | 'illustrations';
  
  // 215. Data.EmptyState.Trigger
  emptyStateThreshold: number;
  
  // 216. Data.Skeleton.Mapping
  skeletonShapes: Record<string, ShapeConfig>;
  
  // 217. Data.Localization.Expand
  localeExpansion: number; // percentage for text expansion
  
  // 218. Data.Currency.Symbol
  currencyPosition: 'before' | 'after';
  
  // 219. Data.Number.Formatting
  decimalSeparator: '.' | ',';
  
  // 220. Data.Privacy.Masking
  maskPattern: string; // "***" or "••••"
}
```

### Section 18: Advanced Typography (221-230)

```typescript
// lib/engine/rules/221-230-advanced-type.ts

export interface AdvancedTypographyConfig {
  // 221. Type.Hierarchy.Scale
  scaleRatio: 1.067 | 1.125 | 1.2 | 1.25 | 1.333 | 1.414 | 1.5 | 1.618;
  
  // 222. Type.OpticalSize
  opticalSizing: boolean;
  
  // 223. Type.Ligatures
  ligatures: 'none' | 'standard' | 'discretionary';
  
  // 224. Type.Kerning.Auto
  autoKerning: boolean;
  
  // 225. Type.LineHeight.Tight
  lineHeightTight: number; // 1.1
  
  // 226. Type.LineHeight.Loose
  lineHeightLoose: number; // 1.6
  
  // 227. Type.ParagraphIndent
  paragraphIndent?: number;
  
  // 228. Type.List.MarkerOffset
  listMarkerOffset: number;
  
  // 229. Type.BaselineAlignment
  baselineGrid: 4 | 8;
  
  // 230. Type.ResponsiveScale
  mobileScaleReduction: number; // percentage
}
```

### Section 19: Design Token Architecture (231-240)

```typescript
// lib/engine/rules/231-240-tokens.ts

export interface TokenArchitecture {
  // 231. Token.Primitive
  primitives: Record<string, string>;
  
  // 232. Token.Semantic
  semantic: Record<string, string>; // maps to primitives
  
  // 233. Token.Component
  component: Record<string, string>; // maps to semantic
  
  // 234. Token.Alias.Reference
  aliases: Record<string, string>; // nested references
  
  // 235. Token.Mode.Dark
  darkModeInversions: Record<string, string>;
  
  // 236. Token.HighContrast
  highContrastOverrides: Record<string, string>;
  
  // 237. Token.Spacing.Unit
  spacingUnit: number; // base multiplier (4)
  
  // 238. Token.Radius.Full
  radiusFull: number; // 9999
  
  // 239. Token.Elevation.Ambient
  elevationAmbient: string; // subtle shadow
  
  // 240. Token.Elevation.Direct
  elevationDirect: string; // strong shadow
}
```

### Section 20: Complex Component Logic (241-250)

```typescript
// lib/engine/rules/241-250-complex-components.ts

export interface ComplexComponentLogic {
  // 241. Navbar.Sticky.Behavior
  navbarSticky: 'solid' | 'glassmorphism';
  
  // 242. Sidebar.Collapse.Icon
  sidebarCollapseMode: 'hidden' | 'icons-only' | 'tooltip';
  
  // 243. Tab.Underline.Width
  tabUnderline: 'text-width' | 'full-width';
  
  // 244. Input.Icon.Leading
  inputIconSlotWidth: number;
  
  // 245. Input.Validation.Ring
  validationRing: { color: string; width: number };
  
  // 246. Card.Hover.Lift
  cardHoverLift: { y: number; shadowIncrease: number };
  
  // 247. Modal.Scrim.Opacity
  modalScrimOpacity: number;
  
  // 248. Badge.Offset
  badgeOffset: { x: number; y: number };
  
  // 249. Progress.Indeterminate
  indeterminateAnimation: 'scanning' | 'pulse' | 'wave';
  
  // 250. Tooltip.AutoFlip
  tooltipAutoFlip: boolean;
}
```

### Section 21: Prototyping & Interaction (251-260)

```typescript
// lib/engine/rules/251-260-prototyping.ts

export interface PrototypingConfig {
  // 251. Trigger.OnClick
  onClickAction?: InteractionAction;
  
  // 252. Trigger.OnHover
  onHoverAction?: InteractionAction;
  
  // 253. Action.Navigate
  navigateTo?: string; // page ID
  
  // 254. Action.OpenOverlay
  openOverlay?: { type: 'modal' | 'popover'; position: string };
  
  // 255. Action.Back
  backAction?: boolean;
  
  // 256. Transition.SmartAnimate
  smartAnimate: boolean;
  
  // 257. Transition.Duration
  transitionDuration: number;
  
  // 258. Transition.Curve
  transitionCurve: string; // cubic-bezier
  
  // 259. Scroll.Overflow
  scrollOverflow: 'hidden' | 'auto' | 'scroll';
  
  // 260. Scroll.Snap.Stop
  scrollSnapPoints?: number[];
}

type InteractionAction = 'navigate' | 'overlay' | 'state-change' | 'scroll-to';
```

### Section 22: Accessibility - WCAG 2.2 (261-270)

```typescript
// lib/engine/rules/261-270-accessibility.ts

export interface AccessibilityConfig {
  // 261. Contrast.Check.Text
  minTextContrast: number; // 4.5
  
  // 262. Contrast.Check.Graphic
  minGraphicContrast: number; // 3.0
  
  // 263. A11y.Label.Hidden
  screenReaderLabels: Record<string, string>;
  
  // 264. A11y.FocusVisible
  focusRingStyle: StyleConfig;
  
  // 265. A11y.Heading.Order
  enforceHeadingOrder: boolean;
  
  // 266. A11y.TouchTarget
  minTouchTarget: number; // 44
  
  // 267. A11y.Colorblind.Mode
  colorblindFallbacks: Record<string, string>;
  
  // 268. A11y.ReducedMotion
  respectReducedMotion: boolean;
  
  // 269. A11y.AriaLabel
  ariaLabels: Record<string, string>;
  
  // 270. A11y.Announce.Status
  liveRegions: Array<{ id: string; politeness: 'polite' | 'assertive' }>;
}
```

### Section 23: Export & Handoff (271-280)

```typescript
// lib/engine/rules/271-280-export.ts

export interface ExportConfig {
  // 271. Export.CleanSVG
  cleanSvgMetadata: boolean;
  
  // 272. Export.CSS.Variables
  cssVariablesFormat: ':root' | 'tailwind' | 'scss';
  
  // 273. Export.JSON.Manifest
  includeJsonManifest: boolean;
  
  // 274. Export.ImageAsset.Naming
  assetNaming: 'kebab-case' | 'camelCase' | 'snake_case';
  
  // 275. Export.Font.Subset
  fontSubsetting: boolean;
  
  // 276. Code.Tailwind.Mapping
  tailwindMapping: boolean;
  
  // 277. Code.React.Components
  reactComponentExport: boolean;
  
  // 278. Code.Inspect.Values
  inspectMode: 'hex' | 'tokens';
  
  // 279. Code.Layout.Flex
  flexExportFormat: string;
  
  // 280. Code.Grid.Template
  gridExportFormat: string;
}
```

### Section 24: Advanced Graphics (281-290)

```typescript
// lib/engine/rules/281-290-graphics.ts

export interface GraphicsConfig {
  // 281. Filter.Brightness
  brightness?: number;
  
  // 282. Filter.Grayscale
  grayscale?: number;
  
  // 283. Mask.Vector
  vectorMask?: string; // SVG path
  
  // 284. Stroke.DashArray
  dashArray?: string;
  
  // 285. Stroke.MiterLimit
  miterLimit?: number;
  
  // 286. Gradient.Repeat
  gradientRepeat?: boolean;
  
  // 287. Effect.LayerBlur.Value
  layerBlurValue?: number;
  
  // 288. Effect.Noise
  noiseTexture?: { opacity: number; scale: number };
  
  // 289. Effect.MixedFill
  mixedFill?: { color: string; opacity: number };
  
  // 290. Pattern.Fill
  patternFill?: { svgPath: string; scale: number };
}
```

### Section 25: Templates & Patterns (291-300)

```typescript
// lib/engine/rules/291-300-templates.ts

export interface TemplateConfig {
  // 291. Pattern.Bento.Ratio
  bentoRatios: ('1:1' | '2:1' | '1:2')[];
  
  // 292. Pattern.EmptyState
  emptyState: { icon: string; heading: string; body: string; cta: string };
  
  // 293. Pattern.Auth.Form
  authFormWidth: number;
  
  // 294. Pattern.Settings.Group
  settingsGroupStyle: { hasHeader: boolean; hasDivider: boolean };
  
  // 295. Pattern.DataGrid
  dataGridStyle: { headerBg: string; zebraStriping: boolean };
  
  // 296. Pattern.UserMenu
  userMenuPosition: 'left' | 'right';
  
  // 297. Pattern.SearchOverlay
  searchOverlayStyle: 'fullscreen' | 'dropdown';
  
  // 298. Pattern.Onboarding.Tooltip
  onboardingPulse: boolean;
  
  // 299. Pattern.CookieConsent
  cookieConsentPosition: 'bottom' | 'top' | 'modal';
  
  // 300. Engine.Finalize
  outputFormat: 'penpot' | 'figma-json' | 'sketch-json';
}
```

### Section 26: Backend & Performance (301-310)

```typescript
// lib/engine/rules/301-310-backend.ts

export interface BackendConfig {
  // 301. API.RateLimit
  rateLimit: { maxLayers: number; batchSize: number };
  
  // 302. API.RetryLogic
  retryConfig: { maxRetries: number; backoff: number };
  
  // 303. Asset.Preflight
  preflightAssets: boolean;
  
  // 304. Component.Library.Sync
  checkExistingComponents: boolean;
  
  // 305. Layer.ID.Stable
  preserveLayerIds: boolean;
  
  // 306. Engine.Audit
  postGenerationAudit: boolean;
  
  // 307. Engine.VibeCheck
  aestheticConsistencyCheck: boolean;
  
  // 308. Engine.Trend.Inject
  trendPreset?: string;
  
  // 309. Project.Versioning
  saveIterations: boolean;
  
  // 310. Render.Preview
  previewSize: number;
}
```

### Section 27: Component Variants & Props (311-320)

```typescript
// lib/engine/rules/311-320-variants.ts

export interface VariantConfig {
  // 311. Variant.Size
  sizes: {
    sm: { padding: number; fontSize: number };
    md: { padding: number; fontSize: number };
    lg: { padding: number; fontSize: number };
  };
  
  // 312. Variant.Style
  styles: {
    primary: StyleConfig;
    secondary: StyleConfig;
    tertiary: StyleConfig;
    ghost: StyleConfig;
  };
  
  // 313. Variant.Icon
  iconPosition: 'leading' | 'trailing' | 'none';
  
  // 314. Variant.State
  states: StateConfig;
  
  // 315. Prop.Text
  textLayerMapping: string;
  
  // 316. Prop.Color
  colorTokenMapping: string;
  
  // 317. Prop.Visibility
  visibilityProps: Record<string, boolean>;
  
  // 318. Prop.Value
  valueMapping: { property: string; type: 'number' | 'percent' };
  
  // 319. Prop.Selection
  selectionMapping: { property: string; svgPath: string };
  
  // 320. Prop.ActiveTab
  activeTabMapping: { property: string; indicatorOffset: number };
}
```

### Section 28: Responsive Reflow Rules (321-330)

```typescript
// lib/engine/rules/321-330-responsive.ts

export interface ResponsiveConfig {
  // 321. Reflow.Grid
  gridReflow: { desktop: number; tablet: number; mobile: number };
  
  // 322. Reflow.Stack
  stackReflow: { breakpoint: number; direction: 'row' | 'column' };
  
  // 323. Reflow.Hide
  hideOnMobile: string[]; // layer IDs
  
  // 324. Reflow.Swap
  componentSwaps: Record<string, { desktop: string; mobile: string }>;
  
  // 325. Reflow.Font
  fontReflow: Record<string, { desktop: number; mobile: number }>;
  
  // 326. Reflow.Padding
  paddingReflow: { desktop: number; mobile: number };
  
  // 327. Reflow.Images
  imageAspectReflow: { desktop: string; mobile: string };
  
  // 328. Reflow.Tables
  tableToCards: boolean;
  
  // 329. Reflow.Modals
  modalToBottomSheet: boolean;
  
  // 330. Reflow.Tabs
  tabsToDropdown: boolean;
}
```

### Section 29: Design QA (331-340)

```typescript
// lib/engine/rules/331-340-qa.ts

export interface QAConfig {
  // 331. QA.Contrast.Pass
  contrastCheckEnabled: boolean;
  
  // 332. QA.Overlap.Check
  overlapCheckEnabled: boolean;
  
  // 333. QA.Font.Missing
  fontCheckEnabled: boolean;
  
  // 334. QA.Empty.Layers
  removeEmptyLayers: boolean;
  
  // 335. QA.Naming.Check
  namingCheckEnabled: boolean;
  
  // 336. QA.Grid.Alignment
  gridAlignmentUnit: 4 | 8;
  
  // 337. QA.VisualBalance
  visualBalanceCheck: boolean;
  
  // 338. QA.Color.Count
  maxUniqueColors: number;
  
  // 339. QA.Touch.Safety
  minTouchGap: number;
  
  // 340. QA.Overflow.Check
  overflowCheckEnabled: boolean;
}
```

### Section 30: Animation & Motion (341-350)

```typescript
// lib/engine/rules/341-350-motion.ts

export interface MotionConfig {
  // 341. Motion.Enter.Scale
  enterScale: { from: number; to: number };
  
  // 342. Motion.Enter.Fade
  enterFade: { from: number; to: number };
  
  // 343. Motion.Exit.Slide
  exitSlide: { distance: number; direction: 'up' | 'down' };
  
  // 344. Motion.Hover.Y
  hoverY: number;
  
  // 345. Motion.Loading.Pulse
  loadingPulse: { duration: number };
  
  // 346. Motion.Scroll.Parallax
  parallaxFactor: number;
  
  // 347. Motion.Bezier.Standard
  bezierStandard: string;
  
  // 348. Motion.Bezier.Decelerate
  bezierDecelerate: string;
  
  // 349. Motion.Bezier.Accelerate
  bezierAccelerate: string;
  
  // 350. Motion.Stagger
  staggerDelay: number;
}
```

### Section 31: Content Generation (351-360)

```typescript
// lib/engine/rules/351-360-content.ts

export interface ContentConfig {
  // 351. Content.Name.Person
  personNameStyle: 'western' | 'diverse' | 'locale-based';
  
  // 352. Content.Name.Company
  companyNameStyle: 'tech' | 'corporate' | 'creative';
  
  // 353. Content.Address
  addressLocale: string;
  
  // 354. Content.Date.Future
  futureDateRange: { min: number; max: number }; // days
  
  // 355. Content.Date.Past
  pastDateRange: { min: number; max: number }; // days
  
  // 356. Content.Email
  emailDomain: string;
  
  // 357. Content.Paragraph.Short
  shortParagraphLength: { min: number; max: number }; // sentences
  
  // 358. Content.Paragraph.Long
  longParagraphLength: { min: number; max: number }; // sentences
  
  // 359. Content.Price
  priceRange: { min: number; max: number; currency: string };
  
  // 360. Content.Status
  statusOptions: string[];
}
```

### Section 32: Iconography System (361-370)

```typescript
// lib/engine/rules/361-370-icons.ts

export interface IconographyConfig {
  // 361. Icon.Type.Outline
  outlineStrokeWeight: number;
  
  // 362. Icon.Type.Filled
  filledStyle: StyleConfig;
  
  // 363. Icon.Type.Duotone
  duotoneOpacity: { primary: number; secondary: number };
  
  // 364. Icon.Size.XS
  sizeXS: number;
  
  // 365. Icon.Size.SM
  sizeSM: number;
  
  // 366. Icon.Size.MD
  sizeMD: number;
  
  // 367. Icon.Size.LG
  sizeLG: number;
  
  // 368. Icon.Stroke.Join
  strokeJoin: 'round' | 'miter';
  
  // 369. Icon.Color.Inherit
  inheritColor: boolean;
  
  // 370. Icon.Package.Default
  defaultPackage: 'lucide' | 'feather' | 'heroicons' | 'material';
}
```

### Section 33: Page Architecture (371-380)

```typescript
// lib/engine/rules/371-380-pages.ts

export interface PageArchitecture {
  // 371. Page.Dashboard
  dashboard: { sidebar: boolean; topNav: boolean; gridColumns: number };
  
  // 372. Page.Landing
  landing: { sections: ('hero' | 'features' | 'testimonials' | 'pricing' | 'cta' | 'footer')[] };
  
  // 373. Page.Settings
  settings: { sideNav: boolean; sections: string[] };
  
  // 374. Page.Auth
  auth: { layout: 'centered' | 'split'; hasIllustration: boolean };
  
  // 375. Page.Feed
  feed: { header: 'mobile' | 'desktop'; bottomNav: boolean };
  
  // 376. Page.Detail
  detail: { backButton: boolean; heroImage: boolean; stickyCTA: boolean };
  
  // 377. Page.Empty
  empty: { icon: string; heading: string; body: string; cta: string };
  
  // 378. Page.Error
  error: { illustration: string; message: string; recovery: string };
  
  // 379. Page.Loading
  loading: { type: 'skeleton' | 'spinner' | 'progress' };
  
  // 380. Page.Wizard
  wizard: { steps: number; progressStyle: 'bar' | 'dots' | 'steps' };
}
```

### Section 34: Visual Themes (381-390)

```typescript
// lib/engine/rules/381-390-visual-themes.ts

export interface VisualThemes {
  // 381. Theme.Glass
  glass: {
    backdropBlur: number;
    borderOpacity: number;
    bgOpacity: number;
  };
  
  // 382. Theme.Neubrutalism
  neubrutalism: {
    strokeWeight: number;
    shadowOffset: { x: number; y: number };
    colors: 'bold' | 'pastel';
  };
  
  // 383. Theme.Material
  material: {
    cornerRadius: number;
    elevation: 'subtle' | 'pronounced';
    primaryColor: string;
  };
  
  // 384. Theme.SaaS
  saas: {
    fontFamily: string;
    bgColor: string;
    accentColor: string;
  };
  
  // 385. Theme.Minimalist
  minimalist: {
    borders: boolean;
    whitespaceMultiplier: number;
    typographyWeight: 'bold' | 'regular';
  };
  
  // 386. Theme.Gaming
  gaming: {
    bgColor: string;
    glowColor: string;
    glowIntensity: number;
  };
  
  // 387. Theme.Corporate
  corporate: {
    cornerRadius: number;
    density: 'dense' | 'normal';
    palette: 'blue-gray' | 'neutral';
  };
  
  // 388. Theme.Playful
  playful: {
    cornerRadius: number;
    colorPalette: 'pastel' | 'bright';
    animationStyle: 'bouncy' | 'smooth';
  };
  
  // 389. Theme.Cyberpunk
  cyberpunk: {
    saturation: number;
    scanlines: boolean;
    fontFamily: string; // monospace
  };
  
  // 390. Theme.Apple
  apple: {
    fontFamily: string; // SF Pro
    continuousCorners: boolean;
    gradientStyle: 'subtle' | 'vibrant';
  };
}
```

### Section 35: Micro-Interactions (391-400)

```typescript
// lib/engine/rules/391-400-micro.ts

export interface MicroInteractions {
  // 391. Micro.Hover.Transition
  hoverTransitionDuration: number;
  
  // 392. Micro.Active.Scale
  activeScale: number;
  
  // 393. Micro.Focus.Outline
  focusOutlineWidth: number;
  
  // 394. Micro.Loading.Speed
  loadingSpinnerRPM: number;
  
  // 395. Micro.Tooltip.Delay
  tooltipDelay: number;
  
  // 396. Micro.Tab.Switch
  tabSwitchAnimation: 'slide' | 'fade' | 'none';
  
  // 397. Micro.Page.Slide
  pageSlideDirection: 'horizontal' | 'vertical';
  
  // 398. Micro.Feedback.Shake
  errorShakeIntensity: number;
  
  // 399. Micro.Confetti
  successConfetti: boolean;
  
  // 400. Micro.Scroll.Indicator
  scrollProgressBar: boolean;
}
```

### Section 36: Utilities (401-410)

```typescript
// lib/engine/rules/401-410-utils.ts

export interface UtilityConfig {
  // 401. Util.JSON.Validate
  validateSchema: boolean;
  
  // 402. Util.SVG.Optimize
  optimizeSvg: boolean;
  
  // 403. Util.Asset.Resizer
  generateMultipleScales: boolean;
  
  // 404. Util.Color.Contraster
  autoSuggestAccessibleColors: boolean;
  
  // 405. Util.Text.Trimmer
  autoTrimText: boolean;
  
  // 406. Util.ZIndex.Repair
  fixZFighting: boolean;
  
  // 407. Util.Naming.Audit
  enforceNamingConvention: 'PascalCase' | 'camelCase' | 'kebab-case';
  
  // 408. Util.Page.Summary
  generateSummary: boolean;
  
  // 409. Util.Design.Audit
  generateDesignRationale: boolean;
  
  // 410. Util.Output.Trigger
  outputEndpoint: string;
}
```

### Section 37: Layout Tokens (411-420)

```typescript
// lib/engine/rules/411-420-layout-tokens.ts

export interface LayoutTokens {
  // 411. Grid.Column.Count
  gridColumns: number;
  
  // 412. Grid.Type
  gridType: 'stretch' | 'center';
  
  // 413-417. Space Tokens
  spaceTokens: {
    xs: number;  // 413: 4px
    sm: number;  // 414: 8px
    md: number;  // 415: 16px
    lg: number;  // 416: 24px
    xl: number;  // 417: 32px
  };
  
  // 418-420. Radius Tokens
  radiusTokens: {
    sm: number;  // 418: 4px
    md: number;  // 419: 8px
    lg: number;  // 420: 16px
  };
}
```

### Section 38: Border & Shadow Tokens (421-430)

```typescript
// lib/engine/rules/421-430-border-tokens.ts

export interface BorderShadowTokens {
  // 421. Border.Thin
  borderThin: number;
  
  // 422. Border.Thick
  borderThick: number;
  
  // 423. Shadow.Low
  shadowLow: string;
  
  // 424. Shadow.High
  shadowHigh: string;
  
  // 425. Font.Base
  fontBase: number;
  
  // 426. Font.Scale
  fontScale: number;
  
  // 427. Color.Primary
  colorPrimary: string;
  
  // 428. Color.Neutral
  colorNeutral: string;
  
  // 429. Viewport.Mobile
  viewportMobile: { width: number; height: number };
  
  // 430. Viewport.Desktop
  viewportDesktop: { width: number; height: number };
}
```

### Section 39: Layer Constraints (431-440)

```typescript
// lib/engine/rules/431-440-constraints.ts

export interface ConstraintConfig {
  // 431. Layer.Lock
  locked: boolean;
  
  // 432. Layer.Hidden
  hidden: boolean;
  
  // 433-436. Constraint Distances
  constraints: {
    top?: number;     // 433
    bottom?: number;  // 434
    left?: number;    // 435
    right?: number;   // 436
  };
  
  // 437. Constraint.Center
  centerConstraint: 'horizontal' | 'vertical' | 'both' | 'none';
  
  // 438. Asset.Downloader
  downloadExternalAssets: boolean;
  
  // 439. Asset.Compress
  compressionLevel: 'none' | 'low' | 'medium' | 'high';
  
  // 440. Prototype.FlowID
  prototypeStartPoint?: string;
}
```

### Section 40: System Compliance (441-445)

```typescript
// lib/engine/rules/441-445-compliance.ts

export interface ComplianceConfig {
  // 441. Compliance.GDPR
  gdprCompliance: {
    cookieBanner: boolean;
    privacyPolicy: boolean;
  };
  
  // 442. Compliance.WCAG
  wcagCompliance: {
    level: 'A' | 'AA' | 'AAA';
    contrastCheck: boolean;
    ariaLabels: boolean;
  };
  
  // 443. Compliance.Security
  securityMasking: {
    maskTokens: boolean;
    maskKeys: boolean;
  };
  
  // 444. Compliance.Performance
  performanceLimits: {
    maxLayersPerScreen: number;
    maxFileSize: number;
  };
  
  // 445. Compliance.Structure
  structureLimits: {
    maxNestingDepth: number;
  };
}
```

---

## 🤖 Gemini System Prompt

Create this file at `lib/gemini/system-prompt.ts`:

```typescript
export const GEMINI_SYSTEM_PROMPT = `
You are PenpotAI, an expert UI/UX designer that generates production-ready designs from natural language descriptions. You output structured JSON that maps to a 445-point design specification system.

## YOUR CAPABILITIES
- Interpret vague design requests into specific UI specifications
- Generate complete, responsive, accessible designs
- Apply consistent design tokens and component variants
- Create realistic placeholder content
- Ensure WCAG 2.2 AA compliance

## OUTPUT FORMAT
Always respond with valid JSON matching this schema:

\`\`\`json
{
  "meta": {
    "interpretation": "string - your understanding of the request",
    "pageType": "dashboard|landing|auth|settings|feed|detail|empty|error|loading|wizard",
    "theme": "glass|neubrutalism|material|saas|minimalist|gaming|corporate|playful|cyberpunk|apple",
    "complexity": "simple|moderate|complex"
  },
  
  "canvas": {
    "viewport": { "width": 375, "height": 812 },
    "dpi": 72,
    "backgroundColor": "#FFFFFF",
    "gridColumns": 4,
    "gridGutter": 16,
    "layoutDirection": "ltr"
  },
  
  "tokens": {
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#6366F1",
      "surface": "#FFFFFF",
      "surfaceAlt": "#F9FAFB",
      "text": "#111827",
      "textMuted": "#6B7280",
      "border": "#E5E7EB",
      "error": "#EF4444",
      "success": "#22C55E",
      "warning": "#F59E0B"
    },
    "spacing": {
      "xs": 4, "sm": 8, "md": 16, "lg": 24, "xl": 32
    },
    "radii": {
      "sm": 4, "md": 8, "lg": 16, "full": 9999
    },
    "typography": {
      "fontFamily": "Inter",
      "scale": 1.25,
      "sizes": {
        "xs": 12, "sm": 14, "base": 16, "lg": 18, "xl": 20, "2xl": 24, "3xl": 30, "4xl": 36
      }
    },
    "shadows": {
      "sm": "0 1px 2px rgba(0,0,0,0.05)",
      "md": "0 4px 6px rgba(0,0,0,0.1)",
      "lg": "0 10px 15px rgba(0,0,0,0.1)"
    }
  },
  
  "components": [
    {
      "id": "unique-id",
      "type": "navbar|sidebar|card|button|input|...",
      "name": "Human readable name",
      "position": { "x": 0, "y": 0 },
      "size": { "width": 375, "height": 56 },
      "layout": {
        "mode": "flex",
        "direction": "row",
        "justify": "space-between",
        "align": "center",
        "gap": 16,
        "padding": { "top": 12, "right": 16, "bottom": 12, "left": 16 }
      },
      "style": {
        "fill": { "type": "solid", "color": "#FFFFFF" },
        "stroke": { "color": "#E5E7EB", "weight": 1 },
        "cornerRadius": { "all": 0 },
        "shadow": "sm"
      },
      "variant": {
        "size": "md",
        "style": "primary",
        "state": "default"
      },
      "props": {
        "text": "Label",
        "icon": "icon-name"
      },
      "responsive": {
        "mobile": { "visible": true },
        "tablet": { "visible": true },
        "desktop": { "visible": true }
      },
      "accessibility": {
        "role": "navigation",
        "label": "Main navigation"
      },
      "children": []
    }
  ],
  
  "interactions": [
    {
      "triggerId": "component-id",
      "trigger": "click|hover",
      "action": "navigate|overlay|state-change",
      "target": "target-id-or-url",
      "transition": {
        "type": "smart-animate|fade|slide",
        "duration": 200,
        "curve": "ease-out"
      }
    }
  ],
  
  "content": {
    "people": ["Jane Cooper", "Wade Warren", "Esther Howard"],
    "companies": ["Acme Corp", "TechFlow Inc", "DataSync"],
    "paragraphs": {
      "short": ["Brief description text here."],
      "long": ["Longer paragraph with multiple sentences. This provides more context and detail about the topic at hand."]
    },
    "dates": {
      "future": ["Jan 15, 2025", "Feb 20, 2025"],
      "past": ["Dec 1, 2024", "Nov 15, 2024"]
    },
    "prices": ["$29.99", "$99.00", "$199.00"],
    "statuses": ["In Progress", "Completed", "Pending"]
  },
  
  "accessibility": {
    "contrastPassing": true,
    "touchTargetsValid": true,
    "headingOrderValid": true,
    "focusStatesIncluded": true
  },
  
  "qa": {
    "overlapsDetected": false,
    "missingFonts": [],
    "colorCount": 8,
    "gridAligned": true
  }
}
\`\`\`

## DESIGN RULES
Apply these rules based on the detected theme:

### MOBILE-FIRST (CRITICAL)
1. Default viewport: 375x812 (iPhone 14)
2. Touch targets: Minimum 44x44px
3. Bottom navigation for primary actions
4. Thumb-zone friendly layouts
5. 16px minimum font size for body text
6. 4-column grid on mobile, 8 on tablet, 12 on desktop

### THEMES
- **glass**: backdropBlur: 20px, bg opacity: 0.8, border: 1px white/10%
- **neubrutalism**: stroke: 2px black, shadow: 4px 4px 0 black, bold colors
- **material**: radius: 4px, subtle shadows, primary blue (#1976D2)
- **saas**: Inter font, gray-50 bg (#F9FAFB), subtle blue accents
- **minimalist**: no borders, 2x whitespace, bold typography
- **gaming**: dark bg (#0D1117), neon glows, high contrast
- **corporate**: 0px radius, dense layout, blue-gray palette
- **playful**: 16px radius, pastels, rounded everything
- **cyberpunk**: high saturation, monospace fonts, scanlines
- **apple**: SF Pro, continuous corners, subtle gradients

### PAGE TYPES
- **dashboard**: sidebar (240px desktop, hidden mobile) + grid
- **landing**: hero + features + testimonials + pricing + footer
- **auth**: centered card (400px max) + optional illustration
- **settings**: side nav + stacked form sections
- **feed**: mobile header + infinite scroll + bottom nav
- **detail**: back button + hero image + content + sticky CTA
- **empty**: centered icon + heading + body + action button
- **error**: illustration + error message + recovery action
- **loading**: skeleton screens matching final layout
- **wizard**: progress indicator + step content + nav buttons

## IMPORTANT
1. Always generate COMPLETE, VALID JSON
2. Include ALL required fields
3. Generate realistic placeholder content
4. Ensure responsive rules for all viewports
5. Include accessibility metadata
6. Apply consistent design tokens throughout
`;
```

---

## 📱 Mobile-First Components

### Bottom Navigation

```tsx
// components/mobile/BottomNav.tsx
'use client';

import { Home, Folder, Plus, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/projects', icon: Folder, label: 'Projects' },
  { href: '/create', icon: Plus, label: 'Create', primary: true },
  { href: '/templates', icon: User, label: 'Templates' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function BottomNav() {
  const pathname = usePathname();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          if (item.primary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center w-14 h-14 -mt-6 bg-blue-600 rounded-full shadow-lg active:scale-95 transition-transform"
              >
                <Icon className="w-6 h-6 text-white" />
              </Link>
            );
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full",
                "active:bg-gray-100 transition-colors",
                isActive ? "text-blue-600" : "text-gray-500"
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### Prompt Input (Mobile-Optimized)

```tsx
// components/prompt/PromptInput.tsx
'use client';

import { useState, useRef } from 'react';
import { Mic, Sparkles, ChevronUp, Loader2, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGeneration } from '@/lib/hooks/useGeneration';
import { ModifierChips } from './ModifierChips';
import { VoiceInput } from './VoiceInput';

export function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [showModifiers, setShowModifiers] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { generate, isGenerating, progress } = useGeneration();
  
  const handleSubmit = async () => {
    if (!prompt.trim() || isGenerating) return;
    await generate(prompt);
  };
  
  const handleVoiceResult = (text: string) => {
    setPrompt(prev => prev + ' ' + text);
    setIsVoiceActive(false);
  };
  
  return (
    <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 z-40">
      {/* Modifier Chips */}
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        showModifiers ? "max-h-32 mb-3" : "max-h-0"
      )}>
        <ModifierChips 
          onSelect={(modifier) => setPrompt(prev => `${prev} ${modifier}`)} 
        />
      </div>
      
      {/* Main Input Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Progress Bar */}
        {isGenerating && (
          <div className="h-1 bg-gray-100">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        {/* Input Area */}
        <div className="flex items-end p-3 gap-2">
          {/* Modifiers Toggle */}
          <button
            onClick={() => setShowModifiers(!showModifiers)}
            className={cn(
              "p-2 rounded-full transition-colors",
              showModifiers ? "bg-blue-100 text-blue-600" : "text-gray-400"
            )}
          >
            <ChevronUp className={cn(
              "w-5 h-5 transition-transform",
              showModifiers && "rotate-180"
            )} />
          </button>
          
          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your design..."
            disabled={isGenerating}
            className={cn(
              "flex-1 resize-none bg-transparent text-base",
              "placeholder:text-gray-400 focus:outline-none",
              "min-h-[44px] max-h-32 py-2"
            )}
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
          />
          
          {/* Voice Input */}
          <VoiceInput
            isActive={isVoiceActive}
            onStart={() => setIsVoiceActive(true)}
            onResult={handleVoiceResult}
            onCancel={() => setIsVoiceActive(false)}
          />
          
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isGenerating}
            className={cn(
              "p-3 rounded-full transition-all",
              "bg-blue-600 text-white",
              "disabled:bg-gray-200 disabled:text-gray-400",
              "active:scale-95"
            )}
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Wand2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 🚀 Getting Started Commands

```bash
# 1. Create the project
npx create-next-app@latest penpot-ai --typescript --tailwind --app --src-dir=false

# 2. Install dependencies
cd penpot-ai
npm install @google/generative-ai zustand zod react-hook-form @hookform/resolvers
npm install framer-motion lucide-react
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install -D @types/node

# 3. Install shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input textarea card sheet dialog

# 4. Set up environment variables
cp .env.example .env.local
# Add: GEMINI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY

# 5. Start development
npm run dev
```

---

## 📋 Implementation Checklist

### Phase 1: Foundation
- [ ] Project setup with Next.js 14
- [ ] Tailwind CSS + shadcn/ui configuration
- [ ] Mobile-first layout system
- [ ] Bottom navigation component
- [ ] Basic routing structure

### Phase 2: Core Features
- [ ] Gemini AI integration
- [ ] Complete system prompt with 445 rules
- [ ] Design engine implementation (all 40 sections)
- [ ] Prompt input with voice support
- [ ] Real-time generation progress

### Phase 3: Preview & Export
- [ ] Design preview canvas
- [ ] Device frame selector
- [ ] Responsive viewport toggle
- [ ] Export to CSS/Tailwind/React
- [ ] Penpot file generation

### Phase 4: Polish
- [ ] Offline support (PWA)
- [ ] Project persistence (Supabase)
- [ ] User authentication
- [ ] Design history/versioning
- [ ] Share functionality

---

## 🎯 Success Criteria

1. **Mobile-First**: App must be fully usable on mobile devices
2. **Complete Coverage**: All 445 design rules must be implemented
3. **Fast Generation**: < 10 seconds for simple designs
4. **Accessible Output**: Generated designs must pass WCAG 2.2 AA
5. **Export Quality**: Clean, production-ready code output
6. **Offline Capable**: Core features work without internet

---

*This prompt contains the complete specification for building PenpotAI. Follow the structure exactly and implement all 445 design rules for a fully-featured AI design tool.*
