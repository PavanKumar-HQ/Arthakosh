"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ScenariosDetailsRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = params.scenarioId as string;

  useEffect(() => {
    // Redirect to the new upgraded labs routing structure
    if (scenarioId) {
      router.replace(`/labs/${scenarioId}`);
    } else {
      router.replace("/labs");
    }
  }, [scenarioId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-violet/20 border-t-violet animate-spin" />
        <span className="text-xs text-muted-foreground">Redirecting to upgraded Decision Lab...</span>
      </div>
    </div>
  );
}
