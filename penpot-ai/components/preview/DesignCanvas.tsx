"use client";

import { useMemo } from "react";
import type { DesignSpecification, ComponentConfig } from "@/types/design";
import { cn } from "@/lib/utils";

interface DesignCanvasProps {
  design: DesignSpecification;
  viewport: "mobile" | "tablet" | "desktop";
}

export function DesignCanvas({ design, viewport }: DesignCanvasProps) {
  const visibleComponents = useMemo(() => {
    return design.components.filter((comp) => {
      const responsive = comp.responsive?.[viewport];
      return responsive?.visible !== false;
    });
  }, [design.components, viewport]);

  return (
    <div
      className="relative w-full h-full overflow-auto"
      style={{ backgroundColor: design.canvas.backgroundColor }}
    >
      {visibleComponents.map((component) => (
        <ComponentRenderer
          key={component.id}
          component={component}
          tokens={design.tokens}
        />
      ))}
    </div>
  );
}

interface ComponentRendererProps {
  component: ComponentConfig;
  tokens: DesignSpecification["tokens"];
}

function ComponentRenderer({ component, tokens }: ComponentRendererProps) {
  const style = useMemo(() => {
    const s: React.CSSProperties = {
      position: "absolute",
      left: component.position.x,
      top: component.position.y,
      width: component.size.width === "auto" ? "auto" : component.size.width,
      height: component.size.height === "auto" ? "auto" : component.size.height,
    };

    // Apply fill
    if (component.style.fill.type === "solid" && component.style.fill.color) {
      s.backgroundColor = component.style.fill.color;
      if (component.style.fill.opacity !== undefined) {
        s.opacity = component.style.fill.opacity;
      }
    }

    // Apply stroke
    if (component.style.stroke) {
      s.border = `${component.style.stroke.weight}px ${component.style.stroke.style} ${component.style.stroke.color}`;
    }

    // Apply corner radius
    if (component.style.cornerRadius) {
      if (component.style.cornerRadius.all !== undefined) {
        s.borderRadius = component.style.cornerRadius.all;
      } else {
        s.borderTopLeftRadius = component.style.cornerRadius.topLeft;
        s.borderTopRightRadius = component.style.cornerRadius.topRight;
        s.borderBottomLeftRadius = component.style.cornerRadius.bottomLeft;
        s.borderBottomRightRadius = component.style.cornerRadius.bottomRight;
      }
    }

    // Apply shadow
    if (component.style.shadow && tokens.shadows[component.style.shadow]) {
      s.boxShadow = tokens.shadows[component.style.shadow];
    }

    // Apply layout
    if (component.layout.mode === "flex") {
      s.display = "flex";
      s.flexDirection = component.layout.direction;
      s.justifyContent = mapJustify(component.layout.justify);
      s.alignItems = mapAlign(component.layout.align);
      s.gap = component.layout.gap;
      s.padding = `${component.layout.padding.top}px ${component.layout.padding.right}px ${component.layout.padding.bottom}px ${component.layout.padding.left}px`;
      s.flexWrap = component.layout.wrap ? "wrap" : "nowrap";
    }

    // Apply backdrop blur
    if (component.style.effects?.backdropBlur) {
      s.backdropFilter = `blur(${component.style.effects.backdropBlur}px)`;
    }

    return s;
  }, [component, tokens]);

  // Render based on component type
  const renderContent = () => {
    switch (component.type) {
      case "text":
        return (
          <span
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.sizes.base,
              color: tokens.colors.text,
            }}
          >
            {component.props.text as string}
          </span>
        );

      case "button":
        return (
          <div
            className={cn(
              "flex items-center justify-center px-4 py-2 rounded-lg font-medium",
              component.variant.style === "primary" && "bg-blue-500 text-white",
              component.variant.style === "secondary" && "bg-gray-200 text-gray-800"
            )}
          >
            {component.props.text as string}
          </div>
        );

      case "input":
        return (
          <input
            type="text"
            placeholder={component.props.placeholder as string}
            className="w-full px-3 py-2 border rounded-lg bg-white"
            readOnly
          />
        );

      case "image":
        return (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Image</span>
          </div>
        );

      case "icon":
        return (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            ●
          </div>
        );

      case "avatar":
        return (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
            {(component.props.initials as string) || "U"}
          </div>
        );

      case "badge":
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {component.props.text as string}
          </span>
        );

      case "divider":
        return <hr className="w-full border-gray-200" />;

      default:
        return null;
    }
  };

  return (
    <div style={style} title={component.name}>
      {renderContent()}
      {component.children?.map((child) => (
        <ComponentRenderer key={child.id} component={child} tokens={tokens} />
      ))}
    </div>
  );
}

function mapJustify(value: string): string {
  const map: Record<string, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    "space-between": "space-between",
  };
  return map[value] || value;
}

function mapAlign(value: string): string {
  const map: Record<string, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    baseline: "baseline",
    stretch: "stretch",
  };
  return map[value] || value;
}
