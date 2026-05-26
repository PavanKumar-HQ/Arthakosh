import { Lightbulb, AlertCircle } from "lucide-react";

interface RecommendationBannerProps {
  message: string;
  type?: "insight" | "warning";
  className?: string;
}

export function RecommendationBanner({ message, type = "insight", className = "" }: RecommendationBannerProps) {
  const isWarning = type === "warning";
  
  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
      isWarning 
        ? "bg-amber/5 border-amber/20 text-amber" 
        : "bg-blue-accent/5 border-blue-accent/20 text-blue-accent"
    } ${className}`}>
      {isWarning ? (
        <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
      ) : (
        <Lightbulb className="w-5 h-5 mt-0.5 shrink-0" />
      )}
      <p className="text-sm leading-relaxed text-foreground/90">
        <span className={`font-semibold mr-2 ${isWarning ? "text-amber" : "text-blue-accent"}`}>
          {isWarning ? "Note:" : "Insight:"}
        </span>
        {message}
      </p>
    </div>
  );
}
