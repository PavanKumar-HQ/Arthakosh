"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface InfoTooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export function InfoTooltip({
  content,
  side = "top",
  className = "",
}: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        className={`inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-150 ${className}`}
        aria-label="More information"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className="max-w-xs text-xs leading-relaxed"
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}
