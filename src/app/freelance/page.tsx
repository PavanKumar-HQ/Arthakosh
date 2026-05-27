import { Target } from "lucide-react";

export default function PlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-surface border border-border shadow-sm flex items-center justify-center mb-6">
        <Target className="w-8 h-8 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Coming Soon</h1>
      <p className="text-muted-foreground max-w-sm">
        This module is currently under development for the Financial OS. Check back later!
      </p>
    </div>
  );
}
